// import { useState } from "react";
// import Layout from "../../components/employercomponents/shared/Layout";
// import ChangePlanModal, { plans, Plan } from "../../components/employercomponents/subscription/plans";
// import PricingPlans from "../../components/employercomponents/subscription/PricingPlans";
// import BillingHistory from "../../components/employercomponents/subscription/BillingHistory";

// const EmployerSubscription = () => {
//   const [showChangePlanModal, setShowChangePlanModal] = useState(false);
  
//   // State to control the displayed current plan
//   const [currentPlan, setCurrentPlan] = useState<Plan>(plans[0]); // Default to Free
//   const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('monthly');

//   const handleConfirmChange = (newPlan: Plan, cycle: 'monthly' | 'annually') => {
//     setCurrentPlan(newPlan);
//     setBillingCycle(cycle);
//     setShowChangePlanModal(false);
//     // Add your API call here to save to the database
//   };

//   return (
//     <Layout title="Subscription Management">
//       <div className="container-fluid py-4 employer-body-font">
//         {/* Title Section */}
//         <div className="d-flex justify-content-between align-items-center mb-4">
//           <h2 className="h4 mb-0 fw-bold">Subscription Management</h2>
//           <button
//             className="btn text-white fw-bold px-4 py-2"
//             style={{ backgroundColor: '#22C55E', borderColor: '#22C55E' , fontFamily: 'body' }}
//             onClick={() => setShowChangePlanModal(true)}
//           >
//             Change Plan
//           </button>
//         </div>

//         {/* CURRENT PLAN BOX - Displayed under the title */}
//         <div className="card border-0 shadow-sm mb-5 p-4 bg-white">
//           <div className="row align-items-center">
//             <div className="col-md-8">
//               <h6 className="fw-bold mb-2" style={{ color: '#22C55E', fontSize: '0.8rem', letterSpacing: '1px' , fontFamily: 'heading' }}>
//                 CURRENT SUBSCRIPTION PLAN
//               </h6>
//               <h3 className="fw-bold text-black mb-1">{currentPlan.name}</h3>
//               <p className="text-muted mb-0">
//                 Active Tier: <strong>{currentPlan.users}</strong> • 
//                 Billing: <strong>{billingCycle.charAt(0).toUpperCase() + billingCycle.slice(1)}</strong>
//               </p>
//             </div>
//             <div className="col-md-4 text-md-end mt-3 mt-md-0">
//                <div className="text-black mb-2" style={{ fontSize: '1.5rem', fontFamily: 'body' }}>
//                  <span className="h4 fw-bold">
//                    ${billingCycle === 'annually' ? currentPlan.annualPrice : currentPlan.monthlyPrice}
//                  </span>
//                  <span className="text-muted"> / month</span>
//                </div>
               
//             </div>
//           </div>
//         </div>

//         {/* Modal controlled by the state above */}
//         <ChangePlanModal
//           show={showChangePlanModal}
//           onHide={() => setShowChangePlanModal(false)}
//           currentPlanId={currentPlan.id}
//           onConfirm={handleConfirmChange}
//         />

//         <PricingPlans />
//         <BillingHistory />
//       </div>
//     </Layout>
//   );
// };

// export default EmployerSubscription;

// import { useState } from "react";
// import Layout from "../../components/employercomponents/shared/Layout";
// import ChangePlanModal, { plans, Plan } from "../../components/employercomponents/subscription/plans";
// import PricingPlans from "../../components/employercomponents/subscription/PricingPlans";
// import BillingHistory from "../../components/employercomponents/subscription/BillingHistory";
// import { Badge } from "react-bootstrap"; // Added Badge for card display

// const EmployerSubscription = () => {
//   const [showChangePlanModal, setShowChangePlanModal] = useState(false);
  
//   // 1. Plan State
//   const [currentPlan, setCurrentPlan] = useState<Plan>(plans[0]); 
//   const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('monthly');

//   // 2. Card State (Initialized as null until first payment)
//   const [paymentMethod, setPaymentMethod] = useState<{
//     card_type: string;
//     last_4digits: string;
//     expiry: string;
//   } | null>(null);

//   const handleConfirmChange = (newPlan: Plan, cycle: 'monthly' | 'annually') => {
//     // This is called by the modal after a successful selection/payment
//     setCurrentPlan(newPlan);
//     setBillingCycle(cycle);
//     setShowChangePlanModal(false);

