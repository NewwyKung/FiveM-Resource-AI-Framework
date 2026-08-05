# Runtime Verification Requirements

## Status
Approved

## Last updated
2026-08-05

## Source
Unresolved verification work migrated from the completed root `TODO.md` cleanup checklist by repository-owner request.

## Problem and outcome
- Problem: Local static and integration checks cannot prove FXServer lifecycle, clean-clone portability, real agent instruction loading, or CEF/game performance.
- Desired outcome: Record real-environment evidence without claiming unexecuted checks or adding speculative runtime dependencies.
- Success measure: Every acceptance item below is either evidenced with environment/version details or remains explicitly unresolved.

## Scope
### Included
- Real FXServer start, restart, stop, player-drop, cleanup, provider-unavailable, and resource-only deployment checks.
- Clean-clone validation including pinned LuaLS diagnostics.
- Current-version Claude, Gemini, Cursor, GitHub Copilot, and Kimi instruction-loading smoke tests.
- Real browser/CEF interaction, 1080p/4K rendering, animation, focus, and FXServer resmon evidence when UI performance is in scope.

### Excluded
- New gameplay features, provider activation, Lua hot reload, event sourcing, TypeScript migration, and repository-owned embeddings.
- Unsupported benchmark percentages or inferred `0.00 ms` resmon claims.

## Testing and acceptance criteria
- [ ] Prove `resource/client/main.lua` and `resource/server/main.lua` start successfully on a real FXServer.
- [ ] Deploy only the contents of `resource/` and prove the packaged resource runs without repository-only files.
- [ ] Verify start, restart, stop, player disconnect, state cleanup, and provider-unavailable behavior.
- [ ] Run the documented validators and pinned LuaLS diagnostics from a clean clone.
- [ ] Smoke test instruction loading in current Claude, Gemini, Cursor, Copilot, and Kimi versions; record `testedVersion` and `runtimeVerifiedAt` in `.ai/matrices/agent-entrypoints.json`.
- [ ] Capture real browser/CEF interaction and performance evidence when a UI task requires it; do not infer 4K, animation, focus, or resmon results from static checks.

## Approval
- Approved by: Repository owner
- Approval date: 2026-08-05
- Approved defaults/constraints: Keep verification provider-neutral and report unavailable environments honestly.
