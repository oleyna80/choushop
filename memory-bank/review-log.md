# Review Log

> Subagent result log — what each subagent found.
> Updated by Control Tower after each subagent returns.
> Distinct from `orchestrator-log.md`: orchestrator-log tracks *decisions*; review-log tracks *subagent outputs*.

---

| Date | Work Block | Agent | Verdict | Key Findings | Evidence |
|---|---|---|---|---|---|
| — | wb-example | verifier | READY | Types pass, build OK, no secrets | `npx tsc --noEmit` clean, `git diff` clean |

## What to log

| Subagent | Verdict Options | Key Findings |
|---|---|---|
| solution-architect | DONE / BLOCKED | Architecture risks, recommended approach |
| critic | APPROVE / SUPPLEMENT / RECONSIDER | Scope issues, missed skills, weak skip reasons |
| reviewer | HIGH / MEDIUM / LOW findings | Bug count, security issues, drift detected |
| verifier | READY / BLOCKED | Failed checks, blockers |
| security-audit-triage | confirmed / partial / stale / rejected | P0/P1 fix scope |

## What NOT to log

- Full subagent reports — they're in `docs/reports/`
- Orchestrator decisions — these are in `orchestrator-log.md`
- Fix recipes — the fix is in the code
