# Active Context

## Session Update - 2026-06-18

Stage: ChouShop SDLC navigation sync.
Role: Orchestrator + Coder for SDLC/navigation files only.
Status: navigation-control layer synced from `agentic-sdlc-framework` commit
`6fa8327`; product/backend/admin/schema/package dirty files remain deferred and
out of scope.

What changed:

- Pushed the previous safe audit commit `08c7dd9` before starting this Work
  Block.
- Created
  `docs/plans/2026-06-18-choushop-sdlc-navigation-sync.md` and updated
  `.codex/write-gate.md` with an SDLC-only write-set.
- Added ChouShop-specific `PROJECT_MAP.md`, `FILE_REGISTRY.yml`, and
  `docs/session-bootstrap.md`.
- Updated `docs/templates/work-block-template.md` with the `Navigation Impact`
  planning and closeout fields.
- Updated `scripts/bootstrap.sh` so bootstrap verification requires
  `PROJECT_MAP.md`, `FILE_REGISTRY.yml`, and `docs/session-bootstrap.md`.
- Preserved ChouShop's `AGENTS.md` as the project authority and kept the
  existing `memory-bank/` convention rather than copying generic
  `memory_bank/` references from the framework template.

Review result:

- Codex critic verdict: SUPPLEMENT.
- Main findings: do not overwrite project-specific `AGENTS.md`; adapt
  framework template paths to `memory-bank/`; add navigation checks to
  bootstrap while accounting for `.agent/project-config.md`; keep product dirty
  files out of the SDLC commit.

Next recommended action:

- Stage: Verification / Commit Gate.
- Objective: run path-limited verification for the SDLC navigation sync and
  request Owner approval before staging/committing the SDLC-only diff.
- Role: Verifier.
- Expected result: synced SDLC navigation files are verified, unrelated dirty
  files remain unstaged, and the Owner can decide whether to commit.

## Session Update - 2026-06-18

Stage: ChouShop dirty tree cleanup/review.
Role: Orchestrator + Coder for documentation/ignore cleanup only.
Status: large dirty tree classified; risky product/backend changes left
read-only for follow-up owner decisions.

What changed:

- Created the Work Block
  `docs/plans/2026-06-18-choushop-dirty-tree-cleanup-review.md` with an
  explicit final result, dirty-tree buckets, no-delete cleanup whitelist,
  subagent mission briefs, and verification plan.
- Updated `.codex/write-gate.md` for this Work Block so only docs/reports,
  memory logs, `.gitignore`, and the write gate itself are writable.
- Ran read-only Codex subagents for docs/artifacts, frontend, backend/admin
  risk, and critic review.
- Added `.gitignore` entries for local review artifacts:
  `.playwright-mcp/`, snapshot YAML, and generated screenshot filenames.
- Wrote the consolidated dirty-tree review report at
  `docs/reports/2026-06-18-choushop-dirty-tree-review.md`.

Review result:

- Docs/artifacts: keep SDLC evidence and agent-memory markdown; ignore local
  Playwright/screenshot/snapshot artifacts.
- Frontend: Candy Cloud public frontend appears intentional but needs an owner
  decision before product-flow commit.
- Backend/admin: checkout/order flow, package lockfile churn, Prisma schema and
  migration, admin route groups, auth middleware, and require-admin guard must
  be split into separate approved Work Blocks.
- Codex critic: initial plan was `RECONSIDER`; Stage 0 was rerun and the WB was
  hardened before cleanup edits continued.

Next recommended action:

- Stage: Owner Decision / Follow-up Planning.
- Objective: choose the next split Work Block: docs/SDLC cleanup commit,
  Candy Cloud product-flow decision, admin/auth/schema hardening, or dependency
  lockfile review.
- Role: Orchestrator.
- Expected result: one approved scope with a clean commit boundary.

## Session Update - 2026-06-17

Stage: Claude Code handoff review smoke closeout.
Role: Orchestrator + Coder for SDLC/log cleanup.
Status: Claude Code external-team delegation was validated end-to-end through
the handoff runner, and process findings were recorded for the next Work Block.

What changed:

- Ran Claude Code as a read-only external reviewer through the
  Codex -> handoff-runner -> Claude Code -> result/log flow.
- Confirmed runner status `complete`, exit code `0`, scope audit `passed`, and
  external team output in `memory-bank/external-team-log.md`.
- Fixed the external-team-log summary table formatting and replaced the
  pending runner artifact note with the actual result/log paths.
