# Firebase Integration - Perfume Shop

## 🎉 สิ่งที่ได้จากการ integrate Firebase

✅ **ระบบ Admin Dashboard** - จัดการสินค้าและคำสั่งซื้อ  
✅ **Authentication** - ระบบ Login สำหรับ Admin  
✅ **Firestore Database** - เก็บข้อมูลสินค้าและคำสั่งซื้อแบบ real-time  
✅ **Firebase Storage** - อัปโหลดรูปสินค้าและสลิปโอนเงิน  
✅ **Order Management** - ระบบจัดการคำสั่งซื้อและตรวจสอบสลิป  

---

## 📋 ขั้นตอนการตั้งค่า Firebase

### 1. ตั้งค่า Firebase Console

คุณได้สร้าง Firebase Project แล้ว ✅  
ตอนนี้ต้องทำขั้นตอนเพิ่มเติม:

#### 1.1 สร้าง Admin Account
1. ไปที่ Firebase Console → **Authentication** → **Users**
2. คลิก **Add user**
3. ใส่อีเมลและรหัสผ่านสำหรับ Admin (เช่น `admin@perfumeshop.com`)
4. คลิก **Add user**

#### 1.2 Deploy Security Rules

**Firestore Rules:**
1. ไปที่ Firebase Console → **Firestore Database** → **Rules**
2. คัดลอกเนื้อหาจากไฟล์ `firestore.rules`
3. วางแทนที่ rules เดิม
4. คลิก **Publish**

**Storage Rules:**
1. ไปที่ Firebase Console → **Storage** → **Rules**
2. คัดลอกเนื้อหาจากไฟล์ `storage.rules`
3. วางแทนที่ rules เดิม
4. คลิก **Publish**

---

### 2. Migrate ข้อมูลสินค้าไปยัง Firestore

รันคำสั่งนี้เพื่อย้ายสินค้า 19 รายการจาก `products.js` ไปยัง Firestore:

```bash
node src/utils/migrationScript.js
```

**หมายเหตุ:** รันครั้งเดียวเท่านั้น! ถ้ารันซ้ำจะมีสินค้าซ้ำใน Firestore

---

### 3. รันเว็บไซต์

```bash
npm run dev
```

เปิดเบราว์เซอร์ที่ `http://localhost:5173`

---

## 🔐 การใช้งาน Admin Dashboard

### เข้าสู่ระบบ Admin
1. ไปที่ `http://localhost:5173/admin/login`
2. ใส่อีเมลและรหัสผ่านที่สร้างไว้ใน Firebase Console
3. คลิก **เข้าสู่ระบบ**

### จัดการสินค้า
- **เพิ่มสินค้า**: คลิกปุ่ม "➕ เพิ่มสินค้าใหม่"
- **แก้ไขสินค้า**: คลิกปุ่ม "✏️ แก้ไข" ที่สินค้าที่ต้องการ
- **ลบสินค้า**: คลิกปุ่ม "🗑️ ลบ" (จะมี confirmation)
- **อัปโหลดรูป**: เลือกรูปจากเครื่อง (รองรับ JPG, PNG, WEBP, ไม่เกิน 5MB)

### จัดการคำสั่งซื้อ
- **ดูคำสั่งซื้อ**: ไปที่แท็บ "🛒 จัดการคำสั่งซื้อ"
- **กรองตามสถานะ**: คลิกปุ่มกรอง (ทั้งหมด, รอตรวจสอบ, ยืนยันแล้ว)
- **ดูสลิป**: คลิกที่รูปสลิปหรือปุ่ม "🔍 ดูสลิปขนาดเต็ม"
- **อนุมัติสลิป**: คลิกปุ่ม "✅ อนุมัติสลิป"
- **ปฏิเสธสลิป**: คลิกปุ่ม "❌ ปฏิเสธสลิป" (ใส่เหตุผลได้)
- **อัปเดตสถานะ**: 
  - "🚚 ทำการจัดส่ง" (เมื่อส่งสินค้าแล้ว)
  - "✔️ เสร็จสิ้น" (เมื่อลูกค้าได้รับสินค้า)

---

## 🛒 การใช้งานสำหรับลูกค้า

