// Product Service - จัดการข้อมูลสินค้าใน Firestore
import {
    collection,
    doc,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase';

const PRODUCTS_COLLECTION = 'products';

// ดึงสินค้าทั้งหมด
export const getAllProducts = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
        const products = [];
        querySnapshot.forEach((doc) => {
            products.push({
                id: doc.id,
                ...doc.data()
            });
        });
        return products;
    } catch (error) {
        console.error('Error getting products:', error);
        throw error;
    }
};

// ดึงสินค้าตัวเดียว
export const getProduct = async (productId) => {
    try {
        const docRef = doc(db, PRODUCTS_COLLECTION, productId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return {
                id: docSnap.id,
                ...docSnap.data()
            };
        } else {
            throw new Error('Product not found');
        }
    } catch (error) {
        console.error('Error getting product:', error);
        throw error;
    }
};

// เพิ่มสินค้าใหม่
export const addProduct = async (productData) => {
    try {
        const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), {
            ...productData,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
        return docRef.id;
    } catch (error) {
        console.error('Error adding product:', error);
        throw error;
    }
};

// แก้ไขสินค้า
export const updateProduct = async (productId, productData) => {
    try {
        const docRef = doc(db, PRODUCTS_COLLECTION, productId);
        await updateDoc(docRef, {
            ...productData,
            updatedAt: serverTimestamp()
        });
        return true;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};

// ลบสินค้า
export const deleteProduct = async (productId) => {
    try {
        const docRef = doc(db, PRODUCTS_COLLECTION, productId);
        await deleteDoc(docRef);
        return true;
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
};

// อัปเดตสต๊อกสินค้า
export const updateProductStock = async (productId, newStock) => {
    try {
        const docRef = doc(db, PRODUCTS_COLLECTION, productId);
        await updateDoc(docRef, {
            stock: newStock,
            updatedAt: serverTimestamp()
        });
        return true;
    } catch (error) {
        console.error('Error updating product stock:', error);
        throw error;
    }
};

// ลดสต๊อกสินค้า (เมื่อมีการสั่งซื้อ)
export const decreaseProductStock = async (productId, quantity = 1) => {
    try {
        const docRef = doc(db, PRODUCTS_COLLECTION, productId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            throw new Error('Product not found');
        }

        const currentStock = docSnap.data().stock || 0;
        const newStock = Math.max(0, currentStock - quantity);

        await updateDoc(docRef, {
            stock: newStock,
            updatedAt: serverTimestamp()
        });

        return newStock;
    } catch (error) {
        console.error('Error decreasing product stock:', error);
        throw error;
    }
};
