Status: PENDING

# Critic Gate

> Control Tower updates this file after Stage 0 Preflight.
> The `critic-gate.sh` hook blocks Edit/Write until Status is READY or SKIPPED.

## Gate Status

| Status | Meaning | Edit/Write |
|---|---|---|
| PENDING | Critic not yet launched | BLOCKED |
| READY | Critic completed, report in `docs/reports/` | ALLOWED |
| SKIPPED | Owner approval recorded in orchestrator-log | ALLOWED |
