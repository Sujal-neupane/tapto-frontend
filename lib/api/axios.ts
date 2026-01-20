import axios, { AxiosInstance, AxiosError } from 'axios';

// Backend API URL - hardcoded for reliability
const API_URL = 'http://localhost:4000';

console.log('[Axios] Initializing with baseURL:', API_URL, 'Environment:', typeof window === 'undefined' ? 'SERVER' : 'CLIENT');

const axiosInstance: AxiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: false,
});


// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Ensure URL is absolute for server-side requests
        const fullUrl = config.baseURL && config.url 
            ? new URL(config.url, config.baseURL).toString() 
            : config.url;
        
        console.log('[Axios] Request:', config.method?.toUpperCase(), fullUrl, 
                    'Context:', typeof window === 'undefined' ? 'SERVER' : 'CLIENT');
        
        // Add token from cookies or localStorage if available (client-side only)
        if (typeof window !== 'undefined') {
            // Try to get token from cookies first
            const { getCookie } = require('cookies-next');
            let token = getCookie('authToken');
            
            // Fallback to localStorage
            if (!token) {
                token = localStorage.getItem('authToken');
            }
            
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        console.error('[Axios] Request error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        console.log('[Axios] Response:', response.status, response.config.url);
        return response;
    },
    (error: AxiosError) => {
        console.error('[Axios] Response error:', error.response?.status, error.config?.url, error.message);
        
        // Handle authentication errors
        if (error.response?.status === 401) {
            // Clear auth token and cookies on unauthorized
            if (typeof window !== 'undefined') {
                const { deleteCookie } = require('cookies-next');
                deleteCookie('authToken');
                deleteCookie('user');
                localStorage.removeItem('authToken');
                localStorage.removeItem('user');
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;

