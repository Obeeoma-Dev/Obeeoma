import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register: React.FC = () => {
  const [role, setRole] = useState<"Client" | "Organization">("Client");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 bg-white shadow-md rounded-lg overflow-hidden">
        {/* Left Side */}
        <div className="p-8">
          <h2 className="text-2xl font-semibold mb-2">Create your account</h2>
          <p className="text-gray-600 mb-6">
            Join our community of mental health professionals and patients
          </p>

          <form className="space-y-4">
            <input type="text" placeholder="Full Name" className="w-full px-4 py-2 border rounded-lg focus:outline-none" />
            <input type="email" placeholder="Email address" className="w-full px-4 py-2 border rounded-lg focus:outline-none" />
            <input type="password" placeholder="Password" className="w-full px-4 py-2 border rounded-lg focus:outline-none" />
            <input type="password" placeholder="Confirm Password" className="w-full px-4 py-2 border rounded-lg focus:outline-none" />

            <div className="flex items-center space-x-4">
              <span>I am a:</span>
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

            <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
              Create Account
            </button>
          </form>

          <p className="mt-4 text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-green-600 font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>

        {/* Right Side */}
        <div className="p-8 bg-green-50 flex flex-col justify-center">
          <h3 className="text-xl font-semibold mb-4">Begin Your Wellness Journey</h3>
          <p className="text-gray-600 mb-4">
            Creating an account gives you access to personalized mental health resources,
            secure communication with healthcare providers, and tools to track your progress.
          </p>
          <ul className="space-y-2 text-gray-700">
            <li>✔ Personalized care plans</li>
            <li>✔ Secure messaging with providers</li>
            <li>✔ Progress tracking tools</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Register;
