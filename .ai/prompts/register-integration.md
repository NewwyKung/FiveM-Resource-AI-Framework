# Register Integration Documentation

Use `.ai/skills/add-integration/SKILL.md` in **Register mode**.

The user will provide a capability, resource name, and documentation/schema/examples. Extract a concise reusable provider profile and update `.ai/integrations/INDEX.md`.

Do not write adapters, select the provider, modify runtime configuration, or change feature code unless the user explicitly asks to activate the provider for the current resource.

Suggested user request:

> Register `<resource-name>` as the `<capability>` provider. Here are its docs/schema. Store it for reuse, but do not integrate it yet.
