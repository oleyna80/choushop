# Agent Rules

## General Rules

- Read `AGENTS.md` before starting.
- Read the full memory bank before starting:
  - `memory-bank/projectBrief.md`
  - `memory-bank/productContext.md`
  - `memory-bank/techContext.md`
  - `memory-bank/systemPatterns.md`
  - `memory-bank/activeContext.md`
  - `memory-bank/progress.md`
- Read relevant workflow docs before editing related features.
- State role and stage before work.
- Do not mix roles in one step.
- Update `memory-bank/activeContext.md` after every session.
- Update `memory-bank/progress.md` when feature status changes.
- Keep MVP-0 scope small.
- Do not add features from MVP-1+ without explicit approval.

## Coding Rules

- Use TypeScript strict mode.
- Keep route handlers thin.
- Put business logic in `src/server/services`.
- Put repeated DB access behind repositories when query logic grows.
- Use Zod for request validation.
- Use Prisma for database access.
- Use database transactions for multi-step state changes.
- Use explicit enum values for domain statuses.
- Name files in kebab-case.
- Name React components in PascalCase.
- Use French text for customer-facing storefront copy.
- Admin copy may be English in MVP-0.
- Keep comments rare and useful.
- Do not refactor unrelated modules during scoped work.

## Domain Rules

- Prices are EUR TTC.
- Client-side cart is not trusted.
- Server must recalculate checkout totals.
- Payment status is webhook-only.
- `/success` has no side effects.
- CGV acceptance is required before checkout session creation.
- Stripe Checkout is the only payment flow in MVP-0.
- Stripe webhook signature verification is mandatory.
- Stripe webhook idempotency is mandatory.
- Stock decrement happens only after confirmed payment webhook.
- Stock decrement and order status update must happen in one transaction.
- If paid order has insufficient stock, set `stockIssue = true` and fulfillment `ON_HOLD`.
- Emit EventLog for all domain state changes.
- Do not load marketing pixels before user consent.
- Legal pages must be final before real payment go-live.

## Forbidden Patterns

- Trusting prices or totals from client payload.
- Marking order paid from redirect.
- Creating custom card form.
- Processing unsigned Stripe webhook.
- Processing webhook without `WebhookEvent`.
- Sending duplicate paid emails for duplicate webhook deliveries.
- Decrementing stock on pending order.
- Reserving stock in MVP-0 without explicit approval.
- Adding customer accounts in MVP-0.
- Adding ProductVariant engine in MVP-0.
- Adding promo code behavior in MVP-0.
- Adding AI agent write APIs in MVP-0.
- Adding microservices in MVP-0.
- Direct unrestricted DB writes by agents.
- Shipping with placeholder legal pages.

## Agent Roles

### Reviewer

Reviewer does:

- Reads code and docs.
- Identifies risks, bugs, missing tests, and scope drift.
- Checks compliance with memory bank and workflows.
- Produces findings with file/line references where possible.

Reviewer does not:

- Edit code.
- Run destructive commands.
- Change project scope.

### Coder

Coder does:

- Makes scoped changes only.
- Follows approved stage objective.
- Updates relevant docs/memory after the session.
- Runs appropriate checks.

Coder does not:

- Review unrelated code.
- Expand MVP scope without approval.
- Mix implementation with broad review in the same step.

### Tester

Tester does:

- Verifies behavior against acceptance criteria.
- Runs lint, typecheck, build, unit tests, and manual flows where relevant.
- Checks e-commerce safety rules.
- Reports exact failures and residual risks.

Tester does not:

- Implement fixes unless a new Coder stage is confirmed.
- Ignore failed checks.
- Treat Stripe redirect as payment confirmation.
