import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
// Assuming 'employerAPI' is correctly configured to handle API calls for this slice
import { employerAPI } from '../../api/apiConfig'; 
import { EmployerEngagementData } from '../../types/admin';
import {
    EmployerState,
    EmployeeInvite,
    BillingDetails,
    Report,
    DashboardSummary,
    Employee,
    EmployerUser,
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
    EmployeeInvite, // Fulfilled value type
    { email: string; phone?: string; department: string } & { onSuccess?: () => void }, // Payload type
    { rejectValue: string } // Reject value type
>(
    'employer/inviteEmployee',
    async (employeeData, { rejectWithValue }) => {
        try {
            // NOTE: Assuming employerAPI.inviteEmployee internally handles the POST to /v1/employers/invite/ with employeeData
            const response = await employerAPI.inviteEmployee(employeeData);
            // The API often returns the new object upon successful creation
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

// CORRECTED AND INTEGRATED fetchEmployees thunk
export const fetchEmployees = createAsyncThunk<
    Employee[],
    void,
    { rejectValue: string }
>(
    'employer/fetchEmployees',
    async (_, { rejectWithValue }) => {
        try {
            // NOTE: This call should typically be to an /employees endpoint,
            // but for now, we'll assume employerAPI.getEmployees() works.
            // The console data suggests the response might be from /v1/invitations,
            // which has different fields (email, no name/department).
            // MAPPING LOGIC REMAINS AS INFERRED:
            const response = await employerAPI.getEmployees(); 
            // Handle both response.data.employees and response.data being the array
            const backendData = (response.data.employees || response.data) as any[]; 

            const mappedEmployees: Employee[] = backendData.map((employee: any) => ({
                id: employee.id, 
                // CRITICAL MAPPING ASSUMPTION: The API should return full_name, first_name, and last_name. 
                // If it's the invitation list, these will be undefined/empty and will show 'undefined undefined'.
                name: employee.full_name || `${employee.first_name || ''} ${employee.last_name || ''}`.trim() || 'N/A', 
                emailAddress: employee.email_address || employee.email || 'N/A', // Adjusted to accept 'email' field from the console data
                department: employee.dept_code || 'N/A', 
                status: employee.account_status 
                    ? employee.account_status.toLowerCase() as Employee['status'] 
                    : 'unknown', 
            }));
            
            return mappedEmployees; 
        } catch (error) {
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
            // Optional chaining is used for both getEngagement and response.data
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
    Array<{ departmentName: string; workerPercentage: number; color: string }>,
    void,
    { rejectValue: string }
>(
    'employer/fetchDepartmentDistribution',
    async (_, { rejectWithValue }) => {
        try {
            const response = await employerAPI.getDepartmentDistribution();
            return response.data as Array<{ departmentName: string; workerPercentage: number; color: string }>;
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



export const fetchEmployeeStatus = createAsyncThunk<
  { active: number; inactive: number; total: number },
  void,
  { rejectValue: string }
>(
  'employer/fetchEmployeeStatus',
  async (_, { rejectWithValue }) => {
    try {
      const response = await employerAPI.getEmployeeStatus();
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
  employees: [],
  billing: null,
  departmentDistribution: [], 
  wellnessTrend: [],
  moodTrends: [],
  subscription: null, 
  engagement: null,
  reports: [],
  summary: null,
  isLoading: false,
  isActionLoading: false,
  error: null,
  employeeStatus: {
    active: 0,
    inactive: 0,
    total: 0,
    activePercentage: 0,
    inactivePercentage: 0,
  },
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
        builder
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
                state.error = action.payload || null;
            })
            .addCase(fetchEmployeeInvites.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchEmployeeInvites.fulfilled, (state, action: PayloadAction<EmployeeInvite[]>) => {
                state.isLoading = false;
                state.invites = action.payload;
            })
            .addCase(fetchEmployeeInvites.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || null;
            })
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
                state.error = action.payload || null;
            })
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
                state.error = action.payload || null;
            })
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
                state.error = action.payload || null;
            })
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
                state.error = action.payload || null;
            })
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
                state.error = action.payload || null;
            })
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
                state.error = action.payload || null;
            })
            .addCase(fetchDepartmentDistribution.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchDepartmentDistribution.fulfilled, (state, action: PayloadAction<Array<{ departmentName: string; workerPercentage: number; color: string }>>) => {
                state.isLoading = false;
                state.departmentDistribution = action.payload;
            })
            .addCase(fetchDepartmentDistribution.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || null;
            })
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
                state.error = action.payload || null;
            })
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
                state.error = action.payload || null;
            })
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
                state.error = action.payload || null;
            });
    },
});

// === Exports ===
export const { clearEmployerError, clearEmployerStatus } = employerSlice.actions;
export default employerSlice.reducer;

// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import axios, { AxiosError } from 'axios';
// import { employerAPI } from '../../api/apiConfig';
// import { EmployerEngagementData } from '../../types/admin';
// import {
//   EmployerState,
//   EmployeeInvite,
//   BillingDetails,
//   Report,
//   DashboardSummary,
//   Employee,
//  EmployerUser,

// } from '../../types/employer';

// const getErrorMessage = (error: unknown): string => {
//   if (axios.isAxiosError(error)) {
//     const axiosError = error as AxiosError;
//     return (
//       (axiosError.response?.data as { detail?: string; error?: string })?.detail ||
//       (axiosError.response?.data as { detail?: string; error?: string })?.error ||
//       axiosError.message ||
//       'An unknown error occurred'
//     );
//   }
//   if (error instanceof Error) {
//     return error.message;
//   }
//   return 'An unexpected error occurred';
// };

// // === Async Thunks ===

// export const fetchCurrentEmployer = createAsyncThunk<
//   EmployerUser,
//   void,
//   { rejectValue: string }
// >(
//   'employer/fetchCurrentEmployer',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await employerAPI.getCurrentEmployer();
//       return response.data as EmployerUser;
//     } catch (error: unknown) {
//       return rejectWithValue(getErrorMessage(error));
//     }
//   }
// );

// // POST /v1/employers/invite/
// export const inviteEmployee = createAsyncThunk<
//   EmployeeInvite, // Fulfilled value type
//   { email: string; phone?: string; department: string } & { onSuccess?: () => void }, // Payload type
//   { rejectValue: string } // Reject value type
// >(
//   'employer/inviteEmployee',
//   async (employeeData, { rejectWithValue }) => {
//     try {
//       // NOTE: Assuming employerAPI.inviteEmployee internally handles the POST to /v1/employers/invite/ with emailData
//       const response = await employerAPI.inviteEmployee(employeeData); 
//       // The API often returns the new object upon successful creation
//       employeeData.onSuccess?.();
//       return response.data as EmployeeInvite;
//     } catch (error: unknown) {
//       return rejectWithValue(getErrorMessage(error));
//     }
//   }
// );

// export const fetchEmployeeInvites = createAsyncThunk<
//   EmployeeInvite[],
//   void,
//   { rejectValue: string }
// >(
//   'employer/fetchInvites',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await employerAPI.viewInviteEmployee();
//       return response.data as EmployeeInvite[];
//     } catch (error: unknown) {
//       return rejectWithValue(getErrorMessage(error));
//     }
//   }
// );

// export const addSubscription = createAsyncThunk<
//   BillingDetails,
//   void,
//   { rejectValue: string }
// >(
//   'employer/addSubscription',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await employerAPI.viewSubscription();
//       return response.data as BillingDetails;
//     } catch (error: unknown) {
//       return rejectWithValue(getErrorMessage(error));
//     }
//   }
// );

// export const fetchBillingDetails = createAsyncThunk<
//   BillingDetails,
//   void,
//   { rejectValue: string }
// >(
//   'employer/fetchBilling',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await employerAPI.viewBilling();
//       return response.data as BillingDetails;
//     } catch (error: unknown) {
//       return rejectWithValue(getErrorMessage(error));
//     }
//   }
// );

// export const fetchEmployerEngagement = createAsyncThunk<
//   EmployerEngagementData,
//   void,
//   { rejectValue: string }
// >(
//   'employer/fetchEngagement',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await employerAPI.getEngagement?.();
//       return response?.data as EmployerEngagementData;
//     } catch (error: unknown) {
//       return rejectWithValue(getErrorMessage(error));
//     }
//   }
// );

// export const fetchEmployerReports = createAsyncThunk<
//   Report[],
//   void,
//   { rejectValue: string }
// >(
//   'employer/fetchReports',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await employerAPI.getReports();
//       return response.data as Report[];
//     } catch (error: unknown) {
//       return rejectWithValue(getErrorMessage(error));
//     }
//   }
// );

// export const fetchEmployerDashboardSummary = createAsyncThunk<
//   DashboardSummary,
//   void,
//   { rejectValue: string }
// >(
//   'employer/fetchSummary',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await employerAPI.getemployerdashboardSummary();
//       return response.data as DashboardSummary;
//     } catch (error: unknown) {
//       return rejectWithValue(getErrorMessage(error));
//     }
//   }
// );

// export const fetchDepartmentDistribution = createAsyncThunk<
//   Array<{ departmentName: string; workerPercentage: number; color: string }>,
//   void,
//   { rejectValue: string }
// >(
//   'employer/fetchDepartmentDistribution',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await employerAPI.getDepartmentDistribution();
//       return response.data as Array<{ departmentName: string; workerPercentage: number; color: string }>;
//     } catch (error: unknown) {
//       return rejectWithValue(getErrorMessage(error));
//     }
//   }
// );

