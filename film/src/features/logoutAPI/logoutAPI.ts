import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance, { setToken } from '..'

interface LogoutResponse {
	statusText: string
}

interface LogoutError {
	message: string
}

export const logoutAPI = createAsyncThunk<LogoutResponse, void, { rejectValue: LogoutError }>('logout', async (_, { rejectWithValue }) => {
	const cookies = document.cookie.split('; ')
	const tokenCookie = cookies.find(row => row.startsWith('token='))
	const token = tokenCookie ? tokenCookie.split('=')[1] : null

	if (!token) {
		return rejectWithValue({ message: 'Token not found' })
	}

	try {
		const response = await axiosInstance.get('auth/logout/', {
			headers: {
				Authorization: `${token}`,
			},
		})

		// document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC'
        setToken()
		return { statusText: response.statusText }
	} catch (error: any) {

		return rejectWithValue({ message: error.response?.data || 'Unknown error' })
	}
})
