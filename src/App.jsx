import React, { useState } from 'react';
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
