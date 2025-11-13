import axios from "axios";

// Create an Axios instance with default options
const axiosInstance = axios.create({
  // baseURL was removed because employerAPI.inviteEmployee is a function returning a Promise.
  // If you have a string base URL, replace the next line with: baseURL: "https://api.example.com",
  withCredentials: true,
});

export default axiosInstance;
   // src/api/axiosInstance.ts

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

    export const api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // optional default export
    // export default api;