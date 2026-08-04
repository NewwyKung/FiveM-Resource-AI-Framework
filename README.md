# FiveM Resource Template v2

Reusable FiveM resource foundation for creating new scripts with clear client/server/shared boundaries, scalable configuration, optional Svelte 5 NUI, and model-neutral AI development guidance.

## Purpose

This repository is a starting point for a **new FiveM resource**. It is not a replacement for ESX, QBCore, or another gameplay framework. A resource created from this template may remain standalone or add explicit framework/database bridges when required.

The template provides:

- Lua client, server, shared, config, and module boundaries.
- Deterministic loading through `fxmanifest.lua`.
- Optional Svelte 5 + Vite NUI development in `ui/`.
- Generated FiveM NUI output in `html/`.
- Approved architecture decisions for configuration and modules.
- AI rules, skills, registries, memory, knowledge, prompts, and checklists.
- Requirements discovery and approval gates before implementation.
- A wireframe-first UI design pipeline.

## Get Started

### 1. Create a new resource from the template

Use this repository as a GitHub template, clone it, or copy it into your FiveM resources directory.

```bash
git clone https://github.com/NewwyKung/v.2-Template-FiveM.git my_resource
cd my_resource
```

Rename the resource folder and update the metadata in:

```text
fxmanifest.lua
resource.json
```

Remove example config files or domains that the new resource does not need.

### 2. Define the feature before coding

For AI-assisted work, start with `AGENTS.md`. New resources and substantial features must pass requirements discovery before implementation.

Example request:

```text
Use .ai/skills/discover-requirements/SKILL.md to define a shop resource.
Help me choose the feature behavior, integrations, configuration, security model,
and UI flow. Do not implement until I approve the requirements.
```

The approved brief should be stored at:

```text
.ai/memory/requirements/<feature>.md
.ai/features/<feature>.md
```

After approval, use:

```text
.ai/skills/create-resource/SKILL.md
```

or:

```text
.ai/skills/add-feature/SKILL.md
```

### 3. Configure the resource

Start with:

```text
config/config.main.lua
```

Add small domains as root config files:

```text
config/config.item.lua
config/config.vehicle.lua
```

Add larger domains as folders:

```text
config/shop/24.7_store.lua
config/shop/weapon_store.lua
```

Keep client-only, server-only, shared, and secret values in their approved runtime folders.

### 4. Add modules

Place code by runtime and responsibility:

```text
shared/lib/         Shared utility functions
shared/modules/     Shared contracts, constants, and domain definitions
client/modules/     Client behavior and FiveM interaction
server/modules/     Server authority, validation, persistence, and business logic
```

Keep `client/main.lua` and `server/main.lua` as bootstraps. Do not place feature logic directly in them.

### 5. Start NUI development when required

Install the UI dependencies:

```bash
npm --prefix ui install
```

Run the Vite development server:

```bash
npm --prefix ui run dev
```

The development server uses port `5171`.

Build production NUI files:

```bash
npm --prefix ui run build
```

The source lives in `ui/`; generated output is written to `html/`. Never edit `html/` directly.

### 6. Use the responsive UI sizing system

Design screens against a `1440px`-high canvas and convert design measurements with:

```css
:root {
    --scale: 1;
    --base-screen-height: 1440;
    --px-to-vh: calc(1vh / var(--base-screen-height) * 100 * var(--scale));
}
```

Usage:

```css
.panel {
    width: calc(720 * var(--px-to-vh));
    padding: calc(32 * var(--px-to-vh));
    gap: calc(16 * var(--px-to-vh));
}
```

The numeric value represents design pixels but remains unitless. Do not append `px` and do not multiply `--scale` a second time.

### 7. Follow the UI approval pipeline

For a new screen or major redesign:

```text
Requirements discovery
→ Low-fidelity wireframe
→ Wireframe approval
→ Visual design
→ Visual approval
→ Svelte implementation
→ UI review
→ Refinement
→ FiveM validation
```

