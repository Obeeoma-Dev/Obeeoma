import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
const SubscriptionCard = ({ plan }) => {
    const monthlySavings = plan.monthlyPrice && plan.annualPrice
        ? plan.monthlyPrice * 12 - plan.annualPrice
        : 0;
    const isFree = !plan.monthlyPrice || plan.monthlyPrice === 0;
    // Format price in Naira
    const formatPrice = (price) => {
        if (price === 0)
            return "Free";
        return `₦${price.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };
    return (_jsxs(Card, { className: `position-relative bg-white rounded-xl shadow-lg border-2 transition-all h-100 ${plan.isPopular ? "border-success" : "border-secondary"}`, style: {
            transition: "all 0.3s ease",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        }, children: [plan.isPopular && (_jsx("div", { className: "position-absolute start-50 translate-middle-x", style: { top: "-16px", zIndex: 1 }, children: _jsx(Badge, { bg: "success", className: "px-3 py-2 text-sm fw-semibold text-white rounded-pill shadow", style: { fontSize: "0.875rem" }, children: "Most Popular" }) })), _jsxs(Card.Body, { className: "p-3 d-flex flex-column", children: [_jsx("div", { className: "mb-2", children: _jsx(Badge, { bg: "success", className: "px-2 py-1 text-xs fw-medium text-white rounded-pill", style: { fontSize: "0.7rem" }, children: plan.organization }) }), _jsx(Card.Title, { className: "text-xl fw-bold text-dark mb-2", style: { fontSize: "1.25rem" }, children: plan.name }), _jsxs("div", { className: "mb-3", children: [_jsxs("div", { className: "d-flex align-items-baseline mb-2", children: [_jsx("span", { className: "fw-bold text-dark", style: { fontSize: "1.75rem" }, children: formatPrice(plan.monthlyPrice || 0) }), !isFree && (_jsx("span", { className: "ms-2 text-muted", style: { fontSize: "0.875rem" }, children: "/month" }))] }), !isFree && monthlySavings > 0 && (_jsxs("p", { className: "text-muted mb-0", style: { fontSize: "0.75rem" }, children: ["Billed annually", " ", _jsxs("span", { className: "fw-medium text-success", children: ["(save ", formatPrice(monthlySavings), ")"] })] }))] }), _jsx("div", { className: "mb-3 pb-2 border-bottom border-secondary", children: _jsx("p", { className: "text-sm fw-medium text-dark mb-0", style: { fontSize: "0.75rem" }, children: !plan.employeeLimit || plan.employeeLimit === 0
                                ? "Unlimited employees"
                                : `Up to ${plan.employeeLimit} employees` }) }), _jsx("ul", { className: "list-unstyled mb-3 flex-grow-1", role: "list", children: plan.features.map((feature, index) => (_jsxs("li", { className: "d-flex align-items-start mb-2", children: [_jsx("span", { className: "text-success me-2 flex-shrink-0", style: { fontSize: "1rem", marginTop: "2px" }, children: "\u2713" }), _jsx("span", { className: "text-dark", style: { fontSize: "0.75rem" }, children: feature })] }, index))) }), _jsx(Link, { to: "/settings-overview/subscription-editor", className: "text-decoration-none mt-auto", children: _jsxs(Button, { variant: "success", className: "w-100 d-flex align-items-center justify-content-center gap-2", style: {
                                padding: "8px 12px",
                                fontSize: "0.875rem",
                                fontWeight: "500",
                            }, children: [_jsx("span", { style: {
                                        width: "16px",
                                        height: "16px",
                                        display: "inline-flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }, children: "\u270F\uFE0F" }), "Edit Plan"] }) })] })] }));
};
export default SubscriptionCard;
