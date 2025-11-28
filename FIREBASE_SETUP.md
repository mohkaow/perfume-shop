# 🔥 Firebase Setup & Integration Guide

Complete guide for setting up and integrating Firebase with the Perfume Shop application.

## ✨ Firebase Features Implemented

✅ **Admin Dashboard** - Complete product and order management system  
✅ **Authentication** - Secure admin login with Firebase Auth  
✅ **Firestore Database** - Real-time product and order data storage  
✅ **Firebase Storage** - Image upload for products and payment slips  
✅ **Security Rules** - Firestore and Storage security rules configured  
✅ **Order Management** - Payment slip verification system  

---

## 📋 Firebase Setup Checklist

- [ ] Create Firebase Project
- [ ] Enable Authentication (Email/Password)
- [ ] Create Firestore Database
- [ ] Enable Cloud Storage
- [ ] Create Admin User Account
- [ ] Deploy Firestore Rules
- [ ] Deploy Storage Rules
- [ ] Configure Environment Variables
- [ ] Test Connection
- [ ] Deploy to Production

---

## 🚀 Step-by-Step Setup Guide

### Step 1: Create Firebase Project

1. Visit [Firebase Console](https://console.firebase.google.com/)
2. Click **"Create a project"** or **"Add project"**
3. Enter project name: `perfume-shop` (or your preferred name)
4. Choose your location/region
5. Accept the Firebase terms
6. Click **"Create project"**
7. Wait for project initialization (usually 1-2 minutes)

### Step 2: Enable Firebase Services

#### 2.1 Authentication (Email/Password)
```
1. Navigate to Authentication section (left sidebar)
2. Click "Get started"
3. Select "Email/Password" provider
4. Toggle the enable switch
5. Click "Save"
```

#### 2.2 Firestore Database
```
1. Navigate to Firestore Database
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select your database location
5. Click "Enable"
6. Skip rules for now (we'll update them later)
```

#### 2.3 Cloud Storage
```
1. Navigate to Storage
2. Click "Get started"
3. Choose "Start in test mode"
4. Select your storage location
5. Click "Done"
```

### Step 3: Get Your Firebase Configuration

1. Click the **Settings icon** (⚙️) in the top-left corner
2. Select **"Project settings"**
3. Go to the **"General"** tab
4. Scroll down to **"Your apps"** section
5. Click on the **Web app icon** (if not created, click "Add app")
6. Copy the entire `firebaseConfig` object

Your configuration should look like:
```javascript
{
  apiKey: "AIzaSy...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef1234567",
  measurementId: "G-XXXXXXXXXX"
}
```

### Step 4: Configure Your Application

#### Option A: Using Environment Variables (Recommended) ⭐

1. **Create `.env.local` file** in your project root:
   ```bash
   cp .env.example .env.local
   ```

2. **Add your Firebase configuration**:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

3. **Restart your development server**:
   ```bash
   npm run dev
   ```

#### Option B: Direct Configuration

Edit `src/firebase.js` and replace placeholder values with your Firebase config:
```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_BUCKET",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
};
```

### Step 5: Deploy Security Rules

#### 5.1 Firestore Security Rules

1. In Firebase Console → **Firestore Database** → **Rules** tab
2. **Replace all content** with this:

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper function - Check if user is authenticated
    function isAdmin() {
      return request.auth != null;
    }
    
    // Products Collection - Read for all, Write for authenticated users only
    match /products/{productId} {
      allow read: if true;
      allow create, update, delete: if isAdmin();
    }
    
    // Orders Collection - Read for admin only, Create for all, Update/Delete for admin
    match /orders/{orderId} {
      allow read: if isAdmin();
      allow create: if true;
      allow update, delete: if isAdmin();
    }
  }
}
```

3. Click **"Publish"**

#### 5.2 Cloud Storage Rules

1. Go to **Storage** → **Rules** tab
2. **Replace all content** with:

```storage
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    
    // Product images - readable by all, writable by authenticated users
    match /products/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Payment slips - readable by admin, writable by all, deletable by admin
    match /payment-slips/{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if true;
      allow delete: if request.auth != null;
    }
  }
}
```

3. Click **"Publish"**

### Step 6: Create Admin User

1. Go to **Authentication** → **Users** tab
2. Click **"Add user"** button
3. Enter:
   - **Email**: your-admin@example.com (use a real email)
   - **Password**: A strong password (min 6 characters)
4. Click **"Add user"**
5. You should see the user listed with UID

### Step 7: Test the Connection

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open browser to `http://localhost:5174`

3. Navigate to `/admin/login`

4. Try logging in with your admin credentials

5. If successful, you should see the Admin Dashboard!

---

## 🔐 Security Best Practices

### Environment Variables Protection
- ✅ Never commit `.env.local` to version control
- ✅ Add `.env.local` to `.gitignore` (already configured)
- ✅ Use `.env.example` as a template for team members
- ✅ In production, set variables through your hosting platform

### Firestore Security
- ✅ Rules validate user authentication
- ✅ Anonymous create on orders only
- ✅ Admin-only read for orders
- ✅ Admin-only write for products
- ✅ Regular rule audits recommended

### Storage Security
- ✅ Public read for product images
- ✅ Authenticated write for product uploads
- ✅ Admin-only read for payment slips
- ✅ Public write for customer uploads
- ✅ File type validation in code

