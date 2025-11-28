import React, { useState } from 'react';
import { products } from './data/products.js';
import { useCart } from './context/CartContext.jsx';
import { createOrder } from './services/orderService';
import { uploadPaymentSlip, validateFileSize, validateFileType } from './services/storageService';

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

  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [paymentSlip, setPaymentSlip] = useState(null);
  const [paymentSlipPreview, setPaymentSlipPreview] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
    setErrorMessage('');
  };

  const handleSlipChange = (e) => {
    const file = e.target.files?.[0];
    
    if (!file) {
      setPaymentSlip(null);
      setPaymentSlipPreview('');
      return;
    }

    // ตรวจสอบประเภทไฟล์
    if (!validateFileType(file)) {
      setErrorMessage('กรุณาอัพโหลดไฟล์รูปภาพเท่านั้น (JPG, PNG, WebP)');
      return;
    }

    // ตรวจสอบขนาดไฟล์
    if (!validateFileSize(file, 5)) {
      setErrorMessage('ไฟล์รูปภาพต้องไม่เกิน 5MB');
      return;
    }

    setPaymentSlip(file);
    setErrorMessage('');

    // สร้าง preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPaymentSlipPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      // ตรวจสอบข้อมูลพื้นฐาน
      if (!customer.name || !customer.phone || !customer.address) {
        setErrorMessage('กรุณากรอกชื่อ เบอร์โทร และที่อยู่ ให้ครบ');
        setLoading(false);
        return;
      }

      if (items.length === 0) {
        setErrorMessage('ตะกร้ายังว่างอยู่ ไม่มีสินค้านะ');
        setLoading(false);
        return;
      }

      if (!paymentSlip) {
        setErrorMessage('กรุณาแนบสลิปโอนเงินด้วย');
        setLoading(false);
        return;
      }

      // สร้างลำดับหลักสำหรับอัพโหลด (จะได้ orderId สำหรับตั้งชื่อไฟล์)
      // อัพโหลดสลิป (ต้องสร้าง temp order id ก่อน)
      const tempOrderId = Date.now().toString();
      let paymentSlipUrl = paymentSlipPreview; // ใช้ preview URL สำหรับ local test

      try {
        paymentSlipUrl = await uploadPaymentSlip(paymentSlip, tempOrderId);
        console.log('✅ Slip uploaded to Firebase Storage:', paymentSlipUrl);
      } catch (uploadError) {
        console.warn('⚠️ Upload failed, using preview URL instead:', uploadError.message);
        // ถ้า upload ล้มเหลว ใช้ preview URL ชั่วคราว
        paymentSlipUrl = paymentSlipPreview;
      }

      // สร้าง order object
      const orderData = {
        customer: {
          name: customer.name,
          phone: customer.phone,
          address: customer.address,
          note: customer.note || ''
        },
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        totalPrice: totalPrice,
        paymentSlipUrl: paymentSlipUrl,
        paymentApproved: false,
        status: 'pending'
      };

      // ส่ง order ไป Firebase
      const orderId = await createOrder(orderData);

      console.log('✅ Order created successfully:', orderId);
      
      // ส่วนนี้คืออื่นๆ ที่ต้องทำ
      setOrderSuccess(true);
      
      // Clear cart และ form
      clearCart();
      setCustomer({
        name: '',
        phone: '',
        address: '',
        note: ''
      });
      setPaymentSlip(null);
      setPaymentSlipPreview('');

      // แสดงข้อความสำเร็จ
      setTimeout(() => {
        alert(`✅ คำสั่งซื้อหมายเลข ${orderId.slice(0, 8)} ส่งไปเรียบร้อย\n\nรอการตรวจสอบจากทีมแอดมิน`);
        setOrderSuccess(false);
      }, 500);

    } catch (error) {
      console.error('❌ Error creating order:', error);
      setErrorMessage(`เกิดข้อผิดพลาด: ${error.message}`);
    } finally {
      setLoading(false);
    }
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
                      disabled={loading}
                    />
                  </label>
                  <button
                    className="cart-item-remove"
                    onClick={() => removeItem(item.id)}
                    disabled={loading}
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

      {errorMessage && (
        <div className="cart-error">
          ⚠️ {errorMessage}
        </div>
      )}

      {orderSuccess && (
        <div className="cart-success">
          ✅ คำสั่งซื้อส่งเรียบร้อย! กรุณารอการยืนยันจากแอดมิน
        </div>
      )}

      <form className="checkout-form" onSubmit={handleSubmit}>
        <label>
          ชื่อ-นามสกุล
          <input
            type="text"
            name="name"
            value={customer.name}
            onChange={handleChange}
            placeholder="เช่น สมชาย น้ำหอมดี"
            disabled={loading}
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
            disabled={loading}
          />
        </label>
        <label>
          ที่อยู่จัดส่ง
          <textarea
            name="address"
            value={customer.address}
            onChange={handleChange}
            placeholder="บ้านเลขที่ / แขวง / เขต / จังหวัด / รหัสไปรษณีย์"
            disabled={loading}
          />
        </label>
        <label>
          หมายเหตุ (ถ้ามี)
          <textarea
            name="note"
            value={customer.note}
            onChange={handleChange}
            placeholder="เช่น ขอเป็นกลิ่นอ่อน ๆ / แพ้แอลกอฮอล์แรง"
            disabled={loading}
          />
        </label>

        <hr className="cart-divider" />
        <h3>📸 แนบสลิปโอนเงิน</h3>

        <div className="payment-slip-upload">
          <label className="slip-input-label">
            <input
              type="file"
              accept="image/*"
              onChange={handleSlipChange}
              disabled={loading}
              className="slip-input"
            />
            <span className="slip-input-text">
              {paymentSlip ? '✅ เลือกไฟล์แล้ว' : '📁 เลือกไฟล์รูปสลิป'}
            </span>
          </label>

          {paymentSlipPreview && (
            <div className="slip-preview">
              <img src={paymentSlipPreview} alt="Payment slip preview" />
              <button
                type="button"
                className="slip-remove-btn"
                onClick={() => {
                  setPaymentSlip(null);
                  setPaymentSlipPreview('');
                }}
                disabled={loading}
              >
                ✕ ลบ
              </button>
            </div>
          )}

          <p className="slip-hint">
            💡 อัพโหลดสลิปโอนเงิน (JPG, PNG หรือ WebP ไม่เกิน 5MB)
          </p>
        </div>

        <button
          type="submit"
          className="btn-primary btn-full"
          disabled={items.length === 0 || loading || !paymentSlip}
        >
          {loading ? 'กำลังส่งคำสั่ง...' : 'ยืนยันคำสั่งซื้อ'}
        </button>
      </form>

      <p className="checkout-note">
        📌 คำสั่งซื้อจะเก็บไว้ในระบบ เรียกรอการตรวจสอบจากทีมแอดมิน
      </p>
    </div>
  );
}
