import { createSlice } from "@reduxjs/toolkit";
import { loginAPI } from "./loginAPI";
import { setToken } from "..";

export const loginSlice = createSlice({
    name: "login",
    initialState: { token: null },
    reducers: {},
    extraReducers: (build) => {
        build.addCase(loginAPI.fulfilled, (state, action) => {
            const token = JSON.stringify(action.payload);
            localStorage.setItem("token", token);
            setToken(token);
            state.token = token;            
        })
    },
});

export default loginSlice.reducer;
