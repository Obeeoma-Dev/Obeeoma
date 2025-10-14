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
import Subscription from "./pages/Subscription";
import NotFound from "./pages/NotFound";
import { Provider } from 'react-redux';
import { store } from './../src/store/store';
// pages/System admin import.
import Dashboard from "./pages/Systemadmin/Dashboard";
const queryClient = new QueryClient();
export default function App() {
    return (_jsx(QueryClientProvider, { client: queryClient, children: _jsxs(TooltipProvider, { children: [_jsx(Toaster, {}), _jsx(BrowserRouter, { children: _jsx(Provider, { store: store, children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Navigate, { to: "/index", replace: true }) }), _jsx(Route, { path: "/index", element: _jsx(Index, {}) }), _jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/signup", element: _jsx(CreateAccount, {}) }), _jsx(Route, { path: "/reset-password", element: _jsx(ResetPassword, {}) }), _jsx(Route, { path: "/reset-password-signin", element: _jsx(ResetPasswordSignin, {}) }), _jsx(Route, { path: "/employee-dashboard", element: _jsx(EmployeeDashboard, {}) }), _jsx(Route, { path: "/subscription", element: _jsx(Subscription, {}) }), _jsx(Route, { path: "*", element: _jsx(NotFound, {}) })] }) }) })] }) }));
}
