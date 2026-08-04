# UI Component Registry

The template currently ships without prebuilt UI components. `ui/src/lib/` is intentionally empty so each resource begins from its approved requirements, wireframe, visual design, and component needs instead of inheriting demo styling.

Before creating a component:
1. Check the approved screen specification.
2. Confirm the component is reusable beyond one local fragment.
3. Define its states, accessibility, tokens, and responsive measurements.
4. Use the canonical responsive sizing rule from `.ai/rules/ui.md`.
5. Create `<Component>.md` from `TEMPLATE.md` when the component gains a stable public API, variants, or non-obvious behavior.

Keep this index updated as real reusable components are added.
