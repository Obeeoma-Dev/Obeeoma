// slices/admin/adminSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// Adjust this path to match your project structure
import { adminAPI } from "../../api/apiConfig";
// --- Error Handler (Refined for correct AxiosError casting) ---
const getErrorMessage = (error) => {
    if (axios.isAxiosError(error)) {
        const axiosError = error;
        return (axiosError.response?.data?.detail ||
            axiosError.response?.data?.error ||
            axiosError.message ||
            "An unknown error occurred");
    }
    if (error instanceof Error) {
        return error.message;
    }
    return "An unexpected error occurred";
};
export const fetchAdminDashboardStats = createAsyncThunk("admin/fetchStats", async (_, { rejectWithValue }) => {
    try {
        const response = await adminAPI.getDashboardStats();
        return response.data;
    }
    catch (error) {
        return rejectWithValue(getErrorMessage(error));
    }
});
// GET /v1/dashboard/users/
export const fetchAllUsers = createAsyncThunk("admin/fetchAllUsers", async (_, { rejectWithValue }) => {
    try {
        const response = await adminAPI.getAllUsers();
        return response.data;
    }
    catch (error) {
        return rejectWithValue(getErrorMessage(error));
    }
});
// GET /v1/dashboard/overview
export const fetchDashboardSummary = createAsyncThunk("admin/fetchSummary", async (_, { rejectWithValue }) => {
    try {
        const response = await adminAPI.getDashboardSummary();
        return response.data;
    }
    catch (error) {
        return rejectWithValue(getErrorMessage(error));
    }
});
// GET /v1/dashboard/crisis-insights/views/
export const fetchCrisisInsights = createAsyncThunk("admin/fetchCrisisInsights", async (_, { rejectWithValue }) => {
    try {
        const response = await adminAPI.getCrisisInsights();
        return response.data;
    }
    catch (error) {
        return rejectWithValue(getErrorMessage(error));
    }
});
// Define async thunk for fetching employee engagement data
export const fetchEmployeeEngagement = createAsyncThunk("admin/fetchEmployeeEngagement", // Redux action type
async (_, { rejectWithValue }) => {
    try {
        // Call admin API to fetch engagement data
        const response = await adminAPI.getEmployeeEngagement();
        return response.data; // Cast response to expected type
    }
    catch (error) {
        // Use shared error handler to extract message
        return rejectWithValue(getErrorMessage(error));
    }
});
// Define async thunk for fetching admin reports
export const fetchReports = createAsyncThunk("admin/fetchReports", // Redux action type
async (_, { rejectWithValue }) => {
    try {
        // Call admin API to fetch reports (assumed GET or POST without params)
        const response = await adminAPI.getReports();
        return response.data; // Cast response to expected Report[] type
    }
    catch (error) {
        // Use shared error handler to extract message
        return rejectWithValue(getErrorMessage(error));
    }
});
// GET /v1/dashboard/trends
export const fetchTrends = createAsyncThunk("admin/fetchTrends", async (_, { rejectWithValue }) => {
    try {
        const response = await adminAPI.getTrends();
        return response.data;
    }
    catch (error) {
        return rejectWithValue(getErrorMessage(error));
    }
});
export const deleteUser = createAsyncThunk("admin/deleteUser", async (userId, // Added onSuccess pattern
{ rejectWithValue }) => {
    try {
        await adminAPI.deleteUser(userId);
        return userId;
    }
    catch (error) {
        return rejectWithValue(getErrorMessage(error));
    }
});
// POST /v1/dashboard/invites/ (Add Employee)
export const addEmployeeInvite = createAsyncThunk("admin/addEmployeeInvite", async (inviteData, // Added data and onSuccess pattern
{ rejectWithValue }) => {
    try {
        // Assuming 'addEmployee' takes the data needed for the invite
        const response = await adminAPI.addEmployee();
        inviteData.onSuccess?.();
        return response.data;
    }
    catch (error) {
        return rejectWithValue(getErrorMessage(error));
    }
});
// POST /v1/dashboard/crisis-insights/add/
export const createCrisisInsight = createAsyncThunk("admin/createCrisisInsight", async (data, // Added data and onSuccess pattern
{ rejectWithValue }) => {
    try {
        // Assuming 'postCrisisInsights' takes the data for the new insight
        const response = await adminAPI.postCrisisInsights();
        data.onSuccess?.();
        return response.data;
    }
    catch (error) {
        return rejectWithValue(getErrorMessage(error));
    }
});
// POST /v1/dashboard/crisis-insights/update/
export const updateCrisisInsight = createAsyncThunk("admin/updateCrisisInsight", async (data, // Added data and onSuccess pattern
{ rejectWithValue }) => {
    try {
        // Assuming 'putCrisisInsights' takes the data for the update
        const response = await adminAPI.putCrisisInsights();
        data.onSuccess?.();
        return response.data;
    }
    catch (error) {
        return rejectWithValue(getErrorMessage(error));
    }
});
// POST /v1/dashboard/crisis-insights/changes/
export const changeCrisisInsight = createAsyncThunk("admin/changeCrisisInsight", async (data, // Added data and onSuccess pattern
{ rejectWithValue }) => {
    try {
        // Assuming 'changeCrisisInsights' takes the data for the change
        const response = await adminAPI.changeCrisisInsights();
        data.onSuccess?.();
        return response.data;
    }
    catch (error) {
        return rejectWithValue(getErrorMessage(error));
    }
});
// POST /v1/dashboard/feature-usage
export const createFeatureUsage = createAsyncThunk("admin/createFeatureUsage", async (data, // Added data and onSuccess pattern
{ rejectWithValue }) => {
    try {
        const response = await adminAPI.createFeatureUsage();
        data.onSuccess?.();
        return response.data;
    }
    catch (error) {
        return rejectWithValue(getErrorMessage(error));
    }
});
const initialState = {
    users: [],
    summary: null,
    stats: null,
    crisisInsights: [],
    employeeEngagement: null,
    reports: [],
    trends: null,
    isLoading: false,
    isActionLoading: false,
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
        // --- Helper function for consistent state management (like authSlice) ---
        const handlePending = (state) => {
            state.isLoading = true;
            state.error = null;
        };
        const handleActionPending = (state) => {
            state.isActionLoading = true;
            state.error = null;
        };
        const handleRejected = (state, action) => {
            state.isLoading = false;
            state.isActionLoading = false;
            state.error = action.payload;
        };
        const handleActionFulfilled = (state) => {
            state.isActionLoading = false;
        };
        builder
            // --- Dashboard Stats ---
            .addCase(fetchAdminDashboardStats.pending, handlePending)
            .addCase(fetchAdminDashboardStats.fulfilled, (state, action) => {
            state.isLoading = false;
            state.stats = action.payload;
        })
            .addCase(fetchAdminDashboardStats.rejected, handleRejected)
            // --- All Users ---
            .addCase(fetchAllUsers.pending, handlePending)
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.users = action.payload;
        })
            .addCase(fetchAllUsers.rejected, handleRejected)
            // --- Dashboard Summary ---
            .addCase(fetchDashboardSummary.pending, handlePending)
            .addCase(fetchDashboardSummary.fulfilled, (state, action) => {
            state.isLoading = false;
            state.summary = action.payload;
        })
            .addCase(fetchDashboardSummary.rejected, handleRejected)
            // --- Crisis Insights (GET) ---
            .addCase(fetchCrisisInsights.pending, handlePending)
            .addCase(fetchCrisisInsights.fulfilled, (state, action) => {
            state.isLoading = false;
            state.crisisInsights = action.payload;
        })
            .addCase(fetchCrisisInsights.rejected, handleRejected)
            // --- Employee Engagement (POST/GET) ---
            .addCase(fetchEmployeeEngagement.pending, handlePending)
            .addCase(fetchEmployeeEngagement.fulfilled, (state, action) => {
            state.isLoading = false;
            state.employeeEngagement = action.payload;
        })
            .addCase(fetchEmployeeEngagement.rejected, handleRejected)
            // --- Reports (POST/GET) ---
            .addCase(fetchReports.pending, handlePending)
            .addCase(fetchReports.fulfilled, (state, action) => {
            state.isLoading = false;
            state.reports = action.payload;
        })
            .addCase(fetchReports.rejected, handleRejected)
            // --- Trends (GET) ---
            .addCase(fetchTrends.pending, handlePending)
            .addCase(fetchTrends.fulfilled, (state, action) => {
            state.isLoading = false;
            state.trends = action.payload;
        })
            .addCase(fetchTrends.rejected, handleRejected)
            // --- Delete User ---
            .addCase(deleteUser.pending, handleActionPending)
            .addCase(deleteUser.fulfilled, (state, action) => {
            handleActionFulfilled(state);
            // Remove the user from the state array
            state.users = state.users.filter((user) => user.id !== action.payload);
        })
            .addCase(deleteUser.rejected, handleRejected)
            // --- Crisis Insight Actions (POST/UPDATE/CHANGE) ---
            .addCase(createCrisisInsight.pending, handleActionPending)
            .addCase(updateCrisisInsight.pending, handleActionPending)
            .addCase(changeCrisisInsight.pending, handleActionPending)
            // Add new insight
            .addCase(createCrisisInsight.fulfilled, (state, action) => {
            handleActionFulfilled(state);
            state.crisisInsights.push(action.payload);
        })
            // Update existing insight
            .addCase(updateCrisisInsight.fulfilled, (state, action) => {
            handleActionFulfilled(state);
            const index = state.crisisInsights.findIndex((insight) => insight.id === action.payload.id);
            if (index !== -1) {
                state.crisisInsights[index] = action.payload;
            }
        })
            // Change/Edit insight status/data (assuming it's similar to an update)
            .addCase(changeCrisisInsight.fulfilled, (state, action) => {
            handleActionFulfilled(state);
            const index = state.crisisInsights.findIndex((insight) => insight.id === action.payload.id);
            if (index !== -1) {
                state.crisisInsights[index] = action.payload;
            }
        })
            .addCase(createCrisisInsight.rejected, handleRejected)
            .addCase(updateCrisisInsight.rejected, handleRejected)
            .addCase(changeCrisisInsight.rejected, handleRejected)
            // --- Add Employee Invite ---
            .addCase(addEmployeeInvite.pending, handleActionPending)
            .addCase(addEmployeeInvite.fulfilled, handleActionFulfilled)
            .addCase(addEmployeeInvite.rejected, handleRejected)
            // --- Create Feature Usage ---
            .addCase(createFeatureUsage.pending, handleActionPending)
            .addCase(createFeatureUsage.fulfilled, handleActionFulfilled)
            .addCase(createFeatureUsage.rejected, handleRejected);
    },
});
export const { clearAdminError } = adminSlice.actions;
export default adminSlice.reducer;
