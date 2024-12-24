import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '..';

export const forgotPasswordAPI = createAsyncThunk('forgot password', async (email) => {
    try {
		const response = await axiosInstance.post('auth/password_change/', email)
		return response.data
	} catch (error) {
		return error.response.data
	}
})