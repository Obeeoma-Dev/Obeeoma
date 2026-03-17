import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
// This component renders a single subscription card
const SubscriptionCard = ({ plan }) => {
    return (_jsxs(Card, { className: "h-100 shadow-sm border-0 overflow-hidden transition", style: { boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }, children: [plan.isPopular && (_jsx("div", { className: "bg-success text-white py-2 px-3 text-center fw-semibold", children: "Most Popular" })), _jsxs(Card.Body, { className: "d-flex flex-column p-4", children: [_jsx(Card.Title, { className: "h5 mb-3 fw-bold text-dark", children: plan.name }), _jsxs("div", { className: "mb-4", children: [_jsx("div", { className: "h4 fw-bold text-success mb-1", children: plan.price }), _jsx(Card.Text, { className: "text-muted small", children: plan.billingNote })] }), _jsx("hr", { className: "my-3" }), _jsx("div", { className: "mb-4 flex-grow-1", children: _jsx("ul", { className: "list-unstyled small", children: plan.features.map((feature, i) => (_jsxs("li", { className: "py-2 d-flex align-items-start", children: [_jsx("span", { className: "text-success me-2 mt-1", children: "\u2713" }), _jsx("span", { children: feature })] }, i))) }) }), _jsx(Link, { to: "/settings-overview/subscription-editor", className: "text-decoration-none", children: _jsx(Button, { variant: "primary", className: "w-100 mt-auto", children: "Edit Plan" }) })] })] }));
};
export default SubscriptionCard;
