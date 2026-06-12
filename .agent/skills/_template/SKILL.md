---
name: skill-name
description: Use this skill for a repeatable ChouShop workflow. Replace this description with specific triggers and scope.
---

# Skill: Skill Name

Use this skill when the task matches the description above.

## Read First

1. `AGENTS.md`
2. `memory-bank/activeContext.md`
3. `memory-bank/progress.md`
4. Relevant spec, plan, tasklist, design, workflow, or reference docs.

## Workflow

1. State stage, objective, role, and expected result.
2. Confirm scope and out of scope.
3. Load only the context needed for the task.
4. Execute the repeatable procedure.
5. Run or identify the matching verification checks.
6. Report changed files, checks, risks, and next action.

## Guardrails

- Stay inside approved scope.
- Do not change production code unless the current stage allows it.
- Do not change dependencies, config, secrets, database, payment, deploy, or
  external systems without explicit approval.
- Do not log or commit secrets, customer data, private notes, raw transcripts,
  local runtime logs, caches, or machine-specific state.
- For UI work, read `docs/design/workflow.md` before implementation.

## Validation

Choose checks from `docs/reference/verification-matrix.md`.

If a check is not run, report why.

## Closeout

Report:

- what was done;
- files changed;
- checks run or skipped;
- risks;
- next action.
