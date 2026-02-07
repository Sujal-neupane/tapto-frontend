"use server"

import { register, login, requestPasswordReset, resetPassword } from '../api/auth';
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
            cookieStore.set('user', JSON.stringify(result.data), {
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
            cookieStore.set('user', JSON.stringify(result.data), {
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
        cookieStore.delete('user');
        
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


export const handleRequestPasswordReset = async (email: string) => {
    try {
        const response = await requestPasswordReset(email);
        if (response.success) {
            return {
                success: true,
                message: 'Password reset email sent successfully'
            }
        }
        return { success: false, message: response.message || 'Request password reset failed' }
    } catch (error: Error | any) {
        return { success: false, message: error.message || 'Request password reset action failed' }
    }
};

export const handleResetPassword = async (email: string, otp: string, newPassword: string) => {
    try {
        const response = await resetPassword(email, otp, newPassword);
        if (response.success) {
            return {
                success: true,
                message: 'Password has been reset successfully'
            }
        }
        return { success: false, message: response.message || 'Reset password failed' }
    } catch (error: Error | any) {
        return { success: false, message: error.message || 'Reset password action failed' }
    }
};
