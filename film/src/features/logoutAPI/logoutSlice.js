import { createSlice } from "@reduxjs/toolkit";
import { logoutAPI } from "./logoutAPI";
import { setToken } from "..";

export const logoutSlice = createSlice({
    name: "logoutSlice",
    initialState: null,
    reducers: {},
    extraReducers: (build) => {
        build.addCase(logoutAPI.fulfilled, () => {
            localStorage.removeItem("token");
            setToken();
        });
    },
});

export default logoutSlice.reducer;
