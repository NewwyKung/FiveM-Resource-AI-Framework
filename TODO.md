# TODO - Post-Restructure Repository Audit

This file records the remaining work after the `resource/` migration merged into `main` through pull request #3.

The repository structure is now materially different from the earlier cleanup attempts. Do not follow old instructions that assume `client/`, `server/`, `config/`, `ui/`, `html/`, or `fxmanifest.lua` are still located at the repository root.

## 1. Confirmed current source of truth

The FiveM resource is now contained under:

```text
resource/
├─ fxmanifest.lua
├─ client/
├─ server/
├─ shared/
├─ config/
├─ ui/
└─ html/
```

Repository tooling remains outside the resource:

```text
.ai/
docs/
examples/
scripts/
tests/
types/
release/
resource.json
release.config.json
```

Confirmed design decisions:

- `resource/` is the only FiveM development resource and the Windows junction target.
- `resource/ui/` is the only Svelte source tree.
- `resource/html/` is generated output and should track only `.gitkeep`.
- Release packages copy the allowlisted contents of `resource/` directly to the release root.
- `Development/Svelte/` and the old root runtime tree must not return.
- GitHub Actions validation remains intentionally disabled until the owner requests otherwise.

## 2. Reference library status

Do not recreate these nine files merely because they were discussed as a possible design:

```text
docs/reference/fivem-ui.md
docs/reference/testing.md
docs/reference/fault-cases.md
docs/reference/techniques.md
docs/reference/architecture.md
docs/reference/asset-pipeline.md
docs/reference/best-practices.md
docs/reference/localization.md
docs/reference/api-reference.md
```

They were never committed as nine separate canonical files.

The implemented reference design intentionally consolidates the supplied guides into:

```text
docs/reference/README.md
docs/reference/fivem-engineering-reference.md
docs/reference/bl-svelte-template-review.md
```

The long-form engineering reference is not part of default AI context. Canonical rules, recipes, matrices, provider profiles, approved requirements, and current source files must be read first.

Only split the engineering reference into separate files if there is measured navigation value and the split does not duplicate canonical rules or increase default context.

## 3. Confirmed capabilities that must remain

### AI context and memory

```text
AGENTS.md
.ai/CONTEXT_BUDGET.md
.ai/index.json
.ai/work/README.md
.ai/work/TEMPLATE.md
.ai/memory/environment.md
.ai/memory/requirements/active/
.ai/memory/requirements/delivered/
.ai/memory/requirements/superseded/
```

Expected default context remains:

```text
AGENTS.md
+ one primary skill
+ 1-4 relevant rules
+ one active requirement
+ one feature registry
+ selected provider profiles only
+ affected source files only
```

### AI workflow assets

Keep the existing compact layers:

```text
.ai/rules/
.ai/skills/
.ai/recipes/
.ai/matrices/
.ai/examples/
.ai/integrations/
```

Do not replace them with one large universal skill or force every task to read the reference library.

### Type safety

```text
.luarc.json
types/fivem.lua
docs/type-safety.md
```

Lua annotations should remain focused on public contracts, network payloads, callbacks, config shapes, services, repositories, adapters, database rows, and nullable provider results.

### NUI development

```text
resource/ui/src/js/NuiBridge.js
resource/ui/src/js/NuiDebug.js
resource/ui/src/js/Post.js
resource/ui/src/js/createFeatureState.svelte.js
resource/ui/package.json
resource/ui/package-lock.json
```

Required behavior includes callback timeouts, abortable requests, structured errors, bounded pending requests, listener disposal, browser debug scenarios, and feature-local state lifecycle.

### Optional capabilities

These remain outside production runtime until selected:

```text
examples/capabilities/i18n/
examples/capabilities/database-migrations/
examples/capabilities/runtime-tests/
```

Do not activate or copy them into `resource/` unless requirements explicitly need them.

### Release and local validation

```text
scripts/validate-template.mjs
scripts/validate-integrations.mjs
scripts/build-ai-index.mjs
scripts/create-release.mjs
scripts/setup-dev-resource.ps1
release.config.json
tests/release/create-release.integration.mjs
```

Local validation reports failures and exits non-zero. It must not delete files automatically.

## 4. Remaining work for Codex

### Priority 1 - Run a complete local audit on current `main`

Run from a clean clone:

```bash
git switch main
git pull --ff-only
git status --short
git ls-files
```

Confirm these old top-level paths do not exist:

```text
Development/
client/
server/
shared/
config/
ui/
html/
fxmanifest.lua
```

Confirm these legacy paths do not exist:

```text
fivem-development.skill
.github/workflows/validate.yml
resource/config/client/
resource/config/server/
resource/config/shared/
resource/config/functions/
resource/ui/src/provider/Visible.svelte
resource/ui/src/lib/ComponentShowcase.svelte
resource/ui/src/lib/tokens.css
```

### Priority 2 - Run the existing validation baseline

