// // --- Type Definitions (You would define these in your 'types/admin.ts' file) ---

// // Define the shape of a User object retrieved by the Admin
interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: "admin" | "employer" | "user";
  is_active: boolean;
  date_joined: string;
}

// // Define the shape of the Admin Dashboard state
export interface AdminState {
  users: AdminUser[];
  dashboardStats: number | null; // Example statistic, can be expanded
  isLoading: boolean;
  error: string | null;
}
