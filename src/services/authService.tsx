// import api from "./api";
// import axios, { AxiosError } from "axios";
// import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

// // Interfaces
// export interface TokenResponse {
//   access_token: string;
//   refresh_token?: string;
// }

// export interface CurrentUser {
//   id: number;
//   username: string;
//   email: string;
// }

// export interface Credentials {
//   username: string;
//   password: string;
// }

// export interface UserData extends Credentials {
//   first_name?: string;
//   last_name?: string;
// }

// export interface ErrorResponse {
//   detail?: string;
//   message?: string;
//   [key: string]: unknown;
// }

// export interface AuthAPI {
//   login: (credentials: Credentials) => Promise<TokenResponse>;
//   register: (userData: UserData) => Promise<TokenResponse>;
//   getCurrentUser: () => Promise<CurrentUser>;
//   logout: () => void;
// }

// export const authAPI: AuthAPI = {
//   login: async (credentials: Credentials): Promise<TokenResponse> => {
//     try {
//       const response = await api.post<TokenResponse>(
//         "auth/login/",
//         credentials,
//       );

//       if (response.data?.access_token) {
//         localStorage.setItem(ACCESS_TOKEN, response.data.access_token);
//         if (response.data.refresh_token) {
//           localStorage.setItem(REFRESH_TOKEN, response.data.refresh_token);
//         }
//       }
//       return response.data;
//     } catch (error: unknown) {
//       if (axios.isAxiosError(error) && AxiosError.response) {
//         throw AxiosError.response.data as ErrorResponse;
//       }
//       throw new Error("Login failed");
//     }
//   },

//   register: async (userData: UserData): Promise<TokenResponse> => {
//     try {
//       const response = await api.post<TokenResponse>(
//         "auth/register/",
//         userData,
//       );
//       return response.data;
//     } catch (error: unknown) {
//       if (axios.isAxiosError(error) && AxiosError.response) {
//         throw AxiosError.response.data as ErrorResponse;
//       }
//       throw new Error("Registration failed");
//     }
//   },

//   getCurrentUser: async (): Promise<CurrentUser> => {
//     try {
//       const response = await api.get<CurrentUser>("auth/user/");
//       return response.data;
//     } catch (error: unknown) {
//       if (axios.isAxiosError(error) && AxiosError.response) {
//         throw AxiosError.response.data as ErrorResponse;
//       }
//       throw new Error("Failed to fetch user");
//     }
//   },

//   logout: (): void => {
//     localStorage.removeItem(ACCESS_TOKEN);
//     localStorage.removeItem(REFRESH_TOKEN);
//     console.log("Logged out and tokens cleared.");
//   },
// };
