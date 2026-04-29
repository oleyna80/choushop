# Data Dictionary

This file defines core domain entities and important fields in plain language.

## Product

Sellable Mystery Box.

| Field | Meaning |
|---|---|
| `id` | Internal product identifier |
| `slug` | Public URL identifier |
| `title` | Customer-facing product name |
| `shortDescription` | Short storefront summary |
| `description` | Full product description |
| `type` | `FIXED_BOX`, `THEME_BOX`, or `LIMITED_BOX` |
| `theme` | Mood/theme label such as pink, kawaii, school |
| `price` | Unit price in cents, EUR TTC |
| `compareAtPrice` | Optional previous price in cents |
| `currency` | Always `EUR` in MVP-0 |
| `taxRate` | Tax rate basis points used for snapshots |
| `status` | Draft, active, or archived |
| `featured` | Whether product is highlighted |
| `stock` | Available inventory count |
| `sku` | Optional stock keeping unit |
| `weight` | Optional weight in grams |

## ProductImage

Image attached to product.

| Field | Meaning |
|---|---|
| `url` | Cloudinary secure URL |
| `alt` | Alt text for accessibility |
| `sortOrder` | Gallery ordering |

## ShippingMethod

Manual fixed shipping method.

| Field | Meaning |
|---|---|
| `name` | Customer-facing method name |
| `description` | Optional explanation |
| `price` | Shipping price in cents |
| `currency` | Always `EUR` in MVP-0 |
| `zone` | `FR` or `EU` |
| `countries` | Postgres text array of ISO country codes |
| `isActive` | Whether checkout may use the method |
| `sortOrder` | Display ordering |

## Order

Customer order created before Stripe Checkout.

| Field | Meaning |
|---|---|
| `orderNumber` | Human-readable order reference |
| `cartId` | Client cart identifier used to invalidate older pending orders |
| `customerEmail` | Customer checkout email |
| `customerName` | Customer checkout name |
| `phone` | Optional customer phone |
| `shippingAddressJson` | Shipping address snapshot |
| `billingAddressJson` | Optional billing address snapshot |
| `paymentStatus` | Payment state: `PENDING`, `PAID`, `FAILED`, `REFUNDED` |
| `fulfillmentStatus` | Operational state: `UNFULFILLED`, `PROCESSING`, `PACKED`, `SHIPPED`, `DELIVERED`, `CANCELLED`, `ON_HOLD` |
| `subtotal` | Product subtotal in cents |
| `shippingAmount` | Shipping price in cents |
| `taxAmount` | Tax amount included in TTC total |
| `taxRateSnapshot` | Tax rate basis points used at order time |
| `discountCode` | Reserved for MVP-1 promo code support |
| `discountAmount` | Reserved discount amount, zero in MVP-0 |
| `totalAmount` | Final total in cents |
| `stripeCheckoutSessionId` | Stripe Checkout session id |
| `stripePaymentIntentId` | Stripe payment intent id after confirmation |
| `checkoutExpiresAt` | Stripe checkout session expiry |
| `invalidatedAt` | Pending order replaced by a newer checkout attempt |
| `termsAcceptedAt` | Timestamp of CGV acceptance |
| `termsVersion` | CGV version accepted by customer |
| `stockIssue` | Paid order needs manual stock attention |
| `stockIssueReason` | Explanation for stock issue |

## OrderItem

Snapshot of a product at order time.

| Field | Meaning |
|---|---|
| `productId` | Linked product when still available |
| `productTitleSnapshot` | Product title at purchase time |
| `productImageSnapshot` | Product image URL at purchase time |
| `unitPrice` | Unit price in cents at purchase time |
| `quantity` | Ordered quantity |
| `totalPrice` | Unit price multiplied by quantity |
| `taxRateSnapshot` | Item tax rate basis points at purchase time |

## Shipment

Manual fulfillment tracking.

| Field | Meaning |
|---|---|
| `status` | `CREATED`, `SHIPPED`, `DELIVERED`, or `CANCELLED` |
| `carrier` | Carrier name |
| `method` | Shipping method name |
| `trackingNumber` | Carrier tracking number |
| `trackingUrl` | Customer tracking URL |
| `shippedAt` | Shipment date |
| `deliveredAt` | Delivery date |

## EventLog

Domain event log for audit and future agents.

| Field | Meaning |
|---|---|
| `eventType` | Domain event name |
| `entityType` | Affected entity type |
| `entityId` | Affected entity id |
| `payloadJson` | Structured event payload |
| `source` | Source system or actor |
| `status` | Event processing status |

## WebhookEvent

Stripe webhook idempotency record.

| Field | Meaning |
|---|---|
| `provider` | External provider, usually `stripe` |
| `providerEventId` | Unique Stripe event id |
| `eventType` | Stripe event type |
| `payloadJson` | Raw or normalized webhook payload |
| `processedAt` | Timestamp when business processing completed |

## AdminUser

Admin account record.

| Field | Meaning |
|---|---|
| `email` | Admin email |
| `role` | `OWNER`, `ADMIN`, or `OPERATOR` |
| `lastLoginAt` | Last admin login timestamp |
