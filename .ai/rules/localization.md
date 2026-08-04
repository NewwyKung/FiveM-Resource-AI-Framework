# Localization Rules

- Keep user-facing strings out of feature logic.
- Use stable nested keys such as `inventory.item.use`.
- Define a default/fallback locale and return the key when no translation exists.
- Keep Lua and NUI locale keys aligned when both surfaces display the same concept.
- Support placeholders, number/currency formatting, and plural behavior explicitly.
- Test missing keys, long Thai strings, Unicode, and runtime locale changes.
- Do not mix translated display text with machine-readable error codes.
- Add RTL behavior only when the selected locale requires it.
