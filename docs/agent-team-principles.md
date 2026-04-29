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

## 3. Decision Types

Use one of four decision types when asking for or recording a decision:

- `approve`: permission to proceed with a proposed plan, implementation, migration, release, or risky action.
- `choose`: selection between valid alternatives with different tradeoffs.
- `unblock`: resolution of a blocker that prevents the current stage from continuing.
- `inform`: context shared for awareness, with no immediate decision required.

## 4. Task Framing

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

## 5. Scope Control

Every "yes" implies a "no". Approving one stage does not approve adjacent cleanup, redesign, new features, dependency changes, or architecture changes.

Agents must not expand scope silently. If useful adjacent work is discovered, report it as a separate recommendation or next stage.

If a task is too large to review safely, split it into stages before implementation. Each stage should have one objective and one expected result.

## 6. Small Change Policy

Prefer small diffs. A stage should contain one logical change unless the Owner explicitly approves a larger batch.

Avoid large rewrites unless explicitly approved. Rewrites require a clear reason, migration or rollback plan when relevant, and review before merge or release.

Documentation, tests, and implementation may be changed together only when they support the same logical change.

## 7. Problem Reporting Rule

When reporting a problem, agents must provide:

- problem
- option A
- option B
- tradeoffs
- recommendation

The recommendation should explain why it fits the project constraints, not just which option is preferred.

## 8. Reliability and Observability

For backend or API changes, the Definition of Done must include:

- validation at API and server boundaries
- error handling for expected failure modes
- safe logging that avoids secrets, personal data, payment data, and sensitive operational details
- monitoring or observability notes, including events, logs, metrics, or alerts when relevant
- rollback considerations

Commerce-critical paths need extra care. Checkout totals, stock, payment status, order state, and fulfillment state must remain server-authoritative and auditable.

## 9. Handoff Rules

Each agent handoff must include:

- what was done
- changed files
- what was checked
- remaining risks
- next action

Handoffs should be specific enough that the next agent can continue without rediscovering the whole context.

## 10. Review Rules

Reviewers should check:

- correctness
- security
- architecture
- regressions
- developer experience
- user experience when relevant

Review findings should be ordered by severity. Each finding should include the affected file or behavior, the risk, and the recommended fix.

Risky changes should not rely on self-review only. Payment, checkout, order, stock, authentication, authorization, secrets, migrations, and production configuration changes require independent review.

## 11. Migration Rules

Any migration must define:

- old system
- new system
- coexistence plan
- cutover plan
- rollback plan
- completion criteria

Migrations must be staged when possible. The project should avoid big-bang cutovers unless explicitly approved and justified.

## 12. Design Workflow Rules

For UI and design work:

- check `docs/design` first
- use Figma MCP when available
- use Claude Design or screenshots as fallback when Figma MCP is unavailable
- do not use write-capable Figma tools unless explicitly requested
- create an implementation brief before changing UI code

Agents must not invent design tokens if Figma variables or documented project tokens already exist.

## 13. Anti-Patterns

The following are prohibited:

- vague "improve everything" tasks
- hidden scope expansion
- huge unreviewable diffs
- undocumented hotfixes
- self-review only for risky changes
- changing config or secrets without approval

When an anti-pattern appears in a request or plan, the agent should restate the work as a smaller, reviewable stage before proceeding.

## 14. Definition of Done

A task is done only when:

- implementation is complete
- checks are run, or explicitly skipped with a reason
- changed files are listed
- risks are documented
- next action is clear

If the task is documentation-only, "implementation" means the requested documentation changes are complete and no production code was modified.
