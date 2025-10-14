import React from "react";

const ResetPassword: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 bg-white shadow-md rounded-lg overflow-hidden">
        {/* Left Side */}
        <div className="p-8">
          <h2 className="text-2xl font-semibold mb-2">Reset Your Password</h2>
          <p className="text-gray-600 mb-6">
            Enter the code and your new password
          </p>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Enter code"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            />
            <input
              type="password"
              placeholder="New password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            />
            <input
              type="password"
              placeholder="Confirm new password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            />

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              Change Password
            </button>
          </form>
        </div>

        {/* Right Side */}
        <div className="p-8 bg-green-50 flex flex-col justify-center">
          <h3 className="text-xl font-semibold mb-4">Secure Your Account</h3>
          <p className="text-gray-600 mb-4">
            Resetting your password ensures your account remains safe. Use a
            strong password that you haven't used before.
          </p>
          <ul className="space-y-2 text-gray-700">
            <li>✔ Protect your sensitive information</li>
            <li>✔ Access your care plan securely</li>
            <li>✔ Continue your wellness journey with peace of mind</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
