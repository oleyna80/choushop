# Order Processing Workflow

## Goal

Define how admins process paid orders from payment confirmation to shipping, delivery, cancellation, or hold.

## Status Model

Payment statuses:

- `PENDING`
- `PAID`
- `FAILED`
- `REFUNDED`

Fulfillment statuses:

- `UNFULFILLED`
- `PROCESSING`
- `PACKED`
- `SHIPPED`
- `DELIVERED`
- `CANCELLED`
- `ON_HOLD`

## State Machine

Allowed fulfillment transitions:

| From | To | Actor | Notes |
|---|---|---|---|
| `UNFULFILLED` | `PROCESSING` | Admin | Work started |
| `PROCESSING` | `PACKED` | Admin | Box packed |
| `PACKED` | `SHIPPED` | Admin | Tracking should be added |
| `SHIPPED` | `DELIVERED` | Admin/manual later | Delivery confirmed manually in MVP-0 |
| Any non-final | `CANCELLED` | Admin | Use for real cancellation |
| Any non-final | `ON_HOLD` | System/Admin | Manual attention required |
| `ON_HOLD` | `UNFULFILLED` | Admin | Issue resolved |
| `ON_HOLD` | `CANCELLED` | Admin | Issue cannot be resolved |

Final fulfillment statuses:

- `DELIVERED`
- `CANCELLED`

## Paid Order Entry Point

Owner: webhook.

What happens:

- Webhook confirms payment.
- Order payment status becomes `PAID`.
- Fulfillment status remains `UNFULFILLED` unless stock issue occurs.
- If stock issue occurs, fulfillment becomes `ON_HOLD`.
- Customer receives order paid email.

EventLog:

- `order.paid`.

Email:

- `order.paid` email.

## Admin Starts Processing

Owner: admin.

What happens:

- Admin opens order.
- Admin verifies paid status.
- Admin moves fulfillment from `UNFULFILLED` to `PROCESSING`.

Validation:

- Order must be paid.
- Order must not be invalidated.
- Order must not be cancelled.

DB operations:

- Update fulfillment status.
- Emit EventLog.

EventLog:

- `order.status_changed`.

Email:

- None by default.

## Admin Packs Order

Owner: admin.

What happens:

- Admin prepares products.
- Admin moves fulfillment from `PROCESSING` to `PACKED`.

Validation:

- Order must be paid.
- Order should be in `PROCESSING`.

DB operations:

- Update fulfillment status.
- Emit EventLog.

EventLog:

- `order.status_changed`.

Email:

- None by default.

## Admin Ships Order

Owner: admin.

What happens:

- Admin creates label outside the system in MVP-0.
- Admin adds carrier, method, tracking number, and tracking URL.
- Admin moves fulfillment to `SHIPPED`.
- Shipment status becomes `SHIPPED`.

Validation:

- Tracking data should be present when available.
- Order must be paid.
- Order must not have unresolved `stockIssue`.

DB operations:

- Upsert Shipment.
- Update Order fulfillment status.
- Emit EventLog.

EventLog:

- `shipment.created` or `shipment.updated`.
- `order.status_changed`.

Email:

- `order.shipped` email with tracking URL when present.

## Delivered

Owner: admin/manual.

What happens:

- Admin marks order delivered when confirmed.

Validation:

- Order should be shipped first.

DB operations:

- Update fulfillment status.
- Update Shipment deliveredAt/status.
- Emit EventLog.

EventLog:

- `shipment.updated`.
- `order.status_changed`.

Email:

- None by default for MVP-0.

## Cancellation

Owner: admin.

What happens:

- Admin marks order `CANCELLED` for real customer-visible cancellation.
- If order is paid, admin handles refund flow manually or through later Stripe integration.
- Customer receives cancellation email when meaningful.

Validation:

- Do not use `CANCELLED` for replaced pending checkout.
- Replaced pending checkout uses `invalidatedAt`.

DB operations:

- Update fulfillment status.
- Optionally update payment status when refund support is implemented.
- Emit EventLog.

EventLog:

- `order.cancelled`.
- `order.status_changed`.

Email:

- `order.cancelled` email.

## Stock Issue Hold

Owner: webhook/admin.

What happens:

- If webhook cannot decrement stock after payment, set:
  - `paymentStatus = PAID`;
  - `fulfillmentStatus = ON_HOLD`;
  - `stockIssue = true`;
  - `stockIssueReason`.

Admin resolution:

- Restock and move to `UNFULFILLED`.
- Substitute manually after customer agreement.
- Cancel/refund if unresolved.

EventLog:

- `order.paid` with `stockIssue = true`.
- Later `order.status_changed`.
