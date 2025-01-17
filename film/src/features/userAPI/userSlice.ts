import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { userAPI } from './userAPI'

interface User {
	username: string
	email: string
	image: string
}

export const initialState: User = {
	username: '',
	email: '',
	image: '',
}

export const userSlice = createSlice({
	name: 'userSlice',
	initialState,
	reducers: {
		userClear: state => {
			state.username = ''
			state.email = ''
			state.image = ''
		},

		socialAuth: (state, action: PayloadAction<{ given_name: string; picture: string, email: string }>) => {
			state.username = action.payload.given_name
			state.email = action.payload.email
			state.image = action.payload.picture						
		},
	},
	extraReducers: build => {
		build
			.addCase(userAPI.fulfilled, (state, action) => {
				state.username = action.payload.user.username
				state.email = action.payload.user.email
				state.image = action.payload.user.image
			})
			.addCase(userAPI.rejected, () => {
				document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC'
			})
	},
})

export const { userClear, socialAuth } = userSlice.actions
export default userSlice.reducer
