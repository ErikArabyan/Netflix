import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '..';

export const loginAPI = createAsyncThunk(
    'login',
    async (data) => {
        console.log(1);
        
        try {            
            const response = await axiosInstance.post('auth/login/', data);
            if (response?.data) {
                document.cookie = `token=${response.data}; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT`
                return response?.data;
            }
        } catch (error) {
            return Promise.reject(error.response?.data)
        }
    }
);