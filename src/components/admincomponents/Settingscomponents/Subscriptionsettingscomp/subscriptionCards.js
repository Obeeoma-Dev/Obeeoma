import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
// This component renders a single subscription card
const SubscriptionCard = ({ plan }) => {
    return (_jsx(Card, { style: { boxShadow: "0 0 10px rgba(0,0,0,0.1)" }, children: _jsxs(Card.Body, { children: [_jsxs(Card.Title, { style: { display: "flex", justifyContent: "space-between" }, children: [_jsx("span", { children: plan.name }), plan.isPopular && _jsx(Badge, { bg: "success", children: "Most Popular" })] }), _jsx(Card.Subtitle, { className: "mb-2 text-muted", children: plan.price }), _jsx(Card.Text, { style: { fontStyle: "italic", marginBottom: "1rem" }, children: plan.billingNote }), _jsx("ul", { style: { paddingLeft: "1rem" }, children: plan.features.map((feature, i) => (_jsx("li", { children: feature }, i))) }), "\\", _jsx(Link, { to: "/settings-overview/subscription-editor", children: _jsx(Button, { variant: "primary", style: { marginTop: "1rem" }, children: "Edit Plan" }) })] }) }));
};
export default SubscriptionCard;
