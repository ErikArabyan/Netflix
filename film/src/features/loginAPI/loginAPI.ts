import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '..'

interface LoginData {
	email: string
	password: string
}

interface LoginResponse {
	token: string
}

export const loginAPI = createAsyncThunk<LoginResponse, LoginData, { rejectValue: string }>('login', async (data, { rejectWithValue }) => {
	try {
		const response = await axiosInstance.post<LoginResponse>('auth/login/', data)
		if (response?.data) {			
			document.cookie = `token=${response.data}; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT`
			return response.data
		}
		return rejectWithValue('No data received')
	} catch (error: any) {
	
		return rejectWithValue(error.response?.data || 'Unknown error')
	}
})
