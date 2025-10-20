import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Check, Star } from "lucide-react";
const PricingPlans = () => {
    // TODO: Replace with API data
    const plans = [
        {
            name: "Starter",
            price: "$29",
            period: "per month",
            description: "Perfect for small teams",
            features: [
                "Up to 10 employees",
                "Basic wellness assessments",
                "Email support",
                "Monthly reports",
            ],
            current: false,
            recommended: false,
        },
        {
            name: "Professional",
            price: "$79",
            period: "per month",
            description: "Ideal for growing organizations",
            features: [
                "Up to 50 employees",
                "Advanced analytics",
                "Priority support",
                "Custom assessments",
                "Weekly reports",
                "API access",
            ],
            current: true,
            recommended: true,
        },
        {
            name: "Enterprise",
            price: "$199",
            period: "per month",
            description: "For large organizations",
            features: [
                "Unlimited employees",
                "Advanced analytics",
                "24/7 dedicated support",
                "White-label solutions",
                "Custom integrations",
                "SLA guarantee",
            ],
            current: false,
            recommended: false,
        },
    ];
    return (_jsx("div", { className: "row mb-5", children: _jsxs("div", { className: "col-12", children: [_jsx("h3", { className: "h4 fw-semibold mb-4", children: "Available Plans" }), _jsx("div", { className: "row g-4", children: plans.map((plan, index) => (_jsx("div", { className: "col-12 col-md-4", children: _jsxs("div", { className: `card h-100 border-0 shadow-sm ${plan.recommended ? 'border-primary' : ''}`, children: [plan.recommended && (_jsxs("div", { className: "card-header bg-primary text-white text-center py-2", children: [_jsx(Star, { size: 16, className: "me-1" }), "Recommended"] })), _jsxs("div", { className: "card-body p-4 d-flex flex-column", children: [_jsx("h5", { className: "card-title fw-bold", children: plan.name }), _jsxs("div", { className: "my-3", children: [_jsx("span", { className: "h2 fw-bold", children: plan.price }), _jsxs("span", { className: "text-muted", children: ["/", plan.period] })] }), _jsx("p", { className: "text-muted mb-4", children: plan.description }), _jsx("ul", { className: "list-unstyled mb-4 flex-grow-1", children: plan.features.map((feature, featureIndex) => (_jsxs("li", { className: "mb-2", children: [_jsx(Check, { size: 16, className: "text-success me-2" }), _jsx("span", { className: "small", children: feature })] }, featureIndex))) }), _jsx("div", { className: "mt-auto", children: plan.current ? (_jsx("button", { className: "btn btn-outline-primary w-100", disabled: true, children: "Current Plan" })) : (_jsx("button", { className: `btn w-100 ${plan.recommended ? 'btn-primary' : 'btn-outline-primary'}`, children: "Select Plan" })) })] })] }) }, index))) })] }) }));
};
export default PricingPlans;
