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
- Existing relevant components
- `.ai/rules/assets.md` only when custom artwork is required

## Preconditions
- The screen specification contains a wireframe.
- `Wireframe status` is `Approved`.
- Information hierarchy, layout regions, flows, and state coverage are stable.

If these conditions are missing, return to `wireframe-ui` instead of hiding layout decisions inside visual styling.

## Workflow
1. Confirm the approved wireframe and implementation constraints.
2. Inspect the existing design system and reusable components before proposing new patterns.
3. Commit to one clear aesthetic direction and one memorable visual idea that fits the feature.
4. Preserve the approved information hierarchy and region structure.
5. Define typography, palette roles, shape/depth, iconography, motion vocabulary, and anti-patterns.
6. Apply visual density, spacing rhythm, optical alignment, game-background readability, and responsive rules.
7. Map approved components to concrete variants and identify genuinely new components.
8. Define visual treatment for every applicable state.
9. Decide each visual element as CSS, SVG, raster artwork, audio, or streamed asset.
10. Update the screen specification and set `Visual design status: Review` or `Approved`.

## Quality bar
- The design must be intentional and context-specific, not a generic dashboard reskin.
- Visual creativity must not invalidate the approved wireframe, usability, implementation feasibility, or game readability.
- Do not use novelty to hide weak hierarchy.
- Do not write production implementation unless the task explicitly includes implementation.

## Output
Return the specification path, wireframe status, visual-design status, major visual decisions, reused/new components, required assets, and unresolved decisions.
