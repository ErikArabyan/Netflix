import { createSlice } from "@reduxjs/toolkit";
import { filmsAPI } from "./filmsAPI";

export const initialState = {
    films: [],
    genres: [],
}

export const filmsAPISlice = createSlice({
    name: 'homePage',
    initialState,
    reducers: {},
    extraReducers: (build) => {
        build.addCase(
            filmsAPI.fulfilled, (state, action) => {
                state.films = action.payload.film
                state.genres = action.payload.genre                              
            }
        )
        .addCase(
            filmsAPI.rejected, (state, action) => {
            }
        )
    }
})