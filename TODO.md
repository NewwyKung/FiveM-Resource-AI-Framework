# TODO — Codex Handoff

This document is the working handoff for continuing development of **FiveM Resource AI Framework** in Codex.

> Start from the `main` branch. Do not assume that earlier cleanup or restructure attempts were completed successfully. Verify the repository tree before changing anything.

---

## 1. Project goal

This repository is an AI-first development framework/template for creating FiveM resources with consistent architecture, clear requirements, optional integrations, reusable development tooling, and token-efficient AI workflows.

The project should help different AI models produce similar-quality FiveM resources even when their coding ability differs. The intended approach is:

```text
small context
+ explicit requirements
+ deterministic workflows
+ compact rules/recipes
+ reusable contracts
+ local validation
+ production-ready release packaging
```

The repository is not intended to become a gameplay framework such as ESX, QBCore, or Qbox. It is a development framework and resource template.

---

## 2. Important current decisions

These decisions should be treated as the current design direction unless the owner explicitly changes them.

### 2.1 Resource structure

The repository should contain one dedicated development resource directory:

```text
resource/
├─ fxmanifest.lua
├─ client/
├─ server/
├─ shared/
├─ config/
├─ ui/
├─ html/
├─ locales/        # only when used
├─ sql/            # only when used
├─ data/           # only when used
└─ stream/         # only when used
```

Repository-level tooling and AI files stay outside `resource/`:

```text
.ai/
docs/
examples/
scripts/
tests/
types/
release/
resource/
README.md
README_TH.md
TODO.md
```

### 2.2 Development junction

The FXServer development resource should be a single Windows junction pointing to `<repo>/resource`.

Expected result:

```text
D:\FXServer\server-data\resources\[local]\my_resource
    -> <repository>\resource
```

Do not create one junction per folder. Do not copy the resource to a second development directory.

### 2.3 Config structure

Do not recreate these folders:

```text
config/client/
config/server/
config/shared/
```

They were considered repetitive and difficult to understand.

`config/` should contain editable resource configuration grouped by domain:

```text
resource/config/
├─ config.main.lua
├─ config.item.lua
├─ shop/
│  └─ 24.7_store.lua
└─ ...
```

Runtime-specific logic belongs in:

```text
resource/client/
resource/server/
resource/shared/
```

If existing files under `config/functions/` contain executable client/server/shared logic rather than plain configuration, evaluate and move them to suitable runtime libraries such as:

```text
resource/client/lib/config.lua
resource/server/lib/config.lua
resource/shared/lib/config.lua
```

Do not move files blindly. Inspect their actual responsibilities first.

### 2.4 UI

`resource/ui/` is the only Svelte source tree.

`resource/html/` is generated build output and should normally be ignored by Git except for an optional `.gitkeep`.

The empty Svelte application shell is intentional. Do not restore an OverLord component showcase or generic UI component library.

Required responsive formula:

```css
:root {
    --scale: 1;
    --base-screen-height: 1440;
    --px-to-vh: calc(1vh / var(--base-screen-height) * 100 * var(--scale));
}
```

Usage:

```css
width: calc(123 * var(--px-to-vh));
```

Do not multiply by `var(--scale)` a second time.

### 2.5 Lua hot reload

Lua hot reload is out of scope.

Use:

```text
Vite HMR for NUI development
restart <resource_name> for Lua
restart-safe resource lifecycle design
```

### 2.6 GitHub Actions

The validation GitHub Action was intentionally removed for now.

Do not recreate `.github/workflows/validate.yml` unless the owner explicitly requests it.

Validation should remain available as local scripts that Codex, developers, or release tooling can run manually.

---

## 3. Known repository problem

### 3.1 Legacy `Development/Svelte`

The following legacy tree still exists on `main` and must be removed completely:

```text
Development/Svelte/
```

It was created as an older OverLord-specific Svelte/component project and may contain:

- duplicate Vite/Svelte project files
- UI components
- `ComponentShowcase.svelte`
- OverLord design tokens
- old responsive CSS
- old `Post.js`
- old providers
- fonts or public assets
- generated files
- references to `Development/Svelte`

The current source of truth must become:

```text
resource/ui/
```

Before deletion:

1. List every tracked file under `Development/Svelte`.
2. Confirm no unique generic tooling exists there that is missing from the current `ui/` source.
3. If a genuinely useful generic helper exists, migrate the concept—not the OverLord UI/components—to the new source.
4. Delete the entire `Development/Svelte` tree.
5. Delete `Development/` if it becomes empty.
6. Search the whole repository for stale references.

