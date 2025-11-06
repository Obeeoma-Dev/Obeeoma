import React from "react";
import { Toaster } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Router, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./../src/store/store"; // Adjusted path for clarity
import "bootstrap/dist/css/bootstrap.min.css";

// Import your AuthProvider and ProtectedRoute
// import { AuthProvider } from "./context/AuthContext";
// import ProtectedRoute from "./components/ProtectedRoute";


// Pages
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ResetPassword from "./pages/auth/ResetPassword";
import ResetPasswordSignin from "./pages/auth/ResetPasswordSignin";
import AcceptInvite from "./pages/auth/accept-invite";
import PrivacyPolicy from "./pages/landingpage/Policy";
import Terms from "./pages/landingpage/Terms";
import OtpVerificationPage from "./pages/auth/otpVerification";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import EmployerDashboard from "./pages/EmployerPages/EmployerDashboard";
import EmployerAccountSettingsPage from "./pages/EmployerPages/AccountSettings";
import NotFound from "./pages/NotFound";
import SysAdminDashboard from "./pages/Systemadmin/Dashboard";
import Organisation from "./pages/Systemadmin/OrganisationPages/organizations";
import OrganisationDetails from "./pages/Systemadmin/OrganisationPages/organizationDetails";
import ClientEngagement from "./pages/Systemadmin/Clientengagmentpages/clientEngagement";
import AIRecommendationsPage from "./pages/Systemadmin/Airecommendations/aimanagment";
import HotlineActivity from "./pages/Systemadmin/Hotlinepages/hotlineActivity";
import SubscriptionPage from "./pages/Systemadmin/Subscriptionpages/subscription";
import ReportPage from "./pages/Systemadmin/Reportpages/report";
import SubscriptionEditor from "./pages/Systemadmin/Subscriptionpages/subscriptionEditor";
import AdminSettings from "./pages/Systemadmin/adminsettings"
import EmployerAccountProfile from "./pages/EmployerPages/AccountSettings";
import EmployeeManagement from "./pages/EmployerPages/EmployeeManagement";
import EmployerSubscription from "./pages/EmployerPages/Subscription";
import EmployerNotificationPage from "./pages/EmployerPages/EmployerNotificationPage";
import CompanyReports from "./pages/EmployerPages/CompanyReports";


const queryClient = new QueryClient();

export default function App(): React.ReactElement {
  
  return (

      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
           <BrowserRouter> 
            {/* all routes */}
            <Provider store={store}>
              {/* <Router> */}
              <Routes>
                {/* === PUBLIC ROUTES === */}
                <Route path="/" element={<Navigate to="/index" replace />} />
                <Route path="/index" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Register />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/reset-password-signin" element={<ResetPasswordSignin />} />
                <Route path="/accept-invite" element={<AcceptInvite />} />
                <Route path="/otp-verify" element={<OtpVerificationPage />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<Terms/>} />


                {/* === PROTECTED ROUTES === */}
                {/* To activate ProtectedRoute, uncomment the block below and the imports above */}
                {/* <Route element={<ProtectedRoute />}> */}
                
                {/* EMPLOYEE'S ROUTES */}
                <Route path="/employee-dashboard" element={<EmployeeDashboard />} />

                {/* EMPLOYER'S ROUTES */}
                <Route path="/organization-reports" element={<CompanyReports />} />
                <Route path="/employer-dashboard" element={<EmployerDashboard />} />
                <Route path="/employer-subscription" element={<EmployerSubscription />} />
                <Route path="/employee-management" element={<EmployeeManagement />} />
                <Route path="/employer-profile" element={<EmployerAccountProfile />} />
                <Route path="/employer-notifications" element={<EmployerNotificationPage />} />
                <Route path="/employer-settings" element={<EmployerAccountSettingsPage />} />


                {/* SYSTEMS ADMIN ROUTES */}
                <Route path="/system-admin/organizations" element={<Organisation />} />
                <Route path="/systemadmin/organizations/:id" element={<OrganisationDetails />} />
                <Route path="/system-admin/client-engagement" element={<ClientEngagement />} />
                <Route path="/system-admin/ai-management" element={<AIRecommendationsPage />} />
                <Route path="/system-admin/hotline-activity" element={<HotlineActivity />} />
                <Route path="/system-admin/Subscriptions" element={<SubscriptionPage />} />
                <Route path="/system-admin/reports" element={<ReportPage />} />
                
                {/* SYSTEMS ADMIN, SETTING'S ROUTES */}
                <Route path="/system-admin" element={<SysAdminDashboard />} />
                <Route path="/system-admin/settings-overview" element={<AdminSettings />} />
                <Route path="/settings-overview/subscription-editor" element={<SubscriptionEditor />} />

                {/* Duplicate routes removed for cleaner code */}

                {/* === CATCH-ALL ROUTE === */}
                <Route path="*" element={<NotFound />} />
                {/* </Route> */}
              </Routes>
              {/* </Router> */}
            </Provider>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    
  );
}
