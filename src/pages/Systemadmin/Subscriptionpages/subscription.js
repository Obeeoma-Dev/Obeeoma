import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import MetricsPanel from "../../../components/admincomponents/Subscriptioncomponents/subMetricPannel";
import RecentSubscriptionsTable from "../../../components/admincomponents/Subscriptioncomponents/recentSubscriptionTable";
import ServiceUtilizationChart from "../../../components/admincomponents/Subscriptioncomponents/serviceUtilisationChart";
import RecentActivityFeed from "../../../components/admincomponents/Subscriptioncomponents/recentActivityFeed";
import AdminHeader from "../../../components/admincomponents/adminheader";
import AdminSidebar from "../../../components/admincomponents/adminsidebar";
import { Container, Col, Card } from "react-bootstrap";
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
        totalOrganizations: 12,
        totalSubscriptions: 34,
        coveredEmployees: "4.2k",
        utilizationRate: 68,
    };
    // Sample subscription records - maintaining existing structure
    const subscriptions = [
        {
            organization: 'Acme Corporation',
            plan: 'Enterprise',
            mrr: '$2,499',
            subscribers: 450,
            status: 'Active',
            renewalDate: 'Dec 15, 2025',
            badge: 'New',
            badgeVariant: 'success',
        },
        {
            organization: 'TechMedia Inc',
            plan: 'Business',
            mrr: '$1,299',
            subscribers: 180,
            status: 'Active',
            renewalDate: 'Dec 20, 2025',
            badge: 'Old',
            badgeVariant: 'secondary',
        },
        {
            organization: 'Wellness Innovations',
            plan: 'Premium',
            mrr: '$899',
            subscribers: 95,
            status: 'Active',
            renewalDate: 'Jan 05, 2026',
            badge: 'Expiration',
            badgeVariant: 'danger',
        },
        {
            organization: 'Global Mindfulness',
            plan: 'Enterprise',
            mrr: '$3,200',
            subscribers: 675,
            status: 'Active',
            renewalDate: 'Dec 28, 2025',
            badge: 'New',
            badgeVariant: 'success',
        },
        {
            organization: 'Peace of Mind Co',
            plan: 'Business',
            mrr: '$1,599',
            subscribers: 220,
            status: 'Active',
            renewalDate: 'Jan 10, 2026',
            badge: 'Expiration',
            badgeVariant: 'danger',
        },
    ];
    // Service utilization percentages - maintaining existing structure
    const services = [
        { name: "Therapy Sessions", percentage: 64 },
        { name: "Mindfulness", percentage: 52 },
        { name: "Stress Management", percentage: 48 },
        { name: "Sleep Resources", percentage: 36 },
        { name: "Nutrition", percentage: 28 },
    ];
    // Recent activity log - maintaining existing structure
    const activities = [
        "Acme Corp added subscription for 250 employees",
        "Green Energy Co subscription marked inactive",
    ];
    return (
    // Main layout container with full viewport height and light background
    _jsxs("div", { className: "d-flex vh-100 bg-light", children: [_jsx("div", { className: "flex-shrink-0", children: _jsx(AdminSidebar, {}) }), _jsxs("div", { className: "flex-grow-1 d-flex flex-column overflow-hidden", children: [_jsx("div", { className: "flex-shrink-0", children: _jsx(AdminHeader, {}) }), _jsx("div", { style: {
                            flex: 1,
                            overflowY: "auto",
                            padding: "1.5rem",
                            backgroundColor: "#f8f9fa",
                        }, children: _jsxs(Container, { fluid: true, children: [_jsxs("div", { className: "mb-4", children: [_jsx("h1", { className: "fw-bold mb-2", style: { fontFamily: 'heading' }, children: "Subscriptions" }), _jsx("p", { className: "text-muted mb-0", style: { fontFamily: 'body' }, children: "Manage and monitor all subscription plans." })] }), _jsx(MetricsPanel, { ...metrics }), _jsxs(Col, { lg: 12, children: [_jsx(Card, { className: "shadow-sm border-0 mb-4", children: _jsx(Card.Body, { className: "p-0", children: _jsx(RecentSubscriptionsTable, { subscriptions: subscriptions }) }) }), _jsxs(Card, { className: "shadow-sm border-0", children: [_jsx(Card.Header, { className: "bg-white border-bottom", children: _jsx("h5", { className: "mb-0 fw-bold", children: "Service Utilization" }) }), _jsx(Card.Body, { children: _jsx(ServiceUtilizationChart, { services: services }) })] })] }), _jsx(Col, { lg: 4, children: _jsxs(Card, { className: "shadow-sm border-0 h-100", children: [_jsx(Card.Header, { className: "bg-white border-bottom", children: _jsx("h5", { className: "mb-0 fw-bold", children: "Recent Activity" }) }), _jsx(Card.Body, { className: "p-0", children: _jsx(RecentActivityFeed, { activities: activities }) })] }) })] }) })] })] }));
};
export default SubscriptionPage;
