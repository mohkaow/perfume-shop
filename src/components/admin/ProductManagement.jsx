// Product Management - หน้าจัดการสินค้าสำหรับ Admin
import React, { useState, useEffect } from 'react';
import { getAllProducts, deleteProduct } from '../../services/productService';
import ProductForm from './ProductForm';

export default function ProductManagement() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    // โหลดสินค้าทั้งหมด
    const loadProducts = async () => {
        try {
            setLoading(true);
            const data = await getAllProducts();
            setProducts(data);
        } catch (error) {
            console.error('Error loading products:', error);
            alert('ไม่สามารถโหลดสินค้าได้ กรุณาลองใหม่');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    // ฟังก์ชัน sorting
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    // เรียงข้อมูลตาม sortConfig
    const getSortedProducts = () => {
        if (!sortConfig.key) return products;

        const sorted = [...products].sort((a, b) => {
            let aValue = a[sortConfig.key];
            let bValue = b[sortConfig.key];

            // แปลงเป็นตัวเลขสำหรับราคา
            if (sortConfig.key === 'price') {
                aValue = Number(aValue) || 0;
                bValue = Number(bValue) || 0;
            }
            // แปลงเป็นตัวพิมพ์เล็กสำหรับข้อความ
            else if (typeof aValue === 'string') {
                aValue = aValue.toLowerCase();
                bValue = bValue.toLowerCase();
            }

            if (aValue < bValue) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });

        return sorted;
    };

    // แสดงลูกศรสำหรับ sorting
    const getSortIcon = (key) => {
        if (sortConfig.key !== key) {
            return ' ⇅';
        }
        return sortConfig.direction === 'asc' ? ' ▲' : ' ▼';
    };

    // เปิดฟอร์มเพิ่มสินค้า
    const handleAddProduct = () => {
        setEditingProduct(null);
        setShowForm(true);
    };

    // เปิดฟอร์มแก้ไขสินค้า
    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setShowForm(true);
    };

    // ลบสินค้า
    const handleDeleteProduct = async (productId, productName) => {
        if (!confirm(`ต้องการลบสินค้า "${productName}" ใช่หรือไม่?`)) {
            return;
        }

        try {
            await deleteProduct(productId);
            alert('ลบสินค้าเรียบร้อย');
            loadProducts(); // โหลดใหม่
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('ไม่สามารถลบสินค้าได้ กรุณาลองใหม่');
        }
    };

    // ปิดฟอร์มและโหลดข้อมูลใหม่
    const handleFormClose = (shouldReload) => {
        setShowForm(false);
        setEditingProduct(null);
        if (shouldReload) {
            loadProducts();
        }
    };

    if (loading) {
        return <div className="admin-loading">กำลังโหลดสินค้า...</div>;
    }

    const sortedProducts = getSortedProducts();

    return (
        <div className="product-management">
            <div className="management-header">
                <h2>จัดการสินค้า</h2>
                <button className="btn-primary" onClick={handleAddProduct}>
                    ➕ เพิ่มสินค้าใหม่
                </button>
            </div>

            {showForm && (
                <ProductForm
                    product={editingProduct}
                    onClose={handleFormClose}
                />
            )}

            <div className="products-table-container">
                {products.length === 0 ? (
                    <div className="empty-state">
                        <p>ยังไม่มีสินค้าในระบบ</p>
                        <button className="btn-primary" onClick={handleAddProduct}>
                            เพิ่มสินค้าแรก
                        </button>
                    </div>
                ) : (
                    <table className="products-table">
                        <thead>
                            <tr>
                                <th>รูป</th>
                                <th
                                    className="sortable-header"
                                    onClick={() => handleSort('name')}
                                >
                                    ชื่อสินค้า{getSortIcon('name')}
                                </th>
                                <th
                                    className="sortable-header"
                                    onClick={() => handleSort('price')}
                                >
                                    ราคา{getSortIcon('price')}
                                </th>
                                <th
                                    className="sortable-header"
                                    onClick={() => handleSort('volume')}
                                >
                                    ขนาด{getSortIcon('volume')}
                                </th>
                                <th
                                    className="sortable-header"
                                    onClick={() => handleSort('notes')}
                                >
                                    กลิ่น{getSortIcon('notes')}
                                </th>
                                <th>การจัดการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedProducts.map((product) => (
                                <tr key={product.id}>
                                    <td>
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="product-thumbnail"
                                        />
                                    </td>
                                    <td>
                                        <strong>{product.name}</strong>
                                    </td>
                                    <td>฿{product.price?.toLocaleString('th-TH')}</td>
                                    <td>{product.volume}</td>
                                    <td className="notes-cell">{product.notes}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <button
                                                className="btn-edit"
                                                onClick={() => handleEditProduct(product)}
                                            >
                                                ✏️ แก้ไข
                                            </button>
                                            <button
                                                className="btn-delete"
                                                onClick={() => handleDeleteProduct(product.id, product.name)}
                                            >
                                                🗑️ ลบ
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <div className="products-count">
                รวมทั้งหมด: {products.length} รายการ
            </div>
        </div>
    );
}
