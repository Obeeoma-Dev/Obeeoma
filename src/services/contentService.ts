// services/contentService.ts
// API service for content management operations

import axios from "axios";

// Define the ContentItem type
export interface ContentItem {
  id: number;
  title: string;
  type: "video" | "audio" | "image" | "document";
  status: "published" | "draft" | "processing";
  category?: string;
  date: string;
  size: string;
  file_url?: string;
  description?: string;
}

// API base URL - Use local server for development
const API_BASE_URL = "http://127.0.0.1:8000/api/v1";
// const API_BASE_URL = "https://api-0904.onrender.com/api/v1";

// Create axios instance with interceptors
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for auth if needed
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Content Media API functions
export const contentMediaAPI = {
  // Get all content
  getAllContent: async (): Promise<ContentItem[]> => {
    try {
      // Debug: Check if token exists
      const token = localStorage.getItem("token");
      console.log("Auth token exists:", !!token);
      if (token) {
        console.log("Token preview:", token.substring(0, 20) + "...");
      }

      const response = await apiClient.get("/content/media/");
      console.log("API response:", response.data);

      // Handle both shapes: { data: [...] } or just [...]
      const items = Array.isArray(response.data)
        ? response.data
        : response.data.data;

      return items;
    } catch (error: any) {
      console.error("Error fetching content:", error);

      // Enhanced error logging
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
      } else if (error.request) {
        console.error("Error request:", error.request);
      } else {
        console.error("Error message:", error.message);
      }

      throw error;
    }
  },

  // Create new content/media
  createMedia: async (formData: FormData): Promise<ContentItem> => {
    try {
      const response = await apiClient.post("/content/media/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating media:", error);
      throw error;
    }
  },

  // Get content by ID
  getContentById: async (id: number): Promise<ContentItem> => {
    try {
      const response = await apiClient.get(`/content/media/${id}/`);
      return response.data;
    } catch (error) {
      console.error("Error fetching content by ID:", error);
      throw error;
    }
  },

  // Update content
  updateContent: async (
    id: number,
    data: Partial<ContentItem>,
  ): Promise<ContentItem> => {
    try {
      const response = await apiClient.put(`/content/media/${id}/`, data);
      return response.data;
    } catch (error) {
      console.error("Error updating content:", error);
      throw error;
    }
  },

  // Delete content
  deleteContent: async (id: number): Promise<void> => {
    try {
      await apiClient.delete(`/content/media/${id}/`);
    } catch (error) {
      console.error("Error deleting content:", error);
      throw error;
    }
  },
};

export default contentMediaAPI;
