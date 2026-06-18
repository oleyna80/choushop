# Work Block: Handoff Scope Audit Hardening

> Fill in before Stage 0 Preflight.

## Meta
- **Work Block ID:** wb-handoff-scope-audit-hardening
- **Date:** 2026-06-17
- **Owner:** azur
- **Execution Mode:** staged approval
- **Side-Effect Class:** local-docs | local-test
- **DB Action Mode:** none
- **Verification Tier:** standard

## Objective
Make the Codex -> handoff-runner -> Claude Code flow correctly distinguish
between expected Claude Code process files, runner-owned volatile state, ignored
build artifacts, and real scope violations.

## Expected Final Result
The Owner can launch a Claude Code handoff task that allows CC internal process
files and see the runner pass scope audit when only approved files change. The
runner still fails with `scope_failed` when CC changes a truly forbidden or
out-of-scope project file. The behavior is documented in the base
`agentic-sdlc-framework`, synchronized into `choushop`, covered by regression
tests, and recorded in the execution log.

## Done Criteria
- [x] Scope audit accepts explicitly allowed CC process files:
  `.agent/critic-gate.md`, `.agent/verification-gate.md`,
  `.claude/agent-memory/**`, `memory-bank/orchestrator-log.md`,
  `memory-bank/review-log.md`, and `memory-bank/external-team-log.md`.
- [x] Scope audit ignores runner-owned handoff volatile state and documented
  local build artifacts only where intended.
- [x] Scope audit still fails on a known forbidden path and a known
  out-of-scope path.
- [x] Framework and `choushop` copies of runner/docs/templates are synchronized
  or any intentional difference is documented.
- [x] Repo/runtime state is clean or documented, with unrelated dirty files left
  untouched.

## Preflight State
- **Git baseline:** dirty in both `agentic-sdlc-framework` and `choushop`; use
  `git status --short` before implementation and treat existing product/admin
  changes as unrelated.
- **Pre-existing dirty files:** broad SDLC/product/admin changes already exist
  in `choushop`; framework also has pending SDLC/handoff updates.
- **Untracked local artifacts:** Candy Cloud assets/product files and previous
  review reports are present in `choushop`; do not delete or stage them as part
  of this Work Block.
- **Proceed rule:** proceed only inside the explicit write-set below. If a file
  outside the write-set must change, stop and request Owner approval.

## Dependency Check
### Must Resolve Before Start
- Confirm current runner implementation in base framework and `choushop` before
  editing; do not assume the two copies are identical.
- Confirm current regression test names and whether they already cover ignored
  dot-directories.

### Can Resolve During Work
- Whether `.next/**` and `tsconfig.tsbuildinfo` should be globally ignored by
  scope audit or only documented as cleanup artifacts from verification.
- Whether the regression test should use a fake runner/fixture or invoke the
  real runner in a controlled temp Git repo.

## Runtime / Data Mutation Boundary
- **Applies:** no.
- **Agent authority:** approved code authoring only for local runner/test/docs.
- **Structured action:** not applicable.
- **Trusted executor:** not applicable.
- **Policy and approval:** no DB, payment, order, stock, deploy, secrets, or
  production data changes.
- **Audit path:** this Work Block document, `memory-bank/external-team-log.md`
  if Claude Code is used, and command output from regression checks.
- **Forbidden direct path:** raw SQL/manual row mutation/unrestricted provider
  API/direct agent tool call.

## Scope
### In Scope
- Base framework handoff runner scope-audit behavior.
- Base framework tests for handoff scope audit.
- Base framework handoff docs/templates that describe CC process scope.
- Synchronized `choushop` copies of the same runner/docs/templates.
- Process evidence in memory-bank logs only if needed.

### Out of Scope
- Product UI changes.
- Admin/auth/cart/order/payment/catalog backend changes.
- Prisma schema or migrations.
- Env/secrets/API key changes.
- Git commit/push unless explicitly requested after verification.
- Running real Claude Code unless a lightweight fake-runner regression is not
  enough and the Owner approves the API-cost path.

## Write-Set
```text
/home/azur/Projects/WSL/agentic-sdlc-framework/handoff/runner/handoff-runner.sh
/home/azur/Projects/WSL/agentic-sdlc-framework/scripts/test-handoff-scope-audit.sh
/home/azur/Projects/WSL/agentic-sdlc-framework/handoff/README.md
/home/azur/Projects/WSL/agentic-sdlc-framework/handoff/templates/claude-team-task-template.md
/home/azur/Projects/WSL/agentic-sdlc-framework/template/docs/templates/work-block-template.md
/home/azur/Projects/WSL/projects/choushop/handoff/runner/handoff-runner.sh
/home/azur/Projects/WSL/projects/choushop/handoff/README.md
/home/azur/Projects/WSL/projects/choushop/handoff/templates/claude-team-task-template.md
/home/azur/Projects/WSL/projects/choushop/docs/templates/work-block-template.md
/home/azur/Projects/WSL/projects/choushop/docs/plans/2026-06-17-handoff-scope-audit-hardening.md
```

