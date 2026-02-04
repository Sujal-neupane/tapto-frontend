export const API = {
    AUTH: {
        LOGIN: '/api/auth/login',
        REGISTER: '/api/auth/register',
        LOGOUT: '/api/auth/logout',
        ADMIN: '/api/auth/admin',
        UPDATEPROFILE: '/api/auth/update-profile',
        REQUEST_PASSWORD_RESET: '/api/auth/request-password-reset',
        RESET_PASSWORD: (token: string) => `/api/auth/reset-password/${token}`,
        UPDATE_BY_ID: (id: string) => `/api/auth/${id}`,
        ME: '/api/auth/me',
    },
    ADMIN: {
        DASHBOARD: '/api/admin/dashboard/stats',
        USERS: {
            GET_ALL: '/api/admin/users',
            GET_BY_ID: (id: string) => `/api/admin/users/${id}`,
            CREATE: '/api/admin/users',
            UPDATE: (id: string) => `/api/admin/users/${id}`,
            DELETE: (id: string) => `/api/admin/users/${id}`,
        },
        PRODUCTS: {
            GET_ALL: '/api/admin/products',
            CREATE: '/api/admin/products',
            UPDATE: (id: string) => `/api/admin/products/${id}`,
            DELETE: (id: string) => `/api/admin/products/${id}`,
        },
        ORDERS: {
            GET_ALL: '/api/admin/orders',
            UPDATE_STATUS: (id: string) => `/api/admin/orders/${id}/status`,
        },
    },
    PRODUCTS: {
        GET_ALL: '/api/products',
        GET_BY_ID: (id: string) => `/api/products/${id}`,
        CREATE: '/api/products',
        UPDATE: (id: string) => `/api/products/${id}`,
        DELETE: (id: string) => `/api/products/${id}`,
        SEARCH: '/api/products/search',
    },
    ORDERS: {
        CREATE: '/api/orders',
        GET_BY_ID: (id: string) => `/api/orders/${id}`,
        GET_USER_ORDERS: '/api/orders/user',
        UPDATE_STATUS: (id: string) => `/api/orders/${id}/status`,
    },
} as const;
