# Public API Rules

- Prefer clear names and stable, documented contracts.
- Validate every export, event, and callback input.
- Use consistent return shapes and machine-readable error codes.
- Distinguish client and server APIs explicitly.
- Document direction, payload, authority, errors, and usage.
- Keep public wrappers thin; business logic belongs in modules/services.
- Preserve backward compatibility where practical.
- Deprecate before removal and document breaking changes.
- Never expose internal mutable tables directly; return safe copies/views.
