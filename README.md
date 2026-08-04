# FiveM Resource AI Framework

An AI-first template for building maintainable FiveM resources with modular Lua architecture, optional Svelte 5 NUI, requirements discovery, reusable integration knowledge, automated validation, and production-ready release packaging.

This repository is designed to help both developers and coding agents produce consistent results without loading the entire project into context.

## Highlights

- Standalone by default; ESX, QBCore, Qbox, oxmysql, ox_lib, and custom resources are opt-in.
- Clear `client`, `server`, `shared`, and `config` boundaries.
- Requirements discovery before substantial implementation.
- Server-authoritative gameplay and security rules.
- Wireframe-first UI workflow with Svelte 5 and Vite.
- Provider documentation can be registered once and reused later.
- Small, task-specific AI context instead of reading every rule and document.
- Automated CI checks and deployable release folders.

## Quick Start

### 1. Create your resource

Use this repository as a GitHub template, or clone it:

```bash
git clone https://github.com/NewwyKung/FiveM-Resource-AI-Framework.git my_resource
cd my_resource
```

Update the resource metadata in:

```text
fxmanifest.lua
resource.json
```

Remove example files, folders, and capabilities your resource does not need.

### 2. Ask the AI to define the resource first

For a new resource or a substantial feature, use a request such as:

```text
Use .ai/skills/discover-requirements/SKILL.md.
Help me define this resource before implementation.
Ask about the framework, database, libraries, integrations,
feature behavior, permissions, failure cases, and UI requirements.
```

The AI will check `.ai/memory/environment.md` and ask only about unresolved capabilities required by the task, such as:

- Standalone, ESX, QBCore, Qbox, or a custom framework;
- ox_lib or another shared library;
- no database, oxmysql, or another database provider;
- inventory, money, notify, logger, progress, target, and other integrations;
- required UI screens and interaction flows.

Confirmed server-wide choices are stored once and reused. Secrets must never be stored in AI memory.

### 3. Approve the requirements

Active requirements and feature ownership are stored in:

```text
.ai/memory/requirements/active/<feature>.md
.ai/features/<feature>.md
```

Implementation starts after approval, or after you explicitly allow the AI to use its recommended defaults.

### 4. Develop and validate

For Lua-only work, follow the approved requirements and relevant task skill.

For NUI development:

```bash
npm ci --prefix ui
npm run dev --prefix ui
npm run build --prefix ui
```

- UI source: `ui/`
- Generated output: `html/`
- Development port: `5171`
- Never edit generated `html/` files directly.

Run the repository validations through GitHub Actions or the relevant scripts before release.

## Working with AI

The main AI entrypoint is:

```text
AGENTS.md
```

The intended context flow is deliberately small:

```text
AGENTS.md
→ .ai/CONTEXT_BUDGET.md
→ one primary skill
→ only relevant rules
→ one active requirement
→ one feature registry
→ selected provider profiles
→ affected source files
```

Agents should not load all rules, providers, features, historical requirements, reference documents, or generated UI files by default.

For long or cross-model tasks, use:

```text
.ai/work/current-task.md
```

Create it from `.ai/work/TEMPLATE.md` to record the current phase, exact files to read, files to avoid, confirmed decisions, acceptance criteria, and validation status.

## Common AI Commands

### Create a resource

```text
Discover and design a new <resource name> resource.
Do not implement until the requirements are approved.
```

### Add a feature

```text
Add <feature> to this resource.
Read the active requirements and environment first.
Ask only for missing decisions, then implement after approval.
```

### Register an integration

```text
Register <resource name> as a <capability> provider.
Store the following documentation for reuse.
Do not integrate it into runtime code yet.

<paste documentation or schema>
```

### Activate an integration

```text
Use the registered <provider> integration for <feature>.
Implement only the operations and runtimes this feature requires.
```

### Create a release

```text
Create a production release.
```

The AI will use the release workflow, choose the next semantic version, build the UI by default, sanitize explicitly configured secrets, and create:

```text
release/<resource_name>-<version>/
```

## UI Workflow

New UI work follows this sequence:

```text
Requirements
→ Low-fidelity wireframe
→ Wireframe approval
→ Visual design
→ Visual approval
→ Svelte implementation
→ UI review
→ FiveM validation
```

The responsive sizing system uses a `1440px`-high source canvas:

```css
:root {
    --scale: 1;
    --base-screen-height: 1440;
    --px-to-vh: calc(1vh / var(--base-screen-height) * 100 * var(--scale));
}

.panel {
    width: calc(720 * var(--px-to-vh));
    padding: calc(32 * var(--px-to-vh));
}
```

The design-pixel number is unitless. Do not append `px` inside `calc()` and do not multiply `--scale` again.

NUI code should use the shared bridge utilities under `ui/src/js/` instead of creating a new transport abstraction for every feature.

