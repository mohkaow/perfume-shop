// Wishlist Service - จัดการข้อมูลสินค้าที่ผู้ใช้สนใจซื้อเมื่อมีสต๊อก
import {
    collection,
    doc,
    getDocs,
    getDoc,
    addDoc,
    deleteDoc,
    query,
    where,
    serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase';

const WISHLIST_COLLECTION = 'wishlists';

// เพิ่มสินค้าลงใน wishlist
export const addToWishlist = async (productId, productName, productImage, customerEmail) => {
    try {
        const docRef = await addDoc(collection(db, WISHLIST_COLLECTION), {
            productId,
            productName,
            productImage,
            customerEmail,
            createdAt: serverTimestamp(),
            notified: false
        });
        console.log('✅ Added to wishlist:', docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('Error adding to wishlist:', error);
        throw error;
    }
};

// ดึง wishlist ของผู้ใช้
export const getWishlist = async (customerEmail) => {
    try {
        const q = query(
            collection(db, WISHLIST_COLLECTION),
            where('customerEmail', '==', customerEmail)
        );
        const querySnapshot = await getDocs(q);
        const wishlist = [];
        querySnapshot.forEach((doc) => {
            wishlist.push({
                id: doc.id,
                ...doc.data()
            });
        });
        return wishlist;
    } catch (error) {
        console.error('Error getting wishlist:', error);
        throw error;
    }
};

// ลบสินค้าออกจาก wishlist
export const removeFromWishlist = async (wishlistId) => {
    try {
        const docRef = doc(db, WISHLIST_COLLECTION, wishlistId);
        await deleteDoc(docRef);
        console.log('✅ Removed from wishlist:', wishlistId);
        return true;
    } catch (error) {
        console.error('Error removing from wishlist:', error);
        throw error;
    }
};

// ตรวจสอบว่าสินค้าอยู่ใน wishlist ของผู้ใช้
export const checkWishlist = async (productId, customerEmail) => {
    try {
        const q = query(
            collection(db, WISHLIST_COLLECTION),
            where('productId', '==', productId),
            where('customerEmail', '==', customerEmail)
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.size > 0 ? querySnapshot.docs[0].id : null;
    } catch (error) {
        console.error('Error checking wishlist:', error);
        return null;
    }
};

// ดึง wishlist ทั้งหมดสำหรับสินค้าที่กำหนด (สำหรับ admin เพื่อแจ้งเตือน)
export const getWishlistByProduct = async (productId) => {
    try {
        const q = query(
            collection(db, WISHLIST_COLLECTION),
            where('productId', '==', productId),
            where('notified', '==', false)
        );
        const querySnapshot = await getDocs(q);
        const wishlist = [];
        querySnapshot.forEach((doc) => {
            wishlist.push({
                id: doc.id,
                ...doc.data()
            });
        });
        return wishlist;
    } catch (error) {
        console.error('Error getting product wishlist:', error);
        throw error;
    }
};
