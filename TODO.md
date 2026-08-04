# TODO — Remove Legacy `Development/Svelte`

This TODO is intentionally limited to one task:

> Remove the legacy `Development/Svelte` directory from the `main` branch completely and verify that no active source or configuration still depends on it.

Do **not** restructure the repository, move runtime folders into `resource/`, redesign the junction workflow, or change the release system as part of this task.

---

## Context

`Development/Svelte` is an old Svelte/Vite project created for an OverLord-specific UI component base. It duplicates the current root-level `ui/` project and may contain:

- a second Svelte/Vite application
- old `App.svelte` and NUI helpers
- `ComponentShowcase.svelte`
- OverLord-specific UI components
- OverLord design tokens and CSS variables
- old responsive CSS that may multiply `var(--scale)` twice
- fonts, assets, generated output, or public files
- launch/configuration references to `Development/Svelte`

The active UI source of truth currently remains:

```text
ui/
```

The active build output remains:

```text
html/
```

Do not move either folder during this cleanup.

---

## Scope

### In scope

- inspect all tracked files under `Development/Svelte`
- compare potentially useful generic helpers with the current `ui/` implementation
- remove the complete `Development/Svelte` tree
- remove `Development/` if it becomes empty
- update active references that still point to the removed path
- verify Git no longer tracks anything under `Development/`
- report exactly what was removed and what references were updated

### Out of scope

Do not perform any of the following in this task:

- create or populate a new `resource/` directory
- move `client/`, `server/`, `shared/`, `config/`, `ui/`, or `html/`
- modify the development junction architecture
- modify release packaging paths
- re-enable GitHub Actions
- add a new UI component library
- copy OverLord UI components into `ui/`
- restore `Visible.svelte` or `ComponentShowcase.svelte`
- redesign the AI framework, skills, rules, or capability packs
- perform unrelated cleanup elsewhere in the repository

---

## Required workflow

### 1. Start from `main`

```bash
git switch main
git pull --ff-only
git status --short
```

The working tree must be clean before beginning.

Do not use or merge the temporary `cleanup-resource-structure` branch for this task.

---

### 2. Inventory every tracked file

List every tracked file under the legacy directory:

```bash
git ls-files "Development/Svelte/**"
```

Also inspect the directory tree locally:

```bash
find Development/Svelte -type f | sort
```

On Windows PowerShell:

```powershell
Get-ChildItem -LiteralPath .\Development\Svelte -Recurse -File |
    Select-Object -ExpandProperty FullName
```

Save or review the complete list before deleting anything.

Confirm whether the directory contains any of the following:

```text
package.json
package-lock.json
vite.config.*
index.html
public/
src/App.svelte
src/main.js
src/app.css
src/js/
src/provider/
src/lib/
ComponentShowcase.svelte
tokens.css
node_modules/
dist/
build/
```

`node_modules`, build output, and ignored local files may not be tracked, but they should still be removed from the local directory with the rest of the legacy project.

---

### 3. Compare only generic tooling before deletion

The legacy directory may contain old versions of NUI utilities. Compare them with the current source before deleting:

```text
Development/Svelte/src/js/*
Development/Svelte/src/provider/*
```

against:

```text
ui/src/js/NuiBridge.js
ui/src/js/NuiDebug.js
ui/src/js/Post.js
ui/src/js/createFeatureState.svelte.js
```

Rules:

- Do not copy OverLord UI components, styles, tokens, icons, layouts, or showcases.
- Do not overwrite newer NUI resilience code with an older helper.
- Do not copy a helper merely because it exists in the legacy tree.
- Migrate only a clearly missing, provider-neutral behavior that is still useful.
- Any migrated behavior must be integrated into the current helper rather than creating a duplicate abstraction.
- Keep the current responsive formula in `ui/src/app.css` unchanged unless the legacy audit proves an actual bug.

Expected result in most cases:

```text
No legacy implementation needs to be migrated.
```

If nothing unique is found, state that explicitly in the final report.

---

### 4. Remove the legacy directory

Preferred Git-aware command:

```bash
git rm -r Development/Svelte
```

If `Development/` becomes empty and is still present locally:

```bash
rmdir Development
```

PowerShell equivalent for an untracked or ignored remainder:

```powershell
Remove-Item -LiteralPath .\Development\Svelte -Recurse -Force

if (
    (Test-Path -LiteralPath .\Development) -and
    -not (Get-ChildItem -LiteralPath .\Development -Force)
) {
    Remove-Item -LiteralPath .\Development -Force
}
```

Important:

- Git does not track empty directories.
- Deleting all tracked files below `Development/Svelte` is sufficient to remove that directory from GitHub.
- Do not rely on a validator to remove the directory.
- Do not merely add `Development/` to `.gitignore` while tracked files still exist.

---

### 5. Find and update stale active references

Search for both slash formats:

```bash
git grep -n "Development/Svelte" || true
git grep -n "Development\\Svelte" || true
```

Also search for legacy project identifiers:

```bash
git grep -n "ComponentShowcase" || true
git grep -n "OVERLORD UI COMPONENTS" || true
git grep -n -- "--ol-" || true
git grep -n "npm --prefix Development" || true
git grep -n '"--prefix", "Development/Svelte"' || true
```