// export const fetchWellnessTrend = createAsyncThunk<
//   Array<{ date: string; score: number }>,
//   void,
//   { rejectValue: string }
// >(
//   'employer/fetchWellnessTrend',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await employerAPI.getWellnessTrend();
//       return response.data as Array<{ date: string; score: number }>;
//     } catch (error: unknown) {
//       return rejectWithValue(getErrorMessage(error));
//     }
//   }
// );

// export const fetchMoodTrends = createAsyncThunk<
//   any[],
//   void,
//   { rejectValue: string }
// >(
//   'employer/fetchMoodTrends',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await employerAPI.getMoodTrends();
//       return response.data as any[];
//     } catch (error: unknown) {
//       return rejectWithValue(getErrorMessage(error));
//     }
//   }
// );

// export const fetchEmployees = createAsyncThunk<
//   Employee[],
//   void,
//   { rejectValue: string }
// >(
//   'employer/',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await employerAPI.getEmployees();
//       return response.data as Employee[];
//     } catch (error: unknown) {
//       return rejectWithValue(getErrorMessage(error));
//     }
//   }
// );


// // --- Initial State ---
// const initialState: EmployerState = {
//   currentEmployer: null,
//   invites: [],
//   employees: [],
//   billing: null,
//   departmentDistribution: [], 
//   wellnessTrend: [],
//   // newly added collections expected by the dashboard hook
//   moodTrends: [],
//   // Note: 'subcription' typo from original code is kept for consistency with the State interface
//   subscription: null, 
//   engagement: null,
//   reports: [],
//   summary: null,
//   isLoading: false,
//   isActionLoading: false,
//   error: null,
// };

// // === Slice ===
// const employerSlice = createSlice({
//   name: 'employer',
//   initialState,
//   reducers: {
//     clearEmployerError: (state: EmployerState): void => {
//       state.error = null;
//     },
//     clearEmployerStatus: (state: EmployerState): void => {
//       state.isLoading = false;
//       state.isActionLoading = false;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCurrentEmployer.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchCurrentEmployer.fulfilled, (state, action: PayloadAction<EmployerUser>) => {
//         state.isLoading = false;
//         state.currentEmployer = action.payload;
//       })
//       .addCase(fetchCurrentEmployer.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload || null;
//       })
//       .addCase(fetchEmployeeInvites.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchEmployeeInvites.fulfilled, (state, action: PayloadAction<EmployeeInvite[]>) => {
//         state.isLoading = false;
//         state.invites = action.payload;
//       })
//       .addCase(fetchEmployeeInvites.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload || null;
//       })
//       .addCase(fetchEmployees.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchEmployees.fulfilled, (state, action: PayloadAction<Employee[]>) => {
//         state.isLoading = false;
//         state.employees = action.payload;
//       })
//       .addCase(fetchEmployees.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload || null;
//       })
//       .addCase(fetchMoodTrends.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchMoodTrends.fulfilled, (state, action: PayloadAction<any[]>) => {
//         state.isLoading = false;
//         state.moodTrends = action.payload;
//       })
//       .addCase(fetchMoodTrends.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload || null;
//       })
//       .addCase(fetchBillingDetails.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchBillingDetails.fulfilled, (state, action: PayloadAction<BillingDetails>) => {
//         state.isLoading = false;
//         state.billing = action.payload;
//       })
//       .addCase(fetchBillingDetails.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload || null;
//       })
//       .addCase(fetchEmployerEngagement.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchEmployerEngagement.fulfilled, (state, action: PayloadAction<EmployerEngagementData>) => {
//         state.isLoading = false;
//         state.engagement = action.payload;
//       })
//       .addCase(fetchEmployerEngagement.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload || null;
//       })
//       .addCase(fetchEmployerReports.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchEmployerReports.fulfilled, (state, action: PayloadAction<Report[]>) => {
//         state.isLoading = false;
//         state.reports = action.payload;
//       })
//       .addCase(fetchEmployerReports.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload || null;
//       })
//       .addCase(fetchEmployerDashboardSummary.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchEmployerDashboardSummary.fulfilled, (state, action: PayloadAction<DashboardSummary>) => {
//         state.isLoading = false;
//         state.summary = action.payload;
//       })
//       .addCase(fetchEmployerDashboardSummary.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload || null;
//       })
//       .addCase(fetchDepartmentDistribution.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchDepartmentDistribution.fulfilled, (state, action: PayloadAction<Array<{ departmentName: string; workerPercentage: number; color: string }>>) => {
//         state.isLoading = false;
//         state.departmentDistribution = action.payload;
//       })
//       .addCase(fetchDepartmentDistribution.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload || null;
//       })
//       .addCase(fetchWellnessTrend.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchWellnessTrend.fulfilled, (state, action: PayloadAction<Array<{ date: string; score: number }>>) => {
//         state.isLoading = false;
//         state.wellnessTrend = action.payload;
//       })
//       .addCase(fetchWellnessTrend.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload || null;
//       })
//       .addCase(inviteEmployee.pending, (state) => {
//         state.isActionLoading = true;
//         state.error = null;
//       })
//       .addCase(inviteEmployee.fulfilled, (state, action: PayloadAction<EmployeeInvite>) => {
//         state.isActionLoading = false;
//         state.invites.unshift(action.payload);
//       })
//       .addCase(inviteEmployee.rejected, (state, action) => {
//         state.isActionLoading = false;
//         state.error = action.payload || null;
//       })
//       .addCase(addSubscription.pending, (state) => {
//         state.isActionLoading = true;
//         state.error = null;
//       })
//       .addCase(addSubscription.fulfilled, (state, action: PayloadAction<BillingDetails>) => {
//         state.isActionLoading = false;
//         state.billing = action.payload;
//       })
//       .addCase(addSubscription.rejected, (state, action) => {
//         state.isActionLoading = false;
//         state.error = action.payload || null;
//       });
//   },
// });

