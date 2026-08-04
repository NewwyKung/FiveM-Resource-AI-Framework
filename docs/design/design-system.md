# Design System Contract

This file is the persistent visual source of truth for UI work. Keep it compact and update it intentionally.

## Product context
- Product: FiveM resource UI template
- Primary environment: FiveM Chromium NUI
- Primary viewport: 1920x1080
- Secondary viewport: 1280x720
- Primary language: Thai
- UI source: `ui/`
- Generated output: `html/`

## Required decisions
Every project using this template should define:

### Pattern
The primary layout pattern, information density, navigation model, and screen coverage.

### Aesthetic direction
One specific direction with a short rationale. Examples: industrial/utilitarian, playful gaming, restrained luxury, retro-futuristic, editorial, brutalist.

### Typography
- Display role
- Heading roles
- Body role
- Numeric/data role
- Thai fallback and long-text behavior

### Color
- Canvas/background
- Surfaces and elevations
- Primary action
- Accent
- Text hierarchy
- Borders
- Success/warning/error/info

### Shape and depth
- Radius scale
- Border treatment
- Shadow/elevation system
- Texture or atmosphere rules

### Spacing and layout
- Base spacing unit
- Grid/column behavior
- Safe area
- Maximum panel coverage
- Scroll ownership

### Motion
- Fast, normal, and slow durations
- Easing vocabulary
- Reduced-motion behavior
- Entry/exit and feedback principles

### Component language
Define how buttons, inputs, cards, tabs, modals, tooltips, notifications, and game-specific controls look and behave.

### Anti-patterns
List visual and interaction choices that must not appear in this project.

## Master and screen overrides
- This file contains global decisions.
- Screen-specific exceptions belong in `docs/ui-spec/<screen>.md`.
- Overrides must explain why the master system is insufficient.
- Do not silently invent new colors, radii, spacing, or component styles inside a screen implementation.