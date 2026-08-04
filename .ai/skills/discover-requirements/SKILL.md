---
name: discover-requirements
description: Clarify and design a resource or feature request before implementation. Use when scope, behavior, UI, authority, data, environment, integrations, or acceptance criteria are not already approved.
---

# Discover Requirements

## Goal
Turn a vague request into an approved, implementation-ready brief while actively helping the user make product and technical decisions.

## Read first
- `AGENTS.md`
- `.ai/memory/project-style.md`
- `.ai/memory/environment.md`
- `.ai/features/<feature>.md` when it exists
- `integrations.json` when external resources may be involved
- relevant ADRs, provider profiles, and UI specifications
- source files only when needed to understand current behavior

## Discovery rule
Do not modify production code while material decisions remain unresolved. Ask only questions that can change behavior, architecture, security, UX, data, integration contracts, or acceptance criteria.

Do not ask the user to design the system alone. For each unclear decision:
1. Explain briefly why it matters.
2. Offer 2-4 concrete options.
3. Recommend one option with rationale.
4. Let the user choose or approve the recommendation.

Ask in small coherent rounds, not one large questionnaire.

## Mandatory environment check
Before creating a new resource or material feature, check `.ai/memory/environment.md`. If required information is unresolved, ask only for the capabilities the current work needs:

- Framework: standalone, ESX, QBCore, Qbox, or custom.
- Shared library: ox_lib, another library, or none.
- Database: none, oxmysql, or another driver; whether persistence is required.
- Inventory and money providers.
- Notify, logger, progress, target/interaction, appearance, and other relevant resources.
- For a custom provider: resource name plus docs/schema/export/event/callback examples.

Store confirmed server-wide selections in `.ai/memory/environment.md` so later features do not ask again. Store normalized provider APIs under `.ai/integrations/providers/`. Never store secrets.

If the user has not selected a capability and it is not required, leave it unresolved and do not generate a bridge for it.

## Question groups

### 1. Outcome and scope
- What problem is solved?
- What is included and excluded?
- What is the minimum useful first version?
- What future expansion must remain possible?

### 2. User flow and behavior
- How is it opened or triggered?
- What are primary and secondary flows?
- What permissions, jobs, roles, locations, or conditions apply?
- What happens on cancel, failure, disconnect, restart, or timeout?

### 3. Data and authority
- What data is read, created, changed, or persisted?
- Which runtime owns each decision?
- What must be validated server-side?
- Is persistence required, and does it need transactions or audit history?

### 4. Integrations and public contracts
Read the environment profile and registered provider profiles first. Do not ask again for confirmed providers.

Resolve only what is missing:
- required capability and provider resource;
- client/server/shared availability;
- exports, events, callbacks, state bags, commands, and return behavior;
- required, optional, default, conditional, client-only, and server-only options;
- dependencies per operation or option;
- behavior when a provider is missing or stopped;
- backward compatibility.

When the user supplies docs or examples, normalize them into a concise provider profile. Receiving docs is not authorization to activate or implement the provider.

### 5. Configuration
- Which values must server owners configure?
- Root config or grouped domain folders?
- Shared, client-only, server-only, and secret values?

### 6. UI and UX when applicable
- Is UI required?
- Gameplay context, screen coverage, inputs, and viewport?
- Screens, states, filters, search, pagination, confirmation, assets, and Thai text?
- Start with `wireframe-ui`; no visual design or code before approval.

### 7. Quality and delivery
- Performance and scale?
- Localization?
- Security, logging, observability, and abuse cases?
- Acceptance criteria and required evidence?

## Required artifacts before implementation
- `.ai/memory/requirements/<resource-or-feature>.md`
- `.ai/features/<feature>.md`
- updated `.ai/memory/environment.md` for confirmed server-wide choices
- relevant event/database/component registries
- provider profile when new provider documentation was supplied
- `docs/ui-spec/<screen>.md` when UI is included

## Approval gate
End discovery with a concise proposed specification covering goals, non-goals, behavior, runtime ownership, selected environment, config, contracts, data, UI, security, tests, failures, assumptions, and unresolved decisions.

Implementation begins only after user approval or explicit authorization to use recommended defaults.

## Cleanup gate
After implementation:
- keep only bridges/adapters used by approved features;
- remove unused providers, configs, dependencies, manifest entries, examples copied into runtime, and dead files;
- do not remove registered provider profiles merely because they are not active; profiles are reusable documentation.

## Exception
For a truly local low-risk edit, discovery may be abbreviated. Record the resolved intent in the relevant feature or memory file.
