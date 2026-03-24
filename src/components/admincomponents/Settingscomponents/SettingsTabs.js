import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import AccountForm from "./AccountForm";
import FeatureFlags from "./FeatureFlags";
// import SubscriptionSettingsComp from "./Subscriptionsettingscomp/subscriptioncompsettings";
import AppearenceSettings from "./../Appearencesettingscomp/appearancesettings";
import NotificationSettings from "./notificationSettings";
import SecuritySettings from "./securitySettings";
const SettingsTabs = () => {
    // State to track which tab is currently active; default is "account"
    const [key, setKey] = useState("account");
    return (_jsx("div", { className: "p-3 settings-main-container", children: _jsxs(Tabs, { id: "settings-tabs", activeKey: key, onSelect: (k) => k && setKey(k), className: "settings-nav mb-3 border-bottom", children: [_jsx(Tab, { eventKey: "account", title: "Account", children: _jsx("div", { style: { paddingTop: 10 }, children: _jsx(AccountForm, {}) }) }), _jsx(Tab, { eventKey: "security", title: "Security", children: _jsx("div", { style: { paddingTop: 10 }, children: _jsx(SecuritySettings, {}) }) }), _jsx(Tab, { eventKey: "notifications", title: "Notifications", children: _jsx("div", { style: { paddingTop: 10 }, children: _jsx(NotificationSettings, {}) }) }), _jsx(Tab, { eventKey: "appearance", title: "Appearance", children: _jsx("div", { style: { paddingTop: 10 }, children: _jsx(AppearenceSettings, {}) }) }), _jsx(Tab, { eventKey: "feature-flags", title: "Feature Flags", children: _jsx("div", { style: { paddingTop: 10 }, children: _jsx(FeatureFlags, {}) }) })] }) }));
};
export default SettingsTabs;