Required stale-reference searches:

```bash
git grep -n "Development/Svelte"
git grep -n "Development\\Svelte"
git grep -n "OVERLORD UI COMPONENTS"
git grep -n "ComponentShowcase"
git grep -n -- "--ol-"
```

Historical changelog or decision records may mention old paths if clearly marked as historical. Active source, scripts, skills, README files, launch configuration, and examples must not use them.

---

## 4. Branch warning

A temporary branch named approximately:

```text
cleanup-resource-structure
```

was created during an incomplete attempt. It may contain only `resource/.gitkeep` and should not be treated as the completed restructure.

For Codex:

1. Start from `main`.
2. Inspect the temporary branch only if useful for history.
3. Do not merge it blindly.
4. Perform the actual migration in a fresh branch or directly according to the owner's preferred workflow.

---

## 5. Required restructure plan

Perform this as a controlled migration. Avoid leaving both root-level runtime folders and `resource/` copies in the final branch.

### Phase A — Inventory and source-of-truth audit

Before moving files, record the current repository tree.

Classify all top-level paths into:

```text
runtime source
UI source
build output
development tooling
AI instructions
examples/capability packs
tests
documentation
legacy/duplicate
release output
```

At minimum, inspect:

```text
client/
server/
shared/
config/
ui/
html/
fxmanifest.lua
locales/
sql/
data/
stream/
Development/
scripts/
tests/
examples/
.ai/
types/
release/
```

Do not infer that an empty directory is gone. Verify tracked files with Git.

### Phase B — Create final `resource/` structure

Move runtime files into:

```text
resource/fxmanifest.lua
resource/client/
resource/server/
resource/shared/
resource/config/
resource/ui/
resource/html/
```

Move optional runtime folders only if they currently exist and are genuinely part of the resource:

```text
resource/locales/
resource/sql/
resource/data/
resource/stream/
```

Use Git-aware moves where possible so history remains understandable.

### Phase C — Remove root runtime duplicates

After verifying the migrated files, remove the old root-level copies:

```text
client/
server/
shared/
config/
ui/
html/
fxmanifest.lua
```

Only remove them after all scripts, docs, release logic, and launch configurations use `resource/` paths.

Final state must not contain two runtime source trees.

### Phase D — Update the manifest

Verify `resource/fxmanifest.lua` references only files inside `resource/`.

Expected conceptual structure:

```lua
shared_scripts {
    'config/config.main.lua',
    'config/config.item.lua',
    'config/shop/**/*.lua',
    'shared/lib/**/*.lua',
    'shared/modules/**/*.lua',
}

client_scripts {
    'client/lib/**/*.lua',
    'client/modules/**/*.lua',
    'client/main.lua',
}

server_scripts {
    'server/lib/**/*.lua',
    'server/modules/**/*.lua',
    'server/main.lua',
}
```

Do not add wildcard paths for folders that do not exist.

If UI is enabled:

```lua
ui_page 'html/index.html'

files {
    'html/index.html',
    'html/**/*',
}
```

If supporting resources without NUI, add an explicit UI capability flag rather than forcing all releases to contain UI.

### Phase E — Update UI build paths

`resource/ui/` should build into:

```text
resource/html/
```

Update Vite configuration accordingly.

Development command should become conceptually:

```bash
npm --prefix resource/ui run dev
```

Build command:

```bash
npm --prefix resource/ui run build
```

The package lock must move with the UI source and remain committed:

```text
resource/ui/package-lock.json
```

Generated `resource/html/*` should be ignored except optional `.gitkeep`.

### Phase F — Update editor/AI launch configuration

Update `.claude/launch.json` or equivalent launch files from old paths such as:

```text
Development/Svelte
ui
```

to:

```text
resource/ui
```

Do not delete `.claude/` merely because one path is stale.

### Phase G — Update development junction tooling

Update:

```text
scripts/setup-dev-resource.ps1
```

The script must:

1. Ask for the FXServer resources/category folder if not provided.
2. Ask for the resource junction name if not provided.
3. Resolve `<repo>/resource` as the junction target.
4. Confirm `<repo>/resource/fxmanifest.lua` exists before creating the junction.
5. Never delete a real directory.
6. Replace an existing target only when it is a junction/reparse point and `-Force` is explicitly used.
7. Print the final `ensure <resource_name>` line.

Expected core logic:

```powershell
$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$resourceRoot = Join-Path $repoRoot 'resource'

if (-not (Test-Path -LiteralPath (Join-Path $resourceRoot 'fxmanifest.lua') -PathType Leaf)) {
    throw "Invalid resource root: fxmanifest.lua was not found in $resourceRoot"
}

New-Item -ItemType Junction -Path $junctionPath -Target $resourceRoot
```

