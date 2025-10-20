// slices/employer/employerSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { employerAPI } from '../../api/apiConfig'; // Ensure this path is correct
import {
  EmployerState,
  EmployeeInvite,
  BillingDetails,
  EmployerEngagementData,
  Report,
  DashboardSummary,
} from '../../types/employer'; // Adjust path to your types file

// --- Error Handler (Copied from Auth Slice pattern) ---
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


export const inviteEmployee = createAsyncThunk(
  'employer/inviteEmployee',
  async (
    emailData: { email: string } & { onSuccess?: () => void }, // Added onSuccess/onError pattern
    { rejectWithValue },
  ) => {
    try {
      // NOTE: Assuming employerAPI.inviteEmployee internally uses POST /v1/employers/ with emailData
      const response = await employerAPI.inviteEmployee(); 
      emailData.onSuccess?.();
      // The API often returns the new object upon successful creation
      return response.data as EmployeeInvite; 
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// GET /v1/employers/view-invites/
export const fetchEmployeeInvites = createAsyncThunk(
  'employer/fetchInvites',
  async (_, { rejectWithValue }) => {
    try {
      const response = await employerAPI.viewInviteEmployee();
      return response.data as EmployeeInvite[]; 
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// POST /v1/employer/billing/add-subscription/
export const addSubscription = createAsyncThunk(
  'employer/addSubscription',
  async (
    subscriptionData: any & { onSuccess?: () => void }, // 'any' should be replaced by a BillingData type
    { rejectWithValue },
  ) => {
    try {
      // NOTE: Assuming employerAPI.viewSubscription is a placeholder for a POST function
      const response = await employerAPI.viewSubscription(); 
      subscriptionData.onSuccess?.();
      return response.data as BillingDetails; 
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// GET /v1/employer/billing/view
export const fetchBillingDetails = createAsyncThunk(
  'employer/fetchBilling',
  async (_, { rejectWithValue }) => {
    try {
      const response = await employerAPI.viewBilling();
      return response.data as BillingDetails; 
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// GET /v1/employer/engagements/
export const fetchEmployerEngagement = createAsyncThunk(
  'employer/fetchEngagement',
  async (_, { rejectWithValue }) => {
    try {
      const response = await employerAPI.getEngagement();
      return response.data as EmployerEngagementData; 
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// POST /v1/employer/reports/ (Usually requires filter/param data for POST report generation)
export const fetchEmployerReports = createAsyncThunk(
  'employer/fetchReports',
  async (reportParams: any = {}, { rejectWithValue }) => { // Added optional params for POST request
    try {
      // NOTE: Assuming employerAPI.getReports is a placeholder for a POST function
      const response = await employerAPI.getReports(); 
      return response.data as Report[]; 
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// GET /v1/employer/overview
export const fetchEmployerDashboardSummary = createAsyncThunk(
  'employer/fetchSummary',
  async (_, { rejectWithValue }) => {
    try {
      const response = await employerAPI.getemployerdashboardSummary();
      return response.data as DashboardSummary; 
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);



const initialState: EmployerState = {
  invites: [],
  billing: null,
  subcription: null,
  engagement: null,
  reports: [],
  summary: null,
  isLoading: false,
  isActionLoading: false,
  error: null,
};

const employerSlice = createSlice({
  name: 'employer',
  initialState,
  reducers: {
    clearEmployerError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Helper functions for consistent state updates (similar to Auth Slice)
    const handlePending = (state: EmployerState) => {
      state.isLoading = true;
      state.error = null;
    };
    const handleActionPending = (state: EmployerState) => {
      state.isActionLoading = true;
      state.error = null;
    };
    const handleRejected = (state: EmployerState, action: PayloadAction<unknown>) => {
      state.isLoading = false;
      state.isActionLoading = false;
      state.error = action.payload as string;
    };

    builder
      // --- Fetch Employee Invites (GET) ---
      .addCase(fetchEmployeeInvites.pending, handlePending)
      .addCase(fetchEmployeeInvites.fulfilled, (state, action: PayloadAction<EmployeeInvite[]>) => {
        state.isLoading = false;
        state.invites = action.payload;
      })
      .addCase(fetchEmployeeInvites.rejected, handleRejected)

      // --- Fetch Billing Details (GET) ---
      .addCase(fetchBillingDetails.pending, handlePending)
      .addCase(fetchBillingDetails.fulfilled, (state, action: PayloadAction<BillingDetails>) => {
        state.isLoading = false;
        state.billing = action.payload;
      })
      .addCase(fetchBillingDetails.rejected, handleRejected)

      // --- Fetch Employer Engagement (GET) ---
      .addCase(fetchEmployerEngagement.pending, handlePending)
      .addCase(fetchEmployerEngagement.fulfilled, (state, action: PayloadAction<EmployerEngagementData>) => {
        state.isLoading = false;
        state.engagement = action.payload;
      })
      .addCase(fetchEmployerEngagement.rejected, handleRejected)

      // --- Fetch Employer Reports (POST/GET) ---
      .addCase(fetchEmployerReports.pending, handlePending)
      .addCase(fetchEmployerReports.fulfilled, (state, action: PayloadAction<Report[]>) => {
        state.isLoading = false;
        state.reports = action.payload;
      })
      .addCase(fetchEmployerReports.rejected, handleRejected)

      // --- Fetch Employer Dashboard Summary (GET) ---
      .addCase(fetchEmployerDashboardSummary.pending, handlePending)
      .addCase(fetchEmployerDashboardSummary.fulfilled, (state, action: PayloadAction<DashboardSummary>) => {
        state.isLoading = false;
        state.summary = action.payload;
      })
      .addCase(fetchEmployerDashboardSummary.rejected, handleRejected)

      // --- Invite Employee (POST Action) ---
      .addCase(inviteEmployee.pending, handleActionPending)
      .addCase(inviteEmployee.fulfilled, (state, action: PayloadAction<EmployeeInvite>) => {
        state.isActionLoading = false;
        // Prepend new invite to the list
        state.invites.unshift(action.payload); 
      })
      .addCase(inviteEmployee.rejected, handleRejected)

      // --- Add Subscription (POST Action) ---
      .addCase(addSubscription.pending, handleActionPending)
      .addCase(addSubscription.fulfilled, (state, action: PayloadAction<BillingDetails>) => {
        state.isActionLoading = false;
        state.billing = action.payload; // Update billing details after successful subscription
      })
      .addCase(addSubscription.rejected, handleRejected);
  },
});

export const { clearEmployerError } = employerSlice.actions;
export default employerSlice.reducer;