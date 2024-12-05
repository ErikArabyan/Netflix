import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '..';

export const filmsAPI = createAsyncThunk('getFilms', async () => {
        const response = await axiosInstance.get('');
        return response.data;
});
