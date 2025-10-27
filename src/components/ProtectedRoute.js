import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { getDashboardRoute, hasRoutePermission } from "../utils/routing";
/**
 * ProtectedRoute component that checks user authentication and role-based access
 * @param children - The component to render if access is granted
 * @param requiredRole - Optional specific role required to access this route
 */
const ProtectedRoute = ({ children, requiredRole }) => {
    const { user, isLoading } = useSelector((state) => state.auth);
    const location = useLocation();
    // Show loading while checking authentication
    if (isLoading) {
        return (_jsx("div", { className: "d-flex justify-content-center align-items-center min-vh-100", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "spinner-border text-success", role: "status", children: _jsx("span", { className: "visually-hidden", children: "Loading..." }) }), _jsx("p", { className: "mt-3 text-muted", children: "Checking access..." })] }) }));
    }
    // If no user, redirect to login
    if (!user) {
        return _jsx(Navigate, { to: "/login", state: { from: location }, replace: true });
    }
    // If specific role is required, check if user has that role
    if (requiredRole && user.role !== requiredRole) {
        // Redirect to user's appropriate dashboard
        const dashboardRoute = getDashboardRoute(user);
        return _jsx(Navigate, { to: dashboardRoute, replace: true });
    }
    // Check if user has permission to access this route
    if (!hasRoutePermission(user, location.pathname)) {
        const dashboardRoute = getDashboardRoute(user);
        return _jsx(Navigate, { to: dashboardRoute, replace: true });
    }
    // User is authenticated and has permission, render the protected content
    return _jsx(_Fragment, { children: children });
};
export default ProtectedRoute;
