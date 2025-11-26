import { Check, Star } from "lucide-react";
import { useState } from "react";

const PricingPlans = () => {
  // 1. Initialize currentPlanName to null/empty string.
  const [currentPlanName, setCurrentPlanName] = useState<string | null>(null);

  const handlePlanSelection = (planName: string): void => {
    // If the user clicks the plan that's already selected, do nothing.
    if (planName === currentPlanName) {
      console.log(`${planName} is already the current plan.`);
      return;
    }

    // 2. Set the newly selected plan as the current plan in the state.
    setCurrentPlanName(planName);

    const sandboxUrl: string = "https://sandbox.flutterwave.com/pay/pxv1ofyo5e5l";

    if (planName === "Basic") {
      // For Basic (free) plan, redirect immediately.
      console.log("Redirecting to /success-message for Basic plan.");
      // **REDIRECTION LOGIC FOR BASIC (FREE) PLAN**
      window.location.href = "/success-message"; 
    } else {
      // Redirect to payment gateway for other plans (like Premium).
      console.log("Redirecting to payment gateway for Premium plan.");
      // **REDIRECTION LOGIC FOR PREMIUM (PAID) PLAN**
      window.location.href = sandboxUrl;
    }
    
    // NOTE: The window.location.href lines above have been uncommented for the required logic.
  };

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

  return (
    <div className="row mb-5">
      <div className="col-12">
        <h3 className="h4 fw-semibold mb-4">Available Plans</h3>
        <div className="row g-4">
          {plans.map((plan, index) => {
            // Check if the current plan matches the selected state
            const isSelected = plan.name === currentPlanName;
            
            // Determine button text and logic
            let buttonText = "Select Plan";
            let isDisabled = false;
            // Default class: use solid green for recommended, outline for others
            let buttonClass = plan.recommended ? 'btn-success' : 'btn-outline-success';

            // **UPDATED CONDITIONAL RENDERING LOGIC**:

            // If a plan is selected, update the text and disable the button.
            if (isSelected) {
              buttonText = "Current Plan";
              buttonClass = 'btn-success'; // Ensure solid green button for the current plan
              isDisabled = true; 
            }
            
            // NOTE: The `currentPlanName === null` block was removed, 
            // allowing the button to default to "Select Plan" initially.

            return (
              <div key={index} className="col-12 col-md-6">
                <div className={`card h-100 border-0 shadow-sm ${plan.recommended ? 'border-success' : ''}`}>
                  {plan.recommended && (
                    <div className="card-header bg-success text-white text-center py-2">
                      <Star size={16} className="me-1" />
                      Recommended
                    </div>
                  )}
                  <div className="card-body p-4 d-flex flex-column">
                    <h5 className="card-title fw-bold">{plan.name}</h5>
                    <div className="my-3">
                      <span className="h2 fw-bold">{plan.price}</span>
                      <span className="text-muted">/{plan.period}</span>
                    </div>
                    <p className="text-muted mb-4">{plan.description}</p>
                    
                    <ul className="list-unstyled mb-4 flex-grow-1">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="mb-2">
                          <Check size={16} className="text-success me-2" />
                          <span className="small">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto">
                      <button
                        className={`btn w-100 ${buttonClass}`}
                        disabled={isDisabled}
                        // Always call handlePlanSelection on click
                        onClick={() => handlePlanSelection(plan.name)} 
                      >
                        {buttonText}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;
// import { Check, Star } from "lucide-react";

// const PricingPlans = () => {
//   // 1. Modify redirectToPayment to accept a plan argument
//   const handlePlanSelection = (planName: string): void => {
//     const sandboxUrl: string = "https://sandbox.flutterwave.com/pay/pxv1ofyo5e5l";

//     if (planName === "Basic") {
//       // 2. Redirect to success-message for the Basic (free) plan
//       window.location.href = "/success-message";
//     } else {
//       // Redirect to payment gateway for other plans
//       window.location.href = sandboxUrl;
//     }
//   };

//   const plans = [
//     {
//       name: "Basic",
//       price: "$0",
//       period: "per month",
//       description: "Perfect for small teams",
//       features: [
//         "Basic wellness assessments",
//         "Email support",
//         "Monthly reports",
//       ],
//       current: false,
//       recommended: false,
//     },
//     {
//       name: "Premium",
//       price: "$99",
//       period: "per month",
//       description: "Ideal for growing organizations",
//       features: [
//         "Advanced analytics",
//         "Priority support",
//         "Custom assessments",
//         "API access",
//       ],
//       current: true,
//       recommended: true,
//     },
//   ];

//   return (
//     <div className="row mb-5">
//       <div className="col-12">
//         <h3 className="h4 fw-semibold mb-4">Available Plans</h3>
//         <div className="row g-4">
//           {plans.map((plan, index) => (
//             <div key={index} className="col-12 col-md-6">
//               <div className={`card h-100 border-0 shadow-sm ${plan.recommended ? 'border-success' : ''}`}>
//                 {plan.recommended && (
//                   <div className="card-header bg-success text-white text-center py-2">
//                     <Star size={16} className="me-1" />
//                     Recommended
//                   </div>
//                 )}
//                 <div className="card-body p-4 d-flex flex-column">
//                   <h5 className="card-title fw-bold">{plan.name}</h5>
//                   <div className="my-3">
//                     <span className="h2 fw-bold">{plan.price}</span>
//                     <span className="text-muted">/{plan.period}</span>
//                   </div>
//                   <p className="text-muted mb-4">{plan.description}</p>
                  
//                   <ul className="list-unstyled mb-4 flex-grow-1">
//                     {plan.features.map((feature, featureIndex) => (
//                       <li key={featureIndex} className="mb-2">
//                         <Check size={16} className="text-success me-2" />
//                         <span className="small">{feature}</span>
//                       </li>
//                     ))}
//                   </ul>

//                   <div className="mt-auto">
//                     {plan.current ? (
//                       <button
//                         className={`btn w-100 ${plan.recommended ? 'btn-success' : 'btn-outline-success'}`}
//                         // Use handlePlanSelection for the current plan, which redirects to payment
//                         onClick={() => handlePlanSelection(plan.name)} 
//                       >
//                         Current Plan
//                       </button>
//                     ) : (
//                       <button 
//                         className={`btn w-100 ${plan.recommended ? 'btn-success' : 'btn-outline-success'}`}
//                         // 3. Call handlePlanSelection with the plan name
//                         onClick={() => handlePlanSelection(plan.name)}
//                       >
//                         Select Plan
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PricingPlans;

// import { Check, Star } from "lucide-react";

// const PricingPlans = () => {
//   const redirectToPayment = (): void => {
//   const sandboxUrl: string = "https://sandbox.flutterwave.com/pay/pxv1ofyo5e5l";
  
//   // Use window.location.href to redirect (allows the user to use the back button)
//   window.location.href = sandboxUrl;
  
// };
//   const plans = [
//     {
//       name: "Basic",
//       price: "$0",
//       period: "per month",
//       description: "Perfect for small teams",
//       features: [
//         "Basic wellness assessments",
//         "Email support",
//         "Monthly reports",
//       ],
//       current: false,
//       recommended: false,
//     },
//     {
//       name: "Premium",
//       price: "$99",
//       period: "per month",
//       description: "Ideal for growing organizations",
//       features: [
//         "Advanced analytics",
//         "Priority support",
//         "Custom assessments",
//         "API access",
//       ],
//       current: true,
//       recommended: true,
//     },
//   ];

//   return (
//     <div className="row mb-5">
//       <div className="col-12">
//         <h3 className="h4 fw-semibold mb-4">Available Plans</h3>
//         <div className="row g-4">
//           {plans.map((plan, index) => (
//             <div key={index} className="col-12 col-md-6">
//               <div className={`card h-100 border-0 shadow-sm ${plan.recommended ? 'border-success' : ''}`}>
//                 {plan.recommended && (
//                   <div className="card-header bg-success text-white text-center py-2">
//                     <Star size={16} className="me-1" />
//                     Recommended
//                   </div>
//                 )}
//                 <div className="card-body p-4 d-flex flex-column">
//                   <h5 className="card-title fw-bold">{plan.name}</h5>
//                   <div className="my-3">
//                     <span className="h2 fw-bold">{plan.price}</span>
//                     <span className="text-muted">/{plan.period}</span>
//                   </div>
//                   <p className="text-muted mb-4">{plan.description}</p>
                  
//                   <ul className="list-unstyled mb-4 flex-grow-1">
//                     {plan.features.map((feature, featureIndex) => (
//                       <li key={featureIndex} className="mb-2">
//                         <Check size={16} className="text-success me-2" />
//                         <span className="small">{feature}</span>
//                       </li>
//                     ))}
//                   </ul>

//                   <div className="mt-auto">
//                     {plan.current ? (
//                       <button
//                        className={`btn w-100 ${plan.recommended ? 'btn-success' : 'btn-outline-success'}`}
//                        onClick={redirectToPayment} 
//                       >
//                         Current Plan
//                       </button>
//                     ) : (
//                       <button className={`btn w-100 ${plan.recommended ? 'btn-success' : 'btn-outline-success'}`}>
                
//                         Select Plan
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PricingPlans;