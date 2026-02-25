import React from "react";
import { Toaster } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./../src/store/store";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import ProtectedRoute from "./components/ProtectedRoute";
import HistoryGuard from "./components/HistoryGuard";

// Pages
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ResetPassword from "./pages/auth/ResetPassword";
import ChangePassword from "./pages/auth/changePassword";
import OtpVerificationPage from "./pages/auth/otpVerification";
import ResetPasswordSignin from "./pages/auth/ResetPasswordSignin";
import MfaSetupPage from "./pages/auth/mfauth";
import AcceptInvite from "./pages/auth/accept-invite";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import EmployerDashboard from "./pages/EmployerPages/EmployerDashboard";
import EmployerAccountSettingsPage from "./pages/EmployerPages/AccountSettings";
import NotFound from "./pages/NotFound";

// Systemadmin routes.
import SysAdminDashboard from "./pages/Systemadmin/Dashboard";
import Organisation from "./pages/Systemadmin/OrganisationPages/organizations";
import { OrganizationDetails } from "./pages/Systemadmin/OrganisationPages/organizationDetails";
import { ContentManagement } from "./pages/Systemadmin/ContentManager/contentManagementPage";
import ClientEngagement from "./pages/Systemadmin/Clientengagmentpages/clientEngagement";
import AIRecommendationsPage from "./pages/Systemadmin/Airecommendations/aimanagment";
import HotlineActivity from "./pages/Systemadmin/Hotlinepages/hotlineActivity";
import SubscriptionPage from "./pages/Systemadmin/Subscriptionpages/subscription";
import ReportPage from "./pages/Systemadmin/Reportpages/report";
import SubscriptionEditor from "./pages/Systemadmin/Subscriptionpages/subscriptionEditor";
import AdminSettings from "./pages/Systemadmin/adminsettings";

import EmployerAccountProfile from "./pages/EmployerPages/AccountSettings";
import EditEmployerProfilePage from "./pages/EmployerPages/EditEmployerProfilePage";
import EmployerSubscription from "./pages/EmployerPages/Subscription";
import EmployerNotificationPage from "./pages/EmployerPages/EmployerNotificationPage";
import CompanyReports from "./pages/EmployerPages/CompanyReports";
import PaymentSuccessPage from "./pages/EmployerPages/Successmessage";
import EmployeeLandingPage from "./pages/landingpage/EmployeeLandingPage";
import EmployeeManagement from "./pages/EmployerPages/EmployeeManagement";
import Aboutus from "./pages/landingpage/Aboutpages/about";
import { ContactPage } from "./pages/landingpage/Contacts/contactUs";
import { Blog } from "./pages/landingpage/Blogpages/blog";
import { PrivacyPolicy } from "./pages/landingpage/Policy";
import { TermsAndConditions } from "./pages/landingpage/Terms";
import { ContentDetail } from "./pages/Systemadmin/ContentManager/contentView";

const queryClient = new QueryClient();

export default function App(): React.ReactElement {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          {/* Redux Provider wraps all routes */}
          <Provider store={store}>
            <HistoryGuard>
              <Routes>
                {/* === PUBLIC ROUTES === */}
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Register />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/change-password" element={<ChangePassword />} />
                <Route
                  path="/reset-password-signin"
                  element={<ResetPasswordSignin />}
                />
                <Route path="/accept-invite" element={<AcceptInvite />} />
                <Route path="/otp-verify" element={<OtpVerificationPage />} />
                <Route path="/mfa-setup" element={<MfaSetupPage />} />
                <Route path="/about-us" element={<Aboutus />} />
                <Route path="/contact-us" element={<ContactPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsAndConditions />} />
                <Route path="/blog" element={<Blog />} />
                <Route
                  path="/employer-subscription"
                  element={<EmployerSubscription />}
                />
                <Route
                  path="/success-message"
                  element={<PaymentSuccessPage />}
                />
                {/* === PROTECTED ROUTES WRAPPER === */}
                <Route element={<ProtectedRoute />}>
                  {/* EMPLOYEE'S ROUTES */}
                  <Route
                    path="/employee-dashboard"
                    element={<EmployeeDashboard />}
                  />
                  <Route
                    path="/employee-downloadapp"
                    element={<EmployeeLandingPage />}
                  />
                  {/* EMPLOYER'S ROUTES */}
                  <Route
                    path="/organization-reports"
                    element={<CompanyReports />}
                  />
                  <Route
                    path="/employer-dashboard"
                    element={<EmployerDashboard companyId="your-company-id" />}
                  />
                  <Route
                    path="/employee-management"
                    element={<EmployeeManagement />}
                  />
                  <Route
                    path="/employer-profile"
                    element={<EmployerAccountProfile />}
                  />
                  <Route
                    path="/edit-profile"
                    element={<EditEmployerProfilePage />}
                  />
                  <Route
                    path="/employer-notifications"
                    element={<EmployerNotificationPage />}
                  />
                  <Route
                    path="/employer-settings"
                    element={<EmployerAccountSettingsPage />}
                  />
                  {/* SYSTEMS ADMIN ROUTES */}
                  <Route path="/system-admin" element={<SysAdminDashboard />} />
                  <Route
                    path="/system-admin/organizations"
                    element={<Organisation />}
                  />
                  <Route
                    path="/systemadmin/organizations/:id"
                    element={<OrganizationDetails />}
                  />
                  <Route
                    path="/system-admin/client-engagement"
                    element={<ClientEngagement />}
                  />
                  <Route
                    path="/system-admin/ai-management"
                    element={<AIRecommendationsPage />}
                  />
                  <Route
                    path="/system-admin/hotline-activity"
                    element={<HotlineActivity />}
                  />
                  <Route
                    path="/system-admin/content-management"
                    element={<ContentManagement />}
                  />
                  <Route
                    path="/system-admin/reports"
                    element={<ReportPage />}
                  />
                  <Route
                    path="/system-admin/content-management/view/:id"
                    element={<ContentDetail />}
                  />

                  {/* Admin Settings Routes */}
                  <Route
                    path="/system-admin/system-subscriptions"
                    element={<SubscriptionPage />}
                  />
                  <Route
                    path="/system-admin/settings-overview"
                    element={<AdminSettings />}
                  />
                  <Route
                    path="/settings-overview/subscription-editor"
                    element={<SubscriptionEditor />}
                  />
                </Route>
                {/* End ProtectedRoute */}
                {/* === CATCH-ALL ROUTE === */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </HistoryGuard>
          </Provider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
