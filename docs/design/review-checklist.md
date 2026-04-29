# Design Review Checklist

Purpose: provide a minimal checklist for desktop visual QA, mobile visual QA, typography, spacing, colors, accessibility basics, and responsive behavior.

## Desktop Visual QA

- Layout matches the approved source-of-truth frame or documented implementation brief.
- Header, navigation, main content, footer, and sticky elements align to the expected grid.
- Images, product media, icons, and badges are correctly sized, cropped, and aligned.
- Primary commerce actions are visible and visually prioritized.
- Loading, empty, error, disabled, hover, active, and focus states are checked when relevant.
- French storefront copy is checked for visible customer-facing UI.

## Mobile Visual QA

- The mobile layout matches the approved source-of-truth mobile frame or documented brief.
- Content does not overlap, clip, or create unexpected horizontal scrolling.
- Navigation, filters, forms, dialogs, sticky bars, and bottom tabs remain usable.
- Touch targets are comfortable and do not sit too close together.
- Primary actions remain visible without blocking critical content.
- Long French labels, prices, and product names wrap cleanly.

## Typography

- Heading hierarchy is clear and matches the intended page structure.
- Font family, size, weight, line height, and text color follow Figma variables/styles when available.
- Text fits within its container across desktop and mobile.
- Product prices, labels, form text, and legal copy remain readable.
- Letter spacing is not changed unless the approved design requires it.

## Spacing

- Gaps, padding, margins, section rhythm, and alignment match the source frame or brief.
- Repeated items use consistent spacing across lists and grids.
- Cards, controls, media, and forms have stable dimensions and do not shift on hover or state changes.
- Mobile spacing preserves scanability without wasting vertical space.

## Colors

- Colors match Figma variables/styles when available.
- Text and controls have sufficient contrast.
- State colors for error, success, disabled, selected, and focus are distinguishable.
- Color is not the only signal for error, availability, selection, or progress.
- New color values are not introduced when an existing token or Figma variable is available.

## Accessibility Basics

- Semantic HTML is used for headings, buttons, links, forms, lists, and landmarks.
- Interactive elements are keyboard reachable and have visible focus states.
- Buttons and links have accessible names.
- Form fields have labels, validation messages, and useful error text.
- Images that convey meaning have useful alt text; decorative images use empty alt text.
- Dialogs, drawers, and menus have sensible focus behavior.

## Responsive Behavior

- Desktop and mobile screenshots are captured for each changed surface.
- Tablet behavior is checked when the layout changes between mobile and desktop.
- Breakpoints preserve content order, action visibility, and form usability.
- Product grids, galleries, checkout summaries, and cart line items adapt without layout jumps.
- Sticky or fixed UI does not cover checkout actions, form fields, cookie consent, or legal links.
