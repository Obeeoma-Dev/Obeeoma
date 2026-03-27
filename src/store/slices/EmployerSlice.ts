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
  GaugeData,
} from "../../types/employer";

/**
 * HELPER: Centralized Error Handling
 */

interface MoodDistributionResponse {
  mood_distribution: Array<{ mood: string; count: number; percentage: number }>;
  category_distribution: {
    Positive: number;
    Neutral: number;
    Negative: number;
  };
  total_entries: number;
  total_employees: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mood_categories: any;
}
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
  return error instanceof Error
    ? error.message
    : "An unexpected error occurred";
};

// === ASYNC THUNKS ===

export const fetchCurrentEmployer = createAsyncThunk<
  EmployerUser,
  void,
  { rejectValue: string }
>("employer/fetchCurrentEmployer", async (_, { rejectWithValue }) => {
  try {
    const response = await employerAPI.getCurrentEmployer();
    return response.data as EmployerUser;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const updateCurrentEmployer = createAsyncThunk<
  EmployerUser,
  Record<string, unknown>,
  { rejectValue: string }
>("employer/updateCurrentEmployer", async (data, { rejectWithValue }) => {
  try {
    const response = await employerAPI.updateCurrentEmployer(data);
    return response.data as EmployerUser;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const inviteEmployee = createAsyncThunk<
  EmployeeInvite,
  { email: string; phone?: string; department: string } & {
    onSuccess?: () => void;
  },
  { rejectValue: string }
>("employer/inviteEmployee", async (employeeData, { rejectWithValue }) => {
  try {
    const response = await employerAPI.inviteEmployee(employeeData);
    employeeData.onSuccess?.();
    return response.data as EmployeeInvite;
  } catch (error) {
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
      await employerAPI.updateEmployee(id, {
        empstatus: newStatus,
        status: newStatus,
      } as Partial<Employee>);
      return { id, status: newStatus };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

// export const deleteEmployee = createAsyncThunk<Employee[], string, { rejectValue: string }>(
//   "employer/deleteEmployee",
//   async (employeeId, { rejectWithValue }) => {
//     try {
//       const response = await employerAPI.deleteEmployee(employeeId);
//       return response.data as Employee[];
//     } catch (error) {
//       return rejectWithValue(getErrorMessage(error));
//     }
//   }
// );

export const deleteEmployee = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("employer/deleteEmployee", async (employeeId, { rejectWithValue }) => {
  try {
    console.log("Calling deleteEmployee API with ID:", employeeId);
    const response = await employerAPI.deleteEmployee(employeeId);
    console.log("Delete API response:", response);
    return employeeId;
  } catch (error: unknown) {
    console.error("Delete API error:", error);
    return rejectWithValue(getErrorMessage(error));
  }
});

export const fetchEmployeeInvites = createAsyncThunk<
  EmployeeInvite[],
  void,
  { rejectValue: string }
>("employer/fetchInvites", async (_, { rejectWithValue }) => {
  try {
    const response = await employerAPI.viewInviteEmployee();
    return response.data as EmployeeInvite[];
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

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
    return backendData.map((employee: any) => ({
      id: employee.id,
      emailAddress: employee.email || employee.empemail || "N/A",
      employeedepartment: employee.employeedepartment || "N/A",
      phoneNumber: employee.phone || "",
      status: employee.empstatus
        ? (employee.empstatus.toLowerCase() as Employee["status"])
        : "active",
    }));
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
  } catch (error) {
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
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const fetchEmployerEngagement = createAsyncThunk<
  EmployerEngagementData,
  void,
  { rejectValue: string }
>("employer/fetchEngagement", async (_, { rejectWithValue }) => {
  try {
    const response = await employerAPI.getEngagement?.();
    return response?.data as EmployerEngagementData;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const downloadReport = createAsyncThunk<
  void,
  { url: string; fileName: string; method?: 'GET' | 'POST' },
  { rejectValue: string }
>("employer/downloadReport", async ({ url, fileName, method = 'GET' }, { rejectWithValue }) => {
  try {
    const blob = await employerAPI.getReportBlob(url, method);
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
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
  } catch (error) {
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
  } catch (error) {
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
    return response.data;
  } catch (error) {
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
    return (response.data || []).map((item: any) => ({
      date: item.date || "",
      avg_score: item.score ?? item.avg_score ?? 0,
      mood_counts: item.mood_counts ?? {},
    }));
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const fetchMoodTrends = createAsyncThunk<
  MoodTrend[],
  void,
  { rejectValue: string }
>("employer/fetchMoodTrends", async (_, { rejectWithValue }) => {
  try {
    const response = await employerAPI.getMoodTrends();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (response.data || []).map((pt: any) => ({
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return rejectWithValue(getErrorMessage(err));
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
    const active = parseInt(data.activeEmployees) || 0;
    const inactive = parseInt(data.inactiveEmployees) || 0;
    const total = active + inactive;
    return {
      ...data,
      activeEmployees: active,
      inactiveEmployees: inactive,
      totalEmployees: total,
      activePercentage: total > 0 ? Math.round((active / total) * 100) : 0,
      inactivePercentage: total > 0 ? Math.round((inactive / total) * 100) : 0,
    };
  } catch (error) {
    return rejectWithValue("Failed to fetch status");
  }
});

/**
 * MOOD DISTRIBUTION FETCH: Integrated backend call
 */
// export const fetchEmployeeMoodDistribution = createAsyncThunk<
//   Array<{ mood: string; count: number }>,
//   void,
//   { rejectValue: string }
// >("employer/fetchEmployeeMoodDistribution", async (_, { rejectWithValue }) => {
//   try {
//     const response = await employerAPI.getEmployeeMoodDistribution();
//     const rawData = response.data?.results || response.data;
//     return Array.isArray(rawData) ? rawData : [];
//   } catch (error: any) {
//     return rejectWithValue(getErrorMessage(error));
//   }
// });
export const fetchEmployeeMoodDistribution = createAsyncThunk<
  MoodDistributionResponse, // The return type
  void, // Arguments
  { rejectValue: string } // Error type
>("employer/fetchEmployeeMoodDistribution", async (_, { rejectWithValue }) => {
  try {
    const response = await employerAPI.getEmployeeMoodDistribution();
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const fetchGeneralMood = createAsyncThunk<
  GaugeData, // Changed return type to the full object
  void,
  { rejectValue: string }
>("employer/fetchGeneralMood", async (_, { rejectWithValue }) => {
  try {
    // Calling the new /api/company-mood/gauge-chart/ endpoint
    const response = await employerAPI.getGaugeChart();
    const data = response.data;

    return {
      moodLabel: data.mood_label || "Ecstatic", // Calculated by Django
      needleAngle: data.needle_angle, // Calculated by Django
      totalEntries: data.total_entries,
      score: data.score,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.error || "Failed to fetch mood",
    );
  }
});
export const updateEmployee = createAsyncThunk<
  Employee,
  Partial<Employee> & { id: number | string },
  { rejectValue: string }
>("employer/updateEmployee", async (updatedData, { rejectWithValue }) => {
  try {
    const id = updatedData.id;
    // Map fields to match Django backend expectations
    const payload: Record<string, unknown> = {};
    if (updatedData.emailAddress !== undefined) payload.email = updatedData.emailAddress;
    if (updatedData.employeedepartment !== undefined) payload.department = updatedData.employeedepartment;
    if (updatedData.status !== undefined) payload.status = updatedData.status;
    if (updatedData.phoneNumber !== undefined) payload.phone = updatedData.phoneNumber;

    // Let's provide BOTH standard and `emp`-prefixed keys to be safe with Django serialization
    if (updatedData.emailAddress !== undefined) payload.empemail = updatedData.emailAddress;
    if (updatedData.employeedepartment !== undefined) payload.empdepartment = updatedData.employeedepartment;
    if (updatedData.employeedepartment !== undefined) payload.employeedepartment = updatedData.employeedepartment;
    if (updatedData.status !== undefined) payload.empstatus = updatedData.status;

    // Call the API
    const response = await employerAPI.updateEmployee(id, payload);

    // Ensure we send back an object matching the internal Employee shape
    // so the Redux .fulfilled handler can seamlessly update the table.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const responseData = response as any;
    const finalEmployee: Employee = {
      id: Number(id),
      emailAddress: responseData.email || payload.email || updatedData.emailAddress || "",
      employeedepartment: responseData.department || payload.department || updatedData.employeedepartment || "",
      phoneNumber: responseData.phone || payload.phone || updatedData.phoneNumber || "",
      status: responseData.status || payload.status || updatedData.status || "active",
    };

    return finalEmployee;
  } catch (error: unknown) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// export const updateEmployee = createAsyncThunk<Employee, Partial<Employee> & { id: number | string }, { rejectValue: string }>(
//   "employer/updateEmployee",
//   async (updatedData, { rejectWithValue }) => {
//     try {
//       const djangoPayload: Record<string, any> = {};
//       if (updatedData.emailAddress !== undefined) djangoPayload.empemail = updatedData.emailAddress;
//       if (updatedData.employeedepartment !== undefined) djangoPayload.empdepartment = updatedData.employeedepartment;
//       if (updatedData.status !== undefined) djangoPayload.empstatus = updatedData.status;
//       if (updatedData.phoneNumber !== undefined) djangoPayload.phoneNumber = updatedData.phoneNumber;

//       const response = await employerAPI.updateEmployee(`/employees/${updatedData.id}/`, djangoPayload);
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(getErrorMessage(error));
//     }
//   }
// )

// --- INITIAL STATE ---
const initialState: EmployerState = {
  currentEmployer: null,
  invites: [],
  employees: [],
  billing: null,
  departmentDistribution: [],
  wellnessTrend: [],
  moodTrends: [],
  employeeMoodDistribution: [],
  // Add these so you can show total counts on the dashboard!
  totalEntries: 0,
  categoryData: { Positive: 0, Neutral: 0, Negative: 0 },
  status: "idle",
  error: null,
  generalMood: "Ecstatic",
  gaugeDetails: {
    moodLabel: "Ecstatic",
    needleAngle: 168,
    totalEntries: 0,
    score: 900,
  } as GaugeData,
  subscription: null,
  engagement: null,
  reports: [],
  summary: null,
  isLoading: false,
  isActionLoading: false,
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

// === SLICE ===
const employerSlice = createSlice({
  name: "employer",
  initialState,
  reducers: {
    clearEmployerError: (state) => {
      state.error = null;
    },
    clearEmployerStatus: (state) => {
      state.isLoading = false;
      state.isActionLoading = false;
      state.error = null;
      state.status = "idle";
    },
    /**
     * Set the general mood directly
     */
    setGeneralMood: (state, action: PayloadAction<string>) => {
      state.generalMood = action.payload;
    },
    /**
     * Updates specific mood count in real-time
     */
    updateMoodCount: (
      state,
      action: PayloadAction<{ mood: string; count: number }>,
    ) => {
      const { mood, count } = action.payload;
      const index = state.employeeMoodDistribution.findIndex(
        (item) => item.mood.toLowerCase() === mood.toLowerCase(),
      );

      if (index !== -1) {
        state.employeeMoodDistribution[index] = {
          ...state.employeeMoodDistribution[index],
          count: count,
        };
      } else {
        state.employeeMoodDistribution.push({ mood, count });
      }
    },

    updateEmployeeLocal: (
      state,
      action: PayloadAction<Partial<Employee> & { id: number }>,
    ) => {
      const idx = state.employees.findIndex((e) => e.id === action.payload.id);
      if (idx >= 0) {
        state.employees[idx] = {
          ...state.employees[idx],
          ...(action.payload as Record<string, unknown>),
        };
      } else {
        // push as new if not found
        state.employees.push(action.payload as Employee);
      }
    },
    deleteEmployeeLocal: (state, action: PayloadAction<number | string>) => {
      state.employees = state.employees.filter(
        (e) => e.id !== Number(action.payload),
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // Current Employer
      .addCase(fetchCurrentEmployer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentEmployer = action.payload;
      })
      .addCase(updateCurrentEmployer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentEmployer = action.payload;
      })
      // Invites
      .addCase(fetchEmployeeInvites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.invites = action.payload;
      })
      // Employees
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.isLoading = false;
        state.employees = action.payload;
      })
      // Department Distribution
      .addCase(fetchDepartmentDistribution.fulfilled, (state, action) => {
        state.isLoading = false;
        state.departmentDistribution = action.payload;
      })
      // Wellness Trend
      .addCase(fetchWellnessTrend.fulfilled, (state, action) => {
        state.isLoading = false;
        state.wellnessTrend = action.payload;
      })
      // Mood Trends
      .addCase(fetchMoodTrends.fulfilled, (state, action) => {
        state.isLoading = false;
        state.moodTrends = action.payload;
      })
      // Dashboard Summary
      .addCase(fetchEmployerDashboardSummary.fulfilled, (state, action) => {
        state.isLoading = false;
        state.summary = action.payload;
      })
      // Employee Status Data
      .addCase(fetchEmployeeStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.EmployeeStatusData = action.payload;
      })

      // --- MOOD DISTRIBUTION FETCH HANDLERS ---
      .addCase(fetchEmployeeMoodDistribution.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEmployeeMoodDistribution.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Match the keys from your Django 'return Response({...})'
        state.employeeMoodDistribution = action.payload.mood_distribution;
        state.totalEntries = action.payload.total_entries;
        state.categoryData = action.payload.category_distribution;
      })
      .addCase(fetchEmployeeMoodDistribution.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Sync Error";
      })

      // --- GENERAL MOOD FETCH HANDLERS ---

      .addCase(fetchGeneralMood.fulfilled, (state, action) => {
        state.isLoading = false;
        state.generalMood = action.payload.moodLabel;
        state.gaugeDetails = action.payload;
      })
      // .addCase(fetchGeneralMood.pending, (state) => {
      //   state.isLoading = true;
      //   state.error = null;
      // })
      // .addCase(fetchGeneralMood.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.error = action.payload || "Failed to fetch general mood";
      // })

      // Delete Employee
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.isActionLoading = false;
        state.employees = Array.isArray(action.payload)
          ? action.payload
          : state.employees;
      })
      // Update Employee
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.isActionLoading = false;
        const index = state.employees.findIndex(
          (emp) => emp.id === action.payload.id,
        );
        if (index !== -1) state.employees[index] = action.payload;
      })
      // Toggle Employee Status
      .addCase(toggleEmployeeStatus.fulfilled, (state, action) => {
        state.isActionLoading = false;
        const employee = state.employees.find(
          (emp) => emp.id === Number(action.payload.id),
        );
        if (employee)
          employee.status = action.payload.status as Employee["status"];
      });
  },
});

export const {
  updateEmployeeLocal: updateEmployeeLocalAction,
  deleteEmployeeLocal: deleteEmployeeLocalAction,
} = employerSlice.actions;

export {
  updateEmployeeLocalAction as updateEmployeeLocal,
  deleteEmployeeLocalAction as deleteEmployeeLocal,
};

export const {
  clearEmployerError,
  clearEmployerStatus,
  updateMoodCount,
  setGeneralMood,
} = employerSlice.actions;
export default employerSlice.reducer;
