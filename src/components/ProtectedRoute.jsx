// Protected Route - ป้องกันหน้า Admin ให้เฉพาะคนที่ login แล้วเท่านั้น
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        // ถ้ายังไม่ login ให้ redirect ไปหน้า login
        return <Navigate to="/admin/login" replace />;
    }

    return children;
}
