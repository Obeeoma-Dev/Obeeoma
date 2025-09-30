import React, { useState } from "react";

// CreateAccount.tsx
// A responsive, accessible React + TypeScript component styled with Tailwind CSS.
// Drop this file into a React project (Vite / CRA) with Tailwind configured.

type Role = "client" | "organization";

export default function CreateAccount(): JSX.Element {
  const [role, setRole] = useState<Role>("client");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  function validate() {
    if (!fullName.trim() || !email.trim() || !password) {
      setError("Please complete all required fields.");
      return false;
    }
    // simple email check
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    setError(null);
    return true;
  }

  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    if (!validate()) return;

    // Replace this with real API call
    setSuccess("Account created successfully — (mock). Redirecting to dashboard...");
    setTimeout(() => {
      setSuccess(null);
    }, 3000);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md overflow-hidden">
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

          <div>
            <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300">
              Login
            </button>
          </div>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Form */}
          <section className="p-6 md:p-8">
            <h1 className="text-2xl font-semibold">Create your account</h1>
            <p className="text-sm text-gray-500 mt-2">Join our community of mental health professionals and patients</p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <label className="block">
                <span className="text-sm font-medium text-gray-700">Full Name</span>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:ring-green-400 focus:border-green-400"
                  placeholder="Full Name"
                  required
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-gray-700">Email address</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:ring-green-400 focus:border-green-400"
                  placeholder="Email address"
                  required
                />
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-sm font-medium text-gray-700">Password</span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:ring-green-400 focus:border-green-400"
                    placeholder="Password"
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
                    placeholder="Confirm Password"
                    required
                  />
                </label>
              </div>

              <div className="mt-2">
                <span className="text-sm font-medium text-gray-700">I am a:</span>
                <div className="mt-2 inline-flex rounded-md bg-green-50 p-1">
                  <button
                    type="button"
                    onClick={() => setRole("client")}
                    aria-pressed={role === "client"}
                    className={`px-4 py-2 rounded-md text-sm font-medium focus:outline-none ${
                      role === "client" ? "bg-white shadow" : "text-gray-600"
                    }`}
                  >
                    Client
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole("organization")}
                    aria-pressed={role === "organization"}
                    className={`px-4 py-2 rounded-md text-sm font-medium focus:outline-none ${
                      role === "organization" ? "bg-white shadow" : "text-gray-600"
                    }`}
                  >
                    Organization
                  </button>
                </div>
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}
              {success && <p className="text-sm text-green-600">{success}</p>}

              <div>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full inline-flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                >
                  Create Account
                </button>
              </div>

              <p className="text-center text-sm text-gray-600">
                Already have an account? <a href="#" className="text-green-600 underline">Sign in</a>
              </p>
            </form>
          </section>

          {/* Right: Info / features */}
          <aside className="p-6 md:p-8 bg-gradient-to-b from-green-50 to-white">
            <div className="rounded-lg p-4">
              <p className="text-sm text-gray-700">Sign up to access your personalized mental health dashboard, connect with your care team, and continue your wellness journey.</p>

              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 mt-1">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <path d="M20 6L9 17l-5-5" stroke="#065F46" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Access your care plan</p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 mt-1">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <path d="M20 6L9 17l-5-5" stroke="#065F46" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Schedule appointments</p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 mt-1">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <path d="M20 6L9 17l-5-5" stroke="#065F46" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Message your care team</p>
                  </div>
                </li>
              </ul>
            </div>

            <footer className="mt-6 text-xs text-gray-400">By creating an account you agree to our Terms of Service and Privacy Policy.</footer>
          </aside>
        </main>
      </div>
    </div>
  );
}
