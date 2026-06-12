# Repository Hygiene Policy

Status: ChouShop local baseline

## Principle

ChouShop is developed from multiple workstations and published as a
portfolio-safe project codebase.

GitHub should contain only:

- project source code;
- sanitized public README or portfolio docs;
- synchronized agent workflow docs needed for project continuity;
- CI/build files explicitly needed for the public repository.

GitHub must not contain secrets, raw private transcripts, local runtime logs,
caches, customer data, or machine-specific tool state.

## Synchronized Agent Artifacts

Track these through Git by default so the project can continue across machines:

- `AGENTS.md`
- `CLAUDE.md`
- `.agent/`
- `docs/agent-team-principles.md`
- `docs/dev/`
- `docs/reference/`
- `docs/prd/`
- `docs/specs/`
- `docs/plans/`
- `docs/tasklist/`
- `docs/reports/`
- `memory-bank/`

Keep local-only only when a file contains secrets, raw private transcripts,
local runtime logs, caches, customer data, or machine-specific state.

Before publishing the repository, use
`docs/public/PORTFOLIO_README_CHECKLIST.md` to separate public portfolio
material from private local-only artifacts.

## Already Tracked Files

`.gitignore` does not untrack files already in git.

When a private local-only file is already tracked, stop and ask for approval to
run:

```bash
git rm --cached <path>
```

The file remains on disk and stops being included in future commits. Do not use
this for synchronized workflow docs.

## Legacy Docs Decision Needed

The repository currently has legacy `agents/` and `workflows/` docs. Do not move,
ignore, or untrack them without explicit Owner approval.

First decide whether they are:

- public domain documentation useful for portfolio review; or
- synchronized internal workflow documentation needed for multi-workstation
  continuity.

## Secrets And Artifacts

Never commit `.env`, real credentials, private keys, tokens, customer data,
raw provider payloads, Stripe payloads, build output, dependency directories, or
generated runtime artifacts.
