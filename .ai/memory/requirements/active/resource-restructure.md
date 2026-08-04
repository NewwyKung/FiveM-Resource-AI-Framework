# Resource Directory Restructure

Status: Approved

## Goal
Make `resource/` the single FiveM development and release source tree while repository tooling, AI guidance, examples, tests, and documentation remain at repository root.

## Scope
- Remove the tracked legacy `Development/Svelte` tree.
- Move root runtime source, manifest, UI source, and HTML placeholder under `resource/`.
- Move executable config helpers into runtime-specific libraries after responsibility review.
- Update manifest, UI build, editor launch, junction, release, validation, tests, AI routing, and active docs.
- Keep release output directly deployable without a nested `resource/` directory.

## Non-goals
- No gameplay features, provider adapters, Lua hot reload, ORM, required i18n, required migrations, required runtime test harness, or GitHub validation Action.
- No OverLord or Byte Labs visual component restoration.

## Acceptance
The definition of done and implementation order in `TODO.md` from commit `2f51c68b1f44ceafbc5b11b6596ccac2fd3d6b23` are authoritative. Manual FXServer behavior must be reported separately from local validation.
