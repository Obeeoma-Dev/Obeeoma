import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { adminAPI } from "../../api/apiConfig";
import axios from "axios";
const getErrorMessage = (error) => {
    if (axios.isAxiosError(error)) {
        return (error.response?.data?.detail ||
            error.response?.data?.error ||
            error.message ||
            "An unknown error occurred");
    }
    if (error instanceof Error) {
        return error.message;
    }
    return "An unexpected error occurred";
};
export const fetchAdminDashboardStats = createAsyncThunk("admin/fetchDashboardStats", async (_, { rejectWithValue }) => {
    try {
        const response = await adminAPI.getDashboardStats();
        return response.data;
    }
    catch (error) {
        return rejectWithValue(getErrorMessage(error));
    }
});
export const fetchAllUsers = createAsyncThunk("admin/fetchAllUsers", async (_, { rejectWithValue }) => {
    try {
        const response = await adminAPI.getAllUsers();
        return response.data;
    }
    catch (error) {
        return rejectWithValue(getErrorMessage(error));
    }
});
export const deleteUser = createAsyncThunk("admin/deleteUser", async (userId, { rejectWithValue }) => {
    try {
        await adminAPI.deleteUser(userId);
        return userId; // Return the ID to easily remove it from the state
    }
    catch (error) {
        return rejectWithValue(getErrorMessage(error));
    }
});
const initialState = {
    users: [],
    dashboardStats: null,
    isLoading: false,
    error: null,
};
const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        clearAdminError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Dashboard Stats
            .addCase(fetchAdminDashboardStats.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
            .addCase(fetchAdminDashboardStats.fulfilled, (state, action) => {
            state.isLoading = false;
            state.dashboardStats = action.payload;
            state.error = null;
        })
            .addCase(fetchAdminDashboardStats.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
            // Fetch All Users
            .addCase(fetchAllUsers.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.users = action.payload;
            state.error = null;
        })
            .addCase(fetchAllUsers.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
            // Delete User
            .addCase(deleteUser.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
            .addCase(deleteUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.users = state.users.filter((user) => user.id !== action.payload);
            state.error = null;
        })
            .addCase(deleteUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    },
});
export const { clearAdminError } = adminSlice.actions;
export default adminSlice.reducer;
