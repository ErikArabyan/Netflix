import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '..';

export const loginAPI = createAsyncThunk(
    'login',
    async (data) => {
        try {
            const response = await axiosInstance.post('auth/login/', data);
            if (response?.data) {
                return response?.data;
            }
        } catch (error) {
            return Promise.reject(error.response?.data)
        }
    }
);