import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import AccountForm from "./AccountForm";
import FeatureFlags from "./FeatureFlags";
import SubscriptionSettingsComp from "./Subscriptionsettingscomp/subscriptioncompsettings";
import AppearenceSettings from "./../Appearencesettingscomp/appearancesettings";
import NotificationSettings from "./notificationSettings";
import SecuritySettings from "./securitySettings";
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
const SettingsTabs = () => {
    // State to track which tab is currently active; default is "account"
    const [key, setKey] = useState("account");
    return (_jsx("div", { className: "p-3 settings-main-container", children: _jsxs(Tabs, { id: "settings-tabs", activeKey: key, onSelect: (k) => k && setKey(k), className: "settings-nav mb-3 border-bottom", children: [_jsx(Tab, { eventKey: "account", title: "Account", children: _jsx("div", { style: { paddingTop: 10 }, children: _jsx(AccountForm, {}) }) }), _jsx(Tab, { eventKey: "security", title: "Security", children: _jsx("div", { style: { paddingTop: 10 }, children: _jsx(SecuritySettings, {}) }) }), _jsx(Tab, { eventKey: "notifications", title: "Notifications", children: _jsx("div", { style: { paddingTop: 10 }, children: _jsx(NotificationSettings, {}) }) }), _jsx(Tab, { eventKey: "appearance", title: "Appearance", children: _jsx("div", { style: { paddingTop: 10 }, children: _jsx(AppearenceSettings, {}) }) }), _jsx(Tab, { eventKey: "subscription", title: "Subscription", children: _jsx("div", { style: { paddingTop: 10 }, children: _jsx(SubscriptionSettingsComp, { plans: subscriptionPlans }) }) }), _jsx(Tab, { eventKey: "feature-flags", title: "Feature Flags", children: _jsx("div", { style: { paddingTop: 10 }, children: _jsx(FeatureFlags, {}) }) })] }) }));
};
export default SettingsTabs;
