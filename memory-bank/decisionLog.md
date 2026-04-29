# Decision Log

This file records accepted project decisions. Add new entries when architecture, product scope, or operational policy changes.

## 2026-04-13: Use Next.js 16.2.3 App Router

Decision: use Next.js 16.2.3 App Router for the project.

Reason:

- Current scaffold uses Next.js 16.2.3.
- App Router supports storefront pages, admin pages, route handlers, metadata, and SEO in one app.
- Keeping docs aligned with implementation avoids future dependency drift.

Consequences:

- Agents must check current Next.js behavior before relying on older App Router assumptions.
- Build and lint configuration should be compatible with Next.js 16.

## 2026-04-13: Use Modular Monolith

Decision: build one Next.js application instead of separate frontend/backend services.

Reason:

- MVP-0 needs speed and simple deployment.
- A separate backend adds complexity before operational demand exists.

Consequences:

- Domain boundaries must be enforced through folders and services.
- Future extraction is possible only after real scaling pressure appears.

## 2026-04-13: Use Client-Side Cart For MVP-0

Decision: keep cart in browser storage and create server-side order only at checkout.

Reason:

- MVP-0 has no customer accounts.
- Server cart persistence is unnecessary for first launch.

Consequences:

- Client cart is never trusted.
- Checkout service must recalculate everything from DB.
- `cartId` is used to invalidate older pending checkout orders.

## 2026-04-13: Stripe Checkout Only

Decision: use Stripe Checkout, not custom payment UI.

Reason:

- Stripe Checkout handles SCA and secure hosted payment flow.
- Custom card flow increases risk and compliance work.

Consequences:

- Payment status is webhook-only.
- `/success` is read-only UX.
- Stripe metadata must include order identifiers.

## 2026-04-13: Prices Are EUR TTC

Decision: MVP-0 displays and stores customer-facing prices in EUR TTC.

Reason:

- France-first B2C storefront.
- Simpler operational model for initial launch.

Consequences:

- Order and order item tax snapshots are required.
- Stripe Tax is not required for MVP-0 unless multi-country tax rules are added.

## 2026-04-13: Stock Decrement After Paid Webhook

Decision: stock is checked before checkout but decremented only after Stripe confirms payment by webhook.

Reason:

- Avoids reservation complexity in MVP-0.
- Keeps paid order processing deterministic.

Consequences:

- Race conditions are handled by transaction-time stock decrement.
- If stock is insufficient after payment, order becomes `ON_HOLD` with `stockIssue = true`.

## 2026-04-13: Shipping Countries Stored As Text Array

Decision: `ShippingMethod.countries` uses a Postgres text array, not a relation table.

Reason:

- MVP-0 has simple fixed zones and manual shipping methods.
- A relation table would be unnecessary complexity.

Consequences:

- Revisit only if country-specific shipping rules become complex.

## 2026-04-13: Promo Codes Deferred To MVP-1

Decision: do not implement promo code behavior in MVP-0.

Reason:

- Promo codes complicate checkout, usage limits, and fraud rules.

Consequences:

- Keep `discountCode` and `discountAmount` reserved on Order.
- Add `DiscountCode` and `DiscountUsage` later.

## 2026-04-13: Use Project Memory Bank For Handoffs

Decision: maintain a persistent `memory-bank/` and workflow documentation set for all future agent sessions.

Reason:

- The project will be worked on through orchestrated AI sessions.
- Requirements include legal, payment, stock, and webhook constraints that must not be rediscovered each time.

Consequences:

- Agents must read memory-bank before starting.
- `activeContext.md` must be updated after every session.
- `progress.md` must track feature status changes.
- `decisionLog.md` must capture accepted decisions.
