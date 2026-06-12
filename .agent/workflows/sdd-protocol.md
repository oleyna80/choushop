# SDLC Protocol — Stage Definitions

> Defines the 4-stage pipeline: Plan & Discover, Implement, Verify, Sync & Report.
> Referenced by AGENTS.md § Stage Flow.

---

## Stage State Machine

```
blocked → ready → in_progress → completed
  ↑                      ↓
  └──────── retry ───────┘
```

States:
- **blocked** — dependency not met, Hard Stop triggered, or Owner approval needed
- **ready** — dependencies cleared, write gate open, ready to execute
- **in_progress** — currently executing
- **completed** — all checks passed, artifacts written

---

## Stage 0: Plan & Discover

**Owner:** Control Tower
**Write authority:** `.agent/*`, `docs/plans/*`, `docs/specs/*`, `docs/tasklist/*`, `memory_bank/*`

### Entry Conditions
- Work Block framed by Owner or Control Tower
- Session Start Read Set loaded

### Activities
1. **Parallel Decomposition Matrix** — classify: domains, files, side-effect class, DB mode, hard stops, verification tier
2. **Skill Routing Gate** — check `.agent/ROSTER.md`, match skills, record decisions
3. **Subagent Topology** — classify `Subagent-Required` triggers, plan dispatch
4. **Preflight** — output Stage 0 Preflight block: skills, subagent topology, side-effect class, DB mode, hard stops, write gate status
5. **Research** — if needed, launch `solution-architect` for pre-implementation analysis
6. **Critic Review** — launch `critic` agent to independently review Control Tower decisions (scope, skill routing, skip reasons, risk gaps). Required when: 3+ files touched, side-effect class ≥ production code write, new subagent topology, or 2+ skills skipped. Skip for trivial/documentation-only Work Blocks.
7. **Plan Approval** — produce plan, get Owner approval if non-trivial

### Exit Conditions
- Write gate: `READY`
- Critic verdict: APPROVE or SUPPLEMENT (if RECONSIDER — re-run Stage 0 with corrections)
- Plan approved (for non-trivial work)
- All matched skills recorded (used or skipped with reason)

---

## Stage 1: Implement

**Owner:** Scoped Coder (one per write-set)
**Write authority:** Approved write-set only (see File Write Authority in AGENTS.md)

### Entry Conditions
- Write gate: `READY`
- Approved plan or task description
- Approved write-set
- Side-effect class and DB mode classified

### Activities
1. Read plan, task description, AC, relevant code
2. Implement changes within approved write-set
3. Run Pre-Edit Lifecycle Check for recently created files
4. Self-check: scope not expanded, no secret leakage, no Hard Stop triggered
5. Report: `DONE` / `DONE_WITH_CONCERNS` / `NEEDS_CONTEXT` / `BLOCKED`

### Exit Conditions
- All planned changes implemented
- No scope creep
- Report filed with change summary

---

## Stage 2: Verify

**Owner:** Verifier (read-only)
**Write authority:** `docs/reports/*` (verification artifacts only)

### Entry Conditions
- Implementation complete (Stage 1 DONE)
- Verification tier specified (lite/standard/full)

### Verifier Mode Decision Table

How to verify depends on Work Block characteristics. "Mandatory" = must spawn
verifier agent; cannot be replaced by inline tsc.

| Condition | Verifier Mode |
|---|---|
| 1-2 files, no DB, no auth, read-only | Inline tsc + lint |
| 3+ files, logic changes | Inline tsc + spawn verifier agent (Standard tier) |
| DB writes / migrations | Spawn verifier agent — **mandatory** |
| Auth / security-sensitive changes | Spawn verifier agent — **mandatory** |
| Parallel dispatch results (merge step) | Spawn verifier agent — **mandatory** |
| Side-effect class: live-infra / live-data | Spawn verifier agent + Full tier — **mandatory** |

### Activities

#### Lite Tier
- [ ] Changed files match task description
- [ ] No obvious regressions
- [ ] Types pass (`npx tsc --noEmit`)
- [ ] Build succeeds
- [ ] Tests pass

#### Standard Tier (extends Lite)
- [ ] Route contract: URLs return expected status codes
- [ ] Schema contract: field keys, types match spec
- [ ] Anchor targets exist
- [ ] No new dev server errors
- [ ] Security baseline: no secrets, injections, parameterized queries
- [ ] Production Maintainability Standard met

#### Full Tier (extends Standard)
- [ ] STRIDE-lite threat model verified
- [ ] Security review checklist complete
- [ ] `scripts/secret-scan.sh staged` clean
- [ ] `npm audit --omit=dev --audit-level=high` clean
- [ ] Runtime proof via `curl -fsSI`
- [ ] CSP/security headers verified
- [ ] CSRF/origin guard for mutations
- [ ] Codex adversarial review (if Codex installed) — second opinion from GPT model family
- [ ] Consolidation: merge Verifier + Codex findings

### Exit Conditions
- Verdict: `READY` or `BLOCKED`
- All blockers documented with file:line evidence
- Verification report written to `docs/reports/`

---

## Merge Protocol (Parallel Agents Only)

**Owner:** Control Tower
**Write authority:** `docs/reports/*`, `memory_bank/*`

> Runs between Stage 2 and Stage 3 when 2+ subagents were dispatched in parallel.
> Skip for single-agent or sequential Work Blocks.

### Entry Conditions
- All parallel subagents completed (or timed out)
- Snapshot exists from pre-dispatch (via `context-snapshot`)

### Activities
1. **Collect** — gather all subagent reports from `docs/reports/` or direct outputs
2. **Deduplicate** — group findings by `file:line`; same finding from multiple agents → one merged entry
3. **Detect conflicts** — same file, different verdicts → apply conflict resolution rules:
   - PASS vs ISSUES → ISSUES wins (conservative)
   - ISSUES vs BLOCKED → BLOCKED wins
   - Two different ISSUES on same file → both included
   - Unresolvable contradiction → escalate to Control Tower (hard stop)
4. **Classify** — rate each finding: P0 (must fix) / P1 (should fix) / P2 (might fix) / Accepted
5. **Produce consolidation report** — save to `docs/reports/consolidation-[wb-id]-[stage]-[date].md`
6. **Update logs** — `orchestrator-log.md` + `review-log.md`

### Exit Conditions
- Consolidation report written
- All conflicts resolved or escalated
- BLOCKED verdicts addressed (corrective Work Block or Owner acceptance)
- Consolidation decision: PROCEED / ESCALATE / RERUN

---

## Stage 3: Sync & Report

**Owner:** Control Tower
**Write authority:** `docs/reports/*`, `memory_bank/*`, `docs/tasklist/*`

### Entry Conditions
- Verification complete (READY or BLOCKED with documented follow-ups)
- If parallel agents were used: consolidation report written, conflicts resolved

### Activities
1. **SSOT Sync** — update tasklist status, memory_bank context/progress/decisions
2. **Crash Test Gate** — if routes changed: run local crash test
3. **Closeout Report** — summarize: what was done, verification result, consolidation (if parallel), risks accepted, follow-ups
4. **Owner Report** — present closeout summary

### Exit Conditions
- Memory bank updated
- Tasklist updated
- Closeout report written
- Owner notified

---

## Quick-Fix Path

Skip Stages 0, 2, 3 for trivial changes: ≤3 files, no route/schema/API/security impact.
Flow: Implement (Lite self-check) → Inline sync → Done.
Still applies: Hard Stops, secret scan, no scope expansion.
