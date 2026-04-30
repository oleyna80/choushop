# AGENTS.md

## Project

Mystery Box Store for France-first sales.

Core stack:

- Next.js 16.2.3 App Router
- TypeScript
- Tailwind CSS
- Prisma
- Neon PostgreSQL
- Stripe Checkout
- Resend
- Cloudinary
- Vercel

Storefront language: French.
Admin language: English is acceptable for MVP-0.
Currency: EUR only.
Tax display: TTC only.
Payments: Stripe Checkout only.

## Operating Mode

Default mode for project work: multi-agent orchestration.

Multi-agent workflow must follow `docs/agent-team-principles.md`.
Complex tasks may use a controlled Codex swarm as defined in `docs/agent-team-principles.md`.
For non-trivial work, use the Agentic Development Lifecycle in `docs/agent-team-principles.md`.
Reusable orchestration prompts live in docs/dev/orchestrator-prompts.md.

The orchestrator must:

- state current stage;
- state objective;
- state selected role;
- state expected result;
- keep roles separate in each step;
- use subagents only when they materially help and the task is scoped;
- not spawn subagents for small single-thread documentation updates;
- ask for confirmation before moving to a new implementation stage.

Allowed roles:

- Reviewer: read-only analysis and risk review.
- Coder: scoped file changes only.
- Verifier: checks against goals and acceptance criteria.

## Memory Bank

Read these files before starting work:

- `memory-bank/projectBrief.md`
- `memory-bank/productContext.md`
- `memory-bank/techContext.md`
- `memory-bank/systemPatterns.md`
- `memory-bank/activeContext.md`
- `memory-bank/progress.md`
- `memory-bank/decisionLog.md`
- `memory-bank/openQuestions.md`
- `memory-bank/dataDictionary.md`

Update `memory-bank/activeContext.md` after every work session.
Update `memory-bank/progress.md` whenever feature status changes.
Update `memory-bank/decisionLog.md` when an architecture or product decision changes.
Update `memory-bank/openQuestions.md` when a blocker is found or resolved.

## Strict Rules

- UI tasks must check `docs/design` first.
- If a Figma URL is provided, use Figma MCP before coding.
- If Figma MCP is unavailable, state the limitation and use a screenshot or written spec.
- Do not invent design tokens if Figma variables exist.
- Do not use write-capable Figma tools unless the task explicitly asks for Figma changes.
- For implementation tasks, produce a brief before changing code.
- Never trust prices, totals, discounts, tax, shipping, stock, or product status sent by the client.
- Always recalculate checkout totals on the server from the database.
- Never confirm payment from `/success` redirect.
- Stripe webhook is the only source of truth for paid payment status.
- Always verify Stripe webhook signature before parsing or processing events.
- Always validate request payloads with Zod at API/server boundaries.
- Always emit `EventLog` for domain events that change business state.
- Always use `WebhookEvent` idempotency for Stripe webhooks.
- Always update order status and decrement stock in a database transaction.
- Stock is decremented only after confirmed payment webhook.
- If paid order stock cannot be decremented, mark order `stockIssue = true` and fulfillment `ON_HOLD`.
- Checkout must require explicit CGV acceptance before Stripe session creation.
- Prices shown to customers must be EUR TTC.
- Store tax snapshots on orders and order items.
- Do not load GA4, Meta Pixel, or TikTok Pixel before cookie consent.

## Forbidden Patterns

- Custom card payment form for MVP-0.
- Direct client-side price calculation as source of truth.
- Marking an order paid on `/success`.
- Processing Stripe webhook without signature verification.
- Processing webhook events without idempotency.
- Mutating order/payment/stock outside service layer.
- Decrementing stock when creating pending order.
- Trusting `productTitle`, `unitPrice`, `shippingAmount`, or `discountAmount` from client payload.
- Adding ProductVariant engine in MVP-0.
- Adding promo code behavior in MVP-0.
- Adding customer accounts in MVP-0.
- Adding separate backend or microservices in MVP-0.
- Giving future agents direct unrestricted database write access.
- Shipping with placeholder legal pages.

## Project Structure

Expected structure:

```txt
src/
  app/
    (public)/
    admin/
    api/
  components/
    ui/
    shop/
    layout/
    admin/
  features/
    catalog/
    cart/
    checkout/
    orders/
    shipping/
    events/
  lib/
    auth/
    db/
    email/
    stripe/
    validation/
    utils/
  server/
    services/
    repositories/
    events/
prisma/
  schema.prisma
memory-bank/
agents/
workflows/
```

## Domain Events

Emit at minimum:

- `product.created`
- `product.updated`
- `checkout.started`
- `order.created`
- `order.paid`
- `order.status_changed`
- `shipment.created`
- `shipment.updated`
- `order.cancelled`

## Key Constraints

- France-first B2C commerce.
- Storefront copy must be French.
- EUR only in MVP-0.
- Prices are TTC.
- Stripe Checkout only.
- Manual shipping rates in MVP-0.
- Manual label creation in MVP-0.
- No marketplace, no customer accounts, no complex OMS, no custom payment flow.
