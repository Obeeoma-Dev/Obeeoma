import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Layout from "../../components/employercomponents/shared/Layout";
import StatsGrid from "../../components/employercomponents/employerdashboard/StatsGrid";
import ChartsSection from "../../components/employercomponents/employerdashboard/ChartsSection";
import RecentActivity from "../../components/employercomponents/employerdashboard/RecentActivity";
import { useDashboardData } from "../../hooks/useDashboardData";
const EmployerDashboard = () => {
    const { stats, chartData, activities, loading, error } = useDashboardData();
    if (loading) {
        return (_jsx(Layout, { title: "Organization Overview", children: _jsxs("div", { className: "container-fluid text-center py-5", children: [_jsx("div", { className: "spinner-border text-success", role: "status", children: _jsx("span", { className: "visually-hidden", children: "Loading..." }) }), _jsx("p", { className: "mt-3", children: "Loading dashboard data..." })] }) }));
    }
    if (error) {
        return (_jsx(Layout, { title: "Organization Overview", children: _jsx("div", { className: "container-fluid", children: _jsx("div", { className: "alert alert-danger py-4", role: "alert", children: error }) }) }));
    }
    // Transform backend data to component props
    const statsData = stats ? [
        {
            title: "Active Employees",
            value: stats.totalEmployees.toString(),
            icon: "Users",
            color: "success",
        },
        {
            title: "Wellness index",
            value: `${stats.averageScore}%`,
            icon: "TrendingUp",
            color: "warning",
        },
        {
            title: "At Risk",
            value: stats.atRiskDepartments.toString(),
            icon: "AlertTriangle",
            color: "danger",
        },
    ] : [];
    return (_jsx(Layout, { title: "Organization Overview", children: _jsxs("div", { className: "container-fluid py-4 px-3", children: [_jsx("div", { className: "row gy-4" }), _jsx("div", { className: "col-lg-12 col-md-10 mx-auto", children: _jsx(StatsGrid, { stats: statsData }) }), _jsxs("div", { className: "col-lg-12 col-md-10 d-flex flex-column gap-3", children: [_jsx(ChartsSection, { chartData: chartData }), _jsx(RecentActivity, { activities: activities })] })] }) }));
};
export default EmployerDashboard;
