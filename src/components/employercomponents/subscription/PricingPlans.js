import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Check, Star } from "lucide-react";
import { useState } from "react";
const PricingPlans = () => {
    // 1. Initialize currentPlanName to null/empty string.
    const [currentPlanName, setCurrentPlanName] = useState(null);
    const handlePlanSelection = (planName) => {
        // If the user clicks the plan that's already selected, do nothing.
        if (planName === currentPlanName) {
            console.log(`${planName} is already the current plan.`);
            return;
        }
        // 2. Set the newly selected plan as the current plan in the state.
        setCurrentPlanName(planName);
        const sandboxUrl = "https://sandbox.flutterwave.com/pay/pxv1ofyo5e5l";
        if (planName === "Basic") {
            // For Basic (free) plan, redirect immediately.
            console.log("Redirecting to /success-message for Basic plan.");
            // **REDIRECTION LOGIC FOR BASIC (FREE) PLAN**
            window.location.href = "/success-message";
        }
        else {
            // Redirect to payment gateway for other plans (like Premium).
            console.log("Redirecting to payment gateway for Premium plan.");
            // **REDIRECTION LOGIC FOR PREMIUM (PAID) PLAN**
            window.location.href = sandboxUrl;
        }
    };
    const plans = [
        {
            name: "Basic",
            price: "$0",
            period: "per month",
            description: "Perfect for small teams",
            features: [
                "Basic wellness assessments",
                "Email support",
                "Monthly reports",
            ],
            recommended: false,
        },
        {
            name: "Premium",
            price: "$99",
            period: "per month",
            description: "Ideal for growing organizations",
            features: [
                "Advanced analytics",
                "Priority support",
                "Custom assessments",
                "API access",
            ],
            recommended: true,
        },
    ];
    return (_jsx("div", { className: "row mb-5", children: _jsxs("div", { className: "col-12", children: [_jsx("h3", { className: "h4 fw-semibold mb-4", style: { fontFamily: 'body' }, children: "Available Plans" }), _jsx("div", { className: "row g-4", children: plans.map((plan, index) => {
                        // Check if the current plan matches the selected state
                        const isSelected = plan.name === currentPlanName;
                        // Determine button text and logic
                        let buttonText = "Select Plan";
                        let isDisabled = false;
                        // Define base styles for the button
                        let buttonStyles = {
                            fontFamily: 'body',
                            // Base styles for an outline green button
                            backgroundColor: 'transparent',
                            color: '#22C55E', // Green text
                            borderColor: '#22C55E', // Green border
                        };
                        // If it's a recommended plan AND NOT selected, make it solid green initially
                        if (plan.recommended && !isSelected) {
                            buttonStyles = {
                                ...buttonStyles,
                                backgroundColor: '#22C55E', // Solid Green Background
                                color: '#FFFFFF', // White Text Color for contrast
                                borderColor: '#22C55E', // Green Border
                            };
                        }
                        // If a plan is selected, update the text and enforce the SOLID GREEN style.
                        if (isSelected) {
                            buttonText = "Current Plan";
                            isDisabled = true;
                            // Set SOLID GREEN style for the current plan
                            buttonStyles = {
                                ...buttonStyles,
                                backgroundColor: '#22C55E', // Solid Green Background
                                color: '#FFFFFF', // White Text Color for contrast
                                borderColor: '#22C55E', // Green Border
                            };
                        }
                        return (_jsx("div", { className: "col-12 col-md-6", children: _jsxs("div", { className: `card h-100 border-0 shadow-sm ${plan.recommended ? 'border-success' : ''}`, children: [plan.recommended && (_jsxs("div", { className: "card-header text-white text-center py-2", style: { backgroundColor: '#22C55E' }, children: [" ", _jsx(Star, { size: 16, className: "me-1", style: { color: '#FFFFFF' } }), " ", "Recommended"] })), _jsxs("div", { className: "card-body p-4 d-flex flex-column", children: [_jsx("h5", { className: "card-title fw-bold", style: { fontFamily: 'heading', color: '#22C55E' }, children: plan.name }), _jsxs("div", { className: "my-3", children: [_jsx("span", { className: "h2 fw-bold", style: { fontFamily: 'body', color: '#22C55E' }, children: plan.price }), _jsxs("span", { className: "text-muted", style: { fontFamily: 'body', color: '#22C55E' }, children: ["/", plan.period] })] }), _jsx("p", { className: "text-muted mb-4", style: { fontFamily: 'body', color: '#22C55E' }, children: plan.description }), _jsx("ul", { className: "list-unstyled mb-4 flex-grow-1", children: plan.features.map((feature, featureIndex) => (_jsxs("li", { className: "mb-2", children: [_jsx(Check, { size: 16, style: { color: '#22C55E' }, className: "me-2" }), " ", _jsx("span", { className: "small", children: feature })] }, featureIndex))) }), _jsxs("div", { className: "mt-auto", children: [" ", _jsx("button", { className: `btn w-100`, style: buttonStyles, disabled: isDisabled, onClick: () => handlePlanSelection(plan.name), children: buttonText })] })] })] }) }, index));
                    }) })] }) }));
};
export default PricingPlans;
