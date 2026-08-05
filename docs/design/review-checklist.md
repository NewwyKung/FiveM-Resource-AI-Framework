# UI Review Checklist

Review only applicable sections and report concrete findings by impact.

## Purpose and hierarchy
- The primary task is obvious within 3 seconds.
- Primary, secondary, and destructive actions are visually distinct.
- Information density matches the gameplay context.
- The design has a specific point of view rather than generic component assembly.

## Layout and visual craft
- Approved reference and implementation screenshots use the same viewport and UI scale before comparison.
- Alignment is deliberate; optical corrections are allowed when perception beats geometry.
- Spacing follows the approved rhythm.
- Typography roles, line lengths, truncation, and Thai text are correct.
- Borders, shadows, radii, icons, and surfaces are visually consistent.
- Bright and dark game-background screenshots remain readable.
- 3840x2160 is checked when 4K support is an acceptance criterion; scaling is not assumed from a 1080p screenshot.
- No accidental overflow, dead space, clipped content, or unnecessary scrollbar exists.

## Interaction
- Keyboard operation and visible focus work for all controls.
- Hit targets are at least 24px; use larger targets where gameplay speed requires it.
- Loading retains context and avoids flicker.
- Empty, sparse, dense, error, disabled, and destructive states have recovery paths.
- Drag interactions do not select text or leave conflicting hover states.
- Escape and close actions return NUI focus correctly.

## Motion
- Motion explains hierarchy, feedback, or cause/effect.
- Animation is interruptible and honors reduced motion.
- Transform and opacity are preferred; layout-triggering animation is avoided.
- No `transition: all`.

## Content and accessibility
- Native semantic elements are used before ARIA.
- Every input and icon-only control has an accessible name.
- Status is not communicated by color alone.
- Long, empty, invalid, and localized content do not break the layout.
- Error messages explain the next action.

## Performance and assets
- Images reserve dimensions and use appropriate formats.
- Only above-the-fold critical assets are preloaded.
- Large lists are virtualized or constrained when necessary.
- No listener, timer, subscription, focus trap, or asset handle leaks.
- Browser performance evidence covers NUI/CEF work; FXServer resmon evidence covers Lua/resource CPU. Do not claim exact `0.00 ms` without a captured target-runtime measurement.

## Screenshot evidence
- Compare layout, spacing, typography, scaling, overflow, and long Thai strings against approved references.
- Capture loading, error, empty, dense-content, focused, and interaction states when they are in scope.
- Use overlays or image differences to locate drift, then judge the cause and user impact manually.
- Keep only approved references required by the feature; do not preserve exploratory screenshots as durable source of truth.

## Review output
For each finding include:
1. Severity: blocker, high, medium, low
2. Location
3. Evidence
4. User impact
5. Smallest recommended correction

End with a pass/fail summary and checks that could not be performed.
