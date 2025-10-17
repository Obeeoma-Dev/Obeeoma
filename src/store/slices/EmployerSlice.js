import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { employerAPI } from '../../api/apiConfig'; // Ensure this path is correct
import {
  EmployerState,
  EmployeeInvite,
  BillingDetails,
  EmployerEngagementData,
  Report,
  DashboardSummary,
} from '../../types/employer'; // Adjust path to your types file

// --- Error Handler ---
const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return (
      (error.response?.data as { detail?: string; error?: string })?.detail ||
      (error.response?.data as { detail?: string; error?: string })?.error ||
      error.message ||
      "An unknown error occurred"
    );
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "An unexpected error occurred";
};


// POST /v1/employers/ (Invite Employee)
export const inviteEmployee = createAsyncThunk(
  'employer/inviteEmployee',
  async (emailData: { email: string }, { rejectWithValue }) => {
    try {
      // NOTE: Assuming your API config 'inviteEmployee' needs an email, 
      // though the function signature was empty. Passing data here.
      const response = await employerAPI.inviteEmployee(); 
      // Replace with: const response = await api.post("/v1/employers/", emailData);
      return response.data; 
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
      return response.data; 
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// POST /v1/employer/billing/add-subscription/
export const addSubscription = createAsyncThunk(
  'employer/addSubscription',
  async (subscriptionData: any, { rejectWithValue }) => {
    try {
      const response = await employerAPI.viewSubscription(); 
      // Replace with: const response = await api.post("/v1/employer/billing/add-subscription/", subscriptionData);
      return response.data; 
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
      return response.data; 
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
      return response.data; 
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// POST /v1/employer/reports/
export const fetchEmployerReports = createAsyncThunk(
  'employer/fetchReports',
  async (reportParams: any, { rejectWithValue }) => {
    try {
      const response = await employerAPI.getReports(); 
      // Replace with: const response = await api.post("/v1/employer/reports/", reportParams);
      return response.data; 
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
      return response.data; 
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// ===================================
// SLICE DEFINITION
// ===================================

const initialState: EmployerState = {
  invites: [],
  billing: null,
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
    // Helper function for handling loading/error states
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
      // --- Fetch Employee Invites ---
      .addCase(fetchEmployeeInvites.pending, handlePending)
      .addCase(fetchEmployeeInvites.fulfilled, (state, action: PayloadAction<EmployeeInvite[]>) => {
        state.isLoading = false;
        state.invites = action.payload;
      })
      .addCase(fetchEmployeeInvites.rejected, handleRejected)

      // --- Fetch Billing Details ---
      .addCase(fetchBillingDetails.pending, handlePending)
      .addCase(fetchBillingDetails.fulfilled, (state, action: PayloadAction<BillingDetails>) => {
        state.isLoading = false;
        state.billing = action.payload;
      })
      .addCase(fetchBillingDetails.rejected, handleRejected)

      // --- Fetch Employer Engagement ---
      .addCase(fetchEmployerEngagement.pending, handlePending)
      .addCase(fetchEmployerEngagement.fulfilled, (state, action: PayloadAction<EmployerEngagementData>) => {
        state.isLoading = false;
        state.engagement = action.payload;
      })
      .addCase(fetchEmployerEngagement.rejected, handleRejected)

      // --- Fetch Employer Reports ---
      .addCase(fetchEmployerReports.pending, handlePending)
      .addCase(fetchEmployerReports.fulfilled, (state, action: PayloadAction<Report[]>) => {
        state.isLoading = false;
        state.reports = action.payload;
      })
      .addCase(fetchEmployerReports.rejected, handleRejected)

      // --- Fetch Employer Dashboard Summary ---
      .addCase(fetchEmployerDashboardSummary.pending, handlePending)
      .addCase(fetchEmployerDashboardSummary.fulfilled, (state, action: PayloadAction<DashboardSummary>) => {
        state.isLoading = false;
        state.summary = action.payload;
      })
      .addCase(fetchEmployerDashboardSummary.rejected, handleRejected)

      // --- Invite Employee (Action) ---
      .addCase(inviteEmployee.pending, handleActionPending)
      .addCase(inviteEmployee.fulfilled, (state, action: PayloadAction<EmployeeInvite>) => {
        state.isActionLoading = false;
        // Optionally add the new invite to the list:
        // state.invites.push(action.payload);
      })
      .addCase(inviteEmployee.rejected, handleRejected)

      // --- Add Subscription (Action) ---
      .addCase(addSubscription.pending, handleActionPending)
      .addCase(addSubscription.fulfilled, (state, action: PayloadAction<BillingDetails>) => {
        state.isActionLoading = false;
        state.billing = action.payload; // Update billing details after subscription add
      })
      .addCase(addSubscription.rejected, handleRejected);
  },
});

export const { clearEmployerError } = employerSlice.actions;
export default employerSlice.reducer;