//     // To link with Flutterwave: You would typically pass the Flutterwave 'response' object 
//     // to this function to update the 'paymentMethod' state below.
//     // Example: setPaymentMethod({ card_type: response.card.type, ... });
//   };

//   return (
//     <Layout title="Subscription Management">
//       <div className="container-fluid py-4 employer-body-font">
//         {/* Title Section */}
//         <div className="d-flex justify-content-between align-items-center mb-4">
//           <h2 className="h4 mb-0 fw-bold">Subscription Management</h2>
//           <button
//             className="btn text-white fw-bold px-4 py-2"
//             style={{ backgroundColor: '#22C55E', borderColor: '#22C55E', fontFamily: 'body' }}
//             onClick={() => setShowChangePlanModal(true)}
//           >
//             Change Plan
//           </button>
//         </div>

//         {/* CURRENT PLAN BOX */}
//         <div className="card border-0 shadow-sm mb-4 p-4 bg-white">
//           <div className="row align-items-center">
//             <div className="col-md-8">
//               <h6 className="fw-bold mb-2" style={{ color: '#22C55E', fontSize: '0.8rem', letterSpacing: '1px', fontFamily: 'heading' }}>
//                 CURRENT SUBSCRIPTION PLAN
//               </h6>
//               <h3 className="fw-bold text-black mb-1">{currentPlan.name}</h3>
//               <p className="text-muted mb-0">
//                 Active Tier: <strong>{currentPlan.users}</strong> • 
//                 Billing: <strong>{billingCycle.charAt(0).toUpperCase() + billingCycle.slice(1)}</strong>
//               </p>
//             </div>
//             <div className="col-md-4 text-md-end mt-3 mt-md-0">
//                <div className="text-black mb-2" style={{ fontSize: '1.5rem', fontFamily: 'body' }}>
//                  <span className="h4 fw-bold">
//                    ${billingCycle === 'annually' ? currentPlan.annualPrice : currentPlan.monthlyPrice}
//                  </span>
//                  <span className="text-muted"> / month</span>
//                </div>
//             </div>
//           </div>
//         </div>

//         {/* PAYMENT METHOD BOX - Newly added to reflect Flutterwave details */}
//         <div className="card border-0 shadow-sm mb-5 p-4 bg-white">
//           <h6 className="fw-bold mb-3" style={{ color: '#22C55E', fontSize: '0.8rem', letterSpacing: '1px', fontFamily: 'heading' }}>
//             PAYMENT METHOD
//           </h6>
//           {paymentMethod ? (
//             <div className="d-flex align-items-center justify-content-between">
//               <div className="d-flex align-items-center">
//                 <div className="p-2 border rounded me-3 bg-light">
//                   <span className="fw-bold small text-uppercase">{paymentMethod.card_type}</span>
//                 </div>
//                 <div>
//                   <p className="mb-0 fw-bold text-black">•••• •••• •••• {paymentMethod.last_4digits}</p>
//                   <p className="mb-0 text-muted small">Expires {paymentMethod.expiry}</p>
//                 </div>
//               </div>
//               <Badge style={{ backgroundColor: '#22C55E' }} className="px-3 py-2">Primary</Badge>
//             </div>
//           ) : (
//             <div className="text-muted small">
//               No card details on file. Card information is automatically updated when you change your plan.
//             </div>
//           )}
//         </div>

//         <ChangePlanModal
//           show={showChangePlanModal}
//           onHide={() => setShowChangePlanModal(false)}
//           currentPlanId={currentPlan.id}
//           onConfirm={handleConfirmChange}
//         />

//         <PricingPlans />
//         <BillingHistory />
//       </div>
//     </Layout>
//   );
// };

// export default EmployerSubscription;


import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Layout from "../../components/employercomponents/shared/Layout";
import ChangePlanModal, { plans, Plan } from "../../components/employercomponents/subscription/plans";
import PricingPlans from "../../components/employercomponents/subscription/PricingPlans";
import BillingHistory from "../../components/employercomponents/subscription/BillingHistory";
import PaymentUpdateModal from "../../components/employercomponents/subscription/PaymentUpdateModal";
import { Badge, Button } from "react-bootstrap";
import { RootState } from "../../store/store";

