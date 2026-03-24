import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Button, Card, Form, Modal, Row, Col, Alert } from "react-bootstrap";
import { Plus, Pencil, Trash2, Save, X } from "lucide-react";
// Default subscription plans
// Format price in Naira
const formatPrice = (price) => {
    if (price === 0)
        return "Free";
    return `₦${price.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};
const defaultPlans = [
    {
        id: "1",
        name: "Freemium",
        organization: "Obeema",
        features: [
            "Access to basic resources",
            "Monthly check-ins",
            "Email support",
        ],
        monthlyPrice: 0,
        annualPrice: 0,
        employeeLimit: 10,
        isPopular: false,
    },
    {
        id: "2",
        name: "Premium",
        organization: "Obeema",
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
        monthlyPrice: 24990,
        annualPrice: 249900,
        employeeLimit: 0,
        isPopular: true,
    },
    {
        id: "3",
        name: "Enterprise",
        organization: "Obeema",
        features: [
            "All Premium features",
            "Dedicated account manager",
            "Custom branding",
            "API access",
            "SLA guarantee",
            "24/7 phone support",
        ],
        monthlyPrice: 99990,
        annualPrice: 999900,
        employeeLimit: 0,
        isPopular: false,
    },
];
const SubscriptionSettingsComp = () => {
    // State for plans
    const [plans, setPlans] = useState(() => {
        const stored = localStorage.getItem("subscriptionPlans");
        return stored ? JSON.parse(stored) : defaultPlans;
    });
    // State for modal
    const [showModal, setShowModal] = useState(false);
    const [editingPlan, setEditingPlan] = useState(null);
    // Form state
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        organization: "Obeema",
        monthlyPrice: 0,
        annualPrice: 0,
        employeeLimit: 10,
        features: [],
        isPopular: false,
    });
    // Feature input
    const [featureInput, setFeatureInput] = useState("");
    // Feedback state
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    // Save to localStorage when plans change
    useEffect(() => {
        localStorage.setItem("subscriptionPlans", JSON.stringify(plans));
    }, [plans]);
    // Open modal for new plan
    const handleAddNew = () => {
        setEditingPlan(null);
        setFormData({
            id: Date.now().toString(),
            name: "",
            organization: "Obeema",
            monthlyPrice: 0,
            annualPrice: 0,
            employeeLimit: 10,
            features: [],
            isPopular: false,
        });
        setShowModal(true);
    };
    // Open modal for editing
    const handleEdit = (plan) => {
        setEditingPlan(plan);
        setFormData({ ...plan });
        setShowModal(true);
    };
    // Handle form input changes
    const handleChange = (e) => {
        const { name, value, type } = e.target;
        const checked = e.target.checked;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : type === "number" ? parseFloat(value) || 0 : value,
        }));
    };
    // Add feature
    const handleAddFeature = () => {
        if (featureInput.trim()) {
            setFormData((prev) => ({
                ...prev,
                features: [...prev.features, featureInput.trim()],
            }));
            setFeatureInput("");
        }
    };
    // Remove feature
    const handleRemoveFeature = (index) => {
        setFormData((prev) => ({
            ...prev,
            features: prev.features.filter((_, i) => i !== index),
        }));
    };
    // Save plan
    const handleSave = () => {
        if (!formData.name.trim()) {
            return;
        }
        setPlans((prev) => {
            if (editingPlan) {
                return prev.map((p) => (p.id === editingPlan.id ? formData : p));
            }
            return [...prev, formData];
        });
        setShowModal(false);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
    };
    // Delete plan
    const handleDelete = (id) => {
        setPlans((prev) => prev.filter((p) => p.id !== id));
        setDeleteSuccess(true);
        setTimeout(() => setDeleteSuccess(false), 3000);
    };
    return (_jsxs(_Fragment, { children: [_jsxs(Card, { className: "settings-card-compact shadow-sm border-0", children: [_jsx(Card.Header, { className: "fw-semibold mb-2 ps-0", children: "Subscription Tiers" }), saveSuccess && (_jsxs(Alert, { variant: "success", className: "d-flex align-items-center py-2 px-3 mb-3", children: [_jsx(Save, { size: 16, className: "me-2" }), "Plan saved successfully!"] })), deleteSuccess && (_jsxs(Alert, { variant: "danger", className: "d-flex align-items-center py-2 px-3 mb-3", children: [_jsx(Trash2, { size: 16, className: "me-2" }), "Plan deleted successfully!"] })), _jsx("div", { style: {
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                            gap: "1rem",
                            padding: "0.75rem 0",
                        }, children: plans.map((plan) => (_jsxs(Card, { className: `position-relative bg-white rounded shadow-sm border-2 h-100 ${plan.isPopular ? "border-success" : "border-secondary"}`, style: { transition: "all 0.3s ease" }, children: [plan.isPopular && (_jsx("div", { className: "position-absolute start-50 translate-middle-x", style: { top: "-12px", zIndex: 1 }, children: _jsx("span", { className: "badge bg-success px-3 py-1 text-sm fw-semibold rounded-pill", children: "Most Popular" }) })), _jsxs(Card.Body, { className: "p-3 d-flex flex-column", children: [_jsx("div", { className: "mb-2", children: _jsx("span", { className: "badge bg-success px-2 py-1 text-xs rounded-pill", children: plan.organization }) }), _jsx("h5", { className: "fw-bold text-dark mb-2", children: plan.name }), _jsxs("div", { className: "mb-3", children: [_jsx("span", { className: "fw-bold text-dark", style: { fontSize: "1.5rem" }, children: formatPrice(plan.monthlyPrice || 0) }), plan.monthlyPrice !== 0 && (_jsx("span", { className: "text-muted ms-1", children: "/month" }))] }), _jsx("div", { className: "mb-3 pb-2 border-bottom", children: _jsx("small", { className: "text-muted", children: plan.employeeLimit === 0
                                                    ? "Unlimited employees"
                                                    : `Up to ${plan.employeeLimit} employees` }) }), _jsxs("ul", { className: "list-unstyled mb-3 flex-grow-1", role: "list", children: [plan.features.slice(0, 4).map((feature, index) => (_jsxs("li", { className: "d-flex align-items-start mb-1", children: [_jsx("span", { className: "text-success me-2", children: "\u2713" }), _jsx("small", { className: "text-dark", children: feature })] }, index))), plan.features.length > 4 && (_jsxs("li", { className: "text-muted small", children: ["+", plan.features.length - 4, " more"] }))] }), _jsxs("div", { className: "d-flex gap-2 mt-auto", children: [_jsxs(Button, { variant: "outline-success", size: "sm", className: "flex-grow-1 d-flex align-items-center justify-content-center gap-1", onClick: () => handleEdit(plan), children: [_jsx(Pencil, { size: 14 }), "Edit"] }), _jsx(Button, { variant: "outline-secondary", size: "sm", className: "d-flex align-items-center justify-content-center", onClick: () => handleDelete(plan.id), children: _jsx(Trash2, { size: 14 }) })] })] })] }, plan.id))) })] }), _jsx("div", { className: "d-flex justify-content-end mt-3", children: _jsxs(Button, { variant: "success", onClick: handleAddNew, className: "d-flex align-items-center gap-2", children: [_jsx(Plus, { size: 18 }), "Add New Tier"] }) }), _jsxs(Modal, { show: showModal, onHide: () => setShowModal(false), size: "lg", centered: true, children: [_jsx(Modal.Header, { closeButton: true, children: _jsx(Modal.Title, { children: editingPlan ? "Edit Plan" : "Add New Plan" }) }), _jsx(Modal.Body, { children: _jsxs(Form, { children: [_jsxs(Row, { className: "mb-3", children: [_jsx(Col, { md: 6, children: _jsxs(Form.Group, { children: [_jsx(Form.Label, { children: "Plan Name" }), _jsx(Form.Control, { type: "text", name: "name", value: formData.name, onChange: handleChange, placeholder: "e.g., Premium" })] }) }), _jsx(Col, { md: 6, children: _jsxs(Form.Group, { children: [_jsx(Form.Label, { children: "Organization" }), _jsx(Form.Control, { type: "text", name: "organization", value: formData.organization, onChange: handleChange, placeholder: "e.g., Obeema" })] }) })] }), _jsxs(Row, { className: "mb-3", children: [_jsx(Col, { md: 6, children: _jsxs(Form.Group, { children: [_jsx(Form.Label, { children: "Monthly Price (\u20A6)" }), _jsx(Form.Control, { type: "number", name: "monthlyPrice", value: formData.monthlyPrice, onChange: handleChange, min: "0", step: "0.01" })] }) }), _jsx(Col, { md: 6, children: _jsxs(Form.Group, { children: [_jsx(Form.Label, { children: "Annual Price (\u20A6)" }), _jsx(Form.Control, { type: "number", name: "annualPrice", value: formData.annualPrice, onChange: handleChange, min: "0", step: "0.01" })] }) })] }), _jsxs(Row, { className: "mb-3", children: [_jsx(Col, { md: 6, children: _jsxs(Form.Group, { children: [_jsx(Form.Label, { children: "Employee Limit (0 = Unlimited)" }), _jsx(Form.Control, { type: "number", name: "employeeLimit", value: formData.employeeLimit, onChange: handleChange, min: "0" })] }) }), _jsx(Col, { md: 6, children: _jsx(Form.Group, { className: "d-flex align-items-center h-100", children: _jsx(Form.Check, { type: "checkbox", name: "isPopular", label: "Mark as Most Popular", checked: formData.isPopular, onChange: handleChange, className: "mt-4" }) }) })] }), _jsxs(Form.Group, { className: "mb-3", children: [_jsx(Form.Label, { children: "Features" }), _jsxs("div", { className: "d-flex gap-2 mb-2", children: [_jsx(Form.Control, { type: "text", value: featureInput, onChange: (e) => setFeatureInput(e.target.value), placeholder: "Add a feature", onKeyPress: (e) => e.key === "Enter" && (e.preventDefault(), handleAddFeature()) }), _jsx(Button, { variant: "outline-success", onClick: handleAddFeature, children: _jsx(Plus, { size: 18 }) })] }), _jsx("ul", { className: "list-group", children: formData.features.map((feature, index) => (_jsxs("li", { className: "list-group-item d-flex justify-content-between align-items-center", children: [_jsx("span", { children: feature }), _jsx(Button, { variant: "link", className: "text-danger p-0", onClick: () => handleRemoveFeature(index), children: _jsx(X, { size: 16 }) })] }, index))) })] })] }) }), _jsxs(Modal.Footer, { children: [_jsx(Button, { variant: "secondary", onClick: () => setShowModal(false), children: "Cancel" }), _jsxs(Button, { variant: "success", onClick: handleSave, children: [_jsx(Save, { size: 16, className: "me-2" }), "Save Plan"] })] })] })] }));
};
export default SubscriptionSettingsComp;
