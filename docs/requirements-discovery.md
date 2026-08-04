# Requirements Discovery and Approval

New resources, major features, redesigns, and ambiguous changes must be clarified before implementation.

## Purpose
A short request often hides product and architecture decisions. For example, “create a shop system” does not define shop types, permissions, inventory integration, prices, purchase authority, persistence, UI states, failure behavior, or acceptance criteria.

The agent must help the user design these decisions instead of either guessing or returning an unstructured questionnaire.

## Workflow

```text
Initial request
→ inspect existing project context
→ ask focused question round
→ offer options and recommendation
→ capture answers
→ repeat only for material gaps
→ propose complete brief
→ user approval or authorization of recommended defaults
→ store approved requirements
→ wireframe UI when applicable
→ implementation
```

## Conversation style
- Ask questions in small related groups.
- Explain why a decision matters only when useful.
- Offer 2-4 concrete options for unclear decisions.
- Recommend a default and explain the tradeoff.
- Reuse known project preferences and do not ask for information already recorded.
- Distinguish required decisions from optional enhancements.
- Propose a sensible minimum useful version and future-compatible extension path.
- Summarize decisions after each meaningful round.

## Required discovery domains
1. Outcome, users, scope, non-goals, and minimum useful version.
2. Primary, alternate, cancellation, and failure flows.
3. Permissions, roles, jobs, locations, prerequisites, costs, limits, and cooldowns.
4. Client/server/shared/config/UI/database ownership and server authority.
5. Data, persistence, transaction, audit, and retention requirements.
6. Events, callbacks, exports, commands, state bags, dependencies, and framework bridges.
7. Configurable values and config file locations.
8. UI screens, states, wireframes, interaction, assets, localization, and accessibility.
9. Security, abuse cases, disconnect/restart/timeout behavior, and cleanup.
10. Performance, expected scale, tests, completion evidence, and acceptance criteria.

## Artifacts
Before implementation, create or update:
- `.ai/memory/requirements/<resource-or-feature>.md`
- `.ai/features/<feature>.md`
- relevant event, database, and component registries
- `docs/ui-spec/<screen>.md` for UI work

## Approval
The proposed brief must clearly list:
- goals and non-goals;
- recommended behavior;
- user flows;
- architecture and authority;
- configuration and integrations;
- data and public contracts;
- UI and wireframe needs;
- security and fault handling;
- tests and acceptance criteria;
- assumptions and unresolved questions.

Implementation starts only after the user approves the brief or explicitly authorizes the recommended defaults.

## Abbreviated discovery
A local, low-risk edit may use abbreviated discovery when its behavior and impact are already explicit. Record the resolved intent in the existing feature or requirements file.