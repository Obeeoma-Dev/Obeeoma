import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Form, Row, Col, Container, Card } from "react-bootstrap";
// Initial feature flags list
const defaultFlags = [
    { id: "assessments", label: "Assessments", enabled: true },
    { id: "subscriptionTiers", label: "Subscription Tiers", enabled: true },
    { id: "emailDelivery", label: "Email Delivery", enabled: true },
    { id: "notifications", label: "Notifications", enabled: true },
    { id: "hotline", label: "Hot Line", enabled: true },
    { id: "sanaai", label: "Sana Ai", enabled: true },
];
/* FeatureFlags component — renders toggle switches for each feature */
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
    return (_jsxs(Card, { className: "settings-card-compact shadow-sm border-0", children: [_jsx(Card.Header, { className: "fw-semibold mb-2 ps-0", children: "Feature Flags" }), _jsx(Form, { children: _jsx(Container, { fluid: true, children: _jsx(Row, { className: "g-2", children: flags.map((flag) => (_jsx(Col, { md: 6, lg: 5, children: _jsx("div", { className: "p-2 border rounded-2 bg-light-hover transition settings-section-compact", children: _jsx(Form.Check, { type: "switch", id: `switch-${flag.id}`, label: flag.label, checked: flag.enabled, onChange: () => handleToggle(flag.id), className: flag.enabled ? "text-success fw-500" : "text-muted" }) }) }, flag.id))) }) }) })] }));
};
export default FeatureFlags;
