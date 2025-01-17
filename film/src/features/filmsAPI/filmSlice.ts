import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { filmsAPI } from './filmsAPI'

interface Film {
	id: number
	name: string
	image: string
	genres: [string]
}


interface FilmsState {
	noSearchFilms: Film[]
	films: Film[]
	genres: [string]
}

export const initialState: FilmsState = {
	noSearchFilms: [],
	films: [],
	genres: [''],
}

export const filmsAPISlice = createSlice({
	name: 'homePage',
	initialState,
	reducers: {
		setSearch: (state, action: PayloadAction<string>) => {
			state.films = state.noSearchFilms.filter(i => i.name.toLowerCase().includes(action.payload.toLowerCase()))
		},
	},
	extraReducers: builder => {
		builder.addCase(filmsAPI.fulfilled, (state, action) => {
			const { film, genre } = action.payload || {}
			state.noSearchFilms = film || []
			state.films = film || []
			state.genres = genre || []
		})
	},
})

export const { setSearch } = filmsAPISlice.actions
