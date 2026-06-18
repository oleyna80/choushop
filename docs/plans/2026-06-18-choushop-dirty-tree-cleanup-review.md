# Work Block: Choushop Dirty Tree Cleanup & Review Closure

## Meta
- **Work Block ID:** wb-choushop-dirty-tree-cleanup-review
- **Date:** 2026-06-18
- **Owner:** azur
- **Execution Mode:** end-to-end autonomous within approved cleanup/review scope
- **Side-Effect Class:** local-docs + local-test + repository cleanup; product/risky files are review-only unless separately approved
- **DB Action Mode:** none
- **Verification Tier:** standard

## Objective
Bring the current `choushop` working tree into an auditable state before the next
feature Work Block by inventorying dirty files, separating intentional product
changes from temporary artifacts, updating ignore rules where needed, and
recording review evidence.

## Expected Final Result
`choushop` has a clear dirty-tree closure state: all current changes are
classified, safe temporary artifacts are removed or ignored, useful SDLC review
artifacts are retained, risky product/backend/admin/schema/package changes are
explicitly documented for Owner decision, read-only review evidence exists, and
the repository is ready for a deliberate commit/stage decision without mixing
unrelated Work Blocks.

## Done Criteria
- [x] Current dirty files are grouped into `keep+commit`, `remove/ignore`,
      `needs Owner decision`, and `risky/defer` buckets.
- [x] Safe temporary artifacts are covered by `.gitignore`; no file deletion is
      required for this Work Block.
- [x] A read-only reviewer pass has checked the classification and risk calls.
- [x] Verification commands have run or documented why they were skipped.
- [x] Closeout states what is ready to commit and what remains deferred.

## Preflight State
- **Git baseline:** dirty; `git status --short --branch` shows local changes on
  `main...origin/main`.
- **Pre-existing dirty files:** public Candy Cloud frontend implementation,
  admin/auth/schema/package changes, memory/log updates, screenshots, design
  references, and Playwright/runtime artifacts.
- **Untracked local artifacts:** root screenshots, `.playwright-mcp/`,
  `catalog-snapshot.yml`, image references, generated public assets, new route
  trees, and SDLC reports.
- **Proceed rule:** Proceed because the Owner explicitly approved cleanup/review
  and subagent use. Do not change risky commerce/admin/schema/package behavior
  during this Work Block; classify and defer it unless the Owner approves a
  separate implementation scope.

### Stage 0 Reconsider Update
The first Codex critic pass returned `RECONSIDER` because the original write-set
used broad cleanup globs and did not classify every dirty file class. Stage 0
was rerun before cleanup writes. The corrected contract below is authoritative.

### Complete Dirty-Tree Buckets
| Bucket | Paths | Decision |
|---|---|---|
| `keep+commit` candidate, SDLC evidence | `.claude/agent-memory/gpt-critic/MEMORY.md`, `.claude/agent-memory/verifier/MEMORY.md`, `.claude/agent-memory/gpt-critic/wb-catalog-ux-review.md`, `.claude/agent-memory/verifier/catalog-ux-patterns.md`, `docs/reports/wb-catalog-ux-gpt-critic.md`, Work Block/review reports, `memory-bank/activeContext.md`, `memory-bank/orchestrator-log.md`, `memory-bank/progress.md`, `memory-bank/review-log.md` | Commit only in a scoped docs/SDLC closure commit after final review. |
| `ignore-local-artifact`, no deletion | `.playwright-mcp/**`, `catalog-snapshot.yml`, `homepage.png`, `homepage-final.png`, `choushop-homepage.png`, `catalog.png`, `cart.png`, `order.png`, `product-mini.png` | Add exact `.gitignore` rules. Do not delete files in this Work Block. |
| `needs Owner decision`, design/reference | `candy_cloud_site_sketch.png`, `codex_mystery_box_design_brief.md` | Keep visible in status. Owner decides whether to move under `docs/` and commit as durable brief/reference. |
| `needs Owner decision`, public Candy Cloud frontend | `src/features/candy-cloud/**`, `src/app/(public)/catalog/**`, `src/app/(public)/products/**`, `src/app/(public)/order/**`, `src/app/(public)/design/**`, `src/components/shop/candy-product-card.tsx`, `src/components/shop/mystery-box-visual.tsx`, `public/icon.svg` | Likely intentional product WB output, but defer commit decision because it changes product flow. |
| `risky/defer`, commerce flow | `src/app/(public)/checkout/page.tsx`, `src/app/(public)/success/page.tsx`, `src/app/(public)/cancel/page.tsx`, `src/app/(public)/cart/page.tsx`, `src/app/(public)/page.tsx`, `src/app/(public)/shop/page.tsx`, `src/app/(public)/product/[slug]/page.tsx`, `src/features/cart/**`, `src/components/shop/add-to-cart-button.tsx`, layout/nav/footer/theme files | Review-only. These may pivot from Stripe Checkout to Vinted/static request flow and require explicit product/commerce decision. |
| `risky/defer`, admin/auth/schema/package | `package.json`, `package-lock.json`, `prisma/schema.prisma`, `prisma/migrations/**`, `src/auth.ts`, `src/middleware.ts`, `src/lib/auth/**`, `src/app/admin/**`, `src/lib/validation/product.ts`, `src/server/services/catalog.ts` | Review-only. Split into dependency, schema/auth, and admin WBs before commit. |

