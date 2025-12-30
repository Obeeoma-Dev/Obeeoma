// services/contentService.ts
// API service for content management operations

import axios from 'axios';

// Define the ContentItem type
export interface ContentItem {
    id: number;
    title: string;
    type: 'video' | 'audio' | 'image' | 'document';
    status: 'published' | 'draft' | 'processing';
    category?: string;
    date: string;
    size: string;
    file_url?: string;
    description?: string;
}

// API base URL
const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';

// Create axios instance with interceptors
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor for auth if needed
apiClient.interceptors.request.use(
    (config) => {
        // Add auth token if available
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Content Media API functions
export const contentMediaAPI = {
    // Get all content
    getAllContent: async (): Promise<ContentItem[]> => {
        try {
            const response = await apiClient.get('/content/');
            return response.data;
        } catch (error) {
            console.error('Error fetching content:', error);
            throw error;
        }
    },

    // Create new content/media
    createMedia: async (formData: FormData): Promise<ContentItem> => {
        try {
            const response = await apiClient.post('/content/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error creating media:', error);
            throw error;
        }
    },

    // Get content by ID
    getContentById: async (id: number): Promise<ContentItem> => {
        try {
            const response = await apiClient.get(`/content/${id}/`);
            return response.data;
        } catch (error) {
            console.error('Error fetching content by ID:', error);
            throw error;
        }
    },

    // Update content
    updateContent: async (id: number, data: Partial<ContentItem>): Promise<ContentItem> => {
        try {
            const response = await apiClient.put(`/content/${id}/`, data);
            return response.data;
        } catch (error) {
            console.error('Error updating content:', error);
            throw error;
        }
    },

    // Delete content
    deleteContent: async (id: number): Promise<void> => {
        try {
            await apiClient.delete(`/content/${id}/`);
        } catch (error) {
            console.error('Error deleting content:', error);
            throw error;
        }
    },
};