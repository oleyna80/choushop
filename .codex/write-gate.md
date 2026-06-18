# Codex Stage 0 Write Gate

Status: READY
Expires: 2099-12-31
Work Block: wb-choushop-sdlc-navigation-sync
Approved Scope: SDLC navigation-layer sync from `agentic-sdlc-framework` commit `6fa8327` into ChouShop only. Write-set is limited to `.codex/write-gate.md`, `docs/plans/2026-06-18-choushop-sdlc-navigation-sync.md`, `docs/reports/2026-06-18-choushop-sdlc-navigation-sync.md`, `memory-bank/activeContext.md`, `memory-bank/orchestrator-log.md`, `memory-bank/review-log.md`, `FILE_REGISTRY.yml`, `PROJECT_MAP.md`, `docs/session-bootstrap.md`, `docs/templates/work-block-template.md`, and `scripts/bootstrap.sh`. Existing product/backend/admin/schema/package dirty files are read-only/deferred. No deletes, `git clean`, reset, deploy, DB/provider mutation, env/secrets/config changes, payment/order/stock behavior changes, or commit/push are approved in this Work Block.
Codex Critic: READY
Critic Verdict: SUPPLEMENT
Critic Report: read-only Codex critic subagent for navigation sync; final summary to be recorded in docs/reports/2026-06-18-choushop-sdlc-navigation-sync.md
Critic Skip Reason: N/A
Orchestrator Response: Sync must adapt framework templates to ChouShop conventions, preserve project-specific `AGENTS.md`, keep `memory-bank/` rather than `memory_bank/`, and avoid staging unrelated product dirty files.
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