### Exact Non-Destructive Cleanup Whitelist
Only these ignore-rule changes are approved for Stage 1 cleanup:

```txt
.gitignore: add exact ignore rules for:
.playwright-mcp/
catalog-snapshot.yml
*-snapshot.yml
homepage.png
homepage-final.png
choushop-homepage.png
catalog.png
cart.png
order.png
product-mini.png
```

No `rm`, `git clean`, broad delete, or path deletion is authorized in this Work
Block. Ambiguous reference files remain visible for Owner decision.

## Dependency Check
### Must Resolve Before Start
- None. Owner approved the Work Block and subagent use.

### Can Resolve During Work
- Whether Claude Code is needed as an additional external reviewer after Codex
  subagent review. Use only read-only if the local classification remains
  ambiguous.
- Which screenshots are durable references versus temporary smoke artifacts.

## Runtime / Data Mutation Boundary
- **Applies:** yes, because the dirty tree includes commerce-adjacent paths.
- **Agent authority:** planner, reviewer, repository cleanup author only.
- **Structured action:** not applicable; no runtime data mutation.
- **Trusted executor:** not applicable.
- **Policy and approval:** direct DB/provider/order/stock/payment mutation is
  denied. Schema/package/admin/payment behavior changes are classification-only
  unless separately approved.
- **Audit path:** this Work Block, `memory-bank/orchestrator-log.md`,
  `memory-bank/review-log.md`, and final session report.
- **Forbidden direct path:** raw SQL, Prisma migration apply, Stripe/provider
  mutation, production config changes, deploys.

## Scope
### In Scope
- Inventory and classification of the current dirty tree.
- Cleanup of clearly temporary local artifacts such as tool state and throwaway
  screenshots when safe.
- `.gitignore` additions for recurring local runtime artifacts.
- SDLC docs/log updates that record cleanup/review evidence.
- Read-only review of risky files and final commit-readiness grouping.

### Out of Scope
- New features.
- Production deploy.
- Live DB migration or schema application.
- Env/secrets/config changes.
- Payment, checkout, order, stock, auth, admin, Prisma, package, or server
  behavior changes without separate Owner approval.
- Force-clean, reset, history rewrite, or reverting unknown user changes.

## Write-Set
```txt
docs/plans/2026-06-18-choushop-dirty-tree-cleanup-review.md
docs/reports/**
memory-bank/activeContext.md
memory-bank/orchestrator-log.md
memory-bank/review-log.md
.codex/write-gate.md
.gitignore
```

Risky files may be read and classified but not modified in this Work Block:

```txt
package.json
package-lock.json
prisma/schema.prisma
prisma/migrations/**
src/auth.ts
src/middleware.ts
src/app/admin/**
src/app/(public)/checkout/**
src/app/(public)/success/**
src/app/(public)/cancel/**
src/server/**
src/lib/**
src/features/candy-cloud/**
src/features/cart/**
src/components/**
src/app/(public)/**
public/**
.claude/agent-memory/**
memory-bank/progress.md
codex_mystery_box_design_brief.md
candy_cloud_site_sketch.png
```

## Commit / Stage Scope
- **Files to stage/commit:** final decision only after cleanup; expected
  candidates are `.gitignore`, Work Block/report docs, memory/log updates, and
  intentional product files approved in a later commit scope.
- **Files to leave unstaged:** risky/deferred files, local-only screenshots,
  runtime artifacts, secrets, generated output.
- **Scope guard:** `git status --short --branch`, `git diff --name-only`, and
  explicit file bucket report before any commit.

