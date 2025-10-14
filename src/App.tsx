import React from "react";
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
import EmployerDashboard from "./pages/EmployerPages/EmployerDashboard";
import Subscription from "./pages/Subscription";
import NotFound from "./pages/NotFound";
// pages/System admin import.
import SysAdminDashboard from "./pages/Systemadmin/Dashboard";
import Organisation from "./pages/Systemadmin/OrganisationPages/organizations";
import OrganisationDetails from "./pages/Systemadmin/OrganisationPages/organizationDetails";
import ClientEngagement from "./pages/Systemadmin/Clientengagmentpages/clientEngagement";
import AIRecommendationsPage from "./pages/Systemadmin/Airecommendations/aimanagment";
// System admin settings pages.
import AdminSettings from "./pages/Systemadmin/adminsettings";

import { Provider } from "react-redux";
import { store } from "./../src/store/store";

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


              

              {/* === PROTECTED ROUTES === */}
              {/* These routes are only accessible to logged-in users */}
              {/* <Route element={<ProtectedRoute />}> 
              
              {/* EMPLOYEE'S ROUTES */}
              <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
              <Route path="/subscription" element={<Subscription />} />
              <Route path="/employer-dashboard" element={<EmployerDashboard />} />


              {/* SYSTEMS ADMIN ROUTES */}
              <Route path="/system-admin/organizations" element={<Organisation />} />
              <Route path="/systema-dmin/organizations/:id" element={<OrganisationDetails />} />
              <Route path="/system-admin/client-engagement" element={<ClientEngagement />}  />
              <Route path="/system-admin/ai-management" element={<AIRecommendationsPage />} />
              {/* SYSTEMS ADMIN, SETTING'S ROUTES */}
              <Route path="/system-admin" element={<SysAdminDashboard />} />
              <Route path="/system-admin/settings-overview" element={<AdminSettings />} />
              
              

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
