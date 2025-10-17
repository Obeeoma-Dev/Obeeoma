import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI } from "../../api/apiConfig";
import axios, { AxiosError } from "axios";
const getErrorMessage = (error) => {
    if (axios.isAxiosError(AxiosError)) {
        return (AxiosError.response?.data?.detail ||
            AxiosError.message ||
            "An unknown error occurred");
    }
    if (error instanceof Error) {
        return error.message;
    }
    return "An unexpected error occurred";
};
// Login
export const loginUser = createAsyncThunk("auth/login", async (credentials, { rejectWithValue }) => {
    try {
        const response = await authAPI.login(credentials);
        credentials.onSuccess?.();
        return response.data;
    }
    catch (error) {
        return rejectWithValue(getErrorMessage(error));
    }
});
// Register
export const registerUser = createAsyncThunk("auth/signup", async (credentials, { rejectWithValue }) => {
    try {
        const response = await authAPI.register(credentials);
        credentials.onSuccess?.();
        return response.data;
    }
    catch (error) {
        return rejectWithValue(getErrorMessage(error));
    }
});
// Forgot password
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
// Reset password
export const resetPassword = createAsyncThunk("auth/resetPassword", async (data, { rejectWithValue }) => {
    try {
        const response = await authAPI.changePassword(data);
        data.onSuccess?.();
        return response.data;
    }
    catch (error) {
        return rejectWithValue(getErrorMessage(error));
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
const initialState = {
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
            localStorage.setItem("token", action.payload.access || action.payload.token);
            localStorage.setItem("user", JSON.stringify(action.payload.user));
        })
            .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
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
            localStorage.setItem("token", action.payload.access || action.payload.token);
            localStorage.setItem("user", JSON.stringify(action.payload.user));
        })
            .addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
            // Forgot Pasword
            .addCase(forgotPassword.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
            .addCase(forgotPassword.fulfilled, (state) => {
            state.isLoading = false;
            // State remains unchanged, as no user/token data is returned
            state.error = null;
        })
            .addCase(forgotPassword.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
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
            state.error = action.payload;
        });
    },
});
export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
