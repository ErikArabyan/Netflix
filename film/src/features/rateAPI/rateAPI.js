import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "..";

export const rateAPI = createAsyncThunk('rate', async (data) => {
    try {
        const response = axiosInstance.post('rate/', data)
        return response.data;
    } catch (error) {
        return error.response?.data
    }
})