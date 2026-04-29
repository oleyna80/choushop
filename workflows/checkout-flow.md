# Checkout Flow

## Goal

Convert a client-side cart into a Stripe Checkout session while keeping all business-critical calculations on the server.

## Actors

- Client: browser and local cart.
- Server: Next.js route handler and services.
- Database: Neon PostgreSQL through Prisma.
- Stripe: hosted Checkout.
- Webhook: Stripe event receiver.

## Step-by-Step Flow

### 1. Client Builds Cart

Owner: client.

What happens:

- Customer adds product IDs and quantities to local cart.
- Cart has stable `cartId` generated client-side.
- Cart stores product IDs and quantities only.

Validation:

- UI may prevent invalid quantities.
- UI validation is convenience only.

DB operations:

- None.

EventLog:

- Optional `cart.updated` only if server-side cart events are later added.

Errors:

- Missing localStorage: keep cart in memory for session where possible.

### 2. Customer Opens Checkout

Owner: client.

What happens:

- Customer enters email, name, phone, and shipping address.
- Customer selects shipping method.
- Customer accepts CGV.

Validation:

- Required form fields.
- Email format.
- CGV checkbox required.

DB operations:

- None yet.

EventLog:

- None.

Errors:

- Missing CGV acceptance blocks checkout.
- Empty cart blocks checkout.

### 3. Client Requests Checkout Session

Owner: client/server.

Request:

`POST /api/checkout/session`

Payload:

- `cartId`;
- `items`;
- `customer`;
- `shippingAddress`;
- `shippingMethodId`;
- `termsAccepted`;
- `termsVersion`.

Validation:

- Route handler validates payload with Zod.
- Reject if `termsAccepted !== true`.
- Reject invalid item quantity.

DB operations:

- None in route handler before service call.

EventLog:

- None in route handler.

Errors:

- Return 400 for invalid payload.

### 4. Server Recalculates Cart

Owner: server.

What happens:

- Read product IDs from request.
- Load active products from DB.
- Load selected active shipping method by country.
- Recalculate:
  - unit prices;
  - subtotal;
  - shipping;
  - discount amount;
  - tax amount;
  - total.

Validation:

- Product exists.
- Product status is active.
- Product stock is sufficient at this moment.
- Shipping method is active.
- Shipping method supports destination country.
- Currency is EUR.

DB operations:

- Product read.
- ShippingMethod read.

EventLog:

- None yet.

Errors:

- Product missing or inactive: 400.
- Insufficient stock: 400.
- Shipping method invalid: 400.

### 5. Server Creates Pending Order

Owner: server/database.

What happens:

- In one transaction:
  - invalidate older pending orders for same `cartId` by setting `invalidatedAt`;
  - create new `Order`;
  - create `OrderItem` snapshots;
  - store `termsAcceptedAt`;
  - store `termsVersion`;
  - store TTC tax snapshot;
  - emit `order.created`.

Validation:

- No client prices are used.
- Order total must be derived from DB data only.

DB operations:

- `Order.updateMany` for older pending orders.
- `Order.create`.
- `OrderItem.create`.
- `EventLog.create`.

EventLog:

- `order.created`.

Errors:

- Transaction failure returns 500.

### 6. Server Creates Stripe Checkout Session

Owner: server/Stripe.

What happens:

- Create Stripe Checkout Session.
- Pass order metadata:
  - `orderId`;
  - `orderNumber`;
  - `cartId`.
- Set success URL:
  - `/success?session_id={CHECKOUT_SESSION_ID}`.
- Set cancel URL:
  - `/cancel`.

Validation:

- Stripe line items use server-calculated prices.
- Stripe tax behavior should match TTC strategy.

DB operations:

- Update order with `stripeCheckoutSessionId`.
- Update `checkoutExpiresAt`.
- Emit `checkout.started`.

EventLog:

- `checkout.started`.

Errors:

- If Stripe session creation fails, order remains pending and can be invalidated by next checkout attempt.

### 7. Client Redirects To Stripe

Owner: client/Stripe.

What happens:

- Browser redirects to Stripe-hosted Checkout.
- Stripe handles payment method, SCA, and payment confirmation.

Validation:

- Stripe validates payment details.

DB operations:

- None.

EventLog:

- None.

Errors:

- Customer cancels: Stripe redirects to `/cancel`.
- Payment failure: Stripe remains source of truth through events.

### 8. Success Redirect

Owner: client/server.

What happens:

- Stripe redirects to `/success?session_id=...`.
- Page reads order by `stripeCheckoutSessionId`.
- Page shows:
  - confirmed if already paid;
  - processing if webhook has not arrived;
  - fallback support message if not found.

Validation:

- `session_id` is used only for lookup.

DB operations:

- Read only.

EventLog:

- None.

Errors:

- Missing session id: show neutral support state.

### 9. Stripe Webhook Confirms Payment

Owner: webhook/server/database.

What happens:

- Webhook handles `checkout.session.completed`.
- Verifies signature.
- Checks idempotency.
- Finds matching order.
- Updates payment status to paid.
- Decrements stock.
- Emits event.
- Sends email.

Validation:

- Signature valid.
- Event not already processed.
- `orderId` exists in metadata.
- `stripeCheckoutSessionId` matches order.
- Order not invalidated.

DB operations:

- `WebhookEvent.upsert`.
- Transaction:
  - stock decrement;
  - order status update;
  - EventLog create.
- Mark WebhookEvent processed.

EventLog:

- `order.paid`.

Errors:

- Duplicate event: return success without duplicate effects.
- Insufficient stock after payment: set `stockIssue = true`, fulfillment `ON_HOLD`.
- Temporary processing error: return non-2xx so Stripe retries.
