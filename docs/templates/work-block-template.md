# Work Block Template

> Fill in before Stage 0 Preflight.

## Meta
- **Work Block ID:** [wb-xxx]
- **Date:** [YYYY-MM-DD]
- **Owner:** [name]
- **Execution Mode:** [end-to-end autonomous | staged approval | read-only review | advisory]
- **Side-Effect Class:** [read-only | local-docs | production-code | local-test | public-repo | live-infra | live-data | client-facing | destructive]
- **DB Action Mode:** [none | local_temp | live_readonly | live_migration_apply | runtime_app | emergency_remediation]
- **Verification Tier:** [lite | standard | full]

## Objective
[What user or technical outcome does this Work Block produce?]

## Expected Final Result
[What exact end state should be true when this Work Block is complete? Write it
as the target state the Owner can recognize. Include user-visible result,
published/deployed state if relevant, verification evidence, docs/logs updated,
and what must be left clean.]

## Done Criteria
- [ ] [Measurable completion condition 1]
- [ ] [Measurable completion condition 2]
- [ ] [Repo/runtime state is clean or documented]

## Preflight State
- **Git baseline:** [clean | dirty; command and summary]
- **Pre-existing dirty files:** [none | list files and owner/status]
- **Untracked local artifacts:** [none | list ignored/untracked artifacts]
- **Proceed rule:** [why this Work Block can proceed without touching unrelated
  changes, or what must be resolved first]

## Dependency Check
### Must Resolve Before Start
- [Dependency, permission, credential, access, design, or decision required
  before implementation starts]

### Can Resolve During Work
- [Non-blocking uncertainty the Orchestrator may solve without pausing unless
  it hits a Hard Stop]

## Runtime / Data Mutation Boundary
- **Applies:** [yes | no; required for DB, payment, order, stock, CRM, live
  service, or production data changes]
- **Agent authority:** [planner/draft/read-only only | approved code authoring
  only | not applicable]
- **Structured action:** [ActionSpec/resource/operation/scope/risk, or not
  applicable]
- **Trusted executor:** [backend service/API/repository/job that performs the
  mutation, or not applicable]
- **Policy and approval:** [deny/read-only/requires approval/execute rules]
- **Audit path:** [where proposed action, policy decision, approval, executor,
  and result are logged]
- **Forbidden direct path:** [raw SQL/manual row mutation/unrestricted provider
  API/direct agent tool call, or not applicable]

## Scope
### In Scope
- [Item 1]

### Out of Scope
- [Item 1]

## Write-Set
```
[Approved files/directories]
```

## Commit / Stage Scope
- **Files to stage/commit:** [explicit list or pathspec]
- **Files to leave unstaged:** [pre-existing dirty files, local artifacts,
  generated output, secrets]
- **Scope guard:** [command/check used before staging, for example
  `git diff --name-only` and `git status --short`]

## Acceptance Criteria
- [ ] [AC 1]
- [ ] [AC 2]

## Risks and Mitigations
| Risk | Impact | Mitigation | Stop Condition |
|---|---|---|---|
| [Risk] | [Impact] | [Mitigation] | [When to stop and ask Owner] |

## Hard Stops in Scope
- [ ] Production deploy
- [ ] Live DB migration
- [ ] Credential rotation
- [ ] Destructive git ops
- [ ] Client communications

## Subagent Strategy
- **Classification:** [Subagent-Required | Single-Agent]
- **Triggers matched:** [list]
- **Use Claude Code team:** [yes | no | conditional; why]
- **Claude Code process scope:** [not applicable | include internal CC logs and
  memory in write-set/allowed_scope: `memory-bank/orchestrator-log.md`,
  `memory-bank/review-log.md`, `.agent/critic-gate.md`,
  `.agent/verification-gate.md`, `.claude/agent-memory/**`]
- **Claude Code external report:** [not applicable |
  `memory-bank/external-team-log.md` entry required]
- **Use Codex/GPT critic or verifier:** [yes | no | conditional; why]
- **Dispatch plan:** [agents, order, parallel groups]
- **Budget posture:** [normal | cheap CC/DeepSeek OK | constrained]
- **Skip reasons:** [only if any expected agent/critic/verifier is skipped]

## Skills
- **Checked:** [list]
- **Matched:** [list]
- **Used:** [list]
- **Skipped:** [list with reasons]

## Verification Plan
- **Canonical checks:** [exact commands expected for this repository and
  Verification Tier]
- **Scoped fallback checks:** [acceptable narrower checks if canonical checks
  are blocked or disproportionate]
- **Browser smoke:** [required pages/flows/screenshots for frontend work, or
  not applicable]
- **Evidence expected:** [logs, screenshots, command output, reports, result
  files]
- **Skipped checks:** [none | checks skipped with reason and residual risk]

## Rollback / Recovery
[How to undo if this goes wrong?]

## Execution Log
| Time | Stage | Action / Decision | Evidence | Status |
|---|---|---|---|---|
| [time] | [stage] | [what happened] | [command, file, review, or artifact] | [status] |

## Closeout and Retrospective
Complete this before the Work Block is considered closed. Keep this evidence
based: record what happened, not private reasoning or unsupported claims.
Use `none` or `not applicable` when there is no real signal; do not invent
lessons to fill the form.

### Result Summary
- **Final Result:** [actual end state compared with Expected Final Result]
- **Verification Evidence:** [commands, logs, reports, artifacts]
- **Residual Risks:** [known gaps, deferred checks, assumptions]

### Critic and Review Value
- **Critic used:** [yes | no | fallback; agent/model if relevant]
- **Critic verdict:** [APPROVE | SUPPLEMENT | RECONSIDER | SKIPPED]
- **What the critic caught:** [specific useful findings, or "nothing material"]
- **What the critic missed:** [only if discovered later]
- **Skip/fallback reason:** [required if critic was skipped or unavailable]

### Lessons Learned
- **What worked:** [process/tooling/agent behavior worth preserving]
- **What did not work:** [friction, missed context, weak gate, slow step]
- **What not to repeat:** [concrete mistake or weak pattern to avoid]
- **Evidence wording check:** [use "demonstrated" for one run, "validated"
  for repeatable scripted checks; avoid "proved/guaranteed" unless
  mathematically or formally justified]
- **Framework updates made:** [template, hook, skill, doc, runner, memory]
- **Framework updates to consider:** [future improvements not done in this WB]
- **Reusable knowledge created:** [skill, checklist, report, memory entry, none
  / not applicable]
- **Follow-up Work Blocks:** [links or IDs]
