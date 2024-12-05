import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "..";
import { userState } from "../userAPI/userSlice";

export const logoutAPI = createAsyncThunk("logout", async (_, { dispatch }) => {
    const response = await axiosInstance.get("auth/logout/");
    dispatch(userState());
    return response.statusText;
});