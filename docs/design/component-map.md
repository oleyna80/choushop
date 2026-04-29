# Component Map

Purpose: map Figma components and frames to React components, repository paths, implementation status, and review notes.

## Figma To React Map

| Figma component | React component | Path in repo | Status | Notes |
| --- | --- | --- | --- | --- |
| TBD: Button | `Button` | `src/components/ui/button.tsx` | `implemented` | Confirm variants against Figma before changing tokens. |
| TBD: Input | `Input` | `src/components/ui/input.tsx` | `implemented` | Confirm focus, error, disabled, and mobile behavior. |
| TBD: Select | `Select` | `src/components/ui/select.tsx` | `implemented` | Confirm native/select styling against Figma. |
| TBD: Badge | `Badge` | `src/components/ui/badge.tsx` | `implemented` | Confirm color variants before adding new status styles. |
| TBD: Card | `Card` | `src/components/ui/card.tsx` | `implemented` | Use sparingly; do not nest cards. |
| TBD: Price | `Price` | `src/components/ui/price.tsx` | `implemented` | EUR TTC display only. |
| TBD: Quantity stepper | `QuantityStepper` | `src/components/ui/quantity-stepper.tsx` | `implemented` | Confirm button sizes and mobile touch targets. |
| TBD: Site header | `SiteHeader` | `src/components/layout/site-header.tsx` | `implemented` | Needs Figma source for desktop/mobile navigation. |
| TBD: Mobile tab bar | `MobileTabBar` | `src/components/layout/mobile-tab-bar.tsx` | `implemented` | Needs mobile frame review. |
| TBD: Site footer | `SiteFooter` | `src/components/layout/site-footer.tsx` | `implemented` | Confirm legal/navigation content against approved copy. |
| TBD: Product card | `ProductCard` | `src/components/shop/product-card.tsx` | `implemented` | Confirm image ratio, price treatment, and stock state. |
| TBD: Product grid | `ProductGrid` | `src/components/shop/product-grid.tsx` | `implemented` | Confirm responsive grid and empty/loading states. |
| TBD: Product gallery | `ProductGallery` | `src/components/shop/product-gallery.tsx` | `implemented` | Confirm media behavior and thumbnail states. |
| TBD: Add to cart | `AddToCartButton` | `src/components/shop/add-to-cart-button.tsx` | `implemented` | Confirm disabled/loading states. |
| TBD: Cart line item | `CartLineItem` | `src/components/shop/cart-line-item.tsx` | `implemented` | Confirm quantity, price, remove, and mobile layout. |
| TBD: Order summary | `OrderSummaryCard` | `src/components/shop/order-summary-card.tsx` | `implemented` | Totals must remain server-authoritative for checkout. |
| TBD: Home hero | `HomeHero` | `src/features/home/home-hero.tsx` | `implemented` | Needs approved hero frame and asset source. |
| TBD: Checkout step indicator | `CheckoutStepIndicator` | `src/features/checkout/checkout-step-indicator.tsx` | `implemented` | Confirm step labels and mobile layout. |
| TBD: Admin shell | `AdminShell` | `src/components/admin/admin-shell.tsx` | `implemented` | Admin language may be English for MVP-0. |

## Status Values

| Status | Meaning |
| --- | --- |
| `planned` | Expected component or frame, no React target confirmed yet. |
| `mapped` | Figma source and React target are identified. |
| `implemented` | React component exists. |
| `reviewed` | Component has passed visual review against Figma. |
| `outdated` | Mapping should not be used until corrected. |

## Unmapped Or Missing Sources

| Area | Needed for | Source design | Notes |
| --- | --- | --- | --- |
| Storefront screen frames | Page-level layout QA | TBD | Add desktop and mobile source-of-truth frames. |
| Component variants | Reusable UI state QA | TBD | Add Figma component links for hover, active, disabled, empty, loading, and error states. |
| Design variables | Token alignment | TBD | Use `get_variable_defs` when a concrete frame or library node is available. |
