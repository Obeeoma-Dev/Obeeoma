import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import adminReducer from "./slices/adminSlice";
import employerReducer from "./slices/EmployerSlice";
import { setupApiInterceptors } from '../api/apiConfig';
export const store = configureStore({
    reducer: {
        auth: authReducer,
        admin: adminReducer,
        employer: employerReducer,
    },
});
// calling the setup function
setupApiInterceptors(store);
