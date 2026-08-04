---
name: implement-ui
description: Implement an approved FiveM UI design or screen specification in Svelte without redesigning it. Use when layout, hierarchy, states, and visual direction are already defined.
---

# Implement UI

## Read
- `AGENTS.md`
- `.ai/rules/design.md`
- `.ai/rules/ui.md`
- `.ai/rules/testing.md`
- `.ai/rules/engineering-quality.md`
- `.ai/recipes/README.md` — NUI screen recipe only
- Approved `docs/ui-spec/<screen>.md`
- `docs/design/design-system.md`
- `ui/src/js/NuiBridge.js`
- Relevant existing components, tokens, bridge code, and assets

## Workflow
1. Confirm the specification status and identify measurable acceptance criteria.
2. Inspect and reuse existing components before adding new ones.
3. Separate presentation, state, NUI transport, validation, and asset concerns.
4. Implement semantic structure and keyboard/focus behavior first.
5. Apply approved tokens, spacing, typography, depth, and motion; do not invent silent overrides.
6. Convert 1440px design measurements with the canonical responsive system from `ui/src/app.css`.
7. Implement all applicable states and recovery paths from the specification.
8. Add code-driven browser scenarios with `NuiDebug.js` for representative states; do not build a debug-menu UI unless requested.
9. Use `NuiBridge.js` for callbacks, normalized messages, disposable listeners, and Escape behavior instead of creating feature-specific bridge helpers.
10. Verify callback errors, Escape, close, focus return, listener disposal, and resource-stop cleanup.
11. Build the UI and capture representative screenshots when tooling is available.

## Responsive implementation rule

Use:

```css
property: calc(<design-pixel-number> * var(--px-to-vh));
```

Example:

```css
width: calc(123 * var(--px-to-vh));
padding: calc(24 * var(--px-to-vh));
font-size: calc(20 * var(--px-to-vh));
```

The number represents pixels from the 1440px-high source design but must be unitless. Never write `123px * var(--px-to-vh)` and never multiply `var(--scale)` again because `--px-to-vh` already includes it.

Use percentage, flex/grid sizing, viewport units, `min()`, `max()`, or `clamp()` only when the approved specification calls for content-driven or viewport-driven behavior.

## Constraints
- Do not edit generated `html/` files directly.
- Do not replace interactive layout with a full-screen image.
- Do not bake localized or dynamic text into artwork.
- Do not redesign approved decisions during implementation; record discrepancies or request a spec update.
- Avoid new dependencies unless the approved design cannot be implemented reasonably without one.
- Do not copy UI components, Tailwind configuration, or visual design from external templates unless explicitly approved.
- Do not create a second NUI transport abstraction when `NuiBridge.js` supports the required operation.

## Completion
Report changed files, states covered, browser scenarios added, validation performed, screenshots produced, deviations from the specification, and checks that could not run.