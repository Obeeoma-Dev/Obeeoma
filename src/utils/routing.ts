import { User } from "../types/auth";

/**
 * Utility function to get the appropriate dashboard route based on user role
 * @param user - The user object containing role information
 * @returns The dashboard route path for the user's role
 */
export const getDashboardRoute = (user: User | null): string => {
  if (!user) {
    return "/login";
  }

  switch (user.role) {
    case "system admin":
      return "/system-admin";
    case 'employer':
      return "/employer-dashboard";
    case 'employee':
      return "/employee-dashboard";
    default:
      console.warn(`Unrecognized role: ${user.role}. Redirecting to default.`);
      return "/";
  }
};

/**
 * Utility function to check if a user has permission to access a specific route
 * @param user - The user object containing role information
 * @param route - The route to check access for
 * @returns boolean indicating if the user can access the route
 */
export const hasRoutePermission = (user: User | null, route: string): boolean => {
  if (!user) {
    return false;
  }

  const userDashboard = getDashboardRoute(user);
  
  // Check if the route starts with the user's dashboard path
  return route.startsWith(userDashboard) || 
         route === "/dashboard" || 
         route === "/login" || 
         route === "/signup" ||
         route === "/reset-password" ||
         route === "/reset-password-signin";
};

/**
 * Role-based route mapping for easy reference
 */
export const ROLE_ROUTES = {
  admin: "/system-admin",
  employer: "/employer-dashboard", 
  employee: "/employee-dashboard"
} as const;

export type UserRole = keyof typeof ROLE_ROUTES;
