import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    AuthState,
    LoginCredentials,
    RegisterCredentials,
    ForgotPasswordData,
    changePasswordData,
    LoginSuccessPayload,
    OtpVerificationPayload,
    OtpSuccessResponse,
    MfaSetupData, 
    // User 
} from "./../../types/auth";
import {authAPI} from "../../api/apiConfig";
import api from "../../api/apiConfig";
import axios, { AxiosError } from "axios";
import {getDashboardRoute} from "../../utils/routing";
import { RootState } from '../store';

const getErrorMessage = (error: unknown): string => {
    if (axios.isAxiosError(error)) {
        return (
            (error.response?.data as { detail?: string })?.detail ||
            error.message ||
            "An unknown error occurred"
        );
    }
    if (error instanceof Error) {
        return error.message;
    }
    return "An unexpected error occurred";
};

// Existing Thunks


// Login Thunk
export const loginUser = createAsyncThunk<
    LoginSuccessPayload,
    LoginCredentials, 
    { rejectValue: string } 
>('auth/loginUser', async (credentials, { rejectWithValue }) => {
    try {
        const response = await authAPI.login(credentials)
        return response.data as LoginSuccessPayload; 
    } catch (err) {
        const error: AxiosError = err as AxiosError;
        let errorMessage = 'Login failed. Please try again.';

        if (error.response && error.response.data) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            errorMessage = (error.response.data as any).detail || 'Invalid credentials.';
        }
        return rejectWithValue(errorMessage);
    }
});

// Register Thunk
export const registerUser = createAsyncThunk<
    LoginSuccessPayload,
    RegisterCredentials, 
    { rejectValue: string }
>(
    "auth/organization-signup/",
    async (credentials, {rejectWithValue}) => {
        const dataWithDefaultRole = {
            ...credentials,
            role: credentials.role || 'employer'
        }
        try { 
            const response = await authAPI.register(dataWithDefaultRole);
            return response.data as LoginSuccessPayload;
        } catch (error: unknown) {
            return rejectWithValue(getErrorMessage(error));
        }
    },
);

// Forgot password Thunk
export const forgotPassword = createAsyncThunk(
    "auth/reset-password",
    async (
        data: ForgotPasswordData & { onSuccess?: () => void },
        { rejectWithValue },
    ) => {
        try {
            const response = await authAPI.forgotPassword(data);
            data.onSuccess?.();
            return response.data;
        } catch (error: unknown) {
            return rejectWithValue(getErrorMessage(error));
        }
    },
);

// Reset password Thunk
export const resetPassword = createAsyncThunk(
    "auth/change-password",
    async (
        data: changePasswordData & { onSuccess?: () => void },
        { rejectWithValue },
    ) => {
        try {
            const response = await authAPI.changePassword(data);
            data.onSuccess?.();
            return response.data;
        } catch (error: unknown) {
            return rejectWithValue(getErrorMessage(error));
        }
    },
);

// Logout Thunk
export const logoutUserThunk = createAsyncThunk<void,void>(
    "auth/logout",
    async (_, { dispatch}) => {
        try {
            await authAPI.logout()
        } catch (error: unknown){
            console.error("Server logout failed, but client session clearing.", getErrorMessage(error));
        }
        finally {
            dispatch(logout())
            delete api.defaults.headers.common["Authorization"];
        }
    }
);

// Verify OTP Thunk 
export const verifyOtpThunk = createAsyncThunk<
    OtpSuccessResponse, 
    OtpVerificationPayload,
    {rejectValue: string}>
('auth/verifyOtp', async(payload, {rejectWithValue}) =>{
    try{
        const response = await authAPI.verifyOtp(payload);
        return response.data as OtpSuccessResponse;
    }catch(err: unknown){
        return rejectWithValue(getErrorMessage(err));
    }
});

// Resend OTP Thunk
export const resendOtpThunk = createAsyncThunk<
    { message: string }, 
    OtpVerificationPayload, 
    { rejectValue: string } 
>(
    'auth/resendOtp',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await authAPI.resendOtp(payload); 
            return response.data;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            const errorMessage = error.response?.data?.detail || 'Failed to resend code. Please try again.';
            return rejectWithValue(errorMessage);
        }
    }
);


//  MFA Thunks
export const setupMfa = createAsyncThunk<
    MfaSetupData, // Return type on success
    void,         // Argument type 
    { 
        rejectValue: string; 
        state: RootState; // ThunkAPI configuration
    }
