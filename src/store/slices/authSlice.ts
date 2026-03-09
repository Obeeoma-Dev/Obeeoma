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
  ResendOtpPayload,
  MfaSetupData,
  // MfaVerifyPayload,
  ChangePassword,
} from "./../../types/auth";
import { authAPI } from "../../api/apiConfig";
import api from "../../api/apiConfig";
import axios, { AxiosError } from "axios";
import { getDashboardRoute } from "../../utils/routing";
import { RootState } from "../store";
import { clearContentState } from "./contentSlice";

const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    // Attempt to get a detailed error message from the response data
    return (
      (error.response?.data as { detail?: string })?.detail ||
      // Handle errors that are arrays of messages (common in DRF)
      (error.response?.data as { non_field_errors?: string[] })
        ?.non_field_errors?.[0] ||
      // Fallback to the general error message
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
>("auth/loginUser", async (credentials, { rejectWithValue }) => {
  try {
    const response = await authAPI.login(credentials);
    return response.data as LoginSuccessPayload;
  } catch (err) {
    const error: AxiosError = err as AxiosError;
    let errorMessage = "Login failed. Please try again.";

    if (error.response && error.response.data) {
      errorMessage =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (error.response.data as any).detail || "Invalid credentials.";
    }
    return rejectWithValue(errorMessage);
  }
});

// Register Thunk
export const registerUser = createAsyncThunk<
  LoginSuccessPayload,
  RegisterCredentials,
  { rejectValue: string }
>("auth/organization-signup/", async (credentials, { rejectWithValue }) => {
  const dataWithDefaultRole = {
    ...credentials,
    role: credentials.role || "employer",
  };
  try {
    const response = await authAPI.register(dataWithDefaultRole);
    return response.data as LoginSuccessPayload;
  } catch (error: unknown) {
    return rejectWithValue(getErrorMessage(error));
  }
});

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
export const changePassword = createAsyncThunk(
  "auth/change-org-password",
  async (
    data: ChangePassword & { onSuccess?: () => void },
    { rejectWithValue },
  ) => {
    try {
      // Extract onSuccess so it's not sent to API
      const { onSuccess, ...apiData } = data;

      const response = await authAPI.ChangeorgPassword(apiData);

      onSuccess?.();
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const resetPassword = createAsyncThunk(
  "auth/reset-password/complete",
  async (
    data: changePasswordData & { onSuccess?: () => void },
    { rejectWithValue },
  ) => {
    try {
      // Extract onSuccess so it's not sent to API
      const { onSuccess, ...apiData } = data;

      const response = await authAPI.changePassword(apiData);

      onSuccess?.();
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

// Logout Thunk
export const logoutUserThunk = createAsyncThunk<void, void>(
  "auth/logout",
  async (_, { dispatch }) => {
    try {
      await authAPI.logout();
    } catch (error: unknown) {
      console.error(getErrorMessage(error));
    } finally {
      // Clear all authentication data
      dispatch(logout());
      delete api.defaults.headers.common["Authorization"];

      // AGGRESSIVE CACHE CLEARING ON LOGOUT
      console.log(" Clearing browser cache on logout...");

      // Clear all localStorage data
      localStorage.clear();
      sessionStorage.clear();

      // Clear IndexedDB (if used)
      if ("caches" in window) {
        caches.keys().then((names) => {
          names.forEach((name) => {
            caches.delete(name);
          });
        });
      }

      // Force cache busting with timestamp
      const timestamp = Date.now();

      // Replace current history to prevent back navigation
      window.history.replaceState(
        { loggedOut: true, timestamp },
        "",
        `/login?t=${timestamp}`,
      );
      window.history.pushState(
        { loggedOut: true, timestamp },
        "",
        `/login?t=${timestamp}`,
      );

      // Prevent back button from accessing cached pages
      const preventBack = (event: PopStateEvent) => {
        console.log(" Preventing back navigation after logout");
        event.preventDefault();
        window.history.pushState({ loggedOut: true }, "", "/login");
      };

      window.addEventListener("popstate", preventBack);

      // Clean up the listener after a short delay
      setTimeout(() => {
        window.removeEventListener("popstate", preventBack);
      }, 100);

      dispatch(logout());
      delete api.defaults.headers.common["Authorization"];
    }
  },
);

// Verify OTP Thunk
export const verifyOtpThunk = createAsyncThunk<
  OtpSuccessResponse,
  OtpVerificationPayload,
  { rejectValue: string }
>("auth/verifyOtp", async (payload, { rejectWithValue }) => {
  try {
    const response = await authAPI.verifyOtp(payload);
    return response.data as OtpSuccessResponse;
  } catch (err: unknown) {
    return rejectWithValue(getErrorMessage(err));
  }
});

// Resend OTP Thunk
export const resendOtpThunk = createAsyncThunk<
  { message: string },
  ResendOtpPayload,
  { rejectValue: string }
>("auth/resendOtp", async (payload, { rejectWithValue }) => {
  try {
    const response = await authAPI.forgotPassword({ email: payload.email });
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.detail ||
      "Failed to resend code. Please try again.";
    return rejectWithValue(errorMessage);
  }
});

// MFA Setup: Initiates the process, typically returning the secret key and QR code data.
export const setupMfa = createAsyncThunk<
  MfaSetupData, // 1. Return type on success (The QR code data)
  void, // 2. Argument type (No input needed from the component)
  {
    rejectValue: string;
    state: RootState;
  }
>("auth/setupMfa", async (_, { rejectWithValue, getState }) => {
  try {
    const state = getState() as RootState;

    // Check if we have a temp_token from login (state or localStorage)
    let tempToken = state.auth.tempToken;

    if (!tempToken) {
      tempToken = localStorage.getItem("temp_token");
    }

    if (!tempToken) {
      // Wait a bit and try again (timing fix)
      await new Promise((resolve) => setTimeout(resolve, 50));
      tempToken = localStorage.getItem("temp_token");
    }

    if (!tempToken) {
      return rejectWithValue("No temporary token found. Please login first.");
    }

    console.log("setupMfa - using tempToken:", tempToken);

    // Use authAPI to ensure proper interceptor handling
    const response = await authAPI.fetchMfaSetupData({});
    console.log("setupMfa - response:", response);

    // Return the data from the Axios response
    return response.data as MfaSetupData;
  } catch (err: unknown) {
    console.error("setupMfa error:", err);
    return rejectWithValue(getErrorMessage(err));
  }
});

export const confirmMfa = createAsyncThunk<
  LoginSuccessPayload, // Return the login success payload from backend
  { temp_token: string; code: string }, // Argument is the payload { temp_token: string, code: string }
  {
    rejectValue: string;
  }
>("auth/confirmMfa", async (payload, { rejectWithValue }) => {
  try {
    const response = await authAPI.confirmMfaSetup(payload);
    return response.data as LoginSuccessPayload;
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
  tempToken: null, // Add temp token
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

// Auth Slice Definition

function saveAuthValue(
  key: "refresh" | "token" | "user" | "temp_token",
  value = "",
) {
  console.log(
    `saveAuthValue called: key=${key}, value=${value}, type=${typeof value}`,
  );
  if (!value) {
    console.log(`Removing ${key} from localStorage`);
    localStorage.removeItem(key);
  } else {
    console.log(`Setting ${key} in localStorage:`, value);
    localStorage.setItem(key, value);
  }
}

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
      // Clear content state on logout
      clearContentState();
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
        console.log("loginUser.fulfilled - action.payload:", action.payload);
        state.isLoading = false;
        state.user = action.payload.user || action.payload;
        state.token = action.payload.access || action.payload.token;
        // Since `token` is updated, also update `accessToken` if it's used elsewhere
        state.accessToken = action.payload.access || action.payload.token;
        state.tempToken = action.payload.temp_token || null; // Save temp token
        state.error = null;

        // Handle MFA setup data if included in login response
        if (action.payload.mfa_setup_data) {
          console.log(
            "Setting MFA setup data from login response:",
            action.payload.mfa_setup_data,
          );
          state.mfaSetupData = action.payload.mfa_setup_data;
        } else {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          state.mfaSetupData = action.payload as any;
        }

        console.log("About to save auth values...");
        saveAuthValue("token", action.payload?.access || action.payload?.token);
        saveAuthValue("refresh", action.payload.refresh);
        saveAuthValue("user", JSON.stringify(action.payload.user));
        saveAuthValue("temp_token", action.payload.temp_token);
        console.log("Auth values saved");
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
        state.accessToken = action.payload?.access ?? action.payload?.token;
        state.error = null;

        saveAuthValue("token", action.payload?.access || action.payload?.token);
        saveAuthValue("refresh", action.payload?.refresh);
        saveAuthValue("user", JSON.stringify(action.payload?.user));
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
        saveAuthValue("token", undefined);
        saveAuthValue("refresh", undefined);
        saveAuthValue("user", undefined);
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
      // MFA Setup: Get QR Code and Secret
      // -----------------------------------
      .addCase(setupMfa.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(setupMfa.fulfilled, (state, action) => {
        state.isLoading = false;
        state.mfaSetupData = action.payload; // Store the QR code/Secret data
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
      .addCase(confirmMfa.fulfilled, (state, action) => {
        state.isLoading = false;
        state.mfaSetupData = null;
        state.isMfaSetupConfirmed = true; // Set status to confirmed
        state.error = null;

        // Handle the response from backend with tokens and user data
        if (action.payload) {
          // Update tokens
          state.token = action.payload.access;
          state.accessToken = action.payload.access;
          state.user = action.payload.user;

          // Save to localStorage
          localStorage.setItem("token", action.payload.access);
          localStorage.setItem("refresh", action.payload.refresh);
          localStorage.setItem("user", JSON.stringify(action.payload.user));
        }

        if (state.user) {
          state.user.mfa_enabled = true;
        }
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
