# UI Design Rules

Apply this rule only to UI design, visual refinement, or visual review tasks.

## Direction before decoration
- Define purpose, users, context, and one clear aesthetic direction before coding.
- Choose a memorable visual idea that supports the feature; do not decorate without intent.
- Avoid generic AI defaults: interchangeable dashboards, predictable card grids, purple-on-white gradients, and arbitrary glassmorphism.
- Respect an approved design system or screen specification before inventing new tokens or patterns.

## Visual system
- Establish hierarchy through scale, spacing, contrast, density, and placement.
- Use a deliberate spacing rhythm and align every element to a grid, baseline, edge, or optical center.
- Typography must have a clear role system and remain readable for Thai and long localized text.
- Use a dominant palette with restrained accents; never distribute emphasis evenly across every element.
- Child radii must remain visually concentric with parent radii.
- Prefer layered borders/shadows and contextual texture over indiscriminate glow.

## Interaction quality
- Design default, hover, active, focus-visible, disabled, loading, empty, sparse, dense, and error states when applicable.
- Interactive states increase contrast and preserve clear affordance.
- Keyboard access, visible focus, labels, semantic elements, and recovery paths are required.
- Motion must explain cause/effect or add deliberate delight, remain interruptible, and honor reduced motion.
- Prefer transform/opacity animation; never use `transition: all`.

## FiveM game UI
- UI must remain readable over both bright and dark game scenes.
- Preserve gameplay visibility; large panels should not occupy more space than the feature requires.
- Escape, close, focus return, and resource-stop cleanup must always work.
- Use HTML/CSS/SVG for layout and controls; raster images are reserved for artwork and complex decorative assets.
- Never bake dynamic or localized text into images.

## Validation
- Review at 1920x1080 and 1280x720, plus an ultra-wide or equivalent scaled view when relevant.
- Capture screenshots and compare hierarchy, spacing, typography, alignment, states, overflow, and background readability.
- A visually attractive UI is not complete if it is inaccessible, fragile, inconsistent, or difficult to implement.