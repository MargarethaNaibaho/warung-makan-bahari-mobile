import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

export const fetchMenu = createAsyncThunk(
    'menu/fetchMenus',
    async(_, {rejectedWithValue}) => {
        try{
            const response = await axiosInstance.get('/menus');
            return response.data;
        } catch(error) {
            return rejectedWithValue(error.response.data);
        }
    }
)

const menuSlice = createSlice({
    name: 'menu',
    initialState: {
        menus: [],
        status: null,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                fetchMenu.fulfilled, (state, action) => {
                    state.menus = action.payload.data;
                    state.status = 'succeeded';
                    state.error = null
                }
            )
            .addCase(
                fetchMenu.rejected, (state, action) => {
                    state.status = 'failed'
                    state.error = action.payload
                }
            )

            .addMatcher(
                (action) => action.type.endsWith('/rejected'),
                (state, action) => {
                    state.error = action.payload;
                    state.status = 'failed'
                }
            )
    }
})

export default menuSlice.reducer;