import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '..'

interface RateData {
	filmId: string
	rating: number
}

interface RateResponse {
	success: boolean
	message?: string
}

interface RateError {
	message: string
}

export const rateAPI = createAsyncThunk<RateResponse, RateData, { rejectValue: RateError }>('rate', async (data, { rejectWithValue }) => {
	try {
		const response = await axiosInstance.post<RateResponse>('rate/', data)

		return response.data
	} catch (error: any) {
		return rejectWithValue(error.response?.data || { message: 'Unknown error' })
	}
})
