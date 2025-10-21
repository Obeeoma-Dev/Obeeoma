import React from "react";

const ResetPassword: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 bg-white shadow-md rounded-lg overflow-hidden">
        {/* Left Side */}
        <div className="p-8">
          <h2 className="text-2xl font-semibold mb-2">
            Reset Password to Sign in
          </h2>
          <p className="text-gray-600 mb-6">Send code to email</p>

          <form className="space-y-4">
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            />

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              Send me a code
            </button>
          </form>

          <p className="mt-4 text-center text-gray-600">
            Didn’t receive any code?{" "}
            <button className="text-green-600 hover:underline">
              Send code again
            </button>
          </p>
        </div>

        {/* Right Side */}
        <div className="p-8 bg-green-50 flex flex-col justify-center">
          <h3 className="text-xl font-semibold mb-4">Reset & Continue</h3>
          <p className="text-gray-600 mb-4">
            Sign in to access your personalized mental health dashboard, connect
            with your care team, and continue your wellness journey.
          </p>
          <ul className="space-y-2 text-gray-700">
            <li>✔ Access your care plan</li>
            <li>✔ Trigger crisis hotlines</li>
            <li>✔ Get easy assessment through Sana</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
