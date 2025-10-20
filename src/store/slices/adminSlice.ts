// slices/admin/adminSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
// Adjust this path to match your project structure
import { adminAPI } from "../../api/apiConfig"; 
import {
  AdminState,
  AdminUser,
  DashboardStats,
  DashboardSummary,
  CrisisInsight,
  EmployeeEngagementData,
  Report,
  TrendData,
} from "../../types/admin"; // Using the updated types file

// --- Error Handler (Refined for correct AxiosError casting) ---
const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    return (
      (axiosError.response?.data as { detail?: string; error?: string })?.detail ||
      (axiosError.response?.data as { detail?: string; error?: string })?.error ||
      axiosError.message ||
      "An unknown error occurred"
    );
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "An unexpected error occurred";
};


export const fetchAdminDashboardStats = createAsyncThunk(
  "admin/fetchStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminAPI.getDashboardStats();
      return response.data as DashboardStats;
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// GET /v1/dashboard/users/
export const fetchAllUsers = createAsyncThunk(
  "admin/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminAPI.getAllUsers();
      return response.data as AdminUser[];
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// GET /v1/dashboard/overview
export const fetchDashboardSummary = createAsyncThunk(
  "admin/fetchSummary",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminAPI.getDashboardSummary();
      return response.data as DashboardSummary;
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// GET /v1/dashboard/crisis-insights/views/
export const fetchCrisisInsights = createAsyncThunk(
  "admin/fetchCrisisInsights",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminAPI.getCrisisInsights();
      return response.data as CrisisInsight[];
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);


export const fetchEmployeeEngagement = createAsyncThunk(
  "admin/fetchEmployeeEngagement",
  async (filters: any = {}, { rejectWithValue }) => { 
    try {
      const response = await adminAPI.getEmployeeEngagement();
      return response.data as EmployeeEngagementData;
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);


export const fetchReports = createAsyncThunk(
  "admin/fetchReports",
  async (reportParams: any = {}, { rejectWithValue }) => { // Added optional report parameters
    try {
      const response = await adminAPI.getReports();
      return response.data as Report[];
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// GET /v1/dashboard/trends
export const fetchTrends = createAsyncThunk(
  "admin/fetchTrends",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminAPI.getTrends();
      return response.data as TrendData[];
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);


export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (
    userId: string | number & { onSuccess?: () => void }, // Added onSuccess pattern
    { rejectWithValue },
  ) => {
    try {
      await adminAPI.deleteUser(userId);
  
      return userId; 
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// POST /v1/dashboard/invites/ (Add Employee)
export const addEmployeeInvite = createAsyncThunk(
  "admin/addEmployeeInvite",
  async (
    inviteData: any & { onSuccess?: () => void }, // Added data and onSuccess pattern
    { rejectWithValue },
  ) => {
    try {
      // Assuming 'addEmployee' takes the data needed for the invite
      const response = await adminAPI.addEmployee();
      inviteData.onSuccess?.();
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// POST /v1/dashboard/crisis-insights/add/
export const createCrisisInsight = createAsyncThunk(
  "admin/createCrisisInsight",
  async (
    data: any & { onSuccess?: () => void }, // Added data and onSuccess pattern
    { rejectWithValue },
  ) => {
    try {
      // Assuming 'postCrisisInsights' takes the data for the new insight
      const response = await adminAPI.postCrisisInsights();
      data.onSuccess?.();
      return response.data as CrisisInsight;
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// POST /v1/dashboard/crisis-insights/update/
export const updateCrisisInsight = createAsyncThunk(
  "admin/updateCrisisInsight",
  async (
    data: any & { onSuccess?: () => void }, // Added data and onSuccess pattern
    { rejectWithValue },
  ) => {
    try {
      // Assuming 'putCrisisInsights' takes the data for the update
      const response = await adminAPI.putCrisisInsights();
      data.onSuccess?.();
      return response.data as CrisisInsight;
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// POST /v1/dashboard/crisis-insights/changes/
export const changeCrisisInsight = createAsyncThunk(
  "admin/changeCrisisInsight",
  async (
    data: any & { onSuccess?: () => void }, // Added data and onSuccess pattern
    { rejectWithValue },
  ) => {
    try {
      // Assuming 'changeCrisisInsights' takes the data for the change
      const response = await adminAPI.changeCrisisInsights();
      data.onSuccess?.();
      return response.data as CrisisInsight;
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// POST /v1/dashboard/feature-usage
export const createFeatureUsage = createAsyncThunk(
  "admin/createFeatureUsage",
  async (
    data: any & { onSuccess?: () => void }, // Added data and onSuccess pattern
    { rejectWithValue },
  ) => {
    try {
      const response = await adminAPI.createFeatureUsage();
      data.onSuccess?.();
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);


const initialState: AdminState = {
  users: [],
  summary: null,
  organisations: [],
  settings: [],
  featureFlags: [],
  EmployeeInvite: [],
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
    const handlePending = (state: AdminState) => {
      state.isLoading = true;
      state.error = null;
    };
    const handleActionPending = (state: AdminState) => {
      state.isActionLoading = true;
      state.error = null;
    };
    const handleRejected = (state: AdminState, action: PayloadAction<unknown>) => {
      state.isLoading = false;
      state.isActionLoading = false;
      state.error = action.payload as string;
    };

    const handleActionFulfilled = (state: AdminState) => {
        state.isActionLoading = false;
    }

    builder
      // --- Dashboard Stats ---
      .addCase(fetchAdminDashboardStats.pending, handlePending)
      .addCase(fetchAdminDashboardStats.fulfilled, (state, action: PayloadAction<DashboardStats>) => {
        state.isLoading = false;
        state.stats = action.payload;
      })
      .addCase(fetchAdminDashboardStats.rejected, handleRejected)

      // --- All Users ---
      .addCase(fetchAllUsers.pending, handlePending)
      .addCase(fetchAllUsers.fulfilled, (state, action: PayloadAction<AdminUser[]>) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, handleRejected)

      // --- Dashboard Summary ---
      .addCase(fetchDashboardSummary.pending, handlePending)
      .addCase(fetchDashboardSummary.fulfilled, (state, action: PayloadAction<DashboardSummary>) => {
        state.isLoading = false;
        state.summary = action.payload;
      })
      .addCase(fetchDashboardSummary.rejected, handleRejected)

      // --- Crisis Insights (GET) ---
      .addCase(fetchCrisisInsights.pending, handlePending)
      .addCase(fetchCrisisInsights.fulfilled, (state, action: PayloadAction<CrisisInsight[]>) => {
        state.isLoading = false;
        state.crisisInsights = action.payload;
      })
      .addCase(fetchCrisisInsights.rejected, handleRejected)

      // --- Employee Engagement (POST/GET) ---
      .addCase(fetchEmployeeEngagement.pending, handlePending)
      .addCase(fetchEmployeeEngagement.fulfilled, (state, action: PayloadAction<EmployeeEngagementData>) => {
        state.isLoading = false;
        state.employeeEngagement = action.payload;
      })
      .addCase(fetchEmployeeEngagement.rejected, handleRejected)

      // --- Reports (POST/GET) ---
      .addCase(fetchReports.pending, handlePending)
      .addCase(fetchReports.fulfilled, (state, action: PayloadAction<Report[]>) => {
        state.isLoading = false;
        state.reports = action.payload;
      })
      .addCase(fetchReports.rejected, handleRejected)

      // --- Trends (GET) ---
      .addCase(fetchTrends.pending, handlePending)
      .addCase(fetchTrends.fulfilled, (state, action: PayloadAction<TrendData[]>) => {
        state.isLoading = false;
        state.trends = action.payload;
      })
      .addCase(fetchTrends.rejected, handleRejected)

 
      // --- Delete User ---
      .addCase(deleteUser.pending, handleActionPending)
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string | number>) => {
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
      .addCase(createCrisisInsight.fulfilled, (state, action: PayloadAction<CrisisInsight>) => {
        handleActionFulfilled(state);
        state.crisisInsights.push(action.payload);
      })
      // Update existing insight
      .addCase(updateCrisisInsight.fulfilled, (state, action: PayloadAction<CrisisInsight>) => {
        handleActionFulfilled(state);
        const index = state.crisisInsights.findIndex(
          (insight) => insight.id === action.payload.id
        );
        if (index !== -1) {
          state.crisisInsights[index] = action.payload;
        }
      })
      // Change/Edit insight status/data (assuming it's similar to an update)
      .addCase(changeCrisisInsight.fulfilled, (state, action: PayloadAction<CrisisInsight>) => {
        handleActionFulfilled(state);
        const index = state.crisisInsights.findIndex(
          (insight) => insight.id === action.payload.id
        );
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
