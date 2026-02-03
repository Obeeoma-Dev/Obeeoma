// Test environment variable loading
console.log('Testing environment variables...');
console.log('VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL);
console.log('All env vars:', import.meta.env);

// Test the API base URL calculation
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://64.225.122.101/api";
console.log('Final API_BASE_URL:', API_BASE_URL);