// export const { clearEmployerError, clearEmployerStatus } = employerSlice.actions;
// export default employerSlice.reducer;

// // import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// // import axios, { AxiosError } from 'axios';
// // import { employerAPI } from '../../api/apiConfig';
// // import {
// //   EmployerState,
// //   EmployeeInvite,
// //   BillingDetails,
// //   EmployerEngagementData,
// //   Report,
// //   DashboardSummary,
// // } from '../../types/employer';

// // // --- Error Handler ---
// // const getErrorMessage = (error: unknown): string => {
// //   if (axios.isAxiosError(error)) {
// //     const axiosError = error as AxiosError;
// //     return (
// //       (axiosError.response?.data as { detail?: string; error?: string })?.detail ||
// //       (axiosError.response?.data as { detail?: string; error?: string })?.error ||
// //       axiosError.message ||
// //       'An unknown error occurred'
// //     );
// //   }
// //   if (error instanceof Error) {
// //     return error.message;
// //   }
// //   return 'An unexpected error occurred';
// // };

// // // --- Async Thunks ---
// // interface LogTransactionPayload {
// //     tx_ref: string;
// //     plan: string;
// //     amount: number;
// // }

// // // NOTE: In a real application, the backend API endpoint (e.g., '/api/v1/verify-payment') 
// // // would perform the critical step of calling Flutterwave's V3 API to verify the transaction
// // // ID received in the response before granting access.

// // export const logTransactionSuccess = createAsyncThunk<
// //   { message: string }, 
// //   LogTransactionPayload, 
// //   { rejectValue: string } 
// // >(
// //   'auth/logTransactionSuccess',
// //   async (payload, { rejectWithValue }) => {
// //     try {
// //       // REPLACE with your actual backend endpoint for payment verification
// //       const response = await axios.post('YOUR_BACKEND_API_URL/verify-payment', payload, {
// //         // You would typically include a JWT token in the headers here
// //         // headers: { Authorization: `Bearer ${getAuthToken()}` } 
// //       }); 
      
// //       // Assuming your backend responds with a success message after verification and update
// //       return response.data;
      
// //      // eslint-disable-next-line @typescript-eslint/no-explicit-any
// //     } catch (error: any) {
// //       const errorMessage = error.response?.data?.message || 'Failed to verify transaction on the server.';
// //       // Log the error for debugging
// //       console.error("Backend Verification Error:", error); 
// //       return rejectWithValue(errorMessage);
// //     }
// //   }
// // );

// // // POST /v1/employers/invite/

// // export const inviteEmployee = createAsyncThunk<
// //   EmployeeInvite, // Fulfilled value type
// //   { email: string } & { onSuccess?: () => void }, // Payload type
// //   { rejectValue: string } // Reject value type
// // >(
// //   'employer/inviteEmployee',
// //   async (emailData, { rejectWithValue }) => {
// //     try {
// //       // NOTE: Assuming employerAPI.inviteEmployee internally handles the POST to /v1/employers/invite/ with emailData
// //       const response = await employerAPI.inviteEmployee(); 
// //       emailData.onSuccess?.();
// //       // The API often returns the new object upon successful creation
// //       return response.data as EmployeeInvite;
// //     } catch (error: unknown) {
// //       return rejectWithValue(getErrorMessage(error));
// //     }
// //   }
// // );

// // // GET /v1/employers/view-invites/
// // export const fetchEmployeeInvites = createAsyncThunk<
// //   EmployeeInvite[], // Fulfilled value type
// //   void, // Payload type
// //   { rejectValue: string } // Reject value type
// // >(
// //   'employer/fetchInvites',
// //   async (_, { rejectWithValue }) => {
// //     try {
// //       const response = await employerAPI.viewInviteEmployee();
// //       return response.data as EmployeeInvite[];
// //     } catch (error: unknown) {
// //       return rejectWithValue(getErrorMessage(error));
// //     }
// //   }
// // );