- Updated handoff runner scope snapshots to ignore runner-owned volatile
  `handoff/` state so future scope-audit output focuses on project files
  changed by the external team, not temp/runtime files.
- Synchronized the runner-owned state exclusion and documentation back to the
  base `agentic-sdlc-framework` copy.

Review result:

- Claude Code verdict: SUPPLEMENT.
- High-priority product findings for the next product Work Block:
  `SiteHeader`/`SiteFooter` are not wired into `layout.tsx`, and mobile
  navigation is missing.
- Medium findings: catalog filter chips are non-functional, footer links point
  to missing pages, and several brief-listed components remain inline.
- Claude Code did not use internal subagents for this read-only review. It
  logged the rationale: no code changes and duplicate signal expected.

Checks:

- Claude Code ran `npx tsc --noEmit` — passed.
- Claude Code ran `npm run lint` — passed with warnings only in
  `.claude/skills/`.
- Handoff runner scope audit — passed.
- Cleanup verification should run `bash -n` on the runner and the framework
  scope-audit regression before the next commit.

Next recommended action:

- Stage: Product Fix Work Block.
- Objective: close the high-priority Candy Cloud findings from the Claude Code
  review, starting with `SiteHeader`/`SiteFooter` wiring and mobile navigation.
- Role: Orchestrator.
- Expected result: public frontend shell renders consistently on desktop and
  mobile, with product code changes kept separate from SDLC cleanup.

## Session Update - 2026-06-16

Stage: Candy Cloud public frontend implementation.
Role: Coder + Verifier.
Status: public prototype flow implemented and verified with Codex-only SDLC; Claude Code was not used.

What changed:

- Rebuilt the public storefront around the Candy Cloud Mystery Box brief and sketch reference as a componentized Next.js + TypeScript + Tailwind system.
- Added mock Candy Cloud product data, visual product cards, mystery-box visual components, catalog/detail/cart/order/success/design pages, and public route aliases from the old shop/product/checkout/success paths.
- Updated global visual tokens, header, footer, mobile navigation, metadata, sitemap, and favicon for the Vinted-based request flow.
- Extended the client cart model with optional `styleChoice` so product/style variants are tracked correctly.
- Kept admin/auth/Prisma/package/backend/payment implementation out of scope; existing dirty files in those areas were not modified by this Work Block.

Checks:

- `npm run typecheck` — passed.
- `npm run lint` — passed with 262 warnings in synchronized `.agent/.claude` skill scripts; no storefront errors.
- `npx next build` — passed.
- Browser smoke via Playwright wrapper — passed for `/catalog` add-to-cart, `/cart` line item + 9,90 EUR total, `/order` form, and `/order/success`.

Next recommended action:

- Stage: Review/Commit Gate.
- Objective: review the focused storefront diff against unrelated dirty files, then commit/push only the approved Work Block files.
- Role: Orchestrator.
- Expected result: clean separation between Candy Cloud frontend changes and pre-existing admin/backend/config changes.

## Session Update - 2026-06-16

Stage: Full SDLC Framework Sync into ChouShop.
Role: Coder.
Status: framework runtime/configuration layer installed and verified without launching Claude Code.

What changed:

- Synchronized the updated SDLC scaffold into the project across Codex, shared agent workflow, Claude Code runtime files, handoff runner, docs templates, docs reference, and bootstrap verification.
- Kept `memory-bank/` as the project SSOT convention and fixed bootstrap detection so it does not confuse `memory_bank/` with `memory-bank/`.
- Exposed publishable `.agent/skills/**`, `.claude/agent-memory/**/*.md`, `.codex/*` allowlisted files, and handoff scaffold files through Git while keeping backups, local Claude runtime state, secrets, env files, and handoff runtime outputs ignored.
- Configured `.mcp.json` to run the Codex MCP server in read-only/no-approval mode for Claude-side GPT/Codex critic and verifier usage.
- Did not run Claude Code and did not touch product implementation files as part of this Work Block.

Checks:

- `scripts/bootstrap.sh` — passed; selected `memory-bank/`.
- `bash -n` on Claude hooks, handoff runner scripts, and `scripts/bootstrap.sh` — passed.
- Secret scan for token-like values and filled `ANTHROPIC_AUTH_TOKEN` in SDLC paths — no matches.
- Placeholder scan for unresolved `{{PROJECT_*}}` — no matches.
- `git diff --check` on SDLC paths — passed.
- `git check-ignore -v` confirmed publishable skills are visible and backup files remain ignored.

