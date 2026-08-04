# NUI / Svelte Rules

- Source lives in `ui/`; `html/` is generated output.
- Support browser development and FiveM CEF without duplicating feature logic.
- Isolate NUI transport in bridge utilities; presentation components must not call raw endpoints directly.
- Resolve the real resource name with `GetParentResourceName()` in FiveM.
- Every request needs timeout/error handling when a response is expected.
- Close paths must release NUI focus and reset transient UI state.
- Reuse components and design tokens before creating new variants.
- Implement layout and interactive elements with HTML/CSS/SVG; use raster images for artwork only.
- Do not bake dynamic text into images.
- Avoid unbounded listeners, timers, subscriptions, and object URLs.
- Optimize for the target FiveM viewport and test long Thai text.
- Build assets with relative paths suitable for NUI.

## Canonical responsive sizing

Use the global responsive conversion defined in `ui/src/app.css`:

```css
:root {
    --scale: 1;
    --base-screen-height: 1440;
    --px-to-vh: calc(1vh / var(--base-screen-height) * 100 * var(--scale));
}
```

Treat design measurements as unitless numbers representing pixels from a 1440px-high design canvas:

```css
width: calc(123 * var(--px-to-vh));
height: calc(48 * var(--px-to-vh));
gap: calc(16 * var(--px-to-vh));
font-size: calc(20 * var(--px-to-vh));
```

- The number `123` means `123px` in the source design, but must not include the `px` unit inside `calc()`.
- Do not multiply by `var(--scale)` a second time; it is already included in `--px-to-vh`.
- Use this system for component dimensions, spacing, radius, typography, positioning, and other design measurements unless a value must intentionally remain viewport-, percentage-, or content-based.
- Prefer `%`, `vw`, `vh`, flex, grid, `min()`, `max()`, or `clamp()` only when the approved layout specification requires that behavior.
