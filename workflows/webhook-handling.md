# Stripe Webhook Handling

## Goal

Process Stripe events safely, idempotently, and without trusting client redirects.

## Supported MVP-0 Events

Required:

- `checkout.session.completed`

Optional later:

- `checkout.session.expired`
- `payment_intent.payment_failed`
- `charge.refunded`

## Handler Overview

Endpoint:

`POST /api/webhooks/stripe`

Runtime:

- Must support raw request body.

## Step 1: Read Raw Body

Owner: webhook route.

What happens:

- Read raw request text/body before JSON parsing.

Validation:

- `stripe-signature` header must exist.
- `STRIPE_WEBHOOK_SECRET` must be configured.

Errors:

- Missing header or secret returns 400.

## Step 2: Verify Signature

Owner: webhook route/Stripe SDK.

What happens:

- Use Stripe SDK `constructEvent`.
- Verify raw body with webhook secret and signature header.

Validation:

- If signature invalid, reject.

DB operations:

- None before signature verification.

Errors:

- Invalid signature returns 400.

Forbidden:

- Never parse and process webhook payload before signature verification.

## Step 3: Idempotency Check

Owner: webhook service/database.

What happens:

- Read Stripe event id.
- Check `WebhookEvent.providerEventId`.
- If already processed, return success without side effects.
- If new, create or upsert event row with payload.

DB operations:

- `WebhookEvent.findUnique`.
- `WebhookEvent.upsert`.

Errors:

- DB failure should return non-2xx so Stripe retries.

## Step 4: Route Event Type

Owner: webhook service.

What happens:

- Switch by event type.
- MVP-0 processes `checkout.session.completed`.
- Unknown supported-later events are stored and marked processed or ignored intentionally.

EventLog:

- Do not emit domain EventLog for ignored technical events unless useful.

## Step 5: Process `checkout.session.completed`

Owner: webhook service/database.

Required data:

- `session.id`;
- `session.metadata.orderId`;
- `session.metadata.orderNumber`;
- `session.payment_intent`.

Validation:

- `orderId` exists.
- Order exists.
- Order `stripeCheckoutSessionId` equals `session.id`.
- Order `invalidatedAt` is null.
- Order is not already paid.

DB operations:

- Load order with items.

Errors:

- Missing metadata: mark technical event handled only if there is nothing safe to do, or return error if operational attention is needed.
- Order not found: log and return success only if event cannot be recovered by retry.

## Step 6: DB Transaction

Owner: database/service.

Transaction contents:

1. Load matching order.
2. Skip if already paid.
3. For each order item:
   - decrement `Product.stock` only where `stock >= quantity`;
   - detect failed decrement.
4. If all stock updates succeed:
   - set `paymentStatus = PAID`;
   - set `fulfillmentStatus = UNFULFILLED`.
5. If any stock update fails:
   - set `paymentStatus = PAID`;
   - set `fulfillmentStatus = ON_HOLD`;
   - set `stockIssue = true`;
   - set `stockIssueReason`.
6. Store `stripePaymentIntentId`.
7. Emit `order.paid`.

EventLog:

- `order.paid`.

Important:

- Paid status remains paid even when stock issue exists.
- Admin resolves stock issue manually.

## Step 7: Send Email

Owner: email service.

What happens:

- Send `order.paid` email after successful transaction.

Rules:

- Do not send email inside transaction if avoidable.
- Do not send email for duplicate events.
- If email fails after DB success, log operational error. Do not roll back payment status.

## Step 8: Mark Webhook Processed

Owner: webhook service/database.

What happens:

- Set `WebhookEvent.processedAt`.

DB operations:

- Update WebhookEvent.

Errors:

- If marking processed fails after business processing, this can cause retry and duplicate attempts. Idempotent order checks must still prevent duplicate stock decrement.

## Retry Logic

Stripe retries non-2xx responses.

Return non-2xx when:

- signature cannot be verified;
- DB temporarily unavailable;
- transaction fails;
- event processing cannot safely complete.

Return 2xx when:

- duplicate processed event;
- unsupported event intentionally ignored;
- event processed successfully.

## Observability

Log:

- Stripe event id;
- event type;
- order id;
- duplicate state;
- processing result;
- stock issue result;
- email failure if any.

Never log:

- API keys;
- card data;
- full sensitive customer data beyond operational need.