## Acceptance Criteria
- [ ] The Owner can see exactly which files are safe to commit now, which are
      local-only artifacts, and which need a separate Work Block.
- [ ] No secrets, `.env`, build output, `node_modules`, `.next`, or local tool
      state are included in commit candidates.
- [ ] No direct commerce/runtime data mutation occurs.
- [ ] Review evidence explicitly covers frontend, backend/admin/schema/package,
      and docs/artifacts slices.

## Risks and Mitigations
| Risk | Impact | Mitigation | Stop Condition |
|---|---|---|---|
| Temporary artifacts get committed | Noisy repo and poor onboarding | Classify root screenshots and tool state; update `.gitignore` | Artifact purpose is unclear |
| Useful reference assets are deleted | Loss of design evidence | Keep references unless clearly generated smoke output | Asset maps to a design brief or product doc |
| Risky admin/schema/package changes are mixed into cleanup | Unsafe commit and hard-to-review diff | Classification-only for risky paths | Fix requires editing risky path |
| Unknown user changes are overwritten | Data/work loss | Do not revert or reset; only remove explicitly safe local artifacts | File ownership unclear |
| Review misses a dirty-tree class | Bad commit readiness | Use parallel read-only subagents and final status sweep | Unclassified files remain |

## Hard Stops in Scope
- [ ] Production deploy
- [ ] Live DB migration
- [ ] Credential rotation
- [ ] Destructive git ops beyond approved safe artifact cleanup
- [ ] Client communications

## Subagent Strategy
- **Classification:** Subagent-Required
- **Triggers matched:** dirty tree is large, touches 3+ files, includes DB/auth/admin/package/checkout-adjacent paths, and uses a multi-slice review topology.
- **Use Claude Code team:** conditional. Prefer Codex read-only subagents first; use Claude Code only if classification remains ambiguous or Owner asks for an external-team process sample.
- **Claude Code process scope:** if used, include internal CC logs/memory in the allowed scope and require `memory-bank/external-team-log.md`.
- **Claude Code external report:** conditional; not required if Codex subagent review gives sufficient evidence.
- **Use Codex/GPT critic or verifier:** yes. Stage 0.5 Codex Critic is mandatory for this non-trivial Work Block.
- **Dispatch plan:** Frontend Analyst, Backend/Admin Risk Reviewer, Docs/Artifacts Reviewer, then Codex Critic consolidation.
- **Budget posture:** normal.
- **Skip reasons:** none for Codex critic. Claude Code may be skipped if local subagents provide enough read-only review signal.

### Subagent Mission Briefs
All subagents are read-only. Approved write-set: none. DB action mode: none.
Hard stops: secrets, live DB/provider access, deploys, destructive git
operations, or scope expansion.

| Agent | Scope | Out of Scope | Expected Output | File-Change Permission |
|---|---|---|---|---|
| Frontend Analyst / Reviewer | Public UI dirty paths, layout/nav/footer/theme, Candy Cloud feature files, root visual artifacts | Package/schema/admin/backend changes | Table of frontend/product artifacts classified as keep, remove/ignore, Owner decision, risky | none/read-only |
| Backend/Admin Risk Reviewer | package/lockfile, Prisma, auth, middleware, admin route groups, validation/server services, checkout-adjacent files | Frontend design quality and artifact cleanup | Table of risky backend/admin/config files and split-WB recommendation | none/read-only |
| Docs/Artifacts Reviewer | `.claude/agent-memory/**`, `memory-bank/**`, reports/plans, `.playwright-mcp/**`, snapshots/screenshots, `.gitignore`, handoff state | Product code correctness | Table of durable docs/logs versus local artifacts and `.gitignore` recommendations | none/read-only |
| Codex Critic | Work Block contract, scope/write-set, skill routing, topology, risks, verification plan | Technical correctness of every product diff | APPROVE/SUPPLEMENT/RECONSIDER critic report with required orchestrator response | none/read-only |

## Skills
- **Checked:** critic-review, orchestrator-log, subagent-mission-brief, scoped-commit-guard, frontend-design, webapp-testing, security-audit-triage.
- **Matched:** critic-review, orchestrator-log, subagent-mission-brief.
- **Used:** critic-review through Codex critic subagent; orchestrator-log inline through `memory-bank/orchestrator-log.md` and `memory-bank/review-log.md`; subagent-mission-brief shape for subagent assignments.
- **Deferred:** scoped-commit-guard until Owner approves an explicit commit/stage whitelist.
- **Skipped:** frontend-design because no frontend implementation or design change is planned; webapp-testing because cleanup does not change runtime UI; security-audit-triage because this is classification/cleanup and no security fix is being authored.

