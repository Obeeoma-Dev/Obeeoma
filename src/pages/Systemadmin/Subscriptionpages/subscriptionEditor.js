import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/admincomponents/Subscriptionpages/SubscriptionEditor.tsx
import { useState } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
// Import styled sidebar and header components
import AdminSidebar from "../../../components/admincomponents/adminsidebar";
import AdminHeader from "../../../components/admincomponents/adminheader";
import { useNavigate } from "react-router-dom";
// Default features for checkboxes
const defaultFeatures = [
    "Access to basic resources",
    "Monthly check-ins",
    "Email support",
    "Access to live webinars",
    "Client engagement tools",
    "Dedicated support team",
];
// Default plan data (can be replaced with props or API response) - Prices in Naira
const defaultPlan = {
    name: "Basic",
    organization: "Obeema",
    monthlyPrice: 5990,
    annualPrice: 59900,
    employeeLimit: 10,
    features: ["Access to basic resources", "Monthly check-ins", "Email support"],
    isPopular: false,
};
// Main component
const SubscriptionEditor = () => {
    // Local state to hold form data
    const [plan, setPlan] = useState(defaultPlan);
    const navigate = useNavigate();
    // Handle input changes for text and number fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPlan((prev) => ({
            ...prev,
            [name]: name.includes("Price") || name === "employeeLimit"
                ? parseFloat(value) || 0
                : value,
        }));
    };
    // Handle select dropdown change
    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setPlan((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    // Toggle feature in array
    const handleFeatureToggle = (feature) => {
        setPlan((prev) => ({
            ...prev,
            features: prev.features.includes(feature)
                ? prev.features.filter((f) => f !== feature)
                : [...prev.features, feature],
        }));
    };
    // Toggle popular checkbox
    const handlePopularToggle = () => {
        setPlan((prev) => ({
            ...prev,
            isPopular: !prev.isPopular,
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
    _jsxs("div", { className: "d-flex vh-100", children: [_jsx("div", { className: "flex-shrink-0", children: _jsx(AdminSidebar, {}) }), _jsxs("div", { className: "flex-grow-1 d-flex flex-column", children: [_jsx("div", { style: { flexShrink: 0 }, children: _jsx(AdminHeader, {}) }), _jsxs("div", { style: {
                            flexGrow: 1,
                            overflowY: "auto",
                            padding: "2rem",
                            backgroundColor: "#f8f9fa",
                        }, children: [_jsxs(Button, { variant: "outline-success", onClick: () => navigate(-1), className: "d-flex align-items-center gap-2 mb-4", children: [_jsx("span", { style: { fontSize: "1.2rem", lineHeight: 1 }, children: " \u2190 " }), "Go Back"] }), _jsxs(Card, { className: "p-4 shadow-sm", children: [_jsx("h4", { className: "mb-4", children: plan.name
                                            ? `Edit Plan: ${plan.name}`
                                            : "Add New Subscription Tier" }), _jsxs(Form.Group, { className: "mb-3", children: [_jsx(Form.Label, { children: "Organization" }), _jsxs(Form.Select, { name: "organization", value: plan.organization, onChange: handleSelectChange, required: true, children: [_jsx("option", { value: "", children: "Select Organization" }), _jsx("option", { value: "Acme Corp", children: "Acme Corp" }), _jsx("option", { value: "TechStart Inc", children: "TechStart Inc" }), _jsx("option", { value: "Global Enterprise", children: "Global Enterprise" }), _jsx("option", { value: "Innovate Solutions", children: "Innovate Solutions" }), _jsx("option", { value: "HealthFirst", children: "HealthFirst" })] })] }), _jsxs(Form.Group, { className: "mb-3", children: [_jsx(Form.Label, { children: "Tier Name" }), _jsx(Form.Control, { type: "text", name: "name", value: plan.name, onChange: handleChange, placeholder: "e.g., Basic, Professional, Enterprise", required: true })] }), _jsxs(Row, { children: [_jsx(Col, { md: 4, children: _jsxs(Form.Group, { className: "mb-3", children: [_jsx(Form.Label, { children: "Monthly Price (\u20A6)" }), _jsx(Form.Control, { type: "number", name: "monthlyPrice", value: plan.monthlyPrice || "", onChange: handleChange, min: 0, step: 0.01, placeholder: "0.00" })] }) }), _jsx(Col, { md: 4, children: _jsxs(Form.Group, { className: "mb-3", children: [_jsx(Form.Label, { children: "Annual Price (\u20A6)" }), _jsx(Form.Control, { type: "number", name: "annualPrice", value: plan.annualPrice || "", onChange: handleChange, min: 0, step: 0.01, placeholder: "0.00" })] }) }), _jsx(Col, { md: 4, children: _jsxs(Form.Group, { className: "mb-3", children: [_jsx(Form.Label, { children: "Employee Limit" }), _jsx(Form.Control, { type: "number", name: "employeeLimit", value: plan.employeeLimit || "", onChange: handleChange, min: 0, placeholder: "0 for unlimited" }), _jsx(Form.Text, { className: "text-muted", children: "Enter 0 for unlimited employees" })] }) })] }), _jsx(Form.Group, { className: "mb-3", children: _jsx(Form.Check, { type: "checkbox", label: "Mark as 'Most Popular'", checked: plan.isPopular || false, onChange: handlePopularToggle }) }), _jsxs("div", { className: "mb-3", children: [_jsx(Form.Label, { children: "Plan Features" }), _jsx("div", { className: "d-flex flex-column gap-2", children: defaultFeatures.map((feature) => (_jsx(Form.Check, { type: "checkbox", label: feature, checked: plan.features.includes(feature), onChange: () => handleFeatureToggle(feature) }, feature))) })] }), _jsxs("div", { className: "d-flex justify-content-end gap-2 mt-4", children: [_jsx(Button, { variant: "secondary", children: "Cancel" }), _jsx(Button, { variant: "danger", onClick: handleDelete, children: "Delete" }), _jsx(Button, { variant: "success", onClick: handleSave, children: "Save Changes" })] })] })] })] })] }));
};
export default SubscriptionEditor;
