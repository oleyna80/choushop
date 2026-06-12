# Agent Team Principles

## 1. Purpose

This document defines how AI agents collaborate on this project. Codex is the primary coding and orchestration agent. Optional tools such as Claude Code, Claude Design, Figma MCP, and future assistants may be used when they are explicitly useful, but none of them are required for normal development.

The goal is not to add ceremony. The goal is to keep work understandable, reviewable, reversible, and aligned with the product constraints of the Mystery Box Store.

This document extends the existing project workflow. It does not replace `AGENTS.md`, skills, the memory bank, progress or roadmap documents, or the standard `Plan -> Spec -> Implementation -> Review -> Verification` process.

## 2. Roles

Execution roles are distinct from subagent specializations. The execution roles are Orchestrator, Coder, Reviewer, and Verifier. Specialized read-only subagents such as Product Analyst, Architecture Analyst, Frontend Analyst, Backend Analyst, Design Analyst, Security Analyst, QA Analyst, and Docs Analyst are allowed when the Orchestrator assigns them a scoped objective.

### Owner

The Owner defines business intent, priorities, acceptance criteria, and approval boundaries. The Owner makes product decisions, accepts tradeoffs, and approves risky or irreversible changes.

### Orchestrator

The Orchestrator coordinates the workflow, frames stages, assigns read-only subagents when useful, consolidates findings, resolves contradictions, asks for approvals, and keeps roles separate. The Orchestrator is read-only unless acting in an explicitly approved Coder stage.

### Tech Lead / Planner

Tech Lead / Planner is a planning function or specialization, not a separate execution role. It breaks work into stages, identifies dependencies and risks, proposes implementation approaches, and decides which execution role should handle each stage. This function is read-only unless an explicit implementation stage is approved.

### Coder

The Coder makes scoped changes only. The Coder must follow the approved task frame, keep diffs small, avoid unrelated refactors, and document any deviation before continuing.

### Reviewer

The Reviewer performs read-only review. The Reviewer checks correctness, security, architecture, regressions, developer experience, and user experience when relevant. The Reviewer does not edit code.

### Verifier

The Verifier checks whether the completed work satisfies the stated objective and acceptance criteria. The Verifier runs or reviews checks, confirms changed files, documents remaining risks, and states the next action.

### Designer / Design Analyst

The Designer / Design Analyst handles UI and design interpretation. This role reviews `docs/design`, may use Figma MCP, Claude Design output, screenshots, exported images, written design specs, or existing React implementation as design references, and produces implementation briefs before UI code changes. Detailed Figma and write-capable design tool rules live in `docs/design/workflow.md`.

## 3. Workflow Levels

The project supports these workflow paths.

| Task type | Workflow |
| --- | --- |
| Trivial task | Small Task Path |
| Small or normal task | Standard Workflow |
| Risky, multi-domain, architectural, security, design, migration, or production-impacting task | Agentic Workflow |
| Long Owner-approved plan | Autonomous Execution Mode |

Agentic Workflow extends the standard project workflow. It does not replace `AGENTS.md`, skills, memory-bank continuity, progress or roadmap tracking, or the standard plan/spec/review/verification process.

### Standard Workflow

For small and normal tasks, use the standard project workflow:

```txt
Plan -> Spec -> Implementation -> Review -> Verification
```

This is the default path for scoped work that is easy to reason about and does not need parallel analysis.

### Agentic Workflow

For non-trivial, risky, multi-domain, architectural, design, security, migration, or production-impacting work, use the Agentic Workflow:

```txt
Orchestrator -> read-only subagents -> consolidated plan -> approval gate -> single Coder -> review swarm -> verification
```

The Agentic Workflow extends the existing project system. It does not replace `AGENTS.md`, skills, memory-bank continuity, progress or roadmap tracking, or the standard plan/spec/review/verification process.

### Small Task Path

Trivial tasks do not require a full swarm or full Agentic Development Lifecycle. They still must follow scope control, git safety, secrets safety, and clear reporting of changed files, checks, and risks.

