import os

BASE_DIR = "perfume-shop"

FILES = {
    "package.json": r'''{
  "name": "perfume-shop",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.0",
    "vite": "^5.4.0"
  }
}
''',

    "vite.config.js": r'''import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173
  }
});
''',

    "index.html": r'''<!doctype html>
<html lang="th">
  <head>
    <meta charset="UTF-8" />
    <title>Perfume Shop</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
''',

    os.path.join("src", "main.jsx"): r'''import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles.css';
import { CartProvider } from './context/CartContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
);
''',

    os.path.join("src", "context", "CartContext.jsx"): r'''import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = window.localStorage.getItem('perfume_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to parse cart from localStorage', e);
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem('perfume_cart', JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [items]);

  const addItem = (product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeItem = (productId) => {
    setItems((prev) => prev.filter((i) => i.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    const qty = Number(quantity);
    if (Number.isNaN(qty) || qty <= 0) return;
    setItems((prev) =>
      prev.map((i) =>
        i.id === productId ? { ...i, quantity: qty } : i
      )
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within CartProvider');
  }
  return ctx;
}
''',

    os.path.join("src", "data", "products.js"): r'''// ตัวอย่างสินค้า น้ำหอม ปรับเองทีหลังได้
export const products = [
  {
    id: 'p1',
    name: 'Citrus Breeze',
    description: 'โทนน้ำหอมสดชื่น กลิ่นส้ม เลมอน ใส่ได้ทุกวัน',
    price: 790,
    image: 'https://via.placeholder.com/400x400?text=Citrus+Breeze',
    volume: '30 ml',
    notes: 'Citrus • Fresh • Daily'
  },
  {
    id: 'p2',
    name: 'Night Oud',
    description: 'โทนน้ำหอมเข้มข้น สไตล์หรูหรา สายปาร์ตี้กลางคืน',
    price: 1290,
    image: 'https://via.placeholder.com/400x400?text=Night+Oud',
    volume: '50 ml',
    notes: 'Oud • Woody • Night'
  },
  {
    id: 'p3',
    name: 'Soft Vanilla',
    description: 'วานิลลานุ่ม ๆ หวานกำลังดี สายมุ้งมิ้งต้องมี',
    price: 990,
    image: 'https://via.placeholder.com/400x400?text=Soft+Vanilla',
    volume: '50 ml',
    notes: 'Vanilla • Sweet • Cozy'
  }
];
''',

    os.path.join("src", "App.jsx"): r'''import React, { useState } from 'react';
import { products } from './data/products.js';
import { useCart } from './context/CartContext.jsx';

function formatPriceTHB(amount) {
  return amount.toLocaleString('th-TH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

export default function App() {
  const { totalItems } = useCart();
  const [showCart, setShowCart] = useState(true);

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header-left">
          <h1>Perfume Shop</h1>
          <p>น้ำหอมคัดพิเศษ กลิ่นเป็นเอกลักษณ์ของแบรนด์คุณ</p>
        </div>
        <button
          className="cart-toggle-btn"
          onClick={() => setShowCart((v) => !v)}
        >
          ตะกร้า ({totalItems})
        </button>
      </header>

      <main className="layout">
        <section className="product-list">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </section>

        {showCart && (
          <aside className="cart-panel">
            <Cart />
          </aside>
        )}
      </main>
    </div>
  );
}

function ProductCard({ product }) {
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price
    });
  };

  return (
    <article className="product-card">
      <div className="product-image-wrapper">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-body">
        <h2 className="product-name">{product.name}</h2>
        <p className="product-notes">{product.notes}</p>
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <div>
            <div className="product-price">
              ฿{formatPriceTHB(product.price)}
            </div>
            <div className="product-volume">{product.volume}</div>
          </div>
          <button className="btn-primary" onClick={handleAdd}>
            เพิ่มลงตะกร้า
          </button>
        </div>
      </div>
    </article>
  );
}

function Cart() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    totalPrice
  } = useCart();

  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    address: '',
    note: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!customer.name || !customer.phone || !customer.address) {
      alert('กรุณากรอกชื่อ เบอร์โทร และที่อยู่ ให้ครบก่อนจ้า');
      return;
    }

    if (items.length === 0) {
      alert('ตะกร้ายังว่างอยู่เลย ยังไม่มีสินค้านะ');
      return;
    }

    const orderPayload = {
      customer,
      items,
      totalPrice,
      createdAt: new Date().toISOString()
    };

    // จุดนี้คือที่ต่อออกไป Backend / Google Apps Script / LINE Notify
    console.log('ORDER_PAYLOAD', orderPayload);

    alert(
      'รับคำสั่งซื้อเรียบร้อย (ตัวอย่าง)\n\nตอนนี้ยังไม่ยิงไป backend นะ ไปต่อเองได้ที่ handleSubmit ใน App.jsx'
    );

    clearCart();
    setCustomer({
      name: '',
      phone: '',
      address: '',
      note: ''
    });
  };

  return (
    <div className="cart">
      <h2>ตะกร้าสินค้า</h2>
      {items.length === 0 ? (
        <p className="cart-empty">ยังไม่มีสินค้าในตะกร้า</p>
      ) : (
        <>
          <ul className="cart-items">
            {items.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="cart-item-main">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-price">
                    ฿{formatPriceTHB(item.price * item.quantity)}
                  </div>
                </div>
                <div className="cart-item-sub">
                  <label>
                    จำนวน:{' '}
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, e.target.value)
                      }
                    />
                  </label>
                  <button
                    className="cart-item-remove"
                    onClick={() => removeItem(item.id)}
                  >
                    ลบ
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-total">
            รวมทั้งหมด: <strong>฿{formatPriceTHB(totalPrice)}</strong>
          </div>
        </>
      )}

      <hr className="cart-divider" />

      <h3>ข้อมูลผู้สั่งซื้อ</h3>
      <form className="checkout-form" onSubmit={handleSubmit}>
        <label>
          ชื่อ-นามสกุล
          <input
            type="text"
            name="name"
            value={customer.name}
            onChange={handleChange}
            placeholder="เช่น สมชาย น้ำหอมดี"
          />
        </label>
        <label>
          เบอร์โทร
          <input
            type="tel"
            name="phone"
            value={customer.phone}
            onChange={handleChange}
            placeholder="เช่น 081-234-5678"
          />
        </label>
        <label>
          ที่อยู่จัดส่ง
          <textarea
            name="address"
            value={customer.address}
            onChange={handleChange}
            placeholder="บ้านเลขที่ / แขวง / เขต / จังหวัด / รหัสไปรษณีย์"
          />
        </label>
        <label>
          หมายเหตุ (ถ้ามี)
          <textarea
            name="note"
            value={customer.note}
            onChange={handleChange}
            placeholder="เช่น ขอเป็นกลิ่นอ่อน ๆ / แพ้แอลกอฮอล์แรง"
          />
        </label>

        <button
          type="submit"
          className="btn-primary btn-full"
          disabled={items.length === 0}
        >
          ยืนยันคำสั่งซื้อ (ยังไม่ตัดบัตร แค่ส่งข้อมูล)
        </button>
      </form>

      <p className="checkout-note">
        ⚠ ตอนนี้ยังไม่มี Payment Gateway นะ ไปต่อเองได้ที่ฟังก์ชัน
        <code> handleSubmit </code> ในไฟล์ <code> App.jsx </code>
      </p>
    </div>
  );
}
''',

    os.path.join("src", "styles.css"): r'''*,
*::before,
*::after {
  box-sizing: border-box;
}

:root {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
    sans-serif;
  color: #111827;
  background-color: #f3f4f6;
}

body {
  margin: 0;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  padding: 1rem 1.5rem;
  background: white;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
}

.app-header-left h1 {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 700;
}

.app-header-left p {
  margin: 0.2rem 0 0;
  font-size: 0.9rem;
  color: #6b7280;
}

.cart-toggle-btn {
  border: 1px solid #e5e7eb;
  background: #111827;
  color: white;
  border-radius: 999px;
  padding: 0.4rem 1rem;
  cursor: pointer;
  font-size: 0.9rem;
}

.cart-toggle-btn:hover {
  opacity: 0.9;
}

.layout {
  flex: 1;
  display: grid;
  grid-template-columns: minmax(0, 3fr) minmax(280px, 1.4fr);
  gap: 1rem;
  padding: 1rem 1.5rem 1.5rem;
}

@media (max-width: 960px) {
  .layout {
    grid-template-columns: minmax(0, 1fr);
  }
}

.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

/* Product Card */

.product-card {
  background: white;
  border-radius: 0.75rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: 1px solid #e5e7eb;
}

.product-image-wrapper {
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  background: #f9fafb;
}

.product-image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-body {
  padding: 0.8rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.product-name {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
}

.product-notes {
  margin: 0;
  font-size: 0.8rem;
  color: #6b7280;
}

.product-description {
  margin: 0.3rem 0 0;
  font-size: 0.85rem;
  color: #4b5563;
}

.product-footer {
  margin-top: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.product-price {
  font-weight: 700;
  font-size: 1rem;
}

.product-volume {
  font-size: 0.8rem;
  color: #6b7280;
}

/* Cart */

.cart-panel {
  background: white;
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;
  padding: 1rem;
  max-height: calc(100vh - 96px);
  overflow: auto;
  position: sticky;
  top: 88px;
}

.cart h2 {
  margin-top: 0;
  font-size: 1.1rem;
}

.cart-empty {
  font-size: 0.9rem;
  color: #6b7280;
}

.cart-items {
  list-style: none;
  padding: 0;
  margin: 0 0 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.cart-item {
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 0.4rem;
}

.cart-item:last-child {
  border-bottom: none;
}

.cart-item-main {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.cart-item-name {
  font-size: 0.9rem;
  font-weight: 500;
}

.cart-item-price {
  font-size: 0.9rem;
  font-weight: 600;
}

.cart-item-sub {
  margin-top: 0.3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
}

.cart-item-sub label {
  font-size: 0.8rem;
}

.cart-item-sub input[type='number'] {
  width: 60px;
}

.cart-item-remove {
  background: transparent;
  border: none;
  color: #ef4444;
  font-size: 0.8rem;
  cursor: pointer;
}

.cart-total {
  text-align: right;
  margin: 0.3rem 0 0.8rem;
}

/* Checkout form */

.checkout-form {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.checkout-form label {
  display: flex;
  flex-direction: column;
  font-size: 0.85rem;
  gap: 0.2rem;
}

.checkout-form input,
.checkout-form textarea {
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
  padding: 0.4rem 0.5rem;
  font-size: 0.85rem;
  font-family: inherit;
}

.checkout-form textarea {
  min-height: 70px;
  resize: vertical;
}

.checkout-note {
  margin-top: 0.6rem;
  font-size: 0.75rem;
  color: #6b7280;
}

.checkout-note code {
  font-family: SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
    'Courier New', monospace;
  background: #f3f4f6;
  padding: 0 0.2rem;
  border-radius: 0.25rem;
}

.cart-divider {
  margin: 0.8rem 0;
  border: none;
  border-top: 1px dashed #e5e7eb;
}

/* Buttons */

.btn-primary {
  border: none;
  border-radius: 999px;
  background: #111827;
  color: white;
  font-size: 0.9rem;
  padding: 0.4rem 0.9rem;
  cursor: pointer;
}

.btn-primary:hover {
  opacity: 0.9;
}

.btn-primary:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.btn-full {
  width: 100%;
}
'''
}


def main():
  print(f"Creating project in: {BASE_DIR}")
  os.makedirs(BASE_DIR, exist_ok=True)

  for rel_path, content in FILES.items():
    full_path = os.path.join(BASE_DIR, rel_path)
    dir_name = os.path.dirname(full_path)
    if dir_name and not os.path.exists(dir_name):
      os.makedirs(dir_name, exist_ok=True)

    with open(full_path, "w", encoding="utf-8") as f:
      f.write(content)

    print(f"  wrote {full_path}")

  print("\nDone.")
  print(f"\nต่อไปให้เข้าโฟลเดอร์ {BASE_DIR} แล้วรัน:")
  print("  npm install")
  print("  npm run dev")


if __name__ == "__main__":
  main()
