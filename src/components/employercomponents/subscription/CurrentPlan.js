import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// const CurrentPlan = () => {
//   return (
//     <div className="row mb-5">
//       <div className="col-12">
//         <div className="card border-0 shadow-sm">
//           <div className="card-body p-4">
//             <h3
//               className="h5 fw-semibold mb-3"
//               style={{ fontFamily: "body", color: "#22C55E" }}
//             >
//               Current Plan
//             </h3>
//             <div className="row align-items-center">
//               <div className="col-md-6">
//                 <h4
//                   className="h4 fw-bold  mb-1"
//                   style={{ fontFamily: "body", color: "#22C55E" }}
//                 >
//                   Premium Plan
//                 </h4>
//                 <p
//                   className="text-muted mb-2"
//                   style={{ fontFamily: "body", color: "#22C55E" }}
//                 >
//                   $99 per month • Billed monthly
//                 </p>
//                 <p
//                   className="text-muted small"
//                   style={{ fontFamily: "body", color: "#22C55E" }}
//                 >
//                   Next billing date: Dec 15, 2023
//                 </p>
//               </div>
//               <div className="col-md-6 text-md-end">
//                 <button
//                   className="btn me-2"
//                   style={{
//                     fontFamily: "body",
//                     backgroundColor: "#22C55E",
//                     color: "#FFFFFF",
//                     borderColor: "#22C55E",
//                   }}
//                 >
//                   Change Plan
//                 </button>
//                 <button
//                   className="btn "
//                   style={{
//                     fontFamily: "body",
//                     backgroundColor: "#22C55E",
//                     color: "#FFFFFF",
//                     borderColor: "#22C55E",
//                   }}
//                 >
//                   Update Payment Method
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default CurrentPlan;
import { useState } from 'react';
import { Modal, Button, Form, Row, Col, Card, Badge } from 'react-bootstrap';
const THEME_COLOR = '#22C55E';
export const plans = [
    {
        id: 'basic',
        name: 'Basic Plan',
        monthlyPrice: 29,
        annualPrice: 24,
        users: '2 Users',
        storage: '10 GB',
        support: 'Email'
    },
    {
        id: 'premium',
        name: 'Premium Plan',
        monthlyPrice: 99,
        annualPrice: 79,
        users: '100 GB',
        storage: 'Priority Email',
        support: '24/7 Phone'
    }
];
const ChangePlanModal = ({ show, onHide }) => {
    const [isAnnual, setIsAnnual] = useState(false);
    const currentPlanId = 'premium';
    const buttonStyle = {
        backgroundColor: THEME_COLOR,
        borderColor: THEME_COLOR,
        color: '#fff'
    };
    return (_jsxs(Modal, { show: show, onHide: onHide, size: "lg", centered: true, children: [_jsx(Modal.Header, { closeButton: true, className: "border-0", children: _jsx(Modal.Title, { className: "fw-bold", children: "Upgrade or Change Your Plan" }) }), _jsxs(Modal.Body, { className: "px-4", children: [_jsx("p", { className: "text-muted mb-4", children: "Select the plan that best fits your needs. Your new billing cycle will start immediately." }), _jsxs("div", { className: "d-flex justify-content-center align-items-center mb-5", children: [_jsx("span", { className: !isAnnual ? 'fw-bold' : 'text-muted', children: "Monthly" }), _jsx(Form.Check, { type: "switch", id: "billing-toggle", className: "mx-3 custom-green-switch", checked: isAnnual, onChange: () => setIsAnnual(!isAnnual) }), _jsx("span", { className: isAnnual ? 'fw-bold' : 'text-muted', children: "Annually" }), _jsx(Badge, { className: "ms-2 px-2 py-1", style: { backgroundColor: THEME_COLOR }, children: "Save 20%" })] }), _jsx(Row, { className: "g-4", children: plans.map((plan) => {
                            const isCurrent = plan.id === currentPlanId;
                            return (_jsx(Col, { md: 6, children: _jsx(Card, { className: `h-100 shadow-sm`, style: {
                                        border: isCurrent ? `2px solid ${THEME_COLOR}` : '1px solid #dee2e6'
                                    }, children: _jsxs(Card.Body, { children: [_jsxs("div", { className: "d-flex justify-content-between align-items-start mb-3", children: [_jsx("h4", { className: "fw-bold", style: { color: isCurrent ? THEME_COLOR : 'inherit' }, children: plan.name }), isCurrent && (_jsx(Badge, { style: { backgroundColor: THEME_COLOR }, children: "ACTIVE" }))] }), _jsxs("div", { className: "mb-4", children: [_jsxs("div", { className: "row text-muted small mb-1", children: [_jsx("div", { className: "col-5", children: "Price" }), _jsx("div", { className: "col-3", children: "Users" }), _jsx("div", { className: "col-4 text-end", children: "Storage" })] }), _jsxs("div", { className: "row fw-bold align-items-center", style: { fontSize: '0.9rem' }, children: [_jsxs("div", { className: "col-5", children: ["$", isAnnual ? plan.annualPrice : plan.monthlyPrice, " / month"] }), _jsx("div", { className: "col-3", children: plan.users }), _jsx("div", { className: "col-4 text-end", children: plan.storage })] }), _jsx("hr", {}), _jsx("div", { className: "row text-muted small mb-1", children: _jsx("div", { className: "col-6", children: "Support" }) }), _jsx("div", { className: "row fw-bold", children: _jsx("div", { className: "col-6", children: plan.support }) })] }), _jsx("div", { className: "mt-auto pt-3 text-center", children: isCurrent ? (_jsx("span", { className: "text-muted small italic", children: "(Currently Active)" })) : (_jsx(Button, { variant: "outline-secondary", className: "w-100 rounded-pill", children: "Downgrade" })) })] }) }) }, plan.id));
                        }) })] }), _jsx(Modal.Footer, { className: "border-0 justify-content-center pb-4", children: _jsx(Button, { className: "px-5 py-2 fw-bold border-0", style: buttonStyle, children: "Confirm Plan Change" }) })] }));
};
