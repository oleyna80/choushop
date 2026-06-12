#!/usr/bin/env bash
# Critic Gate hook — blocks Edit/Write until critic review is resolved.
# AGENTS.md § Critic Review Gate: critic is mandatory when triggers active.
# Gate file: .agent/critic-gate.md
# Audit file: memory-bank/orchestrator-log.md (or memory_bank/orchestrator-log.md)
set -euo pipefail

GATE_FILE=".agent/critic-gate.md"

# Detect memory convention
MEMORY_DIR="memory_bank"
[ -d "memory-bank" ] && [ -f "memory-bank/orchestrator-log.md" ] && MEMORY_DIR="memory-bank"
LOG_FILE="$MEMORY_DIR/orchestrator-log.md"

# Read tool_name and file_path from stdin
tool=$(jq -r '.tool_name // ""' 2>/dev/null || echo "")
file_path=$(jq -r '.tool_input.file_path // ""' 2>/dev/null || echo "")

# Only check Edit/Write tools
case "$tool" in
  Edit|Write) ;;
  *) exit 0 ;;
esac

# Allow editing the gate file itself + orchestrator-log (Control Tower needs them)
case "$file_path" in
  *"$GATE_FILE"*) exit 0 ;;
  *"$LOG_FILE"*)   exit 0 ;;
esac

# No gate file → block
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

# Read gate status and WB-ID
status=$(grep -i "^Status:" "$GATE_FILE" 2>/dev/null | head -1 | sed 's/Status:\s*//i' | xargs)
wb_id=$(grep -i "^Work Block:" "$GATE_FILE" 2>/dev/null | head -1 | sed 's/Work Block:\s*//i' | xargs)

case "$status" in
  READY)
    exit 0  # Critic completed — allow
    ;;

  SKIPPED)
    # ── SKIPPED validation ──────────────────────────────────────────
    # SKIPPED must have a matching orchestrator-log entry with:
    #   critic: SKIPPED — Owner approval — [reason]

    if [ -z "$wb_id" ]; then
      jq -n '{
        continue: false,
        hookSpecificOutput: {
          hookEventName: "PreToolUse",
          permissionDecision: "deny",
          permissionDecisionReason: "Critic gate: SKIPPED requires Work Block ID in gate file (e.g. \"Work Block: wb-010\")."
        }
      }'
      exit 0
    fi

    if [ ! -f "$LOG_FILE" ]; then
      jq -n '{
        continue: false,
        hookSpecificOutput: {
          hookEventName: "PreToolUse",
          permissionDecision: "deny",
          permissionDecisionReason: ("Critic gate: SKIPPED requires orchestrator-log entry. " + $LOG_FILE + " not found.")
        }
      }'
      exit 0
    fi

    # Search orchestrator-log for matching SKIPPED entry with this WB ID
    if ! grep -q "^|.*${wb_id}.*critic: SKIPPED" "$LOG_FILE" 2>/dev/null; then
      jq -n --arg wb "$wb_id" '{
        continue: false,
        hookSpecificOutput: {
          hookEventName: "PreToolUse",
          permissionDecision: "deny",
          permissionDecisionReason: ("Critic gate: SKIPPED not authorized. No matching \"critic: SKIPPED — Owner approval\" entry in orchestrator-log for " + $wb + ".")
        }
      }'
      exit 0
    fi

    # ── No-skip domain check ────────────────────────────────────────
    # First WB in a new domain cannot be skipped
    no_skip=$(grep -i "^No-Skip:" "$GATE_FILE" 2>/dev/null | head -1 | sed 's/No-Skip:\s*//i' | xargs)
    if [ "$no_skip" = "true" ]; then
      jq -n '{
        continue: false,
        hookSpecificOutput: {
          hookEventName: "PreToolUse",
          permissionDecision: "deny",
          permissionDecisionReason: "Critic gate: this Work Block touches a new domain (no-skip enforced). SKIPPED is not allowed. Launch critic agent."
        }
      }'
      exit 0
    fi

    # ── Consecutive skip limit ──────────────────────────────────────
    # 3+ consecutive SKIPs → next WB cannot skip
    skip_count=0
    while IFS= read -r line; do
      case "$line" in
        *"SKIPPED"*) skip_count=$((skip_count + 1)) ;;
        *"APPROVE"*|*"SUPPLEMENT"*|*"RECONSIDER"*) skip_count=0 ;;
      esac
    done < <(grep "critic:" "$LOG_FILE" 2>/dev/null || true)

    if [ "$skip_count" -ge 3 ]; then
      jq -n --arg n "$skip_count" '{
        continue: false,
        hookSpecificOutput: {
          hookEventName: "PreToolUse",
          permissionDecision: "deny",
          permissionDecisionReason: ("Critic gate: " + $n + " consecutive SKIPs. Critic is mandatory for this Work Block. Launch critic agent.")
        }
      }'
      exit 0
    fi

    # All validations passed — SKIPPED is legitimate
    exit 0
    ;;

  *)
    # PENDING or unknown — block
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
