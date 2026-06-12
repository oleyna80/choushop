# Figma References

Purpose: track Figma files, pages, frames, source-of-truth decisions, and implementation status for the design-reference -> React workflow. Figma is one valid design reference; detailed design workflow and write-capable Figma tool rules live in `docs/design/workflow.md`.

## Figma Files

| Area | Figma file | URL | Status | Notes |
| --- | --- | --- | --- | --- |
| Team library | Dmitrii Oleinik's team library | https://figma.com/design/j2lOrqlS9SDxJB4bj6LrEs/Dmitrii-Oleinik-s-team-library?node-id=0-1&p=f&t=K0s0b0o3qZnptBe4-0 | `draft` | Current linked Figma file. Root node: `0:1`. |
| Storefront screens | TBD | TBD | `draft` | Add exact page/frame links before implementing storefront UI. |
| Admin screens | TBD | TBD | `draft` | Admin copy may remain English for MVP-0. |
| Shared components | TBD | TBD | `draft` | Use this area for reusable UI components, styles, and variables. |

## Pages And Frames

| Page or frame | Figma URL | Node ID | Source of truth | Status | React target | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Team library root | https://figma.com/design/j2lOrqlS9SDxJB4bj6LrEs/Dmitrii-Oleinik-s-team-library?node-id=0-1&p=f&t=K0s0b0o3qZnptBe4-0 | `0:1` | No | `draft` | TBD | Library/root context only until a concrete frame is approved. |
| Home page desktop | TBD | TBD | TBD | `draft` | `src/features/home` | Add approved frame link before implementation changes. |
| Home page mobile | TBD | TBD | TBD | `draft` | `src/features/home` | Required for responsive visual QA. |
| Product listing | TBD | TBD | TBD | `draft` | `src/features/catalog` | Must include filters, product cards, and empty/loading states when available. |
| Product detail | TBD | TBD | TBD | `draft` | `src/features/product` | Must include gallery, options, sticky buy UI, and stock states when available. |
| Cart | TBD | TBD | TBD | `draft` | `src/features/cart` | Must include empty cart and line item states when available. |
| Checkout | TBD | TBD | TBD | `draft` | `src/features/checkout` | Stripe Checkout entry only for MVP-0. |
| Admin dashboard | TBD | TBD | TBD | `draft` | `src/app/admin` | Desktop-first MVP admin surface. |

## Source Of Truth Rules

- A UI task should identify one approved design reference before coding.
- If Figma variables exist for color, spacing, typography, or radius, use them instead of inventing new tokens.
- A page-level frame is the source of truth for composition; component frames are the source of truth for reusable states and variants.
- If the linked frame is `draft`, it is not automatically approved for implementation.
- If the source status is unclear, ask the Owner before changing production UI.
- Keep outdated links for traceability, but do not implement from an `outdated` frame.
- Do not use write-capable Figma tools unless the task explicitly asks for Figma changes.

## Status Values

| Status | Meaning |
| --- | --- |
| `draft` | Exploratory design or incomplete source. It does not authorize implementation by itself. |
| `approved for implementation` | Approved source of truth for implementation. |
| `implemented` | React implementation exists and is ready for visual review. |
| `outdated` | No longer valid as implementation source. |
