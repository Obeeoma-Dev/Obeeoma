import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const [role, setRole] = useState<"Client" | "Organization">("Client");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 bg-white shadow-md rounded-lg overflow-hidden">
        {/* Left Side */}
        <div className="p-8">
          <h2 className="text-2xl font-semibold mb-2">Sign in to your account</h2>
          <p className="text-gray-600 mb-6">Welcome back to Obeeoma</p>

          <form className="space-y-4">
            <input type="email" placeholder="Email address" className="w-full px-4 py-2 border rounded-lg focus:outline-none" />
            <input type="password" placeholder="Password" className="w-full px-4 py-2 border rounded-lg focus:outline-none" />

            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={() => setRole("Client")}
                className={`px-4 py-2 rounded-lg ${role === "Client" ? "bg-green-100 text-green-700" : "bg-gray-100"}`}
              >
                Client
              </button>
              <button
                type="button"
                onClick={() => setRole("Organization")}
                className={`px-4 py-2 rounded-lg ${role === "Organization" ? "bg-green-100 text-green-700" : "bg-gray-100"}`}
              >
                Organization
              </button>
            </div>

            <div className="flex justify-between items-center">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span>Remember me</span>
              </label>
              <Link to="/reset-password" className="text-green-600 text-sm hover:underline">
                Forgot your password?
              </Link>
            </div>

            <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
              Sign in
            </button>
          </form>

          <p className="mt-4 text-center text-gray-600">
            Don’t have an account?{" "}
            <Link to="/register" className="text-green-600 font-medium hover:underline">
              Create an account
            </Link>
          </p>
        </div>

        {/* Right Side */}
        <div className="p-8 bg-green-50 flex flex-col justify-center">
          <h3 className="text-xl font-semibold mb-4">Welcome Back</h3>
          <p className="text-gray-600 mb-4">
            Sign in to access your personalized mental health dashboard, connect with your care team,
            and continue your wellness journey.
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
