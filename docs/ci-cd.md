# CI/CD

## Upstream validation

The upstream repository includes `.github/workflows/validate.yml`.

The job is guarded so it runs only when `github.repository` matches the maintainer's current repository name or the planned canonical repository name. Repositories created from this template inherit the workflow file, but the job remains skipped until the owner deliberately reviews and changes the guard.

The workflow installs Node.js 24, installs UI dependencies, runs the root validation aggregator, installs the pinned Lua Language Server version, runs Lua diagnostics, and uses read-only repository permissions.

This provides visible validation evidence without silently consuming runner minutes in downstream repositories.

## Downstream opt-in examples

Additional CI and release examples live under `examples/github-workflows/`.

Before enabling or adapting a workflow, review action/runtime versions, keep permissions narrow, store secrets only in the hosting platform, protect deployment environments, and retain explicit FXServer runtime verification.

Local commands remain the source of truth:

```bash
npm ci --prefix resource/ui --no-audit --no-fund
npm run validate
npm run check:lua
```

See `examples/github-workflows/README.md` for downstream activation steps.
