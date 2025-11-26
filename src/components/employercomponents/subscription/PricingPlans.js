import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Check, Star } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
const PricingPlans = () => {
    const navigate = useNavigate();
    // TODO: Replace with API data
    const plans = [
        {
            name: "Basic",
            price: "$0",
            amount: 0,
            currency: "USD",
            period: "per month",
            description: "Perfect for small teams",
            features: [
                "Basic wellness assessments",
                "Email support",
                "Monthly reports",
            ],
            current: false,
            recommended: false,
        },
    ];
    /**
     * Handles plan selection and redirects to the checkout page.
     * @param plan The selected plan object.
     */
    const handleSelectPlan = (plan) => {
        // Only navigate for paid plans
        if (plan.amount > 0) {
            navigate('/checkout', {
                state: {
                    planName: plan.name,
                    amount: plan.amount,
                    currency: plan.currency
                }
            });
        }
        else {
            // Handle navigation/activation for $0 plan if necessary
            alert(`You have selected the free ${plan.name} plan.`);
        }
    };
    return (_jsx("div", { className: "row mb-5", children: _jsxs("div", { className: "col-12", children: [_jsx("h3", { className: "h4 fw-semibold mb-4", children: "Available Plans" }), _jsx("div", { className: "row g-4", children: plans.map((plan, index) => (_jsx("div", { className: "col-12 col-md-6", children: _jsxs("div", { className: `card h-100 border-0 shadow-sm ${plan.recommended ? 'border-success border-2' : ''}`, children: [plan.recommended && (_jsxs("div", { className: "card-header bg-success text-white text-center small py-1 rounded-top-0", children: [_jsx(Star, { size: 14, className: "me-1" }), " Most Popular"] })), _jsxs("div", { className: "card-body p-4 d-flex flex-column", children: [_jsx("h5", { className: "card-title fw-bold", children: plan.name }), _jsxs("div", { className: "my-3", children: [_jsx("span", { className: "h2 fw-bold", children: plan.price }), _jsxs("span", { className: "text-muted", children: ["/", plan.period] })] }), _jsx("p", { className: "text-muted mb-4", children: plan.description }), _jsx("ul", { className: "list-unstyled mb-4 flex-grow-1", children: plan.features.map((feature, featureIndex) => (_jsxs("li", { className: "mb-2", children: [_jsx(Check, { size: 16, className: "text-success me-2" }), _jsx("span", { className: "small", children: feature })] }, featureIndex))) }), _jsx("div", { className: "mt-auto", children: plan.current ? (_jsx("button", { className: "btn btn-outline-success w-100", disabled: true, children: "Current Plan" })) : (_jsx("button", { onClick: () => handleSelectPlan(plan), className: `btn w-100 ${plan.recommended ? 'btn-success' : 'btn-outline-success'}`, disabled: plan.amount === 0, children: "Select Plan" })) })] })] }) }, index))) })] }) }));
};
export default PricingPlans;