Review matches individually.

### Active references that must be fixed

Update references found in active files such as:

```text
.claude/launch.json
README.md
README_TH.md
AGENTS.md
.ai/
docs/
scripts/
package scripts
editor launch configurations
current examples
```

When a launch command still points to the legacy project, update it to the current UI source:

```text
ui/
```

Example:

```json
{
  "runtimeExecutable": "npm",
  "runtimeArgs": ["--prefix", "ui", "run", "dev"],
  "port": 5171
}
```

### Historical references

A changelog, commit history, archived decision record, or explicit migration note may mention `Development/Svelte` as historical context.

Do not rewrite history unnecessarily. A historical mention may remain only when:

- it is clearly marked as old or removed
- it cannot be mistaken for an active path
- no command instructs the user or AI to use it

This `TODO.md` itself is expected to mention the path until the task is completed. It may be deleted or marked complete afterward.

---

### 6. Verify the deletion from Git, not only the filesystem

Run:

```bash
git ls-files "Development/**"
```

Expected output:

```text
<no output>
```

Check filesystem state:

```bash
test ! -e Development/Svelte
```

Check Git status:

```bash
git status --short
```

Expected changes should be limited to:

- deleted files under `Development/Svelte`
- deletion of tracked files elsewhere only if they are obsolete references
- small updates to active configuration or documentation references
- optional update/removal of this TODO after completion

Unexpected changes to runtime architecture, release scripts, integrations, or capability packs must be reverted.

---

### 7. Verify the current UI remains intact

Do not assume deletion is safe without checking the active UI project.

Run:

```bash
npm ci --prefix ui --no-audit --no-fund
npm run build --prefix ui
```

Confirm:

- dependency installation succeeds
- the Svelte project builds
- `ui/src/App.svelte` remains the intended empty application shell
- the responsive root variables remain available
- `NuiBridge.js`, `NuiDebug.js`, `Post.js`, and the state helper remain present
- no import points to `Development/Svelte`

Do not commit generated `html/` output unless the repository policy explicitly requires it. If the build writes generated files that are ignored, leave them untracked/ignored.

---

### 8. Optional local validation

GitHub Actions are intentionally disabled at this stage.

Run local checks only if they currently exist and do not mutate files unexpectedly:

```bash
node scripts/validate-template.mjs
node scripts/validate-integrations.mjs
node scripts/build-ai-index.mjs --check
```

If a validator fails only because it expects a future `resource/` restructure, do not start that restructure in this task. Report the unrelated validator mismatch separately.

Validators must not be used as a substitute for the explicit Git checks above.

---

## Files and folders to preserve

Do not delete or move these as part of this cleanup:

```text
ui/
html/
client/
server/
shared/
config/
fxmanifest.lua
.ai/
.claude/
docs/
examples/
scripts/
tests/
types/
release/
README.md
README_TH.md
```

Specific current UI helpers that must be preserved:

```text
ui/src/js/NuiBridge.js
ui/src/js/NuiDebug.js
ui/src/js/Post.js
ui/src/js/createFeatureState.svelte.js
```

Do not restore these legacy UI artifacts into the active project:

```text
ComponentShowcase.svelte
OverLord component library
OverLord tokens
--ol-* CSS variables
legacy Visible.svelte wrapper
```

---

## Commit guidance

Use one focused commit after verification:

```text
chore: remove legacy Development Svelte project
```

Before committing:

```bash
git diff --stat
git diff --name-status
git diff
```

The diff should be dominated by deletions under:

```text
Development/Svelte/
```

Small active-reference fixes are acceptable.

Do not combine this commit with repository restructuring or unrelated feature work.

---

## Definition of Done

The task is complete only when every item below is true:

- [ ] Work started from the latest `main` branch.
- [ ] Every tracked file under `Development/Svelte` was inventoried.
- [ ] Generic helpers were compared with the current `ui/src/js` implementation.
- [ ] No OverLord UI component, design token, showcase, or legacy provider was migrated.
- [ ] `Development/Svelte` no longer exists locally.
- [ ] `git ls-files "Development/**"` returns no files.
- [ ] `Development/` is absent if it has no other valid contents.
- [ ] Active source and configuration no longer reference `Development/Svelte`.
- [ ] Active launch configuration uses `ui` rather than `Development/Svelte`.
- [ ] The current `ui/` project still installs and builds successfully.
- [ ] No root runtime folder was moved or deleted.
- [ ] No `resource/` restructure was started.
- [ ] No GitHub Action was added.
- [ ] The final diff contains no unrelated architecture or feature changes.
- [ ] One focused cleanup commit was created.

---

## Final report format for Codex

After completing the cleanup, report:

```text
Branch:
Commit:

Removed:
- number of tracked files removed
- legacy directories removed

Updated references:
- each active file changed
- old path -> new path

Legacy audit:
- whether any generic behavior was migrated
- why it was or was not needed

Validation:
- git ls-files result
- stale-reference search result
- npm ci result
- UI build result
- local validator results, if run

Unrelated issues found:
- list only; do not fix without approval
```
