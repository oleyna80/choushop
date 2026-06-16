# Handoff Runner

Minimal file-based dispatcher for Codex -> Claude Code tasks.

For Claude Code CLI operating notes, team model, hooks, subagents, plugins, and
OpenAI Codex plugin integration, see
`framework/knowledge/claude-code-cli.md`.

## Layout

```text
handoff/
  runner/
    handoff-runner.sh
    parallel-runner.sh
    sanitize-env.sh
    cleanup.sh
    watch-queue.sh
    install-systemd-user-service.sh
  systemd/
    agentic-sdlc-handoff.service.template
    handoff.env.example
  templates/
    claude-team-task-template.md
  queue/
  active/
  done/
  failed/
  logs/
  parallel/
  runtime/
    status.json
  agent.lock
  watcher.lock
```

## Task Files

Create tasks as Markdown files with YAML frontmatter in `handoff/queue/`.
Writers should create a temporary file first and then atomically move it to
`queue/*.md`.

```markdown
---
task_id: 2026-06-13T120000Z-codex-001
from: codex
to: claude
timeout_seconds: 1800
project_root: /path/to/project
allowed_scope:
  - memory-bank/**
  - src/**
forbidden_scope:
  - .env
  - secrets/**
---

# Objective

Concrete task for Claude Code.

# Context

Relevant context.

# Reasoning Summary

Decision summary and open unknowns. Do not include private chain-of-thought.

# Work Log Contract

For state-changing tasks, append a concise delivery entry to
`memory-bank/external-team-log.md` when that path is inside `allowed_scope`.
Treat Claude Code as an independent external team with its own
lead/architect/coder/reviewer workflow. Codex does not manage the internal
workflow, but the team must expose a summary-level execution trace.

Log accepted scope, role/phase summary, actions taken, files changed, checks
run, subagents or critic/reviewer passes used, skipped review reason if any,
runner result/log linkage, blockers, risks, and follow-up. Do not log private
chain-of-thought, secrets, raw environment values, or full command transcripts.

# Response Contract

Print status, actions taken, changed files, checks, risks, next step, and the
external-team-log entry path if updated. Include subagents/reviewers used,
critic/reviewer verdicts or skip reasons, and runner result/log paths when
available.
```

Use `handoff/templates/claude-team-task-template.md` as the default starting
point for delegated Claude Code work.

## Manual Run

Do not run `handoff/templates/claude-team-task-template.md` unchanged. Fill in
`task_id`, `project_root`, scope, objective, context, and response contract
first.

```bash
cd /path/to/framework
handoff/runner/handoff-runner.sh handoff/queue/001.codex-to-claude.md
```

## Scope Audit

When a task declares `allowed_scope` or `forbidden_scope`, the runner captures a
filesystem snapshot of `project_root` before and after Claude Code runs, then
compares the snapshots. The audit excludes `.git/` but includes ignored
local-first paths such as `.agent/`, `.codex/`, `.claude/agent-memory/`, and
`memory-bank/`.

This means `.gitignore` does not hide files from enforcement. A task that
changes any path outside `allowed_scope`, or any path matching
`forbidden_scope`, finishes as `scope_failed` with exit code `90`.

Scope audit uses standard Unix utilities: `find`, `cksum`, `readlink`, `comm`,
and `awk`.

## Smoke Task

After bootstrapping a test project, create a scoped smoke task like this:

```bash
cd /path/to/framework
SMOKE_PROJECT=/path/to/generated-smoke-project
TASK_ID="$(date -u +%Y%m%dT%H%M%SZ)-smoke-001"

cat > "handoff/queue/${TASK_ID}.md.tmp" <<EOF
---
task_id: ${TASK_ID}
from: codex
to: claude
timeout_seconds: 600
project_root: ${SMOKE_PROJECT}
allowed_scope:
  - memory-bank/handoff-smoke.txt
  - memory-bank/external-team-log.md
  - memory-bank/orchestrator-log.md
  - .agent/critic-gate.md
  - .agent/verification-gate.md
forbidden_scope:
  - .env
  - .env.*
  - secrets/**
  - "*.pem"
  - "*.key"
---

# Objective

Create memory-bank/handoff-smoke.txt with the text:

handoff smoke ok

# Context

This is a publication smoke test for the Agentic SDLC Framework handoff runner.
Stay inside the allowed scope.

# Decision Summary

Codex is validating that Claude Code can act as an independent external team
through the handoff runner.

# Work Log Contract

Append a concise entry to memory-bank/external-team-log.md.

# Response Contract

Print status, actions taken, files changed, checks, risks, and next step.
EOF

mv "handoff/queue/${TASK_ID}.md.tmp" "handoff/queue/${TASK_ID}.md"
HANDOFF_CLAUDE_MAX_BUDGET_USD=2.00 handoff/runner/handoff-runner.sh "handoff/queue/${TASK_ID}.md"
```

