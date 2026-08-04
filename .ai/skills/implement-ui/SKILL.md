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
- `ui/src/js/createFeatureState.svelte.js` when asynchronous state is required
- relevant components, contracts, state, and assets

## Workflow
1. Confirm the approved specification and measurable acceptance criteria.
2. Reuse existing components before adding new ones.
3. Separate presentation, feature state, NUI transport, validation, and assets.
4. Implement semantic structure and keyboard/focus behavior first.
5. Apply approved tokens and the canonical responsive system.
6. Implement all required loading, ready, empty, submitting, success, and error states.
7. Use the canonical feature state helper for asynchronous or multi-step flows unless simpler local state is sufficient.
8. Add browser scenarios with `NuiDebug.js`; do not build a debug-menu UI unless requested.
9. Use `NuiBridge.js`; do not create feature-specific transport helpers.
10. Set explicit callback timeout and response validation for awaited operations.
11. Verify Escape, close, focus return, listener disposal, pending-request cleanup, and resource-stop behavior.
12. Build and validate the UI.

## State lifecycle

```text
idle → loading → ready → submitting → success/error → reset
```

- Keep state inside the owning feature.
- Use global state only for data shared across independent features.
- Transport code must not mutate presentation state directly.
- Reset transient state when closing unless requirements explicitly preserve it.
- Server state remains authoritative.

## NUI response contract

```js
{ ok: true, data: {}, error: null, requestId: 'optional-id' }
```

Handle at least:

```text
NUI_TIMEOUT
NUI_NETWORK_ERROR
NUI_INVALID_RESPONSE
NUI_CALLBACK_FAILED
NUI_PENDING_LIMIT
```

## Responsive implementation rule

```css
property: calc(<design-pixel-number> * var(--px-to-vh));
```

The value is a unitless pixel measurement from the 1440px-high design. Never append `px` inside the multiplication or multiply `--scale` again.

## Constraints
- Do not edit generated `html/` files directly.
- Do not replace interactive layout with a full-screen image.
- Do not bake localized or dynamic text into artwork.
- Do not redesign approved decisions during implementation.
- Avoid new dependencies unless necessary.
- Do not copy external UI/components/Tailwind without explicit approval.
- Do not add Lua hot reload behavior.

## Completion
Report changed files, state/error paths, browser scenarios, validation, screenshots, deviations, and checks that could not run.
