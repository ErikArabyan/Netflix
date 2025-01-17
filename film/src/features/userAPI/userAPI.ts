import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '..'

interface UserResponse {
	user: {
		id: string
		username: string
		email: string
		image: string
	}
}

interface UserError {
	message: string
}

export const userAPI = createAsyncThunk<UserResponse, void, { rejectValue: UserError }>('get user', async (_, { rejectWithValue }) => {
	try {
		const token = document.cookie
			.split('; ')
			.find(row => row.startsWith('token='))
			?.split('=')[1]

		if (!token) {
			return rejectWithValue({ message: 'No token found' })
		}

		const response = await axiosInstance.get<UserResponse>('auth/getuser/', {
			headers: {
				Authorization: token,
			},
		})
		return response.data
	} catch (error: any) {
		document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC'
		return rejectWithValue(error.response?.data || { message: 'Unknown error' })
	}
})
