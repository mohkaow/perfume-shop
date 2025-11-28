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
        console.log('📤 Starting payment slip upload...', {
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type,
            orderId: orderId
        });

        // สร้างชื่อไฟล์ที่ไม่ซ้ำกัน
        const timestamp = Date.now();
        const fileName = `payment-slips/${orderId}_${timestamp}_${file.name}`;
        
        // ตรวจสอบว่า storage initialize หรือไม่
        if (!storage) {
            console.error('❌ Firebase Storage is not initialized!');
            console.error('⚠️ Check your .env.local for:');
            console.error('   VITE_FIREBASE_STORAGE_BUCKET=...');
            throw new Error('Firebase Storage not initialized. Please check .env.local');
        }

        console.log('📁 Upload path:', fileName);

        const storageRef = ref(storage, fileName);

        // อัปโหลดไฟล์
        console.log('⏳ Uploading file to Firebase Storage...');
        const snapshot = await uploadBytes(storageRef, file);
        console.log('✅ File uploaded to Firebase');

        // ดึง URL สำหรับดาวน์โหลด
        console.log('🔗 Getting download URL...');
        const downloadURL = await getDownloadURL(snapshot.ref);

        console.log('✅ Payment slip uploaded successfully!');
        console.log('   URL:', downloadURL);
        return downloadURL;
    } catch (error) {
        console.error('❌ Error uploading payment slip:', {
            message: error.message,
            code: error.code,
            orderId: orderId
        });
        
        if (error.message.includes('permission-denied') || error.code === 'storage/unauthorized') {
            console.error('🔒 Storage permission denied!');
            console.error('   Check Firebase Console → Storage → Rules');
            console.error('   Rules should allow: allow write: if true;');
        }
        
        if (error.message.includes('not initialized')) {
            console.error('⚠️ Firebase Storage not initialized');
            console.error('   Check .env.local has VITE_FIREBASE_STORAGE_BUCKET');
        }
        
        // ไม่ใช้ fallback - ให้ error ขึ้นจริงๆ เพื่อให้ user รู้ว่ามีปัญหา
        throw new Error(`Payment slip upload failed: ${error.message}`);
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
