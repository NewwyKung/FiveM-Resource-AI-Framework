---
name: refine-ui
description: Apply targeted corrections from an approved UI review, screenshot comparison, or discrepancy list without reopening the whole design. Use for spacing, hierarchy, typography, states, accessibility, motion, overflow, and polish fixes.
---

# Refine UI

## Read
- `AGENTS.md`
- `.ai/rules/design.md`
- `.ai/rules/ui.md`
- Approved screen specification
- Latest UI review findings or screenshot comparison
- Relevant implementation files only

## Workflow
1. Convert review findings into a prioritized correction list.
2. Confirm whether each correction is implementation drift, specification ambiguity, or a requested design change.
3. Fix blockers and high-impact issues first: task clarity, broken interaction, focus, overflow, readability, and layout proportions.
4. Fix visual-system issues next: spacing rhythm, typography, alignment, depth, icon balance, states, and motion.
5. Make the smallest coherent edits; avoid unrelated refactors and new design directions.
6. Re-run the affected checks and capture the same states/viewports used by the review when possible.
7. Compare again and repeat only while material discrepancies remain.
8. Update the screen specification only when an approved design decision changed.

## Constraints
- Do not solve a localized defect by adding a global override without checking other screens.
- Do not hide errors with clipping, arbitrary delays, or disabled interaction.
- Do not reduce accessibility or performance to make a screenshot appear closer.
- Do not replace reusable components with one-off copies.

## Completion
Report resolved findings, remaining deviations, validation evidence, specification changes, and any issue that requires a product/design decision rather than code.