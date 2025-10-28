import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { selectUserDashboardRoute } from "../store/slices/authSlice";

/**
 * DashboardRouter component handles role-based routing after login
 * This component automatically redirects users to their appropriate dashboard
 * based on their role stored in Redux state
 */
const DashboardRouter: React.FC = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useSelector((state: RootState) => state.auth);
  const dashboardRoute = useSelector(selectUserDashboardRoute);

  useEffect(() => {
    // Only redirect if we have user data and not loading
    if (!isLoading && user) {
      navigate(dashboardRoute, { replace: true });
    } else if (!isLoading && !user) {
      // If no user data and not loading, redirect to login
      navigate("/login", { replace: true });
    }
  }, [user, isLoading, navigate, dashboardRoute]);

  // Show loading while determining where to redirect
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="text-center">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Redirecting to your dashboard...</p>
      </div>
    </div>
  );
};

export default DashboardRouter;