// // // POST /v1/employer/billing/add-subscription/
// // export const addSubscription = createAsyncThunk<
// //   BillingDetails, // Fulfilled value type
// //   void, // Payload type (assuming no payload is needed, or it's handled internally)
// //   { rejectValue: string } // Reject value type
// // >(
// //   'employer/addSubscription',
// //   async (_, { rejectWithValue }) => {
// //     try {
// //       // NOTE: Assuming employerAPI.viewSubscription is a placeholder for a POST function
// //       const response = await employerAPI.viewSubscription(); 
// //       return response.data as BillingDetails; 
// //     } catch (error: unknown) {
// //       return rejectWithValue(getErrorMessage(error)); 
// //     }
// //   }
// // );

// // // GET /v1/employer/billing/view
// // export const fetchBillingDetails = createAsyncThunk<
// //   BillingDetails, // Fulfilled value type
// //   void, // Payload type
// //   { rejectValue: string } // Reject value type
// // >(
// //   'employer/fetchBilling',
// //   async (_, { rejectWithValue }) => {
// //     try {
// //       const response = await employerAPI.viewBilling();
// //       return response.data as BillingDetails;
// //     } catch (error: unknown) {
// //       return rejectWithValue(getErrorMessage(error));
// //     }
// //   }
// // );

// // // GET /v1/employer/engagements/
// // export const fetchEmployerEngagement = createAsyncThunk<
// //   EmployerEngagementData, // Fulfilled value type
// //   void, // Payload type
// //   { rejectValue: string } // Reject value type
// // >(
// //   'employer/fetchEngagement',
// //   async (_, { rejectWithValue }) => {
// //     try {
// //       const response = await employerAPI.getEngagement();
// //       return response.data as EmployerEngagementData;
// //     } catch (error: unknown) {
// //       return rejectWithValue(getErrorMessage(error));
// //     }
// //   }
// // );

// // // POST /v1/employer/reports/ (Usually requires filter/param data for POST report generation)
// // export const fetchEmployerReports = createAsyncThunk<
// //   Report[], // Fulfilled value type
// //   void, // Payload type
// //   { rejectValue: string } // Reject value type
// // >(
// //   'employer/fetchReports',
// //   async (_, { rejectWithValue }) => {
// //     try {
// //       // NOTE: Assuming employerAPI.getReports is a placeholder for a POST function
// //       const response = await employerAPI.getReports();
// //       return response.data as Report[];
// //     } catch (error: unknown) {
// //       return rejectWithValue(getErrorMessage(error));
// //     }
// //   }
// // );

// // // GET /v1/employer/overview
// // export const fetchEmployerDashboardSummary = createAsyncThunk<
// //   DashboardSummary, // Fulfilled value type
// //   void, // Payload type
// //   { rejectValue: string } // Reject value type
// // >(
// //   'employer/fetchSummary',
// //   async (_, { rejectWithValue }) => {
// //     try {
// //       const response = await employerAPI.getemployerdashboardSummary();
// //       return response.data as DashboardSummary;
// //     } catch (error: unknown) {
// //       return rejectWithValue(getErrorMessage(error));
// //     }
// //   }
// // );

// // // --- Initial State ---
// // const initialState: EmployerState = {
// //   invites: [],
// //   billing: null,
// //   // Note: 'subcription' typo from original code is kept for consistency with the State interface
// //   subcription: null, 
// //   engagement: null,
// //   reports: [],
// //   summary: null,
// //   isLoading: false, // For general fetching (GET requests)
// //   isActionLoading: false, // For action-based requests (POST/PUT/DELETE)
// //   error: null,
// // };

// // // --- Slice Definition ---
// // const employerSlice = createSlice({
// //   departmentName: 'employer',
// //   initialState,
// //   reducers: {
// //     // Clear the error status
// //     clearEmployerError: (state: EmployerState): void => {
// //       state.error = null;
// //     },
// //     // Reducer to manually clear loading states if needed
// //     clearEmployerStatus: (state: EmployerState): void => {
// //       state.isLoading = false;
// //       state.isActionLoading = false;
// //       state.error = null;
// //     },
// //   },
// //   extraReducers: (builder) => {
// //     builder
// //       // --- Fetch Employee Invites (GET) ---
// //       .addCase(fetchEmployeeInvites.pending, (state) => {
// //         state.isLoading = true;
// //         state.error = null;
// //       })
// //       .addCase(fetchEmployeeInvites.fulfilled, (state, action) => {
// //         state.isLoading = false;
// //         state.invites = action.payload;
// //       })
// //       .addCase(fetchEmployeeInvites.rejected, (state, action) => {
// //         state.isLoading = false;
// //         state.error = action.payload as string;
// //       })

