#!/usr/bin/env bash
# Critic Gate hook — blocks Edit/Write until critic review is resolved.
# AGENTS.md § Critic Review Gate: critic is mandatory when triggers active.
# Gate file: .agent/critic-gate.md
set -euo pipefail

GATE_FILE=".agent/critic-gate.md"

# Read tool_name and file_path from stdin
tool=$(jq -r '.tool_name // ""' 2>/dev/null || echo "")
file_path=$(jq -r '.tool_input.file_path // ""' 2>/dev/null || echo "")

# Only check Edit/Write tools
case "$tool" in
  Edit|Write) ;;
  *) exit 0 ;;
esac

# Allow editing the gate file itself (Control Tower needs to update it)
case "$file_path" in
  *"$GATE_FILE"*) exit 0 ;;
esac

# No gate file → block (critic hasn't been considered)
if [ ! -f "$GATE_FILE" ]; then
  jq -n '{
    continue: false,
    hookSpecificOutput: {
      hookEventName: "PreToolUse",
      permissionDecision: "deny",
      permissionDecisionReason: "Critic gate: .agent/critic-gate.md is missing. Complete Stage 0 Preflight with critic review decision before editing files."
    }
  }'
  exit 0
fi

# Read gate status
status=$(grep -i "^Status:" "$GATE_FILE" 2>/dev/null | head -1 | sed 's/Status:\s*//i' | xargs)

case "$status" in
  READY|SKIPPED)
    # Critic completed or explicitly skipped — allow edits
    exit 0
    ;;
  *)
    # PENDING or unknown status — block
    jq -n --arg status "$status" '{
      continue: false,
      hookSpecificOutput: {
        hookEventName: "PreToolUse",
        permissionDecision: "deny",
        permissionDecisionReason: ("Critic gate: .agent/critic-gate.md status is " + $status + ". Launch critic agent or obtain Owner approval (Status: SKIPPED) before editing files.")
      }
    }'
    exit 0
    ;;
esac
