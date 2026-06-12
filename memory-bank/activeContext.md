# Active Context

## Session Update - 2026-04-30

Stage: Agentic SDLC Consistency Fix.
Role: Coder.
Status: documentation-only consistency wording fixes applied.

What changed:

- Replaced the old default project mode wording with lightest-safe-workflow selection.
- Added compact workflow selection guidance for Small Task Path, Standard Workflow, Agentic Workflow, and Autonomous Execution Mode.
- Clarified that Tech Lead / Planner is a planning function, not an execution role.
- Clarified that Documentation First is read-only by default unless documentation changes are inside approved scope.
- Added Autonomous Execution Mode dirty-state baseline rules.
- Added stable review finding IDs and Fix Stage mapping rules.
- Kept the work documentation-only; no production code, package files, configs, secrets, environment files, build files, staging, commit, or push changes were made.

Next recommended action:

- Stage: Agentic SDLC Consistency Fix verification.
- Objective: verify the wording fixes against `AGENTS.md`, `docs/agent-team-principles.md`, `docs/dev/orchestrator-prompts.md`, git status, and production-code safety.
- Role: Verifier.
- Expected result: read-only verification report.

## Session Update - 2026-04-30

Stage: Autonomous Execution Mode Test.
Role: Coder.
Status: documentation-only clarification applied.

What changed:

- Clarified that small documentation-only tasks may use Autonomous Execution Mode as a workflow rehearsal only when the Owner explicitly approves the autonomous plan, scope, stages, stop conditions, and verification rules.
- Mirrored the clarification in the reusable Autonomous Execution Plan prompt.
- Kept the work documentation-only; no production code, package files, configs, secrets, environment files, build files, staging, commit, or push changes were made.

Next recommended action:

- Stage: Autonomous Execution Mode Test verification.
- Objective: verify the clarification against `AGENTS.md`, `docs/agent-team-principles.md`, `docs/dev/orchestrator-prompts.md`, git status, and production-code safety.
- Role: Verifier.
- Expected result: read-only verification report.

## Session Update - 2026-04-30

Stage: Autonomous Execution Mode Documentation.
Role: Coder.
Status: documentation update completed.

What changed:

- Added Autonomous Execution Mode to `docs/agent-team-principles.md` as a safe execution mode inside an Owner-approved Agentic Development Lifecycle plan.
- Defined preconditions, allowed autonomous actions, mandatory stop conditions, progress reporting, commit/push boundaries, and Small Task Path compatibility.
- Added an Autonomous Execution Plan template to `docs/dev/orchestrator-prompts.md`.
- Added the short Autonomous Execution Mode reference to `AGENTS.md`.
- Kept the work documentation-only; no production code, package files, configs, secrets, environment files, build files, staging, commit, or push changes were made.

Next recommended action:

- Stage: Autonomous Execution Mode Documentation verification.
- Objective: verify the new autonomous execution rules against AGENTS.md, agent-team-principles, orchestrator prompts, git status, and production-code safety.
- Role: Verifier.
- Expected result: read-only verification report.

## Session Update - 2026-04-30

Stage: Documentation Consistency Review - Phase 2.
Role: Coder.
Status: documentation-only consistency fixes applied.

What changed:

- Clarified that the Standard Workflow remains the default for small and normal tasks.
- Clarified that the Agentic Workflow extends the existing AGENTS, skills, progress, roadmap, memory-bank, and plan -> spec -> review -> verification system instead of replacing it.
- Aligned orchestrator prompts with approval gates, read-only phases, scoped subagents, scoped explorer fallback, git safety, and single-Coder implementation rules.
- Updated design workflow docs so Figma is preferred when available but not the only valid design reference.
- Clarified that draft design references are not automatically approved for implementation.
- Kept the work documentation-only; no production code, secrets, config, staging, commit, or push changes were made.

Next recommended action:

