import React from 'react';
import { Toaster } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Import your AuthProvider and ProtectedRoute
// import { AuthProvider } from "./context/AuthContext";
// import ProtectedRoute from "./components/ProtectedRoute";



// Pages
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import CreateAccount from "./pages/auth/Register";
import ResetPassword from "./pages/auth/ResetPassword";
import ResetPasswordSignin from "./pages/auth/ResetPasswordSignin";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import EmployerDashboard from "./pages/EmployerDashboard";
import SubscriptionPage from "./pages/SubscriptionPage";
import NotFound from "./pages/NotFound";

import { Provider, useSelector } from 'react-redux';
import { store, RootState } from './../src/store/store'



const queryClient = new QueryClient();

export default function App(): React.ReactElement {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          {/* AuthProvider wraps all routes to provide auth context */}
          <Provider store={store}>
            <Routes>
              {/* === PUBLIC ROUTES === */}
              {/* These routes are accessible to everyone */}
              <Route path="/" element={<Navigate to="/index" replace />} />
              <Route path="/index" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<CreateAccount />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/reset-password-signin" element={<ResetPasswordSignin />} />
              <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
              <Route path="/subscription" element={< />} />


              {/* === PROTECTED ROUTES === */}
              {/* These routes are only accessible to logged-in users */}
              {/* <Route element={<ProtectedRoute />}>
                
                <Route path="/employer-dashboard" element={<EmployerDashboard />} />
              </Route> */}

              {/* === CATCH-ALL ROUTE === */}
              {/* This must be the last route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Provider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}