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
- Approved `docs/ui-spec/<screen>.md`
- `docs/design/design-system.md`
- Relevant existing components, tokens, bridge code, and assets

## Workflow
1. Confirm the specification status and identify measurable acceptance criteria.
2. Inspect and reuse existing components before adding new ones.
3. Separate presentation, state, NUI transport, validation, and asset concerns.
4. Implement semantic structure and keyboard/focus behavior first.
5. Apply approved tokens, spacing, typography, depth, and motion; do not invent silent overrides.
6. Implement all applicable states and recovery paths from the specification.
7. Add browser-mode mock data for representative states.
8. Connect NUI messages/callbacks with timeout and error handling where responses are awaited.
9. Verify Escape, close, focus return, and cleanup behavior.
10. Build the UI and capture representative screenshots when tooling is available.

## Constraints
- Do not edit generated `html/` files directly.
- Do not replace interactive layout with a full-screen image.
- Do not bake localized or dynamic text into artwork.
- Do not redesign approved decisions during implementation; record discrepancies or request a spec update.
- Avoid new dependencies unless the approved design cannot be implemented reasonably without one.

## Completion
Report changed files, states covered, validation performed, screenshots produced, deviations from the specification, and checks that could not run.