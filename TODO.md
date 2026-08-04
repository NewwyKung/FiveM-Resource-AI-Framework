# TODO - Codex Handoff

The resource-directory migration is complete on `codex/resource-restructure`.

## Current structure

- `resource/` is the single FiveM development resource and junction target.
- `resource/ui/` is the only Svelte source tree.
- `resource/html/` contains generated NUI output and keeps only `.gitkeep` in Git.
- Release packages copy allowlisted contents of `resource/` directly to the release root.
- Repository AI guidance, docs, examples, scripts, tests, types, and release output remain outside `resource/`.

## Verified locally

- Node syntax checks and local validators
- AI index consistency
- deterministic UI dependency installation and production build
- release dry run and temporary release integration test
- junction creation, target, safe refusal for real directories, and forced junction replacement
- absence of root runtime duplicates and unintended tracked generated output

## Remaining environment check

Run the manual FXServer start, restart, stop, player-drop, and NUI focus/cleanup checklist against a real server before claiming runtime verification.
