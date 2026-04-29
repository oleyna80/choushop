# Go-Live Checklist

Real payments must remain disabled until this checklist is complete.

## Legal

- [ ] Mentions legales final.
- [ ] CGV final.
- [ ] Privacy Policy final.
- [ ] Returns / Refund Policy final.
- [ ] Shipping Policy final.
- [ ] Cookie notice final.
- [ ] CGV checkbox present before Stripe Checkout.
- [ ] Storefront prices shown in EUR TTC.
- [ ] Safety warnings present for small items where needed.

## Stripe

- [ ] Stripe account live mode ready.
- [ ] Stripe Checkout configured.
- [ ] Stripe webhook endpoint deployed.
- [ ] `STRIPE_WEBHOOK_SECRET` configured in production.
- [ ] Webhook signature verification tested.
- [ ] `checkout.session.completed` tested in live-like environment.
- [ ] `/success` verified read-only.
- [ ] `/cancel` verified no business side effects.
- [ ] Refund/manual cancellation policy documented.

## Database

- [ ] Neon production database created.
- [ ] `DATABASE_URL` configured in Vercel.
- [ ] Prisma migrations applied.
- [ ] Seed data reviewed or production products created manually.
- [ ] Backups or retention policy reviewed.

## Email

- [ ] Resend account configured.
- [ ] Sender domain verified.
- [ ] `EMAIL_FROM` production value configured.
- [ ] Order paid email tested.
- [ ] Order shipped email tested.
- [ ] Order cancelled email tested.
- [ ] Support email visible on contact/legal pages.

## Cloudinary

- [ ] Cloudinary account configured.
- [ ] API credentials stored only server-side.
- [ ] Product image upload tested.
- [ ] Next.js image remote pattern configured.
- [ ] Production product images uploaded.
- [ ] Alt text reviewed.

## Admin

- [ ] Admin authentication enabled.
- [ ] Admin RBAC enforced.
- [ ] Admin product creation tested.
- [ ] Admin order status update tested.
- [ ] Admin shipping/tracking update tested.
- [ ] Internal endpoints protected.

## Analytics and Consent

- [ ] Cookie consent implemented.
- [ ] GA4 loads only after consent.
- [ ] Meta Pixel loads only after consent.
- [ ] TikTok Pixel loads only after consent.
- [ ] Consent rejection path tested.
- [ ] No marketing cookies before consent.

## Storefront

- [ ] Home page reviewed in French.
- [ ] Shop page reviewed in French.
- [ ] Product pages reviewed in French.
- [ ] Cart flow tested on mobile.
- [ ] Checkout flow tested on mobile.
- [ ] FAQ reviewed.
- [ ] Contact page reviewed.
- [ ] Footer links complete.
- [ ] SEO metadata reviewed.
- [ ] Sitemap and robots reviewed.

## Production Environment

- [ ] Vercel project configured.
- [ ] Environment variables set.
- [ ] Production build passes.
- [ ] Domain configured.
- [ ] HTTPS active.
- [ ] Error monitoring configured if used.
- [ ] Rate limiting enabled for sensitive endpoints.

## Final Smoke Test

- [ ] Create product.
- [ ] Publish product.
- [ ] Add product to cart.
- [ ] Complete Stripe Checkout.
- [ ] Receive webhook.
- [ ] Order becomes paid.
- [ ] Stock decrements.
- [ ] Paid email arrives.
- [ ] Admin marks shipped.
- [ ] Shipped email arrives.
- [ ] EventLog contains expected events.
