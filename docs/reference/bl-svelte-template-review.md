# `bl_svelte_template` Review

Reviewed scope: developer tooling and NUI workflow only. UI design, Tailwind styling, and UI components are intentionally excluded.

## Useful patterns

### Browser debug workflow

The template provides a browser debug menu that can emulate client-to-UI messages and UI-to-client callback responses. The reusable idea is a code-driven debug harness, not the visual menu itself.

Adopt as optional development fixtures:

- named debug scenarios;
- mock inbound `{ action, data }` messages;
- mock callback handlers and responses;
- no debug code or data included in release output.

### Normalized event envelope

Use one message shape for client -> UI communication:

```js
{ action, data }
```

This already matches the framework's current `Visible`/`onMessage` flow and should remain the canonical envelope.

### Disposable event listeners

A temporary listener must return a disposer and the caller must invoke it. This is valuable for modal flows, one-time responses, and feature-local subscriptions.

### Resource-name fallback

When running the Vite localhost page inside FiveM or a normal browser, the resource name may be unavailable. A configurable fallback makes the same bridge usable in browser development and FiveM hot reload.

### Escape behavior

Escape-to-close should be configurable and routed through the same callback bridge as any other UI action. The UI must not silently hide itself while leaving FiveM focus active.

### Localhost hot reload

Using the Vite dev server through `ui_page` is useful in development. Release generation must always patch the manifest back to `html/index.html`.

## Patterns not adopted

- Svelte 4 dependencies: this framework uses its current pinned Svelte 5/Vite 6 toolchain.
- TailwindCSS: not required and would impose a styling system that conflicts with design-specific implementation.
- Debug menu UI and visual components: explicitly excluded.
- Any helper that bypasses contracts, validation, focus ownership, or the approved UI pipeline.

## Developer and AI impact

These patterns improve development when exposed as a small stable bridge API. Human developers write less boilerplate, and AI models have fewer valid implementation variants to choose from. This improves consistency and reduces context needs. The benefit comes from standardization and executable helpers, not from copying the template wholesale.