## Integrations

External frameworks, databases, libraries, and custom resources use this lifecycle:

```text
Register documentation once
→ store a concise provider profile
→ activate only when required
→ generate only the required adapter operations
→ remove unused runtime bridges
```

- Selected providers: `integrations.json`
- Registered provider knowledge: `.ai/integrations/providers/`
- Sending documentation does not authorize runtime integration.
- Feature code should use stable capability boundaries rather than direct provider calls.

## Configuration and Modules

Configuration starts from:

```text
config/config.main.lua
```

Additional domains can use:

```text
config/config.item.lua
config/shop/24.7_store.lua
config/functions/config.functions.client.lua
config/functions/config.functions.server.lua
```

Runtime code is separated into:

```text
shared/lib/         reusable cross-runtime utilities
shared/modules/     contracts, constants, and shared definitions
client/modules/     client behavior and presentation integration
server/modules/     authority, validation, persistence, and business logic
```

`client/main.lua` and `server/main.lua` are bootstraps and should remain small.

## Production Releases

Create a release with:

```bash
node scripts/create-release.mjs
```

Useful options:

```bash
node scripts/create-release.mjs --bump minor
node scripts/create-release.mjs --bump major
node scripts/create-release.mjs --version 2.0.0
node scripts/create-release.mjs --name my_resource
node scripts/create-release.mjs --skip-ui-build
```

The release builder:

- applies semantic versioning;
- builds NUI by default;
- copies only allowlisted runtime files;
- patches the production manifest;
- excludes AI files, development source, tests, and internal documentation;
- sanitizes only explicitly configured secret locations;
- fails if credential-like values remain;
- writes `RELEASE.json` as generation evidence.

See [`docs/releasing.md`](docs/releasing.md) for the complete release policy.

## Repository Map

```text
config/                 editable resource configuration
shared/                 shared Lua code
client/                 client Lua modules
server/                 server Lua modules
ui/                     Svelte 5 NUI source
html/                   generated NUI build
release/                generated deployable resources
examples/               concise and runnable examples
scripts/                validation and release tooling
tests/                  test plans and executable checks
docs/                   decisions, specifications, and references
.ai/                    AI rules, skills, memory, recipes, and registries
AGENTS.md                main AI router
integrations.json        selected provider metadata
release.config.json      release allowlist and sanitizer policy
resource.json            machine-readable resource metadata
fxmanifest.lua           FiveM manifest and load order
```

## Important Documentation

- [`AGENTS.md`](AGENTS.md) — AI routing and repository invariants
- [`.ai/CONTEXT_BUDGET.md`](.ai/CONTEXT_BUDGET.md) — token-efficient context policy
- [`.ai/skills/INDEX.md`](.ai/skills/INDEX.md) — task workflow index
- [`.ai/rules/INDEX.md`](.ai/rules/INDEX.md) — domain rule index
- [`.ai/recipes/README.md`](.ai/recipes/README.md) — deterministic implementation recipes
- [`docs/reference/fivem-engineering-reference.md`](docs/reference/fivem-engineering-reference.md) — normalized engineering reference
- [`docs/releasing.md`](docs/releasing.md) — release workflow and security

## Credits

### Byte Labs Studio

Special thanks to [Byte Labs Studio](https://github.com/Byte-Labs-Studio) and their [BL Svelte Template](https://github.com/Byte-Labs-Studio/bl_svelte_template).

This project does **not** reuse their UI design or UI components. Their work inspired several developer-experience ideas around FiveM NUI development, including browser-side debugging, reusable NUI event helpers, disposable listeners, fallback resource names, and more consistent local development workflows.

See [`docs/reference/bl-svelte-template-review.md`](docs/reference/bl-svelte-template-review.md) for the concepts reviewed and the decisions made for this framework.

## How This Template Was Developed

The AI-facing parts of this repository—including the skills, agent instructions, rules, recipes, memory structure, and supporting workflows—were developed through a multi-model process.

I used **Kimi K2.6** to help write and organize broad FiveM engineering knowledge and best-practice material. I then used **ChatGPT** to review, normalize, summarize, and transform that material into the token-efficient AI skills, rules, recipes, matrices, and repository structure you see here.

For my current day-to-day development, I still primarily use **Claude**. In the future, I may move more of my workflow to **Kimi K3**. Based on my own testing, Kimi has shown a particularly strong understanding of FiveM resource development and many of the surrounding FiveM and GTA V systems compared with other models I have tried.

This is only my personal experience and preference—Kimi did not pay me to say that. 😄

If you find this project useful or enjoy what I have built, thank you very much for your support.

## Notes

This framework improves consistency, but no AI model should be trusted without validation. Native APIs, resource lifecycle behavior, player disconnect handling, framework objects, external providers, and gameplay interactions must still be tested on a real FiveM server.