## Verification Plan
- **Canonical checks:** `git status --short --branch`, `git diff --name-status`,
  `git ls-files --others --exclude-standard`, `git diff --check`, candidate
  secret/string scan for commit candidates.
- **Scoped fallback checks:** `npm run lint` and `npm run typecheck` only after
  Owner decides how to handle the risky dependency/package and product-flow
  changes. If skipped, record residual risk.
- **Browser smoke:** not applicable unless frontend files are modified during
  cleanup.
- **Evidence expected:** subagent reports, dirty-tree bucket report, command
  output summary, updated Work Block closeout.
- **Skipped checks:** record exact reason and residual risk if skipped.

## Rollback / Recovery
Do not use destructive git reset or clean. If a cleanup edit is wrong, restore
only the specific file/path from explicit Owner instruction or by applying the
inverse patch. Keep deferred product/risky files untouched.

## Execution Log
| Time | Stage | Action / Decision | Evidence | Status |
|---|---|---|---|---|
| 2026-06-18T08:46:26Z | Stage 0 | Owner approved Work Block and subagent use; dirty tree confirmed | `git status --short --branch` | in progress |
| 2026-06-18T08:46:26Z | Stage 0.5 | Codex critic returned `RECONSIDER`; Stage 0 rerun with complete buckets and exact non-destructive cleanup whitelist | critic subagent report | addressed |
| 2026-06-18T09:07:00Z | Stage 1 | Applied only non-destructive local-artifact ignore rules; no file deletion, reset, or cleanup command used | `.gitignore`; `git ls-files --others --exclude-standard` | complete |
| 2026-06-18T09:12:00Z | Stage 2 | Consolidated read-only subagent results into review report and memory-bank logs | `docs/reports/2026-06-18-choushop-dirty-tree-review.md`; `memory-bank/orchestrator-log.md`; `memory-bank/review-log.md` | complete |
| 2026-06-18T09:16:00Z | Stage 3 | Ran dirty-tree and hygiene verification | `git status --short --branch`; `git diff --name-status`; `git ls-files --others --exclude-standard`; `git diff --check`; candidate secret scan | complete |

## Closeout and Retrospective
Complete this before the Work Block is considered closed. Keep this evidence
based: record what happened, not private reasoning or unsupported claims.

### Result Summary
- **Final Result:** complete for cleanup/review scope. The dirty tree is now
  classified, local Playwright/snapshot/screenshot artifacts are ignored
  non-destructively, SDLC audit evidence is recorded, and risky product,
  commerce, admin/auth, schema, and package changes are split for separate
  Owner decisions.
- **Verification Evidence:** `git status --short --branch` and
  `git diff --name-status` still show the expected deferred product/admin
  dirty tree; `git ls-files --others --exclude-standard` no longer lists the
  ignored local artifacts; `git diff --check` passed; candidate secret/string
  scan over the newly authored cleanup/report/log files returned no matches.
- **Residual Risks:** no runtime `npm run lint`, `npm run typecheck`, or browser
  smoke was run for this cleanup-only Work Block because the repository still
  contains deferred product, package, schema, and auth changes from other work
  streams. Those checks must run inside the next implementation/commit Work
  Block after the Owner chooses a clean scope.

### Critic and Review Value
- **Critic used:** yes. The first Codex critic verdict was `RECONSIDER`; it
  caught that the initial plan did not fully classify the dirty tree and used
  broad cleanup language. The Work Block was corrected before cleanup edits.
- **Subagents used:** Docs/Artifacts Reviewer, Frontend Analyst,
  Backend/Admin Risk Reviewer, and Codex Critic.
- **Process note:** Claude Code was not launched for this Work Block because the
  read-only Codex subagents produced enough classification signal, and adding an
  external-team run would not change the non-destructive cleanup boundary.
- **Critic verdict:** pending
- **What the critic caught:** pending
- **What the critic missed:** pending
- **Skip/fallback reason:** not applicable

### Lessons Learned
- **What worked:** pending
- **What did not work:** pending
- **What not to repeat:** pending
- **Evidence wording check:** pending
- **Framework updates made:** none planned
- **Framework updates to consider:** pending
- **Reusable knowledge created:** pending
- **Follow-up Work Blocks:** pending
