import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "..";

export const logoutAPI = createAsyncThunk("logout", async () => {
    const cookies = document.cookie.split('; ')
	const tokenCookie = cookies.find(row => row.startsWith('token='))
	const token = tokenCookie ? tokenCookie.split('=')[1] : null
    try {
        const response = await axiosInstance.get("auth/logout/", {
            headers: {
                Authorization: `${token}`,
            },
        });
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC'
        return response.statusText;
    } catch (error) {
        return error.response?.data;
    }
});