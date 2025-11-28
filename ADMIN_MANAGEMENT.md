# 👥 Admin Management - จัดการ Admin ทั้งหมด

## 📊 ข้อมูล Admin ที่มีอยู่

### Admin ปัจจุบัน
| Email | ชื่อ | Role | Status |
|-------|------|------|--------|
| admin@perfume-shop.com | Admin หลัก | admin | 🟢 Active |

---

## 🆕 การเพิ่ม Admin ใหม่

### วิธี A: ผ่าน Firebase Console (แนะนำ)

```
1. Firebase Console → Authentication → Create User
2. กรอก Email และ Password
3. Copy UID
4. Firestore → admins Collection → Add Document
5. Document ID = UID
6. เพิ่ม Fields: email, name, role, isActive, createdAt
```

**ดู**: QUICK_ADMIN_SETUP.md สำหรับรายละเอียด

---

## 🔑 Password Management

### ตั้ง Password ใหม่
1. Firebase Console → Authentication → Users
2. หา Admin
3. คลิก **Edit** (ดินสอ icon)
4. กรอก Password ใหม่
5. บันทึก

### Admin ลืม Password
1. ที่หน้า Login ไม่มีปุ่ม "Forgot Password"
2. **ตัวเลือก**: 
   - Admin ต้องติดต่อ Firebase Admin
   - ลบและสร้าง Admin ใหม่
   - ใช้ Firebase Reset Password Email

---

## 🚫 การปิด/ลบ Admin

### ปิด Admin (ปลอดภัยสุด - แนะนำ)

**ทำได้ 2 วิธี:**

#### วิธี 1: ผ่าน Firestore (รวดเร็ว)
```
1. Firestore → admins Collection
2. หา Admin ที่ต้องการปิด
3. แก้ไข: isActive → false
4. บันทึก
```

#### วิธี 2: ผ่าน Firebase Auth (ครบถ้วน)
```
1. Firebase Console → Authentication → Users
2. หา Email
3. คลิก 3 dots → Disable user
```

### ลบ Admin (ตัวเลือกสุดท้าย)

#### วิธี 1: ลบจาก Firebase Auth
```
1. Firebase Console → Authentication → Users
2. หา Email
3. คลิก 3 dots → Delete user
```

#### วิธี 2: ลบจาก Firestore
```
1. Firestore → admins Collection
2. คลิก 3 dots → Delete document
```

**⚠️ เตือน**: ลบจาก Auth กับ Firestore ควรทำทั้งสองอัน

---

## 🔄 การแก้ไข Admin

### เปลี่ยนชื่อ Admin
```
1. Firestore → admins Collection
2. หา Document
3. แก้ไข: name field
4. บันทึก
```

### เปลี่ยน Email Admin
```
⚠️ ต้องแก้ไขใน 2 ที่:

1. Firebase Authentication
   - Console → Users → Edit → Change Email

2. Firestore
   - admins Collection → Document → Edit email field
```

---

## 🔐 Security Best Practices

### ✅ ต้องทำ
- ✅ ตั้ง Password ยาว (อย่างน้อย 8 ตัว)
- ✅ ใช้อักษรผสม (A-z, 0-9, !@#$)
- ✅ ปิด Admin เมื่อออก (ไม่ลบ)
- ✅ Review Admin list ประจำเดือน
- ✅ ใช้ Email จริง
- ✅ บันทึก Email ไว้
- ✅ ตั้ง Admin เฉพาะคนน่าเชื่อถือ

### ❌ อย่าทำ
- ❌ ไม่ต้องแชร์ Password
- ❌ ไม่ต้องใช้ Password เดียวกัน
- ❌ ไม่ต้องบันทึก Password ที่ไม่ปลอดภัย
- ❌ ไม่ต้องให้ Admin เข้าจากคนแปลกหน้า

---

## 📋 Admin Checklist

### เมื่อสร้าง Admin ใหม่
- [ ] สร้าง User ใน Firebase Auth
- [ ] คัดลอก UID
- [ ] สร้าง Document ใน Firestore (admins)
- [ ] ใส่ UID เป็น Document ID
- [ ] เพิ่ม Fields: email, name, role, isActive, createdAt
- [ ] ทดสอบ Login
- [ ] บันทึก Email และ Password ไว้

### เมื่อปิด Admin
- [ ] ตั้ง isActive = false ใน Firestore (หรือ Disable ใน Auth)
- [ ] บันทึกวันที่ปิด
- [ ] ความเห็น: เหตุผลที่ปิด

---

## 🆘 Troubleshooting

### ❌ Login ไม่ได้หลังสร้าง
- [ ] ตรวจสอบ Email ถูกต้อง?
- [ ] ตรวจสอบ Password ถูกต้อง?
- [ ] admins Collection มีอยู่?
- [ ] UID ตรงกับ Document ID?
- [ ] ตรวจสอบ Firestore Rules

### ❌ ไปหน้า Dashboard แล้ว Error
- [ ] ตรวจสอบ admins Collection มี
- [ ] ตรวจสอบ Document มี role: "admin"
- [ ] ตรวจสอบ isActive: true

### ❌ Firestore Rules Error
- [ ] ไปที่ Firestore → Rules
- [ ] ตรวจสอบว่าอนุญาติให้อ่าน admins
```javascript
match /admins/{document=**} {
  allow read: if true;
}
```

---

## 📈 Future Features (ความเป็นไปได้)

- 🔮 Admin Panel สำหรับจัดการ Admin
- 🔮 Role-based Access Control (Role hierarchy)
- 🔮 Admin Activity Logging
- 🔮 Two-factor Authentication (2FA)
- 🔮 Password reset email flow

---

**Last Updated**: November 28, 2025  
**Firebase Project**: perfume-shop-82ac7
