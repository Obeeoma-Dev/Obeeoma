import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
import NotFound from "./pages/NotFound";
// pages/System admin import.
import SysAdminDashboard from "./pages/Systemadmin/Dashboard";
import Organisation from "./pages/Systemadmin/OrganisationPages/organizations";
import OrganisationDetails from "./pages/Systemadmin/OrganisationPages/organizationDetails";
import ClientEngagement from "./pages/Systemadmin/Clientengagmentpages/clientEngagement";
import AIRecommendationsPage from "./pages/Systemadmin/Airecommendations/aimanagment";
// System admin settings pages.
import AdminSettings from "./pages/Systemadmin/adminsettings";
import EmployerManagement from "./pages/EmployerPages/EmployeeManagement";
import Subscription from "./pages/EmployerPages/Subscription";
import EmployerAccountSettings from "./pages/EmployerPages/AccountSettings";
import { Provider } from "react-redux";
import { store } from "./../src/store/store";
const queryClient = new QueryClient();
export default function App() {
    return (_jsx(QueryClientProvider, { client: queryClient, children: _jsxs(TooltipProvider, { children: [_jsx(Toaster, {}), _jsx(BrowserRouter, { children: _jsx(Provider, { store: store, children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Navigate, { to: "/index", replace: true }) }), _jsx(Route, { path: "/index", element: _jsx(Index, {}) }), _jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/signup", element: _jsx(CreateAccount, {}) }), _jsx(Route, { path: "/reset-password", element: _jsx(ResetPassword, {}) }), _jsx(Route, { path: "/reset-password-signin", element: _jsx(ResetPasswordSignin, {}) }), _jsx(Route, { path: "/employee-dashboard", element: _jsx(EmployeeDashboard, {}) }), _jsx(Route, { path: "/subscription", element: _jsx(Subscription, {}) }), _jsx(Route, { path: "/employer-dashboard", element: _jsx(EmployerDashboard, {}) }), _jsx(Route, { path: "/system-admin/organizations", element: _jsx(Organisation, {}) }), _jsx(Route, { path: "/systema-dmin/organizations/:id", element: _jsx(OrganisationDetails, {}) }), _jsx(Route, { path: "/system-admin/client-engagement", element: _jsx(ClientEngagement, {}) }), _jsx(Route, { path: "/system-admin/ai-management", element: _jsx(AIRecommendationsPage, {}) }), _jsx(Route, { path: "/system-admin", element: _jsx(SysAdminDashboard, {}) }), _jsx(Route, { path: "/system-admin/settings-overview", element: _jsx(AdminSettings, {}) }), _jsx(Route, { path: "*", element: _jsx(NotFound, {}) })] }) }) })] }) }));
}
