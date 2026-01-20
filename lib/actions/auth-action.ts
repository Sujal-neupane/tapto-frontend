"use server"

import { register, login } from '../api/auth';
import { cookies } from 'next/headers';

export const handleRegister = async (formData: any) => {
    try {
        const result = await register(formData);
        
        if (result.success && result.token) {
            // Set secure HTTP-only cookie for server-side rendering
            const cookieStore = await cookies();
            cookieStore.set('authToken', result.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 7 * 24 * 60 * 60, // 7 days
                path: '/',
            });
            
            // Store user data (non-sensitive) as a regular cookie
            cookieStore.set('userData', JSON.stringify(result.data), {
                httpOnly: false, // Allow client-side access
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 7 * 24 * 60 * 60,
                path: '/',
            });
            
            return {
                success: true,
                message: 'Registration successful',
                data: result.data,
                token: result.token,
                redirect: '/dashboard'
            };
        }
        
        return {
            success: false,
            message: result.message || 'Registration failed',
        };
    } catch (err: Error | any) {
        console.error('Registration error:', err);
        return {
            success: false,
            message: err.message || 'Registration failed'
        };
    }
};

export const handleLogin = async (formData: any) => {
    try {
        const result = await login(formData);
        
        if (result.success && result.token) {
            // Set secure HTTP-only cookie for server-side rendering
            const cookieStore = await cookies();
            cookieStore.set('authToken', result.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 7 * 24 * 60 * 60, // 7 days
                path: '/',
            });
            
            // Store user data (non-sensitive) as a regular cookie
            cookieStore.set('userData', JSON.stringify(result.data), {
                httpOnly: false, // Allow client-side access
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 7 * 24 * 60 * 60,
                path: '/',
            });
            
            return {
                success: true,
                message: 'Login successful',
                data: result.data,
                token: result.token,
                redirect: '/dashboard'
            };
        }
        
        return {
            success: false,
            message: result.message || 'Login failed',
        };
    } catch (err: Error | any) {
        console.error('Login error:', err);
        return {
            success: false,
            message: err.message || 'Login failed'
        };
    }
};

export const handleLogout = async () => {
    try {
        const cookieStore = await cookies();
        cookieStore.delete('authToken');
        cookieStore.delete('userData');
        
        return {
            success: true,
            message: 'Logged out successfully',
            redirect: '/landingpage'
        };
    } catch (err: Error | any) {
        return {
            success: false,
            message: 'Logout failed'
        };
    }
};