Examples:

- small text edits
- README or documentation typo fixes
- simple CSS tweaks
- obvious bugfixes
- minor copy updates

## 4. Swarm Workflow

A swarm is a controlled group of Codex subagents coordinated by the main Codex session. The main Codex session remains the Orchestrator and is accountable for scope, decision framing, consolidation, and final recommendations.

Use a swarm for:

- codebase exploration
- architecture planning
- UI/design review
- security review
- migration planning
- independent verification

Do not use a swarm for:

- trivial changes
- small text edits
- simple bugfixes
- cases where token cost or coordination noise exceeds the expected benefit

Swarm rules:

- Main Codex session is the Orchestrator.
- The Owner can explicitly request a swarm or subagents.
- In Orchestrator mode, the Orchestrator may assign read-only scoped subagents within the approved objective.
- If native subagent or fork workflow is limited or unavailable, the Orchestrator may use scoped explorer tasks as a fallback.
- Each subagent or scoped explorer task must define role, scope, out of scope, expected output, and whether file changes are allowed.
- Most swarms should be read-only.
- Read-only swarms must not update repository files, including memory-bank files. If project instructions require a memory-bank update, report that it is skipped because the phase is read-only and propose it for an approved documentation or fix stage.
- Only one write-capable agent may modify repository files during implementation.
- Write-capable subagents require explicit approved implementation scope.
- The Orchestrator must consolidate findings, remove duplicates, resolve contradictions, and recommend next actions.
- If subagent visibility is limited in VS Code, the Orchestrator must summarize each subagent's findings.

Recommended swarm sizes:

- 2-3 subagents for focused review.
- 3-5 subagents for larger planning.
- Avoid more than 5 subagents unless explicitly justified.

Standard swarm types:

- Research Swarm: explores separate areas of the codebase and reports relevant patterns, constraints, and risks.
- Planning Swarm: compares implementation approaches for a large change and produces a staged execution plan.
- Review Swarm: inspects a proposed change from correctness, architecture, regression, and developer experience angles.
- Verification Swarm: independently checks acceptance criteria, tests, documentation, and production safety.
- Design Swarm: reviews UI against `docs/design`, Figma context when available, screenshots, accessibility, and UX consistency.
- Security Swarm: inspects auth, secrets, payment boundaries, validation, logging, and data exposure risks.

Examples:

- Research Swarm: one subagent maps checkout services, one maps Prisma and order models, and one maps the Stripe webhook flow.
- Planning Swarm: one subagent proposes a migration sequence, one identifies compatibility constraints, and one checks rollback options.
- Review Swarm: one subagent reviews correctness, one reviews architecture, and one reviews regressions.
- Verification Swarm: one subagent checks tests, one checks documentation, and one checks changed files against scope.
- Design Swarm: one subagent compares Figma or screenshot references, one checks responsive layout, and one checks accessibility.
- Security Swarm: one subagent reviews API validation, one reviews secrets and config exposure, and one reviews payment and webhook safety.

## 5. Agentic Development Lifecycle

Use this lifecycle for non-trivial, risky, multi-domain, architectural, design, security, migration, or production-impacting work. Small and normal tasks should use the Standard Workflow or Small Task Path. The Agentic Development Lifecycle extends the existing project workflow; it does not replace the memory bank, progress tracking, roadmap, or standard plan/spec/review/verification process.

The main Codex session acts as Orchestrator and owns flow control, subagent assignments, consolidation, approval gates, and final handoff clarity.

Compact lifecycle diagram:

```txt
Discovery
  -> Documentation First
  -> Planning Swarm
  -> Consolidation
  -> Approval Gate
  -> Single Coder Implementation
  -> Review Swarm
  -> Fix Stage
  -> Verification
  -> Documentation Update
  -> Commit Gate
```

### 1. Discovery

Discovery defines the business goal, target users, constraints, risks, and success criteria before implementation. Discovery is read-only and must not change code or memory-bank files.

### 2. Documentation First

