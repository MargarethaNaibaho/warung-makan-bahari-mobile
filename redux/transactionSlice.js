import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

export const createTransaction = createAsyncThunk(
    'transaction/createNewTransaction',
    async(transaction, {rejectedWithValue}) => {
        try{
            const response = await axiosInstance.post('/transaction', transaction, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch(e) {
            return rejectedWithValue(e.response.data);
        }
    }
)

export const fetchTransaction = createAsyncThunk(
    'transaction/fetchTransactions',
    async(_, {rejectedWithValue}) => {
        try{
            const response = await axiosInstance.get('/transaction');
            return response.data;
        } catch(error) {
            return rejectedWithValue(error.response.data);
        }
    }
)

const transactionSlice = createSlice({
    name: 'transaction',
    initialState: {
        transactions: [],
        status: null,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                fetchTransaction.fulfilled, (state, action) => {
                    state.transactions = action.payload.data;
                    state.status = 'succeeded';
                    state.error = null
                }
            )
            .addCase(
                fetchTransaction.rejected, (state, action) => {
                    state.transactions = 'failed'
                    state.error = action.payload
                }
            )


            .addCase(
                createTransaction.fulfilled, (state, action) => {
                    state.transactions.push(action.payload.data);
                    state.status = 'succeeded';
                    state.error = null
                }
            )
            .addCase(
                createTransaction.rejected, (state, action) => {
                    state.transactions = 'failed'
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

export default transactionSlice.reducer;