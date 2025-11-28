// Delete All Products Script - ลบสินค้าทั้งหมดใน Firestore
// ใช้เมื่อต้องการเริ่มต้นใหม่

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyDxkrnwLa1Z2sOvAsgE31mpsVq3KCU0QVo",
    authDomain: "perfume-shop-82ac7.firebaseapp.com",
    projectId: "perfume-shop-82ac7",
    storageBucket: "perfume-shop-82ac7.firebasestorage.app",
    messagingSenderId: "659051379188",
    appId: "1:659051379188:web:50683af4416d9e8c02e1a1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function deleteAllProducts() {
    console.log('🗑️  เริ่มลบสินค้าทั้งหมดใน Firestore...\n');

    try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const totalProducts = querySnapshot.size;

        if (totalProducts === 0) {
            console.log('ℹ️  ไม่มีสินค้าใน Firestore');
            return;
        }

        console.log(`📦 พบสินค้าทั้งหมด ${totalProducts} รายการ\n`);

        let deletedCount = 0;

        for (const docSnapshot of querySnapshot.docs) {
            const productData = docSnapshot.data();
            await deleteDoc(doc(db, 'products', docSnapshot.id));
            console.log(`✅ ลบ "${productData.name}" สำเร็จ (ID: ${docSnapshot.id})`);
            deletedCount++;
        }

        console.log(`\n📊 สรุปผลการลบข้อมูล:`);
        console.log(`✅ ลบสำเร็จ: ${deletedCount} รายการ`);
        console.log(`📦 รวมทั้งหมด: ${totalProducts} รายการ`);
        console.log('\n🎉 ลบข้อมูลสำเร็จทั้งหมด!');

    } catch (error) {
        console.error('\n💥 เกิดข้อผิดพลาด:', error);
        throw error;
    }
}

// รันการลบ
deleteAllProducts()
    .then(() => {
        console.log('\n✨ เสร็จสิ้นการลบข้อมูล');
        console.log('💡 ตอนนี้คุณสามารถรัน migration script ได้แล้ว');
        process.exit(0);
    })
    .catch((error) => {
        console.error('\n💥 เกิดข้อผิดพลาด:', error);
        process.exit(1);
    });
