---
name: create-nui
description: Build or modify Svelte NUI with a safe FiveM bridge.
---

# Create NUI

## Read
- `.ai/rules/ui.md`
- `.ai/rules/security.md`
- `.ai/rules/assets.md`
- `.ai/rules/localization.md` when text is user-facing

## Workflow
1. Define screen states and NUI message contracts.
2. Inspect existing components and tokens.
3. Implement browser mock/state first.
4. Build presentation components without raw transport calls.
5. Connect bridge and client callbacks with timeout/error handling.
6. Implement close/focus/reset behavior.
7. Optimize assets and test long Thai content.
8. Build to `html/` and verify production paths.

## Validation
- browser mode
- FiveM message flow
- open/close/restart behavior
- loading/empty/error states
- no console errors or leaked listeners
