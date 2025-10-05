import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Sidebar from '../../components/admincomponents/sidebar';
import Header from '../../components/admincomponents/header';
import DashboardStats from '../../components/admincomponents/dashboardstats';
import PlatformUsageChart from '../../components/admincomponents/platformusagechart';
import RecentActivities from '../../components/admincomponents/platformusagechart';
import BottomMetrics from '../../components/admincomponents/bottommetrics';
/**
 * Dashboard component is the main container for the entire admin dashboard
 * It combines all child components into a cohesive layout with sidebar, header, and content area
 */
const Dashboard = () => {
    return (
    // Main container with flex layout for sidebar and content
    _jsxs("div", { className: "flex h-screen bg-gray-50", children: [_jsx(Sidebar, {}), _jsxs("div", { className: "flex-1 flex flex-col overflow-hidden", children: [_jsx(Header, {}), _jsx("main", { className: "flex-1 overflow-y-auto", children: _jsxs("div", { className: "p-8", children: [_jsx(DashboardStats, {}), _jsx(PlatformUsageChart, {}), _jsx(RecentActivities, {}), _jsx(BottomMetrics, {})] }) })] })] }));
};
export default Dashboard;