// //       // --- Fetch Billing Details (GET) ---
// //       .addCase(fetchBillingDetails.pending, (state) => {
// //         state.isLoading = true;
// //         state.error = null;
// //       })
// //       .addCase(fetchBillingDetails.fulfilled, (state, action: PayloadAction<BillingDetails>) => {
// //         state.isLoading = false;
// //         state.billing = action.payload;
// //       })
// //       .addCase(fetchBillingDetails.rejected, (state, action) => {
// //         state.isLoading = false;
// //         state.error = action.payload as string;
// //       })

// //       // --- Fetch Employer Engagement (GET) ---
// //       .addCase(fetchEmployerEngagement.pending, (state) => {
// //         state.isLoading = true;
// //         state.error = null;
// //       })
// //       .addCase(fetchEmployerEngagement.fulfilled, (state, action: PayloadAction<EmployerEngagementData>) => {
// //         state.isLoading = false;
// //         state.engagement = action.payload;
// //       })
// //       .addCase(fetchEmployerEngagement.rejected, (state, action) => {
// //         state.isLoading = false;
// //         state.error = action.payload as string;
// //       })

// //       // --- Fetch Employer Reports (POST/GET) ---
// //       .addCase(fetchEmployerReports.pending, (state) => {
// //         state.isLoading = true;
// //         state.error = null;
// //       })
// //       .addCase(fetchEmployerReports.fulfilled, (state, action: PayloadAction<Report[]>) => {
// //         state.isLoading = false;
// //         state.reports = action.payload;
// //       })
// //       .addCase(fetchEmployerReports.rejected, (state, action) => {
// //         state.isLoading = false;
// //         state.error = action.payload as string;
// //       })

// //       // --- Fetch Employer Dashboard Summary (GET) ---
// //       .addCase(fetchEmployerDashboardSummary.pending, (state) => {
// //         state.isLoading = true;
// //         state.error = null;
// //       })
// //       .addCase(fetchEmployerDashboardSummary.fulfilled, (state, action: PayloadAction<DashboardSummary>) => {
// //         state.isLoading = false;
// //         state.summary = action.payload;
// //       })
// //       .addCase(fetchEmployerDashboardSummary.rejected, (state, action) => {
// //         state.isLoading = false;
// //         state.error = action.payload as string;
// //       })

// //       // --- Invite Employee (POST Action) ---
// //       .addCase(inviteEmployee.pending, (state) => {
// //         state.isActionLoading = true;
// //         state.error = null;
// //       })
// //       .addCase(inviteEmployee.fulfilled, (state, action: PayloadAction<EmployeeInvite>) => {
// //         state.isActionLoading = false;
// //         // Prepend the new invite to the list
// //         state.invites.unshift(action.payload); 
// //       })
// //       .addCase(inviteEmployee.rejected, (state, action) => {
// //         state.isActionLoading = false;
// //         state.error = action.payload as string;
// //       })

// //       // --- Add Subscription (POST Action) ---
// //       .addCase(addSubscription.pending, (state) => {
// //         state.isActionLoading = true;
// //         state.error = null;
// //       })
// //       .addCase(addSubscription.fulfilled, (state, action: PayloadAction<BillingDetails>) => {
// //         state.isActionLoading = false;
// //         // Update billing and also update the 'subcription' state if it exists
// //         state.billing = action.payload;
// //         //state.subcription = action.payload; 
// //       })
// //       .addCase(addSubscription.rejected, (state, action) => {
// //         state.isActionLoading = false;
// //         state.error = action.payload as string;
// //       });
// //   },
// // });

// // export const { clearEmployerError, clearEmployerStatus } = employerSlice.actions;
// // export default employerSlice.reducer;
// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import axios, { AxiosError } from 'axios';
// import { employerAPI } from '../../api/apiConfig';
// import { EmployerEngagementData } from '../../types/admin';
// import {
//   EmployerState,
//   EmployeeInvite,
//   BillingDetails,
//   Report,
//   DashboardSummary,
//   Employee,
//  EmployerUser,
 
// } from '../../types/employer';

// const getErrorMessage = (error: unknown): string => {
//   if (axios.isAxiosError(error)) {
//     const axiosError = error as AxiosError;
//     return (
//       (axiosError.response?.data as { detail?: string; error?: string })?.detail ||
//       (axiosError.response?.data as { detail?: string; error?: string })?.error ||
//       axiosError.message ||
//       'An unknown error occurred'
//     );
//   }
//   if (error instanceof Error) {
//     return error.message;
//   }
//   return 'An unexpected error occurred';
// };

// // === Async Thunks ===

// export const fetchCurrentEmployer = createAsyncThunk<
//   EmployerUser,
//   void,
//   { rejectValue: string }
// >(
//   'employer/fetchCurrentEmployer',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await employerAPI.getCurrentEmployer();
//       return response.data as EmployerUser;
//     } catch (error: unknown) {
//       return rejectWithValue(getErrorMessage(error));
//     }
//   }
// );

