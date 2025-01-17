import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '..'

interface EmailData {
	email: string
}

interface ForgotPasswordResponse {
	message: string
	status: string
	error: {}
}

interface ErrorResponse {
	message: string
	status: string
}

export const forgotPasswordAPI = createAsyncThunk<
	ForgotPasswordResponse,
	EmailData,
	{ rejectValue: ErrorResponse }
>('forgot password', async (email: EmailData, { rejectWithValue }) => {
	try {
		const response = await axiosInstance.post('auth/password_change/', email)
		return response.data
	} catch (error: any) {
	
		return rejectWithValue(error.response?.data || { message: 'Unknown error', status: 'error' })
	}
})
