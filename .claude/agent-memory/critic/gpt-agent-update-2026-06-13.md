---
name: gpt-agent-update-2026-06-13
description: Smoke-test results and impressions after tightening GPT agent tools/config (2026-06-13)
metadata:
  type: project
---

## What changed

GPT agent definitions tightened:
- Tools: mcp__codex__* → mcp__codex__codex (explicit single tool, no wildcard)
- Bash: Bash(git *) → Bash(git status *) + Bash(git diff *) (read-only only)
- Added <mode>read-only</mode> to Codex prompt contract
- Added output fields: Mode, base/ref, merge recommendation
- Hardened rules: "Never call codex through Bash" explicit

## Smoke-test results (2/2 parallel agents passed)

| Agent | Codex Session | Tokens | Time | Verdict |
|-------|--------------|--------|------|---------|
| gpt-critic | 019ec1e6 | 22k | 2.9m | RECONSIDER (caught mock issues, verified actual filesystem) |
| gpt-verifier | 019ec1e7 | 28k | 3.3m | 7 findings (caught 3 real bugs in round 1 fixes) |

## Impressions

### Positive
- Tool narrowing works. Agents use only mcp__codex__codex — no accidental Bash codex calls. Boundary is explicit.
- Read-only enforcement is real. Neither agent attempted to write files. The mode section in the prompt contract is a strong behavioural nudge.
- Codex cross-references actual filesystem. gpt-critic verified that src/lib/products.ts doesn't exist — checked real repo, not just mock. gpt-verifier read both actions.ts and product.ts to find the Zod nullability gap.
- GPT finds Claude blind spots. The 3 bugs in round 1 fixes (Zod nullable, zero coercion, stock NaN) were all missed by Claude verifier.
- Cost is reasonable. ~50k total for 2 parallel agents. Well within Full-tier budget.
- Critic-gate write-set enforcement catches scope creep. Updated hook correctly blocked edits outside approved write-set.

### Concerns
- Gate file friction. Per-WB write-sets correct but add operational overhead for quick fix rounds.
- DB URL grep in hard-stop too aggressive. Blocks even read-only env var inspection. Should scope to actual migration/push commands only.
- No auto-detection of write-set drift. Gate blocks but doesn't suggest which files should be added.

## How to apply
- GPT agents ready for production Full-tier Work Blocks
- Always update .agent/critic-gate.md Approved Write-Set before new fix round
- Run both Claude AND GPT verifiers for DB/auth/security Work Blocks
- Consider relaxing the DB URL grep pattern in hard-stop.sh
