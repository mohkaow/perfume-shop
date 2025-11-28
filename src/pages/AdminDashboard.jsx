// Admin Dashboard - หน้าหลักของ Admin
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getAllOrders } from '../services/orderService';
import { getAllProducts } from '../services/productService';
import ProductManagement from '../components/admin/ProductManagement';
import OrderManagement from '../components/admin/OrderManagement';
import '../admin-styles.css';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, products, orders
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalOrders: 0,
        totalRevenue: 0,
        pendingOrders: 0
    });
    const { logout, currentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // โหลด stats จาก Firebase
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            // ดึงข้อมูล products และ orders จาก Firebase
            const products = await getAllProducts();
            const orders = await getAllOrders();

            // คำนวณสถิติ
            const totalProducts = products.length;
            const totalOrders = orders.length;
            const pendingOrders = orders.filter(order => order.status === 'pending').length;
            
            // คำนวณรายได้ทั้งหมด (จากคำสั่งซื้อที่ยืนยันแล้ว)
            const totalRevenue = orders
                .filter(order => order.status !== 'pending' && order.status !== 'rejected')
                .reduce((sum, order) => sum + (order.totalPrice || 0), 0);

            setStats({
                totalProducts,
                totalOrders,
                totalRevenue,
                pendingOrders
            });
        } catch (error) {
            console.error('Error loading stats:', error);
            // ถ้าดึงข้อมูลไม่ได้ก็ใช้ค่า default
            setStats({
                totalProducts: 0,
                totalOrders: 0,
                totalRevenue: 0,
                pendingOrders: 0
            });
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/admin/login');
        } catch (error) {
            console.error('Logout failed:', error);
            alert('ไม่สามารถ logout ได้ กรุณาลองใหม่');
        }
    };

    return (
        <div className="admin-container">
            {/* Header */}
            <header className="admin-header">
                <div className="admin-header-content">
                    <div className="admin-header-left">
                        <h1>�️ Perfume Shop Admin</h1>
                        <p className="admin-subtitle">ระบบจัดการร้านน้ำหอมออนไลน์</p>
                    </div>
                    <div className="admin-header-right">
                        <div className="admin-user-info">
                            <span className="user-email">{currentUser?.email}</span>
                            <span className="user-badge">👤 Admin</span>
                        </div>
                        <button className="btn-logout" onClick={handleLogout}>
                            ออกจากระบบ
                        </button>
                    </div>
                </div>
            </header>

            {/* Navigation */}
            <nav className="admin-nav">
                <button
                    className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
                    onClick={() => setActiveTab('dashboard')}
                >
                    <span className="nav-icon">📊</span>
                    <span className="nav-label">แดชบอร์ด</span>
                </button>
                <button
                    className={`nav-btn ${activeTab === 'products' ? 'active' : ''}`}
                    onClick={() => setActiveTab('products')}
                >
                    <span className="nav-icon">📦</span>
                    <span className="nav-label">จัดการสินค้า</span>
                </button>
                <button
                    className={`nav-btn ${activeTab === 'orders' ? 'active' : ''}`}
                    onClick={() => setActiveTab('orders')}
                >
                    <span className="nav-icon">🛒</span>
                    <span className="nav-label">จัดการคำสั่งซื้อ</span>
                </button>
            </nav>

            {/* Main Content */}
            <div className="admin-panel">
                {activeTab === 'dashboard' && (
                    <div className="dashboard-section">
                        <h2 className="section-title">📊 สรุปภาพรวม</h2>
                        
                        <div className="stats-grid">
                            <div className="stat-card">
                                <div className="stat-icon">📦</div>
                                <div className="stat-content">
                                    <h3>สินค้าทั้งหมด</h3>
                                    <p className="stat-value">{stats.totalProducts}</p>
                                    <p className="stat-label">รายการ</p>
                                </div>
                            </div>

                            <div className="stat-card">
                                <div className="stat-icon">🛒</div>
                                <div className="stat-content">
                                    <h3>คำสั่งซื้อ</h3>
                                    <p className="stat-value">{stats.totalOrders}</p>
                                    <p className="stat-label">รายการ</p>
                                </div>
                            </div>

                            <div className="stat-card">
                                <div className="stat-icon">⏳</div>
                                <div className="stat-content">
                                    <h3>รอตรวจสอบ</h3>
                                    <p className="stat-value">{stats.pendingOrders}</p>
                                    <p className="stat-label">รายการ</p>
                                </div>
                            </div>

                            <div className="stat-card highlight">
                                <div className="stat-icon">💰</div>
                                <div className="stat-content">
                                    <h3>รายได้รวม</h3>
                                    <p className="stat-value">฿{stats.totalRevenue.toLocaleString('th-TH')}</p>
                                    <p className="stat-label">บาท</p>
                                </div>
                            </div>
                        </div>

                        <div className="dashboard-info">
                            <div className="info-box">
                                <h3>🎯 ขั้นตอนการใช้งาน</h3>
                                <ol className="info-list">
                                    <li><strong>จัดการสินค้า:</strong> เพิ่ม แก้ไข และลบสินค้าน้ำหอม</li>
                                    <li><strong>จัดการคำสั่งซื้อ:</strong> ตรวจสอบและอนุมัติการโอนเงิน</li>
                                    <li><strong>อัพเดตสถานะ:</strong> บันทึกการจัดส่งและเสร็จสิ้นคำสั่ง</li>
                                </ol>
                            </div>

                            <div className="info-box">
                                <h3>💡 เคล็ดลับ</h3>
                                <ul className="info-list">
                                    <li>✓ ใช้รูปภาพที่มี ratio 1:1 สำหรับสินค้า</li>
                                    <li>✓ ตรวจสอบสลิปโอนเงินก่อนอนุมัติ</li>
                                    <li>✓ ปรับราคาตามการส่งเสริมการขาย</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'products' && <ProductManagement />}
                {activeTab === 'orders' && <OrderManagement />}
            </div>
        </div>
    );
}
