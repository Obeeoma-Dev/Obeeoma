import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Search, Bell, User } from 'lucide-react';
/**
 * Header component displays the top bar with search functionality and user profile
 * Includes notification badge and admin identification
 */
const Header = () => {
    return (
    // Main header container with white background and bottom border
    _jsx("header", { className: "bg-white border-b border-gray-200 px-8 py-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("div", { className: "flex-1 max-w-xl", children: _jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" }), _jsx("input", { type: "text", placeholder: "Search...", className: "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" })] }) }), _jsxs("div", { className: "flex items-center gap-6", children: [_jsxs("button", { className: "relative", children: [_jsx(Bell, { className: "w-6 h-6 text-gray-600 hover:text-gray-900 transition-colors" }), _jsx("span", { className: "absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium", children: "2" })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("div", { className: "text-right", children: [_jsx("div", { className: "text-xs text-gray-500", children: "Dr." }), _jsx("div", { className: "text-sm font-medium text-gray-900", children: "System Admin Comestro" })] }), _jsx("div", { className: "bg-emerald-500 w-10 h-10 rounded-full flex items-center justify-center", children: _jsx(User, { className: "w-6 h-6 text-white" }) })] })] })] }) }));
};
export default Header;
