import axios from "axios";

// Server-side authentication interceptor
// This handles 401 responses from the server and redirects to login

export const setupServerAuthInterceptor = () => {
  // Request interceptor to add auth token to all requests
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  // Response interceptor to handle 401 responses
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // Check if this is a 401 authentication error
      if (error.response && error.response.status === 401) {
        console.log("🚫 Server-side authentication failed");

        // Check if this is a frontend route protection
        if (error.response.data?.redirect === "/login") {
          console.log("🔄 Server blocked access - redirecting to login");

          // Clear local auth state
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("refresh");

          // Force redirect to login
          window.location.href = "/login";
          return Promise.reject(error);
        }
      }

      return Promise.reject(error);
    },
  );
};

// Function to check server authentication status
export const checkServerAuth = async () => {
  try {
    const response = await axios.get("/api/auth/check/");
    return response.data.authenticated;
  } catch (error) {
    console.log("Server auth check failed:", error);
    return false;
  }
};
