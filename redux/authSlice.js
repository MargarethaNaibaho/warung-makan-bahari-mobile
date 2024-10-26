import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
        user: null,
    },
    reducers: {
        setAuthState: (state, action) => {
            const {isLoggedIn, user} = action.payload;
            state.isLoggedIn = isLoggedIn;
            state.user = isLoggedIn ? user : null;
        },
        register: (state) => {
            state.user = action.payload.user,
            state.isLoggedIn = false;
        },
        logout: (state) => {
            state.user = null,
            state.isLoggedIn = false;
        },
    }
})

export const {
    setAuthState,
    register,
    logout
} = authSlice.actions;

export default authSlice.reducer;
