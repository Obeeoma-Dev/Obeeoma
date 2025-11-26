import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI } from "../../api/apiConfig";
import api from "../../api/apiConfig";
import axios from "axios";
import { getDashboardRoute } from "../../utils/routing";
const getErrorMessage = (error) => {
    if (axios.isAxiosError(error)) {
        return (error.response?.data?.detail ||
            error.message ||
            "An unknown error occurred");
    }
    if (error instanceof Error) {
        return error.message;
    }
    return "An unexpected error occurred";
};
// Login Thunk (Unchanged)
export const loginUser = createAsyncThunk('auth/loginUser', async (credentials, { rejectWithValue }) => {
    try {
        const response = await authAPI.login(credentials);
        return response.data;
    }
    catch (err) {
        const error = err;
        let errorMessage = 'Login failed. Please try again.';
        if (error.response && error.response.data) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            errorMessage = error.response.data.detail || 'Invalid credentials.';
        }
        return rejectWithValue(errorMessage);
    }
});
// Register Thunk (Unchanged)
export const registerUser = createAsyncThunk("auth/organization-signup/", async (credentials, { rejectWithValue }) => {
    const dataWithDefaultRole = {
        ...credentials,
        role: credentials.role || 'employer'
    };
    try {
        const response = await authAPI.register(dataWithDefaultRole);
        return response.data;
    }
    catch (error) {
        return rejectWithValue(getErrorMessage(error));
    }
});
// Forgot password Thunk (Unchanged)
export const forgotPassword = createAsyncThunk("auth/reset-password", async (data, { rejectWithValue }) => {
    try {
        const response = await authAPI.forgotPassword(data);
        data.onSuccess?.();
        return response.data;
    }
    catch (error) {
        return rejectWithValue(getErrorMessage(error));
    }
});
// Reset password Thunk (Unchanged)
export const resetPassword = createAsyncThunk("auth/change-password", async (data, { rejectWithValue }) => {
    try {
        const response = await authAPI.changePassword(data);
        data.onSuccess?.();
        return response.data;
    }
    catch (error) {
        return rejectWithValue(getErrorMessage(error));
    }
});
// Logout Thunk (Unchanged)
export const logoutUserThunk = createAsyncThunk("auth/logout", async (_, { dispatch }) => {
    try {
        await authAPI.logout();
    }
    catch (error) {
        console.error("Server logout failed, but client session clearing.", getErrorMessage(error));
    }
    finally {
        dispatch(logout());
        delete api.defaults.headers.common["Authorization"];
    }
});
// Verify OTP Thunk 
export const verifyOtpThunk = createAsyncThunk('auth/verifyOtp', async (payload, { rejectWithValue }) => {
    try {
        const response = await authAPI.verifyOtp(payload);
        return response.data;
    }
    catch (err) {
        return rejectWithValue(getErrorMessage(err));
    }
});
const getUserFromStorage = () => {
    const rawUser = localStorage.getItem("user");
    if (!rawUser || rawUser === "undefined")
        return null;
    try {
        return JSON.parse(rawUser);
    }
    catch {
        return null;
    }
};
// Resend OTP Thunk (Unchanged)
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
const initialState = {
    user: getUserFromStorage(),
    token: localStorage.getItem("token"),
    isLoading: false,
    error: null,
    is_verified: false,
    // Initial State for NEW MFA properties
    mfaSetupData: null,
    isMfaSetupConfirmed: false,
    // The accessToken is already stored in `token` above, 
    // but keeping this for potential future separation:
    accessToken: null,
};
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
            localStorage.setItem("token", action.payload.access || action.payload.token);
            localStorage.setItem("user", JSON.stringify(action.payload.user));
        })
            .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
            // Register (Simplified from original due to duplication)
            .addCase(registerUser.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
            .addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload?.user ?? action.payload;
            state.token = action.payload?.access ?? action.payload?.token;
            state.error = null;
            localStorage.setItem("token", action.payload?.access || action.payload?.token);
            localStorage.setItem("user", JSON.stringify(action.payload?.user));
        })
            .addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
            // Forgot Pasword (Unchanged)
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
            state.error = action.payload;
        })
            // Reset Password (Unchanged)
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
            state.error = action.payload;
        })
            // Logout Thunk (Unchanged)
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
            // Verify OTP Thunk (Unchanged)
            .addCase(verifyOtpThunk.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
            .addCase(verifyOtpThunk.fulfilled, (state, action) => {
            state.isLoading = false;
            if (state.user && action.payload.user) {
                state.user = action.payload.user;
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
            state.error = action.payload;
        });
    },
});
export const { logout, clearError, clearAuthStatus } = authSlice.actions;
// Selectors
export const selectUserDashboardRoute = (state) => {
    return getDashboardRoute(state.auth.user);
};
export const selectIsAuthenticated = (state) => {
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
