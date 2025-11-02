
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  AuthState,
  LoginCredentials,
  RegisterCredentials,
  ForgotPasswordData,
  changePasswordData,
  LoginSuccessPayload, 
} from "./../../types/auth";
import {  authAPI } from "../../api/apiConfig";
import api from "../../api/apiConfig";
import axios, { AxiosError } from "axios";
import { getDashboardRoute } from "../../utils/routing";

const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
 return (
(error.response?.data as { detail?: string })?.detail ||
error.message ||
"An unknown error occurred"
 );
 }
if (error instanceof Error) {
 return error.message;
}
return "An unexpected error occurred";
};

// Login Thunk
export const loginUser = createAsyncThunk<
LoginSuccessPayload,
LoginCredentials, 
{ rejectValue: string } 
>('auth/loginUser', async (credentials, { rejectWithValue }) => {
try {
const response = await authAPI.login(credentials)

return response.data as LoginSuccessPayload; 
 } catch (err) {
const error: AxiosError = err as AxiosError;
let errorMessage = 'Login failed. Please try again.';

if (error.response && error.response.data) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
 errorMessage = (error.response.data as any).detail || 'Invalid credentials.';
 }

return rejectWithValue(errorMessage);
 }
});

// Register Thunk
export const registerUser = createAsyncThunk<
LoginSuccessPayload,
RegisterCredentials, 
{ rejectValue: string }

>(
"auth/signup",
async (credentials, {rejectWithValue},  
) => {
  const dataWithDefaultRole = {
        ...credentials,
        role: credentials.role || 'employer'
  }
try { const response = await authAPI.register(dataWithDefaultRole);
 
  return response.data as LoginSuccessPayload;
} catch (error: unknown) {
return rejectWithValue(getErrorMessage(error));
}
 },
);

// Forgot password Thunk
export const forgotPassword = createAsyncThunk(
"auth/reset-password",
async (
data: ForgotPasswordData & { onSuccess?: () => void },
{ rejectWithValue },
) => {
try {
 const response = await authAPI.forgotPassword(data);
 data.onSuccess?.();
 return response.data;
} catch (error: unknown) {
return rejectWithValue(getErrorMessage(error));
}
 },
);

// Reset password Thunk
export const resetPassword = createAsyncThunk(
 "auth/change-password",
async (
 data: changePasswordData & { onSuccess?: () => void },
 { rejectWithValue },
) => {
try {
const response = await authAPI.changePassword(data);
data.onSuccess?.();
return response.data;
 } catch (error: unknown) {
 return rejectWithValue(getErrorMessage(error));

}
 },
);

export const logoutUserThunk = createAsyncThunk<void,void>(
  "auth/logout",

  async (_, { dispatch}) => {
    try {
      
      await authAPI.logout()

    } catch (error: unknown){
    console.error("Server logout failed, but client session clearing.", getErrorMessage(error));
    }
  finally {
      
      dispatch(logout())
    // localStorage.removeItem("token");
    // localStorage.removeItem("user");
    // localStorage.removeItem("refresh")

    delete api.defaults.headers.common["Authorization"];
    }
  }
);

const getUserFromStorage = () => {
const rawUser = localStorage.getItem("user");
if (!rawUser || rawUser === "undefined") return null;
try {
return JSON.parse(rawUser);
} catch {
 return null;
 }
};

const initialState: AuthState = {
user: getUserFromStorage(),
token: localStorage.getItem("token"),
isLoading: false,
error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthStatus: (state) => { 
      state.isLoading = false;
      state.error = null;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      // Calling the async logout function

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("refresh");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user || action.payload;
        state.token = action.payload.access || action.payload.token;
        state.error = null;

   localStorage.setItem(
 "token",
 action.payload.access || action.payload.token,
);

 localStorage.setItem("user", JSON.stringify(action.payload.user)); 
})
.addCase(loginUser.rejected, (state, action) => {
state.isLoading = false;
state.error = action.payload as string;
 })

// Register
.addCase(registerUser.pending, (state) => {
 state.isLoading = true;
 state.error = null;
})
.addCase(registerUser.fulfilled, (state, action) => {
const userData = action.payload?.user ?? action.payload; 

// Setting user and token
state.user = userData;
state.isLoading = false;
state.user = action.payload?.user;
state.token = action.payload?.access ?? action.payload?.token;
 state.error = null;

localStorage.setItem(
 "token",
 action.payload?.access || action.payload?.token,
 );
 //  storage "user"
localStorage.setItem("user", JSON.stringify(action.payload?.user));
 })
.addCase(registerUser.rejected, (state, action) => {
 state.isLoading = false;
 state.error = action.payload as string;
})


 // Forgot Pasword
 .addCase(forgotPassword.pending, (state) => {
 state.isLoading = true;
 state.error = null;
 })
.addCase(forgotPassword.fulfilled, (state) => {
 state.isLoading = false;
 state.error = null;
})
.addCase(forgotPassword.rejected, (state, action) => {
state.isLoading = false;
 state.error = action.payload as string;})

// Reset Password
.addCase(resetPassword.pending, (state) => {
state.isLoading = true;
state.error = null;
})
.addCase(resetPassword.fulfilled, (state) => {
 state.isLoading = false;
 state.error = null;
 })
.addCase(resetPassword.rejected, (state, action) => {
 state.isLoading = false;
 state.error = action.payload as string;
 })

 //logout thunk
 .addCase(logoutUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUserThunk.fulfilled, (state) => {
        
        state.isLoading = false;
      })
      .addCase(logoutUserThunk.rejected, (state) => {
        state.isLoading = false;
        
      });
 },
});


export const { logout, clearError, clearAuthStatus } = authSlice.actions;

// Selectors  are used for easy access
export const selectUserDashboardRoute = (state: { auth: AuthState }) => {
  return getDashboardRoute(state.auth.user);
};

export const selectIsAuthenticated = (state: { auth: AuthState }) => {
  return !!state.auth.user && !!state.auth.token;
};

export default authSlice.reducer;
