# FiveM Resource AI Framework

> 🇹🇭 ภาษาไทย | 🇺🇸 [English](README.md)

Template สำหรับสร้าง FiveM Resource ที่ออกแบบให้ Developer และ AI ทำงานร่วมกันได้ง่าย มีมาตรฐาน และใช้ Context เท่าที่จำเป็น

โปรเจกต์นี้ไม่ใช่ Framework แทน ESX, QBCore หรือ Qbox แต่เป็นฐานสำหรับสร้าง Resource แบบ Standalone หรือเชื่อมเฉพาะ Framework, Database, Library และ Integration ที่ใช้งานจริง

## จุดเด่น

- Requirements discovery ก่อนเริ่มงานใหญ่
- แยก Client, Server, Shared และ Config ชัดเจน
- Server-authoritative design
- AI rules, skills, recipes, memory และ context budget
- Integration docs ลงทะเบียนครั้งเดียวและเปิดใช้เมื่อจำเป็น
- Svelte 5 NUI พร้อม browser debug helpers
- Wireframe-first UI workflow
- CI validation และระบบสร้าง Release พร้อมใช้งาน
- ลบ Bridge, Dependency และไฟล์ Runtime ที่ไม่ได้ใช้

## เริ่มต้นใช้งาน

```bash
git clone https://github.com/NewwyKung/FiveM-Resource-AI-Framework.git my_resource
cd my_resource
npm ci --prefix ui
npm run build --prefix ui
```

จากนั้นแก้ metadata ใน:

```text
fxmanifest.lua
resource.json
```

## เริ่มงานกับ AI

สำหรับ Resource หรือ Feature ใหม่ ให้เริ่มด้วยคำสั่งลักษณะนี้:

```text
Use .ai/skills/discover-requirements/SKILL.md.
Help me define the feature and environment before implementation.
```

AI จะตรวจข้อมูลเดิมและถามเฉพาะสิ่งที่จำเป็น เช่น Framework, ox_lib, Database, Inventory, Notify, Logger, Progress, Target และ Custom integrations

ข้อมูลที่ยืนยันแล้วจะถูกบันทึกไว้ เพื่อไม่ต้องถามซ้ำใน Feature ต่อไป

## Workflow

```text
Discovery
→ Approved requirements
→ Architecture and contracts
→ Wireframe (เมื่อมี UI)
→ Visual design
→ Implementation
→ Tests and review
→ Release
```

## UI และ Responsive

ออกแบบบนฐานความสูง `1440px` และใช้:

```css
:root {
    --scale: 1;
    --base-screen-height: 1440;
    --px-to-vh: calc(1vh / var(--base-screen-height) * 100 * var(--scale));
}

.panel {
    width: calc(720 * var(--px-to-vh));
    padding: calc(32 * var(--px-to-vh));
}
```

ตัวเลขแทนค่า pixel จาก Design แต่ไม่ใส่ `px` ภายใน `calc()` และไม่คูณ `--scale` ซ้ำ

## Integrations

```text
ส่ง Docs/Schema ให้ AI ครั้งเดียว
→ Register provider profile
→ เลือกใช้กับ Feature ที่ต้องการ
→ สร้างเฉพาะ Adapter/Operation ที่ใช้จริง
→ ลบ Runtime bridge ที่ไม่ได้ใช้
```

การส่ง Docs ไม่ถือเป็นคำสั่งให้เชื่อม Runtime ทันที และ Secrets จะไม่ถูกบันทึกใน AI memory

## สร้าง Release

```bash
node scripts/create-release.mjs
```

ผลลัพธ์:

```text
release/<resource_name>-<version>/
```

ระบบจะ:

- จัดการ Semantic Versioning
- Build UI เป็นค่าเริ่มต้น
- คัดลอกเฉพาะ Runtime allowlist
- เปลี่ยน Manifest เป็น Production
- ล้าง Secret ตาม explicit sanitizer
- ตรวจว่าไม่มี credential, dev file หรือ inactive bridge หลุดเข้า Release

## สถานะความสามารถเพิ่มเติม

- **Lua Type Safety:** ยังไม่มี Lua Language Server configuration และ static type validation แบบเต็มระบบ
- **Hot Reload:** มี Vite HMR สำหรับ Browser development แต่ยังไม่มี in-game NUI hot reload ที่เป็นระบบมาตรฐาน
- **i18n:** มี Rules และแนวทางแล้ว แต่ยังไม่มี Runtime i18n engine หรือ locale implementation เริ่มต้น

ดูแผนพัฒนาต่อได้ที่ [ROADMAP.md](ROADMAP.md)

## เอกสารสำคัญ

- [CONTRIBUTING.md](CONTRIBUTING.md)
- [ARCHITECTURE.md](ARCHITECTURE.md)
- [FAQ.md](FAQ.md)
- [SECURITY.md](SECURITY.md)
- [SUPPORT.md](SUPPORT.md)
- [CHANGELOG.md](CHANGELOG.md)
- [ROADMAP.md](ROADMAP.md)
- [Release guide](docs/releasing.md)

## Credits

ขอบคุณ **Byte Labs Studio** และโปรเจกต์ **BL Svelte Template** สำหรับแนวคิดด้าน Developer Experience เช่น browser debugging, NUI event helpers, disposable listeners และ local development workflow

โปรเจกต์นี้ไม่ได้นำ UI design, UI components หรือ visual assets ของ Byte Labs มาใช้ รายละเอียดอยู่ที่ `docs/reference/bl-svelte-template-review.md`

## เบื้องหลังการพัฒนา

โปรเจกต์นี้เริ่มจาก Hobby Project ที่ตั้งใจสร้างไว้ใช้เอง เพื่อให้การพัฒนา FiveM Resource ด้วย AI ง่ายขึ้นและมีคุณภาพสม่ำเสมอขึ้น ภายหลังจึงตัดสินใจเปิดเป็น Open Source เผื่อมีประโยชน์กับ Developer คนอื่น

ผมใช้ **Kimi K2.6** ช่วยรวบรวมและเขียนข้อมูล Best Practices และความรู้เกี่ยวกับ FiveM จากนั้นใช้ **ChatGPT** ช่วยตรวจสอบ สรุป และแปลงข้อมูลเหล่านั้นเป็น AI Skills, Agent instructions, Rules, Recipes, Memory, Validators และ Workflow ภายใน Repository

ปัจจุบันผมยังใช้ **Claude** เป็นผู้ช่วยหลักในการพัฒนา แต่จากการทดสอบส่วนตัว ผมคิดว่าอนาคตอาจย้ายไปใช้ **Kimi K3** เพราะมีความเข้าใจเกี่ยวกับ FiveM Resource รวมถึงส่วนต่าง ๆ ของ FiveM และ GTA V ได้ดีมากเมื่อเทียบกับโมเดลอื่นที่ผมเคยทดลอง

ทั้งหมดนี้เป็นเพียงความคิดเห็นและประสบการณ์ส่วนตัว — Kimi ไม่ได้จ่ายนะ 😄

ถ้าโปรเจกต์นี้มีประโยชน์กับคุณ ขอบคุณมากสำหรับการใช้งาน การแจ้งปัญหา การเสนอไอเดีย หรือการช่วยพัฒนาต่อ

> เป้าหมายของโปรเจกต์นี้ไม่ใช่การแทนที่ Developer ด้วย AI แต่คือการช่วยให้ Developer สร้าง FiveM Resource ได้เร็วขึ้น มีคุณภาพสม่ำเสมอขึ้น และทำงานได้ดีไม่ว่าจะเลือกใช้ AI โมเดลใด
