# Resource with NUI Example

Use only when approved requirements include a user interface.

## Sequence

```text
discovery → wireframe approval → visual approval → implementation → review
```

## Minimum boundaries

- `resource/client/modules/nui.lua`: focus, messages, callbacks, cleanup.
- `resource/ui/src/`: presentation and browser mocks.
- server modules: authoritative actions and validation.
- `resource/html/`: generated output only.

## Responsive sizing

Design against a 1440px-high canvas and implement design pixel values as:

```css
width: calc(720 * var(--px-to-vh));
padding: calc(32 * var(--px-to-vh));
```

Do not copy a full-screen mockup image into the UI. Use HTML/CSS/SVG for structure and raster assets only for artwork.
