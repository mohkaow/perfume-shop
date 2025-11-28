// Order Service - จัดการคำสั่งซื้อใน Firestore
import {
    collection,
    doc,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    query,
    orderBy,
    serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase';

const ORDERS_COLLECTION = 'orders';

// สร้างคำสั่งซื้อใหม่
export const createOrder = async (orderData) => {
    try {
        const docRef = await addDoc(collection(db, ORDERS_COLLECTION), {
            ...orderData,
            status: 'pending', // pending, confirmed, rejected, shipped, completed
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
        return docRef.id;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};

// ดึงคำสั่งซื้อทั้งหมด (สำหรับ Admin)
export const getAllOrders = async () => {
    try {
        const q = query(
            collection(db, ORDERS_COLLECTION),
            orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const orders = [];
        querySnapshot.forEach((doc) => {
            orders.push({
                id: doc.id,
                ...doc.data()
            });
        });
        return orders;
    } catch (error) {
        console.error('Error getting orders:', error);
        throw error;
    }
};

// ดึงคำสั่งซื้อตัวเดียว
export const getOrder = async (orderId) => {
    try {
        const docRef = doc(db, ORDERS_COLLECTION, orderId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return {
                id: docSnap.id,
                ...docSnap.data()
            };
        } else {
            throw new Error('Order not found');
        }
    } catch (error) {
        console.error('Error getting order:', error);
        throw error;
    }
};

// อัปเดตสถานะคำสั่งซื้อ
export const updateOrderStatus = async (orderId, status) => {
    try {
        const docRef = doc(db, ORDERS_COLLECTION, orderId);
        await updateDoc(docRef, {
            status,
            updatedAt: serverTimestamp()
        });
        return true;
    } catch (error) {
        console.error('Error updating order status:', error);
        throw error;
    }
};

// อนุมัติสลิปโอนเงิน
export const approvePaymentSlip = async (orderId) => {
    try {
        const docRef = doc(db, ORDERS_COLLECTION, orderId);
        await updateDoc(docRef, {
            status: 'confirmed',
            paymentApproved: true,
            approvedAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
        return true;
    } catch (error) {
        console.error('Error approving payment slip:', error);
        throw error;
    }
};

// ปฏิเสธสลิปโอนเงิน
export const rejectPaymentSlip = async (orderId, reason = '') => {
    try {
        const docRef = doc(db, ORDERS_COLLECTION, orderId);
        await updateDoc(docRef, {
            status: 'rejected',
            paymentApproved: false,
            rejectionReason: reason,
            rejectedAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
        return true;
    } catch (error) {
        console.error('Error rejecting payment slip:', error);
        throw error;
    }
};
