import api from "./api";
import axios from "axios";
import type { AxiosError } from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

// Interfaces
export interface TokenResponse {
  access_token: string;
  refresh_token?: string;
}

export interface CurrentUser {
  id: number;
  username: string;
  email: string;
}

export interface Credentials {
  username: string;
  password: string;
}

export interface UserData extends Credentials {
  first_name?: string;
  last_name?: string;
}

export interface ErrorResponse {
  detail?: string;
  message?: string;
  [key: string]: unknown;
}

export interface AuthAPI {
  login: (credentials: Credentials) => Promise<TokenResponse>;
  register: (userData: UserData) => Promise<TokenResponse>;
  getCurrentUser: () => Promise<CurrentUser>;
  logout: () => void;
}

/**
 * Extracts a human-readable error message from an Axios or generic error.
 * Helps standardize error handling across API methods.
 */
function extractErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ErrorResponse>;

    if (axiosError.response?.data) {
      const data = axiosError.response.data;
      return (
        data.detail ||
        data.message ||
        `Request failed with status ${axiosError.response.status}`
      );
    }

    if (axiosError.message) {
      return axiosError.message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred";
}

// Auth API Service Implementation
export const authAPI: AuthAPI = {
  login: async (credentials: Credentials): Promise<TokenResponse> => {
    try {
      const response = await api.post<TokenResponse>(
        "auth/login/",
        credentials,
      );

      if (response.data?.access_token) {
        localStorage.setItem(ACCESS_TOKEN, response.data.access_token);
        if (response.data.refresh_token) {
          localStorage.setItem(REFRESH_TOKEN, response.data.refresh_token);
        }
      }

      return response.data;
    } catch (error: unknown) {
      // ✅ Use the shared error extractor for consistent messaging
      const message = extractErrorMessage(error);
      throw new Error(message);
    }
  },

  register: async (userData: UserData): Promise<TokenResponse> => {
    try {
      const response = await api.post<TokenResponse>(
        "auth/register/",
        userData,
      );
      return response.data;
    } catch (error: unknown) {
      const message = extractErrorMessage(error);
      throw new Error(message);
    }
  },

  getCurrentUser: async (): Promise<CurrentUser> => {
    try {
      const response = await api.get<CurrentUser>("auth/user/");
      return response.data;
    } catch (error: unknown) {
      const message = extractErrorMessage(error);
      throw new Error(message);
    }
  },

  logout: (): void => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    console.log("Logged out and tokens cleared.");
  },
};
