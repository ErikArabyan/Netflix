import { createSlice } from "@reduxjs/toolkit";
import { userAPI } from "./userAPI";

export const initialState = {
    user: true,
};

export const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        userState: (state, action) => {
            if (action.payload === 'logout') {
                state.user = false
            }
            if (action.payload === 'login') {
                state.user = true
            }
        },
    },
    extraReducers: (build) => {
        build
            .addCase(userAPI.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(userAPI.rejected, (state, action) => {
                localStorage.removeItem("token");
            });
    },
});

export const { userState } = userSlice.actions;
export default userSlice.reducer;
