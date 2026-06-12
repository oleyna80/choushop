---
name: codex-verification
description: "External adversarial review using OpenAI Codex (GPT). Spawns /codex:adversarial-review against the current diff. Use for Full verification tier, security-sensitive Work Blocks, or when a second opinion from a different model family is needed. Codex output is evidence, not acceptance — Control Tower validates before acting."
user-invocable: true
argument-hint: "[focus text for adversarial review] [--base <ref>]"
allowed-tools:
  - Bash
---

# Codex Verification

## Purpose

Run an adversarial review using OpenAI Codex as a second pair of eyes from a
different model family. Complements Claude Verifier — catches blind spots that
one model family misses.

Codex runs locally via the Codex CLI and the `codex@openai-codex` Claude Code plugin.
It shares the same filesystem and git repository. No cloud Codex instance is used.

## Prerequisites

1. Codex CLI installed: `npm install -g @openai/codex`
2. Codex authenticated: `codex login`
3. Claude Code plugin: `/plugin install codex@openai-codex`
4. Plugin setup: `/codex:setup`

## When to Use (Triggers)

Control Tower MUST invoke this skill when:

- Verification tier is **Full** (security/auth/deploy/DB Work Blocks)
- Security-sensitive changes (per `AGENTS.md § Security Review Baseline`)
- First Work Block in a new domain (no-skip, critic mandatory)
- After major refactoring — want a second opinion
- Critic report shows SUPPLEMENT or RECONSIDER — double-check the fixes

Skip when:
- Codex is not installed or authenticated (log gap, proceed without)
- Verification tier is Lite or Standard (Codex review is Full tier only)
- Work Block is trivial (single-file, no logic change)

## Workflow

1. Control Tower spawns `codex-reviewer` agent with a mission brief
2. Agent runs `/codex:adversarial-review --base main [focus text]`
3. Agent collects Codex output
4. Agent structures findings as a Reviewer Report
5. Control Tower merges Codex findings with Verifier findings
6. Both go into the consolidation report

## Relationship with Other Skills

| Skill | Relationship |
|---|---|
| `verifier` | Codex review runs alongside Claude Verifier — complementary |
| `merge-protocol` | Merge protocol consolidates both Claude + Codex findings |
| `critic-review` | Critic may recommend Codex review for high-risk changes |
| `reviewer` | Codex is an external reviewer, not a replacement for Claude Reviewer |

## Constraints

- Codex output is **evidence, not acceptance** — Control Tower validates
- Codex cannot issue BLOCKED — it's a reviewer, not a gate
- If Codex is unavailable → log gap, proceed with Claude-only verification
- Codex review adds time — use only for Full tier, not every WB
- Codex findings may overlap with Claude findings → merge protocol deduplicates

## Handoff

- **Success condition:** Codex review completed, findings structured, report returned to Control Tower
- **Next:** Merge protocol (consolidate with Verifier findings)
- **Auto-proceed:** YES — Codex is advisory, not a gate
- **Hard stop:** NO
