git  addimport { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { employerAPI } from '../../api/apiConfig';
import {
  EmployerState,
  EmployeeInvite,
  BillingDetails,
  EmployerEngagementData,
  Report,
  DashboardSummary,
  EmployerUser,
  Employee,
  MoodTrend,
} from '../../types/employer';

// --- Error Handler ---
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

// --- Async Thunks ---

// GET /v1/employers/me/ - Get current employer profile
export const fetchCurrentEmployer = createAsyncThunk<
  EmployerUser,
  void,
  { rejectValue: string }
>(
  'employer/fetchCurrentEmployer',
  async (_, { rejectWithValue }) => {
    try {
      const response = await employerAPI.getCurrentEmployer();
      return response.data as EmployerUser;
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// POST /v1/employers/invite/
export const inviteEmployee = createAsyncThunk<
  EmployeeInvite,
  { email: string; phone?: string; department: string } & { onSuccess?: () => void },
  { rejectValue: string }
>(
  'employer/inviteEmployee',
  async (employeeData, { rejectWithValue }) => {
    try {
      const response = await employerAPI.inviteEmployee(employeeData);
      employeeData.onSuccess?.();
      return response.data as EmployeeInvite;
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// GET /v1/employers/view-invites/
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

// GET /v1/employer/billing/view
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

// GET /v1/employer/engagements/
export const fetchEmployerEngagement = createAsyncThunk<
  EmployerEngagementData,
  void,
  { rejectValue: string }
>(
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

// POST /v1/employer/reports/
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

// GET /v1/employer/overview
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

// GET /v1/employer/department-distribution/
export const fetchDepartmentDistribution = createAsyncThunk<
  Array<{ name: string; percentage: number; color: string }>,
  void,
  { rejectValue: string }
>(
  'employer/fetchDepartmentDistribution',
  async (_, { rejectWithValue }) => {
    try {
      const response = await employerAPI.getDepartmentDistribution();
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
// GET /v1/employees/ - Get all employees
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

// GET /v1/employees/moodTrends/ - Get mood trends
export const fetchMoodTrends = createAsyncThunk<
  MoodTrend[],
  void,
  { rejectValue: string }
>(
  'employer/fetchMoodTrends',
  async (_, { rejectWithValue }) => {
    try {
      const response = await employerAPI.getMoodTrends();
      return response.data as MoodTrend[];
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// GET /v1/employer/wellness-trend/
export const fetchWellnessTrend = createAsyncThunk<
  Array<{ date: string; score: number }>,
  void,
  { rejectValue: string }
>(
  'employer/fetchWellnessTrend',
  async (_, { rejectWithValue }) => {
    try {
      const response = await employerAPI.getWellnessTrend();
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// --- Initial State ---
const initialState: EmployerState = {
  currentEmployer: null,
  invites: [],
  employees: [], // NEW
  moodTrends: [], // NEW
  billing: null,
  subscription: null,
  engagement: null,
  reports: [],
  summary: null,
  departmentDistribution: [],
  wellnessTrend: [],
  isLoading: false,
  isActionLoading: false,
  error: null,
};

// --- Slice Definition ---
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
    updateEmployerProfile: (state: EmployerState, action: PayloadAction<Partial<EmployerUser>>): void => {
      if (state.currentEmployer) {
        state.currentEmployer = { ...state.currentEmployer, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // --- Fetch Current Employer ---
      .addCase(fetchCurrentEmployer.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCurrentEmployer.fulfilled, (state, action: PayloadAction<EmployerUser>) => {
        state.isLoading = false;
        state.currentEmployer = action.payload;
      })
      .addCase(fetchCurrentEmployer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

       // --- Fetch Employees ---
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

    // --- Fetch Mood Trends ---
    .addCase(fetchMoodTrends.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(fetchMoodTrends.fulfilled, (state, action: PayloadAction<MoodTrend[]>) => {
      state.isLoading = false;
      state.moodTrends = action.payload;
    })
    .addCase(fetchMoodTrends.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    })

      // --- Fetch Employee Invites (GET) ---
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

      // --- Fetch Billing Details (GET) ---
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

      // --- Fetch Employer Engagement (GET) ---
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

      // --- Fetch Employer Reports ---
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

      // --- Fetch Employer Dashboard Summary (GET) ---
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

      // --- Fetch Department Distribution ---
      .addCase(fetchDepartmentDistribution.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDepartmentDistribution.fulfilled, (state, action) => {
        state.isLoading = false;
        state.departmentDistribution = action.payload;
      })
      .addCase(fetchDepartmentDistribution.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // --- Fetch Wellness Trend ---
      .addCase(fetchWellnessTrend.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWellnessTrend.fulfilled, (state, action) => {
        state.isLoading = false;
        state.wellnessTrend = action.payload;
      })
      .addCase(fetchWellnessTrend.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // --- Invite Employee (POST Action) ---
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
      });
  },
});

export const { clearEmployerError, clearEmployerStatus, updateEmployerProfile } = employerSlice.actions;
export default employerSlice.reducer;

// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import axios, { AxiosError } from 'axios';
// import { employerAPI } from '../../api/apiConfig';
// import {
//   EmployerState,
//   EmployeeInvite,
//   BillingDetails,
//   EmployerEngagementData,
//   Report,
//   DashboardSummary,
// } from '../../types/employer';

// // --- Error Handler (Copied from Auth Slice pattern) ---
// const getErrorMessage = (error: unknown): string => {
//   if (axios.isAxiosError(error)) {
//     const axiosError = error as AxiosError;
//     return (
//       (axiosError.response?.data as { detail?: string; error?: string })?.detail ||
//       (axiosError.response?.data as { detail?: string; error?: string })?.error ||
//       axiosError.message ||
//       "An unknown error occurred"
//     );
//   }
//   if (error instanceof Error) {
//     return error.message;
//   }
//   return "An unexpected error occurred";
// };

// export const inviteEmployee = createAsyncThunk(
//   'employer/inviteEmployee',
//   async (
//     emailData: { email: string } & { onSuccess?: () => void }, 
//     { rejectWithValue }: { rejectWithValue: (value: unknown) => unknown },
//   ) => {
//     try {
//       // NOTE: Assuming employerAPI.inviteEmployee internally uses POST /v1/employers/ with emailData
//       const response = await employerAPI.inviteEmployee();
//       emailData.onSuccess?.();
//       // The API often returns the new object upon successful creation
//       return response.data as EmployeeInvite;
//     } catch (error: unknown) {
//       return rejectWithValue(getErrorMessage(error));
//     }
//   }
// );

// // GET /v1/employers/view-invites/
// // interface FetchEmployeeInvitesThunkConfig {
// //   rejectValue: string;
// // }

// export const fetchEmployeeInvites = createAsyncThunk<
//   EmployeeInvite[],
//   void,
//   // FetchEmployeeInvitesThunkConfig
//   { rejectValue: string }
// >(
//   'employer/fetchInvites',
//   async (_:void ) => {
//     try {
//       const response = await employerAPI.viewInviteEmployee();
//       return response.data as EmployeeInvite[];
//     } catch (err) {
//       return ('Failed to fetch');
//     }
//   },
// );


// // POST /v1/employer/billing/add-subscription/
// export const addSubscription = createAsyncThunk(
//   'employer/addSubscription',
//   async (_: void, { rejectWithValue }: { rejectWithValue: (value: unknown) => unknown }) => {
//     try {
//       // NOTE: Assuming employerAPI.viewSubscription is a placeholder for a POST function
//       const response = await employerAPI.viewSubscription(); // Call API without unused param
//       return response.data as BillingDetails; // Return typed billing details
//     } catch (error: unknown) {
//       return rejectWithValue(getErrorMessage(error)); // Handle error gracefully
//     }
//   }
// );

// // GET /v1/employer/billing/view
// export const fetchBillingDetails = createAsyncThunk(
//   'employer/fetchBilling',
//   async (_: void, { rejectWithValue }: { rejectWithValue: (value: unknown) => unknown }) => {
//     try {
//       const response = await employerAPI.viewBilling();
//       return response.data as BillingDetails;
//     } catch (error: unknown) {
//       return rejectWithValue(getErrorMessage(error));
//     }
//   }
// );

// // GET /v1/employer/engagements/
// export const fetchEmployerEngagement = createAsyncThunk(
//   'employer/fetchEngagement',
//   async (_: void, { rejectWithValue }: { rejectWithValue: (value: unknown) => unknown }) => {
//     try {
//       const response = await employerAPI.getEngagement();
//       return response.data as EmployerEngagementData;
//     } catch (error: unknown) {
//       return rejectWithValue(getErrorMessage(error));
//     }
//   }
// );

// // POST /v1/employer/reports/ (Usually requires filter/param data for POST report generation)
// export const fetchEmployerReports = createAsyncThunk(
//   'employer/fetchReports',
//   async (_: void, { rejectWithValue }: { rejectWithValue: (value: unknown) => unknown }) => {
//     try {
//       // NOTE: Assuming employerAPI.getReports is a placeholder for a POST function
//       const response = await employerAPI.getReports();
//       return response.data as Report[];
//     } catch (error: unknown) {
//       return rejectWithValue(getErrorMessage(error));
//     }
//   },
// );

// // GET /v1/employer/overview
// export const fetchEmployerDashboardSummary = createAsyncThunk(
//   'employer/fetchSummary',
//   async (_: void, { rejectWithValue }: { rejectWithValue: (value: unknown) => unknown }) => {
//     try {
//       const response = await employerAPI.getemployerdashboardSummary();
//       return response.data as DashboardSummary;
//     } catch (error: unknown) {
//       return rejectWithValue(getErrorMessage(error));
//     }
//   }
// );

// const initialState: EmployerState = {
//   invites: [],
//   billing: null,
//   subcription: null,
//   engagement: null,
//   reports: [],
//   summary: null,
//   isLoading: false,
//   isActionLoading: false,
//   error: null,
// };

// const employerSlice = createSlice<EmployerState>({
//   name: 'employer',
//   initialState,
//   reducers: {
//     clearEmployerError: (state: EmployerState): void => {
//       state.error = null;
//     },
//   },
//   extraReducers: (builder: any) => {
//     // Local interfaces/types for clearer typing without adding imports
//     interface PendingHandler {
//       (state: EmployerState): void;
//     }
//     interface ActionPendingHandler {
//       (state: EmployerState): void;
//     }
//     interface RejectedHandler {
//       (state: EmployerState, action: PayloadAction<unknown>): void;
//     }
//     // Minimal builder shape to allow chaining addCase calls in this file
//     interface SimpleBuilder {
//       addCase: (...args: any[]) => SimpleBuilder;
//     }
//     // Specific fulfilled action interface (keeps explicit typing where used)
//     interface FetchEmployeeInvitesFulfilledAction extends PayloadAction<EmployeeInvite[]> {}

//     // Helper functions for consistent state updates (similar to Auth Slice)
//     const handlePending: PendingHandler = (state) => {
//       state.isLoading = true;
//       state.error = null;
//     };
//     const handleActionPending: ActionPendingHandler = (state) => {
//       state.isActionLoading = true;
//       state.error = null;
//     };
//     const handleRejected: RejectedHandler = (state, action) => {
//       state.isLoading = false;
//       state.isActionLoading = false;
//       state.error = action.payload as string;
//     };

//     builder
//       // --- Fetch Employee Invites (GET) ---
//       .addCase(fetchEmployeeInvites.pending, handlePending)
//       .addCase(
//         fetchEmployeeInvites.fulfilled,
//         (state: EmployerState, action: PayloadAction<EmployeeInvite[]>) => {
//           state.isLoading = false;
//           state.invites = action.payload;
//         },
//       )
//       .addCase(fetchEmployeeInvites.rejected, handleRejected)

//       // --- Fetch Billing Details (GET) ---
//       .addCase(fetchBillingDetails.pending, handlePending)
//       .addCase(fetchBillingDetails.fulfilled, (state: EmployerState, action: PayloadAction<BillingDetails>) => {
//         state.isLoading = false;
//         state.billing = action.payload;
//       })
//       .addCase(fetchBillingDetails.rejected, handleRejected)

//       // --- Fetch Employer Engagement (GET) ---
//       .addCase(fetchEmployerEngagement.pending, handlePending)
//       .addCase(fetchEmployerEngagement.fulfilled, (state: EmployerState, action: PayloadAction<EmployerEngagementData>) => {
//         state.isLoading = false;
//         state.engagement = action.payload;
//       })
//       .addCase(fetchEmployerEngagement.rejected, handleRejected)

//       // --- Fetch Employer Reports (POST/GET) ---
//       .addCase(fetchEmployerReports.pending, handlePending)
//       .addCase(fetchEmployerReports.fulfilled, (state: EmployerState, action: PayloadAction<Report[]>) => {
//         state.isLoading = false;
//         state.reports = action.payload;
//       })
//       .addCase(fetchEmployerReports.rejected, handleRejected)

//       // --- Fetch Employer Dashboard Summary (GET) ---
//       .addCase(fetchEmployerDashboardSummary.pending, handlePending)
//       .addCase(fetchEmployerDashboardSummary.fulfilled, (state: EmployerState, action: PayloadAction<DashboardSummary>) => {
//         state.isLoading = false;
//         state.summary = action.payload;
//       })
//       .addCase(fetchEmployerDashboardSummary.rejected, handleRejected)

//       // --- Invite Employee (POST Action) ---
//       .addCase(inviteEmployee.pending, handleActionPending)
//       .addCase(inviteEmployee.fulfilled, (state: EmployerState, action: PayloadAction<EmployeeInvite>) => {
//         state.isActionLoading = false;
//         state.invites.unshift(action.payload);
//       })
//       .addCase(inviteEmployee.rejected, handleRejected)

//       // --- Add Subscription (POST Action) ---
//       .addCase(addSubscription.pending, handleActionPending)
//       .addCase(addSubscription.fulfilled, (state: EmployerState, action: PayloadAction<BillingDetails>) => {
//         state.isActionLoading = false;
//         state.billing = action.payload;
//       })
//       .addCase(addSubscription.rejected, handleRejected);
//   },
// });

// export const { clearEmployerError } = employerSlice.actions;
// export default employerSlice.reducer;