Do not start production UI implementation until the wireframe and visual specification are approved, unless the task explicitly combines phases.

### 8. Validate before release

Before using the resource in production:

- Check every `fxmanifest.lua` path.
- Confirm server-side authority and payload validation.
- Test normal, invalid, disconnect, restart, and timeout paths.
- Build the NUI.
- Replace the localhost development page with `html/index.html`.
- Check Escape, NUI focus release, and resource-stop cleanup.
- Update feature, event, component, database, and requirements records.
- Run `.ai/checklists/before-release.md`.

## Repository structure

```text
.
├── config/                    Editable configuration and config helpers
│   ├── config.main.lua        Config namespace/foundation; loads first
│   ├── config.item.lua        Example root domain config
│   ├── functions/             Shared/client/server config helpers
│   ├── shared/                Shared-only nested config
│   ├── client/                Client-only config
│   ├── server/                Server-only config and secrets
│   └── shop/                  Example grouped domain config
├── shared/
│   ├── lib/                   Reusable utilities safe on both runtimes
│   └── modules/               Shared domain modules/constants/contracts
├── client/
│   ├── modules/               Client behavior
│   └── main.lua               Client bootstrap; loads last
├── server/
│   ├── modules/               Server behavior/business logic/data access
│   └── main.lua               Server bootstrap; loads last
├── ui/                        Svelte 5 NUI source
├── html/                      Generated NUI output; never edit manually
├── tests/                     Tests and fixtures
├── docs/
│   ├── decisions/             Approved architecture decisions
│   ├── design/                Design system and UI process
│   └── ui-spec/               Wireframes and screen specifications
├── .ai/                       Model-neutral AI working system
├── resource.json              Machine-readable resource summary
├── AGENTS.md                  Main AI router and working agreement
└── fxmanifest.lua             FiveM resource and load-order definition
```

## Config architecture

The approved config architecture is documented in `docs/decisions/001-config-architecture.md`.

Core rules:

1. `config/config.main.lua` initializes `Config` and loads first.
2. Small domain configs may use root files such as `config/config.item.lua`.
3. Large domains may use folders such as `config/shop/24.7_store.lua`.
4. Runtime-specific values belong under `config/shared`, `config/client`, or `config/server`.
5. Config helpers belong under `config/functions` and must not contain gameplay business logic.
6. Root domain files are listed explicitly in `fxmanifest.lua`; nested feature folders may use globs.

## Module architecture

The approved module architecture is documented in `docs/decisions/002-module-architecture.md`.

Core rules:

- `shared/lib`: reusable utilities.
- `shared/modules`: shared domain definitions and contracts.
- `client/modules`: client-only behavior.
- `server/modules`: server-only behavior and authoritative logic.
- One module should have one clear responsibility.
- `main.lua` coordinates startup/shutdown and does not become a business-logic container.
- `fxmanifest.lua` controls load order; do not introduce a custom loader without a proven need.

## Load order

```text
Shared
config.main
→ shared config helpers
→ explicit root domain configs
→ nested shared/domain configs
→ shared libraries
→ shared modules

Client
client config helpers
→ client configs
→ client modules
→ client/main.lua

Server
server config helpers
→ server configs
→ server modules
→ server/main.lua
```

See `docs/module-loading.md` for details.

## NUI development

The UI source lives under `ui/` and builds into `html/`.

```bash
npm --prefix ui install
npm --prefix ui run dev
npm --prefix ui run build
npm --prefix ui run preview
```

Development currently uses Vite port `5171`. Production resources must use the built `html/index.html` path instead of localhost.

Do not edit `html/` directly. Change `ui/` and rebuild.

## Wireframe-first UI workflow

New screens and major redesigns follow:

```text
Brief
→ Low-fidelity wireframe
→ Wireframe review and approval
→ Visual design
→ Visual specification approval
→ Svelte implementation
→ Browser review
→ FiveM validation
→ Refinement
→ Release
```

The wireframe resolves structure before visual polish:

