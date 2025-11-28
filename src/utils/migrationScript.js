// Migration Script - ย้ายสินค้าจาก products.js ไปยัง Firestore
// รันครั้งเดียวหลังจากตั้งค่า Firebase เรียบร้อยแล้ว

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { products } from '../data/products.js';

// Firebase config (ใช้ค่าเดียวกับใน firebase.js)
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

async function migrateProducts() {
    console.log(`🚀 เริ่มย้ายสินค้า ${products.length} รายการไปยัง Firestore...`);

    let successCount = 0;
    let errorCount = 0;

    for (const product of products) {
        try {
            // ลบ id เดิมออก เพราะ Firestore จะสร้าง id ใหม่ให้
            const { id, ...productData } = product;

            const docRef = await addDoc(collection(db, 'products'), {
                ...productData,
                createdAt: new Date(),
                updatedAt: new Date()
            });

            console.log(`✅ เพิ่ม "${product.name}" สำเร็จ (ID: ${docRef.id})`);
            successCount++;
        } catch (error) {
            console.error(`❌ เพิ่ม "${product.name}" ล้มเหลว:`, error);
            errorCount++;
        }
    }

    console.log('\n📊 สรุปผลการย้ายข้อมูล:');
    console.log(`✅ สำเร็จ: ${successCount} รายการ`);
    console.log(`❌ ล้มเหลว: ${errorCount} รายการ`);
    console.log(`📦 รวมทั้งหมด: ${products.length} รายการ`);

    if (successCount === products.length) {
        console.log('\n🎉 ย้ายข้อมูลสำเร็จทั้งหมด!');
    }
}

// รัน migration
migrateProducts()
    .then(() => {
        console.log('\n✨ เสร็จสิ้นการย้ายข้อมูล');
        process.exit(0);
    })
    .catch((error) => {
        console.error('\n💥 เกิดข้อผิดพลาด:', error);
        process.exit(1);
    });