The runner default budget is intentionally conservative. Increase
`HANDOFF_CLAUDE_MAX_BUDGET_USD` for live smoke tests when Claude Code needs a
larger budget to start.

Expected checks:

```bash
test -f "${SMOKE_PROJECT}/memory-bank/handoff-smoke.txt"
grep -q "handoff smoke ok" "${SMOKE_PROJECT}/memory-bank/handoff-smoke.txt"
ls handoff/done handoff/failed handoff/logs
```

## Watch Queue

Run the foreground watcher:

```bash
cd /path/to/framework
handoff/runner/watch-queue.sh
```

Run one polling pass for tests:

```bash
handoff/runner/watch-queue.sh --once
```

Useful environment overrides:

```bash
HANDOFF_WATCH_INTERVAL=2 handoff/runner/watch-queue.sh
HANDOFF_WATCH_STABLE_SECONDS=1 handoff/runner/watch-queue.sh --once
HANDOFF_RUNNER=/path/to/fake-runner handoff/runner/watch-queue.sh --once
HANDOFF_SCOPE_AUDIT=0 handoff/runner/handoff-runner.sh handoff/queue/task.md
HANDOFF_REQUIRE_SCOPE_RULES=1 handoff/runner/handoff-runner.sh handoff/queue/task.md
HANDOFF_STATUS_FILE=/tmp/handoff-status.json handoff/runner/handoff-runner.sh handoff/queue/task.md
HANDOFF_RUNNER=/path/to/fake-runner handoff/runner/parallel-runner.sh handoff/queue/a.md handoff/queue/b.md
HANDOFF_PARALLEL_MAX_JOBS=2 handoff/runner/parallel-runner.sh handoff/queue/*.md
```

The watcher uses `watcher.lock`, so only one watcher runs at a time. The runner
still uses `agent.lock`, so only one Claude Code job runs at a time in this MVP.
By default, both write mutable status to ignored `handoff/runtime/status.json`.
Set `HANDOFF_STATUS_FILE` when another process needs a fixed status location.
If the runner rejects a task before moving it out of `queue/`, the watcher moves
that task to `failed/` with a watcher failure result file to prevent infinite
retry loops.

On startup the watcher also checks `active/*.md`. If `agent.lock` is free, no
runner is active, so any active task is treated as stale and moved to `failed/`
with a `recovered_failed` result. If `agent.lock` is held, active recovery is
skipped because a runner is still working.

## Parallel Run

Run multiple task files concurrently:

```bash
cd /path/to/framework
handoff/runner/parallel-runner.sh \
  handoff/queue/001.codex-to-claude.md \
  handoff/queue/002.codex-to-claude.md
```

The parallel runner starts one child `handoff-runner.sh` process per task. Each
child receives its own lock and status file under `handoff/parallel/`, so it
does not contend on the default `agent.lock` or overwrite the default
`status.json`.

Limit concurrency with `--max-jobs` when the host, API quota, or model routing
should not run every queued task at once:

```bash
handoff/runner/parallel-runner.sh --max-jobs 2 handoff/queue/*.md
```

`--max-jobs 0` or an unset `HANDOFF_PARALLEL_MAX_JOBS` means no explicit limit.
The aggregate status JSON records the selected `max_jobs` value.

By default, `parallel-runner.sh` rejects tasks with the same `project_root`.
This avoids false scope-audit failures and concurrent writes in the same Git
work tree. Override only for known-safe cases:

```bash
handoff/runner/parallel-runner.sh --allow-shared-project-root handoff/queue/*.md
```

The aggregate run writes a log to `handoff/logs/parallel-*.log` and a status
file to `handoff/parallel/status-*.json`. Child task outputs still move through
the normal `active/`, `done/`, and `failed/` directories.

## systemd User Service

For unattended local or VPS operation, install the watcher as a systemd user
service:

```bash
cd /path/to/framework
handoff/runner/install-systemd-user-service.sh
```

The installer writes:

- `~/.config/systemd/user/agentic-sdlc-handoff.service`
- `~/.config/agentic-sdlc-framework/handoff.env`

It does not enable or start the service automatically. Review the environment
file first, especially `PATH` and any Claude Code routing variables, then run:

```bash
systemctl --user enable --now agentic-sdlc-handoff.service
```

Useful commands:

```bash
systemctl --user status agentic-sdlc-handoff.service
journalctl --user -u agentic-sdlc-handoff.service -f
systemctl --user stop agentic-sdlc-handoff.service
systemctl --user disable agentic-sdlc-handoff.service
```

