# Choushop Dirty Tree Review Report

Date: 2026-06-18
Work Block: `wb-choushop-dirty-tree-cleanup-review`

## Summary

The current dirty tree is not one coherent commit. It contains at least five
separate streams:

1. SDLC logs, agent memory, and review reports.
2. Candy Cloud public frontend prototype changes.
3. Commerce-flow changes that appear to pivot from Stripe Checkout to a
   Vinted/static request flow.
4. Admin/auth/schema/package changes.
5. Local Playwright/screenshot/snapshot artifacts.

This Work Block only performs non-destructive artifact ignore cleanup and
records review evidence. Product, commerce, admin, auth, schema, dependency, and
package changes remain deferred for explicit Owner decisions.

## Classification

| Bucket | Paths | Decision |
|---|---|---|
| SDLC evidence | `.claude/agent-memory/**`, `memory-bank/{activeContext,orchestrator-log,progress,review-log}.md`, `docs/reports/wb-catalog-ux-gpt-critic.md`, this report, Work Block plan | Candidate for a scoped docs/SDLC commit. |
| Local artifacts | `.playwright-mcp/**`, `catalog-snapshot.yml`, `homepage.png`, `homepage-final.png`, `choushop-homepage.png`, `catalog.png`, `cart.png`, `order.png`, `product-mini.png` | Covered by `.gitignore`; no deletion performed. |
| Design/reference owner decision | `candy_cloud_site_sketch.png`, `codex_mystery_box_design_brief.md` | Keep visible. Decide whether to move under `docs/` and commit as durable reference material. |
| Public frontend owner decision | `src/features/candy-cloud/**`, `src/app/(public)/catalog/**`, `src/app/(public)/products/**`, `src/app/(public)/order/**`, `src/app/(public)/design/**`, `src/components/shop/candy-product-card.tsx`, `src/components/shop/mystery-box-visual.tsx`, `public/icon.svg` | Likely intentional prototype output, but should be committed only after product-flow decision. |
| Commerce-flow risky/defer | public route redirects/replacements, cart feature changes, layout/navigation/footer/theme changes | Review-only. Needs explicit Owner decision because it changes checkout/order semantics. |
| Admin/auth/schema/package risky/defer | `package*.json`, `prisma/**`, `src/auth.ts`, `src/middleware.ts`, `src/lib/auth/**`, `src/app/admin/**`, `src/lib/validation/product.ts`, `src/server/services/catalog.ts` | Split into dedicated dependency, schema/auth, and admin Work Blocks. |

## Subagent Results

### Frontend Analyst

Verdict: needs Owner decision for the public frontend stream.

Key findings:
- Candy Cloud frontend files look intentional, but the route replacements and
  request-flow copy materially change commerce behavior.
- The new `/design` route is useful for development but should not ship publicly
  unless explicitly wanted.
- Root screenshots and Playwright snapshots are local evidence/noise, not
  runtime assets.

### Backend/Admin Risk Reviewer

Verdict: split required.

Key findings:
- Checkout/success/order changes conflict with the current Stripe Checkout-only
  constraint unless the Owner approves a product pivot.
- `package.json` and `package-lock.json` include dependency churn and Prisma
  version changes that should not be bundled with cleanup.
- Prisma default-role migration, admin route-group restructuring, and auth
  allowlist behavior are coherent but require a dedicated schema/auth/admin WB.

### Docs/Artifacts Reviewer

Verdict: cleanup `.gitignore`; keep durable SDLC evidence.

Key findings:
- Agent memory and memory-bank updates are durable SDLC state and likely belong
  in a scoped docs/SDLC commit.
- `.playwright-mcp/**`, snapshots, and generated root screenshots should stay
  local or ignored.
- `candy_cloud_site_sketch.png` may be a real design reference and should not be
  ignored automatically.

### Codex Critic

Verdict: `RECONSIDER`.

Required response:
- Stage 0 was rerun before cleanup writes.
- The Work Block now contains complete dirty-tree buckets and exact
  non-destructive cleanup whitelist.
- Broad delete globs were removed; this Work Block performs no file deletion.
- Skill routing and subagent mission briefs were added.
- Verification was tightened around status, diff names, untracked names,
  whitespace check, and candidate secret/string scan.

## Recommended Follow-Up Split

1. `docs/sdlc cleanup commit`: `.gitignore`, Work Block/report docs, memory/log
   updates, agent-memory files.
2. `Candy Cloud product-flow decision`: decide whether Vinted/static request flow
   replaces, coexists with, or is reverted in favor of Stripe Checkout.
3. `Admin/auth/schema hardening`: route groups, `requireAdmin`, allowlist,
   Prisma role default migration.
4. `Dependency lockfile review`: decide whether the Prisma downgrade and package
   changes are intentional.

## Residual Risks

- The working tree remains dirty by design because risky product/admin/schema
  changes are deferred, not reverted.
- No runtime app checks are sufficient to approve product behavior until the
  commerce-flow decision is made.
- No Claude Code handoff was launched; Codex read-only subagents provided enough
  signal for this cleanup/review stage.
