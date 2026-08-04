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

## Evidence
Use the best available evidence:
1. Running browser/FiveM screen
2. Reference and implementation screenshots at the same viewport
3. Source code and component states
4. Specification alone only when rendering is unavailable

State explicitly which evidence was unavailable.

## Workflow
1. Confirm the intended task, primary user action, viewport, and approved design direction.
2. Review hierarchy and usefulness before visual polish.
3. Compare layout, spacing, typography, color, depth, icons, density, and visual distinctiveness.
4. Check default, focus, hover, active, disabled, loading, empty, dense, error, and destructive states as applicable.
5. Check keyboard operation, semantic elements, accessible names, focus management, recovery paths, and reduced motion.
6. Check game-context readability, screen coverage, focus return, Escape, and resource-stop behavior.
7. Check overflow, long Thai text, image dimensions, animation cost, large lists, and cleanup risks.
8. Rank findings by severity and user impact.

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