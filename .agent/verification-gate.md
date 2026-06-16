Status: SKIPPED
Work Block: wb-framework-config-sync
Verification Tier: lite
New Domain: false
Claude Verifier Verdict: PENDING
Verification Report: —
GPT Verifier Status: NOT_REQUIRED
GPT Verifier Reason: Config sync only — no code, no routes, no schema, no security
GPT Verifier Report: —
GPT Verifier Degraded Reason: —
Quick-Fix: true

# Verification Gate

> Control Tower updates this file before final closeout.
> The `verification-gate.sh` Stop hook blocks final response until
> verification and GPT verifier decisions are resolved.

## Control Boundary

The gate controls closeout evidence, not Claude Code's private internal
process. It must verify that implementation was checked, verifier outcomes
were recorded, and GPT verifier triggers were either completed or degraded with
an explicit reason.

It must not require a fixed internal subagent sequence or private chain of
thought. It requires artifacts and decisions that an external orchestrator can
audit.

## Gate Status

| Status | Meaning | Closeout |
|---|---|---|
| PENDING | Verification not resolved | BLOCKED |
| READY | Verification report exists and GPT verifier decision is resolved | ALLOWED |
| SKIPPED | Quick-Fix path with orchestrator-log approval | ALLOWED |

`READY` requires `Verification Report` to point to an existing non-empty file
under `docs/reports/`. `Claude Verifier Verdict` must be `READY` or `BLOCKED`.

## GPT Verifier Status

| Status | Meaning | Closeout |
|---|---|---|
| PENDING | GPT verifier trigger not resolved | BLOCKED |
| NOT_REQUIRED | Not Full tier, not first domain Work Block, and Claude verifier did not return BLOCKED | ALLOWED |
| READY | `gpt-verifier` completed and findings were merged | ALLOWED |
| DEGRADED | Codex MCP unavailable; degraded reason recorded | ALLOWED |

GPT verifier is required when `Verification Tier: full`, `New Domain: true`, or
`Claude Verifier Verdict: BLOCKED`. `READY` requires `GPT Verifier Report` to
point to an existing non-empty file under `docs/reports/`. `DEGRADED` requires
`GPT Verifier Degraded Reason: review-degraded:codex-mcp-unavailable` and a
matching orchestrator-log entry. `NOT_REQUIRED` requires `GPT Verifier Reason`
to explain why no trigger matched.

## Skip Record (if SKIPPED)

Only valid for `Quick-Fix: true`.
Must match orchestrator-log entry exactly.
Format: `verification: SKIPPED — Quick-Fix — [reason]`
