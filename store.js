import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./redux/authSlice";
import menuReducer from "./redux/menuSlice";
import tableReducer from "./redux/tableSlice";
import transactionReducer from "./redux/transactionSlice";
import customerReducer from "./redux/customerSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        menu: menuReducer,
        table: tableReducer,
        transaction: transactionReducer,
        customer: customerReducer,
    }
})

export default store;