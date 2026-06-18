---
task_id: YYYYMMDDTHHMMSSZ-codex-to-claude-001
from: codex
to: claude
timeout_seconds: 1800
project_root: /path/to/project
allowed_scope:
  - src/**
  - tests/**
  - docs/**
  - memory-bank/external-team-log.md
  # Include this block when Claude Code is expected to operate as a full
  # independent team with its own orchestrator, critic, verifier, and memory.
  - memory-bank/orchestrator-log.md
  - memory-bank/review-log.md
  - .agent/critic-gate.md
  - .agent/verification-gate.md
  - .claude/agent-memory/**
forbidden_scope:
  - .env
  - .env.*
  - secrets/**
---

# Objective

Concrete task for Claude Code as an independent external delivery team.

# Operating Model

You are an external team with your own internal lead/architect/coder/reviewer
process. Codex is the Control Tower and will not manage your internal steps.
Work autonomously inside the approved scope and return concise evidence.

# Context

Relevant project context, constraints, and links to files.

# Decision Summary

Why this task was delegated, what is already decided, and what remains unknown.
Do not include private chain-of-thought.

# Work Log Contract

Append or update a concise entry in `memory-bank/external-team-log.md` when
that path is inside `allowed_scope`.

Claude Code may also update its own internal process files when those paths are
inside `allowed_scope`, for example `memory-bank/orchestrator-log.md`,
`memory-bank/review-log.md`, `.agent/critic-gate.md`, and
`.claude/agent-memory/**`. Treat those files as the internal audit trail of the
external team, not as the final handoff report.

The entry must summarize:
- accepted objective and scope
- internal role/phase summary, for example lead/architect/coder/reviewer
- subagents, critics, reviewers, or verifiers used
- skipped internal review reason, if any
- actions taken
- files changed
- checks run
- task_id, runner result path, and runner log path when available
- blockers, risks, and follow-up

Do not log private chain-of-thought, secrets, raw environment values, or full
command transcripts.

# Response Contract

Print:
- status
- actions taken
- files changed
- checks run
- subagents/reviewers used
- critic/reviewer verdicts or skip reasons
- risks
- next step
- external-team-log entry path, if updated
