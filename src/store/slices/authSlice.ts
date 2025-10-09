import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  AuthState,
  LoginCredentials,
  RegisterCredentials,
} from "./../../types/auth";
import { authAPI } from "../../api/apiConfig";
import axios, { AxiosError } from "axios";

// Helper function to extract error message
const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(AxiosError)) {
    return (
      (AxiosError.response?.data as { detail?: string })?.detail ||
      AxiosError.message ||
      "An unknown error occurred"
    );
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "An unexpected error occurred";
};

// Login
export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    credentials: LoginCredentials & { onSuccess?: () => void },
    { rejectWithValue },
  ) => {
    try {
      const response = await authAPI.login(credentials);
      credentials.onSuccess?.();
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

// Register
export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    credentials: RegisterCredentials & { onSuccess?: () => void },
    { rejectWithValue },
  ) => {
    try {
      const response = await authAPI.register(credentials);
      credentials.onSuccess?.();
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
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
