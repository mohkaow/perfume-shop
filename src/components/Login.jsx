// Login Page - หน้า Login สำหรับ Admin
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password);
            navigate('/admin/dashboard');
        } catch (err) {
            console.error('Login failed:', err);

            // แสดง error message ที่เข้าใจง่าย
            if (err.code === 'auth/invalid-credential') {
                setError('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
            } else if (err.code === 'auth/user-not-found') {
                setError('ไม่พบผู้ใช้นี้ในระบบ');
            } else if (err.code === 'auth/wrong-password') {
                setError('รหัสผ่านไม่ถูกต้อง');
            } else if (err.code === 'auth/too-many-requests') {
                setError('พยายาม login หลายครั้งเกินไป กรุณารอสักครู่');
            } else {
                setError('เกิดข้อผิดพลาด: ' + err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-card">
                    <h1>Admin Login</h1>
                    <p className="login-subtitle">เข้าสู่ระบบจัดการร้านน้ำหอม</p>

                    {error && (
                        <div className="login-error">
                            ⚠️ {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group">
                            <label htmlFor="email">อีเมล</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@example.com"
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">รหัสผ่าน</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                disabled={loading}
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn-primary btn-full"
                            disabled={loading}
                        >
                            {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
                        </button>
                    </form>

                    <div className="login-note">
                        💡 <strong>สำหรับ Admin เท่านั้น</strong><br />
                        ถ้ายังไม่มี account ให้สร้างผ่าน Firebase Console
                    </div>
                </div>
            </div>
        </div>
    );
}
