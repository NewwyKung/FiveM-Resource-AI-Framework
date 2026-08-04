---
name: discover-requirements
description: Clarify and design a resource or feature request before implementation. Use when scope, behavior, UI, authority, data, environment, integrations, or acceptance criteria are not already approved.
---

# Discover Requirements

## Context budget
Follow `.ai/CONTEXT_BUDGET.md`. Start with environment, the matching active requirement/feature registry if present, and only source needed to understand current behavior. Create `.ai/work/current-task.md` for multi-step or cross-model work.

## Goal
Turn a vague request into an approved, implementation-ready brief while actively helping the user make product and technical decisions.

## Read first
- `AGENTS.md`
- `.ai/CONTEXT_BUDGET.md`
- `.ai/memory/project-style.md`
- `.ai/memory/environment.md`
- `.ai/memory/requirements/active/<feature>.md` when it exists
- `.ai/features/<feature>.md` when it exists
- `integrations.json` only when external resources may be involved
- relevant ADRs, selected provider profiles, and UI specifications
- source files only when needed to understand current behavior

## Discovery rule
Do not modify production code while material decisions remain unresolved. Ask only questions that can change behavior, architecture, security, UX, data, integration contracts, or acceptance criteria.

For each unclear decision:
1. Explain briefly why it matters.
2. Offer 2-4 concrete options.
3. Recommend one option with rationale.
4. Let the user choose or approve the recommendation.

Ask in small coherent rounds, not one large questionnaire.

## Mandatory environment check
Before creating a new resource or material feature, check `.ai/memory/environment.md`. If required information is unresolved, ask only for capabilities the current work needs:
- Framework: standalone, ESX, QBCore, Qbox, or custom.
- Shared library: ox_lib, another library, or none.
- Database: none, oxmysql, or another driver; whether persistence is required.
- Inventory and money providers.
- Notify, logger, progress, target/interaction, appearance, and other relevant resources.
- For a custom provider: resource name plus docs/schema/export/event/callback examples.

Store confirmed server-wide selections in `.ai/memory/environment.md`. Store normalized provider APIs under `.ai/integrations/providers/`. Never store secrets. If a capability is not required, leave it unresolved and do not generate a bridge.

## Question groups

### 1. Outcome and scope
- Problem, included/excluded scope, minimum useful version, future compatibility.

### 2. User flow and behavior
- Trigger, primary/secondary flows, permissions/conditions, cancel/failure/disconnect/restart/timeout.

### 3. Data and authority
- Data read/written, runtime owner, server validation, persistence, transactions, audit.

### 4. Integrations and public contracts
Read confirmed environment and selected provider profiles first. Resolve only missing capability, runtime, API signature, options, dependencies, failure behavior, and compatibility. Receiving docs is not authorization to activate a provider.

### 5. Configuration
- Owner-editable values, root/domain layout, shared/client/server/secret boundaries.

### 6. UI and UX
- UI necessity, gameplay context, viewport, screens/states/input/assets/Thai text. Start with `wireframe-ui`.

### 7. Quality and delivery
- Performance, localization, security, observability, abuse cases, acceptance evidence.

## Required artifacts before implementation
- `.ai/memory/requirements/active/<resource-or-feature>.md`
- `.ai/features/<feature>.md`
- updated `.ai/memory/environment.md` for confirmed server-wide choices
- relevant event/database/component registries
- provider profile when new provider documentation was supplied
- `docs/ui-spec/<screen>.md` when UI is included
- updated `.ai/index.json`

## Approval gate
End discovery with a concise proposed specification covering goals, non-goals, behavior, runtime ownership, selected environment, config, contracts, data, UI, security, tests, failures, assumptions, and unresolved decisions.

Implementation begins only after user approval or explicit authorization to use recommended defaults.

## Cleanup gate
After implementation, keep only runtime adapters/config/dependencies used by approved features. Keep registered provider profiles because they are reusable documentation. Move requirement memory to `delivered/` or `superseded/` when its lifecycle changes.

## Exception
For a truly local low-risk edit, discovery may be abbreviated. Record the resolved intent in the relevant feature or memory file.
