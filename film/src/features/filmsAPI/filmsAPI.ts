import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '..';

export const filmsAPI = createAsyncThunk('getFilms', async () => {
        try {
                const response = await axiosInstance.get('');
                return response.data;
        }
        catch (error: any) {
                return error?.response?.data
        }
});
