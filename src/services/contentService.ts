// services/contentService.ts
// API service for content management operations

import axios from "axios";

// Define the ContentItem type
export interface ContentItem {
  id: number;
  title: string;
  media_type: "video" | "audio" | "image" | "other";
  status: "published" | "draft" | "processing";
  category?: string;
  created_at: string;
  file_size: string;
  public_url?: string;
  s3_key?: string;
  description?: string;
  duration?: string;
  uploaded: boolean;
  processed: boolean;
  owner: string;
  views: number;
}

// API base URL - Use environment variable for production
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api/v1";
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
    } catch (error: unknown) {
      console.error("Error fetching content:", error);

      // Enhanced error logging with proper type checking
      if (error && typeof error === "object") {
        const err = error as Record<string, unknown>;
        if ("response" in err && err.response) {
          const response = err.response as Record<string, unknown>;
          console.error("Error response data:", response.data);
          console.error("Error response status:", response.status);
          console.error("Error response headers:", response.headers);
        } else if ("request" in err && err.request) {
          console.error("Error request:", err.request);
        } else if ("message" in err && typeof err.message === "string") {
          console.error("Error message:", err.message);
        } else {
          console.error("Unknown error structure:", err);
        }
      } else if (error instanceof Error) {
        console.error("Error message:", error.message);
      } else {
        console.error("Unknown error:", error);
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
