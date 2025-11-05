import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Layout from "../../components/employercomponents/shared/Layout";
import CurrentPlan from "../../components/employercomponents/subscription/CurrentPlan";
import PricingPlans from "../../components/employercomponents/subscription/PricingPlans";
import BillingHistory from "../../components/employercomponents/subscription/BillingHistory";
const EmployerSubscription = () => {
    return (_jsx(Layout, { title: "Subscription Management", children: _jsxs("div", { className: "container-fluid py-4", children: [_jsx(CurrentPlan, {}), _jsx(PricingPlans, {}), _jsx(BillingHistory, {})] }) }));
};
export default EmployerSubscription;
