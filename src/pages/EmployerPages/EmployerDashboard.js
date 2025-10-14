import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Users, FileCheck, TrendingUp, AlertTriangle, LayoutDashboard, Users as UsersIcon, CreditCard, Settings, Search, Bell, Menu, X, } from "lucide-react";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, } from "recharts";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const statsData = [
        {
            title: "Total Employees",
            value: "4",
            description: "Active employees in the system",
            icon: Users,
            iconBg: "var(--obeeoma-primary)",
        },
        {
            title: "Total Tests",
            value: "6",
            description: "Tests completed",
            icon: FileCheck,
            iconBg: "#3b82f6",
        },
        {
            title: "Average Score",
            value: "61%",
            description: "Average wellness score",
            icon: TrendingUp,
            iconBg: "#f59e0b",
        },
        {
            title: "At Risk",
            value: "0",
            description: "Departments with risk factors",
            icon: AlertTriangle,
            iconBg: "#ef4444",
        },
    ];
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
    const recentActivity = [
        {
            text: "A new wellness test was completed in",
            department: "Engineering",
            time: "2 hours ago",
        },
        {
            text: "Department Marketing completed monthly assessments",
            department: "",
            time: "1 day ago",
        },
        {
            text: "New wellness resources added to the platform",
            department: "",
            time: "2 days ago",
        },
    ];
    const menuItems = [
        { icon: LayoutDashboard, label: "Overview", path: "/dashboard", active: true },
        { icon: UsersIcon, label: "Employees", path: "/management", active: false },
        { icon: CreditCard, label: "Subscription", path: "/subscription", active: false },
        { icon: Settings, label: "Settings", path: "/settings", active: false },
    ];
    return (_jsxs("div", { className: "min-vh-100", style: { backgroundColor: '#f9fafb' }, children: [isSidebarOpen && (_jsx("div", { style: {
                    position: 'fixed',
                    inset: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    zIndex: 1040,
                }, onClick: () => setIsSidebarOpen(false) })), _jsxs("aside", { style: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    height: '100%',
                    backgroundColor: 'white',
                    borderRight: '1px solid var(--obeeoma-border)',
                    width: '256px',
                    zIndex: 1050,
                    transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
                    transition: 'transform 0.3s ease',
                }, className: "d-lg-block", children: [_jsxs("div", { className: "p-4 d-flex align-items-center justify-content-between border-bottom", children: [_jsxs("button", { onClick: () => navigate("/"), className: "btn btn-link text-decoration-none d-flex align-items-center gap-2 p-0", children: [_jsx("div", { style: {
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }, children: _jsx("span", { style: { color: 'white', fontWeight: 'bold', fontSize: '20px' }, children: "O" }) }), _jsx("span", { style: { fontSize: '20px', fontWeight: 'bold', color: 'var(--obeeoma-primary)' }, children: "Obeeoma" })] }), _jsx("button", { onClick: () => setIsSidebarOpen(false), className: "btn btn-link d-lg-none p-0", children: _jsx(X, { size: 20 }) })] }), _jsxs("nav", { className: "px-3 mt-4", children: [_jsx("p", { style: { fontSize: '12px', color: 'var(--obeeoma-text-muted)', marginBottom: '16px', paddingLeft: '12px' }, children: "Menu" }), menuItems.map((item) => (_jsxs("button", { onClick: () => navigate(item.path), className: "btn w-100 d-flex align-items-center gap-3 mb-2 text-start", style: {
                                    backgroundColor: item.active ? 'var(--obeeoma-mint-dark)' : 'transparent',
                                    color: item.active ? 'var(--obeeoma-primary)' : 'var(--obeeoma-text-dark)',
                                    border: 'none',
                                    borderRadius: '8px',
                                    padding: '12px',
                                    fontWeight: '500',
                                }, children: [_jsx(item.icon, { size: 20 }), _jsx("span", { children: item.label })] }, item.label)))] })] }), _jsxs("div", { style: { marginLeft: 0 }, className: "d-lg-flex", children: [_jsx("div", { style: { width: '256px' }, className: "d-none d-lg-block" }), _jsxs("div", { className: "flex-grow-1", children: [_jsxs("header", { className: "bg-white border-bottom px-3 px-sm-4 py-3 d-flex align-items-center justify-content-between sticky-top", children: [_jsx("button", { onClick: () => setIsSidebarOpen(true), className: "btn btn-link d-lg-none p-2", children: _jsx(Menu, { size: 24 }) }), _jsx("div", { className: "flex-grow-1 mx-4", style: { maxWidth: '600px' }, children: _jsxs("div", { className: "position-relative", children: [_jsx(Search, { size: 16, style: {
                                                        position: 'absolute',
                                                        left: '12px',
                                                        top: '50%',
                                                        transform: 'translateY(-50%)',
                                                        color: 'var(--obeeoma-text-muted)',
                                                    } }), _jsx("input", { type: "search", placeholder: "Search...", className: "form-control", style: {
                                                        paddingLeft: '40px',
                                                        backgroundColor: '#f3f4f6',
                                                        border: '1px solid var(--obeeoma-border)',
                                                        borderRadius: '8px',
                                                    } })] }) }), _jsxs("button", { className: "btn btn-link position-relative p-2", children: [_jsx(Bell, { size: 20 }), _jsx("span", { style: {
                                                    position: 'absolute',
                                                    top: '8px',
                                                    right: '8px',
                                                    width: '8px',
                                                    height: '8px',
                                                    backgroundColor: 'var(--obeeoma-primary)',
                                                    borderRadius: '50%',
                                                } })] })] }), _jsxs("main", { className: "p-3 p-sm-4 p-lg-5", children: [_jsx("h1", { className: "mb-4", style: { fontSize: '28px', fontWeight: 'bold' }, children: "Organization Overview" }), _jsx("div", { className: "row g-3 g-sm-4 mb-4", children: statsData.map((stat) => (_jsx("div", { className: "col-12 col-sm-6 col-lg-3", children: _jsx("div", { className: "card h-100 border-0 shadow-sm", children: _jsx("div", { className: "card-body p-4", children: _jsxs("div", { className: "d-flex align-items-start gap-3", children: [_jsx("div", { style: {
                                                                    backgroundColor: stat.iconBg,
                                                                    width: '48px',
                                                                    height: '48px',
                                                                    borderRadius: '50%',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    flexShrink: 0,
                                                                }, children: _jsx(stat.icon, { size: 24, color: "white" }) }), _jsxs("div", { className: "flex-grow-1", children: [_jsx("p", { className: "mb-1", style: { fontSize: '14px', color: 'var(--obeeoma-text-muted)' }, children: stat.title }), _jsx("p", { className: "mb-1", style: { fontSize: '32px', fontWeight: 'bold' }, children: stat.value }), _jsx("p", { className: "mb-0", style: { fontSize: '12px', color: 'var(--obeeoma-text-muted)' }, children: stat.description })] })] }) }) }) }, stat.title))) }), _jsxs("div", { className: "row g-4 mb-4", children: [_jsx("div", { className: "col-12 col-lg-6", children: _jsx("div", { className: "card border-0 shadow-sm", children: _jsxs("div", { className: "card-body p-4", children: [_jsx("h3", { className: "mb-4", style: { fontSize: '18px', fontWeight: '600' }, children: "Tests by Type" }), _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(BarChart, { data: testsByType, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#e5e7eb" }), _jsx(XAxis, { dataKey: "name", tick: { fill: '#6b7280' } }), _jsx(YAxis, { tick: { fill: '#6b7280' } }), _jsx(Bar, { dataKey: "value", fill: "var(--obeeoma-primary)", radius: [8, 8, 0, 0] })] }) })] }) }) }), _jsx("div", { className: "col-12 col-lg-6", children: _jsx("div", { className: "card border-0 shadow-sm", children: _jsxs("div", { className: "card-body p-4", children: [_jsx("h3", { className: "mb-4", style: { fontSize: '18px', fontWeight: '600' }, children: "Tests by Department" }), _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(PieChart, { children: [_jsx(Pie, { data: testsByDepartment, cx: "50%", cy: "50%", labelLine: false, label: ({ name, value }) => `${name}: ${value}%`, outerRadius: 80, fill: "#8884d8", dataKey: "value", children: testsByDepartment.map((entry, index) => (_jsx(Cell, { fill: entry.color }, `cell-${index}`))) }), _jsx(Legend, {})] }) })] }) }) })] }), _jsx("div", { className: "card border-0 shadow-sm", children: _jsxs("div", { className: "card-body p-4", children: [_jsxs("div", { className: "d-flex align-items-center justify-content-between mb-4", children: [_jsx("h3", { className: "mb-0", style: { fontSize: '18px', fontWeight: '600' }, children: "Recent Activity" }), _jsx("button", { className: "btn btn-link", style: { color: 'var(--obeeoma-primary)', textDecoration: 'none' }, children: "View All" })] }), _jsx("div", { children: recentActivity.map((activity, index) => (_jsxs("div", { className: "d-flex align-items-start gap-3 py-3", style: { borderBottom: index < recentActivity.length - 1 ? '1px solid var(--obeeoma-border)' : 'none' }, children: [_jsx("div", { style: {
                                                                    width: '8px',
                                                                    height: '8px',
                                                                    borderRadius: '50%',
                                                                    backgroundColor: 'var(--obeeoma-primary)',
                                                                    marginTop: '8px',
                                                                    flexShrink: 0,
                                                                } }), _jsx("div", { className: "flex-grow-1", children: _jsxs("p", { className: "mb-0", style: { fontSize: '14px' }, children: [activity.text, " ", activity.department && (_jsx("span", { style: { fontWeight: '500' }, children: activity.department }))] }) }), _jsx("span", { style: { fontSize: '12px', color: 'var(--obeeoma-text-muted)', whiteSpace: 'nowrap' }, children: activity.time })] }, index))) })] }) })] })] })] })] }));
};
export default Dashboard;