If the service should keep running after logout on a VPS, enable lingering for
the user outside this framework:

```bash
loginctl enable-linger "$USER"
```

The unit uses `Restart=on-failure`, runs `watch-queue.sh` in the framework root,
and loads optional environment overrides from
`~/.config/agentic-sdlc-framework/handoff.env`.

## Environment

Before computing runner defaults, `handoff-runner.sh` loads an optional local
env file:

```text
handoff/runtime/handoff.env
```

Override the path with `HANDOFF_ENV_FILE=/path/to/handoff.env`. Keep real env
files ignored and mode `600`; logs record only the file path and whether it was
loaded, never the variable values.

`sanitize-env.sh` launches Claude Code with a small whitelist:

- `HOME`
- `PATH`
- `TMPDIR`
- `ANTHROPIC_BASE_URL`
- `ANTHROPIC_API_KEY`
- `ANTHROPIC_AUTH_TOKEN`
- `ANTHROPIC_MODEL`
- `ANTHROPIC_DEFAULT_SONNET_MODEL`
- `ANTHROPIC_DEFAULT_OPUS_MODEL`
- `ANTHROPIC_DEFAULT_HAIKU_MODEL`
- `CLAUDE_CODE_SUBAGENT_MODEL`
- `DEEPSEEK_API_KEY`

`OPENAI_API_KEY` and generic secret/password/token variables are not forwarded.

## Runtime Guard

`handoff-runner.sh` runs a preflight guard before Claude Code starts. The guard
is enabled by default and rejects:

- dangerous exact `project_root` values such as `/`, `/home`, `/tmp`, `/etc`,
  `/usr`, `/var`, `/opt`, `/root`, or the current `HOME`
- very broad `allowed_scope` values such as `*`, `**`, `/`, or the whole
  `project_root`
- `allowed_scope` or `forbidden_scope` patterns containing `..`
- absolute scope patterns outside `project_root`

The runner also appends a default forbidden scope list for common secret files:
`.env`, `.env.*`, nested `.env` files, `secrets/**`, `*.pem`, `*.key`,
`id_rsa`, and `id_ed25519`.

Useful runtime guard overrides:

```bash
HANDOFF_RUNTIME_GUARD=0 handoff/runner/handoff-runner.sh handoff/queue/task.md
HANDOFF_REQUIRE_SCOPE_RULES=1 handoff/runner/handoff-runner.sh handoff/queue/task.md
HANDOFF_DEFAULT_FORBIDDEN_SCOPE=0 handoff/runner/handoff-runner.sh handoff/queue/task.md
HANDOFF_ALLOW_DANGEROUS_PROJECT_ROOTS=1 handoff/runner/handoff-runner.sh handoff/queue/task.md
HANDOFF_TIMEOUT_KILL_AFTER=10s handoff/runner/handoff-runner.sh handoff/queue/task.md
```

Each task gets a private `TMPDIR` under `handoff/runtime/`. The process still
uses the real `HOME` so Claude Code can find its existing authentication.
`timeout --kill-after` is used to force termination after the graceful timeout
window.

## Scope Audit

`allowed_scope` and `forbidden_scope` are enforced by the runner when either
list is present in the task frontmatter.

- The `project_root` must be a Git work tree for scoped tasks.
- The runner captures Git-visible changed paths before Claude starts.
- After Claude exits, the runner audits new changed paths from
  `git status --porcelain --untracked-files=all`.
- `forbidden_scope` wins over `allowed_scope`.
- If `allowed_scope` is non-empty, each new changed path must match at least one
  allowed pattern.
- If a violation is detected, the task moves to `failed/`, status is
  `scope_failed`, and `exit_code` is `90`.

Patterns are Bash glob patterns relative to `project_root`, for example
`src/**`, `memory-bank/**`, `.env`, or `secrets/**`. Absolute patterns are also
accepted and matched against the absolute changed path.

This is an audit layer, not an OS sandbox. It detects Git-visible file changes
after the Claude Code process exits. It intentionally ignores changes that were
already dirty before the task started to avoid failing on unrelated local work.

## Current Limits

- Scope audit requires Git and does not inspect untracked files ignored by Git.
- Scope audit does not prove whether Claude touched a file that was already
  dirty before the run.
- Runtime guard is a preflight and process-hardening layer, not a kernel or
  container sandbox.
- Parallel runs are safest when each task has a distinct `project_root`.
- `parallel-runner.sh` uses Bash `wait -n`, so it expects Bash 4.3 or newer.
- The systemd installer targets user services only. System-level service
  installation is intentionally not included.
