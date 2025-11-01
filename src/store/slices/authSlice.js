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
// Login Thunk
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
// Register Thunk
export const registerUser = createAsyncThunk("auth/signup", async (credentials, { rejectWithValue }) => {
    try {
        const response = await authAPI.register(credentials);
        return response.data;
    }
    catch (error) {
        return rejectWithValue(getErrorMessage(error));
    }
});
// Forgot password Thunk
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
// Reset password Thunk
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
export const logoutUserThunk = createAsyncThunk("auth/serverLogout", async (_, { dispatch }) => {
    try {
        await authAPI.logout();
    }
    catch (error) {
        console.error("Server logout failed, but client session cleared.", getErrorMessage(error));
        dispatch(logout());
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        delete api.defaults.headers.common["Authorization"];
        return;
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
        clearAuthStatus: (state) => {
            state.isLoading = false;
            state.error = null;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.error = null;
            // Calling the async logout function
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            // authAPI.logout();
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
            // Register
            .addCase(registerUser.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
            .addCase(registerUser.fulfilled, (state, action) => {
            const userData = action.payload.user || action.payload;
            // Setting user and token
            state.user = userData;
            state.isLoading = false;
            state.user = action.payload.user;
            state.token = action.payload.access || action.payload.token;
            state.error = null;
            localStorage.setItem("token", action.payload.access || action.payload.token);
            //  storage "user"
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
        })
            .addCase(logoutUserThunk.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
            .addCase(logoutUserThunk.fulfilled, (state) => {
            state.isLoading = false;
        })
            .addCase(logoutUserThunk.rejected, (state) => {
            state.isLoading = false;
        });
    },
});
export const { logout, clearError, clearAuthStatus } = authSlice.actions;
// Selectors  are used for easy access
export const selectUserDashboardRoute = (state) => {
    return getDashboardRoute(state.auth.user);
};
export const selectIsAuthenticated = (state) => {
    return !!state.auth.user && !!state.auth.token;
};
export default authSlice.reducer;
