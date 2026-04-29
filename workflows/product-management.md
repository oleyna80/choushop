# Product Management Workflow

## Goal

Define how admins create, edit, publish, unpublish, and manage stock for Mystery Box products.

## Product Types

MVP-0 supports:

- `FIXED_BOX`
- `THEME_BOX`
- `LIMITED_BOX`

MVP-0 does not support variants. Each sellable box is a separate product.

## Create Product

Owner: admin/server.

Required fields:

- slug;
- title;
- short description;
- description;
- type;
- price in cents;
- currency `EUR`;
- tax rate snapshot basis;
- stock;
- status.

Optional fields:

- theme;
- compare-at price;
- SKU;
- weight;
- SEO title;
- SEO description;
- featured flag.

Validation:

- Slug unique.
- Price is integer minor units.
- Currency is `EUR`.
- Stock is integer and cannot be negative.
- Type is one of allowed product types.
- Customer-facing text should be French.

DB operations:

- Create Product.
- Emit EventLog.

EventLog:

- `product.created`.

## Upload Images

Owner: admin/server/Cloudinary.

What happens:

- Admin uploads product image from protected form.
- Server validates file type and size.
- Server uploads to Cloudinary using secret credentials.
- Store Cloudinary secure URL in `ProductImage`.
- Store alt text.
- Store `sortOrder`.

Validation:

- Admin authenticated.
- Accepted image MIME types only.
- Size limit enforced.
- Alt text required before publish.

DB operations:

- Create or update ProductImage.
- Emit EventLog when product media changes.

EventLog:

- `product.updated`.

Forbidden:

- Do not expose Cloudinary API secret to client.
- Do not let public users upload product media.

## Publish Product

Owner: admin/server.

What happens:

- Admin changes status from `DRAFT` to `ACTIVE`.

Validation before publish:

- Title present.
- Short description present.
- Description present.
- Price > 0.
- Currency is EUR.
- At least one image.
- Stock > 0 unless intentionally publishing sold-out listing.
- SEO fields recommended.
- Legal/safety warning present when product may include small objects.

DB operations:

- Update Product status.
- Emit EventLog.

EventLog:

- `product.updated`.

## Edit Product

Owner: admin/server.

What happens:

- Admin edits content, price, stock, featured flag, SEO, or status.

Validation:

- Do not allow negative stock.
- Price is always minor units.
- Existing orders must keep snapshots; do not rewrite historical order items.

DB operations:

- Update Product.
- Emit EventLog.

EventLog:

- `product.updated`.

## Stock Management

Owner: admin/server/webhook.

Rules:

- Admin can manually adjust stock.
- Checkout checks stock but does not reserve it.
- Webhook decrements stock after payment.
- Stock decrement happens in transaction with order status update.
- If stock decrement fails after payment, order goes `ON_HOLD`.

Validation:

- Stock cannot be negative.
- Manual stock changes should be auditable.

EventLog:

- `product.updated` for manual stock changes.
- `order.paid` for webhook stock decrement.

## Unpublish Product

Owner: admin/server.

What happens:

- Admin sets status to `ARCHIVED` or `DRAFT`.

Effect:

- Product no longer appears in storefront listing.
- Existing order snapshots remain intact.
- Direct product page should return not found or unavailable state.

EventLog:

- `product.updated`.

## Delete Product

Default MVP-0 rule: avoid hard delete.

Use `ARCHIVED` instead.

Hard delete is allowed only if:

- product has no order items;
- admin explicitly confirms;
- images are handled safely.
