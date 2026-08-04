# Skill Index

Apply `.ai/CONTEXT_BUDGET.md`, then read one primary skill per implementation phase. Run discovery first when requirements are not already approved.

Use `.ai/work/current-task.md` for multi-step or cross-model work. The packet should list exact files to read and avoid.

| Task | Skill |
|---|---|
| Clarify/design an ambiguous resource or feature request | `discover-requirements/SKILL.md` |
| Start or scaffold an approved new resource | `create-resource/SKILL.md` |
| Add an approved feature to an existing resource | `add-feature/SKILL.md` |
| Register or activate a framework, database, library, or custom provider | `add-integration/SKILL.md` |
| Define an approved screen layout | `wireframe-ui/SKILL.md` |
| Convert an approved wireframe into visual design | `design-ui/SKILL.md` |
| Implement an approved UI specification | `implement-ui/SKILL.md` |
| Change NUI transport/integration without redesign | `create-nui/SKILL.md` |
| Audit a running UI or screenshots | `review-ui/SKILL.md` |
| Apply approved UI review corrections | `refine-ui/SKILL.md` |
| Debug a defect or incident | `debug-resource/SKILL.md` |
| Review security and fault cases | `review-security/SKILL.md` |
| Prepare production release | `release-resource/SKILL.md` |

## Discovery sequence
`discover-requirements → user approval → implementation skill`

## Integration sequence
- Register docs: `add-integration` in Register mode; no runtime changes.
- Activate: approved feature → selected provider profile → required runtime adapter only.

## UI sequence
`discover-requirements → wireframe-ui → design-ui → implement-ui → review-ui → refine-ui`

Do not skip discovery or wireframe approval unless the user explicitly authorizes recommended defaults or combined phases.
