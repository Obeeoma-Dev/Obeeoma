import axios from "axios";
import { RootState } from '../store/store';
import {
  LoginCredentials,
  RegisterCredentials,
  ForgotPasswordData,
  changePasswordData,
  OtpVerificationPayload
} from "@/types/auth";

// --- Configuration ---
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
export const INVITE_EMPLOYEE_URL = "/v1/employers/invite-employee/";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- Interceptors ---
export const setupApiInterceptors = (store: { getState: () => RootState }) => {
  // Request Interceptor
  api.interceptors.request.use(
    (config) => {
      const requestPath = config.url || '';
      const publicEndpoints = [
        "/v1/auth/login/",
        "/v1/auth/signup/",
        "/v1/auth/reset-password/",
        "/v1/auth/change-password",
        "v1/organization-signup/",
        "v1/dashboard/overview/",
        "v1/auth/verify-invite/",




      ];
      
      const isPublicEndpoint = publicEndpoints.some(path => requestPath.endsWith(path));
      const state = store.getState();
      const token = state.auth.token;
      const persistedToken = localStorage.getItem('token');
      const activeToken = token || persistedToken;

      if (activeToken && !isPublicEndpoint) {
        config.headers.Authorization = `Bearer ${activeToken}`;
      } else if (isPublicEndpoint) {
        delete config.headers.Authorization;
      }

      console.log("Making API Request:", {
        method: config.method,
        url: config.url,
        data: config.data,
        token_injected: !!(activeToken && !isPublicEndpoint),
      });

      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response Interceptor
  api.interceptors.response.use(
    (response) => {
      console.log("API Response Success:", {
        status: response.status,
        data: response.data,
        url: response.config.url,
      });
      return response;
    },
    (error) => {
      console.error("API Response Error:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
        url: error.config?.url,
      });
      return Promise.reject(error);
    }
  );
};

// --- Auth API ---
export const authAPI = {
  login: async (credentials: LoginCredentials) => {
    const response = await api.post("/v1/auth/login/", credentials);
    return response;
  },

  register: async (credentials: RegisterCredentials) => {
    const response = await api.post("/v1/organization-signup/", {
      organizationName: credentials.organizationName,
      phoneNumber: credentials.phoneNumber,
      organisationSize: credentials.organisationSize,
      companyEmail: credentials.companyEmail,
      Location: credentials.Location,
      contactPerson: 
        {
          firstName: credentials.contactPerson.firstName, 
          lastName: credentials.contactPerson.lastName,
          role: credentials.contactPerson.role,
          email: credentials.contactPerson.email, 
        },
  

      password: credentials.password,
      confirmPassword: credentials.confirmPassword,
    });

    if (response.data.access) {
      localStorage.setItem("token", response.data.access);
    }

    return response.data;
  },

  logout: async () => {
    const refreshToken = localStorage.getItem('refresh');
    const accessToken = localStorage.getItem('token');
    return api.post(
      '/v1/auth/logout/',
      { refresh: refreshToken },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );
  },

  forgotPassword: async (data: ForgotPasswordData) => {
    const response = await api.post("/v1/auth/reset-password/", data);
    return response;
  },

  changePassword: async (data: changePasswordData) => {
    const response = await api.post("/v1/auth/change-password", data);
    return response;
  },

  getCurrentUser: async () => {
    const response = await api.get("/v1/auth/me/");
    return response;
  },

  verifyOtp: async (payload: OtpVerificationPayload) => {
    const response = await api.post("v1/auth/verify-invite/", payload);
    return response;
  },

resendOtp: (payload: OtpVerificationPayload) => {
        return api.post('v1/auth/verify-invite', payload);
    
    },
};

// --- Admin API ---
export const adminAPI = {
  // Dashboard
  getDashboardStats: async () => {
    const response = await api.get("/v1/admin/statistics/");
    return response;
  },

  getDashboardSummary: async () => {
    const response = await api.get("/v1/admin/overview");
    return response;
  },

  // Users
  getAllUsers: async () => {
    const response = await api.get("/v1/admin/users/");
    return response;
  },

  deleteUser: async (userId: string | number) => {
    const response = await api.delete(`/v1/admin/users/${userId}/`);
    return response;
  },

  // Employee Management
  addEmployee: async () => {
    const response = await api.post("/v1/admin/invites/");
    return response;
  },

  viewInviteEmployee: async () => {
    const response = await api.get("/v1/employers/view-invites/");
    return response;
  },

  // Crisis Insights
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

  // Analytics
  getEmployeeEngagement: async () => {
    const response = await api.post("/v1/admin/employee-engagement/");
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

  // Feature Usage
  createFeatureUsage: async () => {
    const response = await api.post("/v1/admin/feature-usage");
    return response;
  },

  // Billing
  viewSubscription: async () => {
    const response = await api.post("/v1/employer/billing/add-subscription/");
    return response;
  },

  viewBilling: async () => {
    const response = await api.get("/v1/employer/billing/view");
    return response;
  },
};

// --- Employer API ---
export const employerAPI = {
  // Profile
  getCurrentEmployer: async () => {
    const response = await api.get("/v1/users/");
    return response;
  },

  // Dashboard Settings
  getDashboardSettings: async () => {
    const response = await api.get("/v1/settings/");
    return response;
  },

  //change links back to correct ones it i
  // Employee Management
  inviteEmployee: async (employeeData: { email: string; phone?: string; department: string }) => {
    const response = await api.post("/v1/invitations/", employeeData);
    return response;
  },

  viewInviteEmployee: async () => {
    const response = await api.get("/v1/invitations/");
    return response;
  },

  getEmployees: async () => {
    const response = await api.get("/v1/invitations/");
    return response;
  },

  // Analytics & Dashboard
  getemployerdashboardSummary: async () => {
    const response = await api.get("/v1/invitations/");
    return response;
  },

  getEngagement: async () => {
    const response = await api.get("/v1/tests-by-type/");
    return response;
  },

  getReports: async () => {
    const response = await api.post("/v1/wellness-reports/");
    return response;
  },

  // Wellness Data
  getMoodTrends: async () => {
    const response = await api.get("/v1/progress/");
    return response;
  },

  getDepartmentDistribution: async () => {
    const response = await api.get("/v1/invitations/");
    return response;
  },

    postDepartmentDistribution: async () => {
    const response = await api.post("/v1/invitations/");
    return response;
  },


  getWellnessTrend: async () => {
    const response = await api.get("/v1/progress/");
    return response;
  },

  getRecentActivities: async () => {
    const response = await api.get("/v1/dashboard/recent-activities/");
    return response;
  },

  // Billing
  viewSubscription: async () => {
    const response = await api.post("/v1/dashboard/billing/add-subscription/");
    return response;
  },

  viewBilling: async () => {
    const response = await api.get("/v1/dashboard/billing/view");
    return response;
  },
};

export default api;