Update the AI setup skill so AI asks only for missing values:

- FXServer resources/category folder path
- desired development resource name

The AI should remember the confirmed path in environment memory when appropriate and should not repeatedly ask for it.

### Phase H — Update release builder

The release builder must read runtime source from:

```text
resource/
```

but continue writing release packages to:

```text
release/{resource_name}-{version}/
```

Release output must contain the contents of `resource/`, not an extra nested `resource/` folder.

Correct:

```text
release/my_resource-1.0.0/
├─ fxmanifest.lua
├─ client/
├─ server/
├─ shared/
├─ config/
└─ html/
```

Incorrect:

```text
release/my_resource-1.0.0/resource/fxmanifest.lua
```

Update:

```text
scripts/create-release.mjs
release.config.json
tests/release/create-release.integration.mjs
docs/releasing.md
.ai/skills/release-resource/SKILL.md
.ai/checklists/before-release.md
```

Release behavior must remain:

- automatic Semantic Versioning
- UI build by default
- skip build only when explicitly requested
- allowlist-based copying
- explicit secret sanitization
- no AI/docs/tests/examples/dev files in release
- production manifest paths
- final folder ready for FXServer

### Phase I — Update validators and local checks

GitHub Actions remain disabled, but local scripts should work with the new structure.

Review and update:

```text
scripts/validate-template.mjs
scripts/validate-integrations.mjs
scripts/build-ai-index.mjs
scripts/create-release.mjs
tests/release/create-release.integration.mjs
```

Local validation should verify:

- `resource/fxmanifest.lua` exists
- no root runtime duplicate remains
- `Development/` does not exist
- `config/client`, `config/server`, and `config/shared` do not exist
- UI source is only under `resource/ui`
- generated HTML is not committed unexpectedly
- release creation works from `resource/`
- junction target logic points to `resource/`
- active docs do not reference stale paths

Do not make local validation delete files automatically. It should report failures and exit non-zero.

---

## 6. Files and folders likely to remove

Verify each path on `main` before deletion.

### Must remove

```text
Development/Svelte/
```

Then remove if empty:

```text
Development/
```

### Must not exist after restructure

```text
client/                     # root duplicate
server/                     # root duplicate
shared/                     # root duplicate
config/                     # root duplicate
ui/                         # root duplicate
html/                       # root duplicate
fxmanifest.lua              # root duplicate
config/client/
config/server/
config/shared/
```

These are removed only after equivalent files are correctly migrated into `resource/`.

### Confirm already removed or remove if still present

```text
fivem-development.skill
.github/workflows/validate.yml
ui/src/provider/Visible.svelte
ui/src/lib/ComponentShowcase.svelte
ui/src/lib/tokens.css
```

Paths under root `ui/` may move to `resource/ui/`; distinguish between files that should be migrated and legacy files that should be deleted.

### Generated files that should not be committed

```text
resource/html/index.html
resource/html/**/*.js
resource/html/**/*.css
release/*
resource/ui/node_modules/
```

Keep `.gitkeep` only if needed to preserve empty directories.

---

## 7. Files and folders to keep

Keep and update paths where necessary:

```text
.ai/
docs/
examples/
scripts/
tests/
types/
release/
README.md
README_TH.md
CONTRIBUTING.md
SECURITY.md
SUPPORT.md
CHANGELOG.md
ROADMAP.md
ARCHITECTURE.md
FAQ.md
LICENSE
TODO.md
```

Keep optional capability packs outside the production resource:

```text
examples/capabilities/i18n/
examples/capabilities/database-migrations/
examples/capabilities/runtime-tests/
```

These are copied or adapted only when a resource chooses that capability.

---

## 8. Existing capabilities that should survive the migration

### 8.1 AI context efficiency

Preserve:

```text
.ai/CONTEXT_BUDGET.md
.ai/index.json
.ai/work/
.ai/memory/environment.md
.ai/memory/requirements/active/
.ai/memory/requirements/delivered/
.ai/memory/requirements/superseded/
```

The normal AI context should remain approximately:

```text
AGENTS.md
+ one primary skill
+ 1–4 relevant rules
+ one active requirement
+ one feature registry
+ selected provider profiles only
+ affected source files only
```

Do not make every task read all rules, providers, examples, capability packs, or raw references.

### 8.2 Integration workflow

Preserve the distinction:

```text
Register provider docs
!=
Activate provider in runtime
```

