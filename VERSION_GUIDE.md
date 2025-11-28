# 📦 Version Management Guide

## 🎯 Overview

ระบบเวอร์ชันมีไว้เพื่อ:
- ✅ ติดตามการปรับปรุงแอพ
- ✅ รู้ว่าใช้เวอร์ชันไหน
- ✅ เข้าใจการเปลี่ยนแปลง
- ✅ สำรองข้อมูล version history

---

## 📋 Files & Structure

### Main Version Files
```
project/
├── VERSION.md (📖 Version history)
├── package.json (version: "1.1.0")
├── src/
│   └── config/
│       └── version.js (⚙️ Version config)
└── CHANGELOG.md (🔄 Changes log - optional)
```

---

## 🔢 Version Number Format

### Semantic Versioning: `MAJOR.MINOR.PATCH`

```
1.1.0
│ │ └─ PATCH (0-9) - Bug fixes, small changes
│ └─── MINOR (0-9) - New features, no breaking changes
└───── MAJOR (0-9) - Breaking changes, major updates
```

### Examples
```
✅ 1.0.0 → 1.0.1 (PATCH)     [Bug fix release]
✅ 1.0.1 → 1.1.0 (MINOR)     [New feature release]
✅ 1.1.0 → 2.0.0 (MAJOR)     [Breaking change release]
```

---

## 📝 How to Update Version

### Method 1: Update package.json

```json
{
  "name": "perfume-shop",
  "version": "1.1.0"  // ← Change here
}
```

### Method 2: Update src/config/version.js

```javascript
export const APP_CONFIG = {
  VERSION: '1.1.0',        // ← Change here
  RELEASE_DATE: '2025-11-28',
  LAST_UPDATED: '2025-11-28',
  BUILD_NUMBER: '20251128'
};
```

### Method 3: Update VERSION.md

```markdown
## Current Version: 1.1.0

**Release Date**: November 28, 2025  // ← Change here
**Status**: ✅ Stable
```

---

## 🚀 When to Update Version

### 🔴 MAJOR Version (1.0.0 → 2.0.0)
When:
- Breaking API changes
- Complete redesign
- Incompatible with previous versions

Example: UI overhaul, database schema change

### 🟡 MINOR Version (1.0.0 → 1.1.0)
When:
- New features added
- Backward compatible
- No breaking changes

Example: Add table view, add filters, add new page

### 🟢 PATCH Version (1.0.0 → 1.0.1)
When:
- Bug fixes
- Minor improvements
- Security patches

Example: Fix upload issue, improve styling

---

## 📖 VERSION.md Structure

### What to Include

```markdown
## Current Version: X.X.X
- Release Date
- Status (Stable/Beta/RC)

## Version X.X.X (Date)
### ✨ New Features
- Feature 1
- Feature 2

### 🔧 Improvements
- Improvement 1
- Improvement 2

### 🐛 Bug Fixes
- Fix 1
- Fix 2

### 📚 Documentation
- Doc 1
- Doc 2
```

---

## 🔍 How to Check Version

### In Browser Console
```javascript
// Open F12 → Console → Type:
console.log(APP_CONFIG.VERSION);
// Output: "1.1.0"

// Or see full info:
console.log(getVersionInfo());
// Output: { version, name, releaseDate, buildNumber, environment }
```

### In Browser Tab Title
```javascript
// Add to main component:
useEffect(() => {
  document.title = `${APP_NAME} v${APP_VERSION}`;
}, []);
```

### In Footer
```jsx
<footer>
  <p>Perfume Shop v{APP_CONFIG.VERSION}</p>
  <p>Last updated: {APP_CONFIG.LAST_UPDATED}</p>
</footer>
```

### In Admin Dashboard
```jsx
<div className="version-info">
  Version {APP_CONFIG.VERSION}
  <small>{APP_CONFIG.RELEASE_DATE}</small>
</div>
```

---

## 🔄 Version Release Workflow

### Step 1: Develop & Test
```
1. Make changes
2. Test locally
3. Fix bugs
4. Test again
```

### Step 2: Prepare Release
```
1. Update VERSION.md (add changes)
2. Update package.json (version number)
3. Update src/config/version.js
4. Test one more time
```

### Step 3: Commit & Tag
```bash
# Commit changes
git add -A
git commit -m "release: v1.1.0 - Table view & better error handling"

# Create git tag (optional but recommended)
git tag -a v1.1.0 -m "Version 1.1.0 Release"

# Push
git push origin main
git push origin v1.1.0
```

### Step 4: Deploy
```bash
# Build
npm run build

# Test build
npm run preview

# Deploy to Vercel (automatic on git push)
```

