# Subagent Anti-Patterns

> Reference for Control Tower before delegating.
> Referenced by AGENTS.md § Multi-Agent Default.

---

## 6 Common Failure Modes

### 1. Trivial Delegation
**Problem:** Delegating a task that could be done faster inline. The overhead of mission brief + subagent handoff exceeds the work itself.

**Rule:** Don't delegate single-file edits, typo fixes, or simple lookups. Use subagents for multi-file, multi-domain, or verification-heavy work.

### 2. Chain-of-Agents Without Validation
**Problem:** Agent A's output becomes Agent B's input without validation. Errors compound silently.

**Rule:** Control Tower validates every subagent handoff before it becomes the next agent's input. Delegated output is evidence, not acceptance.

### 3. Context-Isolation Harms
**Problem:** Subagent lacks context about project conventions, recent changes, or implicit constraints. Produces correct-looking output that violates project rules.

**Rule:** Always include references to `AGENTS.md`, relevant `memory-bank/` files, and the specific files the subagent needs. The mission brief is the subagent's entire world.

### 4. Overly Broad Scope
**Problem:** "Review the entire codebase for security issues" — the subagent drowns in scope and produces shallow, unreliable results.

**Rule:** Scope must be narrow enough for a single session. "Review the auth middleware and session handling" is better than "review security."

### 5. Single-Verifier Blindness
**Problem:** One verifier checking its own work, or a single reviewer missing issues that multiple perspectives would catch.

**Rule:** Verifier is always separate from Coder. For security-critical work, use adversarial verification (two independent verifiers, different lenses).

### 6. Subagent-as-Decision-Maker
**Problem:** Subagent is asked "should we do X?" instead of "analyze X and report findings." The subagent makes a decision it doesn't have authority to make.

**Rule:** Subagents analyze and report. Control Tower decides. The decision authority stays with the Orchestrator and Owner.

---

## Pre-Delegation Checklist (4 Questions)

Before launching any subagent, answer:

1. **Is this task genuinely too large or multi-domain for inline work?** If no → inline it.
2. **Does the subagent have all the context it needs?** If no → add files to the mission brief.
3. **Is the scope narrow enough to complete in one session?** If no → split into multiple missions.
4. **Is there an independent verification path for the subagent's output?** If no → design one before dispatch.
