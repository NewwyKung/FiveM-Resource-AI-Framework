# Design Guidance Sources

This repository distills principles from the following sources into project-specific rules and workflows. External content is not copied wholesale; repository files remain the operational source of truth.

## Anthropic Frontend Design
- Source: `https://github.com/anthropics/skills/tree/main/skills/frontend-design`
- Applied principles: define purpose and audience before coding, commit to a clear aesthetic direction, create a memorable differentiator, avoid generic AI aesthetics, and match implementation complexity to the visual concept.
- Project mapping: `.ai/rules/design.md`, `.ai/skills/design-ui/SKILL.md`.

## Vercel Web Interface Guidelines
- Source: `https://vercel.com/design/guidelines`
- Applied principles: keyboard and focus quality, complete UI states, semantic controls, resilient content, deliberate alignment, accessible interaction, animation discipline, performance, forms, and actionable error/recovery design.
- Project mapping: `.ai/rules/design.md`, `docs/design/review-checklist.md`, `.ai/skills/review-ui/SKILL.md`.

## UI/UX Pro Max
- Source: `https://github.com/nextlevelbuilder/ui-ux-pro-max-skill`
- Applied principles: compact machine-readable design decisions, product/style/color/typography reasoning, explicit anti-patterns, and a persistent master design system with screen-specific overrides.
- Project mapping: `docs/design/design-system.md`, `docs/ui-spec/TEMPLATE.md`, `.ai/skills/design-ui/SKILL.md`.

## FiveM adaptation
The upstream sources target general frontend work. This repository adds FiveM-specific requirements:
- readability over live game backgrounds
- constrained screen coverage
- Chromium NUI behavior
- browser and FiveM dual-mode testing
- Escape/close/focus return
- resource-stop cleanup
- NUI bridge contracts
- artwork versus interactive-layout boundaries

When an external source conflicts with an approved project decision, `docs/decisions/`, the current screen specification, and this repository's rules take precedence.