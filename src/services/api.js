import axios from "axios";
import { store } from "../store/store"; // 👈 adjust path if your store is elsewhere
import { logout } from "../store/slices/authSlice";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
// Create base Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://gf.onrender.com/api/",
  headers: {
    "Content-Type": "application/json",
  },
});
// --- Helper: Refresh access token ---
async function refreshAccessToken() {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);
  if (!refreshToken) return null;
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL || "https://gf.onrender.com/api/"}auth/token/refresh/`,
      { refresh: refreshToken },
    );
    const newAccessToken = response.data.access_token;
    if (newAccessToken) {
      localStorage.setItem(ACCESS_TOKEN, newAccessToken);
      return newAccessToken;
    }
    return null;
  } catch (error) {
    console.error("Token refresh failed:", error);
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    return null;
  }
}
// --- Request Interceptor ---
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
// --- Response Interceptor: Auto-refresh + Redux logout ---
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // Token expired? Try refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      }
      // Refresh failed → dispatch logout
      store.dispatch(logout());
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);
export default api;
