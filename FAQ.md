# Frequently Asked Questions

## Is this a replacement for ESX, QBCore, or Qbox?

No. It is a resource-development template. A resource can remain standalone or activate only the framework and providers it needs.

## Why are framework bridges not included by default?

Unused bridges increase maintenance, runtime files, and AI context. Provider knowledge is registered once, then only required operations are activated.

## Why does AI ask questions before implementation?

A short discovery phase prevents the model from silently inventing product behavior, permissions, integrations, persistence, and UI flows.

## Why start UI work with a wireframe?

Layout and information hierarchy are cheaper to correct before visual styling and implementation.

## Why is Tailwind not included?

The template does not require a utility CSS framework. Dependencies should be added only when an approved feature has a demonstrated need.

## Does the template have Lua type safety?

Not fully. Lua remains dynamically typed. The repository does not currently include a Lua Language Server configuration, FiveM type definitions, or CI static diagnostics. LuaLS/EmmyLua annotations are planned as an optional developer-quality layer.

## Does the template support hot reload?

Partially. Vite provides browser HMR for Svelte development. The repository does not currently provide a standardized in-game NUI hot-reload system, and Lua runtime changes still require an appropriate resource restart.

## Does the template include i18n?

Not as a runtime system yet. Localization rules and design guidance exist, but there is no default locale engine or translation catalog. An optional provider-neutral system is planned.

## Why are examples not loaded by the template?

Examples demonstrate patterns. They should not silently add runtime behavior, dependencies, or release files.

## Why create a separate Release folder?

The source repository contains AI files, tests, documentation, UI source, and development tooling. The release builder produces a clean folder intended for server deployment.

## Is this a commercial framework?

No. It began as a personal hobby project and was opened publicly in case it helps other FiveM developers.
