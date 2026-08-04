# FiveM Engineering Reference

This document is an English, normalized reference derived from the supplied Thai guides covering architecture, Lua practices, testing, fault handling, NUI/Svelte, assets, localization, API design, and developer techniques.

It is reference material, not an automatic context dependency. AI agents should read the canonical rules, recipes, matrices, and current source files first. Load a section here only when a task needs deeper explanation.

## 1. Architecture

Choose the smallest architecture that safely supports the feature.

- Tier 1 — simple feature: handler -> service.
- Tier 2 — persistent or transactional feature: handler -> service -> repository.
- Tier 3 — complex domain: transport -> use case -> domain -> repository/provider.

Keep presentation, business rules, persistence, and external integrations separate. Do not introduce domain classes, event buses, micro-resources, or abstraction layers without a concrete need.

## 2. Runtime ownership

- Client: input, local presentation, local effects, and NUI focus.
- Server: permissions, prices, rewards, inventory, ownership, persistence, and authoritative state changes.
- Shared: contracts, enums, immutable definitions, and code that is safe in both runtimes.
- Config: operator-controlled behavior, separated by runtime when values must remain private.

The client sends intent. The server re-reads authoritative state and decides the result.

## 3. Network and security

For externally triggerable operations:

1. Validate `source` and runtime context.
2. Validate payload type, required fields, string lengths, enums, and numeric ranges.
3. Apply rate limits or idempotency controls where abuse or duplication matters.
4. Re-read permissions, position, ownership, balance, inventory, and entity state on the server.
5. Execute through a service or use case rather than placing business logic in the event handler.
6. Return stable success and error contracts.
7. Audit security-sensitive or economic mutations.

Never execute user-provided code. Prefer domain validation over character-stripping sanitizers.

## 4. Performance

- Every long-running loop must yield.
- Use adaptive polling: frequent only while interaction is possible, slower when far away or inactive.
- Cache native results only for an appropriate lifetime.
- Bound tables, queues, pending callbacks, and caches.
- Remove handlers, timers, focus, temporary entities, and retained player state.
- Prefer event-driven or state-change-driven work over permanent polling when appropriate.
- Use state bags for replicated entity/player state when their ownership and visibility semantics fit; they are not a universal replacement for events, callbacks, or persistence.

Do not force garbage collection on a schedule by default. Fix ownership and unbounded growth instead.

## 5. Fault handling

Consider only the fault categories relevant to the feature:

- network: timeout, duplicate, stale, missing, or out-of-order requests;
- player: disconnect, invalid state, permission loss;
- entity: missing, deleted, migrated, invalid network ID;
- database: unavailable provider, timeout, transaction failure, deadlock;
- resource: dependency missing, start order, stop, restart;
- memory: unbounded tables, undisposed listeners, retained callbacks;
- security: spoofing, tampering, replay, privilege escalation;
- NUI: malformed message, unresolved callback, focus lock, listener leak;
- external provider: missing export, stopped resource, unsupported option, invalid response.

Define detection, recovery, cleanup, and user-visible failure behavior before implementation.

## 6. Testing

Use a pragmatic testing pyramid:

- unit tests for pure validation, calculation, normalization, and state transitions;
- integration-style tests with fake framework/database/provider adapters;
- runtime tests for FiveM event flow, disconnect, restart, focus, and provider availability;
- release tests for manifest paths, generated UI, excluded development files, and secret sanitization.

Economic or ownership mutations require tests for invalid payloads, spoofed values, duplicate requests, insufficient state, transaction failure, disconnect, and restart.

## 7. NUI and Svelte

- Use one normalized message envelope: `{ action, data }`.
- Use one client-callback helper for UI -> FiveM requests.
- Always resolve NUI callbacks.
- Validate messages at runtime boundaries.
- Dispose temporary listeners.
- Establish explicit focus ownership and Escape behavior.
- Provide browser development mocks without embedding mock behavior into production code.
- Build with relative asset paths and validate the production output.
- Use the repository's current Svelte/Vite versions as the source of truth; examples from older guides are conceptual only.

Responsive dimensions use the repository standard:

```css
calc(<design-pixel-number> * var(--px-to-vh))
```

## 8. Localization

Localization is an opt-in capability.

When enabled:

- define a default and fallback locale;
- keep locale keys consistent across languages;
- validate placeholder parity;
- avoid hard-coded user-facing text in Lua and NUI;
- test long Thai text and missing translations;
- define number, date, and currency behavior explicitly.

Do not add a full i18n engine to a single-language resource without a requirement.

## 9. Public APIs

Exports, events, callbacks, and state bags need explicit contracts:

- name and runtime;
- visibility and authority;
- input schema and bounds;
- success and failure return schema;
- side effects;
- compatibility status;
- deprecation or breaking-change notes.

Keep return shapes and error codes stable. Register contracts in `.ai/events/`, `.ai/features/`, or the selected integration provider profile.

## 10. Assets

Use an opt-in asset pipeline:

- preserve raw source assets outside release output;
- define target dimensions, format, quality, and byte budgets;
- optimize images and audio during build or release;
- include only referenced runtime assets;
- validate missing files, oversized files, and accidental source assets;
- avoid adding spritesheets or conversion tooling unless the resource benefits from them.

## 11. Examples and anti-patterns

Treat examples as patterns, not universal defaults. Do not copy examples that assume ESX, oxmysql, ox_lib, Tailwind, a particular server artifact, or old Svelte/Vite versions unless the environment profile confirms them.

Prefer repository source, approved requirements, selected provider profiles, and current official documentation over this reference when they conflict.