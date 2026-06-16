#!/usr/bin/env bash
# Run multiple handoff tasks concurrently with independent child locks/status files.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
HANDOFF_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
QUEUE_DIR="$HANDOFF_ROOT/queue"
LOG_DIR="$HANDOFF_ROOT/logs"
PARALLEL_DIR="$HANDOFF_ROOT/parallel"
RUNNER="${HANDOFF_RUNNER:-$SCRIPT_DIR/handoff-runner.sh}"

ALLOW_SHARED_PROJECT_ROOT=0
MAX_JOBS="${HANDOFF_PARALLEL_MAX_JOBS:-0}"

usage() {
  echo "Usage: $0 [--allow-shared-project-root] [--max-jobs N] <task-file> <task-file>..." >&2
  echo "Environment: HANDOFF_RUNNER=/path/to/handoff-runner.sh HANDOFF_PARALLEL_MAX_JOBS=N" >&2
}

now_utc() {
  date -u +"%Y-%m-%dT%H:%M:%SZ"
}

trim_scalar() {
  local value="$1"
  value="${value#"${value%%[![:space:]]*}"}"
  value="${value%"${value##*[![:space:]]}"}"
  value="${value%\"}"
  value="${value#\"}"
  value="${value%\'}"
  value="${value#\'}"
  printf '%s' "$value"
}

frontmatter_scalar() {
  local key="$1"
  local file="$2"
  local line in_frontmatter=0

  while IFS= read -r line; do
    if [ "$line" = "---" ]; then
      if [ "$in_frontmatter" -eq 0 ]; then
        in_frontmatter=1
        continue
      fi
      break
    fi

    if [ "$in_frontmatter" -eq 1 ] && [[ "$line" == "$key:"* ]]; then
      trim_scalar "${line#*:}"
      return 0
    fi
  done < "$file"

  return 1
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

relative_to_root() {
  local path="$1"
  case "$path" in
    "$HANDOFF_ROOT"/*) printf '%s' "${path#"$HANDOFF_ROOT/"}" ;;
    *) printf '%s' "$path" ;;
  esac
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

output_field() {
  local key="$1"
  local file="$2"
  local line

  [ -f "$file" ] || return 1
  while IFS= read -r line; do
    case "$line" in
      "$key="*)
        printf '%s' "${line#*=}"
        return 0
        ;;
    esac
  done < "$file"

  return 1
}

validate_max_jobs() {
  if ! [[ "$MAX_JOBS" =~ ^[0-9]+$ ]]; then
    echo "ERROR: --max-jobs must be a non-negative integer: $MAX_JOBS" >&2
    exit 2
  fi
}

resolve_project_root() {
  local task_file="$1"
  local task_abs task_dir project_root_raw project_root

  task_abs="$(cd "$(dirname "$task_file")" && pwd)/$(basename "$task_file")"
  project_root_raw="$(frontmatter_scalar project_root "$task_abs" || true)"
  if [ -z "$project_root_raw" ]; then
    project_root="$(cd "$HANDOFF_ROOT/.." && pwd)"
  elif [[ "$project_root_raw" = /* ]]; then
    project_root="$project_root_raw"
  else
    task_dir="$(dirname "$task_abs")"
    project_root="$task_dir/$project_root_raw"
  fi

  [ -d "$project_root" ] || {
    echo "ERROR: project_root not found for $task_file: $project_root" >&2
    exit 2
  }
  cd "$project_root" && pwd
}

write_parallel_status() {
  local status="$1"
  local exit_code="$2"
  local started_at="$3"
  local completed_at="$4"
  local log_rel="$5"
  local total="$6"
  local complete="$7"
  local failed="$8"
  local tmp="$PARALLEL_STATUS_FILE.tmp.$$"

  {
    printf '{\n'
    printf '  "status": "%s",\n' "$(json_escape "$status")"
    printf '  "run_id": "%s",\n' "$(json_escape "$RUN_ID")"
    printf '  "started_at": %s,\n' "$(json_value "$started_at")"
    printf '  "completed_at": %s,\n' "$(json_value "$completed_at")"
    printf '  "exit_code": %s,\n' "$(json_number_or_null "$exit_code")"
    printf '  "tasks_total": %s,\n' "$(json_number_or_null "$total")"
    printf '  "max_jobs": %s,\n' "$(json_number_or_null "$MAX_JOBS")"
    printf '  "tasks_complete": %s,\n' "$(json_number_or_null "$complete")"
    printf '  "tasks_failed": %s,\n' "$(json_number_or_null "$failed")"
    printf '  "log": %s\n' "$(json_value "$log_rel")"
    printf '}\n'
  } > "$tmp"
  mv "$tmp" "$PARALLEL_STATUS_FILE"
}

declare -a TASK_FILES=()
while [ "$#" -gt 0 ]; do
  case "$1" in
    --allow-shared-project-root)
      ALLOW_SHARED_PROJECT_ROOT=1
      shift
      ;;
    --max-jobs)
      shift
      [ "$#" -gt 0 ] || {
        echo "ERROR: --max-jobs requires a value" >&2
        exit 2
      }
      MAX_JOBS="$1"
      shift
      ;;
    --max-jobs=*)
      MAX_JOBS="${1#*=}"
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    --*)
      usage
      exit 2
      ;;
    *)
      TASK_FILES+=("$1")
      shift
      ;;
  esac
done

[ "${#TASK_FILES[@]}" -gt 0 ] || {
  usage
  exit 2
}
validate_max_jobs

command -v date >/dev/null 2>&1 || {
  echo "ERROR: date is required" >&2
  exit 2
}
[ -x "$RUNNER" ] || {
  echo "ERROR: handoff-runner.sh is missing or not executable: $RUNNER" >&2
  exit 2
}

mkdir -p "$QUEUE_DIR" "$LOG_DIR" "$PARALLEL_DIR"

declare -a TASK_ABS=()
declare -a TASK_IDS=()
declare -a PROJECT_ROOTS=()
declare -A SEEN_TASK_FILES=()
declare -A SEEN_TASK_IDS=()
declare -A SEEN_PROJECT_ROOTS=()

for task_file in "${TASK_FILES[@]}"; do
  raw_task_id=""
  task_id=""

  [ -f "$task_file" ] || {
    echo "ERROR: task file not found: $task_file" >&2
    exit 2
  }

  task_abs="$(cd "$(dirname "$task_file")" && pwd)/$(basename "$task_file")"
  if [ -n "${SEEN_TASK_FILES[$task_abs]:-}" ]; then
    echo "ERROR: duplicate task file: $task_file" >&2
    exit 2
  fi
  SEEN_TASK_FILES["$task_abs"]=1
  TASK_ABS+=("$task_abs")

  raw_task_id="$(frontmatter_scalar task_id "$task_abs" || true)"
  if [ -z "$raw_task_id" ]; then
    raw_task_id="$(basename "$task_abs")"
    raw_task_id="${raw_task_id%.*}"
  fi
  task_id="$(safe_id "$raw_task_id")"
  if [ -n "${SEEN_TASK_IDS[$task_id]:-}" ]; then
    echo "ERROR: duplicate task_id in parallel run: $task_id" >&2
    exit 2
  fi
  SEEN_TASK_IDS["$task_id"]=1
  TASK_IDS+=("$task_id")

  project_root="$(resolve_project_root "$task_abs")"
  PROJECT_ROOTS+=("$project_root")
  if [ "$ALLOW_SHARED_PROJECT_ROOT" -eq 0 ] && [ -n "${SEEN_PROJECT_ROOTS[$project_root]:-}" ]; then
    echo "ERROR: duplicate project_root in parallel run: $project_root" >&2
    echo "Use --allow-shared-project-root only if the tasks are safe to audit together." >&2
    exit 2
  fi
  SEEN_PROJECT_ROOTS["$project_root"]=1
done

RUN_ID="$(date -u +%Y%m%dT%H%M%SZ)-parallel-$$"
PARALLEL_LOG_FILE="$LOG_DIR/parallel-$RUN_ID.log"
PARALLEL_LOG_REL="$(relative_to_root "$PARALLEL_LOG_FILE")"
PARALLEL_STATUS_FILE="$PARALLEL_DIR/status-$RUN_ID.json"
STARTED_AT="$(now_utc)"

write_parallel_status "running" "" "$STARTED_AT" "" "$PARALLEL_LOG_REL" "${#TASK_ABS[@]}" 0 0

{
  printf '== parallel-runner ==\n'
  printf 'run_id=%s\n' "$RUN_ID"
  printf 'started_at=%s\n' "$STARTED_AT"
  printf 'handoff_root=%s\n' "$HANDOFF_ROOT"
    printf 'runner=%s\n' "$RUNNER"
    printf 'tasks_total=%s\n' "${#TASK_ABS[@]}"
    printf 'max_jobs=%s\n' "$MAX_JOBS"
    printf 'allow_shared_project_root=%s\n\n' "$ALLOW_SHARED_PROJECT_ROOT"
} >> "$PARALLEL_LOG_FILE"

declare -a PIDS=()
declare -a CHILD_OUTPUTS=()
declare -a CHILD_EXIT_FILES=()
declare -a CHILD_LOCKS=()
declare -a CHILD_STATUSES=()
declare -a PROCESS_EXIT_CODES=()
active_count=0

index=0
for task_abs in "${TASK_ABS[@]}"; do
  index=$((index + 1))
  child_id="$(safe_id "${TASK_IDS[$((index - 1))]}-$index")"
  child_lock="$PARALLEL_DIR/agent-$RUN_ID-$child_id.lock"
  child_status="$PARALLEL_DIR/status-$RUN_ID-$child_id.json"
  child_output="$LOG_DIR/parallel-$RUN_ID-$child_id.out"
  child_exit_file="$PARALLEL_DIR/exit-$RUN_ID-$child_id.code"
  CHILD_LOCKS+=("$child_lock")
  CHILD_STATUSES+=("$child_status")
  CHILD_OUTPUTS+=("$child_output")
  CHILD_EXIT_FILES+=("$child_exit_file")

  {
    printf 'dispatch index=%s task_id=%s task=%s project_root=%s lock=%s status_file=%s output=%s exit_file=%s\n' \
      "$index" "${TASK_IDS[$((index - 1))]}" "$task_abs" "${PROJECT_ROOTS[$((index - 1))]}" "$child_lock" "$child_status" "$child_output" "$child_exit_file"
  } >> "$PARALLEL_LOG_FILE"

  (
    set +e
    HANDOFF_AGENT_LOCK="$child_lock" \
      HANDOFF_STATUS_FILE="$child_status" \
      "$RUNNER" "$task_abs"
    child_exit=$?
    printf '%s\n' "$child_exit" > "$child_exit_file"
    exit "$child_exit"
  ) > "$child_output" 2>&1 &
  PIDS+=("$!")
  PROCESS_EXIT_CODES+=("running")
  active_count=$((active_count + 1))

  if [ "$MAX_JOBS" -gt 0 ] && [ "$active_count" -ge "$MAX_JOBS" ]; then
    set +e
    wait -n
    set -e
    active_count=$((active_count - 1))
  fi
done

while [ "$active_count" -gt 0 ]; do
  set +e
  wait -n
  set -e
  active_count=$((active_count - 1))
done

for i in "${!CHILD_EXIT_FILES[@]}"; do
  if [ -s "${CHILD_EXIT_FILES[$i]}" ]; then
    PROCESS_EXIT_CODES[$i]="$(<"${CHILD_EXIT_FILES[$i]}")"
  else
    PROCESS_EXIT_CODES[$i]="127"
  fi
done

complete_count=0
failed_count=0
aggregate_exit_code=0

{
  printf '\n== parallel-runner results ==\n'
} >> "$PARALLEL_LOG_FILE"

for i in "${!TASK_ABS[@]}"; do
  task_abs="${TASK_ABS[$i]}"
  child_output="${CHILD_OUTPUTS[$i]}"
  process_exit="${PROCESS_EXIT_CODES[$i]}"
  child_status_value="$(output_field status "$child_output" || true)"
  child_exit_value="$(output_field exit_code "$child_output" || true)"
  child_result_value="$(output_field result "$child_output" || true)"

  if [ "$process_exit" -eq 0 ] && [ "$child_status_value" = "complete" ]; then
    complete_count=$((complete_count + 1))
  else
    failed_count=$((failed_count + 1))
    aggregate_exit_code=1
  fi

  {
    printf 'task=%s process_exit=%s status=%s exit_code=%s result=%s output=%s\n' \
      "$task_abs" "$process_exit" "${child_status_value:-unknown}" "${child_exit_value:-unknown}" "${child_result_value:-unknown}" "$child_output"
    printf -- '--- child output: %s ---\n' "$task_abs"
    if [ -s "$child_output" ]; then
      sed -n '1,160p' "$child_output"
    else
      printf 'No child output captured.\n'
    fi
    printf -- '--- end child output ---\n'
  } >> "$PARALLEL_LOG_FILE"
done

COMPLETED_AT="$(now_utc)"
if [ "$aggregate_exit_code" -eq 0 ]; then
  FINAL_STATUS="complete"
else
  FINAL_STATUS="failed"
fi

{
  printf '\n== parallel-runner complete ==\n'
  printf 'completed_at=%s\n' "$COMPLETED_AT"
  printf 'status=%s\n' "$FINAL_STATUS"
  printf 'exit_code=%s\n' "$aggregate_exit_code"
  printf 'tasks_complete=%s\n' "$complete_count"
  printf 'tasks_failed=%s\n' "$failed_count"
} >> "$PARALLEL_LOG_FILE"

write_parallel_status "$FINAL_STATUS" "$aggregate_exit_code" "$STARTED_AT" "$COMPLETED_AT" "$PARALLEL_LOG_REL" "${#TASK_ABS[@]}" "$complete_count" "$failed_count"

printf 'status=%s\n' "$FINAL_STATUS"
printf 'run_id=%s\n' "$RUN_ID"
printf 'exit_code=%s\n' "$aggregate_exit_code"
printf 'tasks_total=%s\n' "${#TASK_ABS[@]}"
printf 'max_jobs=%s\n' "$MAX_JOBS"
printf 'tasks_complete=%s\n' "$complete_count"
printf 'tasks_failed=%s\n' "$failed_count"
printf 'log=%s\n' "$PARALLEL_LOG_REL"
printf 'status_file=%s\n' "$(relative_to_root "$PARALLEL_STATUS_FILE")"

exit "$aggregate_exit_code"
