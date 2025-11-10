import axios from "axios";
// Create an Axios instance with default options
const axiosInstance = axios.create({
    // baseURL was removed because employerAPI.inviteEmployee is a function returning a Promise.
    // If you have a string base URL, replace the next line with: baseURL: "https://api.example.com",
    withCredentials: true,
});
export default axiosInstance;
