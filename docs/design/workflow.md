# Design Workflow

Purpose: define the minimum Figma -> React -> Figma workflow for UI work in this repository.

## 1. Start From A Figma Link

1. Check `docs/design/figma.md` before starting any UI task.
2. Use the most specific Figma URL available: component, frame, page, then file.
3. Extract and record the Figma file key and node ID in the implementation brief.
4. Confirm the frame status: `draft`, `approved`, `implemented`, or `outdated`.
5. If the frame is not listed, add or request the missing reference before changing production UI.

## 2. Read Design Context With MCP

When a Figma URL is provided and MCP tools are available:

1. Call `mcp__figma__whoami` if OAuth/session status is unknown.
2. Call `mcp__figma__get_metadata` for structure, node names, and child frames.
3. Call `mcp__figma__get_design_context` for layout, styling, assets, and implementation context.
4. Call `mcp__figma__get_variable_defs` when variables or tokens may exist.
5. Call `mcp__figma__get_screenshot` when visual comparison is needed.

Read-only tools are the default for implementation work. Do not use write-capable Figma tools unless the user explicitly asks for Figma changes.

## 3. Produce An Implementation Brief

Before changing React/Tailwind code, write a concise brief in the task thread that includes:

- Figma file, page/frame, node ID, and source-of-truth status.
- Target React route, component, or feature area.
- Existing React components to reuse.
- Figma variables, styles, or components detected.
- Required states and breakpoints.
- Assets needed and where they come from.
- Assumptions, missing design context, and intentional deviations.

## 4. Implement React And Tailwind

1. Prefer existing components under `src/components` and existing feature patterns under `src/features`.
2. Keep storefront customer-facing copy in French.
3. Use Figma variables or existing project tokens before adding new visual values.
4. Keep the change scoped to the UI surface named in the brief.
5. Update `docs/design/component-map.md` when a Figma component maps to a React component.
6. Do not change commerce rules, pricing, checkout, stock, Stripe, or server behavior as part of visual implementation unless explicitly requested.

## 5. Verify With Screenshots

1. Run the app locally with the project-standard command.
2. Capture desktop and mobile screenshots for the changed surface.
3. Compare screenshots against the source-of-truth frame or written spec.
4. Use `docs/design/review-checklist.md` for visual, responsive, typography, spacing, color, and accessibility checks.
5. Record mismatches, accepted deviations, and unresolved design questions in the final report.

## 6. React Back To Figma

Write-capable Figma tools may be used only when the task explicitly asks to create, update, or sync Figma content.

Allowed write-capable workflow examples:

- Create a FigJam diagram for a documented flow.
- Add or update Code Connect mappings after user approval.
- Push a web capture into Figma when the task asks for a Figma artifact.
- Update a Figma design when the requested deliverable is a Figma change, not just React code.

For normal implementation tasks, the available workflow is Figma -> React. For explicit design sync tasks, the workflow can be Figma <-> React.

## 7. If Figma MCP Is Unavailable

- State that Figma MCP is unavailable in the current session.
- Use provided screenshots, exported assets, Figma web links, or written specs as static references.
- Do not claim exact layer, token, spacing, variable, or asset inspection from Figma.
- Ask for a screenshot or exported frame if the implementation depends on unavailable design details.
- Continue only with a safe MVP when the missing detail is non-blocking and assumptions are documented.
