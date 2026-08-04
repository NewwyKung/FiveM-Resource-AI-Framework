# AI Design-First Pipeline

Use this pipeline for new screens and major UI redesigns.

1. **Brief** — define purpose, users, FiveM context, data, constraints, and success criteria.
2. **Design direction** — choose one intentional aesthetic direction and record the memorable visual idea.
3. **Design system** — reuse or update `docs/design/design-system.md`; define screen overrides only when necessary.
4. **Screen specification** — create `docs/ui-spec/<screen>.md` using the template.
5. **Implementation** — build from the approved specification using existing Svelte components and tokens.
6. **Browser validation** — verify representative states outside FiveM.
7. **Visual review** — capture screenshots and audit hierarchy, spacing, typography, interactions, accessibility, performance, and game-background readability.
8. **Refinement** — fix discrepancies by impact without redesigning approved decisions.
9. **FiveM validation** — verify bridge messages, focus, Escape, resource stop, and production build behavior.
10. **Release review** — ensure generated output, tests, and documentation are current.

## Context-loading rule
Do not load every UI document for every task.

- New visual direction: `design-ui` skill + `design.md`
- Approved design implementation: `implement-ui` skill + `ui.md`
- Quality audit: `review-ui` skill + review checklist
- Targeted visual correction: `refine-ui` skill

## Handoff contract
Each phase hands the next phase a concrete artifact:

`brief → design system decisions → screen spec → implementation → review findings → verified result`

Do not replace a missing handoff with assumptions when the decision materially affects architecture or product behavior.