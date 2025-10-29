import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Layout from "../../components/employercomponents/shared/Layout";
import StatsGrid from "../../components/employercomponents/employerdashboard/StatsGrid";
import ChartsSection from "../../components/employercomponents/employerdashboard/ChartsSection";
import RecentActivity from "../../components/employercomponents/employerdashboard/RecentActivity";
import { useDashboardData } from "../../hooks/useDashboardData";
const EmployerDashboard = () => {
    const { stats, chartData, activities, loading, error } = useDashboardData();
    if (loading) {
        return (_jsx(Layout, { title: "Organization Overview", children: _jsx("div", { className: "container-fluid py-4", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "spinner-border text-primary", role: "status", children: _jsx("span", { className: "visually-hidden", children: "Loading..." }) }), _jsx("p", { className: "mt-2", children: "Loading dashboard data..." })] }) }) }));
    }
    if (error) {
        return (_jsx(Layout, { title: "", children: _jsx("div", { className: "container-fluid py-4", children: _jsx("div", { className: "alert alert-danger", role: "alert", children: error }) }) }));
    }
    // Transform backend data to component props
    const statsData = stats ? [
        {
            title: "Total Employees",
            value: stats.totalEmployees.toString(),
            description: "Active employees in the system",
            icon: "Users",
            color: "primary",
        },
        {
            title: "Total Tests",
            value: stats.totalTests.toString(),
            description: "Tests completed",
            icon: "FileCheck",
            color: "info",
        },
        {
            title: "Average Score",
            value: `${stats.averageScore}%`,
            description: "Average wellness score",
            icon: "TrendingUp",
            color: "warning",
        },
        {
            title: "At Risk",
            value: stats.atRiskDepartments.toString(),
            description: "Departments with risk factors",
            icon: "AlertTriangle",
            color: "danger",
        },
    ] : [];
    return (_jsx(Layout, { title: "Organization Overview", children: _jsxs("div", { className: "container-fluid py-4", children: [_jsx(StatsGrid, { stats: statsData }), _jsx(ChartsSection, { chartData: chartData }), _jsx(RecentActivity, { activities: activities })] }) }));
};
export default EmployerDashboard;
