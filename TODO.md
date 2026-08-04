# TODO — FiveM Resource AI Framework

This file contains unresolved work after the `resource/` restructure. Work from the current `main` branch, inspect existing files before creating replacements, and keep the repository provider-neutral and token-efficient.

## Current source of truth

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

Repository tooling remains outside `resource/`:

```text
.ai/
docs/
examples/
scripts/
tests/
types/
release/
```

Important constraints:

- `resource/` is the only FiveM development resource and junction target.
- `resource/ui/` is the only Svelte source tree.
- `resource/html/` and `release/` are generated outputs; only `.gitkeep` should normally be tracked.
- Do not restore `Development/Svelte`, root-level runtime folders, OverLord components, Tailwind, or Lua hot reload.
- GitHub Actions remain disabled by default. Workflow examples may be supplied as opt-in templates.
- Optional capabilities must remain outside production runtime until requirements explicitly select them.

---

## 📋 Checklist สั่ง AI / Developer ทำต่อ

สามารถ copy-paste ส่วนนี้ให้ AI หรือทีมพัฒนาทำตามลำดับได้เลย

### 🚨 Priority 1 — Verify that `resource/` is genuinely runnable

> Read existing files first. Do not recreate or overwrite working bootstraps blindly.

- [ ] Inspect and complete `resource/fxmanifest.lua` with Lua 5.4, shared/client/server scripts, and `ui_page 'html/index.html'` when UI is enabled.
- [ ] Verify every manifest path exists relative to `resource/`.
- [ ] Inspect `resource/config/config.main.lua`; keep it as the first, minimal configuration bootstrap.
- [ ] Inspect `resource/client/main.lua` and `resource/server/main.lua`; keep them small and prove both runtimes start successfully.
- [ ] Confirm `resource/shared/lib/`, `resource/shared/modules/`, `resource/client/modules/`, and `resource/server/modules/` have intentional placeholders or small generic examples only.
- [ ] Add at most one tiny provider-neutral example module per runtime when it materially improves comprehension.
- [ ] Confirm the built resource can run when only the contents of `resource/` are deployed.
- [ ] Perform start, restart, stop, and player-drop cleanup verification on a real FXServer.

### 🚨 Priority 2 — Add executable examples

- [ ] Create `examples/hello-world/` showing client intent → server validation → server response → client result, without NUI or framework dependencies.
- [ ] Create `examples/shop-system/` showing config, client/server modules, stable contracts, database adapter boundary, optional migration, integrations, and NUI.
- [ ] Keep the shop example provider-neutral; do not hardcode oxmysql, ESX, QBCore, Qbox, or ox_lib as defaults.
- [ ] Create `examples/README.md` explaining what each example teaches, required capabilities, setup, and execution.
- [ ] Ensure AI routing loads only the selected example rather than scanning all examples.

### 🚨 Priority 3 — Make runtime testing practical

- [ ] Audit `examples/capabilities/runtime-tests/` before creating another runner.
- [ ] Decide whether the current runner should remain an opt-in standalone test resource or be promoted to a reusable test toolkit.
- [ ] Add runnable tests for config bootstrap and event/callback contracts.
- [ ] Add lifecycle scenarios for resource restart, player disconnect, state cleanup, and provider unavailability.
- [ ] Add `tests/README.md` with exact FXServer setup and commands.
- [ ] Keep runtime tests out of production manifests and release packages.
- [ ] Record tests that still require manual gameplay rather than claiming full automation.

### ⚠️ Priority 4 — Consolidate local validation

- [ ] Audit existing validators before adding new scripts:
  - `scripts/validate-template.mjs`
  - `scripts/validate-integrations.mjs`
  - `scripts/build-ai-index.mjs`
  - `scripts/create-release.mjs`
  - `tests/release/create-release.integration.mjs`
- [ ] Add a focused manifest validator only if current validation does not already cover all manifest paths and runtime files.
- [ ] Add a fail-closed secret scanner for API keys, passwords, tokens, webhook URLs, and credentials, with explicit allowlists for fixtures.
- [ ] Add a pinned local LuaLS diagnostic command; do not claim Lua validation is automated until it runs from a clean clone.
- [ ] Add `svelte-check` and `npm run check` while retaining JavaScript/JSDoc rather than forcing TypeScript.
- [ ] Add a root `package.json` only when it provides a useful aggregator such as `npm run validate`; do not duplicate UI dependencies at root.
- [ ] Ensure validators only report failures and never delete or rewrite files automatically.

### ⚠️ Priority 5 — Supply opt-in CI/CD templates

