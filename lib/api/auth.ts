// API layer
import axiosInstance from './axios'; 
import { API } from './endpoints';
import { setCookie, getCookie, deleteCookie } from 'cookies-next';

interface AuthResponse {
    success: boolean;
    message: string;
    data?: any;
    token?: string;
}

export const register = async (registerData: any): Promise<AuthResponse> => {
    try {
        const response = await axiosInstance.post<AuthResponse>(
            API.AUTH.REGISTER,
            registerData
        );
        
        if (response.data.success && response.data.token) {
            // Store token and user data in cookies and localStorage
            if (typeof window !== 'undefined') {
                // Store in cookies (preferred for security)
                setCookie('authToken', response.data.token, {
                    maxAge: 7 * 24 * 60 * 60, // 7 days
                    path: '/',
                    sameSite: 'lax',
                });
                setCookie('user', JSON.stringify(response.data.data), {
                    maxAge: 7 * 24 * 60 * 60,
                    path: '/',
                    sameSite: 'lax',
                });
                
                // Also store in localStorage as backup
                localStorage.setItem('authToken', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.data));
            }
        }
        
        return response.data;
    } catch (err: Error | any) {
        const errorMessage = err.response?.data?.message 
            || err.message 
            || 'Registration failed';
        
        throw new Error(errorMessage);
    }
};

export const login = async (loginData: any): Promise<AuthResponse> => {
    try {
        const response = await axiosInstance.post<AuthResponse>(
            API.AUTH.LOGIN,
            loginData
        );
        
        if (response.data.success && response.data.token) {
            // Store token and user data in cookies and localStorage
            if (typeof window !== 'undefined') {
                // Store in cookies (preferred for security)
                setCookie('authToken', response.data.token, {
                    maxAge: 7 * 24 * 60 * 60, // 7 days
                    path: '/',
                    sameSite: 'lax',
                });
                setCookie('user', JSON.stringify(response.data.data), {
                    maxAge: 7 * 24 * 60 * 60,
                    path: '/',
                    sameSite: 'lax',
                });
                
                // Also store in localStorage as backup
                localStorage.setItem('authToken', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.data));
            }
        }
        
        return response.data;
    } catch (err: Error | any) {
        const errorMessage = err.response?.data?.message 
            || err.message 
            || 'Login failed';
        
        throw new Error(errorMessage);
    }
};

export const logout = () => {
    if (typeof window !== 'undefined') {
        // Clear cookies
        deleteCookie('authToken');
        deleteCookie('user');
        
        // Clear localStorage
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
    }
};

export const getStoredUser = () => {
    if (typeof window !== 'undefined') {
        // Try cookies first
        const userCookie = getCookie('user');
        if (userCookie) {
            try {
                return JSON.parse(userCookie as string);
            } catch (e) {
                console.error('Error parsing user cookie:', e);
            }
        }
        
        // Fallback to localStorage
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }
    return null;
};

export const getAuthToken = () => {
    if (typeof window !== 'undefined') {
        // Try cookies first
        const tokenCookie = getCookie('authToken');
        if (tokenCookie) {
            return tokenCookie as string;
        }
        
        // Fallback to localStorage
        return localStorage.getItem('authToken');
    }
    return null;
};