const EmployerSubscription = () => {
  const [showChangePlanModal, setShowChangePlanModal] = useState(false);
  const [showPaymentUpdateModal, setShowPaymentUpdateModal] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<Plan>(plans[0]);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('monthly');
  const [paymentMethod, setPaymentMethod] = useState<{
    card_type: string;
    last_4digits: string;
    expiry: string;
  } | null>(null);

  const employer = useSelector((state: RootState) => state.employer.currentEmployer);

  // 1. EFFECT: Catch user returning from Flutterwave
  useEffect(() => {
    const pendingPlanName = localStorage.getItem("pendingPlanName");
    
    // In a real scenario, you'd check URL params like ?status=success
    // For this Sandbox logic, we assume if they return, it's a success
    if (pendingPlanName === "Premium") {
      const premiumPlan = plans.find(p => p.name === "Premium");
      if (premiumPlan) {
        setCurrentPlan(premiumPlan);
        localStorage.setItem("activePlanName", "Premium");
        
        // MOCKING the card data Flutterwave would usually return
        setPaymentMethod({
          card_type: "MASTERCARD",
          last_4digits: "4422",
          expiry: "09/27"
        });
        
        // Clear pending intent
        localStorage.removeItem("pendingPlanName");
      }
    }
  }, []);

  const handleConfirmChange = (newPlan: Plan, cycle: 'monthly' | 'annually') => {
    setCurrentPlan(newPlan);
    setBillingCycle(cycle);
    setShowChangePlanModal(false);
  };

  return (
    <Layout title="Subscription Management">
      <div className="container-fluid py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="h4 mb-0 fw-bold">Subscription Management</h2>
          <button
            className="btn text-white fw-bold px-4 py-2"
            style={{ backgroundColor: '#22C55E', borderColor: '#22C55E' }}
            onClick={() => setShowChangePlanModal(true)}
          >
            Change Plan
          </button>
        </div>

        {/* CURRENT PLAN BOX */}
        <div className="card border-0 shadow-sm mb-4 p-4 bg-white">
          <h6 className="fw-bold mb-2" style={{ color: '#22C55E', fontSize: '0.8rem', letterSpacing: '1px' }}>
            CURRENT SUBSCRIPTION PLAN
          </h6>
          <h3 className="fw-bold text-black mb-1">{currentPlan.name}</h3>
          <p className="text-muted">
            Active Tier: <strong>{currentPlan.users}</strong> • Billing: <strong>{billingCycle}</strong>
          </p>
          <div className="h4 fw-bold" style={{ color: '#22C55E' }}>
            ${billingCycle === 'annually' ? currentPlan.annualPrice : currentPlan.monthlyPrice} / month
          </div>
        </div>

        {/* PAYMENT METHOD BOX */}
        <div className="card border-0 shadow-sm mb-5 p-4 bg-white">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="fw-bold mb-0" style={{ color: '#22C55E', fontSize: '0.8rem', letterSpacing: '1px' }}>
              PAYMENT METHOD
            </h6>
            <Button
              //  variant="outline-secondary"
              style={{fontFamily:'body', color: '#22C55E', borderColor: '#22C55E', backgroundColor:'transparent' }}
              size="sm"
              onClick={() => setShowPaymentUpdateModal(true)}
            >
              Update Payment Method
            </Button>
          </div>
          {paymentMethod ? (
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <div className="p-2 border rounded me-3 bg-light fw-bold small">
                  {paymentMethod.card_type}
                </div>
                <div>
                  <p className="mb-0 fw-bold">•••• •••• •••• {paymentMethod.last_4digits}</p>
                  <p className="mb-0 text-muted small">Expires {paymentMethod.expiry}</p>
                </div>
              </div>
              <Badge style={{ backgroundColor: '#22C55E' }} className="px-3 py-2">Primary</Badge>
            </div>
          ) : (
            <div className="text-muted small">No card details on file.</div>
          )}
        </div>

        <ChangePlanModal
          show={showChangePlanModal}
          onHide={() => setShowChangePlanModal(false)}
          currentPlanId={currentPlan.id}
          onConfirm={handleConfirmChange}
        />

        <PricingPlans />
        <BillingHistory />

        <PaymentUpdateModal
          show={showPaymentUpdateModal}
          onHide={() => setShowPaymentUpdateModal(false)}
          userEmail={employer?.email || ''}
        />
      </div>
    </Layout>
  );
};

export default EmployerSubscription;