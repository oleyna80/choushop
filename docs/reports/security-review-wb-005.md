## Security Review — WB-005 Admin CRUD

**Date:** 2026-06-12
**Reviewer:** Stream C (read-only, WB-006)

### Findings

| # | Severity | File:Line | Finding | Recommendation |
|---|---|---|---|---|
| 1 | CRITICAL | `src/app/admin/layout.tsx:1-13` | No authentication on any admin UI page or server action. `/admin/*` accessible to anyone. `createProductAction` + `updateProductAction` have zero auth checks. | Add Next.js middleware guarding `/admin/*` or session check in layout. Add auth to server actions. |
| 2 | HIGH | `src/app/admin/products/new/page.tsx:7` | `createProductAction` has no authorization — unlike its API counterpart (`POST /api/internal/products`) which uses `x-internal-secret`. | Add `requireInternalAccess` or session check to server action. |
| 3 | HIGH | `src/app/admin/products/[slug]/edit/page.tsx:7` | `updateProductAction` has no authorization. | Same — add auth check. |
| 4 | MEDIUM | `src/app/admin/products/new/page.tsx:30` | No error feedback or rate limiting on server actions. Validation failure silently returns. | Return error state to client. Add server-side throttle. |
| 5 | MEDIUM | `src/lib/validation/product.ts:4` | No max length on string fields. 10,000-char slug passes validation. | Add `.max(N)` constraints: slug 200, title 255, shortDescription 500, description 10k. |
| 6 | MEDIUM | `src/lib/validation/product.ts:10` | No max value on `price`. | Add `.max(9_999_999)` or similar ceiling. |
| 7 | LOW | `src/app/api/internal/products/[slug]/route.ts:26` | Attempted update of non-existent product returns 404 without logging. | Log failed attempt with attempted slug. |
| 8 | INFO | `src/server/services/catalog.ts:91` | TOCTOU window: `findUnique` then `update` by `id`. | Merge into single `update({ where: { slug } })`. |
| 9 | INFO | `src/lib/validation/product.ts:20` | Image `alt` field — no `.min(1)` constraint. | Add minimum length. |

### Assessment

XSS risk: LOW (React escapes JSX text + DOM defaultValue).
CSRF risk: LOW (API routes use shared-secret header; server actions use Next.js built-in signed action IDs).
Auth risk: CRITICAL (admin pages are publicly accessible).

**Priority:** Fix CRITICAL auth gap before go-live. MEDIUM items before production payments.
