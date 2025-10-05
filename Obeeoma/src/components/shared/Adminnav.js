import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink } from "react-router-dom";
const navItems = [
    { label: "Overview", path: "/system-admin" },
    { label: "Organizations", path: "/system-admin/organizations" },
    { label: "Client Engagement", path: "/system-admin/client-engagement" },
    { label: "AI Management", path: "/system-admin/ai-management" },
    { label: "Hotline Activity", path: "/system-admin/hotline-activity" },
    { label: "Subscriptions", path: "/system-admin/subscriptions" },
    { label: "Reports", path: "/system-admin/reports" },
];
const Adminnav = () => {
    return (_jsxs("aside", { className: "w-64 bg-white shadow-md h-screen p-4", children: [_jsx("h2", { className: "text-xl font-bold mb-6 text-green-600", children: "System Admin" }), _jsx("ul", { className: "space-y-2", children: navItems.map((item) => (_jsx("li", { children: _jsx(NavLink, { to: item.path, className: ({ isActive }) => `block px-4 py-2 rounded-lg text-sm font-medium ${isActive ? "bg-green-50 text-green-700" : "text-gray-700 hover:bg-gray-100"}`, children: item.label }) }, item.path))) })] }));
};
export default Adminnav;
