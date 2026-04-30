# Orchestrator Prompt Templates

## Purpose

These templates support the Agentic Development Lifecycle defined in `docs/agent-team-principles.md`. Replace bracketed placeholders before use. Unless a prompt explicitly says otherwise, planning, review, and verification are read-only.

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

## Project Orchestration Start

```text
Stage: Project Orchestration Start
Objective: define a docs-first plan for [project/task]
Role: Tech Lead / Planner
Expected result: subagent assignments, findings, consolidated plan, open decisions, stages, and risks

Context:
[brief business goal, current state, constraints, links to relevant docs]

Rules:
- Use a docs-first workflow before implementation.
- Do not change production code.
- Create or update project, design, or dev documentation only when explicitly in scope.
- The Orchestrator may launch read-only Codex subagents when their outputs materially improve the plan.
- Subagents must receive role, scope, out of scope, expected output, and file-change permission.
- Default subagent permission is read-only.

Required output:
- subagent assignments
- findings by source or role
- consolidated plan
- open decisions
- staged implementation plan
- risks
```

## Planning Swarm

Use these assignments as read-only prompts by default. Set `File changes allowed: no` unless the Owner has explicitly approved documentation changes.

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
- Use Figma MCP when a Figma URL is available.
- Use Claude Design output, screenshots, or written specs as fallback.
- Do not use write-capable Figma tools unless explicitly requested.

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
- Implement one approved stage only.
- Only one write-capable Coder may modify repository files.
- Do not perform hidden refactors.
- Do not expand scope silently.
- Keep the diff small and reviewable.
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
- severity
- file/line when applicable
- issue
- impact
- recommendation
```

## Fix Stage

```text
Stage: Fix Stage
Objective: apply approved fixes for review findings: [finding ids]
Role: Coder
Expected result: scoped fixes mapped to review findings

Rules:
- One Coder only.
- Each fix must map to a review finding.
- Do not add unrelated refactors.
- Do not fix suggestions unless approved.
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
- Stop if secrets, credentials, generated artifacts, build outputs, or unrelated production changes are present.

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
