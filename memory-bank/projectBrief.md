# Project Brief

## What We Are Building

Mystery Box Store is a France-first online shop for selling curated mystery boxes.

The MVP must let a customer browse boxes, add one or more products to cart, accept CGV, pay through Stripe Checkout, and let an admin process the paid order manually.

The project should launch sales quickly without building a heavy e-commerce platform.

## Business Model

The store sells three MVP product types:

1. Fixed Mystery Box
   - Predefined product concept.
   - Examples: Mini Box, Classic Box, Premium Box.

2. Theme-based Box
   - Box based on a mood or theme.
   - Examples: cute, pink, jewelry, kawaii, school accessories.

3. Limited / Seasonal Box
   - Limited drops and seasonal collections.
   - Examples: Valentine, Summer, Back to School, Birthday.

Future product types:

- Add-ons.
- Gift wrap.
- Gift note.
- Express processing.

These are not part of MVP-0.

## Target Market

- Primary market: France.
- Storefront language: French.
- Currency: EUR.
- Price display: TTC.
- Customer type: B2C.
- Shipping: fixed manual methods for France in MVP-0.

## Core User Flows

### Customer

1. Opens home or shop page.
2. Views product detail.
3. Adds product to cart.
4. Goes to checkout.
5. Enters shipping/contact data.
6. Accepts CGV.
7. Pays through Stripe Checkout.
8. Returns to success page.
9. Receives email after webhook confirms payment.

### Admin

1. Signs in to admin area.
2. Creates or edits products.
3. Uploads product images to Cloudinary.
4. Publishes or unpublishes products.
5. Reviews paid orders.
6. Updates fulfillment status.
7. Adds tracking data when shipped.
8. Cancels/refunds manually when needed.

### Future Agent

1. Reads EventLog.
2. Reads allowed order/product data through internal APIs.
3. Produces summaries, draft replies, internal notes, or documents.
4. Never directly mutates unrestricted production data.

## Main Constraints

- MVP-0 must stay small.
- No customer accounts.
- No ProductVariant engine.
- No promo code behavior.
- No custom payment flow.
- No separate backend.
- No direct agent DB write access.
- Legal pages are go-live blockers.
- Payment status is webhook-only.
- All business-critical validation is server-side.
