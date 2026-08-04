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
