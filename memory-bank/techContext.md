# Technical Context

## Technical Decisions

| Area | Decision | Status | Reason |
|---|---|---|---|
| Architecture | Modular monolith | Locked | One app is fastest and simplest for MVP |
| Framework | Next.js 16.2.3 App Router | Locked | Storefront, admin, route handlers, SEO |
| Language | TypeScript strict | Locked | Safer domain logic |
| Styling | Tailwind CSS | Locked | Fast mobile-first UI |
| UI components | shadcn/ui-style primitives | Open | Use only where useful |
| ORM | Prisma | Locked | Schema, migrations, typed access |
| Database | Neon PostgreSQL | Locked | Vercel-friendly serverless Postgres |
| Media | Cloudinary | Locked | Admin image upload and transforms |
| Payments | Stripe Checkout | Locked | SCA support, hosted payment UX |
| Webhooks | Stripe webhook route | Locked | Source of truth for payment state |
| Email | Resend + React Email | Locked | Transactional emails |
| Hosting | Vercel | Locked | Natural fit for Next.js |
| Validation | Zod | Locked | Validate all inputs at boundaries |
| Analytics | GA4, Meta, TikTok | Open | Must be consent-gated |
| Rate limiting | Upstash Redis | Open | Needed for sensitive endpoints |
| Auth | NextAuth credentials/allowlist | Open | Needed for admin MVP |

## Key Architecture Decisions

### Modular Monolith vs Microservices

Use a modular monolith. Separate backend or microservices would add deployment, auth, API, observability, and data consistency complexity before the store has real operational demand.

### Client-Side Cart

Use client-side cart for MVP-0 because there are no customer accounts and no abandoned cart workflows.

The client cart is only a convenience. It is not trusted.

### Server-Side Recalculation

Before creating Stripe Checkout, the server reads product and shipping data from the database and recalculates:

- product availability;
- unit prices;
- subtotal;
- shipping amount;
- discount amount;
- tax amount;
- total amount.

### Webhook-First Payments

`/success` redirect is only UX. It must never mark orders paid.

Only Stripe webhook can set payment status to paid.

### TTC Tax Snapshot

MVP-0 uses EUR TTC prices. The order stores tax snapshots for historical accuracy:

- `Order.taxAmount`;
- `Order.taxRateSnapshot`;
- `OrderItem.taxRateSnapshot`.

Stripe Tax is not required for MVP-0 unless multi-country tax logic is introduced.

### Stock Strategy

Stock is checked before checkout session creation.

Stock is decremented only after payment webhook, inside a transaction with order status update.

If stock is no longer available after payment, keep payment status paid, set fulfillment to `ON_HOLD`, and set `stockIssue = true`.

## Current Implementation Note

This memory bank records the agreed architecture target. If package versions in code drift from this document, a Reviewer must explicitly reconcile the difference before production deployment.
