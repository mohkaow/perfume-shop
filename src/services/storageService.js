// Storage Service - จัดการอัปโหลดไฟล์ไปยัง Firebase Storage
import {
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject
} from 'firebase/storage';
import { storage } from '../firebase';

// อัปโหลดรูปสินค้า
export const uploadProductImage = async (file) => {
    try {
        // สร้างชื่อไฟล์ที่ไม่ซ้ำกัน
        const timestamp = Date.now();
        const fileName = `products/${timestamp}_${file.name}`;
        const storageRef = ref(storage, fileName);

        // อัปโหลดไฟล์
        const snapshot = await uploadBytes(storageRef, file);

        // ดึง URL สำหรับดาวน์โหลด
        const downloadURL = await getDownloadURL(snapshot.ref);

        return downloadURL;
    } catch (error) {
        console.error('Error uploading product image:', error);
        throw error;
    }
};

// อัปโหลดสลิปโอนเงิน
export const uploadPaymentSlip = async (file, orderId) => {
    try {
        const timestamp = Date.now();
        const fileName = `payment-slips/${orderId}_${timestamp}_${file.name}`;
        const storageRef = ref(storage, fileName);

        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);

        return downloadURL;
    } catch (error) {
        console.error('Error uploading payment slip:', error);
        throw error;
    }
};

// ลบรูปภาพ (ใช้ URL)
export const deleteImage = async (imageUrl) => {
    try {
        // แปลง URL เป็น reference
        const imageRef = ref(storage, imageUrl);
        await deleteObject(imageRef);
        return true;
    } catch (error) {
        console.error('Error deleting image:', error);
        // ไม่ throw error เพราะบางทีรูปอาจถูกลบไปแล้ว
        return false;
    }
};

// ตรวจสอบขนาดไฟล์ (ไม่เกิน 5MB)
export const validateFileSize = (file, maxSizeMB = 5) => {
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    return file.size <= maxSizeBytes;
};

// ตรวจสอบประเภทไฟล์
export const validateFileType = (file, allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg']) => {
    return allowedTypes.includes(file.type);
};
