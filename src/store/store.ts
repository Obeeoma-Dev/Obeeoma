import { Subscription } from "./../services/subscriptionService";
import { SubscriptionPlan } from "./../../.history/src/components/admincomponents/Settingscomponents/Subscriptionsettingscomp/subscriptionCards_20251204145502";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authReducer from "./slices/authSlice";
import adminReducer from "./slices/adminSlice";
import employerReducer from "./slices/EmployerSlice";
import employeeReducer from "./slices/employeeSlice";
import subscriptionSlice from "./slices/adminpaystackSlice";
import { setupApiInterceptors } from "../api/apiConfig";
import billingReducer from "./slices/billingSlice";
import SubscriptionSlice from "./slices/subscriptionSlice";

import contentReducer from "./slices/contentSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    employer: employerReducer,
    billing: billingReducer,
    employee: employeeReducer,
    subscriptionSlice: subscriptionSlice,
    content: contentReducer,
    Subscription: SubscriptionSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

// calling the setup function
setupApiInterceptors(store);
