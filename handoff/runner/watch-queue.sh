#!/usr/bin/env bash
# Foreground polling watcher for Codex -> Claude Code handoff tasks.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
HANDOFF_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
QUEUE_DIR="$HANDOFF_ROOT/queue"
ACTIVE_DIR="$HANDOFF_ROOT/active"
FAILED_DIR="$HANDOFF_ROOT/failed"
LOG_DIR="$HANDOFF_ROOT/logs"
RUNTIME_DIR="$HANDOFF_ROOT/runtime"
AGENT_LOCK="$HANDOFF_ROOT/agent.lock"
STATUS_FILE="${HANDOFF_STATUS_FILE:-$RUNTIME_DIR/status.json}"
WATCHER_LOCK="$HANDOFF_ROOT/watcher.lock"
RUNNER="${HANDOFF_RUNNER:-$SCRIPT_DIR/handoff-runner.sh}"

POLL_INTERVAL="${HANDOFF_WATCH_INTERVAL:-5}"
STABLE_SECONDS="${HANDOFF_WATCH_STABLE_SECONDS:-0}"
MODE="loop"
STOP_REQUESTED=0

usage() {
  echo "Usage: $0 [--once] [--poll-interval seconds]" >&2
  echo "Environment: HANDOFF_WATCH_INTERVAL=5 HANDOFF_WATCH_STABLE_SECONDS=0 HANDOFF_RUNNER=..." >&2
}

now_utc() {
  date -u +"%Y-%m-%dT%H:%M:%SZ"
}

json_escape() {
  local value="$1"
  value="${value//\\/\\\\}"
  value="${value//\"/\\\"}"
  value="${value//$'\n'/\\n}"
  printf '%s' "$value"
}

json_value() {
  local value="$1"
  if [ -z "$value" ]; then
    printf 'null'
  else
    printf '"%s"' "$(json_escape "$value")"
  fi
}

json_number_or_null() {
  local value="$1"
  if [[ "$value" =~ ^[0-9]+$ ]]; then
    printf '%s' "$value"
  else
    printf 'null'
  fi
}

log_file_for_today() {
  printf '%s/watcher-%s.log' "$LOG_DIR" "$(date -u +%Y%m%d)"
}

log_msg() {
  local message="$1"
  mkdir -p "$LOG_DIR"
  printf '%s %s\n' "$(now_utc)" "$message" >> "$(log_file_for_today)"
}

fail_fast() {
  echo "ERROR: $*" >&2
  log_msg "ERROR $*"
  exit 2
}

handle_signal() {
  STOP_REQUESTED=1
  log_msg "stop requested"
}