>('auth/setupMfa', async (_, { rejectWithValue, getState }) => {
    try {
        const state = getState();
        const accessToken = state.auth.accessToken; // Access token from state

        if (!accessToken) {
            return rejectWithValue('Authentication token is missing. Cannot start MFA setup.');
        }

        //  passing the required accessToken
        // authAPI.fetchMfaSetupData returns MfaSetupData directly, 
        const response = await authAPI.fetchMfaSetupData(accessToken); 
        
        return response; 
    } catch (err: unknown) {
        return rejectWithValue(getErrorMessage(err));
    }
});



export const confirmMfa = createAsyncThunk<
    void, // Typically returns nothing or a success message
    { code: string }, 
    { 
        rejectValue: string;
        state: RootState; 
    } 
>('auth/confirmMfa', async (payload, { rejectWithValue, getState }) => {
    try {
        const state = getState();
        
        // The path to your access token will be: state.<reducerName>.<tokenProperty>
        const accessToken = state.auth.accessToken; // Adjust if 'accessToken' is named differently

        if (!accessToken) {
            return rejectWithValue('Authentication token is missing. Please log in again.');
        }

        // Pass the required arguments
        await authAPI.confirmMfaSetup(payload.code, accessToken); 
        
    } catch (err: unknown) {
        return rejectWithValue(getErrorMessage(err)); 
    }
});

// State Setup


const getUserFromStorage = () => {
    const rawUser = localStorage.getItem("user");
    if (!rawUser || rawUser === "undefined") return null;
    try {
        return JSON.parse(rawUser);
    } catch {
        return null;
    }
};

const initialState: AuthState = {
    user: getUserFromStorage(),
    token: localStorage.getItem("token"),
    isLoading: false,
    error: null,
    is_verified: false,
    
    // Initial State for NEW MFA properties
    mfaSetupData: null,
    isMfaSetupConfirmed: false,
    accessToken: null,
};


