# System Patterns

## Repository Pattern

Database access should be isolated behind repositories where repeated query logic appears.

Do not scatter complex Prisma queries across components and route handlers.

Expected repository areas:

- products;
- orders;
- shipping;
- events;
- webhooks.

## Service Layer

Business logic belongs in services, not React components or route handlers.

Expected services:

- checkout service;
- order service;
- shipping service;
- event service;
- webhook service;
- email service.

Route handlers should validate input, call services, and return responses.

## EventLog

Every important domain state change emits an EventLog record.

Minimum events:

- `product.created`;
- `product.updated`;
- `checkout.started`;
- `order.created`;
- `order.paid`;
- `order.status_changed`;
- `shipment.created`;
- `shipment.updated`;
- `order.cancelled`.

Event payloads must be structured JSON and safe for future agent reads.

## Zod Validation

Use Zod at all external and internal boundaries:

- public API requests;
- internal API requests;
- admin form actions;
- webhook metadata assumptions;
- env validation when added.

Never trust client payload shape or values.

## Stripe Webhook Idempotency

Use `WebhookEvent` table:

1. Verify Stripe signature.
2. Read event id.
3. Check if event already processed.
4. Upsert received webhook event.
5. Process supported event.
6. Mark event processed.

Repeated webhook delivery must not duplicate stock decrement, status changes, emails, or EventLog entries.

## Stock Transaction

Paid webhook handling must update stock and order state in one DB transaction:

1. Load order by `orderId` and `stripeCheckoutSessionId`.
2. Ensure order is not invalidated.
3. Ensure order is not already paid.
4. For each order item, decrement product stock only if `stock >= quantity`.
5. If any decrement fails, set stock issue and fulfillment `ON_HOLD`.
6. Set payment status `PAID`.
7. Emit `order.paid`.

## Success Page Pattern

`/success?session_id={CHECKOUT_SESSION_ID}`:

- reads order by Stripe checkout session id;
- shows paid, processing, or not-found state;
- never mutates order;
- never sends email;
- never decrements stock.

## Admin Mutation Pattern

Admin mutations must:

- authenticate user;
- authorize role;
- validate payload with Zod;
- call service layer;
- emit EventLog;
- return a typed result or redirect.

## Agent Access Pattern

Future agents may read data and propose actions through internal APIs or tools.

Agents must not get unrestricted direct write access to production database tables.
