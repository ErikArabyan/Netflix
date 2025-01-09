import { createSlice } from "@reduxjs/toolkit";
import { logoutAPI } from "./logoutAPI";
import { setToken } from "..";

export const logoutSlice = createSlice({
    name: "logoutSlice",
    initialState: null,
    reducers: {},
    extraReducers: (build) => {
        build.addCase(logoutAPI.fulfilled, () => {
            document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC'
            setToken();
        });
    },
});

export default logoutSlice.reducer;