// Auth Slice Definition


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearAuthStatus: (state) => { 
            state.isLoading = false;
            state.error = null;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.error = null;
            state.mfaSetupData = null; // Clear MFA data on logout
            state.isMfaSetupConfirmed = false;
            state.accessToken = null;
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("refresh");
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user || action.payload;
                state.token = action.payload.access || action.payload.token;
                state.error = null;
                localStorage.setItem(
                    "token",
                    action.payload.access || action.payload.token,
                );
                localStorage.setItem("user", JSON.stringify(action.payload.user)); 
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })

            // Register
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload?.user ?? action.payload;
                state.token = action.payload?.access ?? action.payload?.token;
                state.error = null;

                localStorage.setItem(
                    "token",
                    action.payload?.access || action.payload?.token,
                );
                localStorage.setItem("user", JSON.stringify(action.payload?.user));
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })

            // Forgot Pasword
            .addCase(forgotPassword.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(forgotPassword.fulfilled, (state) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })

            // Reset Password
            .addCase(resetPassword.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(resetPassword.fulfilled, (state) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })

            // Logout Thunk
            .addCase(logoutUserThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(logoutUserThunk.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(logoutUserThunk.rejected, (state) => {
                state.isLoading = false;
            })
            
            // Verify OTP Thunk
            .addCase(verifyOtpThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(verifyOtpThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                if (state.user && action.payload.user){
                    state.user = action.payload.user
                    localStorage.setItem("user", JSON.stringify(action.payload.user));
                }
                if (action.payload.token) {
                    state.token = action.payload.token;
                    localStorage.setItem("token", action.payload.token);
                }
                state.error = null;
            })
            .addCase(verifyOtpThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            
            // Resend OTP Thunk
            .addCase(resendOtpThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(resendOtpThunk.fulfilled, (state) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(resendOtpThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })

            // -----------------------------------
            // ✅ MFA Setup: Get QR Code and Secret
            // -----------------------------------
            .addCase(setupMfa.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(setupMfa.fulfilled, (state, action) => {
                state.isLoading = false;
                state.mfaSetupData = action.payload;
                state.error = null;
            })
            .addCase(setupMfa.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
                state.mfaSetupData = null;
            })
            
            // -----------------------------------
            // MFA Confirmation: Verify the code
            // -----------------------------------
            .addCase(confirmMfa.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(confirmMfa.fulfilled, (state) => {
                state.isLoading = false;
                state.isMfaSetupConfirmed = true; // Set status to confirmed
                state.error = null;
            })
            .addCase(confirmMfa.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
                state.isMfaSetupConfirmed = false;
            });
    },
});


// Exports


export const { logout, clearError, clearAuthStatus } = authSlice.actions;

// Selectors
export const selectUserDashboardRoute = (state: { auth: AuthState }) => {
    return getDashboardRoute(state.auth.user);
};

export const selectIsAuthenticated = (state: { auth: AuthState }) => {
    return !!state.auth.user && !!state.auth.token;
};

export default authSlice.reducer;
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import {
//   AuthState,
//   LoginCredentials,
//   RegisterCredentials,
//   ForgotPasswordData,
//   changePasswordData,
//   LoginSuccessPayload,
//   OtpVerificationPayload,
//   OtpSuccessResponse,
//   //ResendOtpPayload,
// // User // User type is not directly used in initial state, relying on inferred type
// } from "./../../types/auth";
// import {authAPI} from "../../api/apiConfig";
// import api from "../../api/apiConfig";
// import axios, { AxiosError } from "axios";
// import {getDashboardRoute} from "../../utils/routing";

// const getErrorMessage = (error: unknown): string => {
//   if (axios.isAxiosError(error)) {
//     return (
//       (error.response?.data as { detail?: string })?.detail ||
//       error.message ||
//       "An unknown error occurred"
//     );
//   }
//   if (error instanceof Error) {
//     return error.message;
//   }
//   return "An unexpected error occurred";
// };

// // Login Thunk (Unchanged)
// export const loginUser = createAsyncThunk<
//   LoginSuccessPayload,
//   LoginCredentials, 
//   { rejectValue: string } 
// >('auth/loginUser', async (credentials, { rejectWithValue }) => {
//   try {
//     const response = await authAPI.login(credentials)
//     return response.data as LoginSuccessPayload; 
//   } catch (err) {
//     const error: AxiosError = err as AxiosError;
//     let errorMessage = 'Login failed. Please try again.';

//     if (error.response && error.response.data) {
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       errorMessage = (error.response.data as any).detail || 'Invalid credentials.';
//     }
//     return rejectWithValue(errorMessage);
//   }
// });

// // Register Thunk (Unchanged)
// export const registerUser = createAsyncThunk<
//   LoginSuccessPayload,
//   RegisterCredentials, 
//   { rejectValue: string }
// >(
//   "auth/organization-signup/",
//   async (credentials, {rejectWithValue}) => {
//     const dataWithDefaultRole = {
//       ...credentials,
//       role: credentials.role || 'employer'
//     }
//     try { 
//       const response = await authAPI.register(dataWithDefaultRole);
//       return response.data as LoginSuccessPayload;
//     } catch (error: unknown) {
//       return rejectWithValue(getErrorMessage(error));
//     }
//   },
// );

// // Forgot password Thunk (Unchanged)
// export const forgotPassword = createAsyncThunk(
//   "auth/reset-password",
//   async (
//     data: ForgotPasswordData & { onSuccess?: () => void },
//     { rejectWithValue },
//   ) => {
//     try {
//       const response = await authAPI.forgotPassword(data);
//       data.onSuccess?.();
//       return response.data;
//     } catch (error: unknown) {
//       return rejectWithValue(getErrorMessage(error));
//     }
//   },
// );

// // Reset password Thunk (Unchanged)
// export const resetPassword = createAsyncThunk(
//   "auth/change-password",
//   async (
//     data: changePasswordData & { onSuccess?: () => void },
//     { rejectWithValue },
//   ) => {
//     try {
//       const response = await authAPI.changePassword(data);
//       data.onSuccess?.();
//       return response.data;
//     } catch (error: unknown) {
//       return rejectWithValue(getErrorMessage(error));
//     }
//   },
// );

// // Logout Thunk (Unchanged)
// export const logoutUserThunk = createAsyncThunk<void,void>(
//   "auth/logout",
//   async (_, { dispatch}) => {
//     try {
//       await authAPI.logout()
//     } catch (error: unknown){
//       console.error("Server logout failed, but client session clearing.", getErrorMessage(error));
//     }
//     finally {
//       dispatch(logout())
//       delete api.defaults.headers.common["Authorization"];
//     }
//   }
// );

// // Verify OTP Thunk 
// export const verifyOtpThunk = createAsyncThunk<
//   OtpSuccessResponse, 
//   OtpVerificationPayload,
//   {rejectValue: string}>
// ('auth/verifyOtp', async(payload, {rejectWithValue}) =>{
//   try{
//     const response = await authAPI.verifyOtp(payload);
//     return response.data as OtpSuccessResponse;
//   }catch(err: unknown){
//     return rejectWithValue(getErrorMessage(err));
//   }
// });


// const getUserFromStorage = () => {
//   const rawUser = localStorage.getItem("user");
//   if (!rawUser || rawUser === "undefined") return null;
//   try {
//     return JSON.parse(rawUser);
//   } catch {
//     return null;
//   }
// };

// // Resend OTP Thunk (Unchanged)
// export const resendOtpThunk = createAsyncThunk<
//   { message: string }, 
//   OtpVerificationPayload, 
//   { rejectValue: string } 
// >(
//   'auth/resendOtp',
//   async (payload, { rejectWithValue }) => {
//     try {
//       const response = await authAPI.resendOtp(payload); 
//       return response.data;
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (error: any) {
//       const errorMessage = error.response?.data?.detail || 'Failed to resend code. Please try again.';
//       return rejectWithValue(errorMessage);
//     }
//   }
// );

// const initialState: AuthState = {
//   user: getUserFromStorage(),
//   token: localStorage.getItem("token"),
//   isLoading: false,
//   error: null,
//   is_verified: false,
//   mfaSetupData: null,
//   isMfaSetupConfirmed: false,
//   accessToken: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     clearAuthStatus: (state) => { 
//       state.isLoading = false;
//       state.error = null;
//     },
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       state.error = null;
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       localStorage.removeItem("refresh");
//     },
//     clearError: (state) => {
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Login
//       .addCase(loginUser.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.user = action.payload.user || action.payload;
//         state.token = action.payload.access || action.payload.token;
//         state.error = null;
//         localStorage.setItem(
//           "token",
//           action.payload.access || action.payload.token,
//         );
//         localStorage.setItem("user", JSON.stringify(action.payload.user)); 
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload as string;
//       })

//       // Register (Simplified from original due to duplication)
//       .addCase(registerUser.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.user = action.payload?.user ?? action.payload;
//         state.token = action.payload?.access ?? action.payload?.token;
//         state.error = null;

//         localStorage.setItem(
//           "token",
//           action.payload?.access || action.payload?.token,
//         );
//         localStorage.setItem("user", JSON.stringify(action.payload?.user));
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload as string;
//       })

//       // Forgot Pasword (Unchanged)
//       .addCase(forgotPassword.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(forgotPassword.fulfilled, (state) => {
//         state.isLoading = false;
//         state.error = null;
//       })
//       .addCase(forgotPassword.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload as string;
//       })

//       // Reset Password (Unchanged)
//       .addCase(resetPassword.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(resetPassword.fulfilled, (state) => {
//         state.isLoading = false;
//         state.error = null;
//       })
//       .addCase(resetPassword.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload as string;
//       })

//       // Logout Thunk (Unchanged)
//       .addCase(logoutUserThunk.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(logoutUserThunk.fulfilled, (state) => {
//         state.isLoading = false;
//       })
//       .addCase(logoutUserThunk.rejected, (state) => {
//         state.isLoading = false;
//       })
      
//       // Verify OTP Thunk (Unchanged)
//       .addCase(verifyOtpThunk.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(verifyOtpThunk.fulfilled, (state, action) => {
//         state.isLoading = false;
//         if (state.user && action.payload.user){
//           state.user = action.payload.user
//           localStorage.setItem("user", JSON.stringify(action.payload.user));
//         }
//         if (action.payload.token) {
//             state.token = action.payload.token;
//             localStorage.setItem("token", action.payload.token);
//         }
//         state.error = null;
//       })
//       .addCase(verifyOtpThunk.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload as string;
//       })
      
//       // *** ✅ FIX: ADD RESEND OTP THUNK REDUCERS ***
//       .addCase(resendOtpThunk.pending, (state) => {
//           state.isLoading = true;
//           state.error = null;
//       })
//       .addCase(resendOtpThunk.fulfilled, (state) => {
//           state.isLoading = false;
//           state.error = null;
//       })
//       .addCase(resendOtpThunk.rejected, (state, action) => {
//           state.isLoading = false;
//           state.error = action.payload as string;
//       });
//       // **********************************************
//   },
// });


// export const { logout, clearError, clearAuthStatus } = authSlice.actions;

// // Selectors
// export const selectUserDashboardRoute = (state: { auth: AuthState }) => {
//   return getDashboardRoute(state.auth.user);
// };

// export const selectIsAuthenticated = (state: { auth: AuthState }) => {
//   return !!state.auth.user && !!state.auth.token;
// };

// export default authSlice.reducer;
// // import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// // import {
// //   AuthState,
// //   LoginCredentials,
// //   RegisterCredentials,
// //   ForgotPasswordData,
// //   changePasswordData,
// //   LoginSuccessPayload,
//   OtpVerificationPayload,
//   OtpSuccessResponse,
//    ResendOtpPayload, 
//   User
// } from "./../../types/auth";
// import {  authAPI } from "../../api/apiConfig";
// import api from "../../api/apiConfig";
// import axios, { AxiosError } from "axios";
// // import { boolean } from "yup";
// import { getDashboardRoute } from "../../utils/routing";

// const getErrorMessage = (error: unknown): string => {
//   if (axios.isAxiosError(error)) {
//  return (
// (error.response?.data as { detail?: string })?.detail ||
// error.message ||
// "An unknown error occurred"
//  );
//  }
// if (error instanceof Error) {
//  return error.message;
// }
// return "An unexpected error occurred";
// };

// // Login Thunk
// export const loginUser = createAsyncThunk<
// LoginSuccessPayload,
// LoginCredentials, 
// { rejectValue: string } 
// >('auth/loginUser', async (credentials, { rejectWithValue }) => {
// try {
// const response = await authAPI.login(credentials)

// return response.data as LoginSuccessPayload; 
//  } catch (err) {
// const error: AxiosError = err as AxiosError;
// let errorMessage = 'Login failed. Please try again.';

// if (error.response && error.response.data) {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//  errorMessage = (error.response.data as any).detail || 'Invalid credentials.';
//  }

// return rejectWithValue(errorMessage);
//  }
// });

// // Register Thunk
// export const registerUser = createAsyncThunk<
// LoginSuccessPayload,
// RegisterCredentials, 
// { rejectValue: string }

// >(
// "auth/organization-signup/",
// async (credentials, {rejectWithValue},  
// ) => {
//   const dataWithDefaultRole = {
//         ...credentials,
//         role: credentials.role || 'employer'
//   }
// try { const response = await authAPI.register(dataWithDefaultRole);
 
//   return response.data as LoginSuccessPayload;
// } catch (error: unknown) {
// return rejectWithValue(getErrorMessage(error));
// }
//  },
// );

// // Forgot password Thunk
// // Forgot password Thunk
// export const forgotPassword = createAsyncThunk(
// "auth/reset-password",
// async (
// data: ForgotPasswordData & { onSuccess?: () => void },
// { rejectWithValue },
// ) => {
// try {
//  const response = await authAPI.forgotPassword(data);
//  data.onSuccess?.();
//  return response.data;
// } catch (error: unknown) {
// return rejectWithValue(getErrorMessage(error));
// }
//  },
// );

// // Reset password Thunk
// // Reset password Thunk
// export const resetPassword = createAsyncThunk(
//  "auth/change-password",
// async (
//  data: changePasswordData & { onSuccess?: () => void },
//  { rejectWithValue },
// ) => {
// try {
// const response = await authAPI.changePassword(data);
// data.onSuccess?.();
// return response.data;
//  } catch (error: unknown) {
//  return rejectWithValue(getErrorMessage(error));

// }
//  },
// );

// export const logoutUserThunk = createAsyncThunk<void,void>(
//   "auth/logout",

//   async (_, { dispatch}) => {
//     try {
      
//       await authAPI.logout()

//     } catch (error: unknown){
//     console.error("Server logout failed, but client session clearing.", getErrorMessage(error));
//     }
//   finally {
      
//       dispatch(logout())
//     // localStorage.removeItem("token");
//     // localStorage.removeItem("user");
//     // localStorage.removeItem("refresh")

//     delete api.defaults.headers.common["Authorization"];
//     }
//   }
// );

// export const verifyOtpThunk = createAsyncThunk<
// OtpSuccessResponse, 
// OtpVerificationPayload,
// {rejectValue: string}>
// ('auth/verifyOtp', async(payload, {rejectWithValue}) =>{
//   try{
//     const response = await authAPI.verifyOtp(payload);

//     return response.data as OtpSuccessResponse;
//   }catch(err: unknown){
//     return rejectWithValue(getErrorMessage(err));
//   }
// });


// const getUserFromStorage = () => {
// const rawUser = localStorage.getItem("user");
// if (!rawUser || rawUser === "undefined") return null;
// try {
// return JSON.parse(rawUser);
// } catch {
//  return null;
//  }
// };

// // resend otp
// export const resendOtpThunk = createAsyncThunk<
//   { message: string }, 
//   ResendOtpPayload, 
//   { rejectValue: string } 
// >(
//   'auth/resendOtp',
//   async ({ email }, { rejectWithValue }) => {
//     try {
//       const response = await authAPI.resendOtp({ email }); 
//       return response.data;
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (error: any) {
//       const errorMessage = error.response?.data?.message || 'Failed to resend code. Please try again.';
//       return rejectWithValue(errorMessage);
//     }
//   }
// );

// const initialState: AuthState = {
// user: getUserFromStorage(),
// token: localStorage.getItem("token"),
// isLoading: false,
// error: null,
// is_verified: false,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     clearAuthStatus: (state) => { 
//       state.isLoading = false;
//       state.error = null;
//     },

//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       state.error = null;
//       // Calling the async logout function

//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       localStorage.removeItem("refresh");
//       // Calling the async logout function

//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       localStorage.removeItem("refresh");
//     },
//     clearError: (state) => {
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Login
//       .addCase(loginUser.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.user = action.payload.user || action.payload;
//         state.user = action.payload.user || action.payload;
//         state.token = action.payload.access || action.payload.token;
//         state.error = null;

//    localStorage.setItem(
//  "token",
//  action.payload.access || action.payload.token,
// );

//  localStorage.setItem("user", JSON.stringify(action.payload.user)); 
// })
// .addCase(loginUser.rejected, (state, action) => {
// state.isLoading = false;
// state.error = action.payload as string;
//  })

// // Register
// .addCase(registerUser.pending, (state) => {
//  state.isLoading = true;
//  state.error = null;
// })
// .addCase(registerUser.fulfilled, (state, action) => {
// const userData = action.payload?.user ?? action.payload; 

// // Setting user and token
// state.user = userData;
// state.isLoading = false;
// state.user = action.payload?.user;
// state.token = action.payload?.access ?? action.payload?.token;
//  state.error = null;

// localStorage.setItem(
//  "token",
//  action.payload?.access || action.payload?.token,
//  );
//  //  storage "user"
// localStorage.setItem("user", JSON.stringify(action.payload?.user));
//  })
// .addCase(registerUser.rejected, (state, action) => {
//  state.isLoading = false;
//  state.error = action.payload as string;
// })


//  // Forgot Pasword
//  .addCase(forgotPassword.pending, (state) => {
//  state.isLoading = true;
//  state.error = null;
//  })
// .addCase(forgotPassword.fulfilled, (state) => {
//  state.isLoading = false;
//  state.error = null;
// })
// .addCase(forgotPassword.rejected, (state, action) => {
// state.isLoading = false;
//  state.error = action.payload as string;})

// // Reset Password
// .addCase(resetPassword.pending, (state) => {
// state.isLoading = true;
// state.error = null;
// })
// .addCase(resetPassword.fulfilled, (state) => {
//  state.isLoading = false;
//  state.error = null;
//  })
// .addCase(resetPassword.rejected, (state, action) => {
//  state.isLoading = false;
//  state.error = action.payload as string;
//  })

//  //logout thunk
//  .addCase(logoutUserThunk.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(logoutUserThunk.fulfilled, (state) => {
        
//         state.isLoading = false;
//       })
//       .addCase(logoutUserThunk.rejected, (state) => {
//         state.isLoading = false;
        
//       })
     
//   .addCase(verifyOtpThunk.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//     .addCase(verifyOtpThunk.fulfilled, (state, action) => {
//         state.isLoading = false;

//         //when updating the user state and local storage with new verified status
//         if (state.user && action.payload.user){
//           state.user = action.payload.user
//           localStorage.setItem("user", JSON.stringify(action.payload.user));
//         }

//         if (action.payload.token) {
//             state.token = action.payload.token;
//             localStorage.setItem("token", action.payload.token);
//         }
//         state.error = null;
//       })
//       .addCase(verifyOtpThunk.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload as string;
//         }
        
      
//       );
//  },
// });


// export const { logout, clearError, clearAuthStatus } = authSlice.actions;

// // Selectors  are used for easy access
// export const selectUserDashboardRoute = (state: { auth: AuthState }) => {
//   return getDashboardRoute(state.auth.user);
// };

// export const selectIsAuthenticated = (state: { auth: AuthState }) => {
//   return !!state.auth.user && !!state.auth.token;
// };

// export default authSlice.reducer;