- Stage: Documentation Consistency Review - Phase 3.
- Objective: verify the documentation consistency fixes against AGENTS.md, workflow docs, design docs, git status, and risky-file rules.
- Role: Verifier.
- Expected result: read-only verification report.

## Session Update - 2026-04-29

Stage: Orchestrator Prompt Templates.
Role: Coder.
Status: documentation update completed.

What changed:

- Created `docs/dev/orchestrator-prompts.md` with reusable prompts for orchestration start, planning swarm, single Coder implementation, review swarm, fix stage, verification, and commit gate.
- Added the reusable orchestration prompt reference to `AGENTS.md`.
- Kept the work documentation-only; no production code was changed.

Next recommended action:

- Stage: Orchestrator Prompt Templates verification.
- Objective: confirm the prompt templates and AGENTS reference match the requested Agentic Development Lifecycle workflow.
- Role: Verifier.
- Expected result: read-only verification report.

## Session Update - 2026-04-29

Stage: Agentic Development Lifecycle Documentation.
Role: Coder.
Status: documentation update completed.

What changed:

- Added the Agentic Development Lifecycle section to `docs/agent-team-principles.md`.
- Added the required non-trivial work lifecycle reference to `AGENTS.md`.
- Kept the work documentation-only; no production code was changed.

Next recommended action:

- Stage: Agentic Development Lifecycle Documentation verification.
- Objective: confirm the lifecycle section and AGENTS reference match the requested rules.
- Role: Verifier.
- Expected result: read-only verification report.

## Session Update - 2026-04-29

Stage: Swarm Workflow Documentation.
Role: Coder.
Status: documentation update completed.

What changed:

- Added controlled Codex swarm workflow rules to `docs/agent-team-principles.md`.
- Added the required swarm workflow reference to `AGENTS.md`.
- Kept the work documentation-only; no production code was changed.

Next recommended action:

- Stage: Swarm Workflow Documentation verification.
- Objective: confirm the swarm workflow section and AGENTS reference match the requested rules.
- Role: Verifier.
- Expected result: read-only verification report.

## Session Update - 2026-04-29

Stage: GitHub Repository Setup.
Role: Coder.
Status: repository safety setup prepared for initial commit.

What changed:

- Updated `.gitignore` for Next.js/Node repository safety before the first commit.
- Initialized Git locally and prepared to configure `origin` for `https://github.com/oleyna80/choushop.git`.
- Kept production code unchanged; only repository safety metadata and session memory were edited before committing.

Checks:

- Confirmed `/home/dmitrii/projects/choushop` was not inside an existing Git repository before initialization.
- Inspected `.env.example`; values are placeholders, not live secrets.
- Excluded local artifacts/private config including `node_modules/`, `.next/`, `.codex/`, generated Prisma output, env files, build artifacts, logs, caches, and private key patterns.

Next recommended action:

- Confirm GitHub push result and continue with the next scoped project stage.

## Session Update - 2026-04-29

Stage: Agent Workflow Principles.
Role: Coder.
Status: documentation update completed.

What changed:

- Created `docs/agent-team-principles.md` to define AI agent roles, task framing, decision types, scope control, handoffs, review rules, migration rules, design workflow rules, anti-patterns, and Definition of Done.
- Added the required multi-agent workflow reference to `AGENTS.md`.
- Kept the work documentation-only; no production code was changed.

Next recommended action:

- Stage: Agent Workflow Principles verification.
- Objective: confirm the new documentation matches the requested workflow principles.
- Role: Verifier.
- Expected result: read-only verification report.

## Session Update - 2026-04-27

Stage: 3 - prepare design workflow docs.
Role: Coder.
Status: documentation update completed.

What changed:

- Updated the minimal Figma -> React -> Figma workflow docs under `docs/design`.
- Updated `AGENTS.md` with UI/Figma guardrails for MCP, design tokens, write-capable Figma tools, and implementation briefs.
- Did not change production code.

Next recommended step:

