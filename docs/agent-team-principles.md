# Agent Team Principles

## 1. Purpose

This document defines how AI agents collaborate on this project. It treats Codex, Claude Code, Claude Design, Figma-supported agents, and any future AI assistants as a small engineering team with explicit roles, scoped handoffs, review rules, and decision boundaries.

The goal is not to add ceremony. The goal is to keep work understandable, reviewable, reversible, and aligned with the product constraints of the Mystery Box Store.

## 2. Roles

### Owner

The Owner defines business intent, priorities, acceptance criteria, and approval boundaries. The Owner makes product decisions, accepts tradeoffs, and approves risky or irreversible changes.

### Tech Lead / Planner

The Tech Lead / Planner breaks work into stages, identifies dependencies and risks, proposes implementation approaches, and decides which role should handle each stage. This role is read-only unless an explicit implementation stage is approved.

### Coder

The Coder makes scoped changes only. The Coder must follow the approved task frame, keep diffs small, avoid unrelated refactors, and document any deviation before continuing.

### Reviewer

The Reviewer performs read-only review. The Reviewer checks correctness, security, architecture, regressions, developer experience, and user experience when relevant. The Reviewer does not edit code.

### Verifier

The Verifier checks whether the completed work satisfies the stated objective and acceptance criteria. The Verifier runs or reviews checks, confirms changed files, documents remaining risks, and states the next action.

### Designer / Design Analyst

The Designer / Design Analyst handles UI and design interpretation. This role reviews `docs/design`, uses Figma MCP when available, may use Claude Design or screenshots as fallback, and produces implementation briefs before UI code changes.

## 3. Swarm Workflow

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
- Subagents must be explicitly requested.
- Each subagent must have a role, scope, and expected output.
- Most swarms should be read-only.
- Only one write-capable agent may modify repository files during implementation.
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

## 4. Agentic Development Lifecycle

Use this lifecycle for non-trivial work. The main Codex session acts as Orchestrator and owns flow control, subagent assignments, consolidation, approval gates, and final handoff clarity.

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

Discovery defines the business goal, target users, constraints, risks, and success criteria before implementation. Discovery is read-only and must not change code.

### 2. Documentation First

Before implementation, create or update the project documents needed to make the work explicit:

- `docs/project/overview.md`
- `docs/project/requirements.md`
- `docs/project/architecture.md`
- `docs/project/task-breakdown.md`
- `docs/project/decision-log.md`
- `docs/project/risks.md`
- `docs/project/definition-of-done.md`
- `docs/design/workflow.md` when UI or design work is involved
- `docs/dev/workflow.md` when Git, deployment, or process work is involved

### 3. Planning Swarm

The Orchestrator may launch read-only Codex subagents for planning when the work is large enough to benefit from parallel analysis.

Allowed planning subagent roles:

- Product Analyst
- Architecture Analyst
- Frontend Analyst
- Backend Analyst
- Design Analyst
- Security Analyst
- QA Analyst
- Docs Analyst

Each subagent assignment must include:

- role
- scope
- out of scope
- expected output
- whether file changes are allowed

Default: no file changes.

### 4. Consolidation

After planning, the Orchestrator must:

- summarize each subagent separately
- remove duplicates
- identify contradictions
- list open decisions
- recommend a staged implementation plan

### 5. Approval Gate

Owner approval is required before:

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

### 8. Fix Stage

Only one Coder may apply fixes. Each fix must map to a specific review finding or explicitly approved follow-up.

### 9. Verification

The Verifier checks that:

- objective is met
- acceptance criteria are met
- checks were run or skipped with a reason
- changed files are listed
- risks are documented
- next action is clear

### 10. Documentation Update

After significant changes, update the relevant project documentation:

- `docs/project/decision-log.md`
- `docs/project/task-breakdown.md`
- `docs/project/risks.md`
- relevant design or dev docs

### 11. Commit Gate

Do not commit or push unless the Owner explicitly requests it.

## 5. Decision Types

Use one of four decision types when asking for or recording a decision:

- `approve`: permission to proceed with a proposed plan, implementation, migration, release, or risky action.
- `choose`: selection between valid alternatives with different tradeoffs.
- `unblock`: resolution of a blocker that prevents the current stage from continuing.
- `inform`: context shared for awareness, with no immediate decision required.

## 6. Task Framing

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

## 7. Scope Control

Every "yes" implies a "no". Approving one stage does not approve adjacent cleanup, redesign, new features, dependency changes, or architecture changes.

Agents must not expand scope silently. If useful adjacent work is discovered, report it as a separate recommendation or next stage.

If a task is too large to review safely, split it into stages before implementation. Each stage should have one objective and one expected result.

## 8. Small Change Policy

Prefer small diffs. A stage should contain one logical change unless the Owner explicitly approves a larger batch.

Avoid large rewrites unless explicitly approved. Rewrites require a clear reason, migration or rollback plan when relevant, and review before merge or release.

Documentation, tests, and implementation may be changed together only when they support the same logical change.

## 9. Problem Reporting Rule

When reporting a problem, agents must provide:

- problem
- option A
- option B
- tradeoffs
- recommendation

The recommendation should explain why it fits the project constraints, not just which option is preferred.

## 10. Reliability and Observability

For backend or API changes, the Definition of Done must include:

- validation at API and server boundaries
- error handling for expected failure modes
- safe logging that avoids secrets, personal data, payment data, and sensitive operational details
- monitoring or observability notes, including events, logs, metrics, or alerts when relevant
- rollback considerations

Commerce-critical paths need extra care. Checkout totals, stock, payment status, order state, and fulfillment state must remain server-authoritative and auditable.

## 11. Handoff Rules

Each agent handoff must include:

- what was done
- changed files
- what was checked
- remaining risks
- next action

Handoffs should be specific enough that the next agent can continue without rediscovering the whole context.

## 12. Review Rules

Reviewers should check:

- correctness
- security
- architecture
- regressions
- developer experience
- user experience when relevant

Review findings should be ordered by severity. Each finding should include the affected file or behavior, the risk, and the recommended fix.

Risky changes should not rely on self-review only. Payment, checkout, order, stock, authentication, authorization, secrets, migrations, and production configuration changes require independent review.

## 13. Migration Rules

Any migration must define:

- old system
- new system
- coexistence plan
- cutover plan
- rollback plan
- completion criteria

Migrations must be staged when possible. The project should avoid big-bang cutovers unless explicitly approved and justified.

## 14. Design Workflow Rules

For UI and design work:

- check `docs/design` first
- use Figma MCP when available
- use Claude Design or screenshots as fallback when Figma MCP is unavailable
- do not use write-capable Figma tools unless explicitly requested
- create an implementation brief before changing UI code

Agents must not invent design tokens if Figma variables or documented project tokens already exist.

## 15. Anti-Patterns

The following are prohibited:

- vague "improve everything" tasks
- hidden scope expansion
- huge unreviewable diffs
- undocumented hotfixes
- self-review only for risky changes
- changing config or secrets without approval

When an anti-pattern appears in a request or plan, the agent should restate the work as a smaller, reviewable stage before proceeding.

## 16. Definition of Done

A task is done only when:

- implementation is complete
- checks are run, or explicitly skipped with a reason
- changed files are listed
- risks are documented
- next action is clear

If the task is documentation-only, "implementation" means the requested documentation changes are complete and no production code was modified.
