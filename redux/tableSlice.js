import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

export const fetchTable = createAsyncThunk(
    'table/fetchTables',
    async(_, {rejectedWithValue}) => {
        try{
            const response = await axiosInstance.get('/tables');
            return response.data;
        } catch(error) {
            return rejectedWithValue(error.response.data);
        }
    }
)

const tableSlice = createSlice({
    name: 'table',
    initialState: {
        tables: [],
        status: null,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                fetchTable.fulfilled, (state, action) => {
                    state.tables = action.payload.data;
                    state.status = 'succeeded';
                    state.error = null
                }
            )
            .addCase(
                fetchTable.rejected, (state, action) => {
                    state.tables = 'failed'
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

export default tableSlice.reducer;