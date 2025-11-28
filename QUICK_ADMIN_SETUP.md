# 🛠️ Quick Admin Setup - วิธีเร็วๆ

## 5 ขั้นตอนเพื่อสร้าง Admin ใหม่

### ✅ Step 1: Firebase Console → Authentication
```
1. ไปที่ https://console.firebase.google.com
2. เลือก Project: perfume-shop-82ac7
3. คลิก Authentication (ด้านซ้าย)
4. คลิก Create User
```

### ✅ Step 2: กรอกข้อมูล
```
Email:    admin.new@perfume-shop.com
Password: YourSecurePassword123!
```
**คลิก Create User**

### ✅ Step 3: คัดลอก User ID
1. ไปที่ Users list
2. หา email ที่สร้างใหม่
3. คลิกเพื่อดูรายละเอียด
4. **คัดลอก UID** (String ยาวๆ)

### ✅ Step 4: Firestore → สร้าง Admin Document
1. ไปที่ **Firestore Database** (ด้านซ้าย)
2. ไปที่ Collection **admins**
3. คลิก **Add Document**
4. Document ID: **วางค่า UID ที่คัดลอก**
5. Add fields:

| Field | Type | Value |
|-------|------|-------|
| email | String | admin.new@perfume-shop.com |
| name | String | ชื่อ Admin |
| role | String | admin |
| isActive | Boolean | true |
| createdAt | Timestamp | (วันนี้) |

### ✅ Step 5: ทดสอบการเข้าระบบ
```
URL: http://localhost:5174/admin/login
Email: admin.new@perfume-shop.com
Password: YourSecurePassword123!
```

---

## 🚨 Common Issues & Solutions

### ❌ Issue: "อีเมลหรือรหัสผ่านไม่ถูกต้อง"
**แก้ไข:**
- ตรวจสอบ Email ให้แน่ใจว่าตรงกัน (uppercase/lowercase)
- ตรวจสอบ Password มีตัวอักษรพิเศษ?
- ลองรีเซ็ต Password ใน Firebase

### ❌ Issue: "ไม่พบผู้ใช้นี้ในระบบ"
**แก้ไข:**
- ตรวจสอบว่า User ถูกสร้างใน Firebase Auth แล้ว
- ตรวจสอบ Email ที่ใช้ login

### ❌ Issue: Login ได้แต่ไปหน้า Dashboard แล้ว blank
**แก้ไข:**
- ตรวจสอบว่า admins collection มีอยู่ใน Firestore
- ตรวจสอบว่า Document ID ตรงกับ Firebase UID
- ตรวจสอบ Firestore Rules อนุญาติให้อ่าน admins

### ❌ Issue: "Permission denied"
**แก้ไข:**
- ไปที่ Firestore → Rules
- ตรวจสอบว่ามีสิทธิ์อ่าน admins collection
- ลอง refresh browser

---

## 📊 Firestore Structure ที่ถูกต้อง

```
firestore
├── admins
│   ├── (UID_1)
│   │   ├── email: "admin@perfume-shop.com"
│   │   ├── name: "นาย Admin"
│   │   ├── role: "admin"
│   │   ├── isActive: true
│   │   └── createdAt: timestamp
│   └── (UID_2)
│       ├── email: "admin2@perfume-shop.com"
│       ├── name: "นาง Admin"
│       ├── role: "admin"
│       ├── isActive: true
│       └── createdAt: timestamp
│
├── orders
│   ├── (order docs)
│
└── products
    └── (product docs)
```

---

## 🔑 ตัวอย่าง Firebase UID Format
```
UID ดูเหมือนนี้:
k8mP2qL9xN4vQ6rS1tU3w5yZ7aB9cD2e4F6gH8jK
```

---

## 📞 Firebase Console Links

- **Firestore**: https://console.firebase.google.com/project/perfume-shop-82ac7/firestore
- **Authentication**: https://console.firebase.google.com/project/perfume-shop-82ac7/authentication
- **Rules**: https://console.firebase.google.com/project/perfume-shop-82ac7/firestore/rules

---

**Created**: November 28, 2025
