# Portfolio README Checklist

Status: ChouShop baseline

Use this checklist before publishing the repository or updating public GitHub
documentation.

## Publishable Content

The public repository may include:

- source code needed to run or review the project;
- tests and test fixtures that do not contain private data;
- public `README.md` with project purpose, stack, setup, checks, and current
  MVP status;
- sanitized files under `docs/public/`;
- synchronized agent workflow docs needed for project continuity;
- CI/build files that do not expose secrets.

## Synchronized Internal Docs

Track these through Git by default so work can continue across machines:

- `AGENTS.md`;
- `CLAUDE.md`;
- `.agent/`;
- `docs/agent-team-principles.md`;
- `docs/dev/`;
- `docs/reference/`;
- `memory-bank/`.

Keep local-only:

- raw prompts, private transcripts, agent logs, scratch files, and unredacted
  handoffs;
- real `.env` files, tokens, credentials, provider payloads, customer data,
  Stripe payloads, and local database dumps;
- raw Figma/design notes unless explicitly approved for publication.

## README Minimum

Public `README.md` should answer:

- what ChouShop does;
- who it is for;
- what is implemented now;
- main stack and architecture summary;
- how to run locally;
- how to run checks;
- MVP limitations and go-live blockers;
- deployment status, without exposing production config.

## Screenshots And Demo Data

Before publishing screenshots or demo data:

- remove tokens, emails, phone numbers, customer names, private URLs, and admin
  data;
- prefer synthetic demo products and orders;
- verify screenshots do not expose browser profiles, local paths, API keys,
  Stripe dashboard data, database URLs, or private dashboards;
- keep raw design references local unless explicitly approved.

## Git Hygiene

Before a public commit or publication pass:

1. Run `git status --short`.
2. Review tracked files with `git ls-files`.
3. Confirm `.gitignore` does not hide synchronized workflow docs.
4. Confirm `.gitignore` still covers secrets, caches, logs, local runtime
   artifacts, and machine-specific tool state.
5. If a synchronized doc is staged for deletion or ignored, stop and resolve
   before commit.
6. Re-run checks after cleanup.

## Release Note

For portfolio repositories, the public README may include:

```text
This repository contains project code, public documentation, and synchronized
workflow documentation. Secrets, private evidence, local logs, and
machine-specific state are intentionally excluded.
```
