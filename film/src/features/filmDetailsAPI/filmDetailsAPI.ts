import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '..'

interface FilmDetailsRequest {
	id: string
	filmname: string
}

export const filmDetailsAPI = createAsyncThunk('get film details', async (data: FilmDetailsRequest) => {
	if (data.id) {
		try {
			const response = await axiosInstance.get(`${data.id}/${data.filmname}/`)
			return response.data
		} catch (error) {
			return error.response?.data
		}
	}
})
