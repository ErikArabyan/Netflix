import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '..'

interface RegisterData {
	first_name: string
	last_name: string
	email: string
	password: string
}

interface RegisterResponse {
	success: boolean
	message?: string
	error: string
}

interface RegisterError {
	message: string
}

export const registerAPI = createAsyncThunk<RegisterResponse, RegisterData, { rejectValue: RegisterError }>('register', async (data, { rejectWithValue }) => {
	try {
		const response = await axiosInstance.post<RegisterResponse>('auth/register/', data)

		return response.data
	} catch (error: any) {
		return rejectWithValue(error.response?.data || { message: 'Unknown error' })
	}
})
