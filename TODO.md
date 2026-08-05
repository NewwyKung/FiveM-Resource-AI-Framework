# TODO — FiveM Resource AI Framework

This file contains unresolved work after the `resource/` restructure. Work from the current requested branch, inspect existing files before creating replacements, and keep the repository provider-neutral and token-efficient.

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

## Permanent constraints

- `resource/` is the only FiveM development resource and junction target.
- `resource/ui/` is the only Svelte source tree.
- `resource/html/` and `release/` are generated outputs; only `.gitkeep` should normally be tracked.
- Do not restore `Development/Svelte`, root-level runtime folders, OverLord components, or TailwindCSS.
- Use Vite HMR for NUI and normal FiveM resource restart for Lua.
- Do not implement Lua hot reload.
- Do not introduce event sourcing or state replay into the default architecture.
- Do not force a TypeScript migration across the NUI.
- Do not add repository-owned vector embeddings.
- Do not treat estimated token-saving percentages or scores as benchmark evidence.
- GitHub Actions remain disabled by default. Workflow examples may be supplied as opt-in templates.
- Optional capabilities remain outside production runtime until requirements explicitly select them.

---

## 📋 Checklist สั่ง AI / Developer ทำต่อ

สามารถ copy-paste ส่วนนี้ให้ AI หรือทีมพัฒนาทำตามลำดับได้เลย

### 🚨 Priority 1 — Verify that `resource/` is genuinely runnable

> Read existing files first. Do not recreate or overwrite working bootstraps blindly.

- [x] Inspect and complete `resource/fxmanifest.lua` with Lua 5.4, shared/client/server scripts, and `ui_page 'html/index.html'` when UI is enabled.
- [x] Verify every manifest path exists relative to `resource/`.
- [x] Inspect `resource/config/config.main.lua`; keep it as the first, minimal configuration bootstrap.
- [ ] Inspect `resource/client/main.lua` and `resource/server/main.lua`; keep them small and prove both runtimes start successfully.
- [x] Confirm `resource/shared/lib/`, `resource/shared/modules/`, `resource/client/modules/`, and `resource/server/modules/` contain only intentional placeholders or small generic examples.
- [x] Add at most one tiny provider-neutral example module per runtime when it materially improves comprehension.
- [ ] Confirm the built resource can run when only the contents of `resource/` are deployed.
- [ ] Perform start, restart, stop, and player-drop cleanup verification on a real FXServer.

### 🚨 Priority 2 — Add executable examples

- [x] Create `examples/hello-world/` showing client intent → server validation → server response → client result, without NUI or framework dependencies.
- [x] Create `examples/shop-system/` showing config, client/server modules, stable contracts, database adapter boundary, optional migration, integrations, and NUI.
- [x] Keep the shop example provider-neutral; do not hardcode oxmysql, ESX, QBCore, Qbox, or ox_lib as defaults.
- [x] Create `examples/README.md` explaining what each example teaches, required capabilities, setup, and execution.
- [x] Ensure AI routing loads only the selected example rather than scanning all examples.

### 🚨 Priority 3 — Make runtime testing practical

- [x] Audit `examples/capabilities/runtime-tests/` before creating another runner.
- [x] Decide whether the current runner should remain an opt-in standalone test resource or become a reusable test toolkit.
- [x] Add runnable tests for config bootstrap and event/callback contracts.
- [ ] Add lifecycle scenarios for resource restart, player disconnect, state cleanup, and provider unavailability.
- [x] Add `tests/README.md` with exact FXServer setup and commands.
- [x] Keep runtime tests out of production manifests and release packages.
- [x] Record tests that still require manual gameplay rather than claiming full automation.

### ⚠️ Priority 4 — Consolidate local validation

- [x] Audit existing validators before adding new scripts:
  - `scripts/validate-template.mjs`
  - `scripts/validate-integrations.mjs`
  - `scripts/build-ai-index.mjs`
  - `scripts/create-release.mjs`
  - `tests/release/create-release.integration.mjs`
