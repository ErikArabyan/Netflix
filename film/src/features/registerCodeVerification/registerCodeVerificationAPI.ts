import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '..'

interface RegisterCodeVerifyData {
	code: string
	email: string
}

interface RegisterCodeVerifyResponse {
	success: boolean
	message?: string
	error: string
}

interface RegisterCodeVerifyError {
	message: string
}

export const registerCodeVerifyAPI = createAsyncThunk<RegisterCodeVerifyResponse, RegisterCodeVerifyData, { rejectValue: RegisterCodeVerifyError }>('verify code', async (data, { rejectWithValue }) => {
	try {
		const response = await axiosInstance.post<RegisterCodeVerifyResponse>('auth/verify_email/', data)
		return response.data
	} catch (error: any) {
		return rejectWithValue(error.response?.data || { message: 'Unknown error' })
	}
})
