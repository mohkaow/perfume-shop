// Product Form - ฟอร์มเพิ่ม/แก้ไขสินค้า
import React, { useState } from 'react';
import { addProduct, updateProduct } from '../../services/productService';
import { uploadProductImage, validateFileSize, validateFileType } from '../../services/storageService';

export default function ProductForm({ product, onClose }) {
    const isEditing = !!product;

    const [formData, setFormData] = useState({
        name: product?.name || '',
        description: product?.description || '',
        price: product?.price || '',
        volume: product?.volume || '',
        notes: product?.notes || '',
        image: product?.image || ''
    });

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(product?.image || '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // จัดการการเปลี่ยนแปลงในฟอร์ม
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // จัดการการเลือกรูปภาพ
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // ตรวจสอบประเภทไฟล์
        if (!validateFileType(file)) {
            setError('กรุณาเลือกไฟล์รูปภาพ (JPG, PNG, WEBP)');
            return;
        }

        // ตรวจสอบขนาดไฟล์
        if (!validateFileSize(file, 5)) {
            setError('ขนาดไฟล์ต้องไม่เกิน 5 MB');
            return;
        }

        setError('');
        setImageFile(file);

        // แสดง preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    // บันทึกสินค้า
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            let imageUrl = formData.image;

            // ถ้ามีรูปใหม่ ให้อัปโหลดก่อน
            if (imageFile) {
                imageUrl = await uploadProductImage(imageFile);
            }

            // ตรวจสอบว่ามีรูปหรือไม่
            if (!imageUrl) {
                setError('กรุณาเลือกรูปสินค้า');
                setLoading(false);
                return;
            }

            const productData = {
                name: formData.name,
                description: formData.description,
                price: parseFloat(formData.price),
                volume: formData.volume,
                notes: formData.notes,
                image: imageUrl
            };

            if (isEditing) {
                await updateProduct(product.id, productData);
                alert('แก้ไขสินค้าเรียบร้อย');
            } else {
                await addProduct(productData);
                alert('เพิ่มสินค้าเรียบร้อย');
            }

            onClose(true); // ปิดฟอร์มและโหลดข้อมูลใหม่
        } catch (err) {
            console.error('Error saving product:', err);
            setError('เกิดข้อผิดพลาด: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={() => onClose(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{isEditing ? '✏️ แก้ไขสินค้า' : '➕ เพิ่มสินค้าใหม่'}</h2>
                    <button className="modal-close" onClick={() => onClose(false)}>
                        ✕
                    </button>
                </div>

                {error && (
                    <div className="form-error">
                        ⚠️ {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="product-form">
                    <div className="form-group">
                        <label htmlFor="name">ชื่อสินค้า *</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="เช่น Chanel No. 5"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">คำอธิบาย *</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="อธิบายกลิ่น ความรู้สึก และโอกาสที่เหมาะสม"
                            rows="4"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="price">ราคา (บาท) *</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="2990"
                                min="0"
                                step="0.01"
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="volume">ขนาด *</label>
                            <input
                                type="text"
                                id="volume"
                                name="volume"
                                value={formData.volume}
                                onChange={handleChange}
                                placeholder="100 ml"
                                required
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="notes">กลิ่นหลัก (Notes) *</label>
                        <input
                            type="text"
                            id="notes"
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            placeholder="Rose • Jasmine • Vanilla"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="image">รูปสินค้า {!isEditing && '*'}</label>
                        <input
                            type="file"
                            id="image"
                            accept="image/jpeg,image/png,image/webp,image/jpg"
                            onChange={handleImageChange}
                            disabled={loading}
                        />
                        {imagePreview && (
                            <div className="image-preview">
                                <img src={imagePreview} alt="Preview" />
                            </div>
                        )}
                    </div>

                    <div className="form-actions">
                        <button
                            type="button"
                            className="btn-secondary"
                            onClick={() => onClose(false)}
                            disabled={loading}
                        >
                            ยกเลิก
                        </button>
                        <button
                            type="submit"
                            className="btn-primary"
                            disabled={loading}
                        >
                            {loading ? 'กำลังบันทึก...' : (isEditing ? 'บันทึกการแก้ไข' : 'เพิ่มสินค้า')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