## Commit / Stage Scope
- **Files to stage/commit:** only the verified files from the write-set, after
  Owner requests commit.
- **Files to leave unstaged:** pre-existing product/admin/backend files, local
  artifacts, generated output, secrets, env files.
- **Scope guard:** `git diff --name-only` and `git status --short` in both
  repositories before staging.

## Acceptance Criteria
- [x] A regression test demonstrates that allowed `.claude/agent-memory/**`
  changes pass scope audit.
- [x] A regression test demonstrates that allowed `.agent/critic-gate.md` and
  `memory-bank/review-log.md` changes pass scope audit.
- [x] A regression test demonstrates that an out-of-scope project file still
  returns `scope_failed`.
- [x] A regression test demonstrates that a forbidden path still returns
  `scope_failed`.
- [x] Documentation explains the three audit-trail layers:
  CC internal process files, external team log, and runner technical logs.

## Risks and Mitigations
| Risk | Impact | Mitigation | Stop Condition |
|---|---|---|---|
| Scope audit becomes too permissive | CC can hide real scope drift | Add positive and negative tests before accepting changes | Forbidden/out-of-scope test fails to fail |
| Dot-directory glob remains broken | `.claude/agent-memory/**` still false-fails | Add focused dotdir fixture | Cannot reproduce or fix without runner rewrite |
| Generated artifacts create noise | Good CC runs fail due to `.next`/tsbuildinfo | Decide between audit ignore and explicit cleanup policy | Ignoring artifacts would hide meaningful outputs |
| Dirty repo baseline confuses results | Unrelated changes get staged or blamed | Use path-scoped diffs and explicit write-set | Required edit outside write-set |

## Hard Stops in Scope
- [ ] Production deploy
- [ ] Live DB migration
- [ ] Credential rotation
- [ ] Destructive git ops
- [ ] Client communications
- [ ] Real Claude Code API run unless Owner approves cost/need

## Subagent Strategy
- **Classification:** Subagent-Required
- **Triggers matched:** runner safety logic, scope enforcement, regression
  testing, previous CC/Codex process discrepancy.
- **Use Claude Code team:** conditional; prefer not to use CC for the runner
  fix itself unless we need an external process review. If used, include CC
  process scope in allowed_scope.
- **Claude Code process scope:** include internal CC logs and memory only for
  any CC review task:
  `memory-bank/orchestrator-log.md`, `memory-bank/review-log.md`,
  `.agent/critic-gate.md`, `.agent/verification-gate.md`,
  `.claude/agent-memory/**`.
- **Claude Code external report:** `memory-bank/external-team-log.md` entry
  required if CC is invoked.
- **Use Codex/GPT critic or verifier:** yes; use a read-only critic pass after
  implementation to challenge the scope model and test coverage.
- **Dispatch plan:** Orchestrator defines scope -> Coder patches runner/tests ->
  Reviewer/Codex critic reviews negative-test coverage -> Verifier runs
  regression and syntax checks.
- **Budget posture:** constrained; use fake-runner/local tests first.
- **Skip reasons:** skip real CC if local regression covers the behavior.

## Skills
- **Checked:** none yet.
- **Matched:** none required for runner/docs shell work.
- **Used:** none yet.
- **Skipped:** frontend/browser skills are not relevant; no UI work.

## Verification Plan
- **Canonical checks:**
  - `bash -n handoff/runner/handoff-runner.sh`
  - `bash scripts/test-handoff-scope-audit.sh`
  - `git diff --check -- handoff/runner/handoff-runner.sh scripts/test-handoff-scope-audit.sh handoff/README.md handoff/templates/claude-team-task-template.md template/docs/templates/work-block-template.md`
- **Scoped fallback checks:** if the full script is blocked by environment,
  run the specific temp-repo fixture cases for allowed dotdir, forbidden path,
  and out-of-scope path.
- **Browser smoke:** not applicable.
- **Evidence expected:** command output, changed test assertions, runner result
  status examples, this Work Block execution log.
- **Skipped checks:** none expected; document any skipped real CC API run as
  cost-controlled and unnecessary if fake-runner tests pass.

## Rollback / Recovery
Revert only the files changed by this Work Block using a targeted patch or
restore from Git for the explicit write-set. Do not reset the repository or
touch unrelated dirty files.

