import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '..'

export const registerAPI = createAsyncThunk('register', async data => {
	try {
		const response = await axiosInstance.post('auth/register/', data)
        return response.data
	} catch (error) {
        return error.response.data
	}
})
