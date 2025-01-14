import { createSlice } from "@reduxjs/toolkit";
import { loginAPI } from "./loginAPI";
import { setToken } from "..";

export const loginSlice = createSlice({
    name: "login",
    initialState: { token: null },
    reducers: {},
    extraReducers: (build) => {
        build.addCase(loginAPI.fulfilled, (state, action) => {
            console.log(2);
            
            const token = JSON.stringify(action.payload);
            setToken(token);
            state.token = token; 
        })
    },
});

export default loginSlice.reducer;
