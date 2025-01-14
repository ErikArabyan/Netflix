import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '..'

export const userAPI = createAsyncThunk('get user', async () => {
	console.log(3);
	try {
		const token = document.cookie
			.split('; ')
			.find(row => row.startsWith('token='))
			.split('=')[1]
			const response = await axiosInstance.get('auth/getuser/', {
			headers: {
				Authorization: `${token}`,
			},
		})
		return response.data
	} catch (error) {
		document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC'
		return error.response?.data
	}
})
