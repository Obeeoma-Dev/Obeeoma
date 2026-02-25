import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authReducer from "./slices/authSlice";
import adminReducer from "./slices/adminSlice";
import employerReducer from "./slices/EmployerSlice";
import employeeReducer from "./slices/employeeSlice";
import { setupApiInterceptors } from "../api/apiConfig";
import billingReducer from "./slices/billingSlice";
import contentReducer from "./slices/contentSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    employer: employerReducer,
    billing: billingReducer,
    employee: employeeReducer,
    content: contentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

// calling the setup function
setupApiInterceptors(store);
