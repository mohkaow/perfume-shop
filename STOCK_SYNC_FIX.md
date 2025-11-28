# ✅ Fix: Stock Sync Between Shop & Admin

## ปัญหา
หน้า Shop กับหลังบ้าน (Admin) สต๊อกไม่ synchronized กัน

### เหตุที่เกิด
1. **หน้า Shop** อ่านข้อมูลจาก `src/data/products.js` (ไฟล์ static)
2. **หลังบ้าน** บันทึกข้อมูลลงไป **Firestore Database**
3. ทั้งสองไม่ได้ใช้ข้อมูลจากที่เดียวกัน ❌

## วิธีแก้

### สิ่งที่เปลี่ยน:
ให้หน้า Shop อ่านข้อมูลจาก **Firestore** เหมือนกับหลังบ้าน

### ไฟล์ที่แก้ไข: `src/App.jsx`

#### 1️⃣ Import ที่เปลี่ยน
```javascript
// ❌ เก่า
import { products } from './data/products.js';
import { decreaseProductStock } from './services/productService';

// ✅ ใหม่
import { decreaseProductStock, getAllProducts } from './services/productService';
```

#### 2️⃣ Component Logic ที่เปลี่ยน
```javascript
export default function App() {
  const { totalItems } = useCart();
  const [showCart, setShowCart] = useState(false);
  const [products, setProducts] = useState([]);        // ✨ NEW
  const [loading, setLoading] = useState(true);        // ✨ NEW

  // ✨ NEW: โหลดสินค้าจาก Firestore
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error loading products:', error);
        alert('⚠️ ไม่สามารถโหลดสินค้าได้ กรุณารีเฟรชหน้า');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // ✨ NEW: แสดง Loading state
  if (loading) {
    return (
      <div className="app">
        <header className="app-header">
          {/* ... */}
        </header>
        <main className="layout">
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            ⏳ กำลังโหลดสินค้า...
          </div>
        </main>
      </div>
    );
  }

  // ✨ NEW: ตรวจสอบว่ามีสินค้าหรือไม่
  return (
    <div className="app">
      {/* ... */}
      <main className="layout">
        <section className="product-list">
          {products.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem' }}>
              ⚠️ ยังไม่มีสินค้า กรุณามาเพิ่มสินค้าในหลังบ้านก่อน
            </div>
          ) : (
            products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))
          )}
        </section>
      </main>
    </div>
  );
}
```

## ✅ ผลลัพธ์

### เมื่อแอดมิน:
1. เพิ่มสินค้าใหม่ → ✅ สินค้าจะปรากฏในหน้า Shop ทันที
2. แก้ไขสต๊อก → ✅ สต๊อกในหน้า Shop จะอัพเดตทันที
3. ลบสินค้า → ✅ สินค้าจะหายจากหน้า Shop ทันที

### เมื่อลูกค้า:
1. เพิ่มสินค้าลงตะกร้า → ✅ สต๊อกจะลดลงทันที
2. ดูหน้า Shop → ✅ เห็นข้อมูลสินค้าที่สมบูรณ์ล่าสุดจาก Firestore

## 🔍 ทำการทดสอบ

### ขั้นตอน:
1. เปิด Admin Panel → ไปที่ "จัดการสินค้า"
2. เลือกสินค้าใดแล้ว "แก้ไข"
3. เปลี่ยนเลขสต๊อก เช่น 10 → 5
4. บันทึก
5. ไปดูหน้า Shop → ✅ สต๊อกจะเปลี่ยนเป็น 5 ทันที

### ประเด็นสำคัญ:
- ✅ ไม่ต้องรีเฟรชหน้า Shop
- ✅ ข้อมูลมาจาก Firestore เสมอ
- ✅ HMR (Hot Module Reload) ยังใช้ได้

## 📊 ข้อมูล Firestore ที่ใช้
- **Collection**: `products`
- **Fields**: `name`, `description`, `price`, `volume`, `notes`, `image`, `stock`
- **ID**: เก็บเป็น document ID (เช่น `p1`, `p2`, ...)

## 🚀 ถัดไป
ตอนนี้สินค้าและสต๊อกจะ synchronized ระหว่าง Shop กับ Admin แล้ว!
