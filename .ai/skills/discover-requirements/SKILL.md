---
name: discover-requirements
description: Clarify and design a resource or feature request before implementation. Use when scope, behavior, UI, authority, data, integrations, or acceptance criteria are not already approved.
---

# Discover Requirements

## Goal
Turn a vague request into an approved, implementation-ready brief while actively helping the user make product and technical decisions.

## Read
- `AGENTS.md`
- `.ai/memory/project-style.md`
- `.ai/features/<feature>.md` when it exists
- relevant approved ADRs and UI specifications
- source files only when needed to understand current behavior

## Discovery rule
Do not modify production code while material decisions remain unresolved. Ask only questions that can change behavior, architecture, security, UX, data, or acceptance criteria.

Do not ask the user to design the system alone. For each unclear decision:
1. Explain why the decision matters briefly.
2. Offer 2-4 concrete options.
3. Recommend one option with rationale.
4. Let the user choose or accept the recommendation.

## Question groups
Ask in small coherent rounds instead of one overwhelming questionnaire.

### 1. Outcome and scope
- What player/user problem is being solved?
- What is explicitly included and excluded?
- What is the minimum useful first version?
- What future expansion must not be blocked?

### 2. User flow and behavior
- How is the feature opened or triggered?
- What are the primary and secondary flows?
- What permissions, jobs, roles, locations, or conditions apply?
- What happens on cancel, failure, disconnect, restart, or timeout?

### 3. Data and authority
- What data is read, created, changed, or persisted?
- Which runtime owns each decision?
- What must be validated server-side?
- Is database storage required? What retention/audit behavior is needed?

### 4. Integration and public contracts
- Standalone, ESX, QBCore, or another bridge?
- Required resources and optional integrations?
- Events, callbacks, exports, state bags, commands, or permissions?
- Backward-compatibility requirements?

### 5. Configuration
- Which values must server owners be able to configure?
- Are there small root configs or large domain folders?
- Which config values are shared, client-only, or server-only?

### 6. UI and UX when applicable
- Is UI required, optional, or unnecessary?
- Gameplay context, screen coverage, input method, and target viewport?
- Required screens, states, filters, search, pagination, notifications, and confirmation flows?
- Existing CI/design references and assets?
- Start with `wireframe-ui`; do not begin visual design or code before wireframe approval.

### 7. Quality and delivery
- Performance constraints and expected scale?
- Localization and Thai text requirements?
- Security, logging, observability, and abuse cases?
- Acceptance criteria and evidence required for completion?

## Required artifacts
Create or update before implementation:
- `.ai/memory/requirements/<resource-or-feature>.md`
- `.ai/features/<feature>.md`
- relevant event/database/component registries when contracts are known
- `docs/ui-spec/<screen>.md` when UI is included

## Approval gate
End discovery with a concise proposed specification containing:
- goals and non-goals
- recommended behavior and user flow
- architecture/runtime ownership
- config, contracts, data, UI, security, tests, and failure handling
- assumptions and unresolved decisions

Implementation may begin only after the user approves the brief or explicitly authorizes the recommended defaults.

## Exception
For a truly local, low-risk edit with no product or architectural ambiguity, discovery may be abbreviated. Record the resolved intent in the relevant feature or memory file.