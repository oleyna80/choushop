# Work Block: ChouShop SDLC Navigation Sync

## Meta
- **Work Block ID:** wb-choushop-sdlc-navigation-sync
- **Date:** 2026-06-18
- **Owner:** azur
- **Execution Mode:** end-to-end autonomous within approved SDLC-only scope
- **Side-Effect Class:** local-docs + public-repo metadata
- **DB Action Mode:** none
- **Verification Tier:** standard

## Objective
Synchronize the latest navigation-control layer from
`agentic-sdlc-framework` into `choushop` so humans and agents can quickly
orient in the project without reading the whole repository or relying on stale
session context.

## Expected Final Result
`choushop` has a project-specific `PROJECT_MAP.md`, `FILE_REGISTRY.yml`, and
`docs/session-bootstrap.md`; the Work Block template includes the navigation
impact check; `scripts/bootstrap.sh` verifies those files; SDLC logs record the
sync; unrelated product/backend/admin/schema/package dirty files remain
untouched and unstaged; verification confirms no placeholders, secrets, ignore
visibility issues, or whitespace errors in the synced SDLC files.

## Done Criteria
- [x] Navigation files exist and are adapted to ChouShop, not copied with
      unresolved framework placeholders.
- [x] `docs/templates/work-block-template.md` includes `Navigation Impact`.
- [x] `scripts/bootstrap.sh` checks `PROJECT_MAP.md`, `FILE_REGISTRY.yml`, and
      `docs/session-bootstrap.md`.
- [x] Memory/review/orchestrator logs capture the sync and critic result.
- [x] Diff is restricted to the approved SDLC write-set.

## Preflight State
- **Git baseline:** dirty; `git status --short --branch` shows many
  pre-existing product/backend/admin/schema/package changes on
  `main...origin/main`.
- **Pre-existing dirty files:** Candy Cloud public frontend, admin/auth/schema,
  package/lockfile, checkout/order/cart flow, design references, and local
  artifacts from prior Work Blocks.
- **Untracked local artifacts:** visible product/reference files remain
  deferred for Owner decision.
- **Proceed rule:** Proceed because the Owner approved updating SDLC in
  `choushop` after the safe cleanup/audit commit was pushed. This Work Block
  only touches explicit SDLC navigation files and does not classify, edit,
  stage, or commit product/backend dirty files.

## Dependency Check
### Must Resolve Before Start
- Current safe audit commit must be pushed before this Work Block.

### Can Resolve During Work
- Framework template placeholders must be hydrated for ChouShop.
- `memory_bank/` references from the generic framework template must be adapted
  to ChouShop's existing `memory-bank/` convention.

## Runtime / Data Mutation Boundary
- **Applies:** no runtime mutation; this Work Block is documentation and
  workflow metadata only.
- **Agent authority:** approved code/documentation authoring only within
  write-set.
- **Structured action:** not applicable.
- **Trusted executor:** not applicable.
- **Policy and approval:** direct DB/provider/order/stock/payment mutation is
  denied.
- **Audit path:** this Work Block, `memory-bank/orchestrator-log.md`,
  `memory-bank/review-log.md`, and
  `docs/reports/2026-06-18-choushop-sdlc-navigation-sync.md`.
- **Forbidden direct path:** raw SQL, Prisma migration apply, Stripe/provider
  mutation, production config changes, deploys.

## Scope
### In Scope
- Add ChouShop-specific `PROJECT_MAP.md`.
- Add ChouShop-specific `FILE_REGISTRY.yml`.
- Add `docs/session-bootstrap.md` adapted to project authority and
  `memory-bank/`.
- Update `docs/templates/work-block-template.md` with navigation impact
  planning/closeout fields.
- Update `scripts/bootstrap.sh` to require navigation files.
- Update SDLC logs/report and write gate for this Work Block.

### Out of Scope
- Product, frontend, backend, admin, auth, checkout, order, stock, Prisma,
  package, lockfile, deploy, env, and secrets changes.
- Claude Code execution.
- Deleting or cleaning dirty files.
- Commit/push until the Owner explicitly approves after verification.

