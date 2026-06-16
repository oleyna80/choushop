#!/usr/bin/env bash
# Minimal file-based handoff runner for Codex -> Claude Code tasks.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
HANDOFF_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
QUEUE_DIR="$HANDOFF_ROOT/queue"
ACTIVE_DIR="$HANDOFF_ROOT/active"
DONE_DIR="$HANDOFF_ROOT/done"
FAILED_DIR="$HANDOFF_ROOT/failed"
LOG_DIR="$HANDOFF_ROOT/logs"
RUNTIME_DIR="$HANDOFF_ROOT/runtime"
SANITIZE_ENV="$SCRIPT_DIR/sanitize-env.sh"
HANDOFF_ENV_FILE="${HANDOFF_ENV_FILE:-$RUNTIME_DIR/handoff.env}"
HANDOFF_ENV_LOADED=0

if [ -f "$HANDOFF_ENV_FILE" ]; then
  set -a
  # shellcheck source=/dev/null
  . "$HANDOFF_ENV_FILE"
  set +a
  HANDOFF_ENV_LOADED=1
fi

LOCK_FILE="${HANDOFF_AGENT_LOCK:-$HANDOFF_ROOT/agent.lock}"
STATUS_FILE="${HANDOFF_STATUS_FILE:-$RUNTIME_DIR/status.json}"
DEFAULT_TIMEOUT_SECONDS="${HANDOFF_TIMEOUT_SECONDS:-1800}"
TIMEOUT_KILL_AFTER="${HANDOFF_TIMEOUT_KILL_AFTER:-30s}"
DEFAULT_MAX_BUDGET_USD="${HANDOFF_CLAUDE_MAX_BUDGET_USD:-0.50}"
SCOPE_AUDIT_ENABLED="${HANDOFF_SCOPE_AUDIT:-1}"
RUNTIME_GUARD_ENABLED="${HANDOFF_RUNTIME_GUARD:-1}"
REQUIRE_SCOPE_RULES="${HANDOFF_REQUIRE_SCOPE_RULES:-0}"
ALLOW_DANGEROUS_PROJECT_ROOTS="${HANDOFF_ALLOW_DANGEROUS_PROJECT_ROOTS:-0}"
DEFAULT_FORBIDDEN_SCOPE_ENABLED="${HANDOFF_DEFAULT_FORBIDDEN_SCOPE:-1}"
SCOPE_FAILURE_EXIT_CODE=90

