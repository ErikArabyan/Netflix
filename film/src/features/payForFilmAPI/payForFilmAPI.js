import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '..'

export const payForFilmAPI = createAsyncThunk('pay for film', async (id) => {
	try {
		const response = await axiosInstance.get(`/payment/${id}/`, localStorage.token)
        window.location.href = response.data.url
		return response.data
	} catch (error) {
		throw error.response?.data
	}
})