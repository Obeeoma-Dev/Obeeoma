import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { employerAPI, adminAPI } from '../../api/apiConfig';
import {
  EmployerState,
  EmployeeInvite,
  BillingDetails,
  EmployerEngagementData,
  Report,
  DashboardSummary,
  Employee,
} from '../../types/employer';

const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    return (
      (axiosError.response?.data as { detail?: string; error?: string })?.detail ||
      (axiosError.response?.data as { detail?: string; error?: string })?.error ||
      axiosError.message ||
      'An unknown error occurred'
    );
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
};

// === Async Thunks ===

export const inviteEmployee = createAsyncThunk<
  EmployeeInvite,
  { email: string; department: string } & { onSuccess?: () => void },
  { rejectValue: string }
>(
  'employer/inviteEmployee',
  async (employeeData, { rejectWithValue }) => {
    try {
      const response = await employerAPI.inviteEmployee({
        email: employeeData.email,
        department: employeeData.department,
      });
      employeeData.onSuccess?.();
      return response.data as EmployeeInvite;
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const fetchEmployeeInvites = createAsyncThunk<
  EmployeeInvite[],
  void,
  { rejectValue: string }
>(
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

export const addSubscription = createAsyncThunk<
  BillingDetails,
  void,
  { rejectValue: string }
>(
  'employer/addSubscription',
  async (_, { rejectWithValue }) => {
    try {
      const response = await employerAPI.viewSubscription();
      return response.data as BillingDetails;
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const fetchBillingDetails = createAsyncThunk<
  BillingDetails,
  void,
  { rejectValue: string }
>(
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

export const fetchEmployerEngagement = createAsyncThunk<
  EmployerEngagementData,
  void,
  { rejectValue: string }
>(
  'employer/fetchEngagement',
  async (_, { rejectWithValue }) => {
    try {
      const response = await employerAPI.getEngagement?.();
      return response?.data as EmployerEngagementData;
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const fetchEmployerReports = createAsyncThunk<
  Report[],
  void,
  { rejectValue: string }
>(
  'employer/fetchReports',
  async (_, { rejectWithValue }) => {
    try {
      const response = await employerAPI.getReports();
      return response.data as Report[];
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const fetchEmployerDashboardSummary = createAsyncThunk<
  DashboardSummary,
  void,
  { rejectValue: string }
>(
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

export const fetchDepartmentDistribution = createAsyncThunk<
  Array<{ name: string; percentage: number; color: string }>,
  void,
  { rejectValue: string }
>(
  'employer/fetchDepartmentDistribution',
  async (_, { rejectWithValue }) => {
    try {
      const response = await employerAPI.getDepartmentDistribution();
      return response.data as Array<{ name: string; percentage: number; color: string }>;
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const fetchWellnessTrend = createAsyncThunk<
  Array<{ date: string; score: number }>,
  void,
  { rejectValue: string }
>(
  'employer/fetchWellnessTrend',
  async (_, { rejectWithValue }) => {
    try {
      const response = await employerAPI.getWellnessTrend();
      return response.data as Array<{ date: string; score: number }>;
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const fetchMoodTrends = createAsyncThunk<
  any[],
  void,
  { rejectValue: string }
>(
  'employer/fetchMoodTrends',
  async (_, { rejectWithValue }) => {
    try {
      const response = await employerAPI.getMoodTrends();
      return response.data as any[];
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const fetchEmployees = createAsyncThunk<
  Employee[],
  void,
  { rejectValue: string }
>(
  'employer/fetchEmployees',
  async (_, { rejectWithValue }) => {
    try {
      const response = await employerAPI.getEmployees();
      return response.data as Employee[];
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// === Initial State ===
const initialState: EmployerState = {
  currentEmployer: null,
  invites: [],
  employees: [],
  billing: null,
  engagement: null,
  reports: [],
  summary: null,
  subscription: null,
  departmentDistribution: [],
  wellnessTrend: [],
  moodTrends: [],
  isLoading: false,
  isActionLoading: false,
  error: null,
};

// === Slice ===
const employerSlice = createSlice({
  name: 'employer',
  initialState,
  reducers: {
    clearEmployerError: (state: EmployerState): void => {
      state.error = null;
    },
    clearEmployerStatus: (state: EmployerState): void => {
      state.isLoading = false;
      state.isActionLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Employee Invites
    builder
      .addCase(fetchEmployeeInvites.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEmployeeInvites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.invites = action.payload;
      })
      .addCase(fetchEmployeeInvites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Fetch Billing Details
      .addCase(fetchBillingDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBillingDetails.fulfilled, (state, action: PayloadAction<BillingDetails>) => {
        state.isLoading = false;
        state.billing = action.payload;
      })
      .addCase(fetchBillingDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Fetch Employer Engagement
      .addCase(fetchEmployerEngagement.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEmployerEngagement.fulfilled, (state, action: PayloadAction<EmployerEngagementData>) => {
        state.isLoading = false;
        state.engagement = action.payload;
      })
      .addCase(fetchEmployerEngagement.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Fetch Employer Reports
      .addCase(fetchEmployerReports.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEmployerReports.fulfilled, (state, action: PayloadAction<Report[]>) => {
        state.isLoading = false;
        state.reports = action.payload;
      })
      .addCase(fetchEmployerReports.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Fetch Dashboard Summary
      .addCase(fetchEmployerDashboardSummary.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEmployerDashboardSummary.fulfilled, (state, action: PayloadAction<DashboardSummary>) => {
        state.isLoading = false;
        state.summary = action.payload;
      })
      .addCase(fetchEmployerDashboardSummary.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Fetch Department Distribution
      .addCase(fetchDepartmentDistribution.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDepartmentDistribution.fulfilled, (state, action: PayloadAction<Array<{ name: string; percentage: number; color: string }>>) => {
        state.isLoading = false;
        state.departmentDistribution = action.payload;
      })
      .addCase(fetchDepartmentDistribution.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Fetch Wellness Trend
      .addCase(fetchWellnessTrend.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWellnessTrend.fulfilled, (state, action: PayloadAction<Array<{ date: string; score: number }>>) => {
        state.isLoading = false;
        state.wellnessTrend = action.payload;
      })
      .addCase(fetchWellnessTrend.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Fetch Mood Trends
      .addCase(fetchMoodTrends.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMoodTrends.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.isLoading = false;
        state.moodTrends = action.payload;
      })
      .addCase(fetchMoodTrends.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Fetch Employees
      .addCase(fetchEmployees.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action: PayloadAction<Employee[]>) => {
        state.isLoading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Invite Employee
      .addCase(inviteEmployee.pending, (state) => {
        state.isActionLoading = true;
        state.error = null;
      })
      .addCase(inviteEmployee.fulfilled, (state, action: PayloadAction<EmployeeInvite>) => {
        state.isActionLoading = false;
        state.invites.unshift(action.payload);
      })
      .addCase(inviteEmployee.rejected, (state, action) => {
        state.isActionLoading = false;
        state.error = action.payload as string;
      })

      // Add Subscription
      .addCase(addSubscription.pending, (state) => {
        state.isActionLoading = true;
        state.error = null;
      })
      .addCase(addSubscription.fulfilled, (state, action: PayloadAction<BillingDetails>) => {
        state.isActionLoading = false;
        state.billing = action.payload;
      })
      .addCase(addSubscription.rejected, (state, action) => {
        state.isActionLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearEmployerError, clearEmployerStatus } = employerSlice.actions;
export default employerSlice.reducer;