- [ ] Create `examples/github-workflows/ci.yml` to run local validation, Lua diagnostics, Svelte checks, UI build, and secret scanning.
- [ ] Create `examples/github-workflows/release.yml` to build a release after an explicit tag or manual dispatch.
- [ ] Create `examples/github-workflows/README.md` describing required permissions, secrets, and how to copy templates into `.github/workflows/`.
- [ ] Add `docs/ci-cd.md` stating that workflows are intentionally disabled by default.
- [ ] Do not recreate active workflows in `.github/workflows/` without owner approval.

### 💡 Priority 6 — Finish optional capabilities

- [ ] Audit and improve `examples/capabilities/i18n/`; do not add i18n to single-language resources automatically.
- [ ] Add NUI-side locale state, placeholder parity checks, missing-key diagnostics, and Thai long-text tests when the i18n capability is selected.
- [ ] Audit and improve `examples/capabilities/database-migrations/` with immutable IDs, checksums, transactions, and provider adapters.
- [ ] Keep migrations forward-only; never perform destructive automatic rollback.
- [ ] Audit `resource/ui/src/js/NuiBridge.js` for timeout, abort, structured errors, pending-request bounds, response validation, listener disposal, and cleanup.
- [ ] Add automatic retry only for explicitly safe and idempotent operations; do not retry purchases or mutations by default.

### 🔥 Priority 7 — Production-quality patterns

- [ ] Define a small structured error contract shared by Lua, NUI, tests, and localization.
- [ ] Add lifecycle helpers or examples for `onResourceStart`, `onResourceStop`, and player cleanup.
- [ ] Add a logging/telemetry capability contract without binding runtime code to one logger provider.
- [ ] Add callback/request correlation IDs and bounded pending request tracking where asynchronous flows require them.
- [ ] Add duplicate event/callback registration detection in development tooling when practical.
- [ ] Add lightweight development-only timing/profiler hooks; exclude them from production unless explicitly enabled.
- [ ] Add hot-restart-safe cleanup examples, while continuing to use normal resource restart rather than Lua hot reload.
- [ ] Require local validation to pass before release generation.

---

## 🤖 Improvements derived from `feat.md`

The external analysis correctly identifies strengths in context budgeting, skill routing, discovery, provider registration, release security, FiveM lifecycle awareness, wireframe-first UI, and cross-session task packets. Preserve those systems.

The following recommendations are worth implementing.

### A. Add a runtime debugging skill

- [ ] Create `.ai/skills/debug-resource/SKILL.md` or `.ai/skills/debug-runtime/SKILL.md`.
- [ ] Accept FXServer/client/NUI logs, reproduction steps, runtime side, artifact version, enabled providers, and last known good commit.
- [ ] Trace errors to likely source files and contracts without loading the entire repository.
- [ ] Require a minimal reproduction and distinguish confirmed evidence from hypotheses.
- [ ] Include common FiveM failure classes: missing export, dependency start order, invalid entity/network ID, player disconnect, callback timeout, NUI focus lock, duplicate handler, and database failure.
- [ ] Store durable discoveries in `.ai/memory/known-problems.md` only after confirmation.

### B. Add a refactor-specific skill

- [ ] Create `.ai/skills/refactor-feature/SKILL.md`.
- [ ] Require behavior-preservation criteria, affected public contracts, migration impact, test coverage, and rollback plan before editing.
- [ ] Prefer incremental patches and avoid whole-file rewrites unless the file is being intentionally replaced.
- [ ] Remove dead paths, dependencies, adapters, docs, and registry entries as part of the same refactor.
- [ ] Verify release output and resource restart behavior after structural changes.

### C. Introduce schema-first contracts selectively

- [ ] Define compact schemas for high-risk boundaries: network events, NUI requests/responses, public exports, integration options, configs, and database rows.
- [ ] Decide on one canonical schema representation before generating LuaCATS/JSDoc/TypeScript types.
- [ ] Do not introduce code generation for small resources unless it reduces duplication measurably.
- [ ] Add drift validation between schema, generated types, runtime validators, and documentation when generation is enabled.
- [ ] Preserve server authority and runtime validation; static types alone are insufficient.

### D. Add complex state and race-condition guidance

- [ ] Create a compact rule or recipe for concurrent/multiplayer mutations.
- [ ] Cover idempotency keys, duplicate requests, stale responses, optimistic UI rollback, server ordering, ownership changes, disconnect during mutation, transaction failure, and restart recovery.
- [ ] Provide one provider-neutral example rather than introducing a global state framework.
- [ ] Document when state bags, events, callbacks, persistence, or local feature state are appropriate.
- [ ] Keep event sourcing/state replay out of the default architecture; evaluate it only for a concrete requirement with measurable recovery needs.

### E. Reduce documentation duplication and default context