- [x] Add a focused manifest validator only if current validation does not already cover all manifest paths and runtime files.
- [x] Add a fail-closed secret scanner for API keys, passwords, tokens, webhook URLs, and credentials, with explicit allowlists for fixtures.
- [x] Add a pinned local LuaLS diagnostic command; do not claim Lua validation is automated until it runs from a clean clone.
- [x] Add `svelte-check` and `npm run check` while retaining JavaScript/JSDoc.
- [x] Add a root `package.json` only when it provides a useful aggregator such as `npm run validate`; do not duplicate UI dependencies at root.
- [x] Ensure validators only report failures and never delete or rewrite files automatically.

### ⚠️ Priority 5 — Supply opt-in CI/CD templates

- [x] Create `examples/github-workflows/ci.yml` to run local validation, Lua diagnostics, Svelte checks, UI build, and secret scanning.
- [x] Create `examples/github-workflows/release.yml` to build a release after an explicit tag or manual dispatch.
- [x] Create `examples/github-workflows/README.md` describing permissions, secrets, and how to copy templates into `.github/workflows/`.
- [x] Add `docs/ci-cd.md` stating that workflows are intentionally disabled by default.
- [x] Do not create active workflows in `.github/workflows/` without owner approval.

### 💡 Priority 6 — Finish optional capabilities

- [x] Audit and improve `examples/capabilities/i18n/`; do not add i18n to single-language resources automatically.
- [x] Add NUI-side locale state, placeholder parity checks, missing-key diagnostics, and Thai long-text tests when i18n is selected.
- [x] Audit and improve `examples/capabilities/database-migrations/` with immutable IDs, checksums, transactions, and provider adapters.
- [x] Keep migrations forward-only; never perform destructive automatic rollback.
- [x] Audit `resource/ui/src/js/NuiBridge.js` for timeout, abort, structured errors, pending-request bounds, response validation, listener disposal, and cleanup.
- [x] Add automatic retry only for explicitly safe and idempotent operations; do not retry purchases or mutations by default.

### 🔥 Priority 7 — Production-quality patterns

- [x] Define a small structured error contract shared by Lua, NUI, tests, and localization.
- [x] Add lifecycle helpers or examples for `onResourceStart`, `onResourceStop`, and player cleanup.
- [x] Add a logging/telemetry capability contract without binding runtime code to one logger provider.
- [x] Add callback/request correlation IDs and bounded pending request tracking where asynchronous flows require them.
- [x] Add duplicate event/callback registration detection in development tooling when practical.
- [x] Add lightweight development-only timing/profiler hooks; exclude them from production unless explicitly enabled.
- [x] Add restart-safe cleanup examples.
- [x] Require local validation to pass before release generation.

---

## 🤖 AI workflow improvements

### A. Runtime debugging skill

- [x] Create `.ai/skills/debug-resource/SKILL.md` or `.ai/skills/debug-runtime/SKILL.md`.
- [x] Accept FXServer/client/NUI logs, reproduction steps, runtime side, artifact version, enabled providers, and last known good commit.
- [x] Trace errors to likely source files and contracts without loading the entire repository.
- [x] Require a minimal reproduction and distinguish confirmed evidence from hypotheses.
- [x] Cover missing exports, dependency start order, invalid entity/network IDs, player disconnects, callback timeouts, NUI focus locks, duplicate handlers, and database failures.
- [x] Store durable discoveries in `.ai/memory/known-problems.md` only after confirmation.

### B. Refactor-specific skill

- [x] Create `.ai/skills/refactor-feature/SKILL.md`.
- [x] Require behavior-preservation criteria, affected public contracts, migration impact, test coverage, and rollback plan before editing.
- [x] Prefer incremental patches and avoid whole-file rewrites unless a file is intentionally replaced.
- [x] Remove dead paths, dependencies, adapters, docs, and registry entries as part of the same refactor.
- [x] Verify release output and resource restart behavior after structural changes.

### C. Schema-first contracts for high-risk boundaries

- [x] Define compact schemas for network events, NUI requests/responses, public exports, integration options, configs, and database rows.
- [x] Decide on one canonical schema representation before generating LuaCATS, JSDoc, or optional derived types.
- [x] Do not introduce code generation for small resources unless it measurably reduces duplication.
- [x] Add drift validation between schema, generated types, runtime validators, and documentation when generation is enabled.
- [x] Preserve server authority and runtime validation; static types alone are insufficient.

### D. Complex state and race-condition guidance

