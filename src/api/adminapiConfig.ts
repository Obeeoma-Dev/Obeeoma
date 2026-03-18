import axios from "axios";

// Create a new axios instance for admin APIs
const adminApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests
adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Admin Dashboard APIs
export const adminDashboardAPI = {
  // Get system admin dashboard overview data
  getDashboardOverview: async () => {
    const response = await adminApi.get("/admin/overview/");
    return response;
  },

  // Get dashboard summary (alias for overview)
  getDashboardSummary: async () => {
    const response = await adminApi.get("/admin/overview/");
    return response;
  },

  // Blog Management APIs (actually using Articles)
  blog: {
    recordView: async (postId: string) => {
      try {
        await adminApi.post(`/articles/${postId}/view/`);
      } catch (error) {
        console.error("Error recording article view:", error);
      }
    },
    recordRead: async (postId: string) => {
      try {
        await adminApi.post(`/articles/${postId}/read/`);
      } catch (error) {
        console.error("Error recording article read:", error);
      }
    },
  },
};

export default adminDashboardAPI;
