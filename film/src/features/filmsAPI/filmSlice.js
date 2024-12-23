import { createSlice } from "@reduxjs/toolkit";
import { filmsAPI } from "./filmsAPI";

export const initialState = {
    noSearchFilms: [],
    films: [],
    genres: [],
}

export const filmsAPISlice = createSlice({
	name: 'homePage',
	initialState,
	reducers: {
		setSearch: (state, action) => {
			state.films = state.noSearchFilms.filter(i => i.name.toLowerCase().includes(action.payload.toLowerCase()))

		},
	},
	extraReducers: build => {
		build
			.addCase(filmsAPI.fulfilled, (state, action) => {
				state.noSearchFilms = action.payload.film
				state.films = action.payload.film
				state.genres = action.payload.genre
			})
			.addCase(filmsAPI.rejected, (state, action) => {})
	},
})

export const { setSearch } = filmsAPISlice.actions