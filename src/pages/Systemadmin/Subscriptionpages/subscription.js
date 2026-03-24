import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import MetricsPanel from "../../../components/admincomponents/Subscriptioncomponents/subMetricPannel";
import RecentSubscriptionsTable from "../../../components/admincomponents/Subscriptioncomponents/recentSubscriptionTable";
import SystemAdminLayout from "../../../components/admincomponents/shared/SystemAdminLayout";
import { Container, Card, Button, Alert, Spinner, } from "react-bootstrap";
import { useSimpleSubscriptionCount } from "../../../hooks/useSimpleSubscriptionCount";
import SubscriptionSettingsComp from "../../../components/admincomponents/Settingscomponents/Subscriptionsettingscomp/subscriptioncompsettings";
/**
 * SubscriptionPage component displays subscription metrics,
 * recent subscriptions, service utilization, and activity feed.
 * Sidebar and header are fixed; content area scrolls independently.
 * This version focuses on improved layout and card-based design
 * while maintaining all existing functionality and data structures.
 */
const SubscriptionPage = () => {
    // Start simple - just get subscription count first
    const { count: totalSubscriptions, coveredEmployees, utilizationRate, subscriptions, loading: countLoading, error: countError, refetch: refetchCount, } = useSimpleSubscriptionCount();
    // Debug logging to see what data we're getting
    console.log("Raw subscriptions data:", subscriptions);
    console.log("First subscription structure:", subscriptions[0]);
    // Get metrics from backend data
    const metrics = {
        totalOrganizations: subscriptions.length > 0 ? new Set(subscriptions.map(sub => sub.employer?.name || sub.employer)).size : 0,
        totalSubscriptions: totalSubscriptions,
        coveredEmployees: coveredEmployees.toLocaleString(),
        utilizationRate: utilizationRate,
    };
    const transformedSubscriptions = subscriptions.slice(0, 8).map((sub) => {
        console.log("Processing subscription:", sub);
        return {
            id: sub.id,
            organization: sub.employer?.name ||
                (typeof sub.employer === "string"
                    ? sub.employer
                    : `Org ${sub.employer}`) ||
                "Unknown Organization",
            plan: sub.plan
                ? sub.plan.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())
                : "N/A",
            employees: sub.seats || 0,
            activeUsers: sub.used_seats || 0,
            activeUsersPercentage: sub.seats > 0 ? Math.round((sub.used_seats / sub.seats) * 100) : 0,
            status: sub.is_active !== undefined
                ? sub.is_active
                    ? "Active"
                    : "Pending"
                : "Pending",
            expiryDate: sub.end_date
                ? new Date(sub.end_date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                })
                : "N/A",
        };
    });
    // Service utilization percentages - calculate from backend data if available
    const services = [
        { name: "Therapy Sessions", percentage: 65 },
        { name: "Mindfulness", percentage: 4 },
        { name: "Stress Management", percentage: 8 },
        { name: "Sleep Resources", percentage: 3 },
        { name: "Nutrition", percentage: 25 },
    ];
    // Get subscription plans from backend data
    const subscriptionPlans = subscriptions.slice(0, 5).map((sub, index) => ({
        id: sub.id.toString(),
        name: sub.plan
            ? sub.plan.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())
            : `Plan ${index + 1}`,
        organization: sub.employer?.name || "Unknown Organization",
        monthlyPrice: parseFloat(sub.amount) || 0,
        annualPrice: parseFloat(sub.amount) * 12 || 0,
        employeeLimit: sub.seats || 0,
        features: [
            "Access to basic resources",
            "Monthly check-ins",
            "Email support",
        ],
    }));
    return (_jsx(SystemAdminLayout, { title: "Subscription Management", children: _jsxs(Container, { fluid: true, children: [countLoading && (_jsxs("div", { className: "text-center py-4", children: [_jsx(Spinner, { animation: "border", role: "status", children: _jsx("span", { className: "visually-hidden", children: "Loading subscription count..." }) }), _jsx("p", { className: "mt-2 text-muted", children: "Loading subscription data..." })] })), countError && (_jsxs(Alert, { variant: "danger", className: "mb-4", children: [_jsx(Alert.Heading, { children: "Error Loading Subscription Count" }), _jsx("p", { children: countError }), _jsx(Button, { variant: "outline-danger", onClick: refetchCount, children: "Try Again" })] })), !countLoading && !countError && (_jsxs(_Fragment, { children: [_jsx(MetricsPanel, { ...metrics }), _jsxs(Card, { className: "shadow-sm border-0 mb-4", children: [_jsxs(Card.Header, { className: "bg-white border-bottom d-flex justify-content-between align-items-center", children: [_jsxs("div", { children: [_jsx("h5", { className: "mb-0 fw-bold", style: { fontFamily: "heading" }, children: "Recent Subscriptions" }), _jsx("p", { className: "text-muted mb-0 small mt-1", style: { fontFamily: "body" }, children: "Overview of organization subscriptions to mental health services" })] }), _jsx(Button, { variant: "success", className: "ms-auto", style: { fontFamily: "body" }, onClick: refetchCount, children: "Add Subscription" })] }), _jsx(Card.Body, { className: "p-0", children: _jsx(RecentSubscriptionsTable, { subscriptions: transformedSubscriptions }) })] }), _jsx(SubscriptionSettingsComp, { plans: subscriptionPlans })] }))] }) }));
};
export default SubscriptionPage;
