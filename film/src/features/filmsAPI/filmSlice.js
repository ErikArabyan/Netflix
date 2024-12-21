import { createSlice } from "@reduxjs/toolkit";
import { filmsAPI } from "./filmsAPI";

export const initialState = {
    films: [],
    genres: [],
}

export const filmsAPISlice = createSlice({
	name: 'homePage',
	initialState,
	reducers: {
		setSearch: (state, action) => {
			state = state.filter(i => i === action.payload)
			return state
		},
	},
	extraReducers: build => {
		build
			.addCase(filmsAPI.fulfilled, (state, action) => {
				state.films = action.payload.film
				state.genres = action.payload.genre
			})
			.addCase(filmsAPI.rejected, (state, action) => {})
	},
})

export const { setSearch } = filmsAPISlice.actions