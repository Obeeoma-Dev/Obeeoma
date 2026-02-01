import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { RootState } from '../store/store';
import { logout } from '../store/slices/authSlice';

interface HistoryGuardProps {
  children: React.ReactNode;
}

// Global history guard to prevent unauthorized navigation
const HistoryGuard: React.FC<HistoryGuardProps> = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useSelector((state: RootState) => state.auth.user && state.auth.token);
  const lastValidLocation = useRef<string>('');
  const isBlocking = useRef<boolean>(false);

  // AGGRESSIVE CACHE CLEARING FUNCTION
  const clearCacheAndRedirect = (reason: string) => {
    console.log(`🧹 AGGRESSIVE CACHE CLEARING - Reason: ${reason}`);

    // Clear ALL storage immediately - no exceptions
    try {
      localStorage.clear();
      sessionStorage.clear();

      // Clear ALL caches - no exceptions
      if ('caches' in window) {
        caches.keys().then(names => {
          names.forEach(name => {
            caches.delete(name);
          });
        });
      }
    } catch (error) {
      console.log('Error clearing cache:', error);
    }

    // Force immediate redirect with cache busting
    const timestamp = Date.now();
    const newUrl = `/login?t=${timestamp}&reason=${reason}&forced=true`;

    // Use replace to prevent back navigation
    window.location.replace(newUrl);
  };

  useEffect(() => {
    // Check authentication status immediately
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');

      if (!token || !user) {
        return false;
      }

      // Validate token
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Date.now() / 1000;
        return payload.exp > currentTime;
      } catch (error) {
        return false;
      }
    };

    const isActuallyAuthenticated = checkAuth();

    // Force cache clearing if not authenticated
    if (!isActuallyAuthenticated) {
      const protectedRoutes = ['/system-admin', '/employer-dashboard', '/employee-dashboard'];
      const isProtectedRoute = protectedRoutes.some(route => location.pathname.startsWith(route));

      if (isProtectedRoute) {
        console.log('🚫 Unauthorized access detected - clearing cache');
        clearCacheAndRedirect('unauthorized_access');
        return;
      }
    }

    // Handle popstate events
    const handlePopState = (event: PopStateEvent) => {
      console.log('🔄 popstate event detected', event.state);

      // Check if navigating to protected route
      const protectedRoutes = ['/system-admin', '/employer-dashboard', '/employee-dashboard'];
      const isProtectedRoute = protectedRoutes.some(route => location.pathname.startsWith(route));

      if (isProtectedRoute && !isActuallyAuthenticated) {
        console.log('🚫 Blocking navigation to protected route');
        event.preventDefault();
        clearCacheAndRedirect('popstate_blocked');
        return;
      }

      // If on login page, prevent forward navigation
      if (location.pathname === '/login' && !isActuallyAuthenticated) {
        console.log('🚫 Preventing forward navigation from login');
        event.preventDefault();
        clearCacheAndRedirect('forward_blocked');
        return;
      }
    };

    // Add event listeners
    window.addEventListener('popstate', handlePopState);

    // Handle beforeunload to prevent caching
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!isActuallyAuthenticated && location.pathname !== '/login') {
        event.preventDefault();
        event.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Initial check - only redirect from PROTECTED routes, not public routes
    const publicRoutes = ['/', '/login', '/signup', '/reset-password', '/about-us', '/contact-us', '/privacy-policy', '/terms', '/blog', '/mfa-setup'];
    const isPublicRoute = publicRoutes.includes(location.pathname);

    if (!isActuallyAuthenticated && !isPublicRoute) {
      console.log('🔄 Initial redirect - not authenticated and trying to access protected route');
      clearCacheAndRedirect('initial_check');
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [location.pathname, isAuthenticated, navigate, dispatch]);

  // Monitor location changes - only redirect from protected routes
  useEffect(() => {
    const publicRoutes = ['/', '/login', '/signup', '/reset-password', '/about-us', '/contact-us', '/privacy-policy', '/terms', '/blog', '/mfa-setup'];
    const isPublicRoute = publicRoutes.includes(location.pathname);

    if (isAuthenticated) {
      lastValidLocation.current = location.pathname;
    } else {
      if (!isPublicRoute) {
        console.log('🔄 Location changed without auth - clearing cache');
        clearCacheAndRedirect('location_changed');
      }
    }
  }, [location.pathname, isAuthenticated]);

  return <>{children}</>;
};

export default HistoryGuard;
