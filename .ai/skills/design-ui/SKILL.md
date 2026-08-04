---
name: design-ui
description: Convert an approved wireframe into a distinctive, production-ready FiveM visual design and complete screen specification. Use after wireframe-ui for new screens and major redesigns. Do not use for small CSS fixes or implementation of an already approved specification.
---

# Design UI

## Read
- `AGENTS.md`
- `.ai/rules/design.md`
- `.ai/rules/ui.md`
- `docs/design/design-system.md`
- Approved `docs/ui-spec/<screen>.md`
- Existing relevant components, if any
- `.ai/rules/assets.md` only when custom artwork is required

## Preconditions
- The screen specification contains a wireframe.
- `Wireframe status` is `Approved`.
- Information hierarchy, layout regions, flows, and state coverage are stable.

If these conditions are missing, return to `wireframe-ui` instead of hiding layout decisions inside visual styling.

## Workflow
1. Confirm the approved wireframe and implementation constraints.
2. Inspect the existing design system and any reusable components before proposing new patterns.
3. Commit to one clear aesthetic direction and one memorable visual idea that fits the feature.
4. Preserve the approved information hierarchy and region structure.
5. Define typography, palette roles, shape/depth, iconography, motion vocabulary, and anti-patterns.
6. Apply visual density, spacing rhythm, optical alignment, game-background readability, and responsive rules.
7. Keep dimensions tied to the approved 1440px-high source canvas and preserve source-design pixel measurements in the specification.
8. Map approved regions to concrete component needs and identify genuinely reusable components.
9. Define visual treatment for every applicable state.
10. Decide each visual element as CSS, SVG, raster artwork, audio, or streamed asset.
11. Update the screen specification and set `Visual design status: Review` or `Approved`.

## Responsive design handoff
All fixed design measurements must be documented as source pixel numbers from the 1440px-high design canvas. Implementation converts them using:

```css
property: calc(<design-pixel-number> * var(--px-to-vh));
```

Do not design a second independent breakpoint system unless the approved feature requires content-driven behavior. Percentage, flex/grid, viewport units, `min()`, `max()`, and `clamp()` remain valid when explicitly required by the approved layout.

## Quality bar
- The design must be intentional and context-specific, not a generic dashboard reskin.
- Visual creativity must not invalidate the approved wireframe, usability, implementation feasibility, or game readability.
- Do not use novelty to hide weak hierarchy.
- Do not write production implementation unless the task explicitly includes implementation.

## Output
Return the specification path, wireframe status, visual-design status, major visual decisions, new/reused component needs, required assets, responsive measurement notes, and unresolved decisions.
