import axios from "axios";

import {
  LoginCredentials,
  RegisterCredentials,
  ForgotPasswordData,
  changePasswordData,
} from "@/types/auth";
// import { SubscriptIcon } from "lucide-react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
console.log("API Base URL:", API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    console.log("🔄 Making API Request:", {
      method: config.method,
      url: config.url,
      data: config.data,
    });

    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error("🚨 Request Error:", error);
    return Promise.reject(error);
  },
);

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log("✅ API Response Success:", {
      status: response.status,
      data: response.data,
      url: response.config.url,
    });
    return response;
  },
  (error) => {
    console.error("🚨 API Response Error:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
      url: error.config?.url,
    });
    return Promise.reject(error);
  },
);

export const authAPI = {
  login: async (credentials: LoginCredentials) => {
    const response = await api.post("/v1/auth/login/", credentials);
    return response;
  },

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

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  forgotPassword: async (data: ForgotPasswordData) => {
    const response = await api.post("/v1/auth/forgot-password/", data);
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
    const response = await api.get("/v1/dashboard/statistics/");
    return response;
  },

  getAllUsers: async () => {
    const response = await api.get("/v1/dashboard/users/");
    return response;
  },

  // Deleting a user
  deleteUser: async (userId: string | number) => {
    const response = await api.delete(`/v1/dashboard/users/${userId}/`);
    return response;
  },
};

export const employerAPI = {
  getDashboardSummary: async () => {
    const response = await api.get("/v1/dashboard/overview");
    return response;
  },

  addEmployee: async () => {
    const response = await api.post("/v1/dashboard/invites/");
    return response;
  },

  getCrisisInsights: async () => {
    const response = await api.get("/v1/dashboard/overview");
    return response;
  },

  getEmployeeEngagement: async () => {
    const response = await api.post("/v1/dashboard/employee-engagement/");
    return response;
  },

  // getFeatureUsage: async (jobData: ) => {
  //   const response = await api.get("/v1/dashboard/feature-usage/");
  //   return response;
  // },

  createFeatureUsage: async () => {
    const response = await api.post("/v1/dashboard/feature-usage");
    return response;
  },

  getReports: async () => {
    const response = await api.post("/v1/dashboard/reports/");
    return response;
  },

  getTrends: async () => {
    const response = await api.get("/v1/dashboard/trends");
    return response;
  },

  // employer endpoints
  inviteEmployee: async () => {
    const response = await api.post("/v1/employers/");
    return response;
  },

  viewSubscription: async () => {
    const response = await api.post("/v1/employer/billing/");
    return response;
  },

  viewBilling: async () => {
    const response = await api.get("/v1/employer/billing/view");
    return response;
  },

  getOverview: async () => {
    const response = await api.get("/v1/employer/jobs/overview/");
    return response;
  },
};

export default api;
