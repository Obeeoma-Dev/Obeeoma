// Import the Axios HTTP client
import axios from "axios";

// Import types for login and registration credentials
import { LoginCredentials, RegisterCredentials } from "@/types/auth";

// Define the base URL for API requests, using environment variable or fallback
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

// Log the resolved base URL for debugging purposes
console.log("API Base URL:", API_BASE_URL); // Debug log

// Create a reusable Axios instance with the base URL
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add a request interceptor to attach the token and log outgoing requests
api.interceptors.request.use(
  (config) => {
    // Log method, URL, and payload before sending the request
    console.log("🔄 Making API Request:", {
      method: config.method,
      url: config.url,
      data: config.data,
    });

    // Retrieve token from localStorage and attach it to Authorization header
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Return the modified config to proceed with the request
    return config;
  },
  (error) => {
    // Log request error and reject the promise
    console.error("🚨 Request Error:", error);
    return Promise.reject(error);
  },
);

// Add a response interceptor to log successful and failed responses
api.interceptors.response.use(
  (response) => {
    // Log status, data, and URL on success
    console.log("✅ API Response Success:", {
      status: response.status,
      data: response.data,
      url: response.config.url,
    });
    return response;
  },
  (error) => {
    // Log error details on failure
    console.error("🚨 API Response Error:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
      url: error.config?.url,
    });
    return Promise.reject(error);
  },
);

// Export auth-related API methods
export const authAPI = {
  // Login endpoint
  login: async (credentials: LoginCredentials) => {
    const response = await api.post("/v1/auth/login/", credentials);
    return response;
  },

  // Register endpoint
  register: async (credentials: RegisterCredentials) => {
    const response = await api.post("/v1/auth/register/", {
      username: credentials.username,
      email: credentials.email,
      password: credentials.password,
    });
    return response;
  },

  // Logout utility: clears token and user info from localStorage
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
};

// Added to fix the TS2305 error in adminSlice.ts
// Export admin-related API methods
export const adminAPI = {
  // Fetch dashboard statistics
  getDashboardStats: async () => {
    return await api.get("/v1/admin/dashboard-stats/");
  },

  // Fetch all users
  getAllUsers: async () => {
    return await api.get("/v1/admin/users/");
  },

  // Delete a user by ID
  deleteUser: async (userId: string | number) => {
    return await api.delete(`/v1/admin/users/${userId}/`);
  },
};