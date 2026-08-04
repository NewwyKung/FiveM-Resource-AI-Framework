# FiveM Resource AI Framework

AI-first FiveM resource framework with modular Lua architecture, optional Svelte 5 NUI, requirements discovery, wireframe-first UI design, reusable provider profiles, automated validation, and production release packaging.

## What this repository is

Use this repository as the foundation for a new FiveM resource. It is not a replacement for ESX, QBCore, Qbox, ox_lib, oxmysql, or another gameplay ecosystem. A generated resource may remain standalone or activate only the framework, database, libraries, and custom resources it actually needs.

Core goals:

- clear client/server/shared/config boundaries;
- deterministic `fxmanifest.lua` loading;
- server-authoritative feature design;
- optional Svelte 5 + Vite NUI;
- design-first and wireframe-first UI workflow;
- model-neutral AI rules and skills;
- minimal context loading and reusable memory;
- no speculative framework/provider bridges;
- validated, secret-clean production releases.

## Get Started

### 1. Create a resource

Use the repository as a GitHub template or clone it:

```bash
git clone https://github.com/NewwyKung/FiveM-Resource-AI-Framework.git my_resource
cd my_resource
```

Update:

```text
fxmanifest.lua
resource.json
```

Remove example config domains and runtime folders the new resource does not need.

### 2. Start with discovery

For a new resource or substantial feature, begin with:

```text
Use .ai/skills/discover-requirements/SKILL.md.
Help me define the feature and environment before implementation.
```

The AI checks `.ai/memory/environment.md` and asks only about unresolved capabilities required by the task, such as:

- Standalone, ESX, QBCore, Qbox, or custom framework;
- ox_lib or another shared library;
- no database, oxmysql, or another driver;
- inventory and money providers;
- notify, logger, progress, target/interaction, appearance, or custom resources.

Confirmed server-wide choices are stored once and reused. Secrets are never stored in AI memory.

Active requirements belong at:

```text
.ai/memory/requirements/active/<feature>.md
.ai/features/<feature>.md
```

Implementation begins after approval or explicit authorization to use recommended defaults.

### 3. Configure the resource

Foundation:

```text
config/config.main.lua
```

Small domains:

```text
config/config.item.lua
config/config.vehicle.lua
```

Large domains:

```text
config/shop/24.7_store.lua
config/shop/weapon_store.lua
```

Runtime-specific values belong under:

```text
config/shared/
config/client/
config/server/
```

Config helpers belong under `config/functions/` and must not contain gameplay business logic.

### 4. Add modules

```text
shared/lib/         reusable cross-runtime utilities
shared/modules/     shared contracts/constants/domain definitions
client/modules/     client behavior and presentation integration
server/modules/     authority, validation, persistence, business logic
```

`client/main.lua` and `server/main.lua` are bootstraps and load last.

### 5. Develop NUI when required

```bash
npm --prefix ui install
npm --prefix ui run dev
npm --prefix ui run build
npm --prefix ui run preview
```

- Source: `ui/`
- Generated output: `html/`
- Development port: `5171`
- Never edit `html/` directly.

The UI dependencies are pinned to exact direct versions. CI currently resolves a lock before `npm ci`; commit a generated `ui/package-lock.json` after running npm in a trusted local/CI environment for fully persistent transitive locking.

### 6. Responsive sizing

Design against a `1440px`-high canvas:

```css
:root {
    --scale: 1;
    --base-screen-height: 1440;
    --px-to-vh: calc(1vh / var(--base-screen-height) * 100 * var(--scale));
}
```

Use unitless design-pixel values:

```css
.panel {
    width: calc(720 * var(--px-to-vh));
    padding: calc(32 * var(--px-to-vh));
    gap: calc(16 * var(--px-to-vh));
}
```

Do not append `px` inside the calculation and do not multiply `--scale` again.

### 7. UI approval pipeline

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

A new screen should not skip wireframe and visual approval unless the user explicitly combines phases and accepts rework risk.

### 8. Validate

GitHub Actions validates:

- Node script syntax;
- repository structure;
- integration declarations;
- generated AI registry index;
- release policy;
- Svelte UI build;
- release builder dry run;
- a real temporary release package.

### 9. Create a production release

```bash
node scripts/create-release.mjs
```

Output:

```text
release/<resource_name>-<version>/
```

Useful options:

```bash
node scripts/create-release.mjs --bump minor
node scripts/create-release.mjs --bump major
node scripts/create-release.mjs --version 2.0.0
node scripts/create-release.mjs --name my_resource
node scripts/create-release.mjs --skip-ui-build
node scripts/create-release.mjs --dry-run --skip-ui-build
```

The builder:

- chooses Semantic Versioning automatically;
- builds UI by default;
- copies only allowlisted runtime files;
- patches production `ui_page` and version;
- excludes AI files, docs, tests, examples, scripts, UI source, and development dependencies;
- applies explicit secret sanitizers;
- fails on remaining credential-like values;
- writes `RELEASE.json` evidence.

