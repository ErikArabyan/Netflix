import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "..";

export const userAPI = createAsyncThunk("get user", async () => {
        const request = await axiosInstance.get("auth/getuser/");        
        return request.data;
});