Next recommended action:

- Stage: Real Project Work Block planning.
- Objective: use the installed Codex SDLC layer to plan and execute the next `choushop` feature task, initially without Claude Code delegation.
- Role: Orchestrator.
- Expected result: a scoped Work Block with expected final result, risks, verification tier, and Codex critic handling.

## Session Update - 2026-06-14

Stage: Admin Role Hardening + Product CRUD with Server Actions.
Role: Coder.
Status: implementation complete, awaiting verification.

What changed:

- **Auth hardening (fail-closed):**
  - Changed default `User.role` from `ADMIN` → `OPERATOR` in Prisma schema + migration.
  - Added `ADMIN_EMAILS` env var allowlist — only listed emails get admin on sign-in.
  - Non-allowlisted users must already have admin role in DB; otherwise sign-in is denied.
  - Session callback now returns `role: null` for non-admin users (fail closed).
- **Admin guard:** Created `src/lib/auth/require-admin.ts` — reusable server-action guard that redirects unauthenticated users to `/admin/login` and non-admin users to `/admin/unauthorized`.
- **Unauthorized page:** New `/admin/unauthorized` page with sign-out button + back-to-login link.
- **Server actions extracted:**
  - `src/app/admin/products/new/actions.ts` — `createProductAction` with `requireAdmin()` + rate limiting.
  - `src/app/admin/products/[slug]/edit/actions.ts` — `updateProductAction` with `requireAdmin()` + rate limiting.
- **Forms refactored:**
  - `edit-form.tsx` — client component with `useActionState`, extracted Field/Select helpers.
  - `new/page.tsx` — now a client component with inline Field/Select (no separate form file).
- **Zod fixes:** `nullable()` added to optional fields (`theme`, `compareAtPrice`, `sku`, `weight`) so empty form strings parse correctly.
- **Catalog service:** `updateProduct` catch block now includes actual error message in event log.
- **Agent/hook configs:** Various SDLC hardening updates (Codex MCP-only, critic gate write-set enforcement, etc.).

Checks:
- `npm run typecheck` — passed (0 errors).
- `npm run lint` — passed (0 errors, 262 pre-existing warnings in skill scripts).

Next recommended action:
- Stage: Verification.
- Objective: verify auth flow (allowlist sign-in, non-admin denial, unauthorized page), server actions (create + update with validation), and DB migration.
- Role: Verifier.
- Expected result: READY or BLOCKED verdict.

## Session Update - 2026-06-13

Stage: CC-native GPT/Codex gate friction fixes.
Role: Coder.
Status: hook usability fixes applied.

What changed:

- Narrowed the live DB hard-stop so plain `DATABASE_URL` inspection, such as grep against env examples, is not blocked.
- Kept blocking `DATABASE_URL` when it appears in the same command segment as `prisma migrate deploy`, `prisma db push`, or `psql`.
- Improved critic-gate write-set drift denial text so it names the missing file and the exact `Approved Write-Set` line to add.
- Kept the work limited to agent hooks and workflow memory; no production app code, package files, schema files, commits, pushes, deploys, or migrations were changed by this session.

Next recommended action:

- Stage: Verification.
- Objective: run shell syntax and hook smoke checks for DB false positives and write-set drift messaging.
- Role: Verifier.
- Expected result: confirm the guardrails are less noisy without weakening risky-operation blocks.

## Session Update - 2026-06-13

Stage: CC-native GPT/Codex SDLC hardening.
Role: Coder.
Status: agent workflow hardening applied.

What changed:

- Restricted Codex usage to the configured MCP tool path and removed project approval for direct `Bash(codex *)` execution.
- Rewrote GPT critic/verifier and Codex verification skill docs around MCP-native, read-only advisory review.
- Split default Stage 0.5 GPT criticism, default Stage 2 GPT verification, and optional deep Codex review into separate routing roles.
- Hardened the critic gate so Edit/MultiEdit/Write is bound to Work Block metadata, expiry, optional session lock, and an approved write-set.
- Marked `.codex/write-gate.md` as reference-only so it cannot be mistaken for an enforcement source.
- Kept the work limited to agent configuration, hooks, and workflow documentation; no production app code, package files, database schema, commits, pushes, or deploys were changed by this session.

Next recommended action:

- Stage: Verification.
- Objective: run JSON/shell syntax checks and inspect remaining Codex references for stale plugin/direct-shell paths.
- Role: Verifier.
- Expected result: confirm the MCP-only reviewer/verifier contract is internally consistent.

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
