# Mystery Box Store

France-first e-commerce MVP for selling premium-cute Mystery Boxes.

The goal of MVP-0 is to launch sales quickly with a focused storefront, Stripe Checkout, manual shipping operations, basic admin workflows, and an event foundation for future agents.

## Stack

| Area | Choice | Notes |
|---|---|---|
| Framework | Next.js 16.2.3 App Router | Modular monolith |
| Language | TypeScript | Strict mode |
| UI | Tailwind CSS | Mobile-first storefront |
| Database | Neon PostgreSQL | Serverless-friendly Postgres |
| ORM | Prisma | Typed data layer |
| Payments | Stripe Checkout | Checkout-only payment flow |
| Email | Resend | Transactional emails |
| Media | Cloudinary | Product image upload/storage |
| Hosting | Vercel | App hosting |
| Validation | Zod | API/server boundary validation |
| Analytics | GA4, Meta Pixel, TikTok Pixel | Consent-gated only |

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local` from `.env.example` and set:

```bash
DATABASE_URL=
NEXT_PUBLIC_APP_URL=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
RESEND_API_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

3. Generate Prisma Client:

```bash
npm run prisma:generate
```

4. Run migrations when database URL is ready:

```bash
npm run prisma:migrate
```

5. Seed starter data:

```bash
npm run prisma:seed
```

6. Start local dev server:

```bash
npm run dev
```

## MVP-0 Acceptance Criteria

- [ ] Admin can create and publish a product.
- [ ] Customer can open product listing and product detail pages.
- [ ] Customer can add product to client-side cart.
- [ ] Server recalculates product prices, stock, tax, shipping, and totals before checkout.
- [ ] Customer must accept CGV before Stripe Checkout.
- [ ] Stripe Checkout session can be created server-side.
- [ ] `/success` page never changes payment state.
- [ ] Stripe webhook verifies signature.
- [ ] Stripe webhook is idempotent through `WebhookEvent`.
- [ ] Paid webhook updates order payment status.
- [ ] Paid webhook decrements stock in a database transaction.
- [ ] Paid order appears in admin.
- [ ] Admin can update fulfillment status.
- [ ] Resend sends order paid email.
- [ ] Resend sends order shipped email.
- [ ] Resend sends order cancelled email.
- [ ] EventLog records core domain events.
- [ ] Cookie consent gates analytics pixels.
- [ ] Legal pages are final before real payments.

## Go-Live Blockers

Real payments must stay disabled until these are complete:

- Final CGV / Terms.
- Final Privacy Policy.
- Final Returns / Refund Policy.
- Final Shipping Policy.
- Final Mentions legales.
- Cookie notice and consent behavior.
- Stripe webhook endpoint verified in live mode.
- Real sender domain configured for Resend.
- Product photos and descriptions are production-ready.
- French storefront copy reviewed.

## Documentation

- `AGENTS.md`: main AI assistant rules.
- `roadmap.md`: staged delivery plan.
- `memory-bank/`: persistent project memory.
- `agents/`: role and skill rules for agents.
- `workflows/`: domain workflow specs.

Additional operational docs:

- `memory-bank/decisionLog.md`: accepted decisions and consequences.
- `memory-bank/openQuestions.md`: unresolved project questions.
- `memory-bank/dataDictionary.md`: domain fields and meanings.
- `workflows/go-live-checklist.md`: production readiness checklist.
- `workflows/testing-checklist.md`: manual and automated testing checklist.
