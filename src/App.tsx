import React from "react";
import { Toaster } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./../src/store/store";
// import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

// Pages
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register"; // Renamed from CreateAccount in the comments
import ResetPassword from "./pages/auth/ResetPassword";
import OtpVerificationPage from './pages/auth/otpVerification';
import ResetPasswordSignin from "./pages/auth/ResetPasswordSignin";
import TermsPage from "./pages/landingpage/Terms";
import PrivacyPage from "./pages/landingpage/Policy";
import AcceptInvite from "./pages/auth/accept-invite";
import MfaSetupPage from "./pages/auth/mfauth";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import PaymentSuccessPage from './pages/EmployerPages/subscription/Successmessage';
import EmployeeLandingPage from "./pages/landingpage/Employeelandingpage";
import EmployerDashboard from "./pages/EmployerPages/EmployerDashboard";
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
import EmployerSubscription from "./pages/EmployerPages/Subscription";
import EmployerNotificationPage from "./pages/EmployerPages/EmployerNotificationPage";
import CompanyReports from "./pages/EmployerPages/CompanyReports";
import Aboutus from "./pages/landingpage/Aboutpages/about";
import { ContactPage } from "./pages/landingpage/Contacts/contactUs";
import { Blog } from "./pages/landingpage/Blogpages/blog";


const queryClient = new QueryClient();

export default function App(): React.ReactElement {

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          {/* Redux Provider wraps all routes */}
          <Provider store={store}>
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
              <Route path="/mfa-setup" element={<MfaSetupPage />} />
              <Route path="/about-us" element={<Aboutus />} />
              <Route path="/contact-us" element={<ContactPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/employee-downloadapp" element={<EmployeeLandingPage />} />
              {/* <Route path="/employee-downloadapp" element={<AppDownloadSection/>} /> */}
          

              {/* === PROTECTED ROUTES WRAPPER (Uncomment to activate) === */}
              {/* <Route element={<ProtectedRoute />}> */}

              {/* EMPLOYEE'S ROUTES */}
              <Route path="/employee-dashboard" element={<EmployeeDashboard />} />

              {/* EMPLOYER'S ROUTES */}
              <Route path="/organization-reports" element={<CompanyReports />} />
              <Route path="/employer-dashboard" element={<EmployerDashboard />} />
              <Route path="/employer-subscription" element={<EmployerSubscription />} />
              {/* <Route path="/employee-management" element={<EmployeeManagement />} /> */}
              {/* Note: EmployerAccountProfile and EmployerAccountSettingsPage seem to point to the same file, using both paths */}
              <Route path="/employer-profile" element={<EmployerAccountProfile />} />
              <Route path="/employer-notifications" element={<EmployerNotificationPage />} />
              {/* <Route path="/employer-settings" element={<EmployerAccountSettingsPage />} /> */}

              {/* SYSTEMS ADMIN ROUTES */}
              <Route path="/system-admin" element={<SysAdminDashboard />} /> {/* Main Admin Dashboard */}
              <Route path="/system-admin/organizations" element={<Organisation />} />
              <Route path="/systemadmin/organizations/:id" element={<OrganisationDetails />} />
              <Route path="/system-admin/client-engagement" element={<ClientEngagement />} />
              <Route path="/system-admin/ai-management" element={<AIRecommendationsPage />} />
              <Route path="/system-admin/hotline-activity" element={<HotlineActivity />} />
              <Route path="/system-admin/Subscriptions" element={<SubscriptionPage />} />
              <Route path="/system-admin/reports" element={<ReportPage />} />

              {/* SYSTEMS ADMIN SETTINGS ROUTES */}
              <Route path="/system-admin/settings-overview" element={<AdminSettings />} />
              <Route path="/settings-overview/subscription-editor" element={<SubscriptionEditor />} />
              <Route path="/success-message" element={<PaymentSuccessPage />} />
              <Route path="/success-message" element={<PaymentSuccessPage />} />
            

              {/* </Route> */} {/* End ProtectedRoute */}

              {/* === CATCH-ALL ROUTE === */}
              <Route path="*" element={<NotFound />} />

            </Routes>
          </Provider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>

  );
}