Documentation First is read-only by default. During read-only phases, inspect existing docs and identify needed documentation updates without changing files. Documentation changes are allowed only when documentation creation or update is inside the approved scope. If documentation changes are needed during a read-only phase, report them as the recommended next action.

When documentation changes are approved before implementation, create or update only the project documents needed to make the work explicit. Do not create empty `docs/project/*` files only to satisfy references.

Documentation sources:

- `memory-bank/*` is the active continuity and context system when present.
- progress and roadmap documents remain valid planning and status sources when present.
- `docs/project/*` files are optional formal project documents created during Project Bootstrap or when they are useful for a specific stage.
- `docs/design/workflow.md` is used when UI or design work is involved.
- `docs/dev/workflow.md` is optional unless the project needs a separate Git, deployment, or process workflow document.
- `docs/dev/orchestrator-prompts.md` is the current source for reusable orchestration prompt templates.

### 3. Planning Swarm

The Orchestrator may launch read-only Codex subagents for planning when the work is large enough to benefit from parallel analysis. If native subagent or fork workflow is limited or unavailable, scoped explorer tasks may be used as a fallback.

Allowed planning subagent roles:

- Product Analyst
- Architecture Analyst
- Frontend Analyst
- Backend Analyst
- Design Analyst
- Security Analyst
- QA Analyst
- Docs Analyst

Each subagent or explorer assignment must include:

- role
- scope
- out of scope
- expected output
- whether file changes are allowed

Default: no file changes. Read-only planning must not update memory-bank files; if a memory update is required by project instructions, report it as skipped and propose it for an approved documentation or fix stage.

### 4. Consolidation

After planning, the Orchestrator must:

- summarize each subagent separately
- remove duplicates
- identify contradictions
- list open decisions
- recommend a staged implementation plan

### 5. Approval Gate

Any repository file change requires approved scope. A separate Owner approval gate is required before:

- production code changes
- architecture changes
- database or schema changes
- dependency changes
- config changes
- secrets changes
- deploys
- payment, checkout, or order changes
- destructive operations
- write-capable Figma operations

### 6. Single Coder Implementation

Only one Coder may modify files during an implementation stage. Implementation must stay within the approved scope and must not include hidden refactors.

Before a Coder stage, check `git status`. Do not modify unrelated dirty files. Do not stage, commit, or push unless the Owner explicitly approves that action. Do not commit secrets, `.env` files, tokens, private keys, build artifacts, or `node_modules`. If risky files are detected, stop and report.

Destructive operations require explicit approval, including `git reset --hard`, `git clean`, force push, deleting files or directories, rewriting history, destructive database commands, reverting unknown user changes, and changing production configuration.

### 7. Review Swarm

After implementation, the Orchestrator may launch read-only reviewers:

- Code Reviewer
- Security Reviewer
- UX Reviewer
- QA Reviewer
- Docs Reviewer

Review findings must be ordered by severity:

- blocker
- major
- minor
- suggestion

Each review finding should include:

- finding id, for example `F-001`
- severity: blocker, major, minor, or suggestion
- owner stage
- fix required: yes/no
- affected file or behavior
- recommended fix

### 8. Fix Stage

Only one Coder may apply fixes. Each fix must map to one or more review finding IDs, or to an explicitly approved follow-up. Before a Fix Stage, check `git status`, avoid unrelated dirty files, and do not stage, commit, or push without Owner approval.

### 9. Verification

The Verifier checks that:

- objective is met
- acceptance criteria are met
- checks were run or skipped with a reason
- changed files are listed
- risks are documented
- next action is clear

### 10. Documentation Update

After significant changes, update the relevant project documentation or continuity files:

- memory-bank files when project instructions require it and the phase is write-approved
- progress or roadmap documents when feature status changes
- `docs/project/*` files when the project uses formal project docs for the current stage
- relevant design or dev docs

Read-only phases must not update documentation or memory files. They should report required updates as proposed follow-up work.

### 11. Commit Gate

Do not stage, commit, or push unless the Owner explicitly requests it.

