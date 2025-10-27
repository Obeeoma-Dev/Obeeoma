import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "../store/store";
import { getDashboardRoute, hasRoutePermission } from "../utils/routing";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "employer" | "employee";
}

/**
 * ProtectedRoute component that checks user authentication and role-based access
 * @param children - The component to render if access is granted
 * @param requiredRole - Optional specific role required to access this route
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const { user, isLoading } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-center">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Checking access...</p>
        </div>
      </div>
    );
  }

  // If no user, redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If specific role is required, check if user has that role
  if (requiredRole && user.role !== requiredRole) {
    // Redirect to user's appropriate dashboard
    const dashboardRoute = getDashboardRoute(user);
    return <Navigate to={dashboardRoute} replace />;
  }

  // Check if user has permission to access this route
  if (!hasRoutePermission(user, location.pathname)) {
    const dashboardRoute = getDashboardRoute(user);
    return <Navigate to={dashboardRoute} replace />;
  }

  // User is authenticated and has permission, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;

