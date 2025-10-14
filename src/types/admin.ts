// --- Type Definitions (You would define these in your 'types/admin.ts' file) ---

// Define the shape of a User object retrieved by the Admin
interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: "admin" | "employer" | "user";
  is_active: boolean;
  date_joined: string;
}

// Define the shape of the Admin Dashboard state
interface AdminState {
  users: AdminUser[];
  dashboardStats: any; // Use a specific type here if known
  isLoading: boolean;
  error: string | null;
}
