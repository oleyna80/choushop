# Global Instructions

`AGENTS.md` is the authoritative project contract. This file is a short
cross-agent compatibility entrypoint for assistants that look for `CLAUDE.md`.

## Project Specifics

- Project name: ChouShop / Mystery Box Store.
- Goal: France-first ecommerce MVP for premium-cute mystery boxes.
- Primary users: French storefront customers and internal admin users.
- Tech stack: Next.js App Router, TypeScript, Tailwind CSS, Prisma, Neon
  PostgreSQL, Stripe Checkout, Resend, Cloudinary, Zod.
- Key constraints: EUR only, TTC prices, Stripe Checkout only, server-side total
  recalculation, Stripe webhook as payment source of truth, consent-gated
  analytics.
- Environments: local WSL development and Vercel hosting.
- Testing commands: `npm run lint`, `npm run typecheck`, `npm run build`.
- Deployment notes: Vercel is the current hosting target. Deploys, production
  config, secrets, payments, and database changes require explicit approval.

## Communication

- State stage, objective, role, expected result, scope, actions, files changed,
  checks, risks, and next action.
- Ask clarifying questions before writing specs if intent is unclear.
- Keep responses concise and action-oriented.
- Use `memory-bank/` for durable context when write scope allows it.

## Agentic SDLC Rules (Framework v2)

This project uses the Agentic SDLC Framework. See `AGENTS.md` for the full contract.

**Enhanced agent roster:**
- Control Tower + Solution Architect + Critic + Scoped Coder + Reviewer + Verifier
- Agents: `.claude/agents/solution-architect.md`, `verifier.md`, `critic.md`
- Skills: `.claude/skills/` (34 skills) — also mirrored in `.agent/skills/`
- Hooks: `.claude/hooks/hard-stop.sh` (PreToolUse), `typecheck.sh` (PostToolUse)

**SDLC pattern:**
```
solution-architect → verifier (skill) → Plan mode → critic → Implement → verifier (agent)
```

**Key additions (v2):**
- Critic agent validates Control Tower decisions after Stage 0
- `memory_bank/orchestrator-log.md` — audit trail of decisions
- `memory_bank/review-log.md` — subagent result log
- `memory_bank/snapshots/` — context snapshots before parallel dispatch
- Merge protocol for consolidating parallel subagent results
- Templates in `docs/templates/`

**Memory bank (two directories):**
- `memory-bank/` (hyphen) — project content (git-tracked)
- `memory_bank/` (underscore) — session audit trail (local-only)

**Rules (from original):**
- Do not write production code without approved scope and a clear verification plan.
- Use one Coder for implementation stages.
- Keep Reviewer and Verifier stages read-only unless docs-only updates are explicitly approved.
- Update `memory-bank/activeContext.md` after significant accepted work.
- Do not commit secrets, private transcripts, local runtime logs, caches, or machine-specific tool state.
