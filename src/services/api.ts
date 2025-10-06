// import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
// import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants'; 

// // Debug line
// console.log('VITE_API_BASE_URL value:', import.meta.env.VITE_API_BASE_URL);

// interface LoginResponse {
//     access_token: string;
//     refresh_token?: string;
//     [key: string]: any; 
// }

// const api = axios.create({
//     baseURL: import.meta.env.VITE_API_BASE_URL
// });

// api.interceptors.request.use(
//     (config: InternalAxiosRequestConfig) => {
//         const token = localStorage.getItem(ACCESS_TOKEN);
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`; // Fixed: added backticks
//         }
//         return config;
//     },
//     (error: AxiosError) => {
//         return Promise.reject(error);
//     }
// );

// export const login = async (credentials: object): Promise<LoginResponse> => {
//     try {
//         const response = await api.post<LoginResponse>('/auth/login', credentials);
        
//         if (response.data?.access_token) {
//             localStorage.setItem(ACCESS_TOKEN, response.data.access_token);
//             if (response.data.refresh_token) {
//                 localStorage.setItem(REFRESH_TOKEN, response.data.refresh_token);
//             }
//         }
    
//         return response.data;
//     } catch (error) {
//         const axiosError = error as AxiosError;
//         throw axiosError.response?.data || error;
//     }
// };

// export default api;
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { ACCESS_TOKEN } from '../constants';

// Create the Axios instance with the base URL
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Use an interceptor to add the token to every request
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

export default api;