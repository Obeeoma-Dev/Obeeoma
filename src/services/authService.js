import api from "./api";
import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
//Shared error extraction helper
function extractErrorMessage(error) {
  if (axios.isAxiosError(error)) {
    const axiosError = error;
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
  // Non-Axios error fallback
  if (error instanceof Error) {
    return error.message;
  }
  return "An unexpected error occurred";
}
// Auth API Service Implementation
export const authAPI = {
  login: async (credentials) => {
    try {
      const response = await api.post("auth/login/", credentials);
      if (response.data?.access_token) {
        localStorage.setItem(ACCESS_TOKEN, response.data.access_token);
        if (response.data.refresh_token) {
          localStorage.setItem(REFRESH_TOKEN, response.data.refresh_token);
        }
      }
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data;
      }
      throw new Error("Login failed");
    }
  },
  register: async (userData) => {
    try {
      const response = await api.post("auth/register/", userData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data;
      }
      throw new Error("Registration failed");
    }
  },
  getCurrentUser: async () => {
    try {
      const response = await api.get("auth/user/");
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data;
      }
      throw new Error("Failed to fetch user");
    }
  },
  logout: () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    console.log("Logged out and tokens cleared.");
  },
};
