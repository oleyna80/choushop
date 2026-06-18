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

Default mode: the Orchestrator selects the lightest safe workflow.

Multi-agent workflow must follow `docs/agent-team-principles.md`.
Complex tasks may use a controlled Codex swarm as defined in `docs/agent-team-principles.md`.
For non-trivial work, use the Agentic Development Lifecycle in `docs/agent-team-principles.md`.
Long approved work may use Autonomous Execution Mode as defined in `docs/agent-team-principles.md`.
Reusable orchestration prompts live in `docs/dev/orchestrator-prompts.md`.

The project supports these workflow paths:

- Standard Workflow: default for small and normal tasks, using Plan -> Spec -> Implementation -> Review -> Verification.
- Agentic Workflow: for non-trivial, risky, multi-domain, architectural, design, security, migration, or production-impacting work, using Orchestrator -> read-only subagents -> consolidated plan -> approval gate -> single Coder -> review swarm -> verification.

Workflow selection:

| Task type | Workflow |
| --- | --- |
| Trivial task | Small Task Path |
| Small or normal task | Standard Workflow |
| Risky, multi-domain, architectural, security, design, migration, or production-impacting task | Agentic Workflow |
| Long Owner-approved plan | Autonomous Execution Mode |

The Agentic Workflow extends the existing project system. It does not replace AGENTS.md, skills, progress or roadmap documents when present, memory-bank continuity, or the standard plan/spec/review/verification process.

Autonomous Execution Mode may be used inside an Owner-approved Agentic Workflow plan. It allows the agent to continue through approved stages without repeated confirmation, but the agent must stop for approval gates, blockers, scope changes, risky operations, unrelated or blocker dirty files, failed checks, or failed verification.

Before Autonomous Execution Mode starts, check git status and classify existing dirty files as approved context, unrelated, or blocker. Proceed only when dirty files are approved context or explicitly accepted by the Owner. Stop if unrelated or blocker dirty files could be overwritten or confused with agent changes.

Small Task Path:

- no full swarm or full Agentic Lifecycle is required for trivial tasks;
- still follow scope, git safety, no-secrets rules, and report changed files, checks, and risks;
- examples include small text edits, README or documentation typo fixes, simple CSS tweaks, obvious bugfixes, and minor copy updates.

The orchestrator must:

- state current stage;
- state objective;
- state selected role;
- state expected result;
- keep roles separate in each step;
- assign read-only scoped subagents within the approved objective when operating as Orchestrator;
- use subagents only when they materially help and the task is scoped;
- not spawn subagents for small single-thread documentation updates;
- use scoped explorer tasks as a fallback if native subagent or fork workflow is unavailable;
- give each subagent or scoped explorer a role, scope, out of scope, expected output, and file-change permission;
- require explicit approved implementation scope before using any write-capable subagent;
- ask for confirmation before moving to a new implementation stage unless operating inside an approved Autonomous Execution Mode plan.

Allowed roles:

- Orchestrator: coordination, planning, consolidation, handoff, and role selection.
- Reviewer: read-only analysis and risk review.
- Coder: scoped file changes only.
- Verifier: checks against goals and acceptance criteria.

Execution roles are Orchestrator, Coder, Reviewer, and Verifier. Specialized read-only subagents such as Product Analyst, Architecture Analyst, Frontend Analyst, Backend Analyst, Design Analyst, Security Analyst, QA Analyst, and Docs Analyst are allowed when scoped; they do not conflict with the execution roles.

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

Read-only phases must not update memory-bank files. If these instructions would normally require a memory-bank update, report that it was skipped because the phase is read-only and propose the update for an approved documentation or fix stage.

## Repository Safety

- Before Coder or Fix stages, check git status.
- Any repository file change requires approved scope.
- Do not modify unrelated dirty files.
- Do not stage, commit, or push without Owner approval.
- Do not commit `.env` files, credentials, tokens, API keys, private keys, `node_modules`, `.next`, `dist`, `build`, or other build artifacts.
- If risky files are detected in git status or staging, stop and report.
- Destructive operations require explicit approval, including `git reset --hard`, `git clean`, force push, deleting files or directories, rewriting history, destructive database commands, reverting unknown user changes, and changing production config.

## Strict Rules

- UI tasks must check `docs/design` first.
- `docs/design/workflow.md` is the source of truth for design workflow, Figma, and write-capable design tool rules.
- Valid design references include a Figma frame, Claude Design output, screenshot, exported image, written design spec, and existing React implementation.
- Design references must be treated as `draft`, `approved for implementation`, `implemented`, or `outdated`; if status is draft or unclear, ask the Owner before UI implementation.
- If a Figma URL is provided, use read-only Figma MCP before coding when available.
- If Figma MCP is unavailable, state the limitation and use an approved fallback reference such as a Claude Design output, screenshot, exported image, written spec, or existing React implementation.
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

## Runtime Data Mutation Boundary

Agents are planners and code authors, not trusted runtime executors for
commerce data. In product/runtime flows, an agent may propose a structured
action, prepare a draft, summarize data, or request a read-only view through an
approved API. It must not directly write to Neon/PostgreSQL, Stripe, order
state, stock, users/roles, CRM-like records, production config, or external
provider state.

Runtime mutations must follow this boundary:

1. Agent proposes an `ActionSpec` or equivalent structured request.
2. Backend validates user/session authority, resource scope, payload shape,
   pricing, stock, payment state, and business invariants.
3. Policy logic decides `deny`, `read-only`, `requires_approval`, or
   `execute`.
4. Risky mutations show a concrete diff/preview and collect user/admin
   approval.
5. Backend service/repository code executes the operation in the expected
   transaction, idempotency, event-log, and audit context.

Prompt instructions are not a security boundary. Tool availability, direct DB
credentials, or model capability do not authorize agent-side DB/provider
mutation.

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
- Letting an agent execute raw SQL or mutate order/payment/stock/customer data
  outside the backend service layer.
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
