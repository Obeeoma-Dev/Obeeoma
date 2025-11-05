import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend, } from "recharts";
const WellnessTrends = () => {
    // TODO: Replace with API data
    const wellnessTrends = [
        { month: "Jan", wellness: 65, stress: 35, engagement: 70 },
        { month: "Feb", wellness: 68, stress: 32, engagement: 72 },
        { month: "Mar", wellness: 72, stress: 28, engagement: 75 },
        { month: "Apr", wellness: 70, stress: 30, engagement: 73 },
        { month: "May", wellness: 75, stress: 25, engagement: 78 },
        { month: "Jun", wellness: 78, stress: 22, engagement: 80 },
    ];
    return (_jsx("div", { className: "row mb-5", children: _jsx("div", { className: "col-12", children: _jsx("div", { className: "card border-0 shadow-sm", children: _jsxs("div", { className: "card-body p-4", children: [_jsx("h3", { className: "h5 fw-semibold mb-4", children: "Wellness Trends" }), _jsx(ResponsiveContainer, { width: "100%", height: 400, children: _jsxs(LineChart, { data: wellnessTrends, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", className: "opacity-50" }), _jsx(XAxis, { dataKey: "month" }), _jsx(YAxis, {}), _jsx(Tooltip, {}), _jsx(Legend, {}), _jsx(Line, { type: "monotone", dataKey: "wellness", stroke: "#10b981", strokeWidth: 2 }), _jsx(Line, { type: "monotone", dataKey: "stress", stroke: "#ef4444", strokeWidth: 2 }), _jsx(Line, { type: "monotone", dataKey: "engagement", stroke: "#3b82f6", strokeWidth: 2 })] }) })] }) }) }) }));
};
export default WellnessTrends;