## Write-Set
```txt
.codex/write-gate.md
docs/plans/2026-06-18-choushop-sdlc-navigation-sync.md
docs/reports/2026-06-18-choushop-sdlc-navigation-sync.md
memory-bank/activeContext.md
memory-bank/orchestrator-log.md
memory-bank/review-log.md
FILE_REGISTRY.yml
PROJECT_MAP.md
docs/session-bootstrap.md
docs/templates/work-block-template.md
scripts/bootstrap.sh
```

## Navigation Impact
- **Files added/moved/removed:** add `PROJECT_MAP.md`,
  `FILE_REGISTRY.yml`, and `docs/session-bootstrap.md`; no moves/removes.
- **PROJECT_MAP.md update needed:** yes; this Work Block creates it.
- **FILE_REGISTRY.yml update needed:** yes; this Work Block creates it.
- **Session bootstrap or profile docs update needed:** yes; this Work Block
  creates session bootstrap and wires it into bootstrap verification.
- **Generated/derived/local-only boundary changed:** yes; the map and registry
  document that SDLC logs are evidence, product dirty files are deferred, and
  local runtime artifacts must not override authority files.

## Commit / Stage Scope
- **Files to stage/commit:** only files in the Write-Set after verification.
- **Files to leave unstaged:** all pre-existing product/backend/admin/schema,
  package, design/reference, runtime artifact, and local tool changes.
- **Scope guard:** `git diff --name-only`, `git status --short --branch`, and
  path-limited verification commands before any commit request.

## Acceptance Criteria
- [x] A new agent or human can start from `PROJECT_MAP.md`,
      `FILE_REGISTRY.yml`, and `docs/session-bootstrap.md` and understand the
      authority order, operating modes, key paths, and local-only boundaries.
- [x] The registry reflects ChouShop's `memory-bank/` convention and commerce
      safety constraints.
- [x] Bootstrap fails if the navigation files are missing.
- [x] No product/runtime file is changed by this Work Block.
- [x] Verification evidence is recorded in the report.

## Risks and Mitigations
| Risk | Impact | Mitigation | Stop Condition |
|---|---|---|---|
| Framework template overwrites ChouShop policy | Project-specific commerce and approval rules weaken | Preserve `AGENTS.md`; adapt map/registry instead of copying blindly | Sync requires replacing project-specific policy |
| `memory_bank/` sneaks back into ChouShop docs | Agents read the wrong memory convention | Replace generic template references with `memory-bank/` | Both conventions become required without Owner decision |
| Product dirty tree gets staged with SDLC commit | Mixed unsafe commit boundary | Path-limited diff/status and explicit stage scope | Any product path appears in SDLC diff |
| Placeholder text remains in published docs | Poor onboarding and wrong paths | Placeholder scan over synced files | Unresolved `{{PROJECT_*}}` remains |
| Bootstrap mutates unexpected files | Dirty tree worsens | Use `bash -n` first; run full bootstrap only if safe | Bootstrap would write outside expected `.agent/project-config.md` |

## Hard Stops in Scope
- [ ] Production deploy
- [ ] Live DB migration
- [ ] Credential rotation
- [ ] Destructive git ops
- [ ] Client communications

## Subagent Strategy
- **Classification:** Subagent-Required for critic only.
- **Triggers matched:** SDLC authority files, large unrelated dirty tree,
  project-specific path conventions, and publication-readiness metadata.
- **Use Claude Code team:** no. This is a local SDLC sync and should not
  involve external-team runtime.
- **Claude Code process scope:** not applicable.
- **Claude Code external report:** not applicable.
- **Use Codex/GPT critic or verifier:** yes. Use one read-only Codex critic to
  check overwrite risk and minimum verification.
- **Dispatch plan:** main Orchestrator/Coder performs sync; read-only Codex
  critic reviews scope and risk.
- **Budget posture:** normal.
- **Skip reasons:** Claude Code skipped because it would add process overhead
  without improving this SDLC-only sync.

## Skills
- **Checked:** local memory, AGENTS.md, framework template navigation layer.
- **Matched:** none requiring external skill execution.
- **Used:** none.
- **Skipped:** frontend/browser/security skills; no product UI, runtime, or
  security implementation is in scope.

## Verification Plan
- **Canonical checks:** `bash -n scripts/bootstrap.sh`; `git diff --check`;
  placeholder scan; secret/token scan over synced files; `git check-ignore`
  visibility check for new navigation files; `git status --short --branch`.