See `docs/releasing.md`.

## Repository structure

```text
.
├── config/                       editable configuration
├── shared/                       cross-runtime code
├── client/                       client modules and bootstrap
├── server/                       server modules and bootstrap
├── ui/                           Svelte NUI source
├── html/                         generated NUI output
├── release/                      generated deployable resources
├── examples/resources/           runnable examples, not loaded by template
├── tests/                        tests and executable test plans
├── scripts/                      validation/release tooling
├── docs/                         architecture, design, UI specs, release docs
├── .ai/
│   ├── rules/                    domain constraints
│   ├── skills/                   task workflows
│   ├── memory/                   durable decisions/environment/requirements
│   ├── work/                     temporary task context packet
│   ├── integrations/             registered provider profiles
│   ├── features/                 feature ownership maps
│   ├── components/               UI component contracts
│   ├── events/                   event/callback/export contracts
│   ├── database/                 persistent-data contracts
│   ├── examples/                 concise on-demand patterns
│   ├── prompts/                  reusable task entrypoints
│   ├── checklists/               completion gates
│   ├── CONTEXT_BUDGET.md         context-loading limits
│   └── index.json                generated registry path index
├── integrations.json             selected provider metadata only
├── release.config.json           runtime allowlist and explicit sanitizers
├── resource.json                 machine-readable resource metadata
├── AGENTS.md                     main AI router
└── fxmanifest.lua                FiveM manifest/load order
```

## AI context model

The default packet is intentionally small:

```text
AGENTS.md
→ .ai/CONTEXT_BUDGET.md
→ one primary skill
→ 1-4 relevant rules
→ one active requirement
→ one feature registry
→ selected provider profiles only
→ affected source files
```

Do not load all rules, all providers, all features, delivered history, or generated HTML by default.

For multi-step or cross-model tasks, create:

```text
.ai/work/current-task.md
```

from `.ai/work/TEMPLATE.md`. It records the exact files to read, files to avoid, confirmed environment, decisions, acceptance criteria, and validation. Durable decisions must be moved into requirements/registries when the task completes; then the task packet is removed or reset.

## Requirements lifecycle

```text
.ai/memory/requirements/
├── active/          Discovery, Proposed, Approved, Implementing
├── delivered/       completed maintenance/regression context
├── superseded/      replaced historical decisions
└── TEMPLATE.md
```

Read active requirements first. Load delivered or superseded files only for maintenance, compatibility, migration, or historical decision analysis.

## Integrations

Provider workflow:

```text
Register docs once
→ concise provider profile
→ select/activate only when required
→ generate only required operation/runtime adapter
→ remove unused runtime bridge files
```

- Selected providers live only in `integrations.json`.
- Registered API knowledge lives under `.ai/integrations/providers/`.
- Sending docs does not authorize runtime integration.
- Feature code uses stable capability contracts rather than direct provider calls.
- ESX/QBCore/Qbox/oxmysql/custom adapters are not generated speculatively.

## AI registry index

Run after adding/removing registry documents:

```bash
node scripts/build-ai-index.mjs
```

CI verifies:

```bash
node scripts/build-ai-index.mjs --check
```

`.ai/index.json` lets an agent locate a feature, event, component, data store, or provider profile without scanning every registry file.

## Config and module architecture

Approved decisions:

- `docs/decisions/001-config-architecture.md`
- `docs/decisions/002-module-architecture.md`

Core rules:

- `config.main.lua` initializes Config and loads first;
- one module has one responsibility;
- server owns authoritative decisions;
- `fxmanifest.lua` controls deterministic order;
- no custom loader without a proven need;
- inactive adapters/config/dependencies are removed before completion.

## Release security

Release sanitization is explicit, not based on broad key-name guessing.

Use `release.config.json`:

- `jsonSecretPaths`: exact JSON file and object path;
- `textSanitizers`: exact file, regex, and replacement;
- `secretValuePatterns`: hard-fail scans for known credential formats;
- `secretKeyHints`: suspicious-assignment detection only.

If an exact sanitizer is stale or does not match, release creation fails. If a credential-like value remains, release creation fails.

## Important entrypoints

- `AGENTS.md`
- `.ai/skills/INDEX.md`
- `.ai/rules/INDEX.md`
- `.ai/skills/discover-requirements/SKILL.md`
- `.ai/skills/create-resource/SKILL.md`
- `.ai/skills/add-feature/SKILL.md`
- `.ai/skills/add-integration/SKILL.md`
- `.ai/skills/release-resource/SKILL.md`
- `.ai/checklists/before-release.md`
- `docs/releasing.md`

## Validation limitations

FiveM runtime behavior still requires a real test server for native APIs, resource lifecycle, player disconnects, framework objects, external provider behavior, and gameplay interaction. Report any checks that were not executed.
