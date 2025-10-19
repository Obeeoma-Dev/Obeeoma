import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, } from "recharts";
const ChartsSection = () => {
    // TODO: Replace with API call to fetch chart data
    // Example: const { data: chartData, loading } = useChartData();
    const testsByType = [
        { name: "Well-being Check", value: 2 },
        { name: "Burnout Risk", value: 1 },
    ];
    const testsByDepartment = [
        { name: "Marketing", value: 25, color: "#10b981" },
        { name: "HR", value: 25, color: "#60a5fa" },
        { name: "Finance", value: 25, color: "#f59e0b" },
        { name: "Engineering", value: 25, color: "#ef4444" },
    ];
    return (_jsxs("div", { className: "row g-4 mb-4", children: [_jsx("div", { className: "col-12 col-lg-6", children: _jsx("div", { className: "card border-0 shadow-sm", children: _jsxs("div", { className: "card-body", children: [_jsx("h3", { className: "h5 fw-semibold mb-4", children: "Tests by Type" }), _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(BarChart, { data: testsByType, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", className: "opacity-50" }), _jsx(XAxis, { dataKey: "name" }), _jsx(YAxis, {}), _jsx(Bar, { dataKey: "value", fill: "var(--bs-primary)", radius: [8, 8, 0, 0] })] }) })] }) }) }), _jsx("div", { className: "col-12 col-lg-6", children: _jsx("div", { className: "card border-0 shadow-sm", children: _jsxs("div", { className: "card-body", children: [_jsx("h3", { className: "h5 fw-semibold mb-4", children: "Tests by Department" }), _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(PieChart, { children: [_jsx(Pie, { data: testsByDepartment, cx: "50%", cy: "50%", labelLine: false, label: ({ name, value }) => `${name}: ${value}%`, outerRadius: 80, dataKey: "value", children: testsByDepartment.map((entry, index) => (_jsx(Cell, { fill: entry.color }, `cell-${index}`))) }), _jsx(Legend, {})] }) })] }) }) })] }));
};
export default ChartsSection;
