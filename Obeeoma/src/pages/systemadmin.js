import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, } from "recharts";
/**
 * Dummy chart data (Weeks vs Usage)
 */
const chartData = [
    { week: "Week 1", usage: 3000 },
    { week: "Week 2", usage: 3200 },
    { week: "Week 3", usage: 3400 },
    { week: "Week 4", usage: 3600 },
    { week: "Week 5", usage: 3800 },
    { week: "Week 6", usage: 4200 },
];
/**
 * Dashboard Component
 */
const Dashboard = () => {
    return (_jsxs("div", { className: "flex h-screen bg-gray-100", children: [_jsxs("aside", { className: "w-64 bg-white shadow-md flex flex-col", children: [_jsx("div", { className: "flex items-center justify-center h-16 border-b", children: _jsx("h1", { className: "text-xl font-bold text-green-600", children: "Obeooma" }) }), _jsx("nav", { className: "flex-1 p-4", children: _jsx("ul", { className: "space-y-2", children: [
                                "Overview",
                                "Organizations",
                                "Client Engagement",
                                "AI Management",
                                "Hotline Activity",
                                "Subscriptions",
                                "Reports",
                            ].map((item) => (_jsx("li", { children: _jsx("a", { href: "#", className: `flex items-center px-4 py-2 rounded-lg text-sm font-medium ${item === "Overview"
                                        ? "bg-green-50 text-green-600"
                                        : "text-gray-700 hover:bg-gray-100"}`, children: item }) }, item))) }) }), _jsxs("div", { className: "p-4 border-t", children: [_jsx("button", { className: "w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md", children: "Settings" }), _jsx("button", { className: "w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md mt-2", children: "Log out" })] })] }), _jsxs("div", { className: "flex-1 flex flex-col", children: [_jsxs("header", { className: "flex items-center justify-between bg-white px-6 py-4 border-b", children: [_jsx("h2", { className: "text-lg font-semibold", children: "System Adim Dashboard" }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs("button", { className: "relative text-gray-600", children: ["\uD83D\uDD14", _jsx("span", { className: "absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1", children: "2" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "text-gray-700", children: "System Administrator" }), _jsx("div", { className: "w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white", children: "SA" })] })] })] }), _jsxs("main", { className: "p-6 space-y-6 overflow-y-auto", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [_jsxs("div", { className: "bg-white rounded-lg p-4 shadow-sm", children: [_jsx("p", { className: "text-gray-500 text-sm", children: "Total Organizations" }), _jsx("p", { className: "text-2xl font-bold", children: "42" }), _jsx("p", { className: "text-green-500 text-xs", children: "+3 this month" })] }), _jsxs("div", { className: "bg-white rounded-lg p-4 shadow-sm", children: [_jsx("p", { className: "text-gray-500 text-sm", children: "Total Clients" }), _jsx("p", { className: "text-2xl font-bold", children: "1,284" }), _jsx("p", { className: "text-green-500 text-xs", children: "+124 this month" })] }), _jsxs("div", { className: "bg-white rounded-lg p-4 shadow-sm", children: [_jsx("p", { className: "text-gray-500 text-sm", children: "Monthly Revenue" }), _jsx("p", { className: "text-2xl font-bold", children: "$25,800" }), _jsx("p", { className: "text-green-500 text-xs", children: "+5.3% this month" })] }), _jsxs("div", { className: "bg-white rounded-lg p-4 shadow-sm", children: [_jsx("p", { className: "text-gray-500 text-sm", children: "Hotline Calls Today" }), _jsx("p", { className: "text-2xl font-bold", children: "42" }), _jsx("p", { className: "text-red-500 text-xs", children: "+8% vs yesterday" })] })] }), _jsxs("div", { className: "bg-white p-6 rounded-lg shadow-sm", children: [_jsx("h3", { className: "text-gray-700 font-medium mb-4", children: "Weekly Platform Usage" }), _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(LineChart, { data: chartData, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "week" }), _jsx(YAxis, {}), _jsx(Tooltip, {}), _jsx(Line, { type: "monotone", dataKey: "usage", stroke: "#22c55e", strokeWidth: 2, dot: false })] }) })] }), _jsxs("div", { className: "bg-white p-6 rounded-lg shadow-sm", children: [_jsx("h3", { className: "text-gray-700 font-medium mb-4", children: "Recent Activities" }), _jsx("ul", { className: "divide-y divide-gray-200", children: [
                                            {
                                                type: "New Organization",
                                                detail: "Wellness Center Inc. joined the platform",
                                                time: "2 hours ago",
                                            },
                                            {
                                                type: "AI Recommendation",
                                                detail: "New anxiety resource added with 92% effectiveness",
                                                time: "3 hours ago",
                                            },
                                            {
                                                type: "Hotline Activity",
                                                detail: "Spike in call volume (32% increase)",
                                                time: "5 hours ago",
                                            },
                                            {
                                                type: "Patient Engagement",
                                                detail: "Monthly engagement up by 15%",
                                                time: "1 day ago",
                                            },
                                            {
                                                type: "Subscription",
                                                detail: "University Counseling Center upgraded to Premium",
                                                time: "1 day ago",
                                            },
                                        ].map((item, idx) => (_jsxs("li", { className: "py-3 flex justify-between items-center", children: [_jsxs("div", { children: [_jsx("p", { className: "font-medium text-gray-800", children: item.type }), _jsx("p", { className: "text-sm text-gray-500", children: item.detail })] }), _jsx("span", { className: "text-xs text-gray-400", children: item.time })] }, idx))) })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [_jsxs("div", { className: "bg-white p-4 rounded-lg shadow-sm", children: [_jsx("p", { className: "text-sm text-gray-500", children: "Organizations" }), _jsx("p", { className: "text-2xl font-bold", children: "42" }), _jsx("a", { href: "#", className: "text-green-500 text-sm", children: "View all organizations \u2192" })] }), _jsxs("div", { className: "bg-white p-4 rounded-lg shadow-sm", children: [_jsx("p", { className: "text-sm text-gray-500", children: "AI Recommendations" }), _jsx("p", { className: "text-2xl font-bold", children: "1,245" }), _jsx("a", { href: "#", className: "text-green-500 text-sm", children: "View AI analytics \u2192" })] }), _jsxs("div", { className: "bg-white p-4 rounded-lg shadow-sm", children: [_jsx("p", { className: "text-sm text-gray-500", children: "Hotline" }), _jsx("p", { className: "text-2xl font-bold", children: "324" }), _jsx("a", { href: "#", className: "text-green-500 text-sm", children: "View hotline activity \u2192" })] }), _jsxs("div", { className: "bg-white p-4 rounded-lg shadow-sm", children: [_jsx("p", { className: "text-sm text-gray-500", children: "Subscriptions" }), _jsx("p", { className: "text-2xl font-bold", children: "$25.8K" }), _jsx("a", { href: "#", className: "text-green-500 text-sm", children: "View subscription details \u2192" })] })] })] })] })] }));
};
export default Dashboard;