- **Scoped fallback checks:** if full bootstrap would modify unexpected files,
  run syntax and static required-path inspection only.
- **Browser smoke:** not applicable.
- **Evidence expected:** command outputs summarized in
  `docs/reports/2026-06-18-choushop-sdlc-navigation-sync.md`.
- **Skipped checks:** product tests/build/lint skipped because no product code
  is in scope.

## Rollback / Recovery
Before commit, revert only the SDLC write-set changes from this Work Block. Do
not reset or clean the whole repository because product dirty files pre-exist
and are outside this scope.

## Execution Log
| Time | Stage | Action / Decision | Evidence | Status |
|---|---|---|---|---|
| 2026-06-18T09:09:58Z | Preflight | Confirmed safe cleanup/audit commit was pushed and framework source is clean at `6fa8327`. | `git log -1 --oneline`; `git status --short --branch` | done |
| 2026-06-18T09:09:58Z | Stage 0 | Created SDLC-only Work Block and write gate for navigation sync. | `.codex/write-gate.md`; this plan | done |
| 2026-06-18T09:18:00Z | Review | Read-only Codex critic returned `SUPPLEMENT`; findings required preserving `AGENTS.md`, adapting memory paths, and limiting commit scope. | subagent `019ed9ff-233d-7b50-adc0-109b686c4c7d`; `memory-bank/review-log.md` | done |
| 2026-06-18T09:22:00Z | Implementation | Added ChouShop-specific navigation files and updated WB template/bootstrap checks. | `PROJECT_MAP.md`, `FILE_REGISTRY.yml`, `docs/session-bootstrap.md`, `docs/templates/work-block-template.md`, `scripts/bootstrap.sh` | done |
| 2026-06-18T09:28:00Z | Verification | Ran syntax, whitespace, placeholder, memory-path, secret, ignore visibility, and path-limited status checks. | `docs/reports/2026-06-18-choushop-sdlc-navigation-sync.md` | done |

## Closeout and Retrospective
Complete this before the Work Block is considered closed. Keep this evidence
based: record what happened, not private reasoning or unsupported claims.

### Result Summary
- **Final Result:** navigation-control layer synced into ChouShop with
  project-specific map, registry, session bootstrap, Work Block template fields,
  and bootstrap required-path checks.
- **Verification Evidence:** `bash -n scripts/bootstrap.sh`; path-limited
  `git diff --check`; new-file whitespace check via `git diff --no-index
  --check`; placeholder scan; normative memory-path scan; secret/token scan;
  `git check-ignore -v`; path-limited `git status`.
- **Residual Risks:** large pre-existing product/backend/admin/schema/package
  dirty tree remains deferred and must not be staged with this SDLC sync.

### Critic and Review Value
- **Critic used:** yes, read-only Codex critic.
- **Critic verdict:** SUPPLEMENT.
- **What the critic caught:** blind copying would risk weakening ChouShop
  `AGENTS.md`, reintroducing the wrong memory-directory convention, missing
  bootstrap navigation coverage, and mixing SDLC sync with product dirty files.
- **What the critic missed:** nothing material discovered after verification.
- **Skip/fallback reason:** not applicable.

### Lessons Learned
- **What worked:** using framework templates as source material but adapting
  them to project authority and path conventions.
- **What did not work:** literal placeholder tokens in a verification report
  caused a false positive and were removed from the report wording.
- **What not to repeat:** do not run full bootstrap during a narrow sync when
  its generated `.agent/project-config.md` output is outside the write-set.
- **Evidence wording check:** this WB demonstrated the sync on ChouShop and used
  repeatable static checks for the synced files.
- **Framework updates made:** none to the base framework; this WB consumed the
  existing framework navigation layer.
- **Framework updates to consider:** add an explicit install note that project
  templates must adapt memory-directory conventions and authority files.
- **Reusable knowledge created:** ChouShop `PROJECT_MAP.md`,
  `FILE_REGISTRY.yml`, and `docs/session-bootstrap.md`.
- **Navigation updates:** added project map, file registry, session bootstrap,
  Work Block navigation-impact fields, and bootstrap checks.
- **Follow-up Work Blocks:** product dirty-tree split WBs remain deferred:
  Candy Cloud product flow, admin/auth/schema, dependency lockfile review.