- [x] Create a compact rule or recipe for concurrent and multiplayer mutations.
- [x] Cover idempotency keys, duplicate requests, stale responses, optimistic UI rollback, server ordering, ownership changes, disconnect during mutation, and transaction failure.
- [x] Provide one provider-neutral example rather than introducing a global state framework.
- [x] Document when state bags, events, callbacks, persistence, or feature-local state are appropriate.

### E. Reduce documentation duplication and default context

- [x] Audit `.ai/rules/`, `.ai/skills/`, `.ai/recipes/`, and docs for repeated requirements.
- [x] Move repeated if/then guidance into compact decision matrices.
- [x] Add concise YAML frontmatter only where machine routing benefits from it.
- [x] Keep long explanations in `docs/reference/` and mandatory constraints in compact rules.
- [x] Report concrete file/context reductions instead of unsupported percentage claims.

### F. Normalize provider documentation

- [x] Extend provider profiles with compact machine-readable operation schemas where helpful.
- [x] Represent operation name, runtime, arguments, required/optional fields, side effects, return contract, errors, dependencies, and unsupported combinations.
- [x] Keep human notes only for semantics that schemas cannot express clearly.
- [x] Continue separating provider registration from runtime activation.
- [x] Never store secrets or private credentials in provider profiles.

### G. Optional pre-commit hook

- [x] Provide an opt-in hook template that runs `.ai/index.json` generation/checks and fast local validators.
- [x] Do not silently install hooks or modify developer Git configuration.
- [x] Keep the hook fast; leave UI production builds and FXServer tests for explicit validation commands.
- [x] Reuse `scripts/build-ai-index.mjs`; do not create a second index implementation.

### H. Screenshot-based UI review guidance

- [x] Extend UI review workflow to compare approved wireframes/designs with implementation screenshots.
- [x] Check layout, spacing, typography, responsive scaling, overflow, long Thai strings, loading/error/empty states, and focus/interaction behavior.
- [x] Treat image comparison as a review aid rather than automated pixel-perfect verification.
- [x] Store only approved design references needed by the feature.

### I. Cross-agent runtime verification

- [x] Route GPT/Codex, Claude, Gemini, Cursor, GitHub Copilot, and Kimi through one canonical `AGENTS.md` agreement with thin vendor adapters.
- [x] Validate adapter paths, context budgets, required fallback safeguards, and static verification metadata locally.
- [ ] Smoke test the documented instruction-loading command in current Claude, Gemini, Cursor, Copilot, and Kimi CLI/IDE versions.
- [ ] Record `testedVersion` and `runtimeVerifiedAt` in `.ai/matrices/agent-entrypoints.json` only after each real smoke test passes.

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

- [x] Search README files, AI guidance, issue templates, and docs for links to these files before deletion.
- [x] Move still-required durable information into the correct canonical location before deleting:
  - contribution constraints → `AGENTS.md` or focused development docs;
  - security/release constraints → security rules and release documentation;
  - current architecture → ADRs, `.ai/features/resource-structure.md`, and README;
  - unresolved roadmap work → this `TODO.md`;
  - recurring questions → concise README sections only when still needed.
- [x] Delete the seven files after required content migration.
- [x] Do not delete `.github/ISSUE_TEMPLATE/` or `.github/PULL_REQUEST_TEMPLATE.md` as part of this task.
- [x] Run stale-link searches and local validation after deletion.

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
- [x] Bootstrap files and manifest paths are valid and minimal.
- [x] At least one minimal executable example exists.
- [x] Runtime test capability has runnable documented scenarios.
- [ ] Existing local validators and release tests pass from a clean clone.
- [x] Svelte/JSDoc and LuaLS diagnostics are available as explicit local commands.
- [x] Optional capability routing remains outside default AI context.
- [x] Debug and refactor skills are implemented and indexed.
- [x] High-risk boundaries use stable, validated contracts.
- [x] Complex state/race-condition guidance exists without imposing a global state framework.
- [x] Provider docs can use compact schemas without activating providers.
- [x] Documentation duplication is reduced and measured through concrete repository changes.
- [x] The seven selected root documentation files are removed after required content migration.
- [x] Generated UI/release output is not tracked.
- [x] No legacy root runtime tree or `Development/Svelte` source returns.
- [x] Remaining unverified behavior is reported honestly.
