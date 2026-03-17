// Company logo API endpoints
export const LOGO_UPLOAD_URL = "/api/company/logo-upload";
export const LOGO_FETCH_URL = "/api/company/logo";
import axios from "axios";
import { RootState, store } from "../store/store";
import {
  LoginCredentials,
  RegisterCredentials,
  ForgotPasswordData,
  changePasswordData,
  OtpVerificationPayload,
  ChangePassword,
  MfaSetupRequestPayload,
} from "../types/auth";
import { Employee } from "../types/TData";

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api/v1/";
console.log("API Base URL:", API_BASE_URL);

export const INVITE_EMPLOYEE_URL = "/employers/invite-employee/";
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setupApiInterceptors = (store: { getState: () => RootState }) => {
  api.interceptors.request.use(
    (config) => {
      const requestPath = config.url || "";
      const publicEndpoints = [
        "auth/login/",
        "auth/signup/",
        "auth/reset-password/",
        "auth/reset-password/complete/",
        "organization-signup/",
        "auth/verify-invitation-otp/",
        "auth/mfa/setup/",
        "auth/mfa/verify/",
      ];

      const isPublicEndpoint = publicEndpoints.some(
        (path) => requestPath.includes(path) || requestPath.endsWith(path),
      );

      //check local storage first (more reliable)
      const persistedToken = localStorage.getItem("token");

      // checking the redux token as fallback
      const state = store.getState();
      const token = state.auth.token;

      const activeToken = persistedToken || token;

      // Special handling for MFA setup - use temp_token
      if (requestPath.includes("auth/mfa/setup/")) {
        const tempToken =
          localStorage.getItem("temp_token") || state.auth.tempToken;
        if (tempToken) {
          config.headers.Authorization = `Bearer ${tempToken}`;
          console.log("Using temp_token for MFA setup:", tempToken);
        }
      } else if (activeToken && !isPublicEndpoint) {
        //  "inject the authorization"
        config.headers.Authorization = `Bearer ${activeToken}`;
      } else if (isPublicEndpoint) {
        // to remove the token header for public endpoints
        delete config.headers.Authorization;
        // Also remove any existing Authorization header
        if (config.headers.Authorization) {
          delete config.headers.Authorization;
        }
      }
      console.log(" Making API Request:", {
        method: config.method,
        url: config.url,
        data: config.data,
        token_injected:
          !!(activeToken && !isPublicEndpoint) ||
          !!localStorage.getItem("temp_token"),
        token_source: persistedToken
          ? "localStorage"
          : token
            ? "redux"
            : "none",
      });
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  // api.interceptors.request.use(
  //   (config) => {
  //     console.log(" Making API Request:", {
  //       method: config.method,
  //       url: config.url,
  //       data: config.data,
  //     });

  //     return config;
  //   },
  // );

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
      // Log error details on failure
      console.error(" API Response Error:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
        url: error.config?.url,
      });
      return Promise.reject(error);
    },
  );
};
export const authAPI = {
  // Login endpoint — return full axios response so authSlice thunk can use response.data
  login: async (credentials: LoginCredentials) => {
    const response = await api.post("/auth/login/", credentials);
    return response;
  },

  // Register endpoint
  register: async (credentials: RegisterCredentials) => {
    const response = await api.post("/organization-signup/", {
      organizationName: credentials.organizationName,
      phoneNumber: credentials.phoneNumber,
      organisationSize: credentials.organisationSize,
      companyEmail: credentials.companyEmail,
      Location: credentials.Location,
      contactPerson: {
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
  //for logout
  logout: async () => {
    const refreshToken = localStorage.getItem("refresh");
    api.post("/auth/logout/", { refresh: refreshToken });
  },

  forgotPassword: async (data: ForgotPasswordData) => {
    const response = await api.post("/auth/reset-password/", data);
    return response;
  },

  // reset password
  changePassword: async (data: changePasswordData) => {
    const response = await api.post("/auth/reset-password/complete/", data);
    return response;
  },

  ChangeorgPassword: async (data: ChangePassword) => {
    const response = await api.post("/auth/change-password/", data);
    return response;
  },

  verifyOtp: async (payload: OtpVerificationPayload) => {
    const response = await api.post(
      "/auth/verify-password-reset-otp/",
      payload,
    );
    return response;
  },

  resendOtp: (payload: OtpVerificationPayload) => {
    return api.post("/auth/verify-password-reset-otp/", payload);
  },

  fetchMfaSetupData: async (payload: MfaSetupRequestPayload) => {
    // For MFA setup, we need to use the temp_token from login response
    const response = await api.post("/auth/mfa/setup/", payload);
    return response;
  },

  confirmMfaSetup: async (payload: { temp_token: string; code: string }) => {
    // The payload is expected to be an object: { temp_token: string, code: string }
    const response = await api.post("/auth/mfa/verify/", payload);
    return response;
  },
};

//  System Admin Dashboard

export const adminAPI = {
  getDashboardStats: async () => {
    const response = await api.get("/admin/statistics/");
    return response;
  },

  getAllUsers: async () => {
    const response = await api.get("/admin/users/");
    return response;
  },

  deleteUser: async (userId: string | number) => {
    const response = await api.delete(`/admin/users/${userId}/`);
    return response;
  },
  getDashboardSummary: async () => {
    const response = await api.get("admin/overview");
    return response;
  },

  getDashboardOverview: async () => {
    const response = await api.get("admin/overview/");
    return response;
  },

  getClientEngagement: async () => {
    const response = await api.get("admin/client-engagement/");
    return response;
  },

  getAIManagement: async () => {
    const response = await api.get("admin/ai-management/");
    return response;
  },

  getHotlineActivity: async () => {
    const response = await api.get("admin/hotline-activity/");
    return response;
  },

  // Organization management APIs
  getOrganizationsGrowthChart: async () => {
    const response = await api.get("/admin/organizations/growth-chart/");
    return response;
  },

  getOrganizationsClientDistribution: async () => {
    const response = await api.get("/admin/organizations/client-distribution/");
    return response;
  },

  // Get organizations list with pagination and search
  getOrganizationsList: async (page = 1, pageSize = 10, search = "") => {
    const params = new URLSearchParams({
      page: page.toString(),
      page_size: pageSize.toString(),
    });

    if (search) {
      params.append("search", search);
    }

    const response = await api.get(`/admin/organizations/?${params}`);
    return response;
  },

  addEmployee: async () => {
    const response = await api.post("/admin/invites/");
    return response;
  },

  getCrisisInsights: async () => {
    const response = await api.get("/admin/crisis-insights/views/");
    return response;
  },
  postCrisisInsights: async () => {
    const response = await api.post("/admin/crisis-insights/add/");
    return response;
  },
  putCrisisInsights: async () => {
    const response = await api.post("/admin/crisis-insights/update/");
    return response;
  },

  changeCrisisInsights: async () => {
    const response = await api.post("/admin/crisis-insights/changes/");
    return response;
  },

  getEmployeeEngagement: async () => {
    const response = await api.post("/admin/employee-engagement/");
    return response;
  },

  // getFeatureUsage: async () => {
  //   const response = await api.get("/dashboard/feature-usage/");
  //   return response;
  // },

  getFeatureUsage: async () => {
    const response = await api.get("/feature-usage");
    return response;
  },

  createFeatureUsage: async () => {
    const response = await api.post("/admin/feature-usage");
    return response;
  },

  getReports: async () => {
    const response = await api.post("/admin/reports/");
    return response;
  },

  getTrends: async () => {
    const response = await api.get("/dashboard/trends");
    return response;
  },

  viewInviteEmployee: async () => {
    const response = await api.get("/employers/view-invites/");
    return response;
  },

  viewSubscription: async () => {
    const response = await api.post("/employer/billing/add-subscription/");
    return response;
  },

  viewBilling: async () => {
    const response = await api.get("/employer/billing/view");
    return response;
  },

  // Admin AI Chat APIs
  getAdminChatMessages: async () => {
    const response = await api.get("/admin/ai-chat/");
    return response;
  },

  sendAdminChatMessage: async (payload: { message: string }) => {
    const response = await api.post("/admin/ai-chat/", payload);
    return response;
  },

  clearAdminChatHistory: async () => {
    const response = await api.delete("/admin/ai-chat/clear-history/");
    return response;
  },

  // AI Status Management APIs
  toggleAdminAI: async (payload: { enabled: boolean }) => {
    const response = await api.post("/admin/ai-status/toggle/", { ...payload, feature_name: "admin_ai" });
    return response;
  },

  toggleLandingAI: async (payload: { enabled: boolean }) => {
    const response = await api.post("/admin/ai-status/toggle/", { ...payload, feature_name: "landing_ai" });
    return response;
  },

  toggleMobileAI: async (payload: { enabled: boolean }) => {
    const response = await api.post("/admin/ai-status/toggle/", { ...payload, feature_name: "mobile_ai" });
    return response;
  },

  getAIStatus: async () => {
    const response = await api.get("/admin/ai-status/");
    return response;
  },

  // Receptionist AI Chat APIs (Public - No authentication required)
  sendReceptionistMessage: async (payload: { message: string; session_id?: string }) => {
    const response = await api.post("/receptionist/ai-chat/", payload);
    return response;
  },
};

// employer endpoints

// export const employerAPI = {
//   // Profile
//   getCurrentEmployer: async () => {
//     const response = await api.get("/users/");
//     return response;
//   },

//   // Dashboard Settings
//   getDashboardSettings: async () => {
//     const response = await api.get("/settings/");
//     return response;
//   },

//   //change links back to correct ones it i
//   // Employee Management
//   inviteEmployee: async (employeeData: { email: string; phone?: string; department: string }) => {
//     const response = await api.post("/auth/invitations/", employeeData);
//     return response;
//   },

//   viewInviteEmployee: async () => {
//     const response = await api.get("/auth/invitations/");
//     return response;
//   },

//   // getEmployees: async () => {
//   //   const response = await api.get("/invitations");
//   //   return response;
//   // },
//     getEmployees: async () => {
//     const response = await api.get("/auth/invitations/");
//     return response;
//   },

//   // Analytics & Dashboard
//   getemployerdashboardSummary: async () => {
//     const response = await api.get("/auth/invitations/");
//     return response;
//   },

//   getEmployeeStatus: async () => {
//     const response = await api.get("/engagement-level/");
//     return response;
//   },

//   getEngagement: async () => {
//     const response = await api.get("/tests-by-type/");
//     return response;
//   },

//   getReports: async () => {
//     const response = await api.post("/wellness-reports/");
//     return response;
//   },

//   // Wellness Data
//   getMoodTrends: async () => {
//     const response = await api.get("/dashboard/trends/");
//     return response;
//   },

//   getDepartmentDistribution: async () => {
//     const response = await api.get("/dashboard/departments");
//     return response;
//   },

//     postDepartmentDistribution: async () => {
//     const response = await api.post("/auth/invitations/");
//     return response;
//   },

//   getWellnessTrend: async () => {
//     const response = await api.get("/auth/invitations/");
//     return response;
//   },

//   getRecentActivities: async () => {
//     const response = await api.get("/dashboard/recent-activities/");
//     return response;
//   },

//   //   viewUsage: async () => {
//   //   return api.get<UsageData>("/subscription/usage/");
//   // },

//   // Billing
//   viewSubscription: async () => {
//     const response = await api.post("/dashboard/billing/add-subscription/");
//     return response;
//   },

//   viewBilling: async () => {
//     const response = await api.get("/dashboard/billing/view");
//     return response;
//   },

//     updatePaymentMethod: async (payload: PaymentUpdatePayload) => {
//     return api.post("/employer/billing/update-payment-method/", payload);
//   },

//   viewBillingHistory: async () => {
//     return api.get<InvoiceItem[]>(/dashboard/subscriptions/billing-history/");
//   },

//   // Data Export & Deletion
//   exportAllData: async () => {
//     return api.get("/employer/data/export/", { responseType: 'blob' });
//   },

//   deleteAllData: async () => {
//     return api.delete("/employer/data/delete-all/");
//   },
// };
export const employerAPI = {
  // Profile
  getCurrentEmployer: async () => {
    const response = await api.get("/users/");
    return response;
  },

  getbreakdownusage: async () => {
    const response = await api.get("/feature-usage/");
    return response;
  },

  // Dashboard Settings
  getDashboardSettings: async () => {
    const response = await api.get("/settings/");
    return response;
  },

  deleteEmployee: async (id: string | number) => {
    const response = await api.delete(`/auth/invitations/${id}/`);
    return response;
  },

  updateEmployee: async (id: number | string, data: Partial<Employee>) => {
    const response = await api.patch(`/auth/invitation/${id}/`, data);
    return response.data;
  },

  updateEmployeeStatus: async (url: string, status: string) => {
    const response = await api.put(url, { status });
    return response;
  },
  // Employee Management
  inviteEmployee: async (employeeData: {
    email: string;
    phone?: string;
    department: string;
  }) => {
    const response = await api.post("/auth/invitations/", employeeData);
    return response;
  },

  viewInviteEmployee: async () => {
    const response = await api.get("/auth/invitations/");
    return response;
  },

  getEmployees: async () => {
    const response = await api.get("/auth/invitations/");
    return response;
  },

  // Analytics & Dashboard
  getemployerdashboardSummary: async () => {
    const response = await api.get("/auth/invitations/");
    return response;
  },

  getEmployeeStatus: async () => {
    const response = await api.get("/engagement-level/");
    return response;
  },

  getEngagement: async () => {
    const response = await api.get("/tests-by-type/");
    return response;
  },

  getReports: async () => {
    const response = await api.post("/wellness-reports/");
    return response;
  },

  getriskassessmentReports: async () => {
    const response = await api.post("/download/risk-assessment/");
    return response;
  },
  getdepartmentanalysisReports: async () => {
    const response = await api.post("/download/department-analysis/");
    return response;
  },

  getengagementReports: async () => {
    const response = await api.post("/download/engagement/");
    return response;
  },

  /**
   * PDF/Blob Download Method
   */
  getReportBlob: async (url: string) => {
    const state = store.getState();
    const token = state.auth.token;
    const persistedToken = localStorage.getItem("token");
    const activeToken = token || persistedToken;

    const res = await fetch(API_BASE_URL + url, {
      method: "get",
      headers: {
        Authorization: `Bearer ${activeToken}`,
        "Content-Type": "application/pdf",
      },
    });

    return await res.blob();
  },

  // Wellness Data
  getMoodTrends: async () => {
    const response = await api.get("/dashboard/trends/");
    return response;
  },

  getWellnessMoodTrends: async (companyId?: string) => {
    const url = companyId
      ? `/company-mood/dashboard-summary/${companyId}/`
      : "/company-mood/dashboard-summary/";
    const response = await api.get(url);
    return response;
  },

  getDepartmentDistribution: async () => {
    const response = await api.get("/dashboard/departments/");
    return response;
  },

  postDepartmentDistribution: async () => {
    const response = await api.post("/auth/invitations/");
    return response;
  },

  getWellnessTrend: async () => {
    const response = await api.get("/auth/invitations/");
    return response;
  },

  getEmployeeMoodDistribution: async () => {
    // const response = await api.get("/mood-bar-graph/");
    const response = await api.get("/auth/invitations/");
    return response;
  },

  getGaugeChart: async () => {
    // const response = await api.get("/company-mood/gauge-chart/");
    const response = await api.get("/auth/invitations/");
    return response;
  },

  getRecentActivities: async () => {
    const response = await api.get("/dashboard/recent-activities/");
    return response;
  },

  // Billing
  viewSubscription: async () => {
    const response = await api.post("/dashboard/billing/add-subscription/");
    return response;
  },

  viewBilling: async () => {
    const response = await api.get("/dashboard/billing/view");
    return response;
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updatePaymentMethod: async (payload: any) => {
    return api.post("/employer/billing/update-payment-method/", payload);
  },

  viewBillingHistory: async () => {
    return api.get("/dashboard/subscriptions/billing-history/");
  },

  // Data Export & Deletion
  exportAllData: async () => {
    return api.get("/employer/data/export/", {
      responseType: "blob",
    });
  },

  deleteAllData: async () => {
    return api.delete("/employer/data/delete-all/");
  },
};

//  export default api;

// import axios from "axios";
// import { RootState } from '../store/store';
// import {
//   LoginCredentials,
//   RegisterCredentials,
//   ForgotPasswordData,
//   changePasswordData,
//   OtpVerificationPayload,
//   MfaSetupData,
//   MfaVerifyPayload,
//   MfaSetupRequestPayload,

// } from "@/types/auth";

// import { UsageData, PaymentUpdatePayload, InvoiceItem } from "@/types/employer"
// declare const authApiClient: any;

// const API_BASE_URL =
//   import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
// console.log("API Base URL:", API_BASE_URL);

// export const INVITE_EMPLOYEE_URL = "/employers/invite-employee/";
// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// export const setupApiInterceptors = (store: { getState: () => RootState }) => {
//   api.interceptors.request.use(
//     (config) => {
//       const requestPath = config.url || '';
//       const publicEndpoints = [
//         "/auth/login/",
//         "/auth/signup/",
//         "/auth/reset-password/",
//         "/auth/change-password/",
//         "/auth/reset-password/complete/",
//         "/organization-signup/",
//         "/auth/verify-otp/",
//         "/auth/mfa/setup/",
//         "/auth/mfa/confirm/",

//       ];

//       const isPublicEndpoint = publicEndpoints.some(path => requestPath.endsWith(path));
//       // checking the redux token
//       const state = store.getState();
//       const token = state.auth.token;

//       //check local storage
//       const persistedToken = localStorage.getItem('token');

//       const activeToken = token || persistedToken;

//       if (activeToken && !isPublicEndpoint) {
//         //  "inject the authorization"
//         config.headers.Authorization = `Bearer ${activeToken}`;

//       } else if (isPublicEndpoint) {
//         // to remove the token header
//         delete config.headers.Authorization;
//       }
//       console.log(" Making API Request:", {
//         method: config.method,
//         url: config.url,
//         data: config.data,
//         token_injected: !!(token && !isPublicEndpoint),
//       });
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );

//   // api.interceptors.request.use(
//   //   (config) => {
//   //     console.log(" Making API Request:", {
//   //       method: config.method,
//   //       url: config.url,
//   //       data: config.data,
//   //     });

//   //     return config;
//   //   },
//   // );

//   api.interceptors.response.use(
//     (response) => {
//       console.log("API Response Success:", {
//         status: response.status,
//         data: response.data,
//         url: response.config.url,
//       });
//       return response;
//     },
//     (error) => {
//       // Log error details on failure
//       console.error(" API Response Error:", {
//         status: error.response?.status,
//         data: error.response?.data,
//         message: error.message,
//         url: error.config?.url,
//       });
//       return Promise.reject(error);
//     }
//   );

// }
// export const authAPI = {
//   // Login endpoint
//   login: async (credentials: LoginCredentials) => {
//     const response = await api.post("/auth/login/", credentials);
//     return response;
//   },

//   // Register endpoint
//   register: async (credentials: RegisterCredentials) => {
//     const response = await api.post("/organization-signup/", {

//       organizationName: credentials.organizationName,
//       phoneNumber: credentials.phoneNumber,
//       organisationSize: credentials.organisationSize,
//       companyEmail: credentials.companyEmail,
//       Location: credentials.Location,
//       contactPerson:
//       {
//         firstName: credentials.contactPerson.firstName,
//         lastName: credentials.contactPerson.lastName,
//         role: credentials.contactPerson.role,
//         email: credentials.contactPerson.email,
//       },

//       password: credentials.password,
//       confirmPassword: credentials.confirmPassword,

//     });

//     if (response.data.access) {
//       localStorage.setItem("token", response.data.access);
//     }

//     return response.data;
//   },
//   //for logout
//   logout: async () => {
//     const refreshToken = localStorage.getItem('refresh');
//     const accessToken = localStorage.getItem('token');
//     return api.post(
//       '/auth/logout/',
//       { refresh: refreshToken },
//       {
//         headers: {

//           'Authorization': `Bearer ${accessToken}`,
//         },
//       }
//     );
//   },

//   forgotPassword: async (data: ForgotPasswordData) => {
//     const response = await api.post("/auth/reset-password/", data);
//     return response;
//   },

//   // reset password
//   changePassword: async (data: changePasswordData) => {
//     const response = await api.post("/auth/reset-password/complete/", data);
//     return response;
//   },

//   verifyOtp: async (payload: OtpVerificationPayload) => {
//     const response = await api.post(/auth/verify-otp/", payload);
//     return response;
//   },

//   resendOtp: (payload: OtpVerificationPayload) => {
//     return api.post(/auth/verify-otp/', payload);

//   },

//   fetchMfaSetupData: async (payload: MfaSetupRequestPayload) => {
//     const response = await api.post("/auth/mfa/setup/", payload);
//     return response;
//   },

//   confirmMfaSetup: async (payload: MfaVerifyPayload) => {
//     // The payload is expected to be an object: { code: string }
//     const response = await api.post("/auth/mfa/confirm/", payload);
//     return response;
//   },

// };

// // --- Admin API ---
// export const adminAPI = {
//   // Dashboard
//   getDashboardStats: async () => {
//     const response = await api.get("/admin/statistics/");
//     return response;
//   },

//   getDashboardSummary: async () => {
//     const response = await api.get("/admin/overview");
//     return response;
//   },

//   // Users
//   getAllUsers: async () => {
//     const response = await api.get("/admin/users/");
//     return response;
//   },

//   deleteUser: async (userId: string | number) => {
//     const response = await api.delete(`/admin/users/${userId}/`);
//     return response;
//   },

//   // Employee Management
//   addEmployee: async () => {
//     const response = await api.post("/admin/invites/");
//     return response;
//   },

//   viewInviteEmployee: async () => {
//     const response = await api.get("/employers/view-invites/");
//     return response;
//   },

//   // Crisis Insights
//   getCrisisInsights: async () => {
//     const response = await api.get("/admin/crisis-insights/views/");
//     return response;
//   },

//   postCrisisInsights: async () => {
//     const response = await api.post("/admin/crisis-insights/add/");
//     return response;
//   },

//   putCrisisInsights: async () => {
//     const response = await api.post("/admin/crisis-insights/update/");
//     return response;
//   },

//   // Analytics
//   getEmployeeEngagement: async () => {
//     const response = await api.post("/admin/employee-engagement/");
//     return response;
//   },

//   getReports: async () => {
//     const response = await api.post("/admin/reports/");
//     return response;
//   },

//   getTrends: async () => {
//     const response = await api.get("/admin/trends");
//     return response;
//   },

//   // Feature Usage
//   createFeatureUsage: async () => {
//     const response = await api.post("/admin/feature-usage");
//     return response;
//   },

//   // Billing
//   viewSubscription: async () => {
//     const response = await api.post("/employer/billing/add-subscription/");
//     return response;
//   },

//   viewBilling: async () => {
//     const response = await api.get("/employer/billing/view");
//     return response;
//   },
// };

// // --- Employer API ---
// export const employerAPI = {
//   // Profile
//   getCurrentEmployer: async () => {
//     const response = await api.get("/users/");
//     return response;
//   },

//   // Dashboard Settings
//   getDashboardSettings: async () => {
//     const response = await api.get("/settings/");
//     return response;
//   },

//   //change links back to correct ones it i
//   // Employee Management
//   inviteEmployee: async (employeeData: { email: string; phone?: string; department: string }) => {
//     const response = await api.post("/invitations/", employeeData);
//     return response;
//   },

//   viewInviteEmployee: async () => {
//     const response = await api.get("/invitations/");
//     return response;
//   },

//   getEmployees: async () => {
//     const response = await api.get("/invitations/");
//     return response;
//   },

//   // Analytics & Dashboard
//   getemployerdashboardSummary: async () => {
//     const response = await api.get("/invitations/");
//     return response;
//   },

//   getEngagement: async () => {
//     const response = await api.get("/tests-by-type/");
//     return response;
//   },

//   getReports: async () => {
//     const response = await api.post("/wellness-reports/");
//     return response;
//   },

//   // Wellness Data
//   getMoodTrends: async () => {
//     const response = await api.get("/invitations/");
//     return response;
//   },

//   getDepartmentDistribution: async () => {
//     const response = await api.get("/invitations/");
//     return response;
//   },

//     postDepartmentDistribution: async () => {
//     const response = await api.post("/invitations/");
//     return response;
//   },

//   getWellnessTrend: async () => {
//     const response = await api.get("/invitations/");
//     return response;
//   },

//   getRecentActivities: async () => {
//     const response = await api.get("/dashboard/recent-activities/");
//     return response;
//   },

//   //   viewUsage: async () => {
//   //   return api.get<UsageData>("/subscription/usage/");
//   // },

//   // Billing
//   viewSubscription: async () => {
//     const response = await api.post("/dashboard/billing/add-subscription/");
//     return response;
//   },

//   viewBilling: async () => {
//     const response = await api.get("/dashboard/billing/view");
//     return response;
//   },

//     updatePaymentMethod: async (payload: PaymentUpdatePayload) => {
//     return api.post("/employer/billing/update-payment-method/", payload);
//   },

//   viewBillingHistory: async () => {
//     return api.get<InvoiceItem[]>(/dashboard/subscriptions/billing-history/");
//   },
// };

// Blog submission API
export const submitArticle = async (formData: FormData) => {
  try {
    const response = await api.post("articles/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error submitting article:", error);
    throw error;
  }
};

export default api;
