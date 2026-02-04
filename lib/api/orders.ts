// API layer for orders
import axiosInstance from './axios';
import { API } from './endpoints';

export interface OrderItem {
    productId: string;
    productName: string;
    productImage: string;
    quantity: number;
    price: number;
    size?: string;
    color?: string;
}

export interface Order {
    _id: string;
    userId: string;
    items: OrderItem[];
    subtotal: number;
    shippingFee: number;
    tax: number;
    total: number;
    status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'outForDelivery' | 'delivered' | 'cancelled' | 'refunded';
    shippingAddress: {
        id: string;
        fullName: string;
        phone: string;
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    paymentMethod: {
        id: string;
        type: string;
        last4?: string;
    };
    createdAt: string;
    updatedAt: string;
    trackingNumber?: string;
    tracking?: any[];
}

export interface CreateOrderData {
    items: {
        productId: string;
        quantity: number;
    }[];
    shippingAddress: {
        id: string;
        fullName: string;
        phone: string;
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    paymentMethod: {
        id: string;
        type: string;
        last4?: string;
    };
}

export const createOrder = async (orderData: CreateOrderData): Promise<Order> => {
    try {
        const response = await axiosInstance.post(API.ORDERS.CREATE, orderData);
        return response.data.data || response.data;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};

export const getMyOrders = async (): Promise<Order[]> => {
    try {
        const response = await axiosInstance.get(API.ORDERS.GET_USER_ORDERS);
        return response.data.data || response.data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};

export const getOrderById = async (id: string): Promise<Order> => {
    try {
        const response = await axiosInstance.get(API.ORDERS.GET_BY_ID(id));
        return response.data.data || response.data;
    } catch (error) {
        console.error('Error fetching order:', error);
        throw error;
    }
};

export const trackOrder = async (id: string): Promise<any> => {
    try {
        const response = await axiosInstance.get(`/api/orders/${id}/track`);
        return response.data.data || response.data;
    } catch (error) {
        console.error('Error tracking order:', error);
        throw error;
    }
};

export const cancelOrder = async (id: string): Promise<Order> => {
    try {
        const response = await axiosInstance.post(`/api/orders/${id}/cancel`);
        return response.data.data || response.data;
    } catch (error) {
        console.error('Error cancelling order:', error);
        throw error;
    }
};