Registering documentation should not create adapters, change the manifest, or modify runtime code.

Activating a provider should create only the operations and runtime sides required by the current feature.

### 8.3 Type safety

Preserve LuaLS practice:

```text
.luarc.json
types/fivem.lua
docs/type-safety.md
```

After moving runtime source to `resource/`, update LuaLS workspace/library paths if necessary.

Annotations should focus on:

- public exports
- network payloads
- NUI callbacks
- config contracts
- services
- repositories
- adapters
- database rows
- nullable provider results

Do not annotate every trivial local function.

### 8.4 NUI resilience

Preserve the generic NUI bridge concepts in the new UI source:

- callback timeout
- `AbortController`
- request IDs
- bounded pending requests
- structured errors
- HTTP status validation
- response validation
- disposable listeners
- one-time listeners
- bridge cleanup
- diagnostics

Do not copy visual UI or components from Byte Labs. Byte Labs should remain credited for developer-experience inspiration.

### 8.5 Svelte state management

Preserve the lightweight feature state pattern:

```text
idle -> loading -> ready -> submitting -> success/error -> reset
```

No Redux-style dependency should be added by default.

### 8.6 Optional i18n

Keep i18n optional. Only add runtime i18n to a resource when requirements specify multiple languages or translation-ready support.

### 8.7 Optional database migrations

Use migration support only when the resource owns database schema.

Keep migrations:

- forward-only
- immutable after release
- checksum-protected
- transaction-based where supported
- provider-neutral at the contract level

Do not add an ORM.

### 8.8 Optional runtime tests

Runtime tests remain opt-in.

When not selected, provide:

- pure tests where possible
- manual FXServer test checklist
- transparent statement of what was not runtime-tested

Do not include the runtime test runner in production manifests.

---

## 9. Documentation updates required after restructure

Search all active documentation and AI instructions for root runtime paths and update them to `resource/...`.

At minimum inspect:

```text
README.md
README_TH.md
AGENTS.md
ARCHITECTURE.md
FAQ.md
ROADMAP.md
CONTRIBUTING.md
docs/releasing.md
docs/type-safety.md
.ai/skills/**/SKILL.md
.ai/rules/
.ai/recipes/
.ai/checklists/
.ai/prompts/
.ai/examples/
.ai/memory/
.claude/launch.json
```

Avoid globally replacing text without reviewing context. Some documentation may intentionally discuss release output paths or historical structures.

Update the repository map to distinguish:

```text
resource/   FiveM development resource
.ai/        AI workflows and compact knowledge
docs/       human documentation
examples/   optional patterns/capability packs
scripts/    local tooling
release/    generated deployable resources
```

---

## 10. Local validation commands

After the migration, run at minimum:

```bash
node --check scripts/validate-template.mjs
node --check scripts/validate-integrations.mjs
node --check scripts/build-ai-index.mjs
node --check scripts/create-release.mjs
node --check tests/release/create-release.integration.mjs
```

Then:

```bash
node scripts/validate-template.mjs
node scripts/validate-integrations.mjs
node scripts/build-ai-index.mjs --check
```

UI:

```bash
npm ci --prefix resource/ui --no-audit --no-fund
npm run build --prefix resource/ui
```

Release:

```bash
node scripts/create-release.mjs --dry-run --skip-ui-build
node tests/release/create-release.integration.mjs
```

Stale paths:

```bash
git grep -n "Development/Svelte" || true
git grep -n "Development\\Svelte" || true
git grep -n "localhost:3301" || true
git grep -n "v.2-Template-FiveM" || true
git grep -n "OVERLORD UI COMPONENTS" || true
```

Generated output check:

```bash
git status --short
```

Build output may be generated locally but should not become an unintended tracked change.

---

## 11. Manual FXServer verification

After creating the development junction:

1. Add `ensure <resource_name>` to `server.cfg`.
2. Start the server.
3. Confirm the resource loads without missing manifest paths.
4. Confirm no script is loaded from outside the junction target.
5. Confirm client and server main files run once.
6. Restart the resource and confirm no duplicate event/thread behavior.
7. If NUI is enabled, confirm production build loads from `html/index.html`.
8. Run Vite development separately and confirm browser HMR works.
9. Confirm Lua changes require resource restart; do not implement Lua hot reload.
10. Stop the resource and verify focus, listeners, state, entities, and pending NUI requests are cleaned up.

---

## 12. Release acceptance test

Create a test release and confirm:

```text
release/<name>-<version>/
├─ fxmanifest.lua
├─ client/
├─ server/
├─ shared/
├─ config/
└─ html/          # when UI is enabled
```