usage() {
  echo "Usage: $0 <task-file>" >&2
  echo "Example: $0 ../queue/001.codex-to-claude.md" >&2
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

frontmatter_list() {
  local key="$1"
  local file="$2"
  local line value in_frontmatter=0 in_list=0

  while IFS= read -r line; do
    if [ "$line" = "---" ]; then
      if [ "$in_frontmatter" -eq 0 ]; then
        in_frontmatter=1
        continue
      fi
      break
    fi

    [ "$in_frontmatter" -eq 1 ] || continue

    if [[ "$line" =~ ^[A-Za-z0-9_-]+: ]]; then
      if [ "$in_list" -eq 1 ]; then
        break
      fi

      if [[ "$line" == "$key:"* ]]; then
        value="$(trim_scalar "${line#*:}")"
        if [ -n "$value" ]; then
          printf '%s\n' "$value"
          return 0
        fi
        in_list=1
        continue
      fi
    fi

    if [ "$in_list" -eq 1 ]; then
      if [[ "$line" =~ ^[[:space:]]*-[[:space:]]*(.*)$ ]]; then
        trim_scalar "${BASH_REMATCH[1]}"
        printf '\n'
      elif [[ "$line" =~ ^[[:space:]]*$ ]]; then
        continue
      else
        break
      fi
    fi
  done < "$file"
}

normalize_scope_array() {
  local -n values_ref="$1"
  local -a normalized=()
  local value

  for value in "${values_ref[@]}"; do
    value="$(trim_scalar "$value")"
    [ -n "$value" ] && normalized+=("$value")
  done

  values_ref=("${normalized[@]}")
}

has_scope_rules() {
  [ "${#ALLOWED_SCOPE[@]}" -gt 0 ] || [ "${#FORBIDDEN_SCOPE[@]}" -gt 0 ]
}

require_scope_audit_tools() {
  local tool

  for tool in find cksum readlink comm awk; do
    command -v "$tool" >/dev/null 2>&1 || fail_fast "$tool is required when scope rules are declared"
  done
}

append_default_forbidden_scope() {
  [ "$DEFAULT_FORBIDDEN_SCOPE_ENABLED" = "1" ] || return 0

  FORBIDDEN_SCOPE+=(
    ".env"
    ".env.*"
    "**/.env"
    "**/.env.*"
    "secrets/**"
    "**/secrets/**"
    "*.pem"
    "**/*.pem"
    "*.key"
    "**/*.key"
    "id_rsa"
    "**/id_rsa"
    "id_ed25519"
    "**/id_ed25519"
  )
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

collect_changed_paths() {
  local project_root="$1"
  local line path

  git -C "$project_root" status --porcelain --untracked-files=all |
    while IFS= read -r line; do
      [ -n "$line" ] || continue
      path="${line:3}"
      case "$line" in
        R*|C*) path="${path##* -> }" ;;
      esac
      [ -n "$path" ] && printf '%s\n' "$path"
    done
}

collect_project_snapshot() {
  local project_root="$1"
  local output_file="$2"
  local path rel target fingerprint

  (
    cd "$project_root" || exit 2
    find . -path ./.git -prune -o -print0 |
      while IFS= read -r -d '' path; do
        [ "$path" = "." ] && continue
        rel="${path#./}"

        if [ -L "$path" ]; then
          target="$(readlink "$path" 2>/dev/null || printf 'unreadable')"
          printf 'L\t%s\t%s\n' "$rel" "$target"
        elif [ -f "$path" ]; then
          fingerprint="$(cksum < "$path" 2>/dev/null || printf 'unreadable')"
          printf 'F\t%s\t%s\n' "$rel" "$fingerprint"
        elif [ -d "$path" ]; then
          printf 'D\t%s\t-\n' "$rel"
        else
          printf 'O\t%s\t-\n' "$rel"
        fi
      done | LC_ALL=C sort
  ) > "$output_file"
}

changed_paths_from_snapshots() {
  local before_file="$1"
  local after_file="$2"

  {
    comm -23 "$before_file" "$after_file"
    comm -13 "$before_file" "$after_file"
  } | awk -F '\t' 'NF >= 2 {print $2}' | LC_ALL=C sort -u
}

pattern_matches_path() {
  local pattern="$1"
  local relative_path="$2"
  local absolute_path="$PROJECT_ROOT/$relative_path"

  if [[ "$pattern" = /* ]]; then
    [[ "$absolute_path" == $pattern ]]
  else
    pattern="${pattern#./}"
    [[ "$relative_path" == $pattern ]]
  fi
}

path_matches_any_pattern() {
  local relative_path="$1"
  shift
  local pattern

  for pattern in "$@"; do
    [ -n "$pattern" ] || continue
    if pattern_matches_path "$pattern" "$relative_path"; then
      return 0
    fi
  done

  return 1
}

append_list_to_log() {
  local label="$1"
  shift
  local value

  printf '%s=' "$label"
  if [ "$#" -eq 0 ]; then
    printf '[]\n'
    return 0
  fi

  printf '['
  local first=1
  for value in "$@"; do
    if [ "$first" -eq 1 ]; then
      first=0
    else
      printf ', '
    fi
    printf '%s' "$value"
  done
  printf ']\n'
}

scope_pattern_is_too_broad() {
  local pattern="$1"
  pattern="${pattern#./}"
  pattern="${pattern%/}"

  case "$pattern" in
    ""|"*"|"**"|"."|"./"|"/*"|"$PROJECT_ROOT"|"$PROJECT_ROOT/"|"$PROJECT_ROOT/**")
      return 0
      ;;
  esac

  return 1
}

scope_pattern_has_traversal() {
  local pattern="$1"
  case "$pattern" in
    *".."*) return 0 ;;
  esac
  return 1
}

absolute_scope_pattern_outside_project() {
  local pattern="$1"

  [[ "$pattern" = /* ]] || return 1
  case "$pattern" in
    "$PROJECT_ROOT"/*|"$PROJECT_ROOT") return 1 ;;
    *) return 0 ;;
  esac
}

project_root_is_dangerous() {
  local home_path="${HOME:-}"

  case "$PROJECT_ROOT" in
    "/"|"/home"|"/tmp"|"/var"|"/etc"|"/usr"|"/opt"|"/root")
      return 0
      ;;
  esac

  if [ -n "$home_path" ] && [ "$PROJECT_ROOT" = "$home_path" ]; then
    return 0
  fi

  return 1
}

run_runtime_guard() {
  RUNTIME_GUARD_STATUS="skipped"
  RUNTIME_GUARD_REASON=""
  RUNTIME_GUARD_VIOLATIONS=()

  if [ "$RUNTIME_GUARD_ENABLED" = "0" ]; then
    RUNTIME_GUARD_REASON="disabled"
    return 0
  fi

  if [ "$ALLOW_DANGEROUS_PROJECT_ROOTS" != "1" ] && project_root_is_dangerous; then
    RUNTIME_GUARD_VIOLATIONS+=("dangerous_project_root:$PROJECT_ROOT")
  fi

  if [ "$REQUIRE_SCOPE_RULES" = "1" ] && [ "${#ALLOWED_SCOPE[@]}" -eq 0 ]; then
    RUNTIME_GUARD_VIOLATIONS+=("missing_allowed_scope")
  fi

  local pattern
  for pattern in "${ALLOWED_SCOPE[@]}"; do
    if scope_pattern_is_too_broad "$pattern"; then
      RUNTIME_GUARD_VIOLATIONS+=("broad_allowed_scope:$pattern")
    fi
    if scope_pattern_has_traversal "$pattern"; then
      RUNTIME_GUARD_VIOLATIONS+=("traversal_allowed_scope:$pattern")
    fi
    if absolute_scope_pattern_outside_project "$pattern"; then
      RUNTIME_GUARD_VIOLATIONS+=("outside_project_allowed_scope:$pattern")
    fi
  done

  for pattern in "${FORBIDDEN_SCOPE[@]}"; do
    if scope_pattern_has_traversal "$pattern"; then
      RUNTIME_GUARD_VIOLATIONS+=("traversal_forbidden_scope:$pattern")
    fi
    if absolute_scope_pattern_outside_project "$pattern"; then
      RUNTIME_GUARD_VIOLATIONS+=("outside_project_forbidden_scope:$pattern")
    fi
  done

  if [ "${#RUNTIME_GUARD_VIOLATIONS[@]}" -gt 0 ]; then
    RUNTIME_GUARD_STATUS="failed"
    RUNTIME_GUARD_REASON="preflight-violation"
    return 1
  fi

  RUNTIME_GUARD_STATUS="passed"
  RUNTIME_GUARD_REASON="preflight-ok"
  return 0
}

run_scope_audit() {
  SCOPE_AUDIT_STATUS="skipped"
  SCOPE_AUDIT_REASON=""
  SCOPE_AUDIT_CHANGED_PATHS=()
  SCOPE_AUDIT_VIOLATIONS=()

  if [ "$SCOPE_AUDIT_ENABLED" = "0" ]; then
    SCOPE_AUDIT_REASON="disabled"
    return 0
  fi

  if ! has_scope_rules; then
    SCOPE_AUDIT_REASON="no-scope-rules"
    return 0
  fi

  local -a after_paths=()
  local path

  if [ ! -f "$SCOPE_SNAPSHOT_BEFORE_FILE" ]; then
    SCOPE_AUDIT_STATUS="failed"
    SCOPE_AUDIT_REASON="missing-before-snapshot"
    SCOPE_AUDIT_VIOLATIONS+=("scope_audit_internal:missing-before-snapshot")
    return 0
  fi

  collect_project_snapshot "$PROJECT_ROOT" "$SCOPE_SNAPSHOT_AFTER_FILE"
  mapfile -t after_paths < <(changed_paths_from_snapshots "$SCOPE_SNAPSHOT_BEFORE_FILE" "$SCOPE_SNAPSHOT_AFTER_FILE")
  for path in "${after_paths[@]}"; do
    SCOPE_AUDIT_CHANGED_PATHS+=("$path")

    if path_matches_any_pattern "$path" "${FORBIDDEN_SCOPE[@]}"; then
      SCOPE_AUDIT_VIOLATIONS+=("forbidden_scope:$path")
      continue
    fi

    if [ "${#ALLOWED_SCOPE[@]}" -gt 0 ] && ! path_matches_any_pattern "$path" "${ALLOWED_SCOPE[@]}"; then
      SCOPE_AUDIT_VIOLATIONS+=("outside_allowed_scope:$path")
    fi
  done

  if [ "${#SCOPE_AUDIT_VIOLATIONS[@]}" -gt 0 ]; then
    SCOPE_AUDIT_STATUS="failed"
    SCOPE_AUDIT_REASON="scope-violation"
  else
    SCOPE_AUDIT_STATUS="passed"
    SCOPE_AUDIT_REASON="changed-files-within-scope"
  fi
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
    printf '  "task_id": "%s",\n' "$(json_escape "$task_id")"
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

write_result() {
  local result_file="$1"
  local status="$2"
  local task_id="$3"
  local exit_code="$4"
  local started_at="$5"
  local completed_at="$6"
  local log_rel="$7"
  local task_rel="$8"
  local tmp="$result_file.tmp.$$"

  {
    printf '# Handoff Result\n\n'
    printf 'status: %s\n' "$status"
    printf 'task_id: %s\n' "$task_id"
    printf 'exit_code: %s\n' "$exit_code"
    printf 'started_at: %s\n' "$started_at"
    printf 'completed_at: %s\n' "$completed_at"
    printf 'task: %s\n' "$task_rel"
    printf 'log: %s\n\n' "$log_rel"
    printf '## Claude Output\n\n'
    if [ -s "$HANDOFF_ROOT/$log_rel" ]; then
      local line_count=0
      local line
      while IFS= read -r line && [ "$line_count" -lt 240 ]; do
        printf '%s\n' "$line"
        line_count=$((line_count + 1))
      done < "$HANDOFF_ROOT/$log_rel"
    else
      printf 'No log output captured.\n'
    fi
  } > "$tmp"
  mv "$tmp" "$result_file"
}

fail_fast() {
  echo "ERROR: $*" >&2
  exit 2
}

if [ "$#" -ne 1 ]; then
  usage
  exit 2
fi

command -v flock >/dev/null 2>&1 || fail_fast "flock is required"
command -v timeout >/dev/null 2>&1 || fail_fast "timeout is required"
command -v claude >/dev/null 2>&1 || fail_fast "claude is required"
[ -x "$SANITIZE_ENV" ] || fail_fast "sanitize-env.sh is missing or not executable"

TASK_INPUT="$1"
[ -f "$TASK_INPUT" ] || fail_fast "task file not found: $TASK_INPUT"

mkdir -p "$QUEUE_DIR" "$ACTIVE_DIR" "$DONE_DIR" "$FAILED_DIR" "$LOG_DIR" "$RUNTIME_DIR"
mkdir -p "$(dirname "$LOCK_FILE")" "$(dirname "$STATUS_FILE")"
touch "$LOCK_FILE"

TASK_INPUT_ABS="$(cd "$(dirname "$TASK_INPUT")" && pwd)/$(basename "$TASK_INPUT")"
RAW_TASK_ID="$(frontmatter_scalar task_id "$TASK_INPUT_ABS" || true)"
if [ -z "$RAW_TASK_ID" ]; then
  RAW_TASK_ID="$(basename "$TASK_INPUT_ABS")"
  RAW_TASK_ID="${RAW_TASK_ID%.*}"
fi
TASK_ID="$(safe_id "$RAW_TASK_ID")"

TIMEOUT_SECONDS="$(frontmatter_scalar timeout_seconds "$TASK_INPUT_ABS" || true)"
if ! [[ "$TIMEOUT_SECONDS" =~ ^[0-9]+$ ]]; then
  TIMEOUT_SECONDS="$DEFAULT_TIMEOUT_SECONDS"
fi

PROJECT_ROOT_RAW="$(frontmatter_scalar project_root "$TASK_INPUT_ABS" || true)"
if [ -z "$PROJECT_ROOT_RAW" ]; then
  PROJECT_ROOT="$(cd "$HANDOFF_ROOT/.." && pwd)"
elif [[ "$PROJECT_ROOT_RAW" = /* ]]; then
  PROJECT_ROOT="$PROJECT_ROOT_RAW"
else
  TASK_INPUT_DIR="$(dirname "$TASK_INPUT_ABS")"
  PROJECT_ROOT="$TASK_INPUT_DIR/$PROJECT_ROOT_RAW"
fi
[ -d "$PROJECT_ROOT" ] || fail_fast "project_root not found: $PROJECT_ROOT"
PROJECT_ROOT="$(cd "$PROJECT_ROOT" && pwd)"

declare -a ALLOWED_SCOPE=()
declare -a FORBIDDEN_SCOPE=()
declare -a BASELINE_CHANGED_PATHS=()
declare -a SCOPE_AUDIT_CHANGED_PATHS=()
declare -a SCOPE_AUDIT_VIOLATIONS=()
declare -a RUNTIME_GUARD_VIOLATIONS=()
mapfile -t ALLOWED_SCOPE < <(frontmatter_list allowed_scope "$TASK_INPUT_ABS" || true)
mapfile -t FORBIDDEN_SCOPE < <(frontmatter_list forbidden_scope "$TASK_INPUT_ABS" || true)
normalize_scope_array ALLOWED_SCOPE
normalize_scope_array FORBIDDEN_SCOPE
append_default_forbidden_scope

if ! run_runtime_guard; then
  append_list_to_log "runtime_guard_violations" "${RUNTIME_GUARD_VIOLATIONS[@]}" >&2
  fail_fast "runtime guard failed: $RUNTIME_GUARD_REASON"
fi

if [ "$SCOPE_AUDIT_ENABLED" != "0" ] && has_scope_rules; then
  require_scope_audit_tools
  if command -v git >/dev/null 2>&1 && git -C "$PROJECT_ROOT" rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    mapfile -t BASELINE_CHANGED_PATHS < <(collect_changed_paths "$PROJECT_ROOT")
  fi
fi

LOG_STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
LOG_FILE="$LOG_DIR/session-$TASK_ID-$LOG_STAMP-$$.log"
LOG_REL="$(relative_to_root "$LOG_FILE")"
RUNTIME_TASK_DIR="$RUNTIME_DIR/$TASK_ID-$LOG_STAMP-$$"
RUNTIME_TMP_DIR="$RUNTIME_TASK_DIR/tmp"
SCOPE_SNAPSHOT_BEFORE_FILE="$RUNTIME_TASK_DIR/scope-before.tsv"
SCOPE_SNAPSHOT_AFTER_FILE="$RUNTIME_TASK_DIR/scope-after.tsv"
ACTIVE_FILE="$ACTIVE_DIR/$TASK_ID.md"
DONE_TASK_FILE="$DONE_DIR/$TASK_ID.md"
FAILED_TASK_FILE="$FAILED_DIR/$TASK_ID.md"
DONE_RESULT_FILE="$DONE_DIR/$TASK_ID-result.md"
FAILED_RESULT_FILE="$FAILED_DIR/$TASK_ID-result.md"

exec 9>"$LOCK_FILE"
if ! flock -n 9; then
  echo "ERROR: another handoff runner is active" >&2
  exit 75
fi

if [ -e "$ACTIVE_FILE" ]; then
  fail_fast "active task already exists: $ACTIVE_FILE"
fi
if [ -e "$DONE_TASK_FILE" ] || [ -e "$FAILED_TASK_FILE" ]; then
  fail_fast "task id already completed or failed: $TASK_ID"
fi

mv "$TASK_INPUT_ABS" "$ACTIVE_FILE"
mkdir -p "$RUNTIME_TMP_DIR"
chmod 700 "$RUNTIME_TASK_DIR" "$RUNTIME_TMP_DIR"
if [ "$SCOPE_AUDIT_ENABLED" != "0" ] && has_scope_rules; then
  collect_project_snapshot "$PROJECT_ROOT" "$SCOPE_SNAPSHOT_BEFORE_FILE"
fi
STARTED_AT="$(now_utc)"

{
  printf '== handoff-runner ==\n'
  printf 'task_id=%s\n' "$TASK_ID"
  printf 'started_at=%s\n' "$STARTED_AT"
  printf 'timeout_seconds=%s\n' "$TIMEOUT_SECONDS"
  printf 'timeout_kill_after=%s\n' "$TIMEOUT_KILL_AFTER"
  printf 'handoff_root=%s\n' "$HANDOFF_ROOT"
  printf 'handoff_env_file=%s\n' "$HANDOFF_ENV_FILE"
  printf 'handoff_env_loaded=%s\n' "$HANDOFF_ENV_LOADED"
  printf 'lock_file=%s\n' "$LOCK_FILE"
  printf 'status_file=%s\n' "$STATUS_FILE"
  printf 'project_root=%s\n\n' "$PROJECT_ROOT"
  printf 'runtime_guard_enabled=%s\n' "$RUNTIME_GUARD_ENABLED"
  printf 'runtime_guard_status=%s\n' "$RUNTIME_GUARD_STATUS"
  printf 'runtime_guard_reason=%s\n' "$RUNTIME_GUARD_REASON"
  printf 'runtime_tmp_dir=%s\n' "$RUNTIME_TMP_DIR"
  append_list_to_log "runtime_guard_violations" "${RUNTIME_GUARD_VIOLATIONS[@]}"
  printf 'scope_audit_enabled=%s\n' "$SCOPE_AUDIT_ENABLED"
  printf 'default_forbidden_scope_enabled=%s\n' "$DEFAULT_FORBIDDEN_SCOPE_ENABLED"
  append_list_to_log "allowed_scope" "${ALLOWED_SCOPE[@]}"
  append_list_to_log "forbidden_scope" "${FORBIDDEN_SCOPE[@]}"
  append_list_to_log "baseline_changed_paths" "${BASELINE_CHANGED_PATHS[@]}"
  printf 'scope_audit_mode=%s\n' "filesystem-snapshot"
  printf 'scope_snapshot_before=%s\n' "$(relative_to_root "$SCOPE_SNAPSHOT_BEFORE_FILE")"
  printf '\n'
} >> "$LOG_FILE"

PROMPT="$(<"$ACTIVE_FILE")"
CLAUDE_ARGS=(
  claude
  --dangerously-skip-permissions
  --no-session-persistence
  --max-budget-usd "$DEFAULT_MAX_BUDGET_USD"
  --name "handoff-$TASK_ID"
  -p
  --
  "$PROMPT"
)

set +e
(
  cd "$PROJECT_ROOT" || exit 2
  TMPDIR="$RUNTIME_TMP_DIR" "$SANITIZE_ENV" timeout --kill-after="$TIMEOUT_KILL_AFTER" "$TIMEOUT_SECONDS" "${CLAUDE_ARGS[@]}"
) >> "$LOG_FILE" 2>&1 &
CHILD_PID=$!
write_status "running" "$TASK_ID" "$STARTED_AT" "" "" "$LOG_REL" "" "$CHILD_PID"
wait "$CHILD_PID"
EXIT_CODE=$?
set -e

COMPLETED_AT="$(now_utc)"
run_scope_audit

case "$EXIT_CODE" in
  0)
    FINAL_STATUS="complete"
    FINAL_TASK_FILE="$DONE_TASK_FILE"
    FINAL_RESULT_FILE="$DONE_RESULT_FILE"
    ;;
  124)
    FINAL_STATUS="timed_out"
    FINAL_TASK_FILE="$FAILED_TASK_FILE"
    FINAL_RESULT_FILE="$FAILED_RESULT_FILE"
    ;;
  *)
    FINAL_STATUS="failed"
    FINAL_TASK_FILE="$FAILED_TASK_FILE"
    FINAL_RESULT_FILE="$FAILED_RESULT_FILE"
    ;;
esac
FINAL_EXIT_CODE="$EXIT_CODE"

if [ "$SCOPE_AUDIT_STATUS" = "failed" ]; then
  FINAL_STATUS="scope_failed"
  FINAL_EXIT_CODE="$SCOPE_FAILURE_EXIT_CODE"
  FINAL_TASK_FILE="$FAILED_TASK_FILE"
  FINAL_RESULT_FILE="$FAILED_RESULT_FILE"
fi

{
  printf '\n== scope-audit ==\n'
  printf 'status=%s\n' "$SCOPE_AUDIT_STATUS"
  printf 'reason=%s\n' "$SCOPE_AUDIT_REASON"
  append_list_to_log "changed_paths" "${SCOPE_AUDIT_CHANGED_PATHS[@]}"
  append_list_to_log "violations" "${SCOPE_AUDIT_VIOLATIONS[@]}"
  printf '\n== handoff-runner complete ==\n'
  printf 'completed_at=%s\n' "$COMPLETED_AT"
  printf 'claude_exit_code=%s\n' "$EXIT_CODE"
  printf 'exit_code=%s\n' "$FINAL_EXIT_CODE"
  printf 'status=%s\n' "$FINAL_STATUS"
} >> "$LOG_FILE"

mv "$ACTIVE_FILE" "$FINAL_TASK_FILE"
FINAL_TASK_REL="$(relative_to_root "$FINAL_TASK_FILE")"
FINAL_RESULT_REL="$(relative_to_root "$FINAL_RESULT_FILE")"
write_result "$FINAL_RESULT_FILE" "$FINAL_STATUS" "$TASK_ID" "$FINAL_EXIT_CODE" "$STARTED_AT" "$COMPLETED_AT" "$LOG_REL" "$FINAL_TASK_REL"
write_status "$FINAL_STATUS" "$TASK_ID" "$STARTED_AT" "$COMPLETED_AT" "$FINAL_EXIT_CODE" "$LOG_REL" "$FINAL_RESULT_REL" ""

printf 'status=%s\n' "$FINAL_STATUS"
printf 'task_id=%s\n' "$TASK_ID"
printf 'exit_code=%s\n' "$FINAL_EXIT_CODE"
printf 'log=%s\n' "$LOG_REL"
printf 'result=%s\n' "$FINAL_RESULT_REL"
exit "$FINAL_EXIT_CODE"
