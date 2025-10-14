// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { employerAPI } from "../../api/apiConfig";
// import axios from "axios";

// const getErrorMessage = (error: unknown): string => {
//   if (axios.isAxiosError(error)) {
//     return (
//       (error.response?.data as { detail?: string; error?: string })?.detail ||
//       (error.response?.data as { detail?: string; error?: string })?.error ||
//       error.message ||
//       "An unknown error occurred"
//     );
//   }
//   if (error instanceof Error) {
//     return error.message;
//   }
//   return "An unexpected error occurred";
// };

// export const fetchEmployerDashboardSummary = createAsyncThunk(
//   "employer/fetchDashboardSummary",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await employerAPI.getDashboardSummary();
//       return response.data;
//     } catch (error: unknown) {
//       return rejectWithValue(getErrorMessage(error));
//     }
//   },
// );

// export const fetchAllJobPosts = createAsyncThunk(
//   "employer/fetchAllJobPosts",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get("/v1/employer/jobs/");
//       return response.data;
//     } catch (error: unknown) {
//       return rejectWithValue(getErrorMessage(error));
//     }
//   },
// );

// export const createJobPost = createAsyncThunk(
//   "employer/createJobPost",
//   async (jobData: any, { rejectWithValue }) => {
//     try {
//       const response = await employerAPI.createJobPost(jobData);
//       return response.data;
//     } catch (error: unknown) {
//       return rejectWithValue(getErrorMessage(error));
//     }
//   },
// );



// const employerSlice = createSlice({
//   name: "employer",
//   initialState,
//   reducers: {
//     clearEmployerError: (state) => {
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchEmployerDashboardSummary.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchEmployerDashboardSummary.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.summary = action.payload;
//         state.error = null;
//       })
//       .addCase(fetchEmployerDashboardSummary.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload as string;
//       })

//       .addCase(fetchAllJobPosts.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchAllJobPosts.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.jobPosts = action.payload;
//         state.error = null;
//       })
//       .addCase(fetchAllJobPosts.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload as string;
//       })

//       .addCase(createJobPost.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(createJobPost.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.jobPosts.push(action.payload);
//         state.error = null;
//       })
//       .addCase(createJobPost.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload as string;
//       })

//       .addCase(fetchApplicantsForJob.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchApplicantsForJob.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.error = null;
//       })
//       .addCase(fetchApplicantsForJob.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export const { clearEmployerError } = employerSlice.actions;
// export default employerSlice.reducer;
