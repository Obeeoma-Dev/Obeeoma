import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
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
} from "../../types/admin";

// --- Error Handling ---
const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    return (
      (axiosError.response?.data as { detail?: string; error?: string })
        ?.detail ||
      (axiosError.response?.data as { detail?: string; error?: string })
        ?.error ||
      axiosError.message ||
      "An unknown error occurred"
    );
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "An unexpected error occurred";
};

// --- Async Thunks ---

// GET Operations
export const fetchAdminDashboardStats = createAsyncThunk(
  "admin/fetchStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminAPI.getDashboardStats();
      return response.data as DashboardStats;
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const fetchAllUsers = createAsyncThunk(
  "admin/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminAPI.getAllUsers();
      return response.data as AdminUser[];
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const fetchDashboardSummary = createAsyncThunk(
  "admin/fetchSummary",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminAPI.getDashboardSummary();
      return response.data as DashboardSummary;
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const fetchCrisisInsights = createAsyncThunk(
  "admin/fetchCrisisInsights",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminAPI.getCrisisInsights();
      return response.data as CrisisInsight[];
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const fetchEmployeeEngagement = createAsyncThunk(
  "admin/fetchEmployeeEngagement",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminAPI.getEmployeeEngagement();
      return response.data as EmployeeEngagementData;
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const fetchReports = createAsyncThunk(
  "admin/fetchReports",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminAPI.getReports();
      return response.data as Report[];
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const fetchTrends = createAsyncThunk(
  "admin/fetchTrends",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminAPI.getTrends();
      return response.data as TrendData[];
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

// DELETE Operations
export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (
    userId: string | (number & { onSuccess?: () => void }),
    { rejectWithValue },
  ) => {
    try {
      await adminAPI.deleteUser(userId);
      return userId;
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

// POST Operations
export const addEmployeeInvite = createAsyncThunk(
  "admin/addEmployeeInvite",
  async (
    inviteData: Record<string, unknown> & { onSuccess?: () => void },
    { rejectWithValue },
  ) => {
    try {
      const response = await adminAPI.addEmployee();
      inviteData.onSuccess?.();
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const createCrisisInsight = createAsyncThunk(
  "admin/createCrisisInsight",
  async (
    data: Record<string, unknown> & { onSuccess?: () => void },
    { rejectWithValue },
  ) => {
    try {
      const response = await adminAPI.postCrisisInsights();
      data.onSuccess?.();
      return response.data as CrisisInsight;
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const updateCrisisInsight = createAsyncThunk(
  "admin/updateCrisisInsight",
  async (
    data: Record<string, unknown> & { onSuccess?: () => void },
    { rejectWithValue },
  ) => {
    try {
      const response = await adminAPI.putCrisisInsights();
      data.onSuccess?.();
      return response.data as CrisisInsight;
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const createFeatureUsage = createAsyncThunk(
  "admin/createFeatureUsage",
  async (
    data: Record<string, unknown> & { onSuccess?: () => void },
    { rejectWithValue },
  ) => {
    try {
      const response = await adminAPI.createFeatureUsage();
      data.onSuccess?.();
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

// --- Initial State ---
const initialState: AdminState = {
  // Data collections
  users: [],
  crisisInsights: [],
  reports: [],
  organisations: [],
  settings: [],
  featureFlags: [],
  EmployeeInvite: [],

  // Single objects
  stats: null,
  summary: null,
  employeeEngagement: null,
  trends: null,

  // Loading states
  isLoading: false,
  isActionLoading: false,
  error: null,
};

// --- Slice Definition ---
const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    clearAdminError: (state) => {
      state.error = null;
    },
    clearAdminLoading: (state) => {
      state.isLoading = false;
      state.isActionLoading = false;
    },
  },
  extraReducers: (builder) => {
    // --- Helper functions for consistent state management ---
    const handlePending = (state: AdminState) => {
      state.isLoading = true;
      state.error = null;
    };

    const handleActionPending = (state: AdminState) => {
      state.isActionLoading = true;
      state.error = null;
    };

    const handleRejected = (
      state: AdminState,
      action: PayloadAction<unknown>,
    ) => {
      state.isLoading = false;
      state.isActionLoading = false;
      state.error = action.payload as string;
    };

    const handleFulfilled = (state: AdminState) => {
      state.isLoading = false;
    };

    const handleActionFulfilled = (state: AdminState) => {
      state.isActionLoading = false;
    };

    // --- GET Operations ---
    builder
      .addCase(fetchAdminDashboardStats.pending, handlePending)
      .addCase(
        fetchAdminDashboardStats.fulfilled,
        (state, action: PayloadAction<DashboardStats>) => {
          handleFulfilled(state);
          state.stats = action.payload;
        },
      )
      .addCase(fetchAdminDashboardStats.rejected, handleRejected)

      .addCase(fetchAllUsers.pending, handlePending)
      .addCase(
        fetchAllUsers.fulfilled,
        (state, action: PayloadAction<AdminUser[]>) => {
          handleFulfilled(state);
          state.users = action.payload;
        },
      )
      .addCase(fetchAllUsers.rejected, handleRejected)

      .addCase(fetchDashboardSummary.pending, handlePending)
      .addCase(
        fetchDashboardSummary.fulfilled,
        (state, action: PayloadAction<DashboardSummary>) => {
          handleFulfilled(state);
          state.summary = action.payload;
        },
      )
      .addCase(fetchDashboardSummary.rejected, handleRejected)

      .addCase(fetchCrisisInsights.pending, handlePending)
      .addCase(
        fetchCrisisInsights.fulfilled,
        (state, action: PayloadAction<CrisisInsight[]>) => {
          handleFulfilled(state);
          state.crisisInsights = action.payload;
        },
      )
      .addCase(fetchCrisisInsights.rejected, handleRejected)

      .addCase(fetchEmployeeEngagement.pending, handlePending)
      .addCase(
        fetchEmployeeEngagement.fulfilled,
        (state, action: PayloadAction<EmployeeEngagementData>) => {
          handleFulfilled(state);
          state.employeeEngagement = action.payload;
        },
      )
      .addCase(fetchEmployeeEngagement.rejected, handleRejected)

      .addCase(fetchReports.pending, handlePending)
      .addCase(
        fetchReports.fulfilled,
        (state, action: PayloadAction<Report[]>) => {
          handleFulfilled(state);
          state.reports = action.payload;
        },
      )
      .addCase(fetchReports.rejected, handleRejected)

      .addCase(fetchTrends.pending, handlePending)
      .addCase(
        fetchTrends.fulfilled,
        (state, action: PayloadAction<TrendData[]>) => {
          handleFulfilled(state);
          state.trends = action.payload;
        },
      )
      .addCase(fetchTrends.rejected, handleRejected);

    // --- DELETE Operations ---
    builder
      .addCase(deleteUser.pending, handleActionPending)
      .addCase(
        deleteUser.fulfilled,
        (state, action: PayloadAction<string | number>) => {
          handleActionFulfilled(state);
          state.users = state.users.filter(
            (user) => user.id !== action.payload,
          );
        },
      )
      .addCase(deleteUser.rejected, handleRejected);

    // --- POST Operations ---
    builder
      .addCase(createCrisisInsight.pending, handleActionPending)
      .addCase(
        createCrisisInsight.fulfilled,
        (state, action: PayloadAction<CrisisInsight>) => {
          handleActionFulfilled(state);
          state.crisisInsights.push(action.payload);
        },
      )
      .addCase(createCrisisInsight.rejected, handleRejected)

      .addCase(updateCrisisInsight.pending, handleActionPending)
      .addCase(
        updateCrisisInsight.fulfilled,
        (state, action: PayloadAction<CrisisInsight>) => {
          handleActionFulfilled(state);
          const index = state.crisisInsights.findIndex(
            (insight) => insight.id === action.payload.id,
          );
          if (index !== -1) {
            state.crisisInsights[index] = action.payload;
          }
        },
      )
      .addCase(updateCrisisInsight.rejected, handleRejected)

      .addCase(addEmployeeInvite.pending, handleActionPending)
      .addCase(addEmployeeInvite.fulfilled, handleActionFulfilled)
      .addCase(addEmployeeInvite.rejected, handleRejected)

      .addCase(createFeatureUsage.pending, handleActionPending)
      .addCase(createFeatureUsage.fulfilled, handleActionFulfilled)
      .addCase(createFeatureUsage.rejected, handleRejected);
  },
});

export const { clearAdminError, clearAdminLoading } = adminSlice.actions;
export default adminSlice.reducer;
