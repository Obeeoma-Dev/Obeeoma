import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import adminReducer from "./slices/adminSlice";
import employerReducer from "./slices/EmployerSlice";
import employeeReducer from "./slices/employeeSlice";
import subscriptionSlice from "./slices/adminpaystackSlice";
import { setupApiInterceptors } from "../api/apiConfig";
import billingReducer from "./slices/billingSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    employer: employerReducer,
    billing: billingReducer,
    employee: employeeReducer,
    subscriptionSlice: subscriptionSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// calling the setup function
setupApiInterceptors(store);
