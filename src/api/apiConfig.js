import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});
export const setupApiInterceptors = (store) => {
    api.interceptors.request.use((config) => {
        const requestPath = config.url || '';
        const publicEndpoints = [
            "/v1/auth/login/",
            "/v1/auth/signup/",
            "/v1/auth/reset-password/",
            "/v1/auth/change-password",
            "v1/organization-signup/",
            "v1/auth/verify-invite/",
        ];
        const isPublicEndpoint = publicEndpoints.some(path => requestPath.endsWith(path));
        // checking the redux token
        const state = store.getState();
        const token = state.auth.token;
        //check local storage
        const persistedToken = localStorage.getItem('token');
        const activeToken = token || persistedToken;
        if (activeToken && !isPublicEndpoint) {
            //  "inject the authorization"
            config.headers.Authorization = `Bearer ${activeToken}`;
        }
        else if (isPublicEndpoint) {
            // to remove the token header
            delete config.headers.Authorization;
        }
        console.log(" Making API Request:", {
            method: config.method,
            url: config.url,
            data: config.data,
            token_injected: !!(token && !isPublicEndpoint),
        });
        return config;
    }, (error) => {
        return Promise.reject(error);
    });
    api.interceptors.request.use((config) => {
        console.log(" Making API Request:", {
            method: config.method,
            url: config.url,
            data: config.data,
        });
        return config;
    });
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
        const response = await api.post("/v1/auth/login/", credentials);
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
                fullname: credentials.contactPerson.fullname,
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
        const refreshToken = localStorage.getItem('refresh');
        const accessToken = localStorage.getItem('token');
        return api.post('/v1/auth/logout/', { refresh: refreshToken }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });
    },
    forgotPassword: async (data) => {
        const response = await api.post("/v1/auth/reset-password/", data);
        return response;
    },
    // RESET PASSWORD
    changePassword: async (data) => {
        const response = await api.post("/v1/auth/change-password", data);
        return response;
    },
    getCurrentUser: async () => {
        const response = await api.get("/v1/auth/me/");
        return response;
    },
    verifyOtp: async (payload) => {
        const response = await api.post("v1/auth/verify-invite/", payload);
        return response;
    },
    resendOtp: ({ email }) => {
        return api.post('/auth/resend-otp', { email });
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
    deleteUser: async (userId) => {
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
    // Invite employee with full data
    inviteEmployee: async (employeeData) => {
        const response = await api.post("/v1/employers/invite/", employeeData);
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
    getEmployees: async () => {
        const response = await api.get("/v1/employer/employees/");
        return response;
    },
    // NEW: Get mood trends with mood level and employee department
    getMoodTrends: async () => {
        const response = await api.get("/v1/employees/moodTrends/");
        return response;
    },
    // New endpoints for dashboard data
    getDepartmentDistribution: async () => {
        const response = await api.get("/v1/employer/department-distribution/");
        return response;
    },
    getWellnessTrend: async () => {
        const response = await api.get("/v1/employer/wellness-trend/");
        return response;
    },
    // Get recent activities
    getRecentActivities: async () => {
        const response = await api.get("/v1/employer/recent-activities/");
        return response;
    },
};
export default api;
// import axios from "axios";
// import { RootState } from '../store/store';
// import {
//   LoginCredentials,
//   RegisterCredentials,
//   ForgotPasswordData,
//   changePasswordData,
//   OtpVerificationPayload
// } from "@/types/auth";
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
//    api.interceptors.request.use(
//       (config) => {
//         const requestPath = config.url || '';
//         const publicEndpoints = [
//                 "/v1/auth/login/",
//                 "/v1/auth/signup/",
//                 "/v1/auth/reset-password/",
//                 "/v1/auth/change-password",
//                 "v1/organization-signup/",
//                 "v1/auth/verify-invite/",
//               ];
//         const isPublicEndpoint = publicEndpoints.some(path => requestPath.endsWith(path));
//         // checking the redux token
//         const state = store.getState();
//         const token = state.auth.token; 
//         //check local storage
//         const persistedToken = localStorage.getItem('token'); 
//         const activeToken = token || persistedToken;
//         if (activeToken && !isPublicEndpoint) {
//         //  "inject the authorization"
//           config.headers.Authorization = `Bearer ${activeToken}`;
//         }else if (isPublicEndpoint) {
//                 // to remove the token header
//                 delete config.headers.Authorization;
//         }
//         console.log(" Making API Request:", {
//                 method: config.method,
//                 url: config.url,
//                 data: config.data,
//                 token_injected: !!(token && !isPublicEndpoint),
//         });
//         return config;
//       },
//       (error) => {
//         return Promise.reject(error);
//       }
//     );
//   api.interceptors.request.use(
//     (config) => {
//       console.log(" Making API Request:", {
//         method: config.method,
//         url: config.url,
//         data: config.data,
//       });
//       return config;
//     },
//   );
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
//         {
//           fullname: credentials.contactPerson.fullname,
//           role: credentials.contactPerson.role,
//           email: credentials.contactPerson.email, 
//         },
//       password: credentials.password,
//       confirmPassword: credentials.confirmPassword,
//     });
//     if (response.data.access) {
//       localStorage.setItem("token", response.data.access);
//     }
//     return response.data;
//   },
//  //for logout
//   logout: async () => {
//         const refreshToken = localStorage.getItem('refresh');
//         const accessToken = localStorage.getItem('token'); 
//         return api.post(
//             '/v1/auth/logout/', 
//             { refresh: refreshToken },
//             {
//                 headers: {
//                     'Authorization': `Bearer ${accessToken}`, 
//                 },
//             }
//         );
//     },
//   forgotPassword: async (data: ForgotPasswordData) => {
//     const response = await api.post("/v1/auth/reset-password/", data);
//     return response;
//   },
//   // RESET PASSWORD
//   changePassword: async (data: changePasswordData) => {
//     const response = await api.post("/v1/auth/change-password", data);
//     return response;
//   },
//   getCurrentUser: async () => {
//     const response = await api.get("/v1/auth/me/");
//     return response;
//   },
// verifyOtp: async(payload: OtpVerificationPayload)=>{
//   const response = await api.post("v1/auth/verify-invite/", payload);
//   return response;
// },
// resendOtp: ({ email }: { email: string }) => {
//         return api.post('/auth/resend-otp', { email });
//     },
// };
// //  System Admin Dashboard
// export const adminAPI = {
//   getDashboardStats: async () => {
//     const response = await api.get("/v1/admin/statistics/");
//     return response;
//   },
//   getAllUsers: async () => {
//     const response = await api.get("/v1/admin/users/");
//     return response;
//   },
//   deleteUser: async (userId: string | number) => {
//     const response = await api.delete(`/v1/admin/users/${userId}/`);
//     return response;
//   },
//   getDashboardSummary: async () => {
//     const response = await api.get("/v1/admin/overview");
//     return response;
//   },
//   addEmployee: async () => {
//     const response = await api.post("/v1/admin/invites/");
//     return response;
//   },
//   getCrisisInsights: async () => {
//     const response = await api.get("/v1/admin/crisis-insights/views/");
//     return response;
//   },
//   postCrisisInsights: async () => {
//     const response = await api.post("/v1/admin/crisis-insights/add/");
//     return response;
//   },
//     putCrisisInsights: async () => {
//     const response = await api.post("/v1/admin/crisis-insights/update/");
//     return response;
//   },
//     changeCrisisInsights: async () => {
//     const response = await api.post("/v1/admin/crisis-insights/changes/");
//     return response;
//   },
//   getEmployeeEngagement: async () => {
//     const response = await api.post("/v1/admin/employee-engagement/");
//     return response;
//   },
//   // getFeatureUsage: async () => {
//   //   const response = await api.get("/v1/dashboard/feature-usage/");
//   //   return response;
//   // },
//   createFeatureUsage: async () => {
//     const response = await api.post("/v1/admin/feature-usage");
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
//   viewInviteEmployee: async () => {
//     const response = await api.get("/v1/employers/view-invites/");
//     return response;
//   },
//   viewSubscription: async () => {
//     const response = await api.post("/v1/employer/billing/add-subscription/");
//     return response;
//   },
//   viewBilling: async () => {
//     const response = await api.get("/v1/employer/billing/view");
//     return response;
//   },
// };
//   // employer endpoints
export const employerAPI = {
    inviteEmployee: async () => {
        const response = await api.post("/api/v1/invitations/");
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
