# Roadmap

## MVP-0: Launch Core

Current stage.

Goal: accept first real French orders with a minimal, legally safe, operationally manageable store.

Included:

- Public storefront.
- Product listing and product pages.
- Client-side cart.
- Server-side checkout recalculation.
- Stripe Checkout.
- Stripe webhook handling.
- Order creation and payment status update.
- Manual shipping methods.
- Admin product management.
- Admin order management.
- Basic EventLog.
- Resend transactional emails.
- Cloudinary image storage.
- Legal pages and cookie consent.

Not included:

- Customer accounts.
- ProductVariant engine.
- Promo code behavior.
- Add-ons.
- Review management.
- Admin analytics dashboard.
- Sendcloud/Boxtal integration.
- Automatic shipping labels.
- Agent internal action API.
- AI-generated replies.
- Marketplace behavior.
- Separate backend.

## MVP-1: Operations

Goal: make day-to-day operations smoother after first sales.

- Promo codes.
- Discount usage tracking.
- Inventory improvements.
- Tracking URL workflow.
- Customer notes.
- FAQ/content editing.
- Static or managed reviews.
- Limited editions workflow.
- Better admin filters.

## MVP-2: Agent Layer

Goal: add safe automation on top of stable store operations.

- Internal API for agents.
- Role-based agent permissions.
- Customer reply draft generation.
- Order summaries.
- Internal notes/documents.
- Agent dashboard.
- Event consumers.
- Audit trail expansion.

## MVP-3: Scale

Goal: support higher operational complexity and multiple sales channels.

- Shipping integrations.
- CRM sync.
- Warehouse logic.
- Customer accounts.
- Personalization.
- Recommendation engine.
- Multi-country tax and shipping expansion.
- Dedicated backend only if operational complexity requires it.

## Accepted Architecture Decisions

| Decision | Status | Reason |
|---|---|---|
| Modular monolith | Locked | Fast MVP delivery, fewer moving parts |
| Next.js App Router | Locked | Storefront, admin, API, SEO in one app |
| Neon PostgreSQL | Locked | Serverless-friendly Postgres on Vercel |
| Prisma | Locked | Typed data model and migrations |
| Client-side cart | Locked | No customer accounts in MVP-0 |
| Server-side checkout recalculation | Locked | Client data is untrusted |
| Stripe Checkout only | Locked | Covers SCA and avoids custom payment risk |
| Webhook-first payment status | Locked | Redirect is not reliable payment confirmation |
| Prices EUR TTC | Locked | France-first B2C display requirement |
| Tax snapshot on order | Locked | Historical order integrity |
| Shipping methods in DB | Locked | Admin-controlled fixed rates |
| `ShippingMethod.countries String[] @db.Text` | Locked | Simple enough for MVP-0 |
| Cloudinary | Locked | Simple image upload and transforms |
| Resend + React Email | Locked | Transactional email path |
| Promo codes in MVP-1 | Locked | Avoid checkout complexity in launch scope |
| EventLog from MVP-0 | Locked | Agent-ready foundation without agent layer |
