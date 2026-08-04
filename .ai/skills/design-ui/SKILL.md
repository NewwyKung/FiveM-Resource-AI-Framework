---
name: design-ui
description: Design a distinctive, production-ready FiveM UI screen or visual system before implementation. Use for new screens, redesigns, visual direction, layout, hierarchy, tokens, states, interactions, and asset planning. Do not use for small CSS fixes or implementing an already approved specification.
---

# Design UI

## Read
- `AGENTS.md`
- `.ai/rules/design.md`
- `.ai/rules/ui.md`
- `docs/design/design-system.md`
- `docs/ui-spec/TEMPLATE.md`
- Existing relevant components and screen specifications
- `.ai/rules/assets.md` only when custom artwork is required

## Workflow
1. Define purpose, users, gameplay context, data, technical constraints, and success criteria.
2. Inspect the existing design system and reusable components before proposing new patterns.
3. Commit to one clear aesthetic direction and one memorable visual idea that fits the feature.
4. Define information hierarchy before visual decoration.
5. Specify layout regions, screen coverage, grid, spacing, scroll ownership, and responsive behavior.
6. Define typography, palette roles, shape/depth, motion vocabulary, and anti-patterns.
7. Map the component tree and identify which components already exist.
8. Design applicable states: loading, default, empty, sparse, dense, selected, disabled, error, and destructive.
9. Define mouse, keyboard, focus, Escape, and recovery behavior.
10. Decide each visual element as CSS, SVG, raster artwork, audio, or streamed asset.
11. Produce or update `docs/ui-spec/<screen>.md` using the template.

## Quality bar
- The design must be intentional and context-specific, not a generic dashboard reskin.
- Creativity may break a grid visually, but usability, implementation feasibility, and game readability remain constraints.
- Do not use novelty to hide weak hierarchy.
- Do not write production implementation unless the task explicitly includes implementation.

## Output
Return the screen specification path, major design decisions, reused/new components, required assets, and unresolved product decisions.