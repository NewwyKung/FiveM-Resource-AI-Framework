# Purposeful FiveM Motion

This compact lens is informed by Emil Kowalski's published design-engineering guidance. Use the current repository stack and approved specification as authority; do not copy React or Framer Motion APIs into Svelte.

Source: https://github.com/emilkowalski/skills

## Decide first

- Animate only when motion explains entry/exit, hierarchy, spatial continuity, cause/effect, or useful feedback.
- Prefer no motion for repeated high-frequency actions when animation would slow the player.
- Use one motion vocabulary per screen; avoid unrelated easing and duration choices.

## Implement

- Prefer `transform` and `opacity`; avoid layout-triggering animation unless the interaction truly requires it.
- Use fast exits and slightly more expressive entrances without delaying interaction.
- Keep motion interruptible and derive it from current state rather than queued decorative sequences.
- Gate hover-only behavior with `(hover: hover) and (pointer: fine)`.
- Honor `prefers-reduced-motion`; preserve comprehension while removing unnecessary movement.
- In Svelte, keep transitions local to the owning component and dispose timers/listeners with the component lifecycle.

## Reject

- `transition: all`
- bounce or elastic easing without an approved playful reason
- hover-scale on every control
- stagger applied to every list or screen load
- continuous ambient animation that competes with gameplay
- animating width, height, margin, padding, blur, or large shadows without measurement

## Verify

- Record duration/easing tokens in the approved design system.
- Test open, close, interruption, rapid repeat, reduced motion, and low-frame-rate behavior.
- Use browser performance evidence for NUI animation and FXServer resmon for Lua work; neither substitutes for the other.
