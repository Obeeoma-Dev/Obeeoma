import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "../store/store";
import { logout } from "../store/slices/authSlice";

interface AuthGuardProps {
  children: React.ReactNode;
}

// Token validation function
const validateToken = (token: string): boolean => {
  try {
    // Simple JWT token validation (check if token is not expired)
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp > currentTime;
  } catch (error) {
    // If token is malformed, consider it invalid
    return false;
  }
};

// Enhanced authentication validation
const validateAuthentication = (state: any): boolean => {
  // Check Redux state first
  if (state.auth?.user && state.auth?.token) {
    const tokenValid = validateToken(state.auth.token);
    if (tokenValid) return true;
    
    // If token is invalid, check localStorage as fallback
    const localToken = localStorage.getItem('token');
    const localUser = localStorage.getItem('user');
    
    if (localToken && localUser) {
      return validateToken(localToken);
    }
  }
  
  // Fallback to localStorage
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  
  return !!(token && user && validateToken(token));
};

// AuthGuard component that validates authentication on every route change
const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const authState = useSelector((state: RootState) => state.auth);
  const [isValid, setIsValid] = useState(false);
  const [isValidating, setIsValidating] = useState(true);

  useEffect(() => {
    const validate = () => {
      setIsValidating(true);
      
      const authValid = validateAuthentication({ auth: authState });
      
      if (!authValid) {
        // Clear invalid authentication data
        dispatch(logout());
        setIsValid(false);
      } else {
        setIsValid(true);
      }
      
      setIsValidating(false);
    };

    validate();
  }, [location.pathname, authState, dispatch]);

  // Show loading during validation
  if (isValidating) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-center">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Validating authentication...</span>
          </div>
          <p className="mt-3 text-muted">Validating your session...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isValid) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated, render children
  return <>{children}</>;
};

export default AuthGuard;
