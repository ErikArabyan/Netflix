import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '..'

interface PayForFilmResponse {
	url: string
}

export const payForFilmAPI = createAsyncThunk<PayForFilmResponse, string, { rejectValue: string }>('pay for film', async (id, { rejectWithValue }) => {
	try {
		const token = document.cookie
			.split('; ')
			.find(row => row.startsWith('token='))
			?.split('=')[1]
		const response = await axiosInstance.get<PayForFilmResponse>(`/payment/${id}/`, {
			headers: {
				Authorization: token,
			},
		})

		window.location.href = response.data.url
		return response.data
	} catch (error: any) {
		return rejectWithValue(error.response?.data || 'Unknown error')
	}
})
