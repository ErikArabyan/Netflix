import { createSlice } from "@reduxjs/toolkit";
import { userAPI } from "./userAPI";

export const initialState = {
    user: {username: ''},
};

export const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        userClear: (state, action) => {                
                state.user = {}
        },
        socialAuth: (state, action) => {            
            state.user.username = action.payload['given_name'];
            state.user.image = action.payload['picture'];
        }
    },
    extraReducers: (build) => {
        build
            .addCase(userAPI.fulfilled, (state, action) => {
                console.log(4);
                state.user = action.payload;
            })
            .addCase(userAPI.rejected, (state, action) => {
                document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC'
            });
    },
});

export const { userClear } = userSlice.actions
export const { socialAuth } = userSlice.actions;
export default userSlice.reducer;
