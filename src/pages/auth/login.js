import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
const Login = () => {
    const [role, setRole] = useState("Client");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleLogin = async (e) => {
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
            if (data?.access)
                localStorage.setItem("accessToken", data.access);
            if (data?.refresh)
                localStorage.setItem("refreshToken", data.refresh);
            // Redirect to employee dashboard
            console.debug("Login successful, navigating to /employee-dashboard");
            navigate("/employee-dashboard", { replace: true });
        }
        catch (err) {
            const message = err instanceof Error ? err.message : "Network error. Please try again.";
            setError(message);
        }
    };
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-50", children: _jsxs("div", { className: "max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 bg-white shadow-md rounded-lg overflow-hidden", children: [_jsxs("div", { className: "p-8", children: [_jsx("h2", { className: "text-2xl font-semibold mb-2", children: "Sign in to your account" }), _jsx("p", { className: "text-gray-600 mb-6", children: "Welcome back to Obeeoma" }), error && (_jsx("div", { className: "bg-red-100 text-red-700 p-2 rounded mb-4", children: error })), _jsxs("form", { className: "space-y-4", onSubmit: handleLogin, children: [_jsx(Form.Control, { placeholder: "123", "aria-label": "Username", "aria-describedby": "basic-addon1" }), _jsx("input", { id: "password", type: "password", placeholder: "Password", value: password, onChange: (e) => setPassword(e.target.value), className: "w-full px-4 py-2 border rounded-lg focus:outline-none", required: true }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("button", { type: "button", onClick: () => setRole("Client"), className: `px-4 py-2 rounded-lg ${role === "Client" ? "bg-green-100 text-green-700" : "bg-gray-100"}`, children: "Employer" }), _jsx("button", { type: "button", onClick: () => setRole("Organization"), className: `px-4 py-2 rounded-lg ${role === "Organization" ? "bg-green-100 text-green-700" : "bg-gray-100"}`, children: "Employee" })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("label", { htmlFor: "rememberMe", className: "flex items-center space-x-2", children: [_jsx("input", { id: "rememberMe", type: "checkbox", className: "rounded" }), _jsx("span", { children: "Remember me" })] }), _jsx("a", { href: "#", className: "text-green-600 text-sm hover:underline", children: "Forgot your password?" })] }), _jsx(Button, { type: "submit", variant: "primary", children: "Sign in" })] }), _jsxs("p", { className: "mt-4 text-center text-gray-600", children: ["Don\u2019t have an account?", " ", _jsx("a", { href: "#", className: "text-green-600 font-medium hover:underline", children: "Create an account" })] })] }), _jsxs("div", { className: "p-8 bg-green-50", children: [_jsx("h3", { className: "text-xl font-semibold mb-4", children: "Welcome Back" }), _jsx("p", { className: "text-gray-600 mb-4", children: "Sign in to access your personalized mental health dashboard, connect with your care team, and continue your wellness journey." }), _jsxs("ul", { className: "space-y-2 text-gray-700", children: [_jsx("li", { children: "\u2714 Access your care plan" }), _jsx("li", { children: "\u2714 Schedule appointments" }), _jsx("li", { children: "\u2714 Message your care team" })] })] })] }) }));
};
export default Login;
