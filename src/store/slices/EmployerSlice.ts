// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import axios, { AxiosError } from "axios";
// import { employerAPI } from "../../api/apiConfig";
// import { EmployerEngagementData } from "../../types/admin";
// import {
//   EmployerState,
//   EmployeeInvite,
//   BillingDetails,
//   Report,
//   DashboardSummary,
//   Employee,
//   EmployerUser,
//   EmployeeStatusData,
//   MoodTrend,
// } from "../../types/employer";

// const getErrorMessage = (error: unknown): string => {
//   if (axios.isAxiosError(error)) {
//     const axiosError = error as AxiosError;
//     return (
//       (axiosError.response?.data as { detail?: string; error?: string })
//         ?.detail ||
//       (axiosError.response?.data as { detail?: string; error?: string })
//         ?.error ||
//       axiosError.message ||
//       "An unknown error occurred"
//     );
//   }
//   if (error instanceof Error) {
//     return error.message;
//   }
//   return "An unexpected error occurred";
// };

// // === Async Thunks ===

// export const fetchCurrentEmployer = createAsyncThunk<
//   EmployerUser,
//   void,
//   { rejectValue: string }
// >("employer/fetchCurrentEmployer", async (_, { rejectWithValue }) => {
//   try {
//     const response = await employerAPI.getCurrentEmployer();
//     return response.data as EmployerUser;
//   } catch (error: unknown) {
//     return rejectWithValue(getErrorMessage(error));
//   }
// });

// // POST /v1/employers/invite/
// export const inviteEmployee = createAsyncThunk<
//   EmployeeInvite, // Fulfilled value type
//   { email: string; phone?: string; department: string } & {
//     onSuccess?: () => void;
//   }, // Payload type
//   { rejectValue: string } // Reject value type
// >("employer/inviteEmployee", async (employeeData, { rejectWithValue }) => {
//   try {
//     const response = await employerAPI.inviteEmployee(employeeData);
//     // The API often returns the new object upon successful creation
//     employeeData.onSuccess?.();
//     return response.data as EmployeeInvite;
//   } catch (error: unknown) {
//     return rejectWithValue(getErrorMessage(error));
//   }
// });

// export const toggleEmployeeStatus = createAsyncThunk<
//   { id: string; status: string },
//   { id: string; currentStatus: string },
//   { rejectValue: string }
// >(
//   "employer/toggleEmployeeStatus",
//   async ({ id, currentStatus }, { rejectWithValue }) => {
//     try {
//       const newStatus = currentStatus === "active" ? "inactive" : "active";
//       await employerAPI.updateEmployeeStatus(
//         `/v1/employees/${id}/status`,
//         newStatus,
//       );
//       return { id, status: newStatus };
//     } catch (error: unknown) {
//       return rejectWithValue(getErrorMessage(error));
//     }
//   },
// );

// export const deleteEmployee = createAsyncThunk<
//   Employee[],
//   string,
//   { rejectValue: string }
// >("employer/deleteEmployee", async (employeeId, { rejectWithValue }) => {
//   try {
//     const response = await employerAPI.deleteEmployee(employeeId);
//     return response.data as Employee[];
//   } catch (error: unknown) {
//     return rejectWithValue(getErrorMessage(error));
//   }
// });

// // export const toggleEmployeeStatus = createAsyncThunk(
// //   "employer/toggleStatus",
// //   async ({ id, currentStatus }, { rejectWithValue }) => {
// //     try {
// //       const newStatus = currentStatus === "active" ? "inactive" : "active";
// //       // Usually a PATCH or POST for updating status
// //       const response = await api.patch(`/v1/employees/${id}/status`, { status: newStatus });
// //       return { id, status: newStatus };
// //     } catch (err) {
// //       return rejectWithValue(err.response.data);
// //     }
// //   }
// // );

// export const fetchEmployeeInvites = createAsyncThunk<
//   EmployeeInvite[],
//   void,
//   { rejectValue: string }
// >("employer/fetchInvites", async (_, { rejectWithValue }) => {
//   try {
//     const response = await employerAPI.viewInviteEmployee();
//     return response.data as EmployeeInvite[];
//   } catch (error: unknown) {
//     return rejectWithValue(getErrorMessage(error));
//   }
// });

// // CORRECTED AND INTEGRATED fetchEmployees thunk
// export const fetchEmployees = createAsyncThunk<
//   Employee[],
//   void,
//   { rejectValue: string }
// >("employer/fetchEmployees", async (_, { rejectWithValue }) => {
//   try {
//     const response = await employerAPI.getEmployees();
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const backendData = (response.data.employees || response.data) as any[];

