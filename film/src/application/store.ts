import { configureStore } from '@reduxjs/toolkit'
import { filmsAPISlice } from '../features/filmsAPI/filmSlice'
import { userSlice } from '../features/userAPI/userSlice'
import { loginSlice } from '../features/loginAPI/loginSlice'
import { filmdetailsAPISlice } from '../features/filmDetailsAPI/filmDetailsSlice'
import { loadingSlice } from '../features/loading/loading'
import { TypedUseSelectorHook, useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

export const store = configureStore({
	reducer: {
		filmsAPI: filmsAPISlice.reducer,
		filmdetailsAPI: filmdetailsAPISlice.reducer,
		userAPI: userSlice.reducer,
		loginAPI: loginSlice.reducer,
		loading: loadingSlice.reducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type Dispatch = typeof store.dispatch

export const AppDispatch = () => useDispatch<Dispatch>()
export const AppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store