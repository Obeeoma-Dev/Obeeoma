import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import AccountForm from "./AccountForm";
import FeatureFlags from "./FeatureFlags";
import SubscriptionSettingsComp from "./Subscriptionsettingscomp/subscriptioncompsettings";
// import AppearenceSettings from "./../Appearencesettingscomp/appearancesettings";
import NotificationSettings from "./notificationSettings";
import SecuritySettings from "./securitySettings";
// Default subscription plans
const defaultSubscriptionPlans = [
    {
        id: "1",
        name: "Freemium",
        organization: "TechStart Inc",
        features: [
            "Access to basic resources",
            "Monthly check-ins",
            "Email support",
        ],
        isPopular: true,
    },
    {
        id: "2",
        name: "Premium",
        organization: "Global Enterprise",
        monthlyPrice: 24.99,
        annualPrice: 251.99,
        employeeLimit: 0,
        features: [
            "Access to basic resources",
            "Monthly check-ins",
            "Email support",
            "Access to live webinars",
            "Client engagement tools",
            "Advanced analytics",
            "Custom integrations",
            "Priority support",
        ],
    },
];
const SettingsTabs = () => {
    // State to track which tab is currently active; default is "account"
    const [key, setKey] = useState("account");
    return (_jsxs("div", { className: "p-3 settings-main-container", children: [_jsx("h1", { className: "h3 mb-4", children: "Settings" }), _jsxs(Tabs, { id: "settings-tabs", activeKey: key, onSelect: (k) => k && setKey(k), className: "settings-nav mb-3 border-bottom", children: [_jsx(Tab, { eventKey: "account", title: "Account", children: _jsx("div", { style: { paddingTop: 10 }, children: _jsx(AccountForm, {}) }) }), _jsx(Tab, { eventKey: "security", title: "Security", children: _jsx("div", { style: { paddingTop: 10 }, children: _jsx(SecuritySettings, {}) }) }), _jsx(Tab, { eventKey: "notifications", title: "Notifications", children: _jsx("div", { style: { paddingTop: 10 }, children: _jsx(NotificationSettings, {}) }) }), _jsx(Tab, { eventKey: "subscription", title: "Subscription", children: _jsx("div", { style: { paddingTop: 10 }, children: _jsx(SubscriptionSettingsComp, {}) }) }), _jsx(Tab, { eventKey: "feature-flags", title: "Feature Flags", children: _jsx("div", { style: { paddingTop: 10 }, children: _jsx(FeatureFlags, {}) }) })] })] }));
};
export default SettingsTabs;
