# ChouShop SDLC Navigation Sync Report

## Summary

Work Block: `wb-choushop-sdlc-navigation-sync`

Source framework commit: `6fa8327 Add framework navigation control layer`

Result: navigation-control files were synced into ChouShop as project-specific
SDLC metadata. The sync preserved `AGENTS.md` as the top project authority,
kept the `memory-bank/` convention, and avoided product/backend/admin/schema
and package dirty files.

## Files Changed

- `.codex/write-gate.md`
- `docs/plans/2026-06-18-choushop-sdlc-navigation-sync.md`
- `docs/reports/2026-06-18-choushop-sdlc-navigation-sync.md`
- `memory-bank/activeContext.md`
- `memory-bank/orchestrator-log.md`
- `memory-bank/review-log.md`
- `PROJECT_MAP.md`
- `FILE_REGISTRY.yml`
- `docs/session-bootstrap.md`
- `docs/templates/work-block-template.md`
- `scripts/bootstrap.sh`

## Critic Result

Verdict: `SUPPLEMENT`

The read-only Codex critic confirmed that the sync is valid only if it is
adapted rather than copied blindly.

Key findings addressed:

- Preserve ChouShop `AGENTS.md` and its commerce, approval, design, and runtime
  mutation boundaries.
- Adapt framework `memory_bank/` references to ChouShop `memory-bank/`.
- Add bootstrap checks for `PROJECT_MAP.md`, `FILE_REGISTRY.yml`, and
  `docs/session-bootstrap.md`.
- Import the `Navigation Impact` Work Block fields.
- Keep unrelated product/backend/admin/schema/package dirty files out of scope.

## Verification Evidence

Passed:

- `bash -n scripts/bootstrap.sh`
- path-limited `git diff --check` for modified tracked SDLC files
- new-file whitespace check via `git diff --no-index --check`
- framework placeholder scan for unresolved template tokens
- normative navigation-doc scan for unintended underscore memory-directory
  references
- secret/token scan over synced files
- `git check-ignore -v PROJECT_MAP.md FILE_REGISTRY.yml
  docs/session-bootstrap.md docs/templates/work-block-template.md
  scripts/bootstrap.sh` returned no ignored paths
- `rg -n "PROJECT_MAP.md|FILE_REGISTRY.yml|docs/session-bootstrap.md"
  scripts/bootstrap.sh` confirmed bootstrap coverage
- path-limited `git status --short` showed only approved SDLC sync files

Skipped:

- Full `scripts/bootstrap.sh`, because it writes `.agent/project-config.md` and
  that generated file is outside this Work Block write-set.
- Product typecheck/lint/build/browser checks, because no product code changed
  in this Work Block.

## Residual Risks

- The repository still has a large pre-existing product/backend/admin/schema
  dirty tree. It remains deferred and must not be included in an SDLC sync
  commit.
- Full `scripts/bootstrap.sh` writes `.agent/project-config.md`; this Work
  Block should use `bash -n` unless the Owner approves including that generated
  file in scope.
