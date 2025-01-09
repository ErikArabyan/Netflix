import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '..';

export const forgotPasswordChangeAPI = createAsyncThunk(
    'forgot Password Change',
    async (data) => {
        try {
            const response = await axiosInstance.post(`auth/reset/${data.uidb64}/${data.token}/`, { 'password': data.password });
            return response.data;
        } catch (error) {
            return error.response?.data
            // return Promise.reject(error.response?.error)
        }
    }
);