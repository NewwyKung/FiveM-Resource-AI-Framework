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
- Relevant feature registry and existing screen files

## Goal
Resolve information architecture, layout, density, interaction flow, and responsive behavior without spending effort on final colors, imagery, shadows, or decorative styling.

## Workflow
1. Define the player's primary task, gameplay context, entry point, exit path, data, and constraints.
2. Rank information and actions as primary, secondary, supporting, and destructive.
3. Draft low-fidelity regions using boxes, labels, dimensions, and flow arrows.
4. Use a 1440px-high design canvas as the measurement source unless the approved specification explicitly defines another source canvas.
5. Record design measurements as pixel numbers in the wireframe, knowing implementation will convert them with `calc(<number> * var(--px-to-vh))`.
6. Specify viewport, safe area, maximum screen coverage, scroll ownership, and overlay behavior.
7. Map the component tree and reuse candidates without choosing final visual variants.
8. Cover loading, default, empty, sparse, dense, selected, disabled, error, modal, and closed states as applicable.
9. Define mouse, keyboard, focus, Escape, drag/drop, and recovery flows.
10. Test the wireframe against representative and worst-case Thai content.
11. Record unresolved product decisions and implementation constraints.
12. Update `docs/ui-spec/<screen>.md` and set `Wireframe status: Review`.

## Responsive handoff
Wireframe dimensions are written as source-design pixel values. During implementation:

```css
width: calc(123 * var(--px-to-vh));
```

The number `123` represents 123px on the 1440px-high source canvas and remains unitless in CSS. Do not add `px` inside the calculation and do not multiply by `--scale` again.

## Approval gate
Do not proceed to final visual design or implementation until the wireframe status is `Approved`, unless the user explicitly combines phases and accepts the risk.

## Optional v0 handoff

Use v0 only when the user selects it and a v0 tool or approved API access is actually available. Then read `.ai/matrices/ui-tool-routing.json` and `.ai/integrations/providers/v0.md`, send only a compact approved brief and approved references, and treat the result as a proposal.

Do not send repository source, provider details, secrets, or unapproved assets. Normalize accepted regions, states, measurements, and screenshots into the screen specification; do not import generated React, Next.js, Tailwind, or transport code.

## Output
- Screen-specification path
- Wireframe status
- Region diagram or structured layout description
- 1440px-source measurements
- Primary user flow
- Component reuse map
- State coverage
- Unresolved decisions
