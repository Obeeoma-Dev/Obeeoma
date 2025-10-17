import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import MetricsPanel from "../../../components/admincomponents/Subscriptioncomponents/subMetricPannel";
import RecentSubscriptionsTable from "../../../components/admincomponents/Subscriptioncomponents/recentSubscriptionTable";
import ServiceUtilizationChart from "../../../components/admincomponents/Subscriptioncomponents/serviceUtilisationChart";
import RecentActivityFeed from "../../../components/admincomponents/Subscriptioncomponents/recentActivityFeed";
import AdminHeader from "../../../components/admincomponents/adminheader";
import AdminSidebar from "../../../components/admincomponents/adminsidebar";
import { Container, Row, Col } from "react-bootstrap";
/**
 * SubscriptionPage component displays subscription metrics,
 * recent subscriptions, service utilization, and activity feed.
 * Sidebar and header are fixed; content area scrolls independently.
 */
const SubscriptionPage = () => {
    // 📊 Placeholder metrics — replace with backend data later
    const metrics = {
        totalOrganizations: 12,
        totalSubscriptions: 34,
        coveredEmployees: "4.2k",
        utilizationRate: 68,
    };
    // 📋 Sample subscription records
    const subscriptions = [
        {
            organization: "Acme Corporation",
            type: "Enterprise",
            employees: 250,
            startDate: "Mar 15, 2023",
            endDate: "Mar 15, 2024",
            status: "Active",
        },
        {
            organization: "Green Energy Co",
            type: "Startup",
            employees: 75,
            startDate: "Mar 15, 2023",
            endDate: "Mar 15, 2024",
            status: "Inactive",
        },
    ];
    // 📈 Service utilization percentages
    const services = [
        { name: "Therapy Sessions", percentage: 64 },
        { name: "Mindfulness", percentage: 52 },
        { name: "Stress Management", percentage: 48 },
        { name: "Sleep Resources", percentage: 36 },
        { name: "Nutrition", percentage: 28 },
    ];
    // 🕒 Recent activity log
    const activities = [
        "Acme Corp added subscription for 250 employees",
        "Green Energy Co subscription marked inactive",
    ];
    return (_jsxs("div", { className: "d-flex vh-100", children: [_jsx("div", { className: "flex-shrink-0", children: _jsx(AdminSidebar, {}) }), _jsxs("div", { className: "flex-grow-1 d-flex flex-column overflow-hidden", children: [_jsx("div", { className: "flex-shrink-0", children: _jsx(AdminHeader, {}) }), _jsx("div", { style: {
                            flex: 1,
                            overflowY: 'auto',
                            padding: '1rem',
                            backgroundColor: '#f8f9fa',
                        }, children: _jsx("div", { className: "flex-grow-1 overflow-auto", children: _jsxs(Container, { fluid: true, className: "py-4", children: [_jsx(MetricsPanel, { ...metrics }), _jsxs(Row, { children: [_jsxs(Col, { md: 8, children: [_jsx(RecentSubscriptionsTable, { subscriptions: subscriptions }), _jsx(ServiceUtilizationChart, { services: services })] }), _jsx(Col, { md: 4, children: _jsx(RecentActivityFeed, { activities: activities }) })] })] }) }) })] })] }));
};
export default SubscriptionPage;