//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const mappedEmployees: Employee[] = backendData.map((employee: any) => ({
//       id: employee.id,

//       // name: employee.full_name || `${employee.first_name || ''} ${employee.last_name || ''}`.trim() || 'N/A',
//       emailAddress: employee.empemail || employee.email || "N/A", // Adjusted to accept 'email' field from the console data
//       employeedepartment:
//         employee.empdepartment || employee.employeedepartment || "N/A",
//       status: employee.empstatus
//         ? (employee.empstatus.toLowerCase() as Employee["status"])
//         : "N/A",
//     }));

//     return mappedEmployees;
//   } catch (error) {
//     return rejectWithValue(getErrorMessage(error));
//   }
// });

// export const addSubscription = createAsyncThunk<
//   BillingDetails,
//   void,
//   { rejectValue: string }
// >("employer/addSubscription", async (_, { rejectWithValue }) => {
//   try {
//     const response = await employerAPI.viewSubscription();
//     return response.data as BillingDetails;
//   } catch (error: unknown) {
//     return rejectWithValue(getErrorMessage(error));
//   }
// });

// export const fetchBillingDetails = createAsyncThunk<
//   BillingDetails,
//   void,
//   { rejectValue: string }
// >("employer/fetchBilling", async (_, { rejectWithValue }) => {
//   try {
//     const response = await employerAPI.viewBilling();
//     return response.data as BillingDetails;
//   } catch (error: unknown) {
//     return rejectWithValue(getErrorMessage(error));
//   }
// });

// export const fetchEmployerEngagement = createAsyncThunk<
//   EmployerEngagementData,
//   void,
//   { rejectValue: string }
// >("employer/fetchEngagement", async (_, { rejectWithValue }) => {
//   try {
//     // Optional chaining is used for both getEngagement and response.data
//     const response = await employerAPI.getEngagement?.();
//     return response?.data as EmployerEngagementData;
//   } catch (error: unknown) {
//     return rejectWithValue(getErrorMessage(error));
//   }
// });
// export const downloadReport = createAsyncThunk<
//   void,
//   { url: string; fileName: string },
//   { rejectValue: string }
// >("employer/downloadReport", async ({ url, fileName }, { rejectWithValue }) => {
//   try {
//     const blob = await employerAPI.getReportBlob(url);

//     // Create a blob and trigger download
//     const downloadUrl = window.URL.createObjectURL(blob);
//     const link = document.createElement("a");

//     link.href = downloadUrl;
//     link.setAttribute("download", fileName);
//     document.body.appendChild(link);
//     link.click();

