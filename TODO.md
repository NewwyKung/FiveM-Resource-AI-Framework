# TODO - Post-Restructure Repository Audit

This file records the remaining work after the `resource/` migration merged into `main` through pull request #3.

The repository structure is now materially different from the earlier cleanup attempts. Do not follow old instructions that assume `client/`, `server/`, `config/`, `ui/`, `html/`, or `fxmanifest.lua` are still located at the repository root.

## 1. Confirmed current source of truth

The FiveM resource is now contained under:

```text
resource/
├─ fxmanifest.lua
├─ client/
├─ server/
├─ shared/
├─ config/
├─ ui/
└─ html/
```

Repository tooling remains outside the resource:

```text
.ai/
docs/
examples/
scripts/
tests/
types/
release/
resource.json
release.config.json
```

Confirmed design decisions:

- `resource/` is the only FiveM development resource and the Windows junction target.
- `resource/ui/` is the only Svelte source tree.
- `resource/html/` is generated output and should track only `.gitkeep`.
- Release packages copy the allowlisted contents of `resource/` directly to the release root.
- `Development/Svelte/` and the old root runtime tree must not return.
- GitHub Actions validation remains intentionally disabled until the owner requests otherwise.

## 2. Reference library status

Do not recreate these nine files merely because they were discussed as a possible design:

```text
docs/reference/fivem-ui.md
docs/reference/testing.md
docs/reference/fault-cases.md
docs/reference/techniques.md
docs/reference/architecture.md
docs/reference/asset-pipeline.md
docs/reference/best-practices.md
docs/reference/localization.md
docs/reference/api-reference.md
```

They were never committed as nine separate canonical files.

The implemented reference design intentionally consolidates the supplied guides into:

```text
docs/reference/README.md
docs/reference/fivem-engineering-reference.md
docs/reference/bl-svelte-template-review.md
```

The long-form engineering reference is not part of default AI context. Canonical rules, recipes, matrices, provider profiles, approved requirements, and current source files must be read first.

Only split the engineering reference into separate files if there is measured navigation value and the split does not duplicate canonical rules or increase default context.

## 3. Confirmed capabilities that must remain

### AI context and memory

```text
AGENTS.md
.ai/CONTEXT_BUDGET.md
.ai/index.json
.ai/work/README.md
.ai/work/TEMPLATE.md
.ai/memory/environment.md
.ai/memory/requirements/active/
.ai/memory/requirements/delivered/
.ai/memory/requirements/superseded/
```

Expected default context remains:

```text
AGENTS.md
+ one primary skill
+ 1-4 relevant rules
+ one active requirement
+ one feature registry
+ selected provider profiles only
+ affected source files only
```

### AI workflow assets

Keep the existing compact layers:

```text
.ai/rules/
.ai/skills/
.ai/recipes/
.ai/matrices/
.ai/examples/
.ai/integrations/
```

Do not replace them with one large universal skill or force every task to read the reference library.

### Type safety

```text
.luarc.json
types/fivem.lua
docs/type-safety.md
```

Lua annotations should remain focused on public contracts, network payloads, callbacks, config shapes, services, repositories, adapters, database rows, and nullable provider results.

### NUI development

```text
resource/ui/src/js/NuiBridge.js
resource/ui/src/js/NuiDebug.js
resource/ui/src/js/Post.js
resource/ui/src/js/createFeatureState.svelte.js
resource/ui/package.json
resource/ui/package-lock.json
```

Required behavior includes callback timeouts, abortable requests, structured errors, bounded pending requests, listener disposal, browser debug scenarios, and feature-local state lifecycle.

### Optional capabilities

These remain outside production runtime until selected:

```text
examples/capabilities/i18n/
examples/capabilities/database-migrations/
examples/capabilities/runtime-tests/
```

Do not activate or copy them into `resource/` unless requirements explicitly need them.

### Release and local validation

