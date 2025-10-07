import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const Login: React.FC = () => {
  const [role, setRole] = useState<"Client" | "Organization">("Client");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/auth/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const isJson = response.headers.get("content-type")?.includes("application/json");
      const data = isJson ? await response.json() : null;

      if (!response.ok) {
        console.error("Login failed:", response.status, data);
        const message = (data && (data.detail || data.message)) || `Login failed (${response.status})`;
        throw new Error(message);
      }

      // Save token to localStorage (if using JWT)
      if (data?.access) localStorage.setItem("accessToken", data.access);
      if (data?.refresh) localStorage.setItem("refreshToken", data.refresh);

      // Redirect to employee dashboard
      console.debug("Login successful, navigating to /employee-dashboard");
      navigate("/employee-dashboard", { replace: true });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Network error. Please try again.";
      setError(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-8">
          <h2 className="text-2xl font-semibold mb-2">Sign in to your account</h2>
          <p className="text-gray-600 mb-6">Welcome back to Obeeoma</p>

          {error && (
            <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>
          )}

          <form className="space-y-4" onSubmit={handleLogin}>
          <Form.Control
                placeholder="123"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              required
            />

            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={() => setRole("Client")}
                className={`px-4 py-2 rounded-lg ${
                  role === "Client" ? "bg-green-100 text-green-700" : "bg-gray-100"
                }`}
              >
                Employer
              </button>
              <button
                type="button"
                onClick={() => setRole("Organization")}
                className={`px-4 py-2 rounded-lg ${
                  role === "Organization" ? "bg-green-100 text-green-700" : "bg-gray-100"
                }`}
              >
                Employee
              </button>
            </div>

            <div className="flex justify-between items-center">
              <label htmlFor="rememberMe" className="flex items-center space-x-2">
                <input id="rememberMe" type="checkbox" className="rounded" />
                <span>Remember me</span>
              </label>
              <a href="#" className="text-green-600 text-sm hover:underline">
                Forgot your password?
              </a>
            </div>

            <Button
              type="submit"
             variant="primary"
            >
              Sign in
            </Button>

          </form>

          <p className="mt-4 text-center text-gray-600">
            Don’t have an account?{" "}
            <a href="#" className="text-green-600 font-medium hover:underline">
              Create an account
            </a>
          </p>
        </div>

        {/* Right Side */}
        <div className="p-8 bg-green-50">
          <h3 className="text-xl font-semibold mb-4">Welcome Back</h3>
          <p className="text-gray-600 mb-4">
            Sign in to access your personalized mental health dashboard,
            connect with your care team, and continue your wellness journey.
          </p>
          <ul className="space-y-2 text-gray-700">
            <li>✔ Access your care plan</li>
            <li>✔ Schedule appointments</li>
            <li>✔ Message your care team</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;

