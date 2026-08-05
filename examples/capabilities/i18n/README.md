# Optional i18n Capability

Activate this capability only when approved requirements need more than one locale or reusable translation keys.

## Files to copy

- `locales/en.lua`
- `locales/th.lua`
- `resource/shared/modules/i18n.lua`
- `ui/locale.js` when the NUI displays translated text

Add only copied runtime files to `resource/fxmanifest.lua`.

## Contract

```lua
I18N.Translate('shop.purchase.success', {
    item = itemLabel,
    amount = quantity,
})
```

Machine-readable error codes remain untranslated. Convert `INSUFFICIENT_FUNDS` into a locale key at the presentation boundary.

## Required behavior

- one explicit fallback locale;
- stable nested keys;
- missing keys return the key and may log once in development;
- placeholders are escaped and deterministic;
- Lua and NUI use matching keys for the same concept;
- locale data contains no gameplay logic;
- runtime language changes are optional and must be approved.

## Required tests

- fallback locale;
- missing key;
- missing placeholder;
- long Thai text and Unicode;
- placeholder consistency between locales;
- NUI and Lua key alignment when both are enabled.

Run the provider-independent NUI contract test with:

```bash
node examples/capabilities/i18n/tests/locale.integration.mjs
```

The NUI helper validates key and placeholder parity at startup, falls back explicitly, and records each missing locale/key pair once. Keep locale selection feature-local unless approved requirements call for a server-wide language preference.

Do not add this pack to a single-language resource unless the user explicitly wants translation-ready architecture.
