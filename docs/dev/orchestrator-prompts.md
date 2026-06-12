# Orchestrator Prompt Templates

## Purpose

These templates support the workflow levels defined in `docs/agent-team-principles.md`. The Standard Workflow remains the default for small and normal tasks; the Agentic Development Lifecycle extends it for non-trivial, risky, multi-domain, architectural, design, security, migration, or production-impacting work. Autonomous Execution Mode may be used inside an Owner-approved Agentic Development Lifecycle plan. Replace bracketed placeholders before use. Unless a prompt explicitly says otherwise, planning, review, and verification are read-only and must not update repository files, including `memory-bank/*`.

## Common Task Envelope

```text
Stage: [stage]
Objective: [objective]
Role: [role]
Expected result: [expected result]
Scope: [in scope]
Out of scope: [out of scope]
Constraints: [constraints]
Verification: [checks or read-only validation]
```

## Workflow Selection

```text
Stage: Workflow Selection
Objective: choose the lightest workflow that can safely handle [task]
Role: Orchestrator
Expected result: selected workflow, scope, risks, and next stage

Rules:
- Use Standard Workflow for small and normal tasks: Plan -> Spec -> Implementation -> Review -> Verification.
- Use Small Task Path for trivial changes such as doc typos, minor copy updates, simple CSS tweaks, or obvious bugfixes.
- Use Agentic Workflow only for non-trivial, risky, multi-domain, architectural, design, security, migration, or production-impacting work.
- Agentic Workflow extends the existing project workflow. It does not replace `AGENTS.md`, skills, `memory-bank/*`, progress, roadmap, or the standard Plan -> Spec -> Review -> Verification process.
- Use Autonomous Execution Mode only inside a specific Owner-approved Agentic Workflow plan with defined scope, stages, verification rules, approval gates, and stop conditions.
- If this stage is read-only, do not update `memory-bank/*`; report any required memory update as a proposed action for an approved documentation or fix stage.

Required output:
- selected workflow
- reason for selection
- in scope
- out of scope
- approval needed before file changes
- next action
```

## Project Orchestration Start

```text
Stage: Project Orchestration Start
Objective: define a docs-first plan for [project/task]
Role: Orchestrator
Planning function: Tech Lead / Planner
Expected result: subagent assignments, findings, consolidated plan, open decisions, stages, and risks

Context:
[brief business goal, current state, constraints, links to relevant docs]

Rules:
- Tech Lead / Planner is a planning function, not an execution role; the execution role remains Orchestrator.
- Use a docs-first workflow before implementation when the task is non-trivial, risky, multi-domain, architectural, design, security, migration, or production-impacting.
- Do not create empty `docs/project/*` files only to satisfy a checklist.
- Treat `memory-bank/*` as the active continuity and context system when present.
- Treat progress and roadmap documents as valid planning/status sources when present.
- Treat `docs/project/*` as optional formal project docs created during Project Bootstrap only when useful.
- Treat `docs/dev/workflow.md` as optional unless the project needs a separate dev workflow document.
- Treat `docs/dev/orchestrator-prompts.md` as the current orchestration prompt source.
- Do not change production code.
- Create or update project, design, or dev documentation only when explicitly in scope.
- The Orchestrator may launch read-only Codex subagents within the approved objective when their outputs materially improve the plan.
- If native subagent or fork workflow is unavailable, use scoped explorer tasks as a fallback.
- Subagents must receive role, scope, out of scope, expected output, and file-change permission.
- Default subagent or explorer-task permission is read-only.
- Read-only stages must not update `memory-bank/*`; propose that update for an approved documentation or fix stage.

Required output:
- subagent assignments
- findings by source or role
- consolidated plan
- open decisions
- staged implementation plan
- risks
```

## Autonomous Execution Plan

```text
Stage: Autonomous Execution Plan
Objective: define safe autonomous execution for the Owner-approved plan: [plan name]
Role: Orchestrator
Expected result: approved autonomous execution boundaries, stage list, stop conditions, verification rules, and final report requirements

Goal:
[business or engineering goal]

Approved scope:
[files, modules, docs, workflows, or behaviors approved for change]

Out of scope:
[explicit exclusions]

Baseline dirty-state:
- run `git status`
- classify existing dirty files as approved context, unrelated, or blocker
- proceed only if dirty files are approved context or explicitly accepted by the Owner
- stop if unrelated or blocker dirty files could be overwritten or confused with agent changes

Stages:
1. [stage name, objective, expected result]
2. [stage name, objective, expected result]
3. [stage name, objective, expected result]

Allowed autonomous actions:
- execute approved stages in order
- create or update docs related to the approved work
- modify code within approved files or scope
- run lint, build, and tests
- run read-only review or verification
- fix review findings that map directly to approved scope
- update progress or memory-bank files when allowed by the current stage
- prepare a commit summary

Stop conditions:
- scope change is needed
- architecture change is needed beyond the approved plan
- database, schema, or migration changes are needed and were not pre-approved
- new dependency is needed and was not pre-approved
- config, secrets, or environment changes are needed
- deployment is needed
- payment, checkout, or order logic is affected unexpectedly
- destructive operation is needed
- write-capable Figma operation is needed
- tests or checks fail and the fix is not obvious and safe
- unrelated or blocker dirty files could be overwritten or confused with agent changes
- secrets or risky files are detected
- requirements are ambiguous
- verification fails

Verification after each stage:
- objective met
- files changed listed
- checks run or skipped with reason
- review findings summarized
- risks documented
- next stage stated

Final report requirements:
- stages completed
- files changed
- checks run
- review and verification findings
- deviations from plan
- risks
- commit summary
- next action

Rules:
- Do not ask for Owner confirmation between approved stages unless a stop condition is hit.
- Commit and push remain approval-gated unless the approved plan explicitly includes commit or push permission.
- Autonomous Execution Mode is not needed for trivial tasks.
- For a small documentation-only workflow rehearsal, use Autonomous Execution Mode only when the Owner explicitly approves the plan, scope, stages, stop conditions, and verification rules.
```

## Planning Swarm

Use these assignments as read-only prompts by default. The Orchestrator may assign them as native subagents or scoped explorer tasks within the approved objective. Set `File changes allowed: no` unless the Owner has explicitly approved documentation changes. Read-only planning must not update `memory-bank/*`.

### Product Analyst

```text
Stage: Planning Swarm
Objective: analyze product goal, users, acceptance criteria, and business constraints for [task]
Role: Product Analyst
Expected result: read-only product findings and open decisions
Scope: [product and business scope]
Out of scope: implementation, code edits, architecture decisions
File changes allowed: no

Output:
- user goal summary
- acceptance criteria
- business constraints
- open product decisions
- risks
```

### Architecture Analyst

```text
Stage: Planning Swarm
Objective: analyze architecture impact, system boundaries, dependencies, and data flow for [task]
Role: Architecture Analyst
Expected result: read-only architecture findings and risks
Scope: [architecture scope]
Out of scope: implementation, code edits, dependency changes, schema changes
File changes allowed: no

Output:
- relevant system boundaries
- affected modules and contracts
- dependency or schema concerns
- architecture risks
- recommended implementation stages
```

### Frontend Analyst

```text
Stage: Planning Swarm
Objective: analyze frontend routes, components, state, accessibility, and performance concerns for [task]
Role: Frontend Analyst
Expected result: read-only frontend findings and UI implementation risks
Scope: [frontend scope]
Out of scope: code edits, design token creation, backend changes
File changes allowed: no

Output:
- affected routes and components
- state and data loading concerns
- accessibility and responsive layout risks
- frontend checks to run
- open UI decisions
```

### Backend Analyst

```text
Stage: Planning Swarm
Objective: analyze backend API, service, repository, data, payment, and order-flow concerns for [task]
Role: Backend Analyst
Expected result: read-only backend findings and implementation risks
Scope: [backend scope]
Out of scope: code edits, schema changes, config changes, deploys
File changes allowed: no

Output:
- affected APIs, services, repositories, and events
- validation and error handling needs
- transaction and idempotency concerns
- observability and rollback notes
- backend checks to run
```

### Design Analyst

```text
Stage: Planning Swarm
Objective: analyze design workflow, references, UX consistency, and implementation brief needs for [task]
Role: Design Analyst
Expected result: read-only design findings and open UX decisions
Scope: [design and UI scope]
Out of scope: code edits, write-capable Figma operations, design token invention
File changes allowed: no

Rules:
- Check `docs/design` first.
- Follow `docs/design/workflow.md` as the source of truth for detailed design workflow and write-capable Figma rules.
- Valid design references include a Figma frame, Claude Design output, screenshot, exported image, written design spec, or existing React implementation.
- Use Figma MCP when a Figma URL is available.
- Use Claude Design output, screenshots, exported images, written specs, or existing React implementation as fallback references.
- Treat design references as `draft`, `approved for implementation`, `implemented`, or `outdated`; if status is unclear, ask the Owner before implementation.
- Do not use write-capable Figma tools unless explicitly requested and approved.

Output:
- design references checked
- UI states and UX risks
- missing design decisions
- implementation brief requirements
- recommended verification approach
```

### Security Analyst

```text
Stage: Planning Swarm
Objective: analyze security, privacy, secrets, trust boundaries, auth, payment, and webhook risks for [task]
Role: Security Analyst
Expected result: read-only security findings and risk controls
Scope: [security scope]
Out of scope: code edits, config changes, secret changes, deploys
File changes allowed: no

Output:
- trust boundaries
- secret and config risks
- auth, payment, and webhook risks
- validation and logging requirements
- blocker or approval requirements
```

### QA Analyst

```text
Stage: Planning Swarm
Objective: define test strategy, acceptance checks, edge cases, and regression risks for [task]
Role: QA Analyst
Expected result: read-only QA plan and verification risks
Scope: [QA scope]
Out of scope: code edits, test implementation unless separately approved
File changes allowed: no

Output:
- acceptance checks
- regression areas
- test levels and commands
- edge cases
- release risks
```

### Docs Analyst

```text
Stage: Planning Swarm
Objective: identify required documentation updates, stale references, and handoff notes for [task]
Role: Docs Analyst
Expected result: read-only documentation findings and update plan
Scope: [docs scope]
Out of scope: production code edits, undocumented process changes
File changes allowed: no

Output:
- docs to create or update
- stale or conflicting docs
- handoff notes needed
- decision log updates needed
- documentation risks
```

## Single Coder Implementation

```text
Stage: Single Coder Implementation
Objective: implement approved stage: [approved stage]
Role: Coder
Expected result: scoped implementation for one approved stage with changed files, checks, and risks

Approved scope:
[in scope]

Out of scope:
[out of scope]

Rules:
- Check git status before editing.
- Implement one approved stage only.
- Only one write-capable Coder may modify repository files.
- Any repository file change requires approved scope.
- Do not perform hidden refactors.
- Do not expand scope silently.
- Keep the diff small and reviewable.
- Do not modify unrelated dirty files.
- Do not stage, commit, or push unless the Owner explicitly approves.
- Do not commit secrets, `.env` files, tokens, keys, build artifacts, or `node_modules`.
- Destructive operations require explicit approval, including `git reset --hard`, `git clean`, force push, deleting files/directories, rewriting history, destructive database commands, reverting unknown user changes, and changing production config.
- Stop and report if blocked by scope, secrets, destructive operations, or missing approval.

Required output:
- changed files
- checks run or skipped with reason
- risks
```

## Review Swarm

```text
Stage: Review Swarm
Objective: review the completed implementation for [stage/task]
Role: Reviewer
Expected result: read-only findings ordered by severity

Scope:
[files, diff, feature, or docs to review]

Out of scope:
file changes, fixes, commits, pushes

Reviewer assignments:
- Code Reviewer: correctness, maintainability, architecture fit, regressions
- Security Reviewer: secrets, trust boundaries, auth, payments, data exposure
- UX Reviewer: usability, accessibility, copy, design consistency when UI is relevant
- QA Reviewer: acceptance criteria, test coverage, edge cases, regression risk
- Docs Reviewer: documentation accuracy, handoff quality, stale references

Order findings by:
1. blocker
2. major
3. minor
4. suggestion

Finding format:
- finding id, for example `F-001`
- severity: blocker, major, minor, or suggestion
- owner stage
- fix required: yes/no
- affected file or behavior
- issue
- impact
- recommended fix
```

## Fix Stage

```text
Stage: Fix Stage
Objective: apply approved fixes for review findings: [finding ids]
Role: Coder
Expected result: scoped fixes mapped to review findings

Rules:
- Check git status before editing.
- One Coder only.
- Each fix must map to one or more review finding IDs.
- Do not add unrelated refactors.
- Do not fix suggestions unless approved.
- Do not modify unrelated dirty files.
- Do not stage, commit, or push unless the Owner explicitly approves.
- Stop if a finding requires a product, architecture, config, dependency, schema, secret, deploy, or destructive decision.

Required output:
- findings addressed
- changed files
- checks run or skipped with reason
- remaining risks
```

## Verification Stage

```text
Stage: Verification Stage
Objective: verify [stage/task] against approved objective and acceptance criteria
Role: Verifier
Expected result: read-only verification report

Scope:
[files, checks, acceptance criteria]

Rules:
- Do not change files.
- Verify that the objective is met.
- Verify acceptance criteria.
- Confirm checks were run, or list checks skipped with reasons.
- Confirm changed files are listed.
- Confirm risks are documented.
- State the next action clearly.
- For read-only verification, list files inspected, confirm no files changed, order findings by severity, state assumptions/limitations, and make the next action clear.

Required output:
- files checked
- objective status
- acceptance criteria status
- checks run or skipped
- changed files
- risks
- next action
- final verdict: complete, incomplete, or needs adjustment
```

## Commit Gate

```text
Stage: Commit Gate
Objective: prepare commit readiness report for [stage/task]
Role: Verifier
Expected result: git readiness report and commit message proposal, without committing or pushing

Rules:
- Do not commit or push unless the Owner explicitly approves.
- Do not stage files unless explicitly requested.
- Check git status.
- Summarize the diff.
- Run or report a secrets check appropriate to the changed files.
- Propose a commit message.
- Stop if secrets, credentials, `.env` files, tokens, private keys, generated artifacts, build outputs, `node_modules`, or unrelated production changes are present.

Required output:
- git status
- diff summary
- secrets check result
- files proposed for commit
- files excluded
- commit message proposal
- risks
- approval needed before commit or push
```
