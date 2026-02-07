import axiosInstance from './axios';
import { API } from './endpoints';

export interface Address {
    _id: string;
    userId: string;
    fullName: string;
    phone: string;
    street: string;
    city: string;
    state?: string;
    zipCode: string;
    country: string;
    isDefault: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreateAddressData {
    fullName: string;
    phone: string;
    street: string;
    city: string;
    state?: string;
    zipCode: string;
    country: string;
    isDefault?: boolean;
}

export const getUserAddresses = async (): Promise<Address[]> => {
    try {
        const response = await axiosInstance.get(API.ADDRESSES.GET_ALL);
        return response.data.data || response.data;
    } catch (error) {
        console.error('Error fetching addresses:', error);
        throw error;
    }
};

export const getAddressById = async (id: string): Promise<Address> => {
    try {
        const response = await axiosInstance.get(API.ADDRESSES.GET_BY_ID(id));
        return response.data.data || response.data;
    } catch (error) {
        console.error('Error fetching address:', error);
        throw error;
    }
};

export const createAddress = async (data: CreateAddressData): Promise<Address> => {
    try {
        const response = await axiosInstance.post(API.ADDRESSES.CREATE, data);
        return response.data.data || response.data;
    } catch (error) {
        console.error('Error creating address:', error);
        throw error;
    }
};

export const updateAddress = async (id: string, data: Partial<CreateAddressData>): Promise<Address> => {
    try {
        const response = await axiosInstance.put(API.ADDRESSES.UPDATE(id), data);
        return response.data.data || response.data;
    } catch (error) {
        console.error('Error updating address:', error);
        throw error;
    }
};

export const deleteAddress = async (id: string): Promise<void> => {
    try {
        await axiosInstance.delete(API.ADDRESSES.DELETE(id));
    } catch (error) {
        console.error('Error deleting address:', error);
        throw error;
    }
};

export const setDefaultAddress = async (id: string): Promise<Address> => {
    try {
        const response = await axiosInstance.put(API.ADDRESSES.SET_DEFAULT(id));
        return response.data.data || response.data;
    } catch (error) {
        console.error('Error setting default address:', error);
        throw error;
    }
};