- [ ] Audit `.ai/rules/`, `.ai/skills/`, `.ai/recipes/`, and docs for repeated requirements.
- [ ] Move repeated if/then guidance into compact decision matrices.
- [ ] Add concise YAML frontmatter only where machine routing benefits from it; do not add metadata everywhere.
- [ ] Keep long explanations in `docs/reference/` and mandatory constraints in compact rules.
- [ ] Measure token/context reduction before claiming numerical savings.
- [ ] Do not add embeddings/vector search to the repository by default; rely on host tooling and explicit routing unless a concrete local search requirement exists.

### F. Normalize provider documentation

- [ ] Extend provider profiles with compact machine-readable operation schemas where helpful.
- [ ] Represent operation name, runtime, arguments, required/optional fields, side effects, return contract, errors, dependencies, and unsupported combinations.
- [ ] Keep human notes only for semantics that schemas cannot express clearly.
- [ ] Continue separating provider registration from runtime activation.
- [ ] Never store secrets or private credentials in provider profiles.

### G. Add an optional pre-commit hook

- [ ] Provide an opt-in hook template that runs `.ai/index.json` generation/checks and fast local validators.
- [ ] Do not silently install hooks or modify developer Git configuration.
- [ ] Keep the hook fast; leave UI production builds and FXServer tests for explicit validation commands.
- [ ] Note that `.ai/index.json` is already generated through `scripts/build-ai-index.mjs`; the task is automation, not a second index implementation.

### H. Add screenshot-based UI review guidance

- [ ] Extend UI review workflow to compare approved wireframes/designs with implementation screenshots.
- [ ] Check layout, spacing, typography, responsive scaling, overflow, long Thai strings, loading/error/empty states, and focus/interaction behavior.
- [ ] Keep image comparison as a review aid rather than claiming pixel-perfect automated verification.
- [ ] Store only approved design references needed by the feature; do not load all visual assets into every UI task.

### Recommendations intentionally rejected or deferred

- [ ] Do not add Lua hot reload; retain Vite HMR for NUI and normal FiveM resource restart for Lua.
- [ ] Do not make event sourcing/state replay a default architecture.
- [ ] Do not force TypeScript across the NUI solely for schema generation.
- [ ] Do not add repository-owned vector embeddings without a proven need.
- [ ] Do not treat approximate token-saving percentages or scoring in `feat.md` as benchmark evidence.

---

## 🧹 Documentation files to remove

Remove only these owner-selected files:

```text
CONTRIBUTING.md
SECURITY.md
SUPPORT.md
CHANGELOG.md
ROADMAP.md
ARCHITECTURE.md
FAQ.md
```

- [ ] Search README files, AI guidance, issue templates, and docs for links to these files before deletion.
- [ ] Move any still-required durable information into the correct canonical location before deleting:
  - contribution constraints → `AGENTS.md` or focused development docs;
  - security/release constraints → security rules and release documentation;
  - current architecture → ADRs, `.ai/features/resource-structure.md`, and README;
  - unresolved roadmap work → this `TODO.md`;
  - recurring questions → concise README sections only when still needed.
- [ ] Delete the seven files after migration of required content.
- [ ] Do not delete `.github/ISSUE_TEMPLATE/` or `.github/PULL_REQUEST_TEMPLATE.md` as part of this task.
- [ ] Run stale-link searches and local validation after deletion.

---

## Validation baseline

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

git status --short
git ls-files "resource/html/**"
git ls-files "release/**"
```

When implemented, also run:

```bash
npm run check --prefix resource/ui
npm run validate
```

Manual FXServer verification remains required for runtime behavior involving natives, lifecycle, entities, players, providers, and NUI focus.

---

## Definition of done

- [ ] `resource/` starts, restarts, and stops cleanly on a real FXServer.
- [ ] Bootstrap files and manifest paths are valid and minimal.
- [ ] At least one minimal executable example exists.
- [ ] Runtime test capability has runnable documented scenarios.
- [ ] Existing local validators and release tests pass from a clean clone.
- [ ] Svelte/JSDoc and LuaLS diagnostics are available as explicit local commands.
- [ ] Optional capability routing remains outside default AI context.
- [ ] Debug and refactor skills are implemented and indexed.
- [ ] High-risk boundaries use stable, validated contracts.
- [ ] Complex state/race-condition guidance exists without imposing a global state framework.
- [ ] Provider docs can use compact schemas without activating providers.
- [ ] Documentation duplication is reduced and measured rather than assumed.
- [ ] The seven selected root documentation files are removed after required content migration.
- [ ] Generated UI/release output is not tracked.
- [ ] No legacy root runtime tree or `Development/Svelte` source returns.
- [ ] Remaining unverified behavior is reported honestly.
