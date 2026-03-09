// import React from "react";
// import { useSelector } from "react-redux";
// import { Navigate, useLocation } from "react-router-dom";
// import { RootState } from "../store/store";
// import { getDashboardRoute, hasRoutePermission } from "../utils/routing";

// interface ProtectedRouteProps {
//   children: React.ReactNode;
//   requiredRole?: "admin" | "employer" | "employee";
// }

// /**
//  * ProtectedRoute component that checks user authentication and role-based access
//  * @param children - The component to render if access is granted
//  * @param requiredRole - Optional specific role required to access this route
//  */
// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
//   children,
//   requiredRole
// }) => {
//   const { user, isLoading } = useSelector((state: RootState) => state.auth);
//   const location = useLocation();

//   // Show loading while checking authentication
//   if (isLoading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center min-vh-100">
//         <div className="text-center">
//           <div className="spinner-border text-success" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//           <p className="mt-3 text-muted">Checking access...</p>
//         </div>
//       </div>
//     );
//   }

//   // If no user, redirect to login
//   if (!user) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   // If specific role is required, check if user has that role
//   if (requiredRole && user.role !== requiredRole) {
//     // Redirect to user's appropriate dashboard
//     const dashboardRoute = getDashboardRoute(user);
//     return <Navigate to={dashboardRoute} replace />;
//   }

//   // Check if user has permission to access this route
//   if (!hasRoutePermission(user, location.pathname)) {
//     const dashboardRoute = getDashboardRoute(user);
//     return <Navigate to={dashboardRoute} replace />;
//   }

//   // User is authenticated and has permission, render the protected content
//   return <>{children}</>;
// };

// export default ProtectedRoute;
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
import { logout } from "../store/slices/authSlice";

// Selector to check authentication status
const selectIsAuthenticated = (state: RootState) => {
  // Check if a user object and a token exist in the Redux store
  return !!state.auth.user && !!state.auth.token;
};

// Token validation function
const validateToken = (token: string): boolean => {
  try {
    // Simple JWT token validation (check if token is not expired)
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp > currentTime;
  } catch (error) {
    // If token is malformed, consider it invalid
    return false;
  }
};

// This component checks if the user is logged in and validates the token.
// It also prevents browser back/forward button access to protected routes.
const ProtectedRoute: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const authState = useSelector((state: RootState) => state.auth);
  const [isValidating, setIsValidating] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);

  useEffect(() => {
    const validateAuthentication = async () => {
      setIsValidating(true);

      if (!isAuthenticated) {
        setTokenValid(false);
        setIsValidating(false);
        return;
      }

      // Get token from Redux or localStorage
      const token = authState.token || localStorage.getItem("token");

      if (!token) {
        setTokenValid(false);
        setIsValidating(false);
        return;
      }

      // Validate token format and expiration
      const isValid = validateToken(token);

      if (!isValid) {
        // Token is invalid/expired, logout user
        dispatch(logout());
        setTokenValid(false);
      } else {
        setTokenValid(true);
      }

      setIsValidating(false);
    };

    validateAuthentication();
  }, [isAuthenticated, location.pathname, dispatch, authState.token]);

  // Handle browser back/forward button attempts
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      // Always validate on popstate (back/forward button)
      if (!tokenValid || !isAuthenticated) {
        // Prevent navigation and redirect to login
        event.preventDefault();
        navigate("/login", { replace: true });

        // Push login state to history to prevent forward navigation
        window.history.pushState({ noBack: true }, "", "/login");

        // Force replace current history entry
        window.history.replaceState({ noBack: true }, "", "/login");
      }
    };

    // Add the popstate listener
    window.addEventListener("popstate", handlePopState);

    // Initial history setup for authenticated users
    if (isAuthenticated && tokenValid) {
      window.history.replaceState(
        { authenticated: true },
        "",
        location.pathname,
      );
    } else {
      // For unauthenticated users, ensure login is the only entry
      window.history.replaceState({ noBack: true }, "", "/login");
      window.history.pushState({ noBack: true }, "", "/login");
    }

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [tokenValid, isAuthenticated, navigate, location.pathname]);

  // Show loading while validating authentication
  if (isValidating) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-center">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Validating session...</span>
          </div>
          <p className="mt-3 text-muted">Validating your session...</p>
        </div>
      </div>
    );
  }

  // If the user is NOT authenticated or token is invalid, redirect to login
  if (!isAuthenticated || !tokenValid) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If the user IS authenticated with valid token, render the child route component.
  return <Outlet />;
};

export default ProtectedRoute;
