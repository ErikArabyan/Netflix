import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '..';

export const filmDetailsAPI = createAsyncThunk('get film details', async (data) => {        
        const response = await axiosInstance.get(`${data.id}/${data.filmname}/`);        
        return response.data;
});
