Status: SKIPPED
Work Block: wb-framework-config-sync
Verification Tier: lite
New Domain: false
Subagent Topology Status: SINGLE_AGENT
Critic Verdict:
Critic Report: —
GPT Critic Status: NOT_REQUIRED
GPT Critic Reason: Config sync only — no code, no new domain, not Full tier
GPT Critic Report: —
GPT Critic Degraded Reason: —

# Critic Gate

> Control Tower updates this file after Stage 0 Preflight.
> The `critic-gate.sh` hook blocks Edit/Write until critic review,
> subagent topology, GPT critic decision, and write-set are resolved.

## Control Boundary

The gate controls the phase boundary for Claude Code, not the internal team
process. It must verify that the orchestrator resolved critic review,
subagent topology, GPT critic decision, and the approved write-set before
source edits begin.

It must not require a specific private reasoning chain, force a fixed internal
subagent sequence, or block a valid Work Block because Claude Code chose a
different implementation order after the required review decisions were made.

## Gate Status

| Status | Meaning | Edit/Write |
|---|---|---|
| PENDING | Critic not yet launched | BLOCKED |
| READY | Critic completed, report in `docs/reports/` | ALLOWED |
| SKIPPED | Owner approval + orchestrator-log entry + no-skip domain check passed | ALLOWED |

`READY` requires `Critic Report` to point to an existing non-empty file under
`docs/reports/`, and `Critic Verdict` to be `APPROVE` or `SUPPLEMENT`.
`RECONSIDER` means Stage 0 must be corrected before edits.

## Subagent Topology Status

| Status | Meaning | Edit/Write |
|---|---|---|
| PENDING | Stage 0 did not classify topology yet | BLOCKED |
| SINGLE_AGENT | Work Block does not match Subagent-Required triggers | ALLOWED |
| PLANNED | Subagent dispatch plan recorded for this Work Block | ALLOWED |
| BLOCKED | Subagent dispatch unavailable; inline fallback recorded | ALLOWED |

## GPT Critic Status

| Status | Meaning | Edit/Write |
|---|---|---|
| PENDING | GPT critic trigger not resolved | BLOCKED |
| NOT_REQUIRED | Not Full tier, not first domain Work Block, and Claude critic did not return SUPPLEMENT/RECONSIDER | ALLOWED |
| READY | `gpt-critic` completed and findings were merged | ALLOWED |
| DEGRADED | Codex MCP unavailable; degraded reason recorded | ALLOWED |

GPT critic is required when `Verification Tier: full`, `New Domain: true`, or
`Critic Verdict` is `SUPPLEMENT`/`RECONSIDER`. `READY` requires
`GPT Critic Report` to point to an existing non-empty file under
`docs/reports/`. `DEGRADED` requires `GPT Critic Degraded Reason:
review-degraded:codex-mcp-unavailable` and a matching orchestrator-log entry.
`NOT_REQUIRED` requires `GPT Critic Reason` to explain why no trigger matched.

## No-Skip Domain

If this WB touches auth, payments, DB migration, new service, or deploy
for the first time → `No-Skip: true` (critic mandatory, no SKIPPED possible).

No-Skip: false

## Triggers Active

None — config sync only, no code, no routes, no schema, no DB.

Approved Write-Set:

- .agent/verification-gate.md
- .agent/critic-gate.md
- .agent/ROSTER.md
- .claude/agents/
- .claude/hooks/
- .claude/skills/README.md
- .claude/agent-memory/
- .claude/settings.json

## Skip Record (if SKIPPED)

critic: SKIPPED — Owner approval — framework config sync, no code changes
