// Firebase Configuration
// ไฟล์นี้เก็บ config ของ Firebase สำหรับเชื่อมต่อกับ Backend
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase config จาก Firebase Console
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDxkrnwLa1Z2sOvAsgE31mpsVq3KCU0QVo",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "perfume-shop-82ac7.firebaseapp.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "perfume-shop-82ac7",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "perfume-shop-82ac7.firebasestorage.app",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "659051379188",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:659051379188:web:50683af4416d9e8c02e1a1",
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-7JC9L2WLEG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
