import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '..'

interface ForgotPasswordChangeData {
	uidb64: string
	token: string
	password: string
}

export const forgotPasswordChangeAPI = createAsyncThunk('forgotPasswordChange', async (data: ForgotPasswordChangeData) => {
	try {
		const response = await axiosInstance.post(`auth/reset/${data.uidb64}/${data.token}/`, { password: data.password })
		return response.data
	} catch (error: any) {
		return error.response?.data
		// return Promise.reject(error.response?.error)
	}
})
