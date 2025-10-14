import React, { useState } from "react";

// ResetPasswordSignIn.tsx
// A responsive React + TypeScript reset password sign-in component with Tailwind CSS.

export default function ResetPasswordSignIn(): React.FC | JSX.Element {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  function validate() {
    if (!email.trim()) {
      setError("Please enter your email address.");
      return false;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    setError(null);
    return true;
  }

  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    if (!validate()) return;

    // Replace this with a real send-code API call
    setSuccess("A reset code has been sent to your email (mock).");
    setTimeout(() => setSuccess(null), 3000);
  }

  function handleResend() {
    if (!validate()) return;
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
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path
                  d="M3 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8-8-3.582-8-8z"
                  stroke="#10B981"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 12l2.5 2L16 9"
                  stroke="#065F46"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="font-semibold text-lg">Obeeoma</span>
          </div>
        </header>

        <main className="p-6 md:p-8">
          <h1 className="text-2xl font-semibold">Reset your password</h1>
          <p className="text-sm text-gray-500 mt-2">
            Enter your email to receive a reset code.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">
                Email address
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:ring-green-400 focus:border-green-400"
                placeholder="Enter your email"
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
                Send me a code
              </button>
            </div>

            <p className="text-center text-sm text-gray-600">
              Did you receive any code?{" "}
              <button
                type="button"
                onClick={handleResend}
                className="text-green-600 underline"
              >
                Send code again
              </button>
            </p>
          </form>
        </main>
      </div>
    </div>
  );
}
