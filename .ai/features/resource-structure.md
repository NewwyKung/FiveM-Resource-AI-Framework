# Resource Structure

Status: Delivered

## Contract

- `resource/` is the single development source for the FiveM resource.
- Runtime code remains separated into `resource/client/`, `resource/server/`, `resource/shared/`, and `resource/config/`.
- Svelte source lives only in `resource/ui/`; generated output targets `resource/html/`.
- Repository tooling, AI guidance, docs, examples, tests, types, and release output remain outside `resource/`.
- Release packaging copies the contents of `resource/` to the release root.
- The FXServer development junction targets `resource/`, never the repository root.

## Acceptance source

See `.ai/memory/requirements/delivered/resource-restructure.md`.
