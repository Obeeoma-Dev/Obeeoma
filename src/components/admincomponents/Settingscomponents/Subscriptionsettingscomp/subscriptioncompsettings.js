import { jsx as _jsx } from "react/jsx-runtime";
import SubscriptionCard from "./subscriptionCards";
// This component renders a grid of subscription cards
const SubscriptionSettingsComp = ({ plans, }) => {
    return (_jsx("div", { style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1rem",
            padding: "0.75rem 0",
            fontFamily: "body",
        }, children: plans.map((plan, index) => (_jsx(SubscriptionCard, { plan: plan }, index))) }));
};
export default SubscriptionSettingsComp;
