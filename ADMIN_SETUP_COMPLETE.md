# 🔐 Admin Setup & Management - Complete Guide

## 📚 Documentation Files

ระบบนี้มีเอกสารสำเร็จให้ดู:

### 1. **QUICK_ADMIN_SETUP.md** ⚡ (เริ่มต้นที่นี่)
   - 5 ขั้นตอนง่ายๆ เพื่อสร้าง Admin ใหม่
   - Common Issues & Solutions
   - **สำหรับ**: ผู้ที่ต้องการเพิ่ม Admin ใหม่เร็วๆ

### 2. **ADMIN_SETUP_GUIDE.md** 📖 (รายละเอียดเต็ม)
   - ขั้นตอนทีละขั้นของการตั้งค่า
   - Firebase Console กับ Firestore
   - Security Checklist
   - **สำหรับ**: ผู้ที่ต้องการเข้าใจทั้งหมด

### 3. **FIND_UID_GUIDE.md** 🔍 (หา UID)
   - 3 วิธีการหา Firebase UID
   - UID Format & ตัวอย่าง
   - **สำหรับ**: ผู้ที่ลืม/หาไม่เจอ UID

### 4. **ADMIN_MANAGEMENT.md** 👥 (จัดการ Admin)
   - ดูรายชื่อ Admin ทั้งหมด
   - เปลี่ยน/แก้ไข Admin
   - ปิด/ลบ Admin
   - Security Best Practices
   - **สำหรับ**: Admin ที่ต้องจัดการ Admin คนอื่น

---

## 🎯 Quick Start (3 นาที)

```
1. เปิด QUICK_ADMIN_SETUP.md
2. ทำตามขั้นตอน 5 ขั้น
3. Login ทดสอบ
```

---

## 🏗️ Architecture

```
Firebase Project: perfume-shop-82ac7
│
├── Authentication (Firebase Auth)
│   └── Email/Password Users
│       └── Admin ต่างๆ
│
└── Firestore Database
    └── Collections
        ├── admins (ใหม่ - ใช้สำหรับ admin check)
        │   └── {UID}
        │       ├── email
        │       ├── name
        │       ├── role: "admin"
        │       ├── isActive: true/false
        │       └── createdAt
        │
        ├── orders
        ├── products
        └── ...
```

---

## 📝 Step-by-Step: สร้าง Admin ใหม่

### ขั้นตอนที่ 1: Firebase Auth
```
Firebase Console → Authentication → Create User
Email: admin.john@perfume-shop.com
Password: SecurePassword123!
→ Copy UID (สำคัญ!)
```

### ขั้นตอนที่ 2: Firestore Document
```
Firestore → Collections → admins → Add Document
Document ID: [วางค่า UID]
Fields:
  - email: "admin.john@perfume-shop.com"
  - name: "John Admin"
  - role: "admin"
  - isActive: true
  - createdAt: 2025-11-28
```

### ขั้นตอนที่ 3: ทดสอบ
```
URL: http://localhost:5174/admin/login
Email: admin.john@perfume-shop.com
Password: SecurePassword123!
→ Should see Admin Dashboard
```

---

## 🔄 Application Flow

```
User visits /admin/login
         ↓
Login Component (Login.jsx)
  ├─ Input: email + password
  └─ Call: AuthContext.login()
         ↓
Firebase Auth
  ├─ signInWithEmailAndPassword()
  └─ Returns: user object
         ↓
ProtectedRoute (ProtectedRoute.jsx)
  ├─ Check: isAuthenticated?
  ├─ Yes → Show Dashboard
  └─ No → Redirect to /admin/login
         ↓
Admin Dashboard (AdminDashboard.jsx)
  └─ User can see orders, products, stats
```

---

## 🔑 Key Concepts

### UID (User ID)
- Unique identifier จาก Firebase Auth
- ใช้เป็น Document ID ใน Firestore
- ยาวประมาณ 28 ตัวอักษร
- **เช่น**: `k8mP2qL9xN4vQ6rS1tU3w5yZ7aB9cD2e4F6gH8jK`

### Role Field
- ใช้ระบุว่าเป็น Admin หรือไม่
- **ค่า**: "admin" หรือ "user"
- ตรวจสอบใน rules/validation

