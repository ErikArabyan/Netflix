import { createSlice } from '@reduxjs/toolkit'
import { filmDetailsAPI } from './filmDetailsAPI'

export const initialState = {
	film: {},
}

export const filmdetailsAPISlice = createSlice({
	name: 'homePage',
	initialState,
	reducers: {},
	extraReducers: build => {
		build.addCase(filmDetailsAPI.fulfilled, (state, action) => {
			state.film = action.payload.film
		})
	},
})
