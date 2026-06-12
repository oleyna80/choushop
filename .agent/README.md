# Agent Configuration Structure

This directory is synchronized through Git by default so project-local agent
skills, workflows, and reports are available from every workstation.

Do not store secrets, raw private transcripts, local runtime logs, caches,
customer data, or machine-specific tool state here.

`AGENTS.md` remains the authoritative root contract. The `.agent/` directory is
an index and staging area for reusable project-local roles, skills, workflows,
and report templates.

## 1. Roster (`.agent/ROSTER.md`)

Single index of roles, skills, workflows, and trigger phrases.

## 2. Skills (`.agent/skills/`)

Reusable procedures for recurring ChouShop work. Keep skills lean and create
them only when the workflow repeats.

## 3. Workflows (`.agent/workflows/`)

Optional multi-step processes. Existing domain workflow docs currently live in
`workflows/`; do not move or rewrite them without explicit approval.

## 4. Reports (`.agent/reports/`)

Optional output templates for structured handoffs.