### isActive Flag
- `true` = Admin สามารถเข้าระบบได้
- `false` = Admin ถูกปิด (ไม่สามารถเข้าได้)
- ปลอดภัยกว่าการลบ

---

## 🛡️ Security

### Firebase Auth
- ✅ Email/Password verification
- ✅ Hashed passwords (Firebase ทำให้)
- ✅ Session management (Auto login)
- ✅ Account lockout after failed attempts

### Firestore Rules
```javascript
// Read admins collection
match /admins/{document=**} {
  allow read: if true;  // อนุญาติอ่าน
  allow write: if false; // ไม่อนุญาติเขียน
}

// Update orders
match /orders/{document=**} {
  allow read: if true;
  allow write: if request.auth != null; // ต้อง login
}
```

---

## 🐛 Common Issues

| ปัญหา | สาเหตุ | วิธีแก้ |
|------|-------|-------|
| "อีเมลหรือรหัสผ่านไม่ถูกต้อง" | Email/Password ผิด | ตรวจสอบใหม่ |
| "ไม่พบผู้ใช้นี้" | ไม่มี User ใน Auth | สร้าง User ใน Firebase |
| Login ได้ แต่ blank | admins collection ไม่มี | สร้าง Collection & Document |
| "Permission denied" | Firestore rules | ตรวจสอบ Rules |
| UID ไม่ตรง | Document ID ≠ UID | Copy UID ใหม่ |

---

## 📞 Support / Troubleshooting

### Need Help?
1. อ่าน **QUICK_ADMIN_SETUP.md** ก่อน
2. ตรวจสอบ **Common Issues** ข้างบน
3. อ่าน **ADMIN_MANAGEMENT.md** สำหรับการจัดการ
4. ตรวจสอบ **Firestore Rules** ว่าถูกต้อง

### Files to Check
```
src/
  ├── components/
  │   ├── Login.jsx (หน้า login)
  │   └── ProtectedRoute.jsx (ตรวจสอบ auth)
  ├── context/
  │   └── AuthContext.jsx (จัดการ auth state)
  └── pages/
      └── AdminDashboard.jsx (หน้า admin)

Firebase:
  ├── Authentication
  └── Firestore
      └── admins collection
```

---

## 🚀 Production Deployment

เมื่อ Deploy ไป Production (Vercel):

1. ✅ Firebase keys มี .env.local
2. ✅ Firestore Rules ถูกตั้ง
3. ✅ Authentication enabled
4. ✅ Admin credentials เก็บปลอดภัย
5. ✅ Test login ก่อน release

---

## 📊 Firestore Rules Complete

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Admin collection - เฉพาะอ่าน
    match /admins/{document=**} {
      allow read: if true;
      allow write: if false;
    }

    // Orders - เฉพาะผู้ที่ login
    match /orders/{document=**} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update: if request.auth != null;
      allow delete: if false;
    }

    // Products - สาธารณะ
    match /products/{document=**} {
      allow read: if true;
      allow write: if false;
    }
  }
}
```

---

## 🎓 Learning Path

```
Beginner:
  1. QUICK_ADMIN_SETUP.md (5 min)
  2. Test login locally

Intermediate:
  3. ADMIN_SETUP_GUIDE.md (15 min)
  4. Understand Firebase structure

Advanced:
  5. ADMIN_MANAGEMENT.md (20 min)
  6. Learn security best practices
  7. Firebase Rules deep dive
```

---

## ✅ Checklist - ทำการเพิ่ม Admin ใหม่

- [ ] ไปที่ Firebase Console
- [ ] สร้าง User ใน Authentication
- [ ] Copy UID
- [ ] ไปที่ Firestore
- [ ] สร้าง admins Collection (ถ้ายังไม่มี)
- [ ] Add Document ด้วย UID เป็น ID
- [ ] เพิ่ม Fields: email, name, role, isActive, createdAt
- [ ] Test login ที่ http://localhost:5174/admin/login
- [ ] ทำการตรวจสอบว่า Dashboard ทำงาน
- [ ] บันทึก Email & Password

---

**Last Updated**: November 28, 2025  
**Firebase Project**: perfume-shop-82ac7  
**Version**: 1.0.0
