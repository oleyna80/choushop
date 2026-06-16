# .agent/ROSTER.md — Agent Routing Roster

> Maps agent roles to their slugs, skills, and routing priorities.
> Update when adding new agents or skills.

---

## Core Agent Roster

| Agent | Slug | Role | Skills |
|---|---|---|---|
| Control Tower | `choushop-control-tower` | Orchestration, planning, task slicing, SSOT | task-decomposition, ssot-sync-closeout, memory-bank-manager, subagent-mission-brief |
| Solution Architect | `choushop-solution-architect` | Pre-implementation research (read-only) | architecture-discovery, technical-discovery, project-estimation |
| Critic | `choushop-critic` | Independent review of Control Tower decisions, Stage 0→1 gate (read-only) | critic-review |
| GPT Critic | `choushop-gpt-critic` | External adversarial review of decisions (GPT model family, read-only) | codex-verification, critic-review |
| Scoped Coder | `choushop-scoped-coder` | Approved-scope implementation only | scoped-coder, scoped-commit-guard, shell-context-guard |
| Reviewer | `choushop-reviewer` | Read-only multi-dimension review | reviewer, security-audit-triage |
| Verifier | `choushop-verifier` | AC verification gate (read-only) | verifier, security-verification-gate, systematic-debugging |
| GPT Verifier | `choushop-gpt-verifier` | External adversarial verification (GPT model family, read-only) | codex-verification, verifier |
| Codex Reviewer | `choushop-codex-reviewer` | External adversarial code review (GPT model family, read-only) | codex-verification |

---

## Skill Routing Table

### Core SDLC Skills (always route)

| Skill | When to Route | Hard Stop? |
|---|---|---|
| `architecture-discovery` | Before non-trivial implementation, architecture questions | No |
| `technical-discovery` | Project structure analysis, technical decisions | No |
| `task-decomposition` | Breaking goals into atomic tasks | No |
| `project-estimation` | Stage 0 effort estimation | No |
| `critic-review` | After Stage 0 Preflight, before Stage 1 Implementation | No |
| `scoped-coder` | Any file-changing work | No |
| `verifier` | Post-implementation verification | No |
| `reviewer` | Multi-dimension code review | No |
| `systematic-debugging` | Bug investigation before fixes | No |
| `ssot-sync-closeout` | Post-stage SSOT synchronization | No |
| `merge-protocol` | Collect, deduplicate, resolve conflicts from parallel subagents | No |
| `subagent-mission-brief` | Delegating work to subagents | No |
| `memory-bank-manager` | Memory bank maintenance | No |
| `agent-operations-review` | Agent workflow retrospectives | No |
| `output-skill` | Complete code generation | No |
| `context-snapshot` | Freeze system state before parallel dispatch or stage transitions | No |
| `orchestrator-log` | Session audit trail: orchestrator decisions + subagent results | No |
| `scoped-commit-guard` | Safe commits in dirty worktrees | No |
| `shell-context-guard` | Shell context safety | No |

### Design/Frontend Skills

| Skill | When to Route |
|---|---|
| `frontend-design` | Building web components, pages, artifacts |
| `impeccable` | UI design, redesign, critique, polish |
| `taste-skill` | Visual intent tasks, design audits |
| `theme-factory` | Theme generation, styling |
| `minimalist-skill` | Clean editorial interfaces |
| `brutalist-skill` | Data-heavy dashboards, terminal aesthetics |
| `emil-design-eng` | UI polish philosophy, animation decisions |
| `redesign-skill` | Upgrading existing UI |

### Security Skills

| Skill | When to Route | Hard Stop? |
|---|---|---|
| `security-audit-triage` | Pentest/CVE mapping to code | No |
| `security-hardening-pass` | Scoped security fixes | No |
| `security-verification-gate` | Post-security-fix verification | No |

### Tool Skills

| Skill | When to Route |
|---|---|
| `mcp-builder` | Building MCP servers |
| `skill-creator` | Creating or editing skills |
| `graphify-code-map` | Code visualization |
| `webapp-testing` | Playwright-based web testing |
| `codex-verification` | External adversarial review via Codex (GPT) — Full tier only |
| `handoff-live-smoke` | Live Codex-to-Claude Code handoff smoke validation |

---

## Routing Priority

1. Hard Stop gates first (security, verification)
2. Critic review (after Stage 0, before Stage 1)
3. Mandatory SDLC skills (scoped-coder, verifier)
4. Domain-specific skills (frontend, backend, design)
5. Support skills (debugging, output)
