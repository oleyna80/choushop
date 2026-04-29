# Agent Skills

## Stripe Integration

Use Stripe Checkout only for MVP-0.

Checkout session creation:

- Validate payload with Zod.
- Read products and shipping methods from DB.
- Recalculate all prices server-side.
- Create pending order before Stripe session.
- Invalidate older pending orders for the same `cartId`.
- Pass `orderId`, `orderNumber`, and `cartId` in Stripe metadata.
- Use success URL with `session_id={CHECKOUT_SESSION_ID}`.
- Use cancel URL without business side effects.

Webhook handling:

- Read raw request body.
- Verify `stripe-signature`.
- Store/check event id in `WebhookEvent`.
- Handle `checkout.session.completed`.
- Update order only when `stripeCheckoutSessionId` matches.
- Mark webhook event processed after successful processing.

## Order Management

Core statuses:

- Payment: `PENDING`, `PAID`, `FAILED`, `REFUNDED`.
- Fulfillment: `UNFULFILLED`, `PROCESSING`, `PACKED`, `SHIPPED`, `DELIVERED`, `CANCELLED`, `ON_HOLD`.

Order lifecycle:

1. Pending order is created before Stripe Checkout.
2. Paid status is set only by webhook.
3. Admin moves fulfillment through processing states.
4. Tracking is added when shipped.
5. Cancelled paid orders trigger cancellation email.

Important:

- `invalidatedAt` means abandoned/replaced checkout, not customer cancellation.
- `CANCELLED` means a real order cancellation state.
- `ON_HOLD` means manual attention required.

## Email Sending

Provider: Resend.

Preferred templates: React Email.

MVP-0 triggers:

- `order.paid`: send payment confirmation.
- `order.shipped`: send tracking/shipping email.
- `order.cancelled`: send cancellation email for meaningful customer-visible cancellation.

Email rules:

- Do not send paid email from `/success`.
- Do not send duplicate emails for duplicate webhook deliveries.
- Use French customer-facing copy.
- Avoid sending email for invalidated pending orders.

## EventLog

Emit EventLog whenever domain state changes.

Event structure:

- `eventType`;
- `entityType`;
- `entityId`;
- `payloadJson`;
- `source`;
- `status`;
- `createdAt`.

Good payloads include identifiers, status snapshots, and safe contextual metadata.

Do not put secrets, API keys, or payment card data in EventLog.

## Admin Auth

Target approach for MVP-0:

- NextAuth credentials or email allowlist.
- `AdminUser` table stores email, role, last login.
- RBAC required for internal/admin actions.

Rules:

- Protect all admin pages before go-live.
- Protect all internal endpoints.
- Do not rely on hidden routes as security.
- Audit important admin mutations through EventLog.

## Cloudinary Upload

Target approach:

- Admin uploads images through a protected form.
- Server validates file metadata.
- Upload to Cloudinary.
- Store Cloudinary secure URL in `ProductImage.url`.
- Store alt text.
- Sort images with `sortOrder`.

Rules:

- Do not accept arbitrary remote image URLs from public users.
- Do not expose Cloudinary secret to client.
- Use Next.js image remote patterns for Cloudinary delivery.
- Snapshot product image URL into `OrderItem.productImageSnapshot`.