### Step 5: Announce
```
Update:
- GitHub releases page
- User documentation
- Email to users (if needed)
- Social media (if applicable)
```

---

## 📊 Version History Example

### Current Timeline
```
v1.0.0 (Nov 27, 2025)
  ↓ Initial Release
  
v1.1.0 (Nov 28, 2025)
  ↓ Table View + Filters + Better Error Handling
  
v1.2.0 (Dec 15, 2025) - Planned
  ↓ Search + Wishlist + Notifications
  
v1.3.0 (Jan 30, 2026) - Planned
  ↓ Multiple Payments + Analytics
  
v2.0.0 (Q2 2026) - Planned
  ↓ Major Redesign + Admin Panel Overhaul
```

---

## 🎯 Version Goals

### 1.1.0 Goals ✅
- [x] Improve admin UI (table view)
- [x] Better error handling
- [x] Add documentation
- [x] Fix payment slip issue

### 1.2.0 Goals 🔄
- [ ] Search products
- [ ] Filter products
- [ ] Wishlist feature
- [ ] Email notifications

### 1.3.0 Goals 📅
- [ ] Multiple payment methods
- [ ] Invoices
- [ ] Shipping tracking
- [ ] Customer accounts

### 2.0.0 Goals 🚀
- [ ] Complete UI redesign
- [ ] Analytics dashboard
- [ ] Inventory system
- [ ] Multi-language support

---

## 🔐 Version Security

### Security Updates
```
If there's a security issue:

1. Create patch version immediately
2. Update to v1.1.1 (patch)
3. Deploy ASAP
4. Notify users
5. Update security policy

Never wait for next scheduled release!
```

### Version Deprecation
```
Version Timeline:

v1.0.0: Released Nov 27 → Support ends May 27
         (6 months support)

v1.1.0: Released Nov 28 → Support ends May 28
         (6 months support)

v2.0.0: Released TBD   → Support indefinite
         (latest version)
```

---

## 💾 Backup Strategy

### Before Major Update
```bash
# Create backup branch
git branch backup/v1.1.0
git tag v1.1.0

# Just in case you need to revert:
git checkout v1.1.0  # Go back to that version
```

---

## 📈 Tracking Metrics

### What to Monitor
```
Version 1.1.0
├── Performance
│   ├── Load time: 1.5s (first)
│   ├── Build size: 202KB (gzipped)
│   └── Lighthouse: 95/100
├── User Feedback
│   ├── Bugs reported: 0
│   ├── Improvements suggested: 3
│   └── Satisfaction: 4.8/5
└── Analytics
    ├── Users: 150+
    ├── Orders: 45
    └── Error rate: < 1%
```

---

## 🛠️ Tools for Version Management

### GitHub Features
- ✅ **Releases** - Create release notes
- ✅ **Tags** - Mark version points
- ✅ **Branches** - Separate work per version

### Commands
```bash
# List all tags
git tag -l

# Create tag
git tag -a v1.1.0 -m "Version 1.1.0"

# Show tag info
git show v1.1.0

# Delete tag
git tag -d v1.1.0
```

---

## 📚 Documentation Checklist

When releasing new version:

- [ ] Update VERSION.md
- [ ] Update package.json
- [ ] Update src/config/version.js
- [ ] Create release notes
- [ ] Update README.md (if needed)
- [ ] Test all features
- [ ] Deploy to staging
- [ ] Deploy to production
- [ ] Create git tag
- [ ] Update GitHub release page
- [ ] Notify users (if needed)

---

## 🔗 Related Documents

- `VERSION.md` - Full version history
- `package.json` - Project version
- `src/config/version.js` - Version config
- `CHANGELOG.md` - Detailed changes (optional)
- `README.md` - Main documentation

---

## 💡 Tips

### Tip 1: Keep Versions in Sync
```
Always update:
1. package.json
2. src/config/version.js
3. VERSION.md

Together! ✅
```

### Tip 2: Be Consistent
```
✅ Do:
v1.0.0, v1.1.0, v2.0.0

❌ Don't:
v1, v1.1, version 2, 2.0
```

### Tip 3: Clear Release Notes
```
✅ Good:
- Added table view for orders
- Fixed payment slip upload issue
- Improved error messages

❌ Bad:
- Updated stuff
- Fixed bugs
- Improvements
```

### Tip 4: Tag on Release
```
git tag v1.1.0
git push --tags

Makes it easy to checkout old versions!
```

---

**Last Updated**: November 28, 2025  
**Maintained By**: Development Team