Before any approved commit or push:

- check `git status`
- review the diff summary
- check staged files
- confirm no secrets, `.env` files, tokens, private keys, build artifacts, or `node_modules` are included
- propose or confirm the commit message

## 6. Autonomous Execution Mode

Autonomous Execution Mode allows the Orchestrator/Coder workflow to continue through an Owner-approved plan without requiring repeated Owner confirmation for every approved subtask. It is an execution mode inside an approved Agentic Development Lifecycle plan. It does not replace the lifecycle, approval gates, single-Coder rule, review, verification, or commit gate.

Autonomy is controlled by the approved scope. The agent may proceed through approved stages, but must stop when the work would exceed that scope or hit a defined stop condition.

### Preconditions

Autonomous Execution Mode can start only when:

- the Owner approved a specific plan
- scope is defined
- stages are listed
- out-of-scope items are listed
- verification rules are defined
- approval gates are defined
- rollback or stop conditions are defined when relevant
- baseline git status has been checked
- existing dirty files have been classified as approved context, unrelated, or blocker
- any dirty files that are not approved context have been explicitly accepted by the Owner

### Dirty-State Baseline

Before Autonomous Execution Mode starts:

- check `git status`
- classify existing dirty files as approved context, unrelated, or blocker
- proceed only when dirty files are approved context or explicitly accepted by the Owner
- stop if unrelated or blocker dirty files could be overwritten or confused with agent changes

### Allowed Autonomous Actions

Within approved scope, the agent may:

- execute approved stages in order
- create or update documentation related to the approved work
- modify code within approved files or scope
- run lint, build, and tests
- run read-only review or verification
- fix review findings that map directly to approved scope
- update progress or memory-bank files when allowed by the current stage
- prepare a commit summary

### Mandatory Stop Conditions

The agent must stop and ask for Owner approval if:

- a scope change is needed
- an architecture change is needed beyond the approved plan
- database, schema, or migration changes are needed and were not pre-approved
- a new dependency is needed and was not pre-approved
- config, secrets, or environment changes are needed
- deployment is needed
- payment, checkout, or order logic is affected unexpectedly
- a destructive operation is needed
- a write-capable Figma operation is needed
- tests or checks fail and the fix is not obvious and safe
- unrelated or blocker dirty files could be overwritten or confused with agent changes
- secrets or risky files are detected
- requirements are ambiguous
- verification fails

### Progress Reporting

During autonomous execution, after each stage the agent must record:

- stage completed
- files changed
- checks run
- review findings
- risks
- next stage

The agent does not need Owner approval between approved stages unless a stop condition is hit.

### Commit And Push

Commit and push remain approval-gated unless the approved plan explicitly includes commit or push permission. Preparing a commit summary is allowed within approved scope; staging, committing, and pushing are not allowed without explicit approval.

### Small Task Path Compatibility

Autonomous Execution Mode is not needed for trivial tasks. Use the Small Task Path for small text edits, minor copy updates, simple CSS tweaks, obvious bugfixes, and similarly low-risk work.

Small documentation-only tasks may use Autonomous Execution Mode as a workflow rehearsal only when the Owner explicitly approves the autonomous plan, scope, stages, stop conditions, and verification rules.

## 7. Decision Types

Use one of four decision types when asking for or recording a decision:

- `approve`: permission to proceed with a proposed plan, implementation, migration, release, or risky action.
- `choose`: selection between valid alternatives with different tradeoffs.
- `unblock`: resolution of a blocker that prevents the current stage from continuing.
- `inform`: context shared for awareness, with no immediate decision required.

## 8. Task Framing

Every task must define:

- Stage
- Objective
- Role
- Expected result
- Scope
- Out of scope
- Constraints
- Verification

If any of these are missing, the agent should infer conservatively when safe. If the missing detail affects risk, scope, or product behavior, the agent should ask for clarification before implementation.

## 9. Scope Control

Every "yes" implies a "no". Approving one stage does not approve adjacent cleanup, redesign, new features, dependency changes, or architecture changes.

