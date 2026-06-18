---
name: catalog-ux-patterns
description: Recurring verification patterns for Candy Cloud catalog/UX frontend WBs
metadata:
  type: failure-pattern
---

Catalog/UX frontend Work Blocks commonly need verification of:
1. **Filter chip interactivity** — check for real `useState` (not hardcoded index), `onClick` handlers, `type="button"`, and `aria-pressed` matching actual state comparison.
2. **French localization** — empty state text, product count labels, and button labels must be in French. Watch for English artifacts in copy.
3. **Scope strictness** — catalog/UX WBs must never touch `admin/`, `api/`, `auth.ts`, `prisma/`, `server/`, `package.json`, or env files. Pre-existing diffs in those areas from framework sync commits are not part of the WB scope.
4. **a11y basics** — `aria-hidden="true"` on decorative visuals, no redundant visual-only links without accessible names, `aria-pressed` on filter toggles.
5. **Useless ternaries** — common in product count pluralization logic (e.g., `{len !== 1 ? "" : ""}`). Non-blocking but worth flagging.
6. **Build evidence for route contract** — `npx next build` output lists all routes with their rendering mode, serving as sufficient proof of route existence when no dev server is running.
