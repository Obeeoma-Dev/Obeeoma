import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// TODO: Replace with API call to fetch recent activities and default zero data for newly registered companies
// Example: const { data: activities, loading } = useRecentActivities();
<<<<<<< HEAD
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer, } from "recharts";
=======
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, } from "recharts";
>>>>>>> syda
const ChartsSection = ({ chartData }) => {
    const defaultTestsByType = [
        { name: "Previous week ", value: 2 },
        { name: "This week", value: 1 },
    ];
    const defaultTestsByDepartment = [
        { name: "Marketing", value: 25, color: "#3CB371" },
        { name: "HR", value: 25, color: "#60a5fa" },
        { name: "Finance", value: 25, color: "#f59e0b" },
        { name: "Engineering", value: 25, color: "#ef4444" },
    ];
    const testsByType = (chartData?.testsByType || defaultTestsByType).map(item => ({
        ...item,
        value: Math.round(item.value)
    }));
    const testsByDepartment = chartData?.testsByDepartment || defaultTestsByDepartment;
<<<<<<< HEAD
    return (_jsxs("div", { className: "row g-4 mb-4", children: [_jsx("div", { className: "col-12 col-lg-6", children: _jsx("div", { className: "card border-0 shadow-sm", children: _jsxs("div", { className: "card-body", children: [_jsx("h3", { className: "h5 fw-semibold mb-4", style: { fontFamily: "heading" }, children: "Weekly Mood Trends" }), _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(BarChart, { data: testsByType, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", className: "opacity-50", style: { fontFamily: "heading" } }), _jsx(XAxis, { dataKey: "name", style: { fontFamily: "heading" } }), _jsx(YAxis, { allowDecimals: false, tickFormatter: (value) => Math.round(value).toString(), style: { fontFamily: "heading" } }), _jsx(Bar, { dataKey: "value", fill: "#3CB371", radius: [8, 8, 0, 0] })] }) })] }) }) }), _jsx("div", { className: "col-12 col-lg-6", children: _jsx("div", { className: "card border-0 shadow-sm", children: _jsxs("div", { className: "card-body", children: [_jsx("h3", { className: "h5 fw-semibold mb-4", style: { fontFamily: "heading" }, children: "Subscribers by Department" }), _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsx(PieChart, { children: _jsx(Pie, { data: testsByDepartment, cx: "50%", cy: "50%", labelLine: false, label: ({ name, value }) => `${name}: ${value}%`, outerRadius: 80, dataKey: "value", style: { fontFamily: "heading" }, children: testsByDepartment.map((entry, index) => (_jsx(Cell, { fill: entry.color }, `cell-${index}`))) }) }) })] }) }) })] }));
=======
    return (_jsxs("div", { className: "row g-4 mb-4", children: [_jsx("div", { className: "col-12 col-lg-6", children: _jsx("div", { className: "card border-0 shadow-sm", children: _jsxs("div", { className: "card-body", children: [_jsx("h3", { className: "h5 fw-semibold mb-4", style: { fontFamily: "heading" }, children: "Weekly Mood Trends" }), _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(BarChart, { data: testsByType, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", className: "opacity-50", style: { fontFamily: "heading" } }), _jsx(XAxis, { dataKey: "name", style: { fontFamily: "heading" } }), _jsx(YAxis, { allowDecimals: false, tickFormatter: (value) => Math.round(value).toString(), style: { fontFamily: "heading" } }), _jsx(Bar, { dataKey: "value", fill: "#3CB371", radius: [8, 8, 0, 0] })] }) })] }) }) }), _jsx("div", { className: "col-12 col-lg-6", children: _jsx("div", { className: "card border-0 shadow-sm", children: _jsxs("div", { className: "card-body", children: [_jsx("h3", { className: "h5 fw-semibold mb-4", style: { fontFamily: "heading" }, children: "Subscribers by Department" }), _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(PieChart, { children: [_jsx(Pie, { data: testsByDepartment, cx: "50%", cy: "50%", labelLine: false, label: ({ name, value }) => `${name}: ${value}%`, outerRadius: 80, dataKey: "value", style: { fontFamily: "heading" }, children: testsByDepartment.map((entry, index) => (_jsx(Cell, { fill: entry.color }, `cell-${index}`))) }), _jsx(Legend, { wrapperStyle: { fontFamily: "heading", paddingTop: '10px' } })] }) })] }) }) })] }));
>>>>>>> syda
};
export default ChartsSection;