### Authentication Security
- ✅ Strong password requirements
- ✅ Email verification recommended
- ✅ 2FA available (enable in console)
- ✅ Regular account audits
- ✅ Session management

---

## 📊 Database Structure

### Products Collection
```
/products
  ├── {productId}
      ├── name: string
      ├── description: string
      ├── price: number
      ├── volume: string
      ├── notes: string
      ├── image: string (storage URL)
      ├── createdAt: timestamp
      └── updatedAt: timestamp
```

### Orders Collection
```
/orders
  ├── {orderId}
      ├── customer: {
      │   ├── name: string
      │   ├── phone: string
      │   ├── address: string
      │   └── note: string
      │ }
      ├── items: array [
      │   {
      │     ├── id: string
      │     ├── name: string
      │     ├── price: number
      │     └── quantity: number
      │   }
      │ ]
      ├── totalPrice: number
      ├── status: string (pending/confirmed/rejected/shipped/completed)
      ├── paymentSlipUrl: string (optional)
      ├── paymentApproved: boolean
      ├── createdAt: timestamp
      └── updatedAt: timestamp
```

---

## 🐛 Troubleshooting

### ❌ "Firebase API Key not configured"
**Solution:**
- Check that `.env.local` exists in project root
- Verify all `VITE_FIREBASE_*` variables are present
- Restart development server: `npm run dev`
- Check for typos in variable names

### ❌ "Permission denied" on login
**Solution:**
- Verify user exists in Firebase Authentication
- Check Firestore Rules are published correctly
- Ensure rules are using correct collection names
- Review browser console for detailed error

### ❌ "Project not found" error
**Solution:**
- Double-check `VITE_FIREBASE_PROJECT_ID` is correct
- Verify the Firebase project still exists
- Try re-login with your Google account in Firebase Console

### ❌ "Cannot upload images"
**Solution:**
- Check Storage Rules are published
- Verify file size is under 5MB
- Ensure file type is supported (JPEG, PNG, WebP)
- Check browser console for specific error

### ❌ "Orders not showing"
**Solution:**
- Ensure Firestore database is created
- Create sample order through customer interface
- Check Firestore Rules - admin must be authenticated
- Verify you're logged in as admin user

---

## 📈 Monitoring & Analytics

### Firebase Console Features

**Analytics Dashboard**
- Monitor user engagement
- Track app usage statistics
- View user demographics

**Performance Monitoring**
- Track app performance metrics
- Identify slow operations
- Monitor database performance

**Crashlytics**
- Receive crash notifications
- Analyze error patterns
- Fix critical issues

### Recommended Monitoring Setup

1. **Set Billing Alerts**
   - Go to Project Settings → Billing
   - Set daily budget alerts

2. **Monitor Collections**
   - Check document counts
   - Monitor storage usage
   - Review traffic patterns

3. **Review Logs**
   - Check authentication logs
   - Monitor failed login attempts
   - Review suspicious activities

---

## 🚀 Production Deployment

### Before Going Live

1. **Upgrade Plan**
   - Free Spark plan has limitations
   - Consider Blaze (pay-as-you-go) plan
   - Monitor projected costs

2. **Enable Additional Security**
   - Enable email verification for signup
   - Implement rate limiting
   - Set up automated backups

3. **Configure Production Rules**
   ```firestore
   // Add stricter validation rules
   match /orders/{orderId} {
     allow read: if isAdmin() || request.auth.uid == resource.data.userId;
     allow create: if validateOrder(request.resource.data);
     allow update: if isAdmin() && validateOrderUpdate(request.resource.data);
     allow delete: if isAdmin();
   }
   ```

4. **Set Up Monitoring**
   - Enable Cloud Logging
   - Configure error reporting
   - Set up performance monitoring

5. **Database Optimization**
   - Create necessary indexes
   - Optimize query patterns
   - Monitor read/write operations

### Deployment Steps

**Using Firebase Hosting:**
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize hosting
firebase init hosting

# Build your app
npm run build

# Deploy
firebase deploy
```

---

## 📚 Additional Resources

- [Firebase Console](https://console.firebase.google.com/)
- [Firebase Docs](https://firebase.google.com/docs)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Storage Documentation](https://firebase.google.com/docs/storage)
- [Authentication Docs](https://firebase.google.com/docs/auth)
- [Firebase CLI Reference](https://firebase.google.com/docs/cli)

---

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] Firebase project created and accessible
- [ ] All services enabled (Auth, Firestore, Storage)
- [ ] Security rules deployed
- [ ] Admin user created
- [ ] Environment variables configured
- [ ] Dev server starts without errors
- [ ] Can access `/admin/login`
- [ ] Can log in as admin user
- [ ] Admin dashboard loads
- [ ] Can create product (image uploads)
- [ ] Can create order as customer
- [ ] Can view orders in admin panel
- [ ] Can approve/reject orders

---

## 🤝 Need Help?

- Check [Firebase Status Page](https://status.firebase.google.com/) for outages
- Review [Stack Overflow](https://stackoverflow.com/questions/tagged/firebase)
- Check GitHub Issues in [Firebase JS SDK](https://github.com/firebase/firebase-js-sdk)
- Contact Firebase support through Console

---

**Last Updated**: November 2025  
**Version**: 1.0.0
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
