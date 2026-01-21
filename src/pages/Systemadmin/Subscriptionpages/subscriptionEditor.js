import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/admincomponents/Subscriptionpages/SubscriptionEditor.tsx
import { useState } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
// Import styled sidebar and header components
import AdminSidebar from "../../../components/admincomponents/adminsidebar";
import AdminHeader from "../../../components/admincomponents/adminheader";
// Default plan data (can be replaced with props or API response)
const defaultPlan = {
    name: "Basic",
    description: "Essential mental health resources for small organizations.",
    monthlyPrice: 5.99,
    annualPrice: 59.99,
    features: {
        basicResources: true,
        liveWebinars: false,
        clientEngagement: false,
        mentorship: false,
        upTo50Employees: false,
    },
};
// Main component
const SubscriptionEditor = () => {
    // Local state to hold form data
    const [plan, setPlan] = useState(defaultPlan);
    // Handle input changes for text and number fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPlan((prev) => ({
            ...prev,
            [name]: name.includes("Price") ? parseFloat(value) : value,
        }));
    };
    // Toggle individual feature checkboxes
    const handleFeatureToggle = (featureKey) => {
        setPlan((prev) => ({
            ...prev,
            features: {
                ...prev.features,
                [featureKey]: !prev.features[featureKey],
            },
        }));
    };
    // Placeholder for save logic (connect to backend later)
    const handleSave = () => {
        console.log("Saving plan:", plan);
        // TODO: Send plan to backend via API
    };
    // Placeholder for delete logic
    const handleDelete = () => {
        console.log("Deleting plan:", plan.name);
        // TODO: Call delete API
    };
    return (
    // Full-height layout with sidebar and header
    _jsxs("div", { className: "d-flex vh-100", children: [_jsx("div", { className: "flex-shrink-0", children: _jsx(AdminSidebar, {}) }), _jsxs("div", { className: "flex-grow-1 d-flex flex-column", children: [_jsx("div", { style: { flexShrink: 0 }, children: _jsx(AdminHeader, {}) }), _jsx("div", { style: {
                            flexGrow: 1,
                            overflowY: "auto",
                            padding: "2rem",
                            backgroundColor: "#f8f9fa",
                        }, children: _jsxs(Card, { className: "p-4 shadow-sm", children: [_jsxs("h4", { className: "mb-3", children: ["Plan Name: ", plan.name] }), _jsxs(Form.Group, { className: "mb-3", children: [_jsx(Form.Label, { children: "Description" }), _jsx(Form.Control, { as: "textarea", rows: 2, name: "description", value: plan.description, onChange: handleChange })] }), _jsxs(Row, { children: [_jsx(Col, { md: 6, children: _jsxs(Form.Group, { className: "mb-3", children: [_jsx(Form.Label, { children: "Monthly Price (USD)" }), _jsx(Form.Control, { type: "number", name: "monthlyPrice", value: plan.monthlyPrice, onChange: handleChange, min: 0, step: 0.01 })] }) }), _jsx(Col, { md: 6, children: _jsxs(Form.Group, { className: "mb-3", children: [_jsx(Form.Label, { children: "Annual Price (USD)" }), _jsx(Form.Control, { type: "number", name: "annualPrice", value: plan.annualPrice, onChange: handleChange, min: 0, step: 0.01 })] }) })] }), _jsxs("div", { className: "mb-3", children: [_jsx(Form.Label, { children: "Plan Features" }), _jsx("div", { className: "d-flex flex-column gap-2", children: Object.entries(plan.features).map(([key, value]) => (_jsx(Form.Check, { type: "checkbox", label: formatFeatureLabel(key), checked: value, onChange: () => handleFeatureToggle(key) }, key))) })] }), _jsxs("div", { className: "d-flex justify-content-end gap-2 mt-4", children: [_jsx(Button, { variant: "secondary", children: "Cancel" }), _jsx(Button, { variant: "danger", onClick: handleDelete, children: "Delete" }), _jsx(Button, { variant: "success", onClick: handleSave, children: "Save Changes" })] })] }) })] })] }));
};
// Helper to format feature keys into readable labels
const formatFeatureLabel = (key) => {
    const map = {
        basicResources: "Access to basic resources",
        liveWebinars: "Access to live webinars",
        clientEngagement: "Client engagement",
        mentorship: "Mentorship",
        upTo50Employees: "Up to 50 employees",
    };
    return map[key] || key;
};
export default SubscriptionEditor;
