import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Import React and the useState hook for managing component state
import { useState } from "react";
// Import Tabs and Tab components from React-Bootstrap
import { Tabs, Tab } from "react-bootstrap";
// Import the AccountForm component to be rendered inside the "Account" tab
import AccountForm from "./AccountForm";
import FeatureFlags from "./FeatureFlags";
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
        , children: [_jsx(Tab, { eventKey: "account", title: "Account", children: _jsx(AccountForm, {}) }), _jsx(Tab, { eventKey: "security", title: "Security", children: _jsx("p", { children: "Security settings go here. " }) }), _jsx(Tab, { eventKey: "notifications", title: "Notifications", children: _jsx("p", { children: "Notification preferences go here. " }) }), _jsx(Tab, { eventKey: "appearance", title: "Appearance", children: _jsx("p", { children: "Theme and layout settings go here. " }) }), _jsx(Tab, { eventKey: "subscription", title: "Subscription", children: _jsx("p", { children: "Subscription details go here. " }) }), _jsx(Tab, { eventKey: "feature-flags", title: "Feature Flags", children: _jsx(FeatureFlags, {}) })] }));
};
export default SettingsTabs;
