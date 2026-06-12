# Verification Matrix

Status: ChouShop local baseline

Use targeted verification first. Record exact commands, result shape, skips, and
remaining gaps.

Use `docs/reference/definition-of-ready-done.md` to decide whether a Coder can
start and whether Verifier can accept the result.

## Default Commands

Use the smallest set that matches the change:

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- focused route/component/service tests when available
- browser smoke for changed user-facing routes when runtime behavior matters

## Suggested Matrix

| Change class | Minimum verification |
| --- | --- |
| Read-only analysis | source inspection and cited files |
| Docs-only | readback, link/path sanity, `git diff --check` |
| Frontend UI | `npm run lint`, `npm run typecheck`, browser smoke when route behavior changed |
| Backend/API | `npm run typecheck`, focused tests or negative-path validation |
| Prisma/schema | migration review, generated client check, local migration/dry-run when approved |
| Auth/admin permissions | focused tests plus server-side authorization review |
| Stripe/orders/stock | unit or integration checks, webhook idempotency and negative-path review |
| Email/provider integration | payload review, no secret logging, focused send/mock verification |
| Security/secrets | secret scan by inspection, env/log review, dependency/config review |
| Deploy/Vercel | build check, env/config review, no secrets in public files |

## Acceptance Verdicts

- `accept`: required checks passed and no material hidden risk remains.
- `accept with follow-up`: core checks passed and residual risk is bounded.
- `do not accept yet`: required checks are missing, failed, or ambiguous.

Every verification report should include:

- commands run;
- result summary;
- skipped checks with reasons;
- whether integration or runtime checks ran;
- remaining risks.