## Execution Log
| Time | Stage | Action / Decision | Evidence | Status |
|---|---|---|---|---|
| 2026-06-17 | Spec | Created Work Block for handoff scope audit hardening | `docs/plans/2026-06-17-handoff-scope-audit-hardening.md` | complete |
| 2026-06-17 | Implementation | Expanded the base framework regression test to cover allowed CC process files, runner-owned handoff state, build artifacts, out-of-scope files, and forbidden files | `scripts/test-handoff-scope-audit.sh` | complete |
| 2026-06-17 | Implementation | Fixed a false `scope_failed` caused by changed directory parent entries in filesystem snapshots | `handoff/runner/handoff-runner.sh` skips directory rows in snapshots | complete |
| 2026-06-17 | Implementation | Added a narrow default ignore for `.next/**` and `tsconfig.tsbuildinfo`, with `HANDOFF_SCOPE_AUDIT_IGNORE_BUILD_ARTIFACTS=0` opt-out | `handoff/runner/handoff-runner.sh`, `handoff/README.md` | complete |
| 2026-06-17 | Sync | Synchronized the hardened runner behavior and documentation into `choushop` | `diff -u` between base and `choushop` runner returned no differences | complete |
| 2026-06-17 | Verification | Ran syntax, diff whitespace, and fake-runner scope audit regression checks | `bash -n`, `git diff --check`, `bash scripts/test-handoff-scope-audit.sh` | complete |
| 2026-06-17 | Review | Codex read-only critic found broad handoff state exclusion, build-artifact forbidden bypass, lost executable bit, and under-tested directory handling | critic pass `019ed58a-5171-71d2-a5d5-c5c2088330cf` | complete |
| 2026-06-17 | Fix | Narrowed runner-owned exclusions to current log/status/lock/runtime task dir, moved build-artifact ignore after forbidden checks, restored executable bit, and added regression cases | `handoff/runner/handoff-runner.sh`, `scripts/test-handoff-scope-audit.sh` | complete |
| 2026-06-17 | Verification | Ran publication validation after critic fixes | `scripts/validate-publication.sh` ended with `Publication validation OK` | complete |

## Closeout and Retrospective
Complete this before the Work Block is considered closed. Keep this evidence
based: record what happened, not private reasoning or unsupported claims.
Use `none` or `not applicable` when there is no real signal; do not invent
lessons to fill the form.

### Result Summary
- **Final Result:** complete. The runner now distinguishes explicitly allowed
  CC internal process files from runner-owned state and real project scope
  drift.
- **Verification Evidence:** `bash -n handoff/runner/handoff-runner.sh` passed
  in both repositories; `bash -n scripts/test-handoff-scope-audit.sh` passed;
  `bash scripts/test-handoff-scope-audit.sh` passed with `OK: handoff scope
  audit covers CC process files, out-of-scope files, and forbidden files`;
  path-scoped `git diff --check` passed in both repositories; base and
  `choushop` runner files match by `diff -u`; `scripts/validate-publication.sh`
  passed and directly executed the scope-audit script.
- **Residual Risks:** scope audit remains a post-run audit, not an OS sandbox.
  The build-artifact ignore is intentionally narrow and can be disabled with
  `HANDOFF_SCOPE_AUDIT_IGNORE_BUILD_ARTIFACTS=0`. Files already dirty before a
  run remain intentionally ignored to avoid blaming unrelated local work. Empty
  directory creation and touch-and-revert behavior are not detected.

### Critic and Review Value
- **Critic used:** Codex read-only explorer critic requested after
  implementation.
- **Critic verdict:** initial verdict was not acceptable for publication/test
  rollout; after fixes, the blocking findings were addressed and publication
  validation passed.
- **What the critic caught:** broad `handoff/*` exclusion hid control-plane
  tampering; build-artifact ignore ran before forbidden-scope checks; the test
  script lost executable mode; directory-parent behavior needed a focused
  nested-path regression.
- **What the critic missed:** no additional issue identified after the fix pass;
  real Claude Code live behavior remains intentionally untested in this Work
  Block.
- **Skip/fallback reason:** real Claude Code was not invoked; local fake-runner
  regression covered the runner behavior without API cost.

### Lessons Learned
- **What worked:** fake-runner regression was enough to reproduce and verify the
  scope-audit contract without invoking live Claude Code. The read-only critic
  pass materially improved the safety model before publication validation.
- **What did not work:** the first positive scenario failed because directory
  parent entries were treated as changed paths even when only allowed nested
  files changed. The first hardening pass also overcorrected by excluding too
  much `handoff/*` state.
- **What not to repeat:** do not rely on Git-visible status for local-first
  agent files; use filesystem snapshot coverage for `.agent/`, `.claude/`, and
  `memory-bank/`. Do not blanket-ignore control-plane directories.
- **Evidence wording check:** no private chain-of-thought, secrets, raw env, or
  unsupported claims were added.
- **Framework updates made:** runner scope audit, scope regression test,
  handoff README, Claude team task template, and Work Block template.
- **Framework updates to consider:** add a reusable fixture for scope-audit
  edge cases if more runners or watchers start sharing the same contract.
- **Reusable knowledge created:** CC process files are project audit files and
  must be explicitly allowed; runner-owned handoff state is dispatcher state and
  should be excluded from project scope audit.
- **Follow-up Work Blocks:** real-project live CC handoff smoke after this
  fake-runner contract remains stable.
