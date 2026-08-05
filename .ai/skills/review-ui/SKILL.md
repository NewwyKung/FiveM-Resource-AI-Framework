---
name: review-ui
description: Audit a FiveM UI implementation or screenshot for design quality, accessibility, interaction, performance, design-system compliance, and game-context usability. Use after implementation or when reviewing an existing screen. Do not make broad redesign changes unless requested.
---

# Review UI

## Read
- `AGENTS.md`
- `.ai/rules/design.md`
- `.ai/rules/ui.md`
- `docs/design/review-checklist.md`
- Approved screen specification and design system
- `.ai/rules/assets.md` when artwork or asset loading is involved
- `.agents/skills/fivem-ui-workflow/references/motion.md` only when motion is in scope

## Evidence
Use the best available evidence:
1. Running browser/FiveM screen
2. Reference and implementation screenshots at the same viewport
3. Source code and component states
4. Specification alone only when rendering is unavailable

State explicitly which evidence was unavailable.

When screenshots exist, compare the approved reference and implementation at matching viewport dimensions. Treat overlays or image-difference tools as review aids, not pixel-perfect acceptance tests; intentional browser/font/rendering differences still require human judgment.

## Workflow
1. Confirm the intended task, primary user action, viewport, and approved design direction.
2. Review hierarchy and usefulness before visual polish.
3. Compare layout, spacing, typography, color, depth, icons, density, and visual distinctiveness.
4. Check default, focus, hover, active, disabled, loading, empty, dense, error, and destructive states as applicable.
5. Check keyboard operation, semantic elements, accessible names, focus management, recovery paths, and reduced motion.
6. Check game-context readability, screen coverage, focus return, Escape, and resource-stop behavior.
7. Check overflow, long Thai text, image dimensions, animation cost, large lists, and cleanup risks.
8. Capture or inspect default, loading, error, empty, dense-content, focus, and open/close states when applicable.
9. Run `npm run check:ui-practices` and applicable build/static checks.
10. Rank findings by severity and user impact.

If Impeccable is explicitly selected and installed, use its deterministic detector only on affected UI paths. Do not install hooks silently, load every reference pack, or let its generic recommendations override the approved FiveM specification.

## Output format
For each finding include:
- Severity: blocker, high, medium, low
- Location
- Evidence
- User impact
- Smallest recommended correction

End with:
- Overall pass/fail
- Strongest aspects
- Top 3 corrections by impact
- Checks not performed

Do not praise generally without evidence. Do not change approved visual direction during a compliance review.
