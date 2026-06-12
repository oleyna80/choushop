#!/usr/bin/env bash
# Bootstrap verification: ensure required workflow layer paths exist.
# Run after cloning or restoring a workspace.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
MISSING=0

echo "==> Bootstrap: verifying workflow layer at $ROOT"

for path in \
  ".gitignore" \
  ".agent/ROSTER.md" \
  ".agent/workflows/sdd-protocol.md" \
  ".agent/skills/README.md" \
  ".claude/agent-memory/solution-architect/MEMORY.md" \
  ".claude/agent-memory/verifier/MEMORY.md" \
  ".claude/skills/README.md" \
  ".codex/write-gate.md" \
  "docs/plans/README.md" \
  "docs/specs/README.md" \
  "docs/tasklist/README.md" \
  "docs/reports/README.md" \
  "memory_bank/context.md" \
  "memory_bank/progress.md" \
  "memory_bank/decisions.md" \
  "memory_bank/orchestrator-log.md" \
  "memory_bank/review-log.md" \
  "memory_bank/snapshots/.gitkeep" \
  "memory-bank/productContext.md" \
  "memory-bank/projectBrief.md" \
  "memory-bank/systemPatterns.md" \
  "memory-bank/techContext.md" \
  "memory-bank/activeContext.md" \
  "memory-bank/progress.md" \
  "memory-bank/decisionLog.md" \
  "memory-bank/dataDictionary.md" \
  "memory-bank/openQuestions.md"; do
  if [ ! -f "$ROOT/$path" ]; then
    echo "  MISSING: $path"
    MISSING=1
  else
    echo "  OK: $path"
  fi
done

if [ "$MISSING" -eq 1 ]; then
  echo "==> Workflow layer incomplete — review missing files above."
  exit 1
fi

echo "==> Workflow layer: OK"

# ── Dev environment checks (warnings only) ──────────────────────────

echo ""
echo "==> Dev environment checks..."

if [ -d "$ROOT/node_modules" ]; then
  echo "  OK: node_modules/"
else
  echo "  WARN: node_modules/ missing — run 'npm install'"
fi

if [ -n "${DATABASE_URL:-}" ]; then
  echo "  OK: DATABASE_URL is set"
elif [ -f "$ROOT/.env" ] && grep -q "DATABASE_URL" "$ROOT/.env" 2>/dev/null; then
  echo "  OK: DATABASE_URL found in .env"
else
  echo "  WARN: DATABASE_URL not set — builds may fail"
fi

echo "==> Dev environment checks done"