relative_to_root() {
  local path="$1"
  case "$path" in
    "$HANDOFF_ROOT"/*) printf '%s' "${path#"$HANDOFF_ROOT/"}" ;;
    *) printf '%s' "$path" ;;
  esac
}

safe_id() {
  local raw="$1"
  raw="${raw//[^a-zA-Z0-9_.-]/_}"
  raw="${raw##_}"
  raw="${raw%%_}"
  if [ -z "$raw" ]; then
    raw="task-$(date -u +%Y%m%dT%H%M%SZ)"
  fi
  printf '%s' "$raw"
}

json_field() {
  local key="$1"
  local file="$2"
  local line value

  [ -f "$file" ] || return 1
  while IFS= read -r line; do
    case "$line" in
      *"\"$key\""*:*)
        value="${line#*:}"
        value="${value%,}"
        value="${value#"${value%%[![:space:]]*}"}"
        value="${value%"${value##*[![:space:]]}"}"
        value="${value%\"}"
        value="${value#\"}"
        [ "$value" = "null" ] && value=""
        printf '%s' "$value"
        return 0
        ;;
    esac
  done < "$file"

  return 1
}

write_status() {
  local status="$1"
  local task_id="$2"
  local started_at="$3"
  local completed_at="$4"
  local exit_code="$5"
  local log_path="$6"
  local result_path="$7"
  local pid="$8"
  local tmp="$STATUS_FILE.tmp.$$"

  {
    printf '{\n'
    printf '  "status": "%s",\n' "$(json_escape "$status")"
    printf '  "task_id": %s,\n' "$(json_value "$task_id")"
    printf '  "started_at": %s,\n' "$(json_value "$started_at")"
    printf '  "completed_at": %s,\n' "$(json_value "$completed_at")"
    printf '  "exit_code": %s,\n' "$(json_number_or_null "$exit_code")"
    printf '  "pid": %s,\n' "$(json_number_or_null "$pid")"
    printf '  "log": %s,\n' "$(json_value "$log_path")"
    printf '  "result": %s\n' "$(json_value "$result_path")"
    printf '}\n'
  } > "$tmp"
  mv "$tmp" "$STATUS_FILE"
}

file_fingerprint() {
  local file="$1"
  if command -v stat >/dev/null 2>&1; then
    stat -c '%s:%Y' "$file"
  else
    printf 'unknown'
  fi
}

is_stable_file() {
  local file="$1"
  local before after

  if [ "$STABLE_SECONDS" -eq 0 ]; then
    return 0
  fi

  if ! command -v stat >/dev/null 2>&1; then
    log_msg "stable check skipped task=$file reason=stat-unavailable"
    return 0
  fi

  before="$(file_fingerprint "$file")"
  sleep "$STABLE_SECONDS"
  [ -f "$file" ] || return 1
  after="$(file_fingerprint "$file")"
  [ "$before" = "$after" ]
}

quarantine_task() {
  local task_file="$1"
  local exit_code="$2"
  local base stamp failed_task result_file tmp

  [ -f "$task_file" ] || return 0

  mkdir -p "$FAILED_DIR"
  base="$(basename "$task_file")"
  stamp="$(date -u +%Y%m%dT%H%M%SZ)"
  failed_task="$FAILED_DIR/${base%.md}.watcher-failed-$stamp.md"
  result_file="$FAILED_DIR/${base%.md}.watcher-failed-$stamp-result.md"
  tmp="$result_file.tmp.$$"

  mv "$task_file" "$failed_task"
  {
    printf '# Handoff Watcher Failure\n\n'
    printf 'status: failed\n'
    printf 'source: watcher\n'
    printf 'exit_code: %s\n' "$exit_code"
    printf 'failed_at: %s\n' "$(now_utc)"
    printf 'task: %s\n\n' "${failed_task#"$HANDOFF_ROOT/"}"
    printf 'The runner rejected this task before moving it out of queue. '
    printf 'Typical causes are duplicate task_id, invalid project_root, missing dependencies, or malformed input.\n'
  } > "$tmp"
  mv "$tmp" "$result_file"
  log_msg "quarantined task=$failed_task result=$result_file exit_code=$exit_code"
}

recover_active_task() {
  local active_file="$1"
  local task_id="$2"
  local previous_status="$3"
  local previous_pid="$4"
  local previous_started_at="$5"
  local stamp failed_task result_file result_rel failed_rel tmp recovered_at

  recovered_at="$(now_utc)"
  stamp="$(date -u +%Y%m%dT%H%M%SZ)"
  failed_task="$FAILED_DIR/$task_id.recovered-$stamp.md"
  result_file="$FAILED_DIR/$task_id.recovered-$stamp-result.md"
  failed_rel="$(relative_to_root "$failed_task")"
  result_rel="$(relative_to_root "$result_file")"
  tmp="$result_file.tmp.$$"

  mv "$active_file" "$failed_task"
  {
    printf '# Handoff Stale Active Recovery\n\n'
    printf 'status: recovered_failed\n'
    printf 'source: watcher\n'
    printf 'task_id: %s\n' "$task_id"
    printf 'recovered_at: %s\n' "$recovered_at"
    printf 'previous_status: %s\n' "${previous_status:-unknown}"
    printf 'previous_pid: %s\n' "${previous_pid:-unknown}"
    printf 'previous_started_at: %s\n' "${previous_started_at:-unknown}"
    printf 'task: %s\n\n' "$failed_rel"
    printf 'The watcher found this task in active/ while no runner held agent.lock. '
    printf 'It was moved to failed/ instead of being requeued automatically.\n'
  } > "$tmp"
  mv "$tmp" "$result_file"

  write_status "recovered_failed" "$task_id" "$previous_started_at" "$recovered_at" "" "" "$result_rel" ""
  log_msg "recovered stale active task=$failed_task result=$result_file previous_status=${previous_status:-unknown} previous_pid=${previous_pid:-unknown}"
}

recover_stale_active_tasks() {
  local active_files=()
  local active_file task_id previous_status previous_pid previous_started_at

  active_files=("$ACTIVE_DIR"/*.md)
  [ "${#active_files[@]}" -gt 0 ] || return 0

  touch "$AGENT_LOCK"
  exec 7>"$AGENT_LOCK"
  if ! flock -n 7; then
    log_msg "active recovery skipped reason=agent-lock-held active_count=${#active_files[@]}"
    exec 7>&-
    return 0
  fi

  previous_status="$(json_field status "$STATUS_FILE" || true)"
  previous_pid="$(json_field pid "$STATUS_FILE" || true)"
  previous_started_at="$(json_field started_at "$STATUS_FILE" || true)"

  for active_file in "${active_files[@]}"; do
    [ -f "$active_file" ] || continue
    task_id="$(safe_id "$(basename "${active_file%.md}")")"
    recover_active_task "$active_file" "$task_id" "$previous_status" "$previous_pid" "$previous_started_at"
  done

  flock -u 7
  exec 7>&-
}

while [ "$#" -gt 0 ]; do
  case "$1" in
    --once)
      MODE="once"
      shift
      ;;
    --poll-interval)
      [ "$#" -ge 2 ] || {
        usage
        exit 2
      }
      POLL_INTERVAL="$2"
      shift 2
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      usage
      exit 2
      ;;
  esac
done

[[ "$POLL_INTERVAL" =~ ^[0-9]+$ ]] || fail_fast "poll interval must be a non-negative integer"
[[ "$STABLE_SECONDS" =~ ^[0-9]+$ ]] || fail_fast "stable seconds must be a non-negative integer"
command -v flock >/dev/null 2>&1 || fail_fast "flock is required"
[ -x "$RUNNER" ] || fail_fast "handoff-runner.sh is missing or not executable"

mkdir -p "$QUEUE_DIR" "$ACTIVE_DIR" "$FAILED_DIR" "$LOG_DIR" "$RUNTIME_DIR" "$(dirname "$STATUS_FILE")"
touch "$WATCHER_LOCK"

exec 8>"$WATCHER_LOCK"
if ! flock -n 8; then
  echo "ERROR: another handoff watcher is active" >&2
  exit 75
fi

trap handle_signal INT TERM
shopt -s nullglob

log_msg "watcher started mode=$MODE poll_interval=${POLL_INTERVAL}s stable_seconds=${STABLE_SECONDS}s queue=$QUEUE_DIR runner=$RUNNER"
recover_stale_active_tasks

while [ "$STOP_REQUESTED" -eq 0 ]; do
  processed=0

  for task_file in "$QUEUE_DIR"/*.md; do
    [ "$STOP_REQUESTED" -eq 0 ] || break
    [ -f "$task_file" ] || continue

    if ! is_stable_file "$task_file"; then
      log_msg "skip unstable task=$task_file"
      continue
    fi

    log_msg "dispatch task=$task_file"
    set +e
    "$RUNNER" "$task_file" >> "$(log_file_for_today)" 2>&1
    exit_code=$?
    set -e
    log_msg "runner finished task=$task_file exit_code=$exit_code"
    processed=1

    if [ "$exit_code" -ne 0 ] && [ "$exit_code" -ne 75 ] && [ -f "$task_file" ]; then
      quarantine_task "$task_file" "$exit_code"
    fi

    if [ "$MODE" = "once" ]; then
      log_msg "watcher completed one iteration"
      exit "$exit_code"
    fi
  done

  if [ "$MODE" = "once" ]; then
    log_msg "watcher found no queued tasks"
    exit 0
  fi

  if [ "$processed" -eq 0 ]; then
    sleep "$POLL_INTERVAL"
  fi
done

log_msg "watcher stopped"
