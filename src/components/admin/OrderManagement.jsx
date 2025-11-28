// Order Management - หน้าจัดการคำสั่งซื้อสำหรับ Admin
import React, { useState, useEffect } from 'react';
import { getAllOrders, updateOrderStatus, approvePaymentSlip, rejectPaymentSlip } from '../../services/orderService';

export default function OrderManagement() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, pending, confirmed, rejected, shipped, completed
    const [selectedSlip, setSelectedSlip] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null); // สำหรับ modal รายละเอียด
    const [viewType, setViewType] = useState('table'); // table หรือ card

    // โหลดคำสั่งซื้อทั้งหมด
    const loadOrders = async () => {
        try {
            setLoading(true);
            const data = await getAllOrders();
            setOrders(data);
        } catch (error) {
            console.error('Error loading orders:', error);
            alert('ไม่สามารถโหลดคำสั่งซื้อได้ กรุณาลองใหม่');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOrders();
    }, []);

    // กรองคำสั่งซื้อตามสถานะ
    const filteredOrders = filter === 'all'
        ? orders
        : orders.filter(order => order.status === filter);

    // อนุมัติสลิป
    const handleApprove = async (orderId) => {
        if (!confirm('ต้องการอนุมัติสลิปนี้ใช่หรือไม่?')) return;

        try {
            await approvePaymentSlip(orderId);
            alert('อนุมัติสลิปเรียบร้อย');
            loadOrders();
        } catch (error) {
            console.error('Error approving slip:', error);
            alert('ไม่สามารถอนุมัติสลิปได้ กรุณาลองใหม่');
        }
    };

    // ปฏิเสธสลิป
    const handleReject = async (orderId) => {
        const reason = prompt('เหตุผลในการปฏิเสธ (ถ้ามี):');
        if (reason === null) return; // ยกเลิก

        try {
            await rejectPaymentSlip(orderId, reason);
            alert('ปฏิเสธสลิปเรียบร้อย');
            loadOrders();
        } catch (error) {
            console.error('Error rejecting slip:', error);
            alert('ไม่สามารถปฏิเสธสลิปได้ กรุณาลองใหม่');
        }
    };

    // เปลี่ยนสถานะคำสั่งซื้อ
    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await updateOrderStatus(orderId, newStatus);
            alert('อัปเดตสถานะเรียบร้อย');
            loadOrders();
        } catch (error) {
            console.error('Error updating status:', error);
            alert('ไม่สามารถอัปเดตสถานะได้ กรุณาลองใหม่');
        }
    };

    // แสดงสลิปแบบเต็มจอ
    const showSlipModal = (slipUrl) => {
        setSelectedSlip(slipUrl);
    };

    // แปลงสถานะเป็นภาษาไทย
    const getStatusText = (status) => {
        const statusMap = {
            pending: '⏳ รอตรวจสอบ',
            confirmed: '✅ ยืนยันแล้ว',
            rejected: '❌ ปฏิเสธ',
            shipped: '🚚 จัดส่งแล้ว',
            completed: '✔️ เสร็จสิ้น'
        };
        return statusMap[status] || status;
    };

    // แปลง timestamp เป็นวันที่
    const formatDate = (timestamp) => {
        if (!timestamp) return '-';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return date.toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return <div className="admin-loading">กำลังโหลดคำสั่งซื้อ...</div>;
    }

    return (
        <div className="order-management">
            <div className="management-header">
                <h2>จัดการคำสั่งซื้อ</h2>
                <div className="order-header-controls">
                    <div className="order-filters">
                        <button
                            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                            onClick={() => setFilter('all')}
                        >
                            ทั้งหมด ({orders.length})
                        </button>
                        <button
                            className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
                            onClick={() => setFilter('pending')}
                        >
                            ⏳ รอตรวจสอบ ({orders.filter(o => o.status === 'pending').length})
                        </button>
                        <button
                            className={`filter-btn ${filter === 'confirmed' ? 'active' : ''}`}
                            onClick={() => setFilter('confirmed')}
                        >
                            ✅ ยืนยันแล้ว ({orders.filter(o => o.status === 'confirmed').length})
                        </button>
                        <button
                            className={`filter-btn ${filter === 'rejected' ? 'active' : ''}`}
                            onClick={() => setFilter('rejected')}
                        >
                            ❌ ปฏิเสธ ({orders.filter(o => o.status === 'rejected').length})
                        </button>
                        <button
                            className={`filter-btn ${filter === 'shipped' ? 'active' : ''}`}
                            onClick={() => setFilter('shipped')}
                        >
                            🚚 จัดส่งแล้ว ({orders.filter(o => o.status === 'shipped').length})
                        </button>
                        <button
                            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
                            onClick={() => setFilter('completed')}
                        >
                            ✔️ เสร็จสิ้น ({orders.filter(o => o.status === 'completed').length})
                        </button>
                    </div>
                    <div className="view-toggle">
                        <button
                            className={`view-btn ${viewType === 'table' ? 'active' : ''}`}
                            onClick={() => setViewType('table')}
                            title="ดูแบบตาราง"
                        >
                            📊 ตาราง
                        </button>
                        <button
                            className={`view-btn ${viewType === 'card' ? 'active' : ''}`}
                            onClick={() => setViewType('card')}
                            title="ดูแบบการ์ด"
                        >
                            📇 การ์ด
                        </button>
                    </div>
                </div>
            </div>

            {filteredOrders.length === 0 ? (
                <div className="empty-state">
                    <p>ไม่มีคำสั่งซื้อ</p>
                </div>
            ) : viewType === 'table' ? (
                <div className="orders-table-container">
                    <table className="orders-table">
                        <thead>
                            <tr>
                                <th>คำสั่งซื้อ</th>
                                <th>ลูกค้า</th>
                                <th>เบอร์โทร</th>
                                <th>สินค้า</th>
                                <th>ราคา</th>
                                <th>วันที่</th>
                                <th>สถานะ</th>
                                <th>การดำเนินการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order) => (
                                <tr key={order.id} className={`order-row status-${order.status}`}>
                                    <td className="order-id">#{order.id.slice(0, 8)}</td>
                                    <td>{order.customer?.name || '-'}</td>
                                    <td>{order.customer?.phone || '-'}</td>
                                    <td className="items-cell">
                                        {order.items?.length || 0} รายการ
                                        <br />
                                        <small>
                                            {order.items?.map((i) => i.name).join(', ').substring(0, 30)}...
                                        </small>
                                    </td>
                                    <td className="price-cell">฿{order.totalPrice?.toLocaleString('th-TH') || '0'}</td>
                                    <td>{formatDate(order.createdAt)}</td>
                                    <td>
                                        <span className={`status-badge status-${order.status}`}>
                                            {getStatusText(order.status)}
                                        </span>
                                    </td>
                                    <td className="action-cell">
                                        <button
                                            className="btn-view-order"
                                            onClick={() => setSelectedOrder(order)}
                                            title="ดูรายละเอียด"
                                        >
                                            👁️
                                        </button>
                                        {order.paymentSlipUrl && (
                                            <button
                                                className="btn-view-slip-small"
                                                onClick={() => showSlipModal(order.paymentSlipUrl)}
                                                title="ดูสลิป"
                                            >
                                                🧾
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="orders-list">
                    {filteredOrders.map((order) => {
                        const itemsText = order.items?.map((i) => `${i.name} x${i.quantity}`).join(', ');
                        return (
                        <div key={order.id} className={`order-card status-${order.status}`}>
                            <div className="order-header">
                                <div>
                                    <h3>คำสั่งซื้อ #{order.id.slice(0, 8)}</h3>
                                    <p className="order-date">{formatDate(order.createdAt)}</p>
                                </div>
                                <div className="order-status">
                                    {getStatusText(order.status)}
                                </div>
                            </div>

                            <div className="order-body">
                                <div className="order-section">
                                    <h4>ข้อมูลลูกค้า</h4>
                                    <p><strong>ชื่อ:</strong> {order.customer?.name}</p>
                                    <p><strong>เบอร์:</strong> {order.customer?.phone}</p>
                                    <p><strong>ที่อยู่:</strong> {order.customer?.address}</p>
                                    {order.customer?.note && (
                                        <p><strong>หมายเหตุ:</strong> {order.customer.note}</p>
                                    )}
                                </div>

                                <div className="order-section">
                                    <h4>รายการสินค้า</h4>
                                    <ul className="order-items">
                                        {order.items?.map((item, index) => (
                                            <li key={index}>
                                                {item.name} x {item.quantity} = ฿{(item.price * item.quantity).toLocaleString('th-TH')}
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="order-total">
                                        <strong>รวมทั้งหมด: ฿{order.totalPrice?.toLocaleString('th-TH')}</strong>
                                    </p>
                                </div>

                                {order.paymentSlipUrl && (
                                    <div className="order-section">
                                        <h4>สลิปโอนเงิน</h4>
                                        <div className="slip-preview">
                                            <img
                                                src={order.paymentSlipUrl}
                                                alt="Payment Slip"
                                                onClick={() => showSlipModal(order.paymentSlipUrl)}
                                            />
                                            <button
                                                className="btn-view-slip"
                                                onClick={() => showSlipModal(order.paymentSlipUrl)}
                                            >
                                                🔍 ดูสลิปขนาดเต็ม
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="order-actions">
                                {order.status === 'pending' && order.paymentSlipUrl && (
                                    <>
                                        <button
                                            className="btn-approve"
                                            onClick={() => handleApprove(order.id)}
                                        >
                                            ✅ อนุมัติสลิป
                                        </button>
                                        <button
                                            className="btn-reject"
                                            onClick={() => handleReject(order.id)}
                                        >
                                            ❌ ปฏิเสธสลิป
                                        </button>
                                    </>
                                )}

                                {order.status === 'confirmed' && (
                                    <button
                                        className="btn-ship"
                                        onClick={() => handleStatusChange(order.id, 'shipped')}
                                    >
                                        🚚 ทำการจัดส่ง
                                    </button>
                                )}

                                {order.status === 'shipped' && (
                                    <button
                                        className="btn-complete"
                                        onClick={() => handleStatusChange(order.id, 'completed')}
                                    >
                                        ✔️ เสร็จสิ้น
                                    </button>
                                )}
                            </div>
                        </div>
                        );
                    })}
                </div>
            )}

            {/* Modal แสดงรายละเอียดคำสั่งซื้อ */}
            {selectedOrder && (
                <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
                    <div className="modal-content order-detail-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setSelectedOrder(null)}>✕</button>
                        
                        <div className="modal-header">
                            <h2>รายละเอียดคำสั่งซื้อ #{selectedOrder.id.slice(0, 8)}</h2>
                        </div>

                        <div className="order-detail-body">
                            <div className="detail-row">
                                <strong>สถานะ:</strong>
                                <span className={`status-badge status-${selectedOrder.status}`}>
                                    {getStatusText(selectedOrder.status)}
                                </span>
                            </div>
                            <div className="detail-row">
                                <strong>วันที่สั่ง:</strong>
                                {formatDate(selectedOrder.createdAt)}
                            </div>

                            <div className="detail-section">
                                <h3>ข้อมูลลูกค้า</h3>
                                <div className="detail-row">
                                    <span>ชื่อ:</span> {selectedOrder.customer?.name}
                                </div>
                                <div className="detail-row">
                                    <span>เบอร์โทร:</span> {selectedOrder.customer?.phone}
                                </div>
                                <div className="detail-row">
                                    <span>ที่อยู่:</span> {selectedOrder.customer?.address}
                                </div>
                                {selectedOrder.customer?.note && (
                                    <div className="detail-row">
                                        <span>หมายเหตุ:</span> {selectedOrder.customer.note}
                                    </div>
                                )}
                            </div>

                            <div className="detail-section">
                                <h3>รายการสินค้า</h3>
                                <div className="items-detail">
                                    {selectedOrder.items?.map((item, index) => (
                                        <div key={index} className="item-detail-row">
                                            <span>{item.name}</span>
                                            <span>x {item.quantity}</span>
                                            <span className="item-price">฿{(item.price * item.quantity).toLocaleString('th-TH')}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="detail-total">
                                    <strong>รวมทั้งหมด:</strong>
                                    <strong>฿{selectedOrder.totalPrice?.toLocaleString('th-TH')}</strong>
                                </div>
                            </div>

                            {selectedOrder.paymentSlipUrl && (
                                <div className="detail-section">
                                    <h3>สลิปโอนเงิน</h3>
                                    <div className="slip-preview-modal">
                                        <img
                                            src={selectedOrder.paymentSlipUrl}
                                            alt="Payment Slip"
                                            onClick={() => showSlipModal(selectedOrder.paymentSlipUrl)}
                                        />
                                        <button
                                            className="btn-view-slip"
                                            onClick={() => showSlipModal(selectedOrder.paymentSlipUrl)}
                                        >
                                            🔍 ดูสลิปขนาดเต็ม
                                        </button>
                                    </div>
                                </div>
                            )}

                            <div className="modal-actions">
                                {selectedOrder.status === 'pending' && selectedOrder.paymentSlipUrl && (
                                    <>
                                        <button
                                            className="btn-approve"
                                            onClick={() => {
                                                handleApprove(selectedOrder.id);
                                                setSelectedOrder(null);
                                            }}
                                        >
                                            ✅ อนุมัติสลิป
                                        </button>
                                        <button
                                            className="btn-reject"
                                            onClick={() => {
                                                handleReject(selectedOrder.id);
                                                setSelectedOrder(null);
                                            }}
                                        >
                                            ❌ ปฏิเสธสลิป
                                        </button>
                                    </>
                                )}

                                {selectedOrder.status === 'confirmed' && (
                                    <button
                                        className="btn-ship"
                                        onClick={() => {
                                            handleStatusChange(selectedOrder.id, 'shipped');
                                            setSelectedOrder(null);
                                        }}
                                    >
                                        🚚 ทำการจัดส่ง
                                    </button>
                                )}

                                {selectedOrder.status === 'shipped' && (
                                    <button
                                        className="btn-complete"
                                        onClick={() => {
                                            handleStatusChange(selectedOrder.id, 'completed');
                                            setSelectedOrder(null);
                                        }}
                                    >
                                        ✔️ เสร็จสิ้น
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal แสดงสลิปขนาดเต็ม */}
            {selectedSlip && (
                <div className="modal-overlay" onClick={() => setSelectedSlip(null)}>
                    <div className="slip-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setSelectedSlip(null)}>
                            ✕
                        </button>
                        <img src={selectedSlip} alt="Payment Slip Full Size" />
                    </div>
                </div>
            )}
        </div>
    );
}