The package must not contain:

```text
.ai/
.github/
docs/
examples/
tests/
scripts/
resource/
resource/ui/
node_modules/
Development/
TODO.md
real secrets
localhost NUI URLs
```

The package must be ready to place directly into FXServer `resources` and run with:

```cfg
ensure <release-folder-name>
```

Verify version consistency across:

```text
resource metadata
resource/fxmanifest.lua
release folder name
release fxmanifest
RELEASE.json
```

---

## 13. Suggested Codex implementation order

Use small, reviewable commits.

### Commit 1 — Audit only

- Capture current tree.
- List all files under `Development/Svelte`.
- Identify stale references.
- Do not move runtime files yet.

### Commit 2 — Remove legacy UI

- Delete `Development/Svelte` completely.
- Delete empty `Development/`.
- Update stale active references.
- Confirm `resource/ui` or current UI source has all generic helpers that must survive.

### Commit 3 — Move runtime source

- Create final `resource/` tree.
- Move root runtime folders and manifest.
- Do not update release tooling in the same commit unless required for consistency.

### Commit 4 — Update UI and junction tooling

- Move UI source/package files.
- Update Vite output.
- Update `.claude/launch.json`.
- Update junction target to `resource/`.

### Commit 5 — Update release tooling and tests

- Make release builder read from `resource/`.
- Update release config.
- Update integration test.
- Verify deployable output.

### Commit 6 — Update AI routing and documentation

- Update active path references.
- Update repository maps.
- Regenerate/check `.ai/index.json`.

### Commit 7 — Final cleanup

- Remove root duplicates.
- Remove empty obsolete folders.
- Run all local validation.
- Perform manual FXServer checklist where possible.

Do not squash everything into one opaque commit until the migration is proven correct.

---

## 14. Definition of done

The restructure is complete only when all items below are true.

- [ ] Work started from the current `main` branch.
- [ ] `Development/Svelte` no longer exists in the Git tree.
- [ ] `Development/` no longer exists unless it contains an explicitly approved unrelated tool.
- [ ] `resource/fxmanifest.lua` exists.
- [ ] All FiveM runtime source lives under `resource/`.
- [ ] Root-level runtime duplicates do not exist.
- [ ] `config/client`, `config/server`, and `config/shared` do not exist.
- [ ] `resource/ui` is the only Svelte source tree.
- [ ] `resource/html` is build output only.
- [ ] The responsive scaling formula is correct and not double-scaled.
- [ ] Junction tooling targets `<repo>/resource`.
- [ ] Junction tooling refuses to delete real directories.
- [ ] `.claude/launch.json` uses `resource/ui`.
- [ ] Release tooling reads from `resource/`.
- [ ] Release output does not include a nested `resource/` directory.
- [ ] Release output is directly deployable to FXServer.
- [ ] GitHub validation Actions remain absent.
- [ ] Local validation scripts pass.
- [ ] UI dependency installation and build pass.
- [ ] Release integration test passes.
- [ ] No active file references `Development/Svelte`.
- [ ] No inactive framework/database/integration bridge is included in runtime.
- [ ] Optional capabilities remain opt-in.
- [ ] README and architecture documentation match the real tree.
- [ ] `git status` is clean after expected generated files are removed or ignored.

---

## 15. Do not do these things

- Do not trust earlier summaries claiming folders were deleted; verify with Git.
- Do not merge the incomplete cleanup branch blindly.
- Do not keep both root runtime folders and `resource/` copies.
- Do not point the FXServer junction to repository root.
- Do not recreate `Development/`.
- Do not recreate `config/client`, `config/server`, or `config/shared`.
- Do not restore OverLord UI components or showcase files.
- Do not copy Byte Labs UI/components.
- Do not implement Lua hot reload.
- Do not add every framework adapter by default.
- Do not add a full ORM.
- Do not activate i18n, migrations, or runtime tests in every resource.
- Do not commit real webhooks, API keys, tokens, passwords, or private keys.
- Do not recreate GitHub Actions validation without explicit owner approval.
- Do not let validators delete files automatically.
- Do not claim runtime verification passed unless it was actually run in FXServer.

---

## 16. Final handoff report expected from Codex

When the work is complete, provide:

1. Final repository tree summary.
2. Exact folders/files removed.
3. Exact folders/files moved.
4. Junction target and example command.
5. Local validation results.
6. UI build result.
7. Release integration test result.
8. Manual FXServer tests performed and not performed.
9. Remaining risks or follow-up tasks.
10. Commit list with a short purpose for each commit.

Be explicit about anything that could not be verified.
