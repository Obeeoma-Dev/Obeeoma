// import api from './api'; 
// import { AxiosError } from 'axios';
// export interface TokenResponse {
//     access_token: string;
//     refresh_token?: string;
// }
// export interface CurrentUser {
//     id: number;
//     username: string;
//     email: string;
// }
// export interface Credentials {
//     username: string; // or email
//     password: string;
// }
// export interface UserData extends Credentials {
//     first_name?: string;
//     last_name?: string;
// }
// export interface AuthAPI {
//     login: (credentials: Credentials) => Promise<TokenResponse>;
//     register: (userData: UserData) => Promise<any>; 
//     getCurrentUser: () => Promise<CurrentUser>;
//     logout: () => void;
// }
// export const authAPI: AuthAPI = {
//     login: async (credentials: Credentials): Promise<TokenResponse> => {
//         try {
//             const response = await api.post<TokenResponse>('/auth/login', credentials);
//             if (response.data?.access_token) {
//             }
//             return response.data;
//         } catch (error) {
//             const axiosError = error as AxiosError;
//             throw axiosError.response?.data || error;
//         }
//     },
//     register: async (userData: UserData): Promise<any> => {
//         try {
//             const response = await api.post('/auth/register/', userData);
//             return response.data;
//         } catch (error) {
//             const axiosError = error as AxiosError;
//             throw axiosError.response?.data || error;
//         }
//     },
//     getCurrentUser: async (): Promise<CurrentUser> => {
//         try {
//             const response = await api.get<CurrentUser>('/auth/user'); 
//             return response.data;
//         } catch (error) {
//             const axiosError = error as AxiosError;
//             throw axiosError.response?.data || error;
//         }
//     },
//     logout: (): void => {
//         console.log("Logged out. Tokens cleared.");
//     }
// };
import api from './api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
export const authAPI = {
    login: async (credentials) => {
        try {
            const response = await api.post('/auth/login', credentials);
            if (response.data?.access_token) {
                localStorage.setItem(ACCESS_TOKEN, response.data.access_token);
                if (response.data.refresh_token) {
                    localStorage.setItem(REFRESH_TOKEN, response.data.refresh_token);
                }
            }
            return response.data;
        }
        catch (error) {
            const axiosError = error;
            throw axiosError.response?.data || error;
        }
    },
    register: async (userData) => {
        try {
            const response = await api.post('/auth/register/', userData);
            return response.data;
        }
        catch (error) {
            const axiosError = error;
            throw axiosError.response?.data || error;
        }
    },
    getCurrentUser: async () => {
        try {
            const response = await api.get('/auth/user');
            return response.data;
        }
        catch (error) {
            const axiosError = error;
            throw axiosError.response?.data || error;
        }
    },
    logout: () => {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        console.log("Logged out and tokens cleared.");
    }
};
