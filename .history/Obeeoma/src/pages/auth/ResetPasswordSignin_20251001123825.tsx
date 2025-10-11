import React, { useState } from "react";

// ResetPassword.tsx
// A responsive React + TypeScript reset password component with  CSS.

export default function ResetPassword() {
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  function validate() {
    if (!code.trim() || !newPassword || !confirmPassword) {
      setError("Please complete all required fields.");
      return false;
    }
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return false;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    setError(null);
    return true;
  }

  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    if (!validate()) return;

    // Replace with real API call for password reset
    setSuccess("Your password has been changed successfully (mock).");
    setTimeout(() => setSuccess(null), 3000);
  }

  function handleResend() {
    setSuccess("A new code has been sent to your email (mock).");
    setTimeout(() => setSuccess(null), 3000);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md overflow-hidden">
        <header className="flex items-center justify-between px-6 py-4 border-b">
          <div className="flex items-center gap-3">
            {/* Logo placeholder */}
            <div className="w-10 h-10 rounded-md bg-green-100 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M3 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8-8-3.582-8-8z" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 12l2.5 2L16 9" stroke="#065F46" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="font-semibold text-lg">Obeeoma</span>
          </div>
        </header>

        <main className="p-6 md:p-8">
          <h1 className="text-2xl font-semibold">Reset your password</h1>
          <p className="text-sm text-gray-500 mt-2">Enter the code you received and choose a new password.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Code</span>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:ring-green-400 focus:border-green-400"
                placeholder="Enter the code"
                required
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700">New Password</span>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:ring-green-400 focus:border-green-400"
                placeholder="Enter new password"
                required
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700">Confirm Password</span>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:ring-green-400 focus:border-green-400"
                placeholder="Confirm new password"
                required
              />
            </label>

            {error && <p className="text-sm text-red-600">{error}</p>}
            {success && <p className="text-sm text-green-600">{success}</p>}

            <div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full inline-flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                Change Password
              </button>
            </div>

            <p className="text-center text-sm text-gray-600">
              Did you receive any code? {" "}
              <button type="button" onClick={handleResend} className="text-green-600 underline">
                Send code again
              </button>
            </p>
          </form>
        </main>
      </div>
    </div>
  );
}
