# 🚀 Batch Files Guide

บรรยายการใช้งาน batch files สำหรับ Perfume Shop project

## 📁 Files

### 1. **start-dev.bat** - เริ่ม Development Server
```bash
double-click start-dev.bat
```

**สิ่งที่ทำ:**
- ✅ ตรวจสอบและติดตั้ง dependencies (ถ้ายังไม่มี)
- ✅ เริ่ม development server ที่ `http://localhost:5174`
- ✅ Kill process ที่ใช้ port 5174 (ถ้ามี)

**Output:**
```
🚀 Starting Perfume Shop Dev Server

Starting development server on http://localhost:5174

Press Ctrl+C to stop the server
```

---

### 2. **push-to-github.bat** - Commit & Push ไป GitHub
```bash
double-click push-to-github.bat
```

**สิ่งที่ทำ:**
- ✅ แสดง current branch
- ✅ แสดง changes ที่ยังไม่ commit
- ✅ ขอ commit message จากผู้ใช้
- ✅ Commit ทั้งหมด (git add -A)
- ✅ แสดง recent commits
- ✅ ขอ confirmation ก่อน push
- ✅ Push ไป origin/main

**Example:**
```
Current branch:
main

Changes to commit:
M src/App.jsx
M src/services/orderService.js
A new-feature.js

Enter commit message (or press Enter for default): Add payment slip upload

Committing with message: "Add payment slip upload"

[main abc1234] Add payment slip upload
 3 files changed, 50 insertions(+), 5 deletions(-)

Recent commits:
abc1234 (HEAD -> main) Add payment slip upload
bca0ddd (origin/main) feat: Add payment slip upload to customer checkout flow
c6ac150 docs: Add Firebase integration setup summary

About to push to origin/main

Continue? (y/n): y

Pushing to GitHub...
Enumerating objects: 5, done.
...

✅ Successfully pushed to GitHub!
```

---

### 3. **build.bat** - Build สำหรับ Production
```bash
double-click build.bat
```

**สิ่งที่ทำ:**
- ✅ ตรวจสอบและติดตั้ง dependencies (ถ้ายังไม่มี)
- ✅ Build project ด้วย Vite
- ✅ สร้าง optimized output ใน `dist/` folder

**Output:**
```
📦 Building Perfume Shop for Production

Building project...

✅ Build completed successfully!

Output directory: dist/
```

---

## 🎯 Typical Workflow

### สำหรับ Development:

```bash
1. Double-click start-dev.bat
   → Server starts at http://localhost:5174

2. Edit files in src/
   → Vite auto-reloads

3. When done, Ctrl+C to stop server

4. Double-click push-to-github.bat
   → Commit & push to GitHub
```

### สำหรับ Production Deploy:

```bash
1. Double-click build.bat
   → Creates optimized dist/ folder

2. Upload dist/ to Vercel or hosting
   → Or double-click push-to-github.bat 
     then deploy from Vercel dashboard
```

---

## 🔧 Manual Commands (If bat files don't work)

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Git operations
git add -A
git commit -m "Your message"
git push origin main
```

---

## ⚠️ Troubleshooting

### Port 5174 is already in use
**Solution:** `start-dev.bat` will automatically kill it

### Git not found
**Solution:** Install Git from https://git-scm.com

### Permission denied (GitHub)
**Solution:** 
- Make sure you have SSH key set up
- Or use HTTPS with Personal Access Token
- Check: https://docs.github.com/en/authentication

### npm not found
**Solution:** Install Node.js from https://nodejs.org

---

## 📝 Notes

- **Default commit message:** "Update: Minor improvements and bug fixes"
- **Default branch:** main
- **Default port:** 5174
- **Build output:** dist/

For more info, see `README.md` in root folder
