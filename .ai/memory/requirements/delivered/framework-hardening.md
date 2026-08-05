# Framework Hardening

Status: Delivered locally verifiable scope

## Goal
Turn the restructured template into a locally verifiable, provider-neutral FiveM development framework with runnable examples, opt-in runtime tests, deterministic validation, stable contracts, and compact AI workflows.

## Delivered
- Minimal provider-neutral lifecycle and structured-error runtime modules.
- Executable hello-world and standalone shop examples.
- Reusable opt-in runtime-test toolkit and documented FXServer setup.
- Root validation, fail-closed secret fixture test, pinned LuaLS command, Svelte/JSDoc diagnostics, release gate, and opt-in CI/hook templates.
- Optional i18n, migration, and observability capability improvements.
- Canonical JSON schemas, race-safety guidance, debug/refactor skills, normalized provider operations, and screenshot review guidance.
- Compact `ai-task/v1` routing with string enums, lazy references, architecture tiers, source-trust rules, and quality-gate drift validation.
- Vetted practice alignment for FiveM event/source/state semantics, deterministic tests, asset ownership, NUI deadlines, and bounded runtime state.
- Example request envelopes with action allowlists and correlation, plus replay-safe shop mutation and lifecycle cleanup.
- Durable documentation migration and removal of the seven owner-selected root documents.
- Native FiveM UI routing that selects one phase skill and progressively discloses optional design, motion, and review guidance.
- An inactive v0 design-time provider profile, compact cross-model UI handoff, and explicit routing for Claude frontend-design, UI/UX Pro Max, Emil motion guidance, and Impeccable.
- Deterministic skill and UI-practice validators that avoid LLM context for mechanical policy checks.
- Thin, validated compatibility routing for GPT/Codex, Claude, Gemini, Cursor, GitHub Copilot, and Kimi with `AGENTS.md` as the single canonical agreement.
- Atomic release staging with correct root/nested glob exclusions and rollback of source version files after packaging failures.
- Strict NUI request correlation, terminal bridge disposal, and structured UI error metadata aligned with the canonical runtime schema.
- Static-vs-runtime agent verification metadata, Gemini user-memory preservation, Copilot surface fallback safeguards, and current Kimi Code documentation routing.

## Preserved decisions
- No framework, database, or provider is selected or activated.
- Optional capabilities remain outside the production manifest and release allowlist.
- JSON Schema 2020-12 is canonical for high-risk boundary shapes; LuaCATS and JSDoc remain handwritten.
- GitHub workflows and Git hooks remain examples only.
- JavaScript/JSDoc remains the NUI language; no TypeScript migration was introduced.
- External UI skill packs and hooks are not installed or loaded by default; at most one external lens is selected for a material gap, and its output must be normalized to repository contracts.
- Vendor adapters stay thin and do not activate model-specific plugins or credentials; a surface-specific adapter may repeat only the minimum safety bootstrap when canonical instruction discovery is not universal.

## Validation evidence
- `npm run validate`: passed before delivery cleanup.
- `npm run validate`: passed again after task-envelope and practice-alignment changes.
- Svelte diagnostics: 0 errors and 0 warnings.
- Secret scanner clean/leak fixtures and release integration: passed.
- Native/project skill metadata validation and UI-practice clean/failure fixtures: passed.
- Cross-agent adapter validation and the full repository validation pipeline after compatibility routing: passed.
- Release rollback/glob, NUI bridge correlation/disposal, and agent-adapter failure fixtures: passed locally.
- LuaLS `3.18.2`: command/version gate added, but the binary was not installed locally and diagnostics were not run.
- Real browser clicks and animation playback, v0 and Claude live output, third-party skill hooks, 4K/CEF profiling, FXServer resmon, lifecycle, player-drop, provider, entity, and NUI-focus behavior remain manual and unverified.