Any repository file change requires approved scope.

Agents must not expand scope silently. If useful adjacent work is discovered, report it as a separate recommendation or next stage.

If a task is too large to review safely, split it into stages before implementation. Each stage should have one objective and one expected result.

## 10. Small Change Policy

Prefer small diffs. A stage should contain one logical change unless the Owner explicitly approves a larger batch.

Avoid large rewrites unless explicitly approved. Rewrites require a clear reason, migration or rollback plan when relevant, and review before merge or release.

Documentation, tests, and implementation may be changed together only when they support the same logical change.

## 11. Problem Reporting Rule

When reporting a problem, agents must provide:

- problem
- option A
- option B
- tradeoffs
- recommendation

The recommendation should explain why it fits the project constraints, not just which option is preferred.

## 12. Reliability and Observability

For backend or API changes, the Definition of Done must include:

- validation at API and server boundaries
- error handling for expected failure modes
- safe logging that avoids secrets, personal data, payment data, and sensitive operational details
- monitoring or observability notes, including events, logs, metrics, or alerts when relevant
- rollback considerations

Commerce-critical paths need extra care. Checkout totals, stock, payment status, order state, and fulfillment state must remain server-authoritative and auditable.

## 13. Handoff Rules

Each agent handoff must include:

- what was done
- changed files
- what was checked
- remaining risks
- next action

Handoffs should be specific enough that the next agent can continue without rediscovering the whole context.

## 14. Review Rules

Reviewers should check:

- correctness
- security
- architecture
- regressions
- developer experience
- user experience when relevant

Review findings should be ordered by severity. Each finding should include a stable finding id such as `F-001`, severity, owner stage, whether a fix is required, affected file or behavior, risk, and recommended fix. Fix stages must map each fix to one or more finding IDs.

Risky changes should not rely on self-review only. Payment, checkout, order, stock, authentication, authorization, secrets, migrations, and production configuration changes require independent review.

## 15. Migration Rules

Any migration must define:

- old system
- new system
- coexistence plan
- cutover plan
- rollback plan
- completion criteria

Migrations must be staged when possible. The project should avoid big-bang cutovers unless explicitly approved and justified.

## 16. Design Workflow Rules

For UI and design work:

- check `docs/design` first
- follow `docs/design/workflow.md` as the source of truth for detailed Figma and write-capable design tool rules
- use valid design references such as a Figma frame, Claude Design output, screenshot, exported image, written design spec, or existing React implementation
- use Figma MCP for read-only inspection when a Figma URL is provided and MCP is available
- treat Claude Design as optional, not required
- do not use write-capable Figma tools unless explicitly requested and approved
- create an implementation brief before changing UI code

Design references must be marked or treated as `draft`, `approved for implementation`, `implemented`, or `outdated`. Draft design references are not automatically approved for implementation. If status is unclear, ask the Owner before UI implementation.

Agents must not invent design tokens if Figma variables or documented project tokens already exist.

## 17. Anti-Patterns

The following are prohibited:

- vague "improve everything" tasks
- hidden scope expansion
- huge unreviewable diffs
- undocumented hotfixes
- self-review only for risky changes
- changing config or secrets without approval
- forcing a full swarm or full Agentic Lifecycle onto trivial tasks
- staging, committing, or pushing without Owner approval
- destructive operations without explicit approval
- using Autonomous Execution Mode without a specific Owner-approved plan, defined scope, listed stages, verification rules, and stop conditions

When an anti-pattern appears in a request or plan, the agent should restate the work as a smaller, reviewable stage before proceeding.

## 18. Definition of Done

A task is done only when:

- implementation is complete
- checks are run, or explicitly skipped with a reason
- changed files are listed
- risks are documented
- next action is clear

If the task is documentation-only, "implementation" means the requested documentation changes are complete and no production code was modified.

For read-only review or verification tasks, Definition of Done means:

- files inspected are listed
- no files were changed
- findings are ordered by severity
- assumptions or limitations are stated
- next action is clear
