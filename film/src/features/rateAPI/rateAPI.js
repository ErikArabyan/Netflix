import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "..";

export const rateAPI = createAsyncThunk('rate', async (data) => {
    axiosInstance.post('rate/', data)
})