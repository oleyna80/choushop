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

**Dual-model QC (CC-native, MCP-backed):**

```
Stage 0.5: critic (Claude) ──→ gpt-critic (GPT via MCP)   ──→ merge
Stage 2:   verifier (Claude) ──→ gpt-verifier (GPT via MCP) ──→ merge
Optional:  codex-reviewer (GPT via MCP) for explicit extra deep-review slices
```

GPT agents launch automatically when: Full tier, first WB in new domain, or
Claude critic returns non-approve. GPT output is advisory — Claude agents remain
the authoritative gates. Codex MCP unavailable → log gap, proceed.

Canonical Codex path: `.mcp.json` starts `codex mcp-server`; agents call the
`mcp__codex__codex` tool. Direct `Bash(codex *)` calls are intentionally not an
approved path because they bypass the read-only reviewer/verifier contract.

Default mode is read-only/advisory. Write-capable Codex work requires explicit
Owner approval for a Coder scope, write-set, side-effect class, and verification
plan. Every GPT/Codex run must record mode, scope, base/ref when known, Codex
session id, findings, inspection gaps, and merge recommendation.

Cost budget: ~300K GPT tokens max per Full-tier WB. Setup: Codex CLI + login + `.mcp.json` + `.codex/config.toml`.
Learnings: `framework/lessons-learned.md` (Agentic SDLC Framework repo).

**Solution-architect triggers** — must run BEFORE Plan mode when:
- New service layer (new file in `src/server/services/` or `src/lib/`)
- New DB model or schema change
- New API surface (new route, new endpoint)
- New subagent topology (agent combination not used before)
- Cross-cutting concern (auth, logging, error handling)
Skip only if domain already covered in prior WB.

**Critic enforcement:** Mandatory when triggers active (3+ files, DB writes, new topology, security/auth). Skip requires Owner approval in orchestrator-log.

**Verifier mode:** See `.agent/workflows/sdd-protocol.md` Verifier Mode Decision Table.

**Key additions (v2):**
- Critic agent validates Control Tower decisions after Stage 0
- `memory-bank/orchestrator-log.md` — audit trail of decisions
- `memory-bank/review-log.md` — subagent result log
- `memory-bank/snapshots/` — context snapshots before parallel dispatch
- Merge protocol for consolidating parallel subagent results
- Templates in `docs/templates/`

**Memory bank:** `memory-bank/` (hyphen) — project content + session audit trail (git-tracked)

**Rules (from original):**
- Do not write production code without approved scope and a clear verification plan.
- Use one Coder for implementation stages.
- Keep Reviewer and Verifier stages read-only unless docs-only updates are explicitly approved.
- Update `memory-bank/activeContext.md` after significant accepted work.
- Do not commit secrets, private transcripts, local runtime logs, caches, or machine-specific tool state.
