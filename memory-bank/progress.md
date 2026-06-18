# Progress

Status values:

- `not started`
- `in progress`
- `done`

## Models

| Feature | Status | Notes |
|---|---|---|
| Product | in progress | Core fields required for MVP-0 |
| ProductImage | in progress | Cloudinary URL snapshots needed |
| ShippingMethod | in progress | Use `countries String[] @db.Text` |
| Order | in progress | Include TTC tax snapshots and CGV acceptance |
| OrderItem | in progress | Include title/image/price/tax snapshots |
| Shipment | in progress | Include status and tracking fields |
| EventLog | in progress | Required for agent-ready foundation |
| WebhookEvent | in progress | Required for Stripe idempotency |
| AdminUser | in progress | Auth/RBAC still pending |
| Customer | not started | Out of MVP-0 |
| DiscountCode | not started | MVP-1 |
| DiscountUsage | not started | MVP-1 |

## API Endpoints

| Endpoint | Status | Notes |
|---|---|---|
| `GET /api/products` | in progress | Public product listing |
| `GET /api/products/[slug]` | in progress | Public product detail |
| `POST /api/checkout/session` | in progress | Must validate with Zod and recalc server-side |
| `POST /api/webhooks/stripe` | in progress | Signature + idempotency required |
| `GET /api/internal/orders` | in progress | Requires auth/RBAC before go-live |
| `PATCH /api/internal/orders/[id]/status` | in progress | Must emit EventLog |
| `GET /api/internal/products` | in progress | Requires auth/RBAC before go-live |
| `POST /api/internal/products` | in progress | Requires auth/RBAC before go-live |
| `GET /api/internal/events` | in progress | Read-only event log |

## Storefront Pages

| Page | Status | Notes |
|---|---|---|
| `/` | done | Candy Cloud homepage implemented from brief/sketch as componentized pastel storefront |
| `/catalog` | done | Candy Cloud catalog with mock products, style filters, product cards, and add-to-cart |
| `/products/[slug]` | done | Candy Cloud product detail with visual gallery, style choice, trust cues, and cart CTA |
| `/cart` | done | Client-side Vinted request cart with style-aware line items and indicative total |
| `/order` | done | Prototype request form; no card payment or backend order submission |
| `/order/success` | done | Prototype confirmation page; explicitly no real request was sent |
| `/shop` | done | Redirect alias to `/catalog` |
| `/product/[slug]` | done | Redirect alias to `/products/[slug]` |
| `/checkout` | done | Redirect alias to `/order` |
| `/success` | done | Redirect alias to `/order/success` |
| `/cancel` | done | Non-finalized request UX, no payment wording |
| `/design` | done | Design-system reference page for Candy Cloud components |
| `/faq` | in progress | Final copy pending |
| `/contact` | in progress | Final support email pending |
| `/legal` | in progress | Go-live blocker |
| `/privacy` | in progress | Go-live blocker |
| `/terms` | in progress | Go-live blocker |
| `/shipping-returns` | in progress | Go-live blocker |

## Admin Pages

| Page | Status | Notes |
|---|---|---|
| `/admin` | in progress | Shell only until auth is final |
| `/admin/products` | in progress | CRUD forms pending |
| `/admin/orders` | in progress | Status update UI pending |
| `/admin/shipping` | in progress | Shipping management UI pending |
| `/admin/events` | in progress | Read-only event table |
| `/admin/customers` | not started | Out of MVP-0 |
| `/admin/discounts` | not started | MVP-1 |
| `/admin/analytics` | not started | MVP-1 or later |

## Services

| Service | Status | Notes |
|---|---|---|
| Checkout service | in progress | Server recalculation and Stripe session |
| Order service | in progress | Status changes and order number |
| Shipping service | in progress | Fixed method lookup |
| Event service | in progress | EventLog writer |
| Stripe webhook service | in progress | Idempotency and stock transaction |
| Email service | in progress | Paid/shipped/cancelled triggers |
| Admin auth service | not started | Needed before go-live |
| Cloudinary upload service | not started | Needed for product management |
| Rate limiting | not started | Needed for sensitive endpoints |

## Integrations

| Integration | Status | Notes |
|---|---|---|
| Neon PostgreSQL | not started | Real database URL pending |
| Stripe Checkout | in progress | Test keys pending |
| Stripe Webhooks | in progress | Local CLI/live endpoint pending |
| Resend | in progress | Domain and API key pending |
| Cloudinary | not started | Upload preset/config pending |
| Vercel | not started | Deployment pending |
| GA4 | not started | Consent-gated only |
| Meta Pixel | not started | Consent-gated only |
| TikTok Pixel | not started | Consent-gated only |

## Legal Pages

| Page | Status | Notes |
|---|---|---|
| CGV / Terms | in progress | Must be final before real payments |
| Privacy Policy | in progress | Must be final before real payments |
| Returns / Refund Policy | in progress | Must be final before real payments |
| Shipping Policy | in progress | Must be final before real payments |
| Mentions legales | in progress | Must be final before real payments |
| Cookie notice / consent | not started | Required before analytics pixels |

## Documentation and Agent Infrastructure

| Document | Status | Notes |
|---|---|---|
| `AGENTS.md` | done | Main project instructions, strict rules, orchestration mode |
| `README.md` | done | Overview, stack, setup, acceptance criteria, go-live blockers |
| `roadmap.md` | done | MVP-0 through MVP-3 roadmap and accepted decisions |
| `memory-bank/projectBrief.md` | done | Product scope, market, flows, constraints |
| `memory-bank/productContext.md` | done | Product purpose, UX feel, conversion principles |
| `memory-bank/techContext.md` | done | Locked/open technical decisions |
| `memory-bank/systemPatterns.md` | done | Service, repository, EventLog, Zod, idempotency patterns |
| `memory-bank/activeContext.md` | done | Current handoff context; update after every session |
| `memory-bank/progress.md` | done | MVP-0 feature status tracker |
| `memory-bank/decisionLog.md` | done | Accepted decision history |
| `memory-bank/openQuestions.md` | done | Open blockers and unresolved questions |
| `memory-bank/dataDictionary.md` | done | Domain model field definitions |
| `agents/rules.md` | done | General, coding, domain, forbidden, role rules |
| `agents/skills.md` | done | Stripe, orders, email, EventLog, auth, Cloudinary skills |
| `workflows/checkout-flow.md` | done | Checkout workflow |
| `workflows/order-processing.md` | done | Admin order processing workflow |
| `workflows/product-management.md` | done | Product/admin workflow |
| `workflows/webhook-handling.md` | done | Stripe webhook workflow |
| `workflows/go-live-checklist.md` | done | Production readiness checklist |
| `workflows/testing-checklist.md` | done | Manual and automated testing checklist |
