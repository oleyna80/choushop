#!/usr/bin/env bash
# Run a command with a small, explicit environment for Claude Code handoff jobs.
set -euo pipefail

if [ "$#" -eq 0 ]; then
  echo "Usage: $0 <command> [args...]" >&2
  exit 2
fi

allow_var() {
  local name="$1"
  if [ "${!name+x}" ]; then
    printf '%s=%s\0' "$name" "${!name}"
  fi
}

env_args=()
while IFS= read -r -d '' item; do
  env_args+=("$item")
done < <(
  allow_var HOME
  allow_var PATH
  allow_var TMPDIR
  allow_var ANTHROPIC_BASE_URL
  allow_var ANTHROPIC_API_KEY
  allow_var ANTHROPIC_AUTH_TOKEN
  allow_var ANTHROPIC_MODEL
  allow_var ANTHROPIC_DEFAULT_SONNET_MODEL
  allow_var ANTHROPIC_DEFAULT_OPUS_MODEL
  allow_var ANTHROPIC_DEFAULT_HAIKU_MODEL
  allow_var CLAUDE_CODE_SUBAGENT_MODEL
  allow_var DEEPSEEK_API_KEY
)

exec env -i "${env_args[@]}" "$@"
