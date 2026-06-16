#!/usr/bin/env bash
# Clean up old Claude Code processes started by handoff-runner.
set -euo pipefail

MAX_AGE_SECONDS="${1:-${HANDOFF_TIMEOUT_SECONDS:-1800}}"
PATTERN="${HANDOFF_CLEANUP_PATTERN:-handoff-}"

if ! [[ "$MAX_AGE_SECONDS" =~ ^[0-9]+$ ]]; then
  echo "Usage: $0 [max-age-seconds]" >&2
  exit 2
fi

if ! command -v ps >/dev/null 2>&1; then
  echo "ERROR: ps is required for cleanup" >&2
  exit 2
fi

found=0
while IFS= read -r line; do
  pid="${line%% *}"
  rest="${line#* }"
  age="${rest%% *}"
  args="${rest#* }"

  if [[ "$pid" =~ ^[0-9]+$ ]] &&
     [[ "$age" =~ ^[0-9]+$ ]] &&
     [ "$age" -gt "$MAX_AGE_SECONDS" ] &&
     [[ "$args" == *claude* ]] &&
     [[ "$args" == *"$PATTERN"* ]]; then
    echo "terminating pid=$pid age=${age}s args=$args"
    kill "$pid" 2>/dev/null || true
    found=1
  fi
done < <(ps -eo pid=,etimes=,args=)

if [ "$found" -eq 0 ]; then
  echo "no matching orphan Claude Code processes older than ${MAX_AGE_SECONDS}s"
fi
