# Opt-in GitHub Workflows

These workflows are examples, not active automation. Review action versions, runner policy, permissions, and release naming before copying either file into `.github/workflows/`.

## Enable CI

1. Copy `ci.yml` to `.github/workflows/ci.yml`.
2. Keep the default read-only repository permission unless a selected integration needs more.
3. Run the same commands locally with `npm ci --prefix resource/ui --no-audit --no-fund`, `npm run validate`, and `npm run check:lua`.

The template downloads the pinned LuaLS release declared by this repository. It does not use or require secrets.

## Enable release packaging

1. Copy `release.yml` to `.github/workflows/release.yml`.
2. Choose an artifact name that is a valid FiveM resource name.
3. Use a semantic-version tag such as `v1.2.3`, or enter a version during manual dispatch.
4. Grant additional permissions only if you later add release publishing. The supplied workflow only uploads a workflow artifact.

Never place provider credentials in workflow files. Add selected deployment secrets through GitHub environment or repository secrets and keep them out of the packaged resource.
