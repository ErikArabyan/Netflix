import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '..';

export const forgotPasswordAPI = createAsyncThunk('forgot password', async (email) => {
    const request = await axiosInstance.post('auth/password_change/', email)
    console.log(request.data);
    
    return request.data
})