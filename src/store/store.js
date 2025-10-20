import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import adminReducer from "./slices/adminSlice";
import employerReducer from "./slices/EmployerSlice";
export const store = configureStore({
    reducer: {
        auth: authReducer,
        admin: adminReducer,
        employer: employerReducer,
    },
});
