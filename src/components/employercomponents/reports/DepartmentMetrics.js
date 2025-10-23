import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend, } from "recharts";
const DepartmentMetrics = () => {
    // TODO: Replace with API data
    const departmentMetrics = [
        { department: "Engineering", wellness: 82, participation: 95, risk: 8 },
        { department: "Marketing", wellness: 75, participation: 88, risk: 15 },
        { department: "HR", wellness: 80, participation: 92, risk: 10 },
        { department: "Finance", wellness: 78, participation: 85, risk: 12 },
        { department: "Sales", wellness: 72, participation: 80, risk: 18 },
    ];
    return (_jsx("div", { className: "row mb-5", children: _jsx("div", { className: "col-12", children: _jsx("div", { className: "card border-0 shadow-sm", children: _jsxs("div", { className: "card-body p-4", children: [_jsx("h3", { className: "h5 fw-semibold mb-4", children: "Department Metrics" }), _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(BarChart, { data: departmentMetrics, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", className: "opacity-50" }), _jsx(XAxis, { dataKey: "department" }), _jsx(YAxis, {}), _jsx(Tooltip, {}), _jsx(Legend, {}), _jsx(Bar, { dataKey: "wellness", fill: "#10b981", name: "Wellness Score" }), _jsx(Bar, { dataKey: "participation", fill: "#3b82f6", name: "Participation %" }), _jsx(Bar, { dataKey: "risk", fill: "#ef4444", name: "Risk %" })] }) })] }) }) }) }));
};
export default DepartmentMetrics;