//     // Cleanup
//     link.remove();
//     window.URL.revokeObjectURL(downloadUrl);
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   } catch (error: any) {
//     return rejectWithValue(getErrorMessage(error));
//   }
// });

// export const fetchEmployerReports = createAsyncThunk<
//   Report[],
//   void,
//   { rejectValue: string }
// >("employer/fetchReports", async (_, { rejectWithValue }) => {
//   try {
//     const response = await employerAPI.getReports();
//     return response.data as Report[];
//   } catch (error: unknown) {
//     return rejectWithValue(getErrorMessage(error));
//   }
// });

// export const fetchRiskAssessmentReports = createAsyncThunk<
//   Report[],
//   void,
//   { rejectValue: string }
// >("employer/riskassessmentReports/download", async (_, { rejectWithValue }) => {
//   try {
//     const response = await employerAPI.getReports();
//     return response.data as Report[];
//   } catch (error: unknown) {
//     return rejectWithValue(getErrorMessage(error));
//   }
// });

// export const fetchDepartmentAnalysisReports = createAsyncThunk<
//   Report[],
//   void,
//   { rejectValue: string }
// >(
//   "employer/departmentanalysisReports/download",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await employerAPI.getReports();
//       return response.data as Report[];
//     } catch (error: unknown) {
//       return rejectWithValue(getErrorMessage(error));
//     }
//   },
// );

// export const fetchEngagementReports = createAsyncThunk<
//   Report[],
//   void,
//   { rejectValue: string }
// >("employer/engagementReports/download", async (_, { rejectWithValue }) => {
//   try {
//     const response = await employerAPI.getReports();
//     return response.data as Report[];
//   } catch (error: unknown) {
//     return rejectWithValue(getErrorMessage(error));
//   }
// });

// export const fetchEmployerDashboardSummary = createAsyncThunk<
//   DashboardSummary,
//   void,
//   { rejectValue: string }
// >("employer/fetchSummary", async (_, { rejectWithValue }) => {
//   try {
//     const response = await employerAPI.getemployerdashboardSummary();
//     return response.data as DashboardSummary;
//   } catch (error: unknown) {
//     return rejectWithValue(getErrorMessage(error));
//   }
// });

// export const fetchDepartmentDistribution = createAsyncThunk<
//   Array<{ departmentName: string; workerPercentage: number; color: string }>,
//   void,
//   { rejectValue: string }
// >("employer/fetchDepartmentDistribution", async (_, { rejectWithValue }) => {
//   try {
//     const response = await employerAPI.getDepartmentDistribution();
//     return response.data as Array<{
//       departmentName: string;
//       workerPercentage: number;
//       color: string;
//     }>;
//   } catch (error: unknown) {
//     return rejectWithValue(getErrorMessage(error));
//   }
// });

// export const fetchWellnessTrend = createAsyncThunk<
//   Array<{
//     date: string;
//     avg_score: number;
//     mood_counts: Record<string, number>;
//   }>,
//   void,
//   { rejectValue: string }
// >("employer/fetchWellnessTrend", async (_, { rejectWithValue }) => {
//   try {
//     const response = await employerAPI.getWellnessTrend();
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const mapped = (response.data || []).map((item: any) => ({
//       date: item.date || "",
//       avg_score: item.score ?? item.avg_score ?? 0,
//       mood_counts: item.mood_counts ?? {},
//     }));
//     return mapped;
//   } catch (error: unknown) {
//     return rejectWithValue(getErrorMessage(error));
//   }
// });

// export const fetchMoodTrends = createAsyncThunk<
//   MoodTrend[],
//   void,
//   { rejectValue: string }
// >("employer/fetchMoodTrends", async (_arg, { rejectWithValue }) => {
//   try {
//     const response = await employerAPI.getMoodTrends();
//     if (!response.status || response.status < 200 || response.status >= 300) {
//       return rejectWithValue(
//         response.statusText || "Failed to fetch mood trends",
//       );
//     }
//     const raw = response.data;
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const mapped = (raw || []).map((pt: any) => ({
//       id: pt.id ?? 0,
//       employeeId: pt.employeeId ?? 0,
//       employeeName: pt.employeeName ?? "",
//       employeeDepartment: pt.employeeDepartment ?? "",
//       moodLevel: pt.moodLevel ?? 0,
//       mood: pt.mood ?? "",
//       count: pt.count ?? 0,
//       date: pt.date ?? "",
//       timestamp: pt.timestamp ?? "",
//     }));

//     return mapped;
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   } catch (err: any) {
//     return rejectWithValue(err?.message ?? "Network error");
//   }
// });

// export const fetchEmployeeStatus = createAsyncThunk<
//   EmployeeStatusData,
//   void,
//   { rejectValue: string }
// >("employer/fetchEmployeeStatus", async (_, { rejectWithValue }) => {
//   try {
//     const response = await employerAPI.getEmployeeStatus();
//     return response.data;
//   } catch (error: unknown) {
//     return rejectWithValue(getErrorMessage(error));
//   }
// });

// export const updateEmployee = createAsyncThunk(
//   "employer/updateEmployee",
//   async (
//     updatedData: Partial<Employee> & { id: number | string },
//     { rejectWithValue },
//   ) => {
//     try {
//       const response = await employerAPI.updateEmployee(
//         `/employees/${updatedData.id}`,
//         updatedData,
//       );
//       return response.data;
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to update employee",
//       );
//     }
//   },
// );

// // --- Initial State ---
// const initialState: EmployerState = {
//   currentEmployer: null,
//   invites: [],
//   employees: [],
//   billing: null,
//   departmentDistribution: [],
//   wellnessTrend: [],
//   moodTrends: [],
//   subscription: null,
//   engagement: null,
//   reports: [],
//   summary: null,
//   isLoading: false,
//   isActionLoading: false,
//   error: null,
//   EmployeeStatusData: {
//     activeEmployees: 0,
//     inactiveEmployees: 0,
//     totalEmployees: 0,
//     activePercentage: 0,
//     inactivePercentage: 0,
//   },
// };

// // === Slice ===
// const employerSlice = createSlice({
//   name: "employer",
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
//       .addCase(
//         fetchCurrentEmployer.fulfilled,
//         (state, action: PayloadAction<EmployerUser>) => {
//           state.isLoading = false;
//           state.currentEmployer = action.payload;
//         },
//       )
//       .addCase(fetchCurrentEmployer.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload || null;
//       })
//       .addCase(fetchEmployeeInvites.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(
//         fetchEmployeeInvites.fulfilled,
//         (state, action: PayloadAction<EmployeeInvite[]>) => {
//           state.isLoading = false;
//           state.invites = action.payload;
//         },
//       )
//       .addCase(fetchEmployeeInvites.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload || null;
//       })
//       .addCase(fetchEmployees.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(
//         fetchEmployees.fulfilled,
//         (state, action: PayloadAction<Employee[]>) => {
//           state.isLoading = false;
//           state.employees = action.payload;
//         },
//       )
//       .addCase(fetchEmployees.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload || null;
//       })
//       .addCase(fetchMoodTrends.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(
//         fetchMoodTrends.fulfilled,
//         (state, action: PayloadAction<MoodTrend[]>) => {
//           state.isLoading = false;
//           state.moodTrends = action.payload;
//         },
//       )
//       .addCase(fetchMoodTrends.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload || null;
//       })
//       .addCase(fetchBillingDetails.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(
//         fetchBillingDetails.fulfilled,
//         (state, action: PayloadAction<BillingDetails>) => {
//           state.isLoading = false;
//           state.billing = action.payload;
//         },
//       )
//       .addCase(fetchBillingDetails.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload || null;
//       })
//       .addCase(fetchEmployerEngagement.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(
//         fetchEmployerEngagement.fulfilled,
//         (state, action: PayloadAction<EmployerEngagementData>) => {
//           state.isLoading = false;
//           state.engagement = action.payload;
//         },
//       )
//       .addCase(fetchEmployerEngagement.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload || null;
//       })
//       .addCase(fetchEmployerReports.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(
//         fetchEmployerReports.fulfilled,
//         (state, action: PayloadAction<Report[]>) => {
//           state.isLoading = false;
//           state.reports = action.payload;
//         },
//       )
//       .addCase(fetchEmployerReports.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload || null;
//       })
//       .addCase(fetchEmployerDashboardSummary.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(
//         fetchEmployerDashboardSummary.fulfilled,
//         (state, action: PayloadAction<DashboardSummary>) => {
//           state.isLoading = false;
//           state.summary = action.payload;
//         },
//       )
//       .addCase(fetchEmployerDashboardSummary.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload || null;
//       })
//       .addCase(fetchDepartmentDistribution.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(
//         fetchDepartmentDistribution.fulfilled,
//         (
//           state,
//           action: PayloadAction<
//             Array<{
//               departmentName: string;
//               workerPercentage: number;
//               color: string;
//             }>
//           >,
//         ) => {
//           state.isLoading = false;
//           state.departmentDistribution = action.payload;
//         },
//       )
//       .addCase(fetchDepartmentDistribution.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload || null;
//       })
//       .addCase(fetchWellnessTrend.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchWellnessTrend.fulfilled, (state, action) => {
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
//       .addCase(
//         inviteEmployee.fulfilled,
//         (state, action: PayloadAction<EmployeeInvite>) => {
//           state.isActionLoading = false;
//           state.invites.unshift(action.payload);
//         },
//       )
//       .addCase(inviteEmployee.rejected, (state, action) => {
//         state.isActionLoading = false;
//         state.error = action.payload || null;
//       })
//       .addCase(addSubscription.pending, (state) => {
//         state.isActionLoading = true;
//         state.error = null;
//       })
//       .addCase(
//         addSubscription.fulfilled,
//         (state, action: PayloadAction<BillingDetails>) => {
//           state.isActionLoading = false;
//           state.billing = action.payload;
//         },
//       )
//       .addCase(addSubscription.rejected, (state, action) => {
//         state.isActionLoading = false;
//         state.error = action.payload || null;
//       })

//       .addCase(deleteEmployee.pending, (state) => {
//         state.isActionLoading = true;
//         state.error = null;
//       })
//       .addCase(deleteEmployee.fulfilled, (state, action) => {
//         state.isActionLoading = false;
//         state.employees = state.employees.filter(
//           (emp) => emp.id !== Number(action.payload),
//         );
//       })
//       .addCase(deleteEmployee.rejected, (state, action) => {
//         state.isActionLoading = false;
//         state.error = action.payload || null;
//       })
//       .addCase(toggleEmployeeStatus.pending, (state) => {
//         state.isActionLoading = true;
//         state.error = null;
//       })
//       .addCase(toggleEmployeeStatus.fulfilled, (state, action) => {
//         state.isActionLoading = false;
//         const { id, status } = action.payload;
//         const employee = state.employees.find((emp) => emp.id === Number(id));
//         if (employee) {
//           employee.status = status as Employee["status"];
//         }
//       })
//       .addCase(toggleEmployeeStatus.rejected, (state, action) => {
//         state.isActionLoading = false;
//         state.error = action.payload || null;
//       })
//       .addCase(updateEmployee.pending, (state) => {
//         state.isActionLoading = true;
//       })
//       .addCase(
//         updateEmployee.fulfilled,
//         (state, action: PayloadAction<Employee>) => {
//           state.isActionLoading = false;
//           // Update the employee in the local state array
//           const index = state.employees.findIndex(
//             (emp) => emp.id === action.payload.id,
//           );
//           if (index !== -1) {
//             state.employees[index] = action.payload;
//           }
//         },
//       )
//       .addCase(updateEmployee.rejected, (state, action) => {
//         state.isActionLoading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// // === Exports ===
// export const { clearEmployerError, clearEmployerStatus } =
//   employerSlice.actions;
// export default employerSlice.reducer;

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { employerAPI } from "../../api/apiConfig";
import { EmployerEngagementData } from "../../types/admin";
import {
  EmployerState,
  EmployeeInvite,
  BillingDetails,
  Report,
  DashboardSummary,
  Employee,
  EmployerUser,
  EmployeeStatusData,
  MoodTrend,
  FeatureUsage,
} from "../../types/employer";

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

// === Async Thunks ===

export const fetchCurrentEmployer = createAsyncThunk<
  EmployerUser,
  void,
  { rejectValue: string }
>("employer/fetchCurrentEmployer", async (_, { rejectWithValue }) => {
  try {
    const response = await employerAPI.getCurrentEmployer();
    return response.data as EmployerUser;
  } catch (error: unknown) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// POST /v1/employers/invite/
export const inviteEmployee = createAsyncThunk<
  EmployeeInvite, // Fulfilled value type
  { email: string; phone?: string; department: string } & {
    onSuccess?: () => void;
  }, // Payload type
  { rejectValue: string } // Reject value type
>("employer/inviteEmployee", async (employeeData, { rejectWithValue }) => {
  try {
    const response = await employerAPI.inviteEmployee(employeeData);
    // The API often returns the new object upon successful creation
    employeeData.onSuccess?.();
    return response.data as EmployeeInvite;
  } catch (error: unknown) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const toggleEmployeeStatus = createAsyncThunk<
  { id: string; status: string },
  { id: string; currentStatus: string },
  { rejectValue: string }
>(
  "employer/toggleEmployeeStatus",
  async ({ id, currentStatus }, { rejectWithValue }) => {
    try {
      const newStatus = currentStatus === "active" ? "inactive" : "active";
      await employerAPI.updateEmployeeStatus(
        `/v1/employees/${id}/status`,
        newStatus,
      );
      return { id, status: newStatus };
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const deleteEmployee = createAsyncThunk<
  Employee[],
  string,
  { rejectValue: string }
>("employer/deleteEmployee", async (employeeId, { rejectWithValue }) => {
  try {
    const response = await employerAPI.deleteEmployee(employeeId);
    return response.data as Employee[];
  } catch (error: unknown) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// export const toggleEmployeeStatus = createAsyncThunk(
//   "employer/toggleStatus",
//   async ({ id, currentStatus }, { rejectWithValue }) => {
//     try {
//       const newStatus = currentStatus === "active" ? "inactive" : "active";
//       // Usually a PATCH or POST for updating status
//       const response = await api.patch(`/v1/employees/${id}/status`, { status: newStatus });
//       return { id, status: newStatus };
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

export const fetchEmployeeInvites = createAsyncThunk<
  EmployeeInvite[],
  void,
  { rejectValue: string }
>("employer/fetchInvites", async (_, { rejectWithValue }) => {
  try {
    const response = await employerAPI.viewInviteEmployee();
    return response.data as EmployeeInvite[];
  } catch (error: unknown) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// CORRECTED AND INTEGRATED fetchEmployees thunk
export const fetchEmployees = createAsyncThunk<
  Employee[],
  void,
  { rejectValue: string }
>("employer/fetchEmployees", async (_, { rejectWithValue }) => {
  try {
    const response = await employerAPI.getEmployees();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const backendData = (response.data.employees || response.data) as any[];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // const mappedEmployees: Employee[] = backendData.map((employee: any) => ({
    //   id: employee.id,

    //   // name: employee.full_name || `${employee.first_name || ''} ${employee.last_name || ''}`.trim() || 'N/A',
    //   emailAddress: employee.empemail || employee.email || "N/A", // Adjusted to accept 'email' field from the console data
    //   employeedepartment:
    //     employee.empdepartment || employee.employeedepartment || "N/A",
    //   status: employee.empstatus
    //     ? (employee.empstatus.toLowerCase() as Employee["status"])
    //     : "N/A",
    // }));
    const mappedEmployees: Employee[] = backendData.map((employee: any) => ({
  id: employee.id,
  // Map backend 'email' to frontend 'emailAddress'
  emailAddress: employee.email || employee.empemail || "N/A", 
  // Map backend 'employeedepartment' to frontend 'employeedepartment'
  employeedepartment: employee.employeedepartment || "N/A", 
  phoneNumber: employee.employeephone || "", // Add this
  status: employee.empstatus ? (employee.empstatus.toLowerCase() as Employee["status"]) : "active",
}));

    return mappedEmployees;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const addSubscription = createAsyncThunk<
  BillingDetails,
  void,
  { rejectValue: string }
>("employer/addSubscription", async (_, { rejectWithValue }) => {
  try {
    const response = await employerAPI.viewSubscription();
    return response.data as BillingDetails;
  } catch (error: unknown) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const fetchBillingDetails = createAsyncThunk<
  BillingDetails,
  void,
  { rejectValue: string }
>("employer/fetchBilling", async (_, { rejectWithValue }) => {
  try {
    const response = await employerAPI.viewBilling();
    return response.data as BillingDetails;
  } catch (error: unknown) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const fetchEmployerEngagement = createAsyncThunk<
  EmployerEngagementData,
  void,
  { rejectValue: string }
>("employer/fetchEngagement", async (_, { rejectWithValue }) => {
  try {
    // Optional chaining is used for both getEngagement and response.data
    const response = await employerAPI.getEngagement?.();
    return response?.data as EmployerEngagementData;
  } catch (error: unknown) {
    return rejectWithValue(getErrorMessage(error));
  }
});
export const downloadReport = createAsyncThunk<
  void,
  { url: string; fileName: string },
  { rejectValue: string }
>("employer/downloadReport", async ({ url, fileName }, { rejectWithValue }) => {
  try {
    const blob = await employerAPI.getReportBlob(url);

    // Create a blob and trigger download
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = downloadUrl;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();

    // Cleanup
    link.remove();
    window.URL.revokeObjectURL(downloadUrl);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const fetchEmployerReports = createAsyncThunk<
  Report[],
  void,
  { rejectValue: string }
>("employer/fetchReports", async (_, { rejectWithValue }) => {
  try {
    const response = await employerAPI.getReports();
    return response.data as Report[];
  } catch (error: unknown) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const fetchRiskAssessmentReports = createAsyncThunk<
  Report[],
  void,
  { rejectValue: string }
>("employer/riskassessmentReports/download", async (_, { rejectWithValue }) => {
  try {
    const response = await employerAPI.getReports();
    return response.data as Report[];
  } catch (error: unknown) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const fetchDepartmentAnalysisReports = createAsyncThunk<
  Report[],
  void,
  { rejectValue: string }
>(
  "employer/departmentanalysisReports/download",
  async (_, { rejectWithValue }) => {
    try {
      const response = await employerAPI.getReports();
      return response.data as Report[];
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const fetchEngagementReports = createAsyncThunk<
  Report[],
  void,
  { rejectValue: string }
>("employer/engagementReports/download", async (_, { rejectWithValue }) => {
  try {
    const response = await employerAPI.getReports();
    return response.data as Report[];
  } catch (error: unknown) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const fetchEmployerDashboardSummary = createAsyncThunk<
  DashboardSummary,
  void,
  { rejectValue: string }
>("employer/fetchSummary", async (_, { rejectWithValue }) => {
  try {
    const response = await employerAPI.getemployerdashboardSummary();
    return response.data as DashboardSummary;
  } catch (error: unknown) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const fetchDepartmentDistribution = createAsyncThunk<
  Array<{ departmentName: string; workerPercentage: number; color: string }>,
  void,
  { rejectValue: string }
>("employer/fetchDepartmentDistribution", async (_, { rejectWithValue }) => {
  try {
    const response = await employerAPI.getDepartmentDistribution();
    return response.data as Array<{
      departmentName: string;
      workerPercentage: number;
      color: string;
    }>;
  } catch (error: unknown) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const fetchWellnessTrend = createAsyncThunk<
  Array<{
    date: string;
    avg_score: number;
    mood_counts: Record<string, number>;
  }>,
  void,
  { rejectValue: string }
>("employer/fetchWellnessTrend", async (_, { rejectWithValue }) => {
  try {
    const response = await employerAPI.getWellnessTrend();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mapped = (response.data || []).map((item: any) => ({
      date: item.date || "",
      avg_score: item.score ?? item.avg_score ?? 0,
      mood_counts: item.mood_counts ?? {},
    }));
    return mapped;
  } catch (error: unknown) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const fetchMoodTrends = createAsyncThunk<
  MoodTrend[],
  void,
  { rejectValue: string }
>("employer/fetchMoodTrends", async (_arg, { rejectWithValue }) => {
  try {
    const response = await employerAPI.getMoodTrends();
    if (!response.status || response.status < 200 || response.status >= 300) {
      return rejectWithValue(
        response.statusText || "Failed to fetch mood trends",
      );
    }
    const raw = response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mapped = (raw || []).map((pt: any) => ({
      id: pt.id ?? 0,
      employeeId: pt.employeeId ?? 0,
      employeeName: pt.employeeName ?? "",
      employeeDepartment: pt.employeeDepartment ?? "",
      moodLevel: pt.moodLevel ?? 0,
      mood: pt.mood ?? "",
      count: pt.count ?? 0,
      date: pt.date ?? "",
      timestamp: pt.timestamp ?? "",
    }));

    return mapped;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return rejectWithValue(err?.message ?? "Network error");
  }
});

export const fetchEmployeeStatus = createAsyncThunk<
  EmployeeStatusData,
  void,
  { rejectValue: string }
>("employer/fetchEmployeeStatus", async (_, { rejectWithValue }) => {
  try {
    const response = await employerAPI.getEmployeeStatus();
    const data = response.data;
    const activePercentage = data.totalEmployees > 0 ? Math.round((data.activeEmployees / data.totalEmployees) * 100) : 0;
    const inactivePercentage = data.totalEmployees > 0 ? Math.round((data.inactiveEmployees / data.totalEmployees) * 100) : 0;
    return { ...data, activePercentage, inactivePercentage };
  } catch (error: unknown) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const fetchFeatureUsage = createAsyncThunk<
  FeatureUsage[],
  void,
  { rejectValue: string }
>("employer/fetchFeatureUsage", async (_, { rejectWithValue }) => {
  try {
    const response = await employerAPI.getFeatureUsage();
    return response.data as FeatureUsage[];
  } catch (error: unknown) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const updateEmployee = createAsyncThunk(
  "employer/updateEmployee",
  async (
    updatedData: Partial<Employee> & { id: number | string },
    { rejectWithValue },
  ) => {
    try {
      // Transform frontend field names to backend field names
      const djangoPayload: Record<string, any> = {};
      if (updatedData.emailAddress !== undefined) {
        djangoPayload.empemail = updatedData.emailAddress;
      }
      if (updatedData.employeedepartment !== undefined) {
        djangoPayload.empdepartment = updatedData.employeedepartment;
      }
      if (updatedData.status !== undefined) {
        djangoPayload.empstatus = updatedData.status;
      }
      if (updatedData.phoneNumber !== undefined) {
        djangoPayload.phoneNumber = updatedData.phoneNumber; // Assuming backend uses phoneNumber
      }

      const response = await employerAPI.updateEmployee(
        `/employees/${updatedData.id}/`,
        djangoPayload,
      );
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update employee",
      );
    }
  },
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
  featureUsage: [],
  isLoading: false,
  isActionLoading: false,
  error: null,
  EmployeeStatusData: {
    id: 0,
    worker_department: "",
    hours_engaged: "",
    recorded_at: "",
    activeEmployees: 0,
    inactiveEmployees: 0,
    totalEmployees: 0,
    activePercentage: 0,
    inactivePercentage: 0,
  },
};

// === Slice ===
const employerSlice = createSlice({
  name: "employer",
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
      .addCase(
        fetchCurrentEmployer.fulfilled,
        (state, action: PayloadAction<EmployerUser>) => {
          state.isLoading = false;
          state.currentEmployer = action.payload;
        },
      )
      .addCase(fetchCurrentEmployer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || null;
      })
      .addCase(fetchEmployeeInvites.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchEmployeeInvites.fulfilled,
        (state, action: PayloadAction<EmployeeInvite[]>) => {
          state.isLoading = false;
          state.invites = action.payload;
        },
      )
      .addCase(fetchEmployeeInvites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || null;
      })
      .addCase(fetchEmployees.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchEmployees.fulfilled,
        (state, action: PayloadAction<Employee[]>) => {
          state.isLoading = false;
          state.employees = action.payload;
        },
      )
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || null;
      })
      .addCase(fetchMoodTrends.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchMoodTrends.fulfilled,
        (state, action: PayloadAction<MoodTrend[]>) => {
          state.isLoading = false;
          state.moodTrends = action.payload;
        },
      )
      .addCase(fetchMoodTrends.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || null;
      })
      .addCase(fetchBillingDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchBillingDetails.fulfilled,
        (state, action: PayloadAction<BillingDetails>) => {
          state.isLoading = false;
          state.billing = action.payload;
        },
      )
      .addCase(fetchBillingDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || null;
      })
      .addCase(fetchEmployerEngagement.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchEmployerEngagement.fulfilled,
        (state, action: PayloadAction<EmployerEngagementData>) => {
          state.isLoading = false;
          state.engagement = action.payload;
        },
      )
      .addCase(fetchEmployerEngagement.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || null;
      })
      .addCase(fetchEmployerReports.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchEmployerReports.fulfilled,
        (state, action: PayloadAction<Report[]>) => {
          state.isLoading = false;
          state.reports = action.payload;
        },
      )
      .addCase(fetchEmployerReports.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || null;
      })
      .addCase(fetchEmployerDashboardSummary.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchEmployerDashboardSummary.fulfilled,
        (state, action: PayloadAction<DashboardSummary>) => {
          state.isLoading = false;
          state.summary = action.payload;
        },
      )
      .addCase(fetchEmployerDashboardSummary.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || null;
      })
      .addCase(fetchDepartmentDistribution.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchDepartmentDistribution.fulfilled,
        (
          state,
          action: PayloadAction<
            Array<{
              departmentName: string;
              workerPercentage: number;
              color: string;
            }>
          >,
        ) => {
          state.isLoading = false;
          state.departmentDistribution = action.payload;
        },
      )
      .addCase(fetchDepartmentDistribution.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || null;
      })
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
        state.error = action.payload || null;
      })
      .addCase(inviteEmployee.pending, (state) => {
        state.isActionLoading = true;
        state.error = null;
      })
      .addCase(
        inviteEmployee.fulfilled,
        (state, action: PayloadAction<EmployeeInvite>) => {
          state.isActionLoading = false;
          state.invites.unshift(action.payload);
        },
      )
      .addCase(inviteEmployee.rejected, (state, action) => {
        state.isActionLoading = false;
        state.error = action.payload || null;
      })
      .addCase(addSubscription.pending, (state) => {
        state.isActionLoading = true;
        state.error = null;
      })
      .addCase(
        addSubscription.fulfilled,
        (state, action: PayloadAction<BillingDetails>) => {
          state.isActionLoading = false;
          state.billing = action.payload;
        },
      )
      .addCase(addSubscription.rejected, (state, action) => {
        state.isActionLoading = false;
        state.error = action.payload || null;
      })

      .addCase(deleteEmployee.pending, (state) => {
        state.isActionLoading = true;
        state.error = null;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.isActionLoading = false;
        state.employees = state.employees.filter(
          (emp) => emp.id !== Number(action.payload),
        );
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.isActionLoading = false;
        state.error = action.payload || null;
      })
      .addCase(toggleEmployeeStatus.pending, (state) => {
        state.isActionLoading = true;
        state.error = null;
      })
      .addCase(toggleEmployeeStatus.fulfilled, (state, action) => {
        state.isActionLoading = false;
        const { id, status } = action.payload;
        const employee = state.employees.find((emp) => emp.id === Number(id));
        if (employee) {
          employee.status = status as Employee["status"];
        }
      })
      .addCase(toggleEmployeeStatus.rejected, (state, action) => {
        state.isActionLoading = false;
        state.error = action.payload || null;
      })
      .addCase(updateEmployee.pending, (state) => {
        state.isActionLoading = true;
      })
      .addCase(
        updateEmployee.fulfilled,
        (state, action: PayloadAction<Employee>) => {
          state.isActionLoading = false;
          // Update the employee in the local state array
          const index = state.employees.findIndex(
            (emp) => emp.id === action.payload.id,
          );
          if (index !== -1) {
            state.employees[index] = action.payload;
          }
        },
      )
      .addCase(updateEmployee.rejected, (state, action) => {
        state.isActionLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchFeatureUsage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeatureUsage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureUsage = action.payload;
      })
      .addCase(fetchFeatureUsage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || null;
      });
  },
});

// === Exports ===
export const { clearEmployerError, clearEmployerStatus } =
  employerSlice.actions;
export default employerSlice.reducer;
