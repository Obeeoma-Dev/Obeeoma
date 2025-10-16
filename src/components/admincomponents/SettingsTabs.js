import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Import React and the useState hook for managing component state
import { useState } from "react";
// Import Tabs and Tab components from React-Bootstrap
import { Tabs, Tab } from "react-bootstrap";
// Import the AccountForm component to be rendered inside the "Account" tab
import AccountForm from "./AccountForm";
import FeatureFlags from "./FeatureFlags";
import SubscriptionSettingsComp from "./Subscriptionsettingscomp/subscriptioncompsettings";
// Placeholder data for subscription plans
const subscriptionPlans = [
    {
        name: "Basic",
        price: "$5.99/month",
        billingNote: "Billed annually (save $12)",
        features: [
            "Access to basic resources",
            "Monthly check-ins",
            "Up to 10 employees",
            "Email support",
        ],
    },
    {
        name: "Professional",
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
/*
 * SettingsTabs component renders a tabbed interface for different settings sections.
 * It uses React-Bootstrap's Tabs and Tab components to organize content.
 */
const SettingsTabs = () => {
    // State to track which tab is currently active; default is "account"
    const [key, setKey] = useState("account");
    return (
    // Tabs components with controlled activeKey to manage selected tab
    _jsxs(Tabs, { id: "settings-tabs" // Unique ID for accessibility
        , activeKey: key, onSelect: (k) => k && setKey(k), className: "mb-3" // Bottom margin for spacing
        , children: [_jsx(Tab, { eventKey: "account", title: "Account", children: _jsx(AccountForm, {}) }), _jsx(Tab, { eventKey: "security", title: "Security", children: _jsx("p", { children: "Security settings go here. " }) }), _jsx(Tab, { eventKey: "notifications", title: "Notifications", children: _jsx("p", { children: "Notification preferences go here. " }) }), _jsx(Tab, { eventKey: "appearance", title: "Appearance", children: _jsx("p", { children: "Theme and layout settings go here. " }) }), _jsx(Tab, { eventKey: "subscription", title: "Subscription", children: _jsx(SubscriptionSettingsComp, { plans: subscriptionPlans }) }), _jsx(Tab, { eventKey: "feature-flags", title: "Feature Flags", children: _jsx(FeatureFlags, {}) })] }));
};
export default SettingsTabs;
