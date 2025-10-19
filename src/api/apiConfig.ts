// Import the Axios HTTP client
import axios from "axios";

import {
  LoginCredentials,
  RegisterCredentials,
  ForgotPasswordData,
  changePasswordData,
} from "@/types/auth";
// import { SubscriptIcon } from "lucide-react";

// Define the base URL for API requests, using environment variable or fallback
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
console.log("API Base URL:", API_BASE_URL);

// Create a reusable Axios instance with the base URL
const api = axios.create({
  baseURL: API_BASE_URL,
});

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
    const response = await api.post("/v1/auth/signup/", {
      username: credentials.username,
      email: credentials.email,
      password: credentials.password,
      confirm_password: credentials.confirm_password,
      role: credentials.role,
    });

    // If registration returns a token, store it
    if (response.data.access) {
      localStorage.setItem("token", response.data.access);
    }

    return response.data;
  },

  // Logout utility: clears token and user info from localStorage
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  forgotPassword: async (data: ForgotPasswordData) => {
    const response = await api.post("/v1/auth/reset-password/", data);
    return response;
  },

  // RESET PASSWORD
  changePassword: async (data: changePasswordData) => {
    const response = await api.post("/v1/auth/change-password/", data);
    return response;
  },

  getCurrentUser: async () => {
    const response = await api.get("/v1/auth/me/");
    return response;
  },
};

//  System Admin Dashboard

export const adminAPI = {
  getDashboardStats: async () => {
    const response = await api.get("/v1/admin/statistics/");
    return response;
  },

  getAllUsers: async () => {
    const response = await api.get("/v1/admin/users/");
    return response;
  },

  // Deleting a user
  deleteUser: async (userId: string | number) => {
    const response = await api.delete(`/v1/admin/users/${userId}/`);
    return response;
  },
  getDashboardSummary: async () => {
    const response = await api.get("/v1/admin/overview");
    return response;
  },

  addEmployee: async () => {
    const response = await api.post("/v1/admin/invites/");
    return response;
  },

  getCrisisInsights: async () => {
    const response = await api.get("/v1/admin/crisis-insights/views/");
    return response;
  },
  postCrisisInsights: async () => {
    const response = await api.post("/v1/admin/crisis-insights/add/");
    return response;
  },
    putCrisisInsights: async () => {
    const response = await api.post("/v1/admin/crisis-insights/update/");
    return response;
  },
  
    changeCrisisInsights: async () => {
    const response = await api.post("/v1/admin/crisis-insights/changes/");
    return response;
  },
  


  getEmployeeEngagement: async () => {
    const response = await api.post("/v1/admin/employee-engagement/");
    return response;
  },

  // getFeatureUsage: async (jobData: ) => {
  //   const response = await api.get("/v1/dashboard/feature-usage/");
  //   return response;
  // },

  createFeatureUsage: async () => {
    const response = await api.post("/v1/admin/feature-usage");
    return response;
  },

  getReports: async () => {
    const response = await api.post("/v1/admin/reports/");
    return response;
  },

  getTrends: async () => {
    const response = await api.get("/v1/admin/trends");
    return response;
  },

  // employer endpoints
  
};

export const employerAPI = {
  inviteEmployee: async () => {
    const response = await api.post("/v1/employers/");
    return response;
  },
   viewInviteEmployee: async () => {
    const response = await api.get("/v1/employers/view-invites/");
    return response;
  },


  viewSubscription: async () => {
    const response = await api.post("/v1/employer/billing/add-subscription/");
    return response;
  },

  viewBilling: async () => {
    const response = await api.get("/v1/employer/billing/view");
    return response;
  },

  getEngagement: async () => {
    const response = await api.get("/v1/employer/engagements/");
    return response;
  },

    getReports: async () => {
    const response = await api.post("/v1/employer/reports/");
    return response;
  },

  getemployerdashboardSummary: async () => {
    const response = await api.get("/v1/employer/overview");
    return response;
  },
};

export default api;