```text
scripts/validate-template.mjs
scripts/validate-integrations.mjs
scripts/build-ai-index.mjs
scripts/create-release.mjs
scripts/setup-dev-resource.ps1
release.config.json
tests/release/create-release.integration.mjs
```

Local validation reports failures and exits non-zero. It must not delete files automatically.

## 4. Remaining work for Codex

### Priority 1 - Run a complete local audit on current `main`

Run from a clean clone:

```bash
git switch main
git pull --ff-only
git status --short
git ls-files
```

Confirm these old top-level paths do not exist:

```text
Development/
client/
server/
shared/
config/
ui/
html/
fxmanifest.lua
```

Confirm these legacy paths do not exist:

```text
fivem-development.skill
.github/workflows/validate.yml
resource/config/client/
resource/config/server/
resource/config/shared/
resource/config/functions/
resource/ui/src/provider/Visible.svelte
resource/ui/src/lib/ComponentShowcase.svelte
resource/ui/src/lib/tokens.css
```

### Priority 2 - Run the existing validation baseline

```bash
node --check scripts/validate-template.mjs
node --check scripts/validate-integrations.mjs
node --check scripts/build-ai-index.mjs
node --check scripts/create-release.mjs
node --check tests/release/create-release.integration.mjs

node scripts/validate-template.mjs
node scripts/validate-integrations.mjs
node scripts/build-ai-index.mjs --check

npm ci --prefix resource/ui --no-audit --no-fund
npm run build --prefix resource/ui

node scripts/create-release.mjs --dry-run --skip-ui-build
node tests/release/create-release.integration.mjs
```

After testing, confirm generated files are not accidentally staged:

```bash
git status --short
git ls-files "resource/html/**"
git ls-files "release/**"
```

Only these placeholders should normally be tracked:

```text
resource/html/.gitkeep
release/.gitkeep
```

### Priority 3 - Add Svelte/JavaScript diagnostics

The UI currently has deterministic install and production build scripts, but no dedicated static check command.

Evaluate adding:

```text
svelte-check
```

and a package script such as:

```json
"check": "svelte-check --tsconfig ./jsconfig.json"
```

Requirements:

- update `resource/ui/package.json` and `resource/ui/package-lock.json` together;
- keep JavaScript/JSDoc support rather than forcing a TypeScript migration;
- do not add a large linting stack without a demonstrated need;
- run `npm run check --prefix resource/ui` locally;
- document the command in README and local validation guidance.

### Priority 4 - Add an explicit local LuaLS check workflow

LuaLS configuration and definitions exist, but repository scripts do not currently prove diagnostics from a clean environment.

Design an optional local command or documented workflow that:

- uses a pinned Lua Language Server version;
- checks `resource/**/*.lua`, examples, and type definitions;
- does not require GitHub Actions;
- does not download or run tools silently during unrelated tasks;
- reports diagnostics without rewriting source.

Do not claim Lua static validation is automated until this command is implemented and run successfully.

### Priority 5 - Review the remaining empty UI override file

Inspect:

```text
resource/ui/public/customs.css
```

It currently contains only explanatory comments and is copied into generated output during build.

Decide one of the following:

1. keep it as a documented operator override contract and reference it intentionally; or
2. remove it and remove any corresponding HTML/build reference if it has no active use.

Do not keep a placeholder file merely because it existed in the old template.

### Priority 6 - Add capability routing to the machine-readable index

`.ai/index.json` currently indexes registries such as features, components, events, database contracts, and providers. Optional capability packs are not directly mapped.

Evaluate extending the generated index with a compact section:

```json
"capabilities": {
  "i18n": "examples/capabilities/i18n/README.md",
  "databaseMigrations": "examples/capabilities/database-migrations/README.md",
  "runtimeTests": "examples/capabilities/runtime-tests/README.md"
}
```

Requirements:

- generate the mapping through `scripts/build-ai-index.mjs`; do not maintain duplicate manual values;
- keep capability packs out of default context;
- load a capability README only after requirements select it.