// // POST /v1/employers/invite/
// export const inviteEmployee = createAsyncThunk<
//   EmployeeInvite, // Fulfilled value type
//   { email: string; phone?: string; department: string } & { onSuccess?: () => void }, // Payload type
//   { rejectValue: string } // Reject value type
// >(
//   'employer/inviteEmployee',
//   async (employeeData, { rejectWithValue }) => {
//     try {
//       // NOTE: Assuming employerAPI.inviteEmployee internally handles the POST to /v1/employers/invite/ with emailData
//       const response = await employerAPI.inviteEmployee(); 
//       // The API often returns the new object upon successful creation
//       employeeData.onSuccess?.();
//       return response.data as EmployeeInvite;
//     } catch (error: unknown) {
//       return rejectWithValue(getErrorMessage(error));
//     }
//   }
// );

// export const fetchEmployeeInvites = createAsyncThunk<
//   EmployeeInvite[],
//   void,
//   { rejectValue: string }
// >(
//   'employer/fetchInvites',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await employerAPI.viewInviteEmployee();
//       return response.data as EmployeeInvite[];
//     } catch (error: unknown) {
//       return rejectWithValue(getErrorMessage(error));
//     }
//   }
// );

// export const addSubscription = createAsyncThunk<
//   BillingDetails,
//   void,
//   { rejectValue: string }
// >(
//   'employer/addSubscription',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await employerAPI.viewSubscription();
//       return response.data as BillingDetails;
//     } catch (error: unknown) {
//       return rejectWithValue(getErrorMessage(error));
//     }
//   }
// );

// export const fetchBillingDetails = createAsyncThunk<
//   BillingDetails,
//   void,
//   { rejectValue: string }
// >(
//   'employer/fetchBilling',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await employerAPI.viewBilling();
//       return response.data as BillingDetails;
//     } catch (error: unknown) {
//       return rejectWithValue(getErrorMessage(error));
//     }
//   }
// );

// export const fetchEmployerEngagement = createAsyncThunk<
//   EmployerEngagementData,
//   void,
//   { rejectValue: string }
// >(
//   'employer/fetchEngagement',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await employerAPI.getEngagement?.();
//       return response?.data as EmployerEngagementData;
//     } catch (error: unknown) {
//       return rejectWithValue(getErrorMessage(error));
//     }
//   }
// );

// export const fetchEmployerReports = createAsyncThunk<
//   Report[],
//   void,
//   { rejectValue: string }
// >(
//   'employer/fetchReports',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await employerAPI.getReports();
//       return response.data as Report[];
//     } catch (error: unknown) {
//       return rejectWithValue(getErrorMessage(error));
//     }
//   }
// );

// export const fetchEmployerDashboardSummary = createAsyncThunk<
//   DashboardSummary,
//   void,
//   { rejectValue: string }
// >(
//   'employer/fetchSummary',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await employerAPI.getemployerdashboardSummary();
//       return response.data as DashboardSummary;
//     } catch (error: unknown) {
//       return rejectWithValue(getErrorMessage(error));
//     }
//   }
// );

// export const fetchDepartmentDistribution = createAsyncThunk<
//   Array<{ departmentName: string; workerPercentage: number; color: string }>,
//   void,
//   { rejectValue: string }
// >(
//   'employer/fetchDepartmentDistribution',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await employerAPI.getDepartmentDistribution();
//       return response.data as Array<{ departmentName: string; workerPercentage: number; color: string }>;
//     } catch (error: unknown) {
//       return rejectWithValue(getErrorMessage(error));
//     }
//   }
// );

// export const fetchWellnessTrend = createAsyncThunk<
//   Array<{ date: string; score: number }>,
//   void,
//   { rejectValue: string }
// >(
//   'employer/fetchWellnessTrend',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await employerAPI.getWellnessTrend();
//       return response.data as Array<{ date: string; score: number }>;
//     } catch (error: unknown) {
//       return rejectWithValue(getErrorMessage(error));
//     }
//   }
// );

// export const fetchMoodTrends = createAsyncThunk<
//   any[],
//   void,
//   { rejectValue: string }
// >(
//   'employer/fetchMoodTrends',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await employerAPI.getMoodTrends();
//       return response.data as any[];
//     } catch (error: unknown) {
//       return rejectWithValue(getErrorMessage(error));
//     }
//   }
// );

// export const fetchEmployees = createAsyncThunk<
//   Employee[],
//   void,
//   { rejectValue: string }
// >(
//   'employer/fetchEmployees',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await employerAPI.getEmployees();
//       return response.data as Employee[];
//     } catch (error: unknown) {
//       return rejectWithValue(getErrorMessage(error));
//     }
//   }
// );


