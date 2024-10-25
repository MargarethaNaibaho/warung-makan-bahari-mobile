import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./redux/authSlice";
import menuReducer from "./redux/menuSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        menu: menuReducer
    }
})

export default store;