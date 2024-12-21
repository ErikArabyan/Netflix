import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '..'

export const registerAPI = createAsyncThunk('register', async data => {
	data['is_director'] = false
	data['is_art_director'] = false
	data['is_distributor'] = false
	data['is_editor'] = false
	try {
		const response = await axiosInstance.post('auth/register/', data)
        return response.data
	} catch (error) {
        return error.response.data
	}
})
