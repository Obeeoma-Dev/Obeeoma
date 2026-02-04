// Company logo API endpoints
export const LOGO_UPLOAD_URL = "/api/company/logo-upload";
export const LOGO_FETCH_URL = "/api/company/logo";
import axios from "axios";
import { store } from "../store/store";
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api/v1";
console.log("API Base URL:", API_BASE_URL);
export const INVITE_EMPLOYEE_URL = "/v1/employers/invite-employee/";
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});
export const setupApiInterceptors = (store) => {
    api.interceptors.request.use((config) => {
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
        const isPublicEndpoint = publicEndpoints.some((path) => requestPath.includes(path) || requestPath.endsWith(path));
        //check local storage first (more reliable)
        const persistedToken = localStorage.getItem("token");
        // checking the redux token as fallback
        const state = store.getState();
        const token = state.auth.token;
        const activeToken = persistedToken || token;
        // Special handling for MFA setup - use temp_token
        if (requestPath.includes("auth/mfa/setup/")) {
            const tempToken = localStorage.getItem("temp_token") || state.auth.tempToken;
            if (tempToken) {
                config.headers.Authorization = `Bearer ${tempToken}`;
                console.log("Using temp_token for MFA setup:", tempToken);
            }
        }
        else if (activeToken && !isPublicEndpoint) {
            //  "inject the authorization"
            config.headers.Authorization = `Bearer ${activeToken}`;
        }
        else if (isPublicEndpoint) {
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
            token_injected: !!(activeToken && !isPublicEndpoint) ||
                !!localStorage.getItem("temp_token"),
            token_source: persistedToken
                ? "localStorage"
                : token
                    ? "redux"
                    : "none",
        });
        return config;
    }, (error) => {
        return Promise.reject(error);
    });
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
    api.interceptors.response.use((response) => {
        console.log("API Response Success:", {
            status: response.status,
            data: response.data,
            url: response.config.url,
        });
        return response;
    }, (error) => {
        // Log error details on failure
        console.error(" API Response Error:", {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message,
            url: error.config?.url,
        });
        return Promise.reject(error);
    });
};
export const authAPI = {
    // Login endpoint
    login: async (credentials) => {
        const response = await api.post("auth/login/", credentials);
        return response;
    },
    // Register endpoint
    register: async (credentials) => {
        const response = await api.post("/v1/organization-signup/", {
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
        api.post("/v1/auth/logout/", { refresh: refreshToken });
    },
    forgotPassword: async (data) => {
        const response = await api.post("/v1/auth/reset-password/", data);
        return response;
    },
    // reset password
    changePassword: async (data) => {
        const response = await api.post("/v1/auth/reset-password/complete/", data);
        return response;
    },
    ChangeorgPassword: async (data) => {
        const response = await api.post("/v1/auth/change-password/", data);
        return response;
    },
    verifyOtp: async (payload) => {
        const response = await api.post("/v1/auth/verify-password-reset-otp/", payload);
        return response;
    },
    resendOtp: (payload) => {
        return api.post("v1/auth/verify-password-reset-otp/", payload);
    },
    fetchMfaSetupData: async (payload) => {
        // For MFA setup, we need to use the temp_token from login response
        const response = await api.post("auth/mfa/setup/", payload);
        return response;
    },
    confirmMfaSetup: async (payload) => {
        // The payload is expected to be an object: { temp_token: string, code: string }
        const response = await api.post("auth/mfa/verify/", payload);
        return response;
    },
};
//  System Admin Dashboard
export const adminAPI = {
    getDashboardStats: async () => {
        const response = await api.get("admin/statistics/");
        return response;
    },
    getAllUsers: async () => {
        const response = await api.get("/v1/admin/users/");
        return response;
    },
    deleteUser: async (userId) => {
        const response = await api.delete(`/v1/admin/users/${userId}/`);
        return response;
    },
    getDashboardSummary: async () => {
        const response = await api.get("/v1/admin/overview");
        return response;
    },
    getDashboardOverview: async () => {
        const response = await api.get("/v1/admin/overview/");
        return response;
    },
    // Organization management APIs
    getOrganizationsGrowthChart: async () => {
        const response = await api.get("/v1/admin/organizations/growth-chart/");
        return response;
    },
    getOrganizationsClientDistribution: async () => {
        const response = await api.get("/v1/admin/organizations/client-distribution/");
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
        const response = await api.get(`/v1/admin/organizations/?${params}`);
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
    // getFeatureUsage: async () => {
    //   const response = await api.get("/v1/dashboard/feature-usage/");
    //   return response;
    // },
    getFeatureUsage: async () => {
        const response = await api.get("/v1/feature-usage");
        return response;
    },
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
};
// employer endpoints
// export const employerAPI = {
//   // Profile
//   getCurrentEmployer: async () => {
//     const response = await api.get("/v1/users/");
//     return response;
//   },
//   // Dashboard Settings
//   getDashboardSettings: async () => {
//     const response = await api.get("/v1/settings/");
//     return response;
//   },
//   //change links back to correct ones it i
//   // Employee Management
//   inviteEmployee: async (employeeData: { email: string; phone?: string; department: string }) => {
//     const response = await api.post("/v1/auth/invitations/", employeeData);
//     return response;
//   },
//   viewInviteEmployee: async () => {
//     const response = await api.get("/v1/auth/invitations/");
//     return response;
//   },
//   // getEmployees: async () => {
//   //   const response = await api.get("/v1/invitations");
//   //   return response;
//   // },
//     getEmployees: async () => {
//     const response = await api.get("/v1/auth/invitations/");
//     return response;
//   },
//   // Analytics & Dashboard
//   getemployerdashboardSummary: async () => {
//     const response = await api.get("/v1/auth/invitations/");
//     return response;
//   },
//   getEmployeeStatus: async () => {
//     const response = await api.get("/v1/engagement-level/");
//     return response;
//   },
//   getEngagement: async () => {
//     const response = await api.get("/v1/tests-by-type/");
//     return response;
//   },
//   getReports: async () => {
//     const response = await api.post("/v1/wellness-reports/");
//     return response;
//   },
//   // Wellness Data
//   getMoodTrends: async () => {
//     const response = await api.get("/v1/dashboard/trends/");
//     return response;
//   },
//   getDepartmentDistribution: async () => {
//     const response = await api.get("/v1/dashboard/departments");
//     return response;
//   },
//     postDepartmentDistribution: async () => {
//     const response = await api.post("/v1/auth/invitations/");
//     return response;
//   },
//   getWellnessTrend: async () => {
//     const response = await api.get("/v1/auth/invitations/");
//     return response;
//   },
//   getRecentActivities: async () => {
//     const response = await api.get("/v1/dashboard/recent-activities/");
//     return response;
//   },
//   //   viewUsage: async () => {
//   //   return api.get<UsageData>("/subscription/usage/");
//   // },
//   // Billing
//   viewSubscription: async () => {
//     const response = await api.post("/v1/dashboard/billing/add-subscription/");
//     return response;
//   },
//   viewBilling: async () => {
//     const response = await api.get("/v1/dashboard/billing/view");
//     return response;
//   },
//     updatePaymentMethod: async (payload: PaymentUpdatePayload) => {
//     return api.post("/v1/employer/billing/update-payment-method/", payload);
//   },
//   viewBillingHistory: async () => {
//     return api.get<InvoiceItem[]>("v1/dashboard/subscriptions/billing-history/");
//   },
//   // Data Export & Deletion
//   exportAllData: async () => {
//     return api.get("/v1/employer/data/export/", { responseType: 'blob' });
//   },
//   deleteAllData: async () => {
//     return api.delete("/v1/employer/data/delete-all/");
//   },
// };
export const employerAPI = {
    // Profile
    getCurrentEmployer: async () => {
        const response = await api.get("/v1/users/");
        return response;
    },
    getbreakdownusage: async () => {
        const response = await api.get("/v1/feature-usage/");
        return response;
    },
    // Dashboard Settings
    getDashboardSettings: async () => {
        const response = await api.get("/v1/settings/");
        return response;
    },
    deleteEmployee: async (id) => {
        const response = await api.delete(`/v1/dashboard/employees/${id}`);
        return response;
    },
    updateEmployee: async (id, data) => {
        const response = await api.patch(`/v1/dashboard/employees/${id}`, data);
        return response.data;
    },
    updateEmployeeStatus: async (url, status) => {
        const response = await api.put(url, { status });
        return response;
    },
    // Employee Management
    inviteEmployee: async (employeeData) => {
        const response = await api.post("/v1/auth/invitations/", employeeData);
        return response;
    },
    viewInviteEmployee: async () => {
        const response = await api.get("/v1/auth/invitations/");
        return response;
    },
    getEmployees: async () => {
        const response = await api.get("/v1/auth/invitations/");
        return response;
    },
    // Analytics & Dashboard
    getemployerdashboardSummary: async () => {
        const response = await api.get("/v1/auth/invitations/");
        return response;
    },
    getEmployeeStatus: async () => {
        const response = await api.get("/v1/engagement-level/");
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
    getriskassessmentReports: async () => {
        const response = await api.post("/v1/download/risk-assessment/");
        return response;
    },
    getdepartmentanalysisReports: async () => {
        const response = await api.post("/v1/download/department-analysis/");
        return response;
    },
    getengagementReports: async () => {
        const response = await api.post("/v1/download/engagement/");
        return response;
    },
    /**
     * PDF/Blob Download Method
     */
    getReportBlob: async (url) => {
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
        const response = await api.get("/v1/dashboard/trends/");
        return response;
    },
    getWellnessMoodTrends: async (companyId) => {
        const url = companyId
            ? `/v1/company-mood/${companyId}/`
            : "/v1/company-mood/";
        const response = await api.get(url);
        return response;
    },
    getDepartmentDistribution: async () => {
        const response = await api.get("/v1/dashboard/departments/");
        return response;
    },
    postDepartmentDistribution: async () => {
        const response = await api.post("/v1/auth/invitations/");
        return response;
    },
    getWellnessTrend: async () => {
        const response = await api.get("/v1/auth/invitations/");
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updatePaymentMethod: async (payload) => {
        return api.post("/v1/employer/billing/update-payment-method/", payload);
    },
    viewBillingHistory: async () => {
        return api.get("/v1/dashboard/subscriptions/billing-history/");
    },
    // Data Export & Deletion
    exportAllData: async () => {
        return api.get("/v1/employer/data/export/", {
            responseType: "blob",
        });
    },
    deleteAllData: async () => {
        return api.delete("/v1/employer/data/delete-all/");
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
// export const INVITE_EMPLOYEE_URL = "/v1/employers/invite-employee/";
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
//         "/v1/auth/login/",
//         "/v1/auth/signup/",
//         "/v1/auth/reset-password/",
//         "/v1/auth/change-password/",
//         "/v1/auth/reset-password/complete/",
//         "/v1/organization-signup/",
//         "/v1/auth/verify-otp/",
//         "/v1/auth/mfa/setup/",
//         "/v1/auth/mfa/confirm/",
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
//     const response = await api.post("/v1/auth/login/", credentials);
//     return response;
//   },
//   // Register endpoint
//   register: async (credentials: RegisterCredentials) => {
//     const response = await api.post("/v1/organization-signup/", {
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
//       '/v1/auth/logout/',
//       { refresh: refreshToken },
//       {
//         headers: {
//           'Authorization': `Bearer ${accessToken}`,
//         },
//       }
//     );
//   },
//   forgotPassword: async (data: ForgotPasswordData) => {
//     const response = await api.post("/v1/auth/reset-password/", data);
//     return response;
//   },
//   // reset password
//   changePassword: async (data: changePasswordData) => {
//     const response = await api.post("/v1/auth/reset-password/complete/", data);
//     return response;
//   },
//   verifyOtp: async (payload: OtpVerificationPayload) => {
//     const response = await api.post("v1/auth/verify-otp/", payload);
//     return response;
//   },
//   resendOtp: (payload: OtpVerificationPayload) => {
//     return api.post('v1/auth/verify-otp/', payload);
//   },
//   fetchMfaSetupData: async (payload: MfaSetupRequestPayload) => {
//     const response = await api.post("/v1/auth/mfa/setup/", payload);
//     return response;
//   },
//   confirmMfaSetup: async (payload: MfaVerifyPayload) => {
//     // The payload is expected to be an object: { code: string }
//     const response = await api.post("/v1/auth/mfa/confirm/", payload);
//     return response;
//   },
// };
// // --- Admin API ---
// export const adminAPI = {
//   // Dashboard
//   getDashboardStats: async () => {
//     const response = await api.get("/v1/admin/statistics/");
//     return response;
//   },
//   getDashboardSummary: async () => {
//     const response = await api.get("/v1/admin/overview");
//     return response;
//   },
//   // Users
//   getAllUsers: async () => {
//     const response = await api.get("/v1/admin/users/");
//     return response;
//   },
//   deleteUser: async (userId: string | number) => {
//     const response = await api.delete(`/v1/admin/users/${userId}/`);
//     return response;
//   },
//   // Employee Management
//   addEmployee: async () => {
//     const response = await api.post("/v1/admin/invites/");
//     return response;
//   },
//   viewInviteEmployee: async () => {
//     const response = await api.get("/v1/employers/view-invites/");
//     return response;
//   },
//   // Crisis Insights
//   getCrisisInsights: async () => {
//     const response = await api.get("/v1/admin/crisis-insights/views/");
//     return response;
//   },
//   postCrisisInsights: async () => {
//     const response = await api.post("/v1/admin/crisis-insights/add/");
//     return response;
//   },
//   putCrisisInsights: async () => {
//     const response = await api.post("/v1/admin/crisis-insights/update/");
//     return response;
//   },
//   // Analytics
//   getEmployeeEngagement: async () => {
//     const response = await api.post("/v1/admin/employee-engagement/");
//     return response;
//   },
//   getReports: async () => {
//     const response = await api.post("/v1/admin/reports/");
//     return response;
//   },
//   getTrends: async () => {
//     const response = await api.get("/v1/admin/trends");
//     return response;
//   },
//   // Feature Usage
//   createFeatureUsage: async () => {
//     const response = await api.post("/v1/admin/feature-usage");
//     return response;
//   },
//   // Billing
//   viewSubscription: async () => {
//     const response = await api.post("/v1/employer/billing/add-subscription/");
//     return response;
//   },
//   viewBilling: async () => {
//     const response = await api.get("/v1/employer/billing/view");
//     return response;
//   },
// };
// // --- Employer API ---
// export const employerAPI = {
//   // Profile
//   getCurrentEmployer: async () => {
//     const response = await api.get("/v1/users/");
//     return response;
//   },
//   // Dashboard Settings
//   getDashboardSettings: async () => {
//     const response = await api.get("/v1/settings/");
//     return response;
//   },
//   //change links back to correct ones it i
//   // Employee Management
//   inviteEmployee: async (employeeData: { email: string; phone?: string; department: string }) => {
//     const response = await api.post("/v1/invitations/", employeeData);
//     return response;
//   },
//   viewInviteEmployee: async () => {
//     const response = await api.get("/v1/invitations/");
//     return response;
//   },
//   getEmployees: async () => {
//     const response = await api.get("/v1/invitations/");
//     return response;
//   },
//   // Analytics & Dashboard
//   getemployerdashboardSummary: async () => {
//     const response = await api.get("/v1/invitations/");
//     return response;
//   },
//   getEngagement: async () => {
//     const response = await api.get("/v1/tests-by-type/");
//     return response;
//   },
//   getReports: async () => {
//     const response = await api.post("/v1/wellness-reports/");
//     return response;
//   },
//   // Wellness Data
//   getMoodTrends: async () => {
//     const response = await api.get("/v1/invitations/");
//     return response;
//   },
//   getDepartmentDistribution: async () => {
//     const response = await api.get("/v1/invitations/");
//     return response;
//   },
//     postDepartmentDistribution: async () => {
//     const response = await api.post("/v1/invitations/");
//     return response;
//   },
//   getWellnessTrend: async () => {
//     const response = await api.get("/v1/invitations/");
//     return response;
//   },
//   getRecentActivities: async () => {
//     const response = await api.get("/v1/dashboard/recent-activities/");
//     return response;
//   },
//   //   viewUsage: async () => {
//   //   return api.get<UsageData>("/subscription/usage/");
//   // },
//   // Billing
//   viewSubscription: async () => {
//     const response = await api.post("/v1/dashboard/billing/add-subscription/");
//     return response;
//   },
//   viewBilling: async () => {
//     const response = await api.get("/v1/dashboard/billing/view");
//     return response;
//   },
//     updatePaymentMethod: async (payload: PaymentUpdatePayload) => {
//     return api.post("/v1/employer/billing/update-payment-method/", payload);
//   },
//   viewBillingHistory: async () => {
//     return api.get<InvoiceItem[]>("v1/dashboard/subscriptions/billing-history/");
//   },
// };
// Blog submission API
export const submitArticle = async (formData) => {
    try {
        const response = await api.post("/v1/articles/", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    }
    catch (error) {
        console.error("Error submitting article:", error);
        throw error;
    }
};
export default api;
