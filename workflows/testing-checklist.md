# Testing Checklist

Use this checklist before merging or deploying meaningful changes.

## Automated Checks

- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `npm run build`
- [ ] `npx prisma validate`
- [ ] `npm run prisma:generate`

## Storefront Manual Checks

- [ ] `/` loads.
- [ ] `/shop` loads.
- [ ] Product page loads by slug.
- [ ] Product price displays EUR TTC.
- [ ] Sold-out product cannot be added to cart.
- [ ] Add to cart works.
- [ ] Cart persists after reload.
- [ ] Quantity update works.
- [ ] Remove from cart works.
- [ ] Checkout blocks empty cart.
- [ ] Checkout requires CGV acceptance.
- [ ] Checkout form validation works.
- [ ] Success page does not mutate payment state.
- [ ] Cancel page has no business side effects.

## Checkout Service Checks

- [ ] Rejects invalid Zod payload.
- [ ] Rejects unknown product ID.
- [ ] Rejects inactive product.
- [ ] Rejects insufficient stock before checkout.
- [ ] Rejects inactive shipping method.
- [ ] Rejects unsupported country.
- [ ] Recalculates unit price from DB.
- [ ] Recalculates subtotal from DB.
- [ ] Recalculates shipping from DB.
- [ ] Stores tax snapshot.
- [ ] Stores terms acceptance timestamp and version.
- [ ] Invalidates older pending order for same `cartId`.
- [ ] Creates Stripe session with order metadata.
- [ ] Emits `order.created`.
- [ ] Emits `checkout.started`.

## Stripe Webhook Checks

- [ ] Rejects missing signature.
- [ ] Rejects invalid signature.
- [ ] Stores new `WebhookEvent`.
- [ ] Returns success for duplicate processed event.
- [ ] Handles `checkout.session.completed`.
- [ ] Matches order by metadata and session id.
- [ ] Skips invalidated orders.
- [ ] Skips already paid orders.
- [ ] Decrements stock in transaction.
- [ ] Sets payment status to `PAID`.
- [ ] Sets fulfillment to `UNFULFILLED` when stock succeeds.
- [ ] Sets fulfillment to `ON_HOLD` when stock fails.
- [ ] Sets `stockIssue = true` when stock fails.
- [ ] Emits `order.paid`.
- [ ] Sends paid email once.
- [ ] Marks webhook processed.

## Admin Checks

- [ ] Admin routes require auth before go-live.
- [ ] Product creation validates required fields.
- [ ] Product publish requires production-ready fields.
- [ ] Product image upload stores Cloudinary URL.
- [ ] Product stock cannot go negative.
- [ ] Order list shows paid orders.
- [ ] Order status update emits EventLog.
- [ ] Mark shipped requires or accepts tracking data.
- [ ] Mark shipped sends shipped email.
- [ ] Cancel paid order sends cancellation email.
- [ ] Invalidated pending orders do not send customer email.

## Legal and Consent Checks

- [ ] CGV page is final.
- [ ] Privacy page is final.
- [ ] Returns page is final.
- [ ] Shipping page is final.
- [ ] Mentions legales page is final.
- [ ] Cookie banner appears before analytics scripts.
- [ ] Rejecting consent prevents marketing pixels.
- [ ] Accepting consent loads configured analytics.

## Regression Risks

Always retest these after checkout, order, or webhook changes:

- Duplicate Stripe webhook does not double-decrement stock.
- Duplicate Stripe webhook does not send duplicate paid email.
- `/success` never marks order paid.
- Client-side price tampering does not affect Stripe line items.
- Stock issue after payment puts order on hold, not failed.
