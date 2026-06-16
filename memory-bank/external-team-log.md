# External Team Log

> Delivery log for delegated external agent teams such as Claude Code handoff
> sessions. It records what the external team did and how they worked at a
> summary level.
> Distinct from `orchestrator-log.md`: orchestrator-log tracks Control Tower
> decisions; external-team-log tracks contractor execution trace.

---

| Date | Work Block | Task ID | Team | Lead / Mode | Scope | Internal Review | Actions Taken | Files Changed | Checks Run | Status | Runner Artifacts | Risks / Follow-up |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| -- | wb-example | task-example | Claude Code | tech-lead + coder + reviewer | `src/**` | reviewer: PASS; critic: skipped-doc-only | Implemented scoped change and self-reviewed | `src/example.ts` | `npm test` | complete | result: `handoff/done/task-example-result.md`; log: `handoff/logs/session-task-example.log` | none |

## What to log

| Event | When | Content |
|---|---|---|
| Handoff start | At the beginning of delegated work | Team/mode, assigned objective, accepted scope |
| Major internal handoff | When the external team changes role or phase | Lead/architect/coder/reviewer phase summary |
| Internal review | When reviewer, critic, verifier, GPT/Codex reviewer, or equivalent pass completes or is skipped | Agent/reviewer name, verdict, skip reason, summary findings |
| Delivery closeout | Before returning result to Control Tower | Actions taken, files changed, checks, risks, next step |
| Blocker | When blocked | Blocking condition, evidence, requested owner/orchestrator decision |

## What NOT to log

- Private chain-of-thought or hidden reasoning
- Secrets, tokens, credentials, private keys, or raw environment values
- Full command transcripts -- these belong in runner/session logs
- Control Tower decisions -- these are in `orchestrator-log.md`
- Full review reports -- these belong in `docs/reports/` or `review-log.md`
