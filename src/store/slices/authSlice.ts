// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import {
//   AuthState,
//   LoginCredentials,
//   RegisterCredentials,
//   ForgotPasswordData,
//   changePasswordData,
//   LoginSuccessPayload,
// } from "./../../types/auth";
// import { authAPI } from "../../api/apiConfig";
// import axios, { AxiosError } from "axios";

// const getErrorMessage = (error: unknown): string => {
//   if (axios.isAxiosError(AxiosError)) {
//     return (
//       (AxiosError.response?.data as { detail?: string })?.detail ||
//       AxiosError.message ||
//       "An unknown error occurred"
//     );
//   }
//   if (error instanceof Error) {
//     return error.message;
//   }
//   return "An unexpected error occurred";
// };

// // Login
// // export const loginUser = createAsyncThunk(
// //   "auth/login",
// //   async (
// //     credentials: LoginCredentials & { onSuccess?: () => void },
// //     { rejectWithValue },
// //   ) => {
// //     try {
// //       const response = await authAPI.login(credentials);
// //       credentials.onSuccess?.();
// //       return response.data;
// //     } catch (error: unknown) {
// //       return rejectWithValue(getErrorMessage(error));
// //     }
// //   },
// // );

// export const loginUser = createAsyncThunk<
//     LoginSuccessPayload,
//     LoginCredentials,   
//     { rejectValue: string } 
// >('auth/loginUser', async (credentials, { rejectWithValue }) => {
//     try {
//         const response = await authAPI.login(credentials)
        
//         return response.data as LoginSuccessPayload; 
//     } catch (err) {
//         let error: AxiosError = err as AxiosError;
//         let errorMessage = 'Login failed. Please try again.';

//         if (error.response && error.response.data) {
//             errorMessage = (error.response.data as any).detail || 'Invalid credentials.';
//         }
    
//         return rejectWithValue(errorMessage);
//     }
// });
// // Register
// export const registerUser = createAsyncThunk(
//   "auth/signup",
//   async (
//     credentials: RegisterCredentials & { onSuccess?: () => void },
//     { rejectWithValue },
//   ) => {
//     try {
//       const response = await authAPI.register(credentials);
//       credentials.onSuccess?.();
//       return response.data;
//     } catch (error: unknown) {
//       return rejectWithValue(getErrorMessage(error));
//     }
//   },
// );
// // Forgot password
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

// // Reset password 
// export const resetPassword = createAsyncThunk(
//   "auth/accept-invite",
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

// const getUserFromStorage = () => {
//   const rawUser = localStorage.getItem("user");
//   if (!rawUser || rawUser === "undefined") return null;
//   try {
//     return JSON.parse(rawUser);
//   } catch {
//     return null;
//   }
// };

// const initialState: AuthState = {
//   user: getUserFromStorage(),
//   token: localStorage.getItem("token"),
//   isLoading: false,
//   error: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       state.error = null;
//       authAPI.logout();
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
//         state.user = action.payload.user;
//         state.token = action.payload.access || action.payload.token;
//         state.error = null;

//         localStorage.setItem(
//           "token",
//           action.payload.access || action.payload.token,
//         );
//         localStorage.setItem("token", JSON.stringify(action.payload.user));
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload as string;
//       })

//       // Register
//       .addCase(registerUser.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.user = action.payload.user;
//         state.token = action.payload.access || action.payload.token;
//         state.error = null;

//         localStorage.setItem(
//           "token",
//           action.payload.access || action.payload.token,
//         );
//         localStorage.setItem("user", JSON.stringify(action.payload.user));
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload as string;
//       })
//       // Forgot Pasword
//       .addCase(forgotPassword.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(forgotPassword.fulfilled, (state) => {
//         state.isLoading = false;
//         // State remains unchanged, as no user/token data is returned
//         state.error = null;
//       })
//       .addCase(forgotPassword.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload as string;
//       })

//       // Reset Password
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
//       });
//   },
// });

// export const { logout, clearError } = authSlice.actions;
// export default authSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  AuthState,
  LoginCredentials,
  RegisterCredentials,
  ForgotPasswordData,
  changePasswordData,
  LoginSuccessPayload, 
} from "./../../types/auth";
import { authAPI } from "../../api/apiConfig";
import axios, { AxiosError } from "axios";
import { getDashboardRoute } from "../../utils/routing";

// FIX 1: Corrected error variable usage
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
        let error: AxiosError = err as AxiosError;
        let errorMessage = 'Login failed. Please try again.';

        if (error.response && error.response.data) {
            errorMessage = (error.response.data as any).detail || 'Invalid credentials.';
        }
    
        return rejectWithValue(errorMessage);
    }
});

// Register Thunk
export const registerUser = createAsyncThunk(
  "auth/signup",
  async (
    credentials: RegisterCredentials & { onSuccess?: () => void },
    { rejectWithValue },
  ) => {
    try {
      const response = await authAPI.register(credentials);
      credentials.onSuccess?.();
      return response.data as LoginSuccessPayload; // Assuming register returns the same payload for simplicity
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
  "auth/accept-invite",
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
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      // Call the async logout function
      authAPI.logout();
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
        state.user = action.payload.user;
        state.token = action.payload.access || action.payload.token;
        state.error = null;

        localStorage.setItem(
          "token",
          action.payload.access || action.payload.token,
        );
        //FIX 2: Correct storage key to "user"
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
        state.user = action.payload.user;
        state.token = action.payload.access || action.payload.token;
        state.error = null;

        localStorage.setItem(
          "token",
          action.payload.access || action.payload.token,
        );
        //  FIX 2: Correct storage key to "user"
        localStorage.setItem("user", JSON.stringify(action.payload.user));
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
      });
  },
});

export const { logout, clearError } = authSlice.actions;

// Selectors for easy access to computed values
export const selectUserDashboardRoute = (state: { auth: AuthState }) => {
  return getDashboardRoute(state.auth.user);
};

export const selectIsAuthenticated = (state: { auth: AuthState }) => {
  return !!state.auth.user && !!state.auth.token;
};

export default authSlice.reducer;
