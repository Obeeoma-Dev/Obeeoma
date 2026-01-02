import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import MetricsPanel from "../../../components/admincomponents/Subscriptioncomponents/subMetricPannel";
import RecentSubscriptionsTable from "../../../components/admincomponents/Subscriptioncomponents/recentSubscriptionTable";
import ServiceUtilizationChart from "../../../components/admincomponents/Subscriptioncomponents/serviceUtilisationChart";
import RecentActivityFeed from "../../../components/admincomponents/Subscriptioncomponents/recentActivityFeed";
import AdminHeader from "../../../components/admincomponents/adminheader";
import AdminSidebar from "../../../components/admincomponents/adminsidebar";
import { Container, Row, Col, Card } from "react-bootstrap";
/**
 * SubscriptionPage component displays subscription metrics,
 * recent subscriptions, service utilization, and activity feed.
 * Sidebar and header are fixed; content area scrolls independently.
 * This version focuses on improved layout and card-based design
 * while maintaining all existing functionality and data structures.
 */
const SubscriptionPage = () => {
    // Metrics matching the design
    const metrics = {
        totalOrganizations: 42,
        totalSubscriptions: 38,
        coveredEmployees: "4,328",
        utilizationRate: 68,
    };
    // Subscription records matching the design
    const subscriptions = [
        {
            organization: "Acme Corporation",
            plan: "Enterprise",
            employees: 500,
            activeUsers: 423,
            activeUsersPercent: 85,
            status: "Active",
            expiryDate: "Dec 31, 2023",
        },
        {
            organization: "TechGlobal Inc",
            plan: "Business",
            employees: 250,
            activeUsers: 198,
            activeUsersPercent: 79,
            status: "Active",
            expiryDate: "Mar 15, 2024",
        },
        {
            organization: "Innovate Solutions",
            plan: "Standard",
            employees: 75,
            activeUsers: 45,
            activeUsersPercent: 60,
            status: "Active",
            expiryDate: "Feb 28, 2024",
        },
        {
            organization: "Global Enterprises",
            plan: "Enterprise",
            employees: 1200,
            activeUsers: 875,
            activeUsersPercent: 73,
            status: "Active",
            expiryDate: "Jan 15, 2024",
        },
        {
            organization: "StartUp Co",
            plan: "Starter",
            employees: 25,
            activeUsers: 10,
            activeUsersPercent: 40,
            status: "Pending",
            expiryDate: "Oct 30, 2023",
        },
    ];
    // Service utilization percentages matching the design
    const services = [
        { name: "Therapy Sessions", percentage: 65 },
        { name: "Mindfulness", percentage: 4 },
        { name: "Stress Management", percentage: 8 },
        { name: "Sleep Resources", percentage: 3 },
        { name: "Nutrition", percentage: 25 },
    ];
    // Recent activity log matching the design
    const activities = [
        {
            organization: "Acme Corp",
            icon: "person",
            iconColor: "#3CB371",
            description: "New subscription activated for 150 employees",
            time: "2 hours ago",
        },
        {
            organization: "TechGlobal Inc",
            icon: "refresh",
            iconColor: "#007bff",
            description: "Subscription renewed for another year",
            time: "5 hours ago",
        },
        {
            organization: "Innovate Solutions",
            icon: "alert",
            iconColor: "#dc3545",
            description: "Reported login issues for 5 employees",
            time: "1 day ago",
        },
        {
            organization: "HealthFirst",
            icon: "check",
            iconColor: "#6f42c1",
            description: "Achieved 80% employee engagement",
            time: "2 days ago",
        },
        {
            organization: "Green Energy Co",
            icon: "person",
            iconColor: "#3CB371",
            description: "Trial subscription started for 50 employees",
            time: "3 days ago",
        },
    ];
    return (
    // Main layout container with full viewport height
    _jsxs("div", { className: "d-flex vh-100", children: [_jsx("div", { className: "flex-shrink-0", children: _jsx(AdminSidebar, {}) }), _jsxs("div", { className: "flex-grow-1 d-flex flex-column overflow-hidden", children: [_jsx("div", { className: "flex-shrink-0", children: _jsx(AdminHeader, {}) }), _jsx("div", { style: {
                            flex: 1,
                            overflowY: "auto",
                            padding: "2rem",
                            backgroundColor: "#ffffff",
                        }, children: _jsxs(Container, { fluid: true, children: [_jsx(MetricsPanel, { ...metrics }), _jsxs(Card, { className: "shadow-sm border-0 mb-4", children: [_jsxs(Card.Header, { className: "bg-white border-bottom d-flex justify-content-between align-items-center", children: [_jsxs("div", { children: [_jsx("h5", { className: "mb-0 fw-bold", children: "Recent Subscriptions" }), _jsx("p", { className: "text-muted mb-0 small mt-1", children: "Overview of organization subscriptions to mental health services" })] }), _jsx("button", { className: "btn", style: {
                                                        backgroundColor: "#3CB371",
                                                        color: "#ffffff",
                                                        border: "none",
                                                        padding: "0.5rem 1rem",
                                                        borderRadius: "6px",
                                                        fontWeight: "500",
                                                    }, children: "Add Subscription" })] }), _jsx(Card.Body, { className: "p-0", children: _jsx(RecentSubscriptionsTable, { subscriptions: subscriptions }) })] }), _jsxs(Row, { className: "g-4", children: [_jsx(Col, { lg: 6, children: _jsxs(Card, { className: "shadow-sm border-0 h-100", children: [_jsx(Card.Header, { className: "bg-white border-bottom", children: _jsx("h5", { className: "mb-0 fw-bold", children: "Service Utilization" }) }), _jsx(Card.Body, { children: _jsx(ServiceUtilizationChart, { services: services }) })] }) }), _jsx(Col, { lg: 6, children: _jsxs(Card, { className: "shadow-sm border-0 h-100", children: [_jsx(Card.Header, { className: "bg-white border-bottom", children: _jsx("h5", { className: "mb-0 fw-bold", children: "Recent Activity" }) }), _jsx(Card.Body, { className: "p-0", children: _jsx(RecentActivityFeed, { activities: activities }) })] }) })] })] }) })] })] }));
};
export default SubscriptionPage;