- Information hierarchy
- Layout regions and dimensions
- Primary user flow
- Scroll ownership
- State coverage
- Keyboard/focus/Escape behavior
- Representative and worst-case Thai content

Use:

- `.ai/skills/wireframe-ui/SKILL.md`
- `.ai/skills/design-ui/SKILL.md`
- `.ai/skills/implement-ui/SKILL.md`
- `.ai/skills/review-ui/SKILL.md`
- `.ai/skills/refine-ui/SKILL.md`
- `docs/ui-spec/TEMPLATE.md`

Do not start final visual styling or production implementation until `Wireframe status` is `Approved`, unless the task explicitly combines phases and accepts the additional rework risk.

## AI development system

Start with `AGENTS.md`. It routes each task to only the context it needs.

```text
AGENTS.md
→ requirements discovery when needed
→ relevant domain rules
→ one primary skill
→ relevant registry/specification
→ relevant source files
→ applicable checklist
```

### AI directories

- `.ai/rules/`: short constraints for FiveM, Lua, security, UI, design, testing, assets, localization, APIs, and fault handling.
- `.ai/skills/`: workflows for discovery, resource creation, feature work, UI phases, debugging, security review, and release.
- `.ai/features/`: feature ownership and file maps.
- `.ai/components/`: reusable UI component contracts.
- `.ai/events/`: event/callback/export authority and payload contracts.
- `.ai/database/`: persistent-data ownership and schema summaries.
- `.ai/memory/`: approved requirements, stable preferences, and confirmed recurring issues.
- `.ai/knowledge/`: concise repository-specific technical knowledge.
- `.ai/prompts/`: short reusable task entrypoints.
- `.ai/checklists/`: discovery, before-commit, UI-review, and release gates.
- `.ai/examples/`: approved examples loaded only when relevant.

Adapters such as `CLAUDE.md`, `.github/copilot-instructions.md`, and `.cursor/rules/project.mdc` point back to the same source of truth instead of duplicating rules.

## Registries

Registries reduce repository-wide searching and token usage.

When contracts change, update the relevant registry:

- Feature: `.ai/features/<feature>.md`
- Requirements: `.ai/memory/requirements/<feature>.md`
- UI component: `.ai/components/<Component>.md`
- Event/callback/export: `.ai/events/<contract>.md`
- Database table/store: `.ai/database/<store>.md`

Templates are included in each directory. Keep records concise and link to source paths.

## Naming and code style

- Naming conventions: `docs/naming-conventions.md`
- Code style: `docs/code-style.md`
- Config decision: `docs/decisions/001-config-architecture.md`
- Module decision: `docs/decisions/002-module-architecture.md`

## Creating a new resource

1. Copy or generate a repository from this template.
2. Rename resource metadata in `fxmanifest.lua` and `resource.json`.
3. Run requirements discovery and approve the feature brief.
4. Remove example config domains that are not required.
5. Define feature boundaries and authority.
6. Add config files and modules in the approved locations.
7. Register public contracts and persistent data.
8. Keep NUI only when the resource needs it.
9. Add tests and run applicable checklists.
10. Build NUI and switch to the production `ui_page` before release.

For AI-assisted scaffolding, begin with `.ai/skills/discover-requirements/SKILL.md`, then use `.ai/skills/create-resource/SKILL.md` after approval.

## Release gate

Before release, verify:

- Manifest paths and dependencies.
- Deterministic load order.
- Server authority and input validation.
- Resource restart/player-drop cleanup.
- NUI production build and focus behavior.
- No localhost URL, secret, raw asset, or debug-only path remains.
- Public API and migration compatibility.
- Registries, specifications, requirements, tests, version, and release notes are current.

Use `.ai/checklists/before-release.md` and `.ai/skills/release-resource/SKILL.md`.

## Current validation limitation

Repository documentation and structure changes can be reviewed through GitHub, but the UI install/build commands must be executed in a local checkout or CI environment with the required Node dependencies. Any unrun validation must be reported explicitly.
