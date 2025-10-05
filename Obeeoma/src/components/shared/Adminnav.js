import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/shared/Adminnav.tsx
import { Link, useLocation } from "react-router-dom";
const Adminnav = () => {
    const location = useLocation();
    const navItems = [
        { label: "Overview", path: "/system-admin" },
        { label: "Organizations", path: "/system-admin/organizations" },
        { label: "Client Engagement", path: "/system-admin/client-engagement" },
        { label: "AI Management", path: "/system-admin/ai-management" },
        { label: "Hotline Activity", path: "/system-admin/hotline-activity" },
        { label: "Subscriptions", path: "/system-admin/subscriptions" },
        { label: "Reports", path: "/system-admin/reports" },
    ];
    return (_jsxs("aside", { className: "w-64 bg-base-200 h-screen p-4", children: [_jsx("h2", { className: "text-xl font-bold mb-6", children: "System Admin" }), _jsx("ul", { className: "menu", children: navItems.map((item) => (_jsx("li", { children: _jsx(Link, { to: item.path, className: `${location.pathname === item.path ? "bg-primary text-white" : ""}`, children: item.label }) }, item.path))) })] }));
};
export default Adminnav;
