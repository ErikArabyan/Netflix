import { createSlice } from '@reduxjs/toolkit'
import { loginAPI } from './loginAPI'
import { setToken } from '..'

interface LoginState {
	token: string | null
}

export const loginSlice = createSlice({
	name: 'login',
	initialState: { token: null } as LoginState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(loginAPI.fulfilled, (state, action) => {
			const token = action.payload			
			setToken()
			state = token
		})
	},
})

export default loginSlice.reducer
