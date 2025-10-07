import axios from 'axios';

import { LoginCredentials,RegisterCredentials} from '@/types/auth';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
console.log('API Base URL:', API_BASE_URL); // Debug log

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    console.log('🔄 Making API Request:', {
      method: config.method,
      url: config.url,
      data: config.data
    });
    
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    console.error('🚨 Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response Success:', {
      status: response.status,
      data: response.data,
      url: response.config.url
    });
    return response;
  },
  (error) => {
    console.error('🚨 API Response Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
      url: error.config?.url
    });
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: async (credentials: LoginCredentials) => {
    const response = await api.post('/v1/auth/login/', credentials);
    return response;
  },

  register: async (credentials: RegisterCredentials) => {
    const response = await api.post('/api/auth/register/', {
      username: credentials.username,
      email: credentials.email,
      password: credentials.password,
    });
    return response;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};