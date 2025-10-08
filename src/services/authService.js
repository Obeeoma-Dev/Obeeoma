import api from './api';
import axios from 'axios';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
export const authAPI = {
    login: async (credentials) => {
        try {
            const response = await api.post('auth/login/', credentials);
            if (response.data?.access_token) {
                localStorage.setItem(ACCESS_TOKEN, response.data.access_token);
                if (response.data.refresh_token) {
                    localStorage.setItem(REFRESH_TOKEN, response.data.refresh_token);
                }
            }
            return response.data;
        }
        catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                throw error.response.data;
            }
            throw error;
        }
    },
    register: async (userData) => {
        try {
            const response = await api.post('auth/register/', userData);
            return response.data;
        }
        catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                throw error.response.data;
            }
            throw error;
        }
    },
    getCurrentUser: async () => {
        try {
            const response = await api.get('/auth/user');
            return response.data;
        }
        catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                throw error.response.data;
            }
            throw error;
        }
    },
    logout: () => {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        console.log("Logged out and tokens cleared.");
    }
};