```bash
node --check scripts/validate-template.mjs
node --check scripts/validate-integrations.mjs
node --check scripts/build-ai-index.mjs
node --check scripts/create-release.mjs
node --check tests/release/create-release.integration.mjs

node scripts/validate-template.mjs
node scripts/validate-integrations.mjs
node scripts/build-ai-index.mjs --check

npm ci --prefix resource/ui --no-audit --no-fund
npm run build --prefix resource/ui

node scripts/create-release.mjs --dry-run --skip-ui-build
node tests/release/create-release.integration.mjs
```

After testing, confirm generated files are not accidentally staged:

```bash
git status --short
git ls-files "resource/html/**"
git ls-files "release/**"
```

Only these placeholders should normally be tracked:

```text
resource/html/.gitkeep
release/.gitkeep
```

### Priority 3 - Add Svelte/JavaScript diagnostics

The UI currently has deterministic install and production build scripts, but no dedicated static check command.

Evaluate adding:

```text
svelte-check
```

and a package script such as:

```json
"check": "svelte-check --tsconfig ./jsconfig.json"
```

Requirements:

- update `resource/ui/package.json` and `resource/ui/package-lock.json` together;
- keep JavaScript/JSDoc support rather than forcing a TypeScript migration;
- do not add a large linting stack without a demonstrated need;
- run `npm run check --prefix resource/ui` locally;
- document the command in README and local validation guidance.

### Priority 4 - Add an explicit local LuaLS check workflow

LuaLS configuration and definitions exist, but repository scripts do not currently prove diagnostics from a clean environment.

Design an optional local command or documented workflow that:

- uses a pinned Lua Language Server version;
- checks `resource/**/*.lua`, examples, and type definitions;
- does not require GitHub Actions;
- does not download or run tools silently during unrelated tasks;
- reports diagnostics without rewriting source.

Do not claim Lua static validation is automated until this command is implemented and run successfully.

### Priority 5 - Review the remaining empty UI override file

Inspect:

```text
resource/ui/public/customs.css
```

It currently contains only explanatory comments and is copied into generated output during build.

Decide one of the following:

1. keep it as a documented operator override contract and reference it intentionally; or
2. remove it and remove any corresponding HTML/build reference if it has no active use.

Do not keep a placeholder file merely because it existed in the old template.

### Priority 6 - Add capability routing to the machine-readable index

`.ai/index.json` currently indexes registries such as features, components, events, database contracts, and providers. Optional capability packs are not directly mapped.

Evaluate extending the generated index with a compact section:

```json
"capabilities": {
  "i18n": "examples/capabilities/i18n/README.md",
  "databaseMigrations": "examples/capabilities/database-migrations/README.md",
  "runtimeTests": "examples/capabilities/runtime-tests/README.md"
}
```

Requirements:

- generate the mapping through `scripts/build-ai-index.mjs`; do not maintain duplicate manual values;
- keep capability packs out of default context;
- load a capability README only after requirements select it.

### Priority 7 - Manual FXServer verification

The restructure was validated locally, but a real FXServer run is still required before claiming runtime verification.

Create the development junction using:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\setup-dev-resource.ps1
```

Verify on an actual server:

- resource start;
- resource restart;
- resource stop cleanup;
- player drop cleanup;
- NUI open and close;
- Escape behavior;
- focus return;
- callback success, invalid response, and timeout behavior;
- Vite development workflow;
- production UI build from `resource/html/`;
- release folder start without depending on repository-level files.

Record exact artifact version, server configuration, and providers used.

## 5. Items intentionally not required now

Do not add these without an explicit new requirement:

- Lua hot reload;
- ESX, QBCore, or Qbox adapters in runtime by default;
- oxmysql code in resources that do not use a database;
- an ORM;
- automatic destructive database rollback;
- i18n runtime in single-language resources;
- runtime test runner in production manifests;
- a global UI component library;
- TailwindCSS;
- generated `resource/html` files in Git;
- generated releases in Git;
- GitHub Actions validation;
- the nine duplicate reference files listed in section 2.

## 6. Definition of done for this audit

- [ ] Clean clone matches the expected `resource/` architecture.
- [ ] Existing local validators pass.
- [ ] AI index is current.
- [ ] UI dependencies install deterministically.
- [ ] UI production build succeeds.
- [ ] Release dry run succeeds.
- [ ] Release integration test succeeds.
- [ ] No legacy root runtime tree exists.
- [ ] No legacy OverLord/Development Svelte source exists.
- [ ] Generated UI and release output are not tracked.
- [ ] Reference library uses the consolidated design and is documented accurately.
- [ ] Decision recorded for `resource/ui/public/customs.css`.
- [ ] Decision recorded for Svelte static diagnostics.
- [ ] Decision recorded for local LuaLS diagnostics.
- [ ] Optional capability routing is generated or explicitly deferred.
- [ ] Manual FXServer verification is completed or clearly reported as pending.

When complete, move durable decisions into the appropriate rule, ADR, feature registry, or delivered requirement file. Keep `TODO.md` limited to unresolved work.