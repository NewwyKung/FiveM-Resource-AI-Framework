---
name: wireframe-ui
description: Define and validate a low-fidelity FiveM UI layout before visual design or implementation. Use for every new screen and major redesign. Skip only for small changes to an approved screen.
---

# Wireframe UI

## Read
- `AGENTS.md`
- `.ai/rules/design.md`
- `.ai/rules/ui.md`
- `docs/ui-spec/TEMPLATE.md`
- Relevant feature registry and existing screen/component files

## Goal
Resolve information architecture, layout, density, interaction flow, and responsive behavior without spending effort on final colors, imagery, shadows, or decorative styling.

## Workflow
1. Define the player's primary task, gameplay context, entry point, exit path, data, and constraints.
2. Rank information and actions as primary, secondary, supporting, and destructive.
3. Draft low-fidelity regions using boxes, labels, dimensions, and flow arrows.
4. Specify viewport, safe area, maximum screen coverage, scroll ownership, and overlay behavior.
5. Map the component tree and reuse candidates without choosing final visual variants.
6. Cover loading, default, empty, sparse, dense, selected, disabled, error, modal, and closed states as applicable.
7. Define mouse, keyboard, focus, Escape, drag/drop, and recovery flows.
8. Test the wireframe against representative and worst-case Thai content.
9. Record unresolved product decisions and implementation constraints.
10. Update `docs/ui-spec/<screen>.md` and set `Wireframe status: Review`.

## Approval gate
Do not proceed to final visual design or implementation until the wireframe status is `Approved`, unless the user explicitly combines phases and accepts the risk.

## Output
- Screen-specification path
- Wireframe status
- Region diagram or structured layout description
- Primary user flow
- Component reuse map
- State coverage
- Unresolved decisions