// // --- Initial State ---
// const initialState: EmployerState = {
//   currentEmployer: null,
//   invites: [],
//   employees: [],
//   billing: null,
//   departmentDistribution: [], 
//   wellnessTrend: [],
//   // newly added collections expected by the dashboard hook
//   moodTrends: [],
 
//   // Note: 'subcription' typo from original code is kept for consistency with the State interface
//   subscription: null, 
//   engagement: null,
//   reports: [],
//   summary: null,
//   isLoading: false,
//   isActionLoading: false,
//   error: null,
// };

// // === Slice ===
// const employerSlice = createSlice({
//   departmentName: 'employer',
//   initialState,
//   reducers: {
//     clearEmployerError: (state: EmployerState): void => {
//       state.error = null;
//     },
//     clearEmployerStatus: (state: EmployerState): void => {
//       state.isLoading = false;
//       state.isActionLoading = false;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCurrentEmployer.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchCurrentEmployer.fulfilled, (state, action: PayloadAction<EmployerUser>) => {
//         state.isLoading = false;
//         state.currentEmployer = action.payload;
//       })
//       .addCase(fetchCurrentEmployer.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload || null;
//       })
//       .addCase(fetchEmployeeInvites.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchEmployeeInvites.fulfilled, (state, action: PayloadAction<EmployeeInvite[]>) => {
//         state.isLoading = false;
//         state.invites = action.payload;
//       })
//       .addCase(fetchEmployeeInvites.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload || null;
//       })
//       .addCase(fetchEmployees.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchEmployees.fulfilled, (state, action: PayloadAction<Employee[]>) => {
//         state.isLoading = false;
//         state.employees = action.payload;
//       })
//       .addCase(fetchEmployees.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload || null;
//       })
//       .addCase(fetchMoodTrends.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchMoodTrends.fulfilled, (state, action: PayloadAction<any[]>) => {
//         state.isLoading = false;
//         state.moodTrends = action.payload;
//       })
//       .addCase(fetchMoodTrends.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload || null;
//       })
//       .addCase(fetchBillingDetails.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchBillingDetails.fulfilled, (state, action: PayloadAction<BillingDetails>) => {
//         state.isLoading = false;
//         state.billing = action.payload;
//       })
//       .addCase(fetchBillingDetails.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload || null;
//       })
//       .addCase(fetchEmployerEngagement.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchEmployerEngagement.fulfilled, (state, action: PayloadAction<EmployerEngagementData>) => {
//         state.isLoading = false;
//         state.engagement = action.payload;
//       })
//       .addCase(fetchEmployerEngagement.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload || null;
//       })
//       .addCase(fetchEmployerReports.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchEmployerReports.fulfilled, (state, action: PayloadAction<Report[]>) => {
//         state.isLoading = false;
//         state.reports = action.payload;
//       })
//       .addCase(fetchEmployerReports.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload || null;
//       })
//       .addCase(fetchEmployerDashboardSummary.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchEmployerDashboardSummary.fulfilled, (state, action: PayloadAction<DashboardSummary>) => {
//         state.isLoading = false;
//         state.summary = action.payload;
//       })
//       .addCase(fetchEmployerDashboardSummary.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload || null;
//       })
//       .addCase(fetchDepartmentDistribution.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchDepartmentDistribution.fulfilled, (state, action: PayloadAction<Array<{ departmentName: string; workerPercentage: number; color: string }>>) => {
//         state.isLoading = false;
//         state.departmentDistribution = action.payload;
//       })
//       .addCase(fetchDepartmentDistribution.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload || null;
//       })
//       .addCase(fetchWellnessTrend.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchWellnessTrend.fulfilled, (state, action: PayloadAction<Array<{ date: string; score: number }>>) => {
//         state.isLoading = false;
//         state.wellnessTrend = action.payload;
//       })
//       .addCase(fetchWellnessTrend.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload || null;
//       })
//       .addCase(inviteEmployee.pending, (state) => {
//         state.isActionLoading = true;
//         state.error = null;
//       })
//       .addCase(inviteEmployee.fulfilled, (state, action: PayloadAction<EmployeeInvite>) => {
//         state.isActionLoading = false;
//         state.invites.unshift(action.payload);
//       })
//       .addCase(inviteEmployee.rejected, (state, action) => {
//         state.isActionLoading = false;
//         state.error = action.payload || null;
//       })
//       .addCase(addSubscription.pending, (state) => {
//         state.isActionLoading = true;
//         state.error = null;
//       })
//       .addCase(addSubscription.fulfilled, (state, action: PayloadAction<BillingDetails>) => {
//         state.isActionLoading = false;
//         state.billing = action.payload;
//       })
//       .addCase(addSubscription.rejected, (state, action) => {
//         state.isActionLoading = false;
//         state.error = action.payload || null;
//       });
//   },
// });

// export const { clearEmployerError, clearEmployerStatus } = employerSlice.actions;
// export default employerSlice.reducer;

