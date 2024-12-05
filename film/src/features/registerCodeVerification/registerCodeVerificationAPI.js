import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "..";

export const registerCodeVerifyAPI = createAsyncThunk("verify code", async (data) => {
    try{
        const response = await axiosInstance.post("auth/verify_email/", data);
        return response?.data;
    }
    catch(error) {
        return error.response.data
    }
});