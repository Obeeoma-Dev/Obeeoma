import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Import React and necessary hooks
import { useState, useEffect } from "react";
// Import Bootstrap components
import { Form, Row, Col, Container, Card } from "react-bootstrap";
// Initial feature flags list
const defaultFlags = [
    { id: "featureFlags", label: "Feature Flags", enabled: true },
    { id: "subscriptionTiers", label: "Subscription Tiers", enabled: true },
    { id: "multipleProducts", label: "Multiple Products", enabled: true },
    { id: "customTrialLengths", label: "Custom Trial Lengths", enabled: true },
    { id: "trialExtension", label: "Trial Extension", enabled: true },
    { id: "trialConversion", label: "Trial Conversion", enabled: true },
    { id: "emailCustomization", label: "Email Customization", enabled: true },
    { id: "emailTemplates", label: "Email Templates", enabled: true },
    { id: "emailDelivery", label: "Email Delivery", enabled: true },
    { id: "emailMetrics", label: "Email Metrics", enabled: true },
    { id: "emailLogs", label: "Email Logs", enabled: true },
    { id: "emailSuppression", label: "Email Suppression", enabled: true },
    { id: "emailThrottling", label: "Email Throttling", enabled: true },
    { id: "emailRetry", label: "Email Retry", enabled: true },
    { id: "emailAlias", label: "Email Alias", enabled: true },
];
/**
 * FeatureFlags component — renders toggle switches for each feature
 * with persistent state and custom styling
 */
const FeatureFlags = () => {
    // Load flags from localStorage or use default
    const [flags, setFlags] = useState(() => {
        const stored = localStorage.getItem("featureFlags");
        return stored ? JSON.parse(stored) : defaultFlags;
    });
    // Save flags to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("featureFlags", JSON.stringify(flags));
    }, [flags]);
    // Toggle handler for each switch
    const handleToggle = (id) => {
        setFlags((prevFlags) => prevFlags.map((flag) => flag.id === id ? { ...flag, enabled: !flag.enabled } : flag));
    };
    return (_jsxs(Card, { className: "settings-card-compact shadow-sm border-0", children: [_jsx(Card.Header, { className: "fw-semibold mb-2 ps-0", children: "Feature Flags" }), _jsx(Form, { children: _jsx(Container, { fluid: true, children: _jsx(Row, { className: "g-2", children: flags.map((flag) => (_jsx(Col, { md: 6, lg: 5, children: _jsx("div", { className: "p-2 border rounded-2 bg-light-hover transition settings-section-compact", children: _jsx(Form.Check, { type: "switch" // Render as a toggle switch
                                    , id: `switch-${flag.id}`, label: flag.label, checked: flag.enabled, onChange: () => handleToggle(flag.id), className: flag.enabled ? "text-success fw-500" : "text-muted" }) }) }, flag.id))) }) }) })] }));
};
export default FeatureFlags;
