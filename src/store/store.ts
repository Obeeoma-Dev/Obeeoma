import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import adminReducer from "./slices/adminSlice";
import employerReducer from "./slices/EmployerSlice";
import { setupApiInterceptors } from '../api/apiConfig';
import employeeReducer from "./slices/employeeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    employer: employerReducer,
  },
});



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// calling the setup function
setupApiInterceptors(store);
