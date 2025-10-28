import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserDashboardRoute } from "../store/slices/authSlice";
/**
 * DashboardRouter component handles role-based routing after login
 * This component automatically redirects users to their appropriate dashboard
 * based on their role stored in Redux state
 */
const DashboardRouter = () => {
    const navigate = useNavigate();
    const { user, isLoading } = useSelector((state) => state.auth);
    const dashboardRoute = useSelector(selectUserDashboardRoute);
    useEffect(() => {
        // Only redirect if we have user data and not loading
        if (!isLoading && user) {
            navigate(dashboardRoute, { replace: true });
        }
        else if (!isLoading && !user) {
            // If no user data and not loading, redirect to login
            navigate("/login", { replace: true });
        }
    }, [user, isLoading, navigate, dashboardRoute]);
    // Show loading while determining where to redirect
    return (_jsx("div", { className: "d-flex justify-content-center align-items-center min-vh-100", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "spinner-border text-success", role: "status", children: _jsx("span", { className: "visually-hidden", children: "Loading..." }) }), _jsx("p", { className: "mt-3 text-muted", children: "Redirecting to your dashboard..." })] }) }));
};
export default DashboardRouter;
