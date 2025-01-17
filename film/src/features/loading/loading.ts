import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type LoadingState = 'hide' | ''

export const loadingSlice = createSlice({
	name: 'loading',
	initialState: 'hide' as LoadingState,
	reducers: {
		setLoading: (state, action: PayloadAction<LoadingState>) => {
            state = action.payload
			return action.payload
		},
	},
})

export const { setLoading } = loadingSlice.actions