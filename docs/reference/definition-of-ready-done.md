# Definition Of Ready And Done

Status: ChouShop local baseline

## Definition Of Ready

A Coder may start only when:

- objective is clear;
- approved scope and write-set are defined;
- out of scope is explicit when relevant;
- acceptance criteria are testable;
- required docs/spec/plan/tasklist exist or the Owner approved skipping them;
- dependencies, config, schema, deploy, payment, and destructive-operation needs
  are known or explicitly out of scope;
- verification plan is defined;
- `git status --short` was checked;
- unrelated dirty files are not at risk.

If these are not true, the Orchestrator should stop and ask for clarification or
approval.

## Definition Of Done

A task is done only when:

- implementation matches approved scope;
- no hidden refactors or adjacent features were added;
- required checks passed or skips are justified;
- changed files are listed;
- secrets/risky files were reviewed when relevant;
- `memory-bank/` and docs are updated when write scope allows it;
- residual risks are explicit;
- next action is clear;
- Verifier verdict is `accept` or `accept with follow-up`.

## Verifier Must Say `do not accept yet` When

- required checks failed or were not run without a strong reason;
- implementation changed out-of-scope behavior;
- acceptance criteria are ambiguous or unmet;
- DB/schema/auth/payment/deploy evidence is missing for high-risk changes;
- secrets or risky files may have been introduced;
- unrelated dirty files make the diff impossible to trust.
