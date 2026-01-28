import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import AdminSidebar from "../../../components/admincomponents/adminsidebar";
import AdminHeader from "../../../components/admincomponents/adminheader";
import SubscriptionSettingsComp from "../../../components/admincomponents/Settingscomponents/Subscriptionsettingscomp/subscriptioncompsettings";
// Placeholder data for subscription plans
const subscriptionPlans = [
    {
        name: "Freemium",
        price: "$12.99/month",
        billingNote: "Billed annually (save $24)",
        features: [
            "All Basic features",
            "Weekly check-ins",
            "Dedicated support team",
            "Up to 50 employees",
            "Chat support",
        ],
        isPopular: true,
    },
    {
        name: "Premium",
        price: "$24.99/month",
        billingNote: "Billed annually (save $48)",
        features: [
            "All Professional features",
            "Daily check-ins",
            "24/7 crisis support",
            "Custom solutions",
            "Unlimited employees",
        ],
    },
];
const SubscriptionSettingsPage = () => {
    return (_jsxs("div", { style: {
            display: "flex",
            minHeight: "100vh",
            backgroundColor: "#f8f9fa",
        }, children: [_jsx("div", { style: { padding: "1.5rem", borderBottom: "1px solid #dee2e6" }, children: _jsx("h2", { style: { margin: 0, fontFamily: "heading" }, children: "Subscription Settings" }) }), _jsx("div", { style: { width: "250px", flexShrink: 0 }, children: _jsx(AdminSidebar, {}) }), _jsxs("div", { style: { flexGrow: 1 }, children: [_jsx(AdminHeader, {}), _jsx("div", { style: {
                            flex: 1,
                            overflowY: "auto",
                            padding: "1rem",
                            backgroundColor: "#f8f9fa",
                        }, children: _jsx(SubscriptionSettingsComp, { plans: subscriptionPlans }) })] })] }));
};
export default SubscriptionSettingsPage;
