import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SubscriptionCard from "./subscriptionCards";
// This component renders a grid of subscription cards
const SubscriptionSettingsComp = ({ plans, }) => {
    const navigate = useNavigate();
    const handleAddNew = () => {
        // Navigate to subscription editor for adding new tier
        navigate("/settings-overview/subscription-editor");
    };
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "d-flex justify-content-end mb-3", children: _jsxs(Button, { variant: "success", onClick: handleAddNew, className: "d-flex align-items-center gap-2 px-4 py-2", children: [_jsx("span", { style: { fontSize: "1.25rem", lineHeight: 1 }, children: "+" }), "Add New Tier"] }) }), _jsx("div", { style: {
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                    gap: "1rem",
                    padding: "0.75rem 0",
                    fontFamily: "body",
                }, children: plans.map((plan, index) => (_jsx(SubscriptionCard, { plan: plan }, index))) })] }));
};
export default SubscriptionSettingsComp;
