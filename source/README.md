# Court Coach — GitHub Pages

## Quick deployment (English)

Extract `court-coach-pages-ready.zip` and upload its contents to a public GitHub repository. Keep `index.html`, `assets/`, `exercises/`, and `.nojekyll` at the repository root. In **Settings → Pages**, select **Deploy from a branch**, then **main / (root)** and save. Open the URL GitHub provides. No custom Actions workflow or server is required.

The downloadable build is static HTML/CSS/JavaScript with React bundled in JavaScript; the editable source remains React/TypeScript. Workout plans, weight/body-fat logs, five meals, nutrition goals and weekly tracking use browser localStorage. Export JSON backups regularly: clearing browser data can erase logs, and devices do not sync automatically. Existing Sites history must be exported and imported separately; see [DATA-MIGRATION.md](DATA-MIGRATION.md). Do not upload personal backups to GitHub.

See [AUTHENTICATION.md](AUTHENTICATION.md) for the original authentication components, request flow, credential handling, and the local-only replacement.

เวอร์ชันนี้เป็น **static site**: ไฟล์ที่เผยแพร่มีเพียง HTML, CSS, JavaScript และรูปภาพ ไม่มี API, backend, ฐานข้อมูล, การเข้าสู่ระบบ หรือค่าใช้บริการ ChatGPT
ซอร์สใช้ React + TypeScript + Vite เพื่อคงฟีเจอร์เดิม ส่วนไฟล์พร้อมใช้ใน `dist/` คอมไพล์แล้ว ไม่ต้องติดตั้ง React หรือ Node บนโฮสต์

## เผยแพร่แบบง่ายที่สุด — ไม่ต้อง build

1. แตกไฟล์ `court-coach-pages-ready.zip` ที่ให้มา
2. สร้าง repository **Public** บน GitHub เช่น `court-coach` (GitHub Free ใช้ Pages กับ public repository)
3. อัปโหลด **ไฟล์และโฟลเดอร์ด้านใน ZIP** ลงราก repository: `index.html`, `assets/`, `exercises/`, `.nojekyll`, `README.md` ไม่ใช่อัปโหลด ZIP ทั้งไฟล์
4. ไป **Settings → Pages → Build and deployment → Source: Deploy from a branch**
5. เลือก **main** และ **/(root)** แล้ว Save รอเผยแพร่ เปิด URL ที่ GitHub แสดง เช่น `https://USERNAME.github.io/court-coach/`

เว็บใช้ path แบบ relative จึงเปลี่ยนชื่อ repository ได้โดยไม่ต้องแก้โค้ด ใช้ URL ลงท้าย `/` และเปิดผ่าน HTTP/HTTPS ไม่ใช่ดับเบิลคลิก `index.html` แบบ `file://`

## ถ้าต้องการแก้โค้ดและ build ใหม่

ใช้โฟลเดอร์จาก `court-coach-pages-source.zip` แยกจากโครงการ Sites เดิม ติดตั้ง Node.js 24 และ pnpm 11 แล้วรันในโฟลเดอร์นี้:

```sh
pnpm install --frozen-lockfile
pnpm test
pnpm build
pnpm preview --host 127.0.0.1
```

เปิด URL ที่คำสั่ง preview แสดง เมื่อแก้เสร็จให้อัปโหลด **เนื้อหาใน `dist/`** แทนไฟล์เดิมใน repository เก็บซอร์สไว้อีกโฟลเดอร์/repository ได้ ไม่ต้องใช้ GitHub Actions

## ข้อมูลที่ควรรู้

เปิดครั้งแรกตั้งค่าหรือนำเข้าไฟล์ที่ **ความก้าวหน้า** ก่อนใช้เป้าอาหาร ข้อมูลเก็บเฉพาะเบราว์เซอร์นี้ ไม่ซิงก์ข้ามเครื่อง ล้างข้อมูลเว็บแล้วอาจหาย ให้ส่งออก JSON เป็นระยะ และอย่าอัปโหลดไฟล์สำรองส่วนตัวขึ้น GitHub

ประวัติจาก Sites ยังไม่ได้ย้ายอัตโนมัติ ดู [วิธีย้ายข้อมูลและสำรอง](DATA-MIGRATION.md)

อ้างอิง: [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site), [Vite](https://vite.dev/guide/static-deploy.html)
