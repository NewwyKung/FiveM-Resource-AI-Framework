# Framework Hardening

Status: Delivered

## Ownership
- Production lifecycle: `resource/{shared,client,server}/`
- Executable examples: `examples/hello-world/`, `examples/shop-system/`
- Optional capability packs: `examples/capabilities/`
- Validation and release tooling: `scripts/`, `tests/`, root `package.json`
- Contract schemas: `docs/schemas/`
- AI workflows: `.agents/skills/fivem-ui-workflow/`, `.ai/skills/`, `.ai/rules/`, `.ai/recipes/`
- Task routing: `docs/schemas/ai-task.schema.json`, `.ai/work/TEMPLATE.md`, `.ai/matrices/`

## Invariants
- No example, test runner, provider, migration, or localization pack is loaded by `resource/fxmanifest.lua` by default.
- Client input remains untrusted and server authority is explicit.
- Generated UI/release output is ignored and validation never deletes source files.
- Real FXServer checks remain separate from local static and integration checks.
- Reusable routing values use readable string enums and registry references; task-specific scope and acceptance criteria remain explicit.
- Supplied practice guides are normalized and verified before use rather than copied into default context or runtime code.
- FiveM UI work enters through one native router and loads exactly one primary phase skill; optional external design or motion guidance is loaded only when selected or materially required.
- External UI tools do not replace repository contracts, the approved design system, Svelte diagnostics, or local validation evidence.
- GPT/Codex, Claude, Gemini, Cursor, GitHub Copilot, and Kimi route to one canonical `AGENTS.md`; vendor adapters stay thin and may repeat only a minimum safety fallback where a surface does not load the canonical file.
- NUI JSON responses require the exact request correlation ID, and disposing the bridge is a terminal non-retryable outcome.
- Release packages become visible only after staging, sanitization, secret scanning, metadata creation, and source-version synchronization succeed.

## Evidence

- `npm run validate` covers template/integration/schema/index/secret/i18n/Svelte/release/build checks.
- Schema validation keeps AI task characteristics synchronized with quality-gate IDs.
- Executable examples use bounded request envelopes, allowlisted actions, correlation, cleanup, and shop idempotency without selecting a provider.
- The native FiveM UI skill routes wireframe, design, implementation, review, refinement, and transport work with progressive disclosure. Its base instructions are 32 lines and 2,384 bytes; the motion reference is loaded separately only when needed.
- v0 is registered as an inactive design-time provider. Claude frontend-design, UI/UX Pro Max, Emil motion guidance, and Impeccable remain optional lenses selected through `.ai/matrices/ui-tool-routing.json`, never default context.
- `npm run check:skills` validates project and native skill metadata without requiring Python packages. `npm run check:ui-practices` performs deterministic zero-LLM-token checks for prohibited Tailwind usage, raw NUI transport, unsafe transitions, and missing reduced-motion policy.
- `npm run check:agents` validates cross-agent entrypoints, adapter/skill paths, adapter size, Gemini context discovery, Copilot safety fallback, and honest static/runtime verification metadata. Its integration fixture proves these checks fail closed.
- The release integration fixture covers nested `**/` exclusions and forced-failure cleanup without leaving partial packages or source version changes.
- The NUI bridge integration fixture rejects missing/mismatched request IDs and proves disposal does not trigger idempotent retries.
- Cross-agent runtime loading remains `static-only` until each current CLI/IDE version is smoke-tested and recorded in the matrix.
- `npm run check:lua` enforces LuaLS `3.18.2`; the local binary was unavailable during delivery and is not claimed as passed.
- Browser click/animation evidence, v0 or Claude output, third-party hooks, 4K rendering, CEF performance, and FXServer resmon were unavailable and are not claimed as validated. A `0.00 ms` resmon result must come from an actual FXServer capture.
- Real FXServer, clean-clone, cross-agent runtime, and gameplay checks remain active in `.ai/memory/requirements/active/runtime-verification.md`.
