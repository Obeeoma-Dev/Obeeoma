import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import AdminSidebar from "../../../components/admincomponents/adminsidebar";
import AdminHeader from "../../../components/admincomponents/adminheader";
import SubscriptionSettingsComp from "../../../components/admincomponents/Settingscomponents/Subscriptionsettingscomp/subscriptioncompsettings";
// Note: SubscriptionSettingsComp now manages its own state from localStorage
// This placeholder data is kept for reference but not used
const subscriptionPlans = [
    {
        id: "1",
        name: "Freemium",
        organization: "Obeema",
        monthlyPrice: 0,
        annualPrice: 0,
        employeeLimit: 10,
        features: [
            "Access to basic resources",
            "Monthly check-ins",
            "Email support",
        ],
    },
    {
        id: "2",
        name: "Premium",
        organization: "Obeema",
        monthlyPrice: 24990,
        annualPrice: 249900,
        employeeLimit: 0,
        features: [
            "Access to basic resources",
            "Monthly check-ins",
            "Email support",
            "Access to live webinars",
            "Client engagement tools",
            "Dedicated support team",
        ],
        isPopular: true,
    },
];
const SubscriptionSettingsPage = () => {
    // Subscription plans will be fetched by the SubscriptionSettingsComp component
    return (_jsxs("div", { style: {
            display: "flex",
            minHeight: "100vh",
            backgroundColor: "#f8f9fa",
        }, children: [_jsx("div", { style: { padding: "1.5rem", borderBottom: "1px solid #dee2e6" }, children: _jsx("h2", { style: { margin: 0, fontFamily: "heading" }, children: "Subscription Settings" }) }), _jsx("div", { style: { width: "250px", flexShrink: 0 }, children: _jsx(AdminSidebar, {}) }), _jsxs("div", { style: { flexGrow: 1 }, children: [_jsx(AdminHeader, {}), _jsx("div", { style: {
                            flex: 1,
                            overflowY: "auto",
                            padding: "1rem",
                            backgroundColor: "#f8f9fa",
                        }, children: _jsx(SubscriptionSettingsComp, {}) })] })] }));
};
export default SubscriptionSettingsPage;