### สั่งซื้อสินค้า
1. เลือกสินค้าที่ต้องการ → คลิก "เพิ่มลงตะกร้า"
2. กรอกข้อมูลผู้สั่งซื้อ (ชื่อ, เบอร์โทร, ที่อยู่)
3. **อัปโหลดสลิปโอนเงิน** (บังคับ)
4. คลิก "ยืนยันคำสั่งซื้อและส่งสลิป"
5. จดเลขที่คำสั่งซื้อไว้
6. รอ Admin ตรวจสอบและติดต่อกลับภายใน 24 ชั่วโมง

---

## 📁 โครงสร้างไฟล์ที่สำคัญ

```
perfume-shop/
├── src/
│   ├── firebase.js                    # Firebase config
│   ├── services/
│   │   ├── productService.js          # CRUD สินค้า
│   │   ├── orderService.js            # จัดการคำสั่งซื้อ
│   │   └── storageService.js          # อัปโหลดรูป
│   ├── context/
│   │   ├── AuthContext.jsx            # จัดการ login/logout
│   │   └── CartContext.jsx            # จัดการตะกร้า
│   ├── components/
│   │   ├── Login.jsx                  # หน้า login
│   │   ├── ProtectedRoute.jsx         # ป้องกันหน้า admin
│   │   └── admin/
│   │       ├── ProductManagement.jsx  # จัดการสินค้า
│   │       ├── ProductForm.jsx        # ฟอร์มสินค้า
│   │       └── OrderManagement.jsx    # จัดการคำสั่งซื้อ
│   ├── pages/
│   │   └── AdminDashboard.jsx         # หน้า dashboard
│   ├── utils/
│   │   └── migrationScript.js         # Script ย้ายข้อมูล
│   ├── App.jsx                        # หน้าร้านลูกค้า
│   └── main.jsx                       # Entry point + routing
├── firestore.rules                    # Security rules สำหรับ Firestore
├── storage.rules                      # Security rules สำหรับ Storage
└── package.json
```

---

## 🔧 Troubleshooting

### ❌ ปัญหา: ไม่สามารถ login ได้
**แก้ไข:**
- ตรวจสอบว่าสร้าง user ใน Firebase Console แล้ว
- ตรวจสอบว่า Authentication เปิดใช้งาน Email/Password แล้ว
- ลอง reset รหัสผ่านใน Firebase Console

### ❌ ปัญหา: อัปโหลดรูปไม่ได้
**แก้ไข:**
- ตรวจสอบว่าเปิดใช้งาน Storage แล้ว
- ตรวจสอบว่า deploy storage.rules แล้ว
- ตรวจสอบขนาดไฟล์ (ต้องไม่เกิน 5MB)
- ตรวจสอบประเภทไฟล์ (ต้องเป็น JPG, PNG, WEBP)

### ❌ ปัญหา: สินค้าไม่แสดง
**แก้ไข:**
- ตรวจสอบว่ารัน migration script แล้ว
- เปิด Console ดู error (F12)
- ตรวจสอบว่า deploy firestore.rules แล้ว

### ❌ ปัญหา: Permission denied
**แก้ไข:**
- ตรวจสอบ Security Rules ใน Firebase Console
- ตรวจสอบว่า login แล้วหรือยัง (สำหรับ admin)

---

## 🚀 Next Steps (ถ้าต้องการพัฒนาต่อ)

- [ ] เพิ่มระบบแจ้งเตือนทาง Email เมื่อมีคำสั่งซื้อใหม่
- [ ] เพิ่มระบบ LINE Notify แจ้งเตือน Admin
- [ ] เพิ่มหน้าติดตามสถานะคำสั่งซื้อสำหรับลูกค้า
- [ ] เพิ่มระบบ Inventory (จำนวนสินค้าคงเหลือ)
- [ ] เพิ่มระบบ Promotion/Discount
- [ ] Deploy ขึ้น Firebase Hosting

---

## 📞 Support

หากมีปัญหาหรือข้อสงสัย:
1. ตรวจสอบ Console (F12) ดู error message
2. ตรวจสอบ Firebase Console ดู logs
3. อ่าน [Firebase Documentation](https://firebase.google.com/docs)

---

**สร้างโดย:** Antigravity AI  
**วันที่:** 27 พฤศจิกายน 2025
