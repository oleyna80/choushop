# Work Block Template

> Fill in before Stage 0 Preflight.

## Meta
- **Work Block ID:** [wb-xxx]
- **Date:** [YYYY-MM-DD]
- **Owner:** [name]
- **Side-Effect Class:** [read-only | local-docs | production-code | local-test | public-repo | live-infra | live-data | client-facing | destructive]
- **DB Action Mode:** [none | local_temp | live_readonly | live_migration_apply | runtime_app | emergency_remediation]
- **Verification Tier:** [lite | standard | full]

## Objective
[What user or technical outcome does this Work Block produce?]

## Scope
### In Scope
- [Item 1]

### Out of Scope
- [Item 1]

## Write-Set
```
[Approved files/directories]
```

## Acceptance Criteria
- [ ] [AC 1]
- [ ] [AC 2]

## Hard Stops in Scope
- [ ] Production deploy
- [ ] Live DB migration
- [ ] Credential rotation
- [ ] Destructive git ops
- [ ] Client communications

## Subagent Topology
- **Classification:** [Subagent-Required | Single-Agent]
- **Triggers matched:** [list]
- **Dispatch plan:** [agents, order, parallel groups]

## Skills
- **Checked:** [list]
- **Matched:** [list]
- **Used:** [list]
- **Skipped:** [list with reasons]

## Verification Plan
[How will the AC be verified? What evidence is expected?]

## Rollback / Recovery
[How to undo if this goes wrong?]
