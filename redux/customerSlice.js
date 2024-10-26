import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

export const fetchCustomerById = createAsyncThunk(
    'customer/fetchCustomerById',
    async(customerId, {rejectedWithValue}) => {
        try{
            const response = await axiosInstance.get(`/customers/${customerId}`);
            return response.data;
        } catch(e){
            return rejectedWithValue(e.response.data);
        }
    }
)

const customerSlice = createSlice({
    name: 'customer',
    initialState: {
        customers: [],
        status: null,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                fetchCustomerById.fulfilled, (state, action) => {
                    state.customers = action.payload.data;
                    state.status = 'succeeded';
                    state.error = null
                }
            )
            .addCase(
                fetchCustomerById.rejected, (state, action) => {
                    state.customers = 'failed'
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

export default customerSlice.reducer;