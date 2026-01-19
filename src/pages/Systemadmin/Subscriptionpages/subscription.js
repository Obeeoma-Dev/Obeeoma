import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import MetricsPanel from "../../../components/admincomponents/Subscriptioncomponents/subMetricPannel";
import RecentSubscriptionsTable from "../../../components/admincomponents/Subscriptioncomponents/recentSubscriptionTable";
import ServiceUtilizationChart from "../../../components/admincomponents/Subscriptioncomponents/serviceUtilisationChart";
import RecentActivityFeed from "../../../components/admincomponents/Subscriptioncomponents/recentActivityFeed";
import AdminHeader from "../../../components/admincomponents/adminheader";
import AdminSidebar from "../../../components/admincomponents/adminsidebar";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
/**
 * SubscriptionPage component displays subscription metrics,
 * recent subscriptions, service utilization, and activity feed.
 * Sidebar and header are fixed; content area scrolls independently.
 * This version focuses on improved layout and card-based design
 * while maintaining all existing functionality and data structures.
 */
const SubscriptionPage = () => {
    // Placeholder metrics — replace with backend data later
    // Keeping existing data structure to avoid breaking changes
    const metrics = {
        totalOrganizations: 42,
        totalSubscriptions: 38,
        coveredEmployees: "4,328",
        utilizationRate: 68,
    };
    // Sample subscription records - maintaining existing structure
    const subscriptions = [
        {
            organization: "Acme Corporation",
            plan: "Enterprise",
            employees: 500,
            activeUsers: 423,
            activeUsersPercentage: 85,
            status: "Active",
            expiryDate: "Dec 31, 2023",
        },
        {
            organization: "TechGlobal Inc",
            plan: "Business",
            employees: 250,
            activeUsers: 198,
            activeUsersPercentage: 79,
            status: "Active",
            expiryDate: "Mar 15, 2024",
        },
        {
            organization: "Innovate Solutions",
            plan: "Standard",
            employees: 75,
            activeUsers: 45,
            activeUsersPercentage: 60,
            status: "Active",
            expiryDate: "Feb 28, 2024",
        },
        {
            organization: "Global Enterprises",
            plan: "Enterprise",
            employees: 1200,
            activeUsers: 875,
            activeUsersPercentage: 73,
            status: "Active",
            expiryDate: "Jan 15, 2024",
        },
        {
            organization: "StartUp Co",
            plan: "Starter",
            employees: 25,
            activeUsers: 10,
            activeUsersPercentage: 40,
            status: "Pending",
            expiryDate: "Oct 30, 2023",
        },
    ];
    // Service utilization percentages - maintaining existing structure
    const services = [
        { name: "Therapy Sessions", percentage: 65 },
        { name: "Mindfulness", percentage: 4 },
        { name: "Stress Management", percentage: 8 },
        { name: "Sleep Resources", percentage: 3 },
        { name: "Nutrition", percentage: 25 },
    ];
    // Recent activity log - maintaining existing structure
    const activities = [
        {
            organization: "Acme Corp",
            message: "New subscription activated for 150 employees",
            icon: "person",
            iconColor: "green",
            timeAgo: "2 hours ago",
        },
        {
            organization: "TechGlobal Inc",
            message: "Subscription renewed for another year",
            icon: "refresh",
            iconColor: "blue",
            timeAgo: "5 hours ago",
        },
        {
            organization: "Innovate Solutions",
            message: "Reported login issues for 5 employees",
            icon: "warning",
            iconColor: "red",
            timeAgo: "1 day ago",
        },
        {
            organization: "HealthFirst",
            message: "Achieved 80% employee engagement",
            icon: "check",
            iconColor: "purple",
            timeAgo: "2 days ago",
        },
        {
            organization: "Green Energy Co",
            message: "Trial subscription started for 50 employees",
            icon: "person",
            iconColor: "green",
            timeAgo: "3 days ago",
        },
    ];
    return (
    // Main layout container with full viewport height and light background
    _jsxs("div", { className: "d-flex vh-100 bg-light", children: [_jsx("div", { className: "flex-shrink-0", children: _jsx(AdminSidebar, {}) }), _jsxs("div", { className: "flex-grow-1 d-flex flex-column overflow-hidden", children: [_jsx("div", { className: "flex-shrink-0", children: _jsx(AdminHeader, {}) }), _jsx("div", { style: {
                            flex: 1,
                            overflowY: "auto",
                            padding: "1.5rem",
                            backgroundColor: "#f8f9fa",
                        }, children: _jsxs(Container, { fluid: true, children: [_jsxs("div", { className: "mb-5", children: [_jsx("h5", { className: "mb-0 fw-bold", style: { fontFamily: 'heading' }, children: "Subscriptions" }), _jsx("p", { className: "text-muted mb-0 small mt-1", style: { fontFamily: 'body' }, children: "Manage and monitor all subscription plans." })] }), _jsx(MetricsPanel, { ...metrics }), _jsxs(Card, { className: "shadow-sm border-0 mb-4", children: [_jsxs(Card.Header, { className: "bg-white border-bottom d-flex justify-content-between align-items-center", children: [_jsxs("div", { children: [_jsx("h5", { className: "mb-0 fw-bold", style: { fontFamily: 'heading' }, children: "Recent Subscriptions" }), _jsx("p", { className: "text-muted mb-0 small mt-1", style: { fontFamily: 'body' }, children: "Overview of organization subscriptions to mental health services" })] }), _jsx(Button, { variant: "success", className: "ms-auto", style: { fontFamily: 'body' }, children: "Add Subscription" })] }), _jsx(Card.Body, { className: "p-0", children: _jsx(RecentSubscriptionsTable, { subscriptions: subscriptions }) })] }), _jsxs(Row, { className: "g-4", children: [_jsx(Col, { lg: 6, children: _jsxs(Card, { className: "shadow-sm border-0", children: [_jsx(Card.Header, { className: "bg-white border-bottom", children: _jsx("h5", { className: "mb-0 fw-bold", style: { fontFamily: 'heading' }, children: "Service Utilization" }) }), _jsx(Card.Body, { children: _jsx(ServiceUtilizationChart, { services: services }) })] }) }), _jsx(Col, { lg: 6, children: _jsxs(Card, { className: "shadow-sm border-0 h-100", children: [_jsx(Card.Header, { className: "bg-white border-bottom", children: _jsx("h5", { className: "mb-0 fw-bold", style: { fontFamily: 'heading' }, children: "Recent Activity" }) }), _jsx(Card.Body, { className: "p-0", children: _jsx(RecentActivityFeed, { activities: activities }) })] }) })] })] }) })] })] }));
};
export default SubscriptionPage;