### Priority 7 - Manual FXServer verification

The restructure was validated locally, but a real FXServer run is still required before claiming runtime verification.

Create the development junction using:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\setup-dev-resource.ps1
```

Verify on an actual server:

- resource start;
- resource restart;
- resource stop cleanup;
- player drop cleanup;
- NUI open and close;
- Escape behavior;
- focus return;
- callback success, invalid response, and timeout behavior;
- Vite development workflow;
- production UI build from `resource/html/`;
- release folder start without depending on repository-level files.

Record exact artifact version, server configuration, and providers used.

## 5. Items intentionally not required now

Do not add these without an explicit new requirement:

- Lua hot reload;
- ESX, QBCore, or Qbox adapters in runtime by default;
- oxmysql code in resources that do not use a database;
- an ORM;
- automatic destructive database rollback;
- i18n runtime in single-language resources;
- runtime test runner in production manifests;
- a global UI component library;
- TailwindCSS;
- generated `resource/html` files in Git;
- generated releases in Git;
- GitHub Actions validation;
- the nine duplicate reference files listed in section 2.

## 6. Definition of done for this audit

- [ ] Clean clone matches the expected `resource/` architecture.
- [ ] Existing local validators pass.
- [ ] AI index is current.
- [ ] UI dependencies install deterministically.
- [ ] UI production build succeeds.
- [ ] Release dry run succeeds.
- [ ] Release integration test succeeds.
- [ ] No legacy root runtime tree exists.
- [ ] No legacy OverLord/Development Svelte source exists.
- [ ] Generated UI and release output are not tracked.
- [ ] Reference library uses the consolidated design and is documented accurately.
- [ ] Decision recorded for `resource/ui/public/customs.css`.
- [ ] Decision recorded for Svelte static diagnostics.
- [ ] Decision recorded for local LuaLS diagnostics.
- [ ] Optional capability routing is generated or explicitly deferred.
- [ ] Manual FXServer verification is completed or clearly reported as pending.

## 7. 📋 Checklist สั่ง AI / Developer ทำต่อ

ส่วนนี้สามารถ copy-paste ให้ AI หรือทีมพัฒนาใช้ต่อได้ทันที ให้ทำตามลำดับความสำคัญ และต้องตรวจไฟล์ปัจจุบันก่อนสร้างหรือเขียนทับเสมอ

---

### 🚨 Priority 1: ทำให้ `resource/` เป็น Resource ตัวอย่างที่รันได้จริง

> หมายเหตุ: หลัง PR #3 ไฟล์ bootstrap หลักมีอยู่แล้ว ห้ามสร้างทับโดยไม่อ่านไฟล์เดิม ให้ตรวจและเติมเฉพาะส่วนที่ยังขาด

- [ ] ตรวจและทำ `resource/fxmanifest.lua` ให้สมบูรณ์ — มี `lua54`, `shared_scripts`, `client_scripts`, `server_scripts`, และ `ui_page 'html/index.html'` ที่ชี้ path ถูกต้อง
- [ ] ตรวจ `resource/config/config.main.lua` — ต้องเป็น bootstrap config ที่โหลดก่อน config domain อื่น
- [ ] ตรวจ `resource/client/main.lua` — ต้องเป็น bootstrap ขนาดเล็กและพิสูจน์ว่า client runtime เริ่มทำงานได้ โดยไม่ใส่ business logic จำนวนมาก
- [ ] ตรวจ `resource/server/main.lua` — ต้องเป็น bootstrap ขนาดเล็กและพิสูจน์ว่า server runtime เริ่มทำงานได้
- [ ] ตรวจ `resource/shared/lib/` และ `resource/shared/modules/` — ใช้ `.gitkeep` หรือ template module ขนาดเล็ก ไม่ใส่ README ที่จะติดเข้า production release โดยไม่จำเป็น
- [ ] ตรวจ `resource/client/modules/` และ `resource/server/modules/` — เพิ่มตัวอย่าง module ง่ายๆ อย่างละ 1 ตัวเฉพาะเมื่อช่วยให้ผู้ใช้เข้าใจโครงสร้างจริง และต้องไม่สร้าง gameplay framework หรือ provider dependency
- [ ] ยืนยันว่า copy เฉพาะ `resource/` ไปยัง FXServer แล้วสามารถ start ได้ โดยไม่ต้องพึ่งไฟล์จาก repository root ยกเว้นขั้นตอน build ก่อน deploy

**เหตุผล:** ผู้ใช้ใหม่ต้องเห็น Resource ที่รันได้จริง ไม่ใช่เพียงโครงสร้าง placeholder แต่ต้องรักษา bootstrap ให้เล็กและ provider-neutral

---

### 🚨 Priority 2: `examples/` ต้องมีตัวอย่างจริง

- [ ] สร้าง `examples/hello-world/` — resource ง่ายๆ ที่สาธิต client request → server validation/response → client result โดยไม่ใช้ NUI และไม่ผูก framework
- [ ] สร้าง `examples/shop-system/` — ตัวอย่างเต็มที่มี config, client module, server module, database adapter contract, optional migration, integration boundaries และ NUI
- [ ] ตัวอย่าง shop ต้องไม่ hardcode oxmysql หรือ framework เป็นค่าเริ่มต้น ให้ใช้ provider-neutral port/adapter และมีคำอธิบายวิธี activate provider
- [ ] สร้าง `examples/README.md` — ระบุว่าแต่ละตัวอย่างสอนอะไร, ต้อง copy ไฟล์ใด, ต้องเลือก capability อะไร และวิธีรัน
- [ ] ตรวจว่า AI โหลดเฉพาะตัวอย่างที่เกี่ยวข้อง ไม่ scan ตัวอย่างทั้งหมดทุกงาน

**เหตุผล:** คนใหม่ต้องเห็นว่า Resource ที่สมบูรณ์หน้าตาอย่างไร โดยไม่ต้องเดาจาก rules และ skills อย่างเดียว

---

### 🚨 Priority 3: `tests/` ต้องมีสิ่งที่รันได้

- [ ] ประเมินว่าจะใช้ `examples/capabilities/runtime-tests/test_runner/` เป็น canonical runner หรือย้ายแนวคิดไปเป็น `tests/runtime/`; ห้ามสร้าง test runner ซ้ำสองระบบ
- [ ] เพิ่ม lightweight FXServer runtime test harness ที่เรียกจาก Server Console หรือ in-game command ที่จำกัดสิทธิ์อย่างชัดเจน
- [ ] เพิ่ม test สำหรับ config loading
- [ ] เพิ่ม test สำหรับ event/callback success, invalid payload, timeout และ duplicate request
- [ ] เพิ่ม test สำหรับ resource start/stop/restart และ cleanup เมื่อเหมาะสม
- [ ] สร้างหรืออัปเดต `tests/README.md` ให้บอกวิธีรันบน FXServer จริงและแยก pure tests, integration tests, runtime tests และ manual checks
- [ ] Runtime test runner ต้องไม่ถูกใส่ใน production manifest โดยอัตโนมัติ

**เหตุผล:** Test ต้องมี executable path ไม่ใช่มีเพียง checklist ในเอกสาร

---

### ⚠️ Priority 4: `scripts/` ต้องมี validation ที่เรียกง่าย

- [ ] ตรวจของเดิมก่อนสร้างใหม่: `scripts/validate-template.mjs` มี validation หลายส่วนอยู่แล้ว ให้แยกไฟล์ใหม่เฉพาะเมื่อช่วยลดความซับซ้อนหรือ reuse ได้จริง
- [ ] เพิ่มหรือแยก `scripts/validate-manifest.mjs` — ตรวจ path ใน `resource/fxmanifest.lua`, wildcard base path, UI page, runtime boundaries และไฟล์ที่อ้างแต่ไม่มีอยู่จริง
- [ ] เพิ่ม `scripts/validate-secrets.mjs` — scan credential patterns แบบ fail-closed แต่ต้องรองรับ allowlist/false-positive handling และไม่ใช้ broad key-name sanitization แทนการตรวจค่าจริง
- [ ] เพิ่ม `scripts/validate-lua.mjs` — ตรวจ syntax ของ `.lua` ผ่านเครื่องมือที่ pin version เช่น `luac`/LuaLS และรายงาน error โดยไม่แก้ไฟล์
- [ ] เพิ่ม root `package.json` เฉพาะสำหรับ repository tooling พร้อม `npm run validate` ที่รวม validation ทั้งหมด
- [ ] `npm run validate` ต้องไม่ build release, delete file, commit file หรือแก้ source อัตโนมัติ
- [ ] อัปเดต local validation docs และ README ให้ใช้คำสั่งเดียวได้

**เหตุผล:** Developer และ AI ควรตรวจคุณภาพก่อน commit/release ได้ด้วยคำสั่งเดียว

---

### ⚠️ Priority 5: GitHub Workflow Templates แบบ Opt-in

- [ ] ห้ามเปิด `.github/workflows/` บน `main` โดยอัตโนมัติในตอนนี้
- [ ] สร้าง `examples/github-workflows/ci.yml` — template สำหรับรัน `npm run validate`, Svelte check/build และ secret scan
- [ ] สร้าง `examples/github-workflows/release.yml` — template สำหรับ tag-triggered release build โดยไม่ commit generated release กลับเข้า source branch
- [ ] สร้าง `examples/github-workflows/README.md` — อธิบาย prerequisites, permissions, secrets และวิธี copy ไป `.github/workflows/`
- [ ] สร้าง `docs/ci-cd.md` — ระบุว่า workflow ถูก disabled by default และวิธี enable อย่างปลอดภัย
- [ ] ใช้ action versions ที่ pin อย่างเหมาะสม และหลีกเลี่ยง write permission หากไม่จำเป็น

**เหตุผล:** ผู้ใช้ที่ต้องการ CI/CD ควรเปิดใช้ได้เร็ว แต่ hobby template ไม่ควรรัน Actions หรือสร้างไฟล์โดยอัตโนมัติเป็นค่าเริ่มต้น

---

### 💡 Priority 6: Optional capabilities

- [ ] ใช้ `examples/capabilities/i18n/` เป็นฐาน แล้วเพิ่ม integration path สำหรับ `resource/shared/lib/locale.lua` และ `locales/en.lua` เฉพาะเมื่อ Resource เลือกหลายภาษา
- [ ] ใช้ `examples/capabilities/database-migrations/` เป็นฐาน แล้วสร้าง `database/migrations/` หรือ `sql/migrations/` เฉพาะเมื่อ Resource เป็นเจ้าของ schema
- [ ] รักษา migration เป็น forward-only, immutable after release, checksum-aware และ provider-neutral
- [ ] ตรวจและทำ NUI bridge ให้ robust ต่อไป — timeout, abort, structured errors, bounded pending requests, response validation และ cleanup
- [ ] Retry ต้องเปิดเฉพาะ operation ที่ idempotent หรือมี request ID ป้องกันผลซ้ำ ห้าม retry economic mutation แบบสุ่ม
- [ ] Optional capability ต้องถูกเลือกจาก requirements ก่อน copy เข้า production resource

---

### 🔥 Priority 7: Production Quality

- [ ] ออกแบบ logging abstraction เป็น capability contract ไม่ผูก logger provider และไม่สร้าง runtime implementation หาก Resource ไม่ต้องใช้
- [ ] เพิ่ม callback/request-response abstraction ที่มี timeout, request ID, cleanup และ stable error contract
- [ ] เพิ่ม event contract registry และ validation สำหรับ duplicate/conflicting event names โดยไม่สร้าง runtime event bus ที่ไม่จำเป็น
- [ ] เพิ่ม development-only profiler hooks ที่ถูกตัดออกจาก release หรือปิดเป็นค่าเริ่มต้น
- [ ] เพิ่ม resource lifecycle pattern สำหรับ `onResourceStart`, `onResourceStop`, player drop, listener/thread/entity cleanup
- [ ] เพิ่ม hot-restart-safe cleanup examples แต่ไม่ทำ Lua hot reload
- [ ] เพิ่ม coding standards และ diff-based review checklist แบบสั้น
- [ ] กำหนด release gate ว่า local validation ที่เกี่ยวข้องต้องผ่าน 100% ก่อนสร้าง release

## 8. 🧹 Files to remove from experimental commit range

เจ้าของ Repository ต้องการนำไฟล์ที่เพิ่มตั้งแต่ commit:

```text
4ea5c4cfc5fc3d8caaf12501baae25215eea50a5
```

ถึง commit:

```text
b9fa3b7b8a51324efc520570e1c3db0536a473bd
```

ออกจาก Repository

ตรวจจาก commit แรกและ compare range แล้ว ช่วงนี้เพิ่มไฟล์ทั้งหมด 10 ไฟล์ดังต่อไปนี้:

- [ ] `CONTRIBUTING.md`
- [ ] `SECURITY.md`
- [ ] `SUPPORT.md`
- [ ] `CHANGELOG.md`
- [ ] `ROADMAP.md`
- [ ] `ARCHITECTURE.md`
- [ ] `FAQ.md`
- [ ] `.github/ISSUE_TEMPLATE/bug_report.md`
- [ ] `.github/ISSUE_TEMPLATE/feature_request.md`
- [ ] `.github/PULL_REQUEST_TEMPLATE.md`

### Removal procedure

1. ตรวจว่าไฟล์ยังอยู่บน `main` และบันทึก reference ที่ชี้มายังไฟล์เหล่านี้
2. ลบไฟล์ทั้ง 10 รายการด้วย Git-aware deletion
3. หาก `.github/ISSUE_TEMPLATE/` หรือ `.github/` ว่างหลังลบ ให้ลบ directory ว่างจาก working tree
4. แก้ README, docs หรือ AI instructions ที่ยังลิงก์ไปยังไฟล์ที่ลบ
5. ห้ามลบ `AGENTS.md`, `README.md`, `README_TH.md`, `TODO.md`, `docs/`, `.ai/`, workflow templates ใน `examples/` หรือ runtime files เพียงเพราะอยู่ใกล้เคียงกัน
6. รัน:

```bash
git grep -n "CONTRIBUTING.md\|SECURITY.md\|SUPPORT.md\|CHANGELOG.md\|ROADMAP.md\|ARCHITECTURE.md\|FAQ.md"
git status --short
node scripts/validate-template.mjs
node scripts/build-ai-index.mjs --check
```

7. รายงานไฟล์ที่ลบ, references ที่แก้ และ validation ที่รันจริง

## 9. Final definition of done

- [ ] Checklist Priority 1-7 ได้รับการ triage ว่า implement, defer หรือ reject พร้อมเหตุผล
- [ ] ไม่มีการสร้างระบบซ้ำกับ capability packs หรือ validators เดิม
- [ ] ไฟล์ 10 รายการจาก experimental commit range ถูกลบตามคำสั่งเจ้าของ Repository
- [ ] ไม่มี broken links หรือ stale references หลังการลบ
- [ ] `resource/` สามารถ build, package และนำไปตรวจบน FXServer ได้
- [ ] Local validation command มีทางใช้งานชัดเจน
- [ ] Optional systems ไม่ถูกโหลดหรือ copy โดยอัตโนมัติ
- [ ] Manual FXServer verification เสร็จ หรือระบุอย่างชัดเจนว่ายังค้าง

When complete, move durable decisions into the appropriate rule, ADR, feature registry, or delivered requirement file. Keep `TODO.md` limited to unresolved work.