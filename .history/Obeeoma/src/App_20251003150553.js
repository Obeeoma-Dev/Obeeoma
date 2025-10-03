import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
<<<<<<< HEAD
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// Pages
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import CreateAccount from "./pages/auth/Register";
import ResetPassword from "./pages/auth/ResetPassword";
import ResetPasswordSignin from "./pages/auth/ResetPasswordSignin";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import NotFound from "./pages/NotFound";
import EmployerDashboard from "./pages/EmployerDashboard";
const queryClient = new QueryClient();
export default function App() {
    return (_jsx(QueryClientProvider, { client: queryClient, children: _jsxs(TooltipProvider, { children: [_jsx(Toaster, {}), _jsx(BrowserRouter, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Navigate, { to: "/login", replace: true }) }), _jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/signup", element: _jsx(CreateAccount, {}) }), _jsx(Route, { path: "/reset-password", element: _jsx(ResetPassword, {}) }), _jsx(Route, { path: "/reset-password-signin", element: _jsx(ResetPasswordSignin, {}) }), _jsx(Route, { path: "/employee-dashboard", element: _jsx(EmployeeDashboard, {}) }), _jsx(Route, { path: "/employer-dashboard", element: _jsx(EmployerDashboard, {}) }), _jsx(Route, { path: "/index", element: _jsx(Index, {}) }), _jsx(Route, { path: "*", element: _jsx(NotFound, {}) })] }) })] }) }));
}
=======
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import EmployerDashboard from "./pages/EmployerDashboard";
const queryClient = new QueryClient();
const App = () => (_jsx(QueryClientProvider, { client: queryClient, children: _jsxs(TooltipProvider, { children: [_jsx(Toaster, {}), _jsx(BrowserRouter, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Index, {}) }), _jsx(Route, { path: "/employer-dashboard", element: _jsx(EmployerDashboard, {}) }), _jsx(Route, { path: "*", element: _jsx(NotFound, {}) })] }) })] }) }));
export default App;
>>>>>>> 0625a07dda717cadb4821efcc497060fe62f6081