- Stage: 3 verification.
- Objective: check the design workflow docs and AGENTS guardrails against the requested workflow.
- Role: Verifier.
- Expected result: read-only report.

## Stage

Stage 5: storefront frontend template completed.

## Current Role

Verifier.

## Session Status

Session closing for 2026-04-21.

## Current Session Objective

Translate the approved Candy Cloud-inspired reference into a reusable ChouShop storefront frontend system using Next.js, TypeScript, Tailwind CSS, and mock data only.

## What Is Done

- Implemented a new storefront foundation:
  - tokenized `src/app/globals.css`
  - `Sora` + `Inter` font loading in `src/app/layout.tsx`
  - shared spacing, radius, shadow, motion, and surface utilities
- Expanded mock storefront data for richer merchandising:
  - `src/features/catalog/storefront-types.ts`
  - `src/features/catalog/sample-products.ts`
  - `src/features/catalog/sample-collections.ts`
- Built reusable storefront UI primitives:
  - buttons, badges, icon badges
  - price display
  - inputs and select
  - quantity stepper
  - cards, section shell, section heading, trust chip
- Rebuilt the public storefront shell:
  - updated header/footer
  - added mobile tab bar
  - refreshed static content wrapper styling
- Rebuilt customer-facing storefront pages in the new pastel system:
  - homepage with modular sections under `src/features/home`
  - product detail page with gallery, sticky buy surface, trust cues, included preview, and FAQ
  - catalog page with editorial intro, filter chips, mocked sort UI, and upgraded product cards/grid
  - cart and checkout pages with reusable summary components and mobile-first form flow
- Verified the integrated storefront:
  - `npm run typecheck` passed
  - `npm run lint` passed

## Current Project Facts

- Framework: Next.js 16.2.3 App Router.
- Language: TypeScript strict.
- Styling: Tailwind CSS v4 + CSS variable token system.
- Database: Neon PostgreSQL.
- ORM: Prisma.
- Payments: Stripe Checkout only.
- Email: Resend.
- Media: Cloudinary.
- Hosting: Vercel.
- Market: France-first.
- Storefront language: French.
- Currency: EUR.
- Price display: TTC.
- Payment confirmation: Stripe webhook only.
- Storefront frontend currently uses mock catalog data and does not add backend logic in this stage.

## What Is Happening Now

The storefront has a reusable frontend baseline that matches the approved cute-premium pastel direction and is ready for data/service alignment work.

## Next Recommended Stage

Stage 6.

Objective: review and align the real product/catalog/checkout data layer with the new storefront surface so the mock frontend can move toward production-backed data safely.

Recommended role: Reviewer.

Expected result:

- Read-only review of Prisma schema, public product endpoints, and service layer readiness against the new storefront UI needs.
- Identify which mock storefront fields map directly to domain data and which require derived presentation logic.
- Produce a scoped Coder task list for replacing mock catalog data incrementally without breaking checkout rules.

## Next Implementation Candidates

- Reconcile Prisma `Product` shape with storefront merchandising needs.
- Replace `sample-products` usage behind a safe public data adapter.
- Review `/api/products` and `/api/products/[slug]` against current page needs.
- Decide whether collection/filter metadata stays mocked or becomes derived from product records.
- Continue refining static legal/support pages to match the new storefront shell.

## Open Questions

See `memory-bank/openQuestions.md`.

Current high-priority open questions:

- Final legal seller identity.
- France-only vs France + EU at launch.
- Final shipping prices.
- Final support email.
- Admin auth approach.

## Handoff Notes

- Do not treat `/success` as payment confirmation.
- Do not trust client-side cart prices.
- Do not add promo code behavior in MVP-0.
- Do not add ProductVariant engine in MVP-0.
- Do not ship with placeholder legal pages.
- Keep storefront copy in French and price display in EUR TTC.
- Preserve the new token/component system instead of reintroducing one-off page styling.
