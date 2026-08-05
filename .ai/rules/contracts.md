# Contract Rules

- JSON Schema 2020-12 under `docs/schemas/` is the canonical representation for high-risk boundary shapes.
- Define network events, NUI requests/responses, public exports, integration options, config, and persisted rows before implementation when the boundary is public, asynchronous, economic, or persistent.
- LuaCATS and JSDoc may describe the canonical schema locally; they must not invent different required fields or error shapes.
- Runtime validation remains mandatory at trust boundaries. Static types and schema documents do not establish server authority.
- Use readable string enums for bounded control values such as action, phase, runtime, and status. Validate them against explicit allowlists; never turn an untrusted action into unrestricted dynamic dispatch.
- Use IDs and references to route reusable knowledge, but keep task-specific payload, scope, and acceptance criteria explicit. Avoid opaque numeric enums that require another large context lookup.
- Use `{ code, messageKey, details, requestId?, retryable }` for structured errors; codes remain machine-readable and localization happens at presentation boundaries.
- Add generation only when approved scope demonstrably removes duplication. When generation exists, validate generated output and documentation against the canonical schema.
- Keep small resources handwritten when generation would add more machinery than contract clarity.
