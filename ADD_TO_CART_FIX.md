# ✅ Fix: เพิ่มสินค้าเข้าตะกร้า - Stock Sync Implementation

## ปัญหา
ไม่สามารถเพิ่มสินค้าเข้าตะกร้าได้ ❌

### เหตุที่เกิด
1. `CartContext` ยังคงอ่านข้อมูลจากไฟล์ static (`products.js`)
2. `App.jsx` อ่านข้อมูลจาก Firestore
3. **Data mismatch**: CartContext ไม่เจอข้อมูลสินค้าที่ App กำลังใช้
4. ส่วน `addItem()` ในเสมือนตรวจสอบสต๊อก แต่ไม่เจอข้อมูล
5. การเพิ่มสินค้าจึงเงียบ ๆ ไม่ทำงาน

## วิธีแก้

### ขั้นตอน 1: แก้ไข `CartContext.jsx`
เปลี่ยนจากอ่านไฟล์ static เป็นรับ `products` เป็น prop:

```javascript
// ❌ เก่า
import { products } from '../data/products';
export function CartProvider({ children }) {

// ✅ ใหม่
export function CartProvider({ children, products = [] }) {
```

**จุดสำคัญ**: CartContext ตอนนี้รับข้อมูลจากข้างนอก ไม่อ่านไฟล์เอง

### ขั้นตอน 2: แก้ไข `main.jsx`
ลบ `CartProvider` ออกจากระดับบนสุด เพราะต้องให้ App เป็นคนควบคุม:

```javascript
// ❌ เก่า
<AuthProvider>
  <CartProvider>
    <Routes>
      <Route path="/" element={<App />} />
    </Routes>
  </CartProvider>
</AuthProvider>

// ✅ ใหม่
<AuthProvider>
  <Routes>
    <Route path="/" element={<App />} />
  </Routes>
</AuthProvider>
```

### ขั้นตอน 3: แก้ไข `App.jsx` 
ให้ App ควบคุม `CartProvider` และส่ง `products` prop:

```javascript
// ✅ นำเข้า CartProvider และ getAllProducts
import { CartProvider } from './context/CartContext.jsx';
import { decreaseProductStock, getAllProducts } from './services/productService';

// ✅ Main App component
export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // โหลดข้อมูลจาก Firestore
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  // ห่อ CartProvider ด้วย products
  return (
    <CartProvider products={products}>
      <AppContent products={products} />
    </CartProvider>
  );
}

// ✅ Wrapper component ที่ใช้ useCart()
function AppContent({ products }) {
  const { totalItems } = useCart();
  // ... rest of component
}
```

## ✅ ผลลัพธ์

### ตอนนี้สินค้าจะแสดงผลและ link กันระหว่าง:
1. **Firestore** ← Single source of truth
2. **App.jsx** ← อ่านข้อมูลจาก Firestore
3. **CartContext** ← รับข้อมูลจาก App
4. **ProductCard** ← ใช้ข้อมูลจาก CartContext ในการตรวจสอบสต๊อก

### เพิ่มสินค้าเข้าตะกร้า: ✅ ทำงานแล้ว

**Process**:
1. ลูกค้าคลิก "เพิ่มลงตะกร้า"
2. `ProductCard.handleAdd()` เรียก `addItem()`
3. `CartContext.addItem()` ตรวจสอบสต๊อกจากข้อมูล Firestore
4. ถ้าสต๊อก > 0 → เพิ่มลงตะกร้า ✅
5. ถ้าสต๊อก = 0 → แสดง "สินค้าหมด" ❌

## 🔍 ข้อมูลไหล

```
Firestore (products collection)
    ↓
App.jsx (useEffect + getAllProducts)
    ↓
state: products = [...]
    ↓
<CartProvider products={products}>
    ↓
CartContext (addItem ตรวจสอบสต๊อก)
    ↓
ProductCard (handleAdd)
    ↓
Shopping Cart
```

## 🧪 วิธีทดสอบ

1. เปิด Admin Dashboard → จัดการสินค้า
2. เลือกสินค้า "Coach Green" → แก้ไข → เปลี่ยนสต๊อก: 10 → 0
3. บันทึก
4. กลับไปหน้า Shop
5. ดูสินค้า "Coach Green":
   - ❌ ปุ่ม "เพิ่มลงตะกร้า" ปิดใช้งาน
   - 🤍 แสดงปุ่ม "สำรองสต๊อก" แทน
6. เปลี่ยนสต๊อก: 0 → 5 ในหลังบ้าน
7. กลับหน้า Shop:
   - 📦 ตัวเลขเปลี่ยนเป็น "เหลือ 5 ชิ้น"
   - ✅ ปุ่ม "เพิ่มลงตะกร้า" เปิดใช้งาน

## 📊 ไฟล์ที่แก้ไข

| ไฟล์ | เปลี่ยน | สาเหตุ |
|---|---|---|
| `src/App.jsx` | ✅ | โหลด Firestore + ห่อ CartProvider |
| `src/context/CartContext.jsx` | ✅ | รับ products เป็น prop |
| `src/main.jsx` | ✅ | ลบ CartProvider ออก |

## 🚀 ถัดไป
- ✅ เพิ่มสินค้า: ทำงาน
- ✅ ลดสต๊อก: ทำงาน
- ✅ Stock sync: ทำงาน
- ⏳ Commit & Push (รอคำสั่ง)
