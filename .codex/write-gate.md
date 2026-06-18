# Codex Stage 0 Write Gate

Status: READY
Expires: 2099-12-31
Work Block: wb-choushop-dirty-tree-cleanup-review
Approved Scope: Dirty-tree classification and non-destructive cleanup only. Write-set is limited to `docs/plans/2026-06-18-choushop-dirty-tree-cleanup-review.md`, `docs/reports/**`, `memory-bank/activeContext.md`, `memory-bank/orchestrator-log.md`, `memory-bank/review-log.md`, `.codex/write-gate.md`, and `.gitignore`. Risky product/backend/admin/schema/package files are read/classify-only. No deletes, `git clean`, reset, deploy, DB/provider mutation, env/secrets/config changes, payment/order/stock behavior changes, or commit/push are approved in this Work Block.
Codex Critic: READY
Critic Verdict: RECONSIDER -> addressed by Stage 0 rerun
Critic Report: subagent 019ed9e9-dac9-7090-b924-4c05c1171c33; summary in docs/reports/2026-06-18-choushop-dirty-tree-review.md
Critic Skip Reason: N/A
Orchestrator Response: Stage 0 was rerun before cleanup writes. The Work Block now has complete dirty-tree buckets, exact non-destructive ignore-rule whitelist, explicit read/classify-only risky paths, local-skill routing, subagent mission briefs, and tightened verification. Cleanup is limited to `.gitignore` plus docs/log/report audit trail.
Orchestrator Log: memory-bank/orchestrator-log.md
Review Log: memory-bank/review-log.md

Codex must not modify repository files until the Owner-approved scope for the
current workblock is recorded here or in the active conversation.

Set `Status: READY` only after Stage 0 preflight is complete and the approved
scope is clear.

For non-trivial Work Blocks, also set `Codex Critic` before writes:

- `READY` when a read-only Codex critic subagent or external critic completed.
- `FALLBACK` when a same-session critic pass completed because native subagents
  were unavailable.
- `SKIPPED` only for valid skip conditions in `.codex/critic.md` or explicit
  Owner approval.
- `REQUIRED` means the critic requirement is not resolved yet and writes must
  remain blocked.

When `Codex Critic` is `READY` or `FALLBACK`, set `Critic Verdict` to
`APPROVE`, `SUPPLEMENT`, or `RECONSIDER`. When `Codex Critic` is `SKIPPED`,
write a concrete `Critic Skip Reason`.

If `Critic Verdict` is `SUPPLEMENT` or `RECONSIDER`, set a concrete
`Orchestrator Response` before marking `Status: READY`. For `RECONSIDER`, the
response must explain that Stage 0 was rerun or why the Owner explicitly
accepted proceeding.
