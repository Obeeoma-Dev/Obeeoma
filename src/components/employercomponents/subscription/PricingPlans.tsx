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

    const sandboxUrl: string = 
    "https://paystack.shop/pay/m17b0i5sie";
      //  "https://sandbox.flutterwave.com/pay/pxv1ofyo5e5l";
      


    if (planName === "Free") {
      // For Basic (free) plan, redirect immediately.
      console.log("Redirecting to /success-message for free plan.");
      // **REDIRECTION LOGIC FOR BASIC (FREE) PLAN**
      window.location.href = "/success-message";
    } else {
      // Redirect to payment gateway for other plans (like Premium).
      console.log("Redirecting to payment gateway for Basic plan.");
      // **REDIRECTION LOGIC FOR PREMIUM (PAID) PLAN**
      window.location.href = sandboxUrl;
    }
  };

  const plans = [
    {
      name: "Free Plan",
      price: "$0",
      period: "per month",
      recommended: true,
    },
    {
      name: "Basic Plan",
      price: "$9",
      period: "per month",

      recommended: false,
    },
  ];

  return (
    <div className="row mb-5">
      <div className="col-12">
        <h3 className="h4 fw-semibold mb-4" style={{ fontFamily: "body" }}>
          Available Plans
        </h3>
        <div className="row g-4">
          {plans.map((plan, index) => {
            // Check if the current plan matches the selected state
            const isSelected = plan.name === currentPlanName;

            // Determine button text and logic
            let buttonText = "Select Plan";
            let isDisabled = false;

            // Define base styles for the button
            let buttonStyles: React.CSSProperties = {
              fontFamily: "body",
              // Base styles for an outline green button
              backgroundColor: "transparent",
              color: "#22C55E", // Green text
              borderColor: "#22C55E", // Green border
            };

            // If it's a recommended plan AND NOT selected, make it solid green initially
            if (plan.recommended && !isSelected) {
              buttonStyles = {
                ...buttonStyles,
                backgroundColor: "#22C55E", // Solid Green Background
                color: "#FFFFFF", // White Text Color for contrast
                borderColor: "#22C55E", // Green Border
              };
            }

            // If a plan is selected, update the text and enforce the SOLID GREEN style.
            if (isSelected) {
              buttonText = "Current Plan";
              isDisabled = true;

              // Set SOLID GREEN style for the current plan
              buttonStyles = {
                ...buttonStyles,
                backgroundColor: "#22C55E", // Solid Green Background
                color: "#FFFFFF", // White Text Color for contrast
                borderColor: "#22C55E", // Green Border
              };
            }

            return (
              <div key={index} className="col-12 col-md-6">
                <div
                  className={`card h-100 border-0 shadow-sm ${plan.recommended ? "border-success" : ""}`}
                >
                  {plan.recommended && (
                    <div
                      className="card-header text-white text-center py-2"
                      style={{ backgroundColor: "#22C55E" }}
                    >
                      {" "}
                      {/* Applied green background */}
                      <Star
                        size={16}
                        className="me-1"
                        style={{ color: "#FFFFFF" }}
                      />{" "}
                      {/* White star for contrast */}
                      Recommended
                    </div>
                  )}
                  <div className="card-body p-4 d-flex flex-column">
                    <h5
                      className="card-title fw-bold"
                      style={{ fontFamily: "heading", color: "#22C55E" }}
                    >
                      {plan.name}
                    </h5>
                    <div className="my-3">
                      <span
                        className="h2 fw-bold"
                        style={{ fontFamily: "body", color: "#22C55E" }}
                      >
                        {plan.price}
                      </span>
                      <span
                        className="text-muted"
                        style={{ fontFamily: "body", color: "#22C55E" }}
                      >
                        /{plan.period}
                      </span>
                    </div>
                    <p
                      className="text-muted mb-4"
                      style={{ fontFamily: "body", color: "#22C55E" }}
                    >
                      {/* {plan.description} */}
                    </p>

                    <ul className="list-unstyled mb-4 flex-grow-1">
                      {/* {plan.features.map((feature, featureIndex) => (
                        // <li key={featureIndex} className="mb-2">
                        //   <Check
                        //     size={16}
                        //     style={{ color: "#22C55E" }}
                        //     className="me-2"
                        //   />{" "}
                        //   {/* Green Checkmark */}
                        {/* //   <span className="small">{feature}</span>
                        // </li>
                      ) */
                      // }
                      }
                      
                    </ul>

                    <div className="mt-auto">
                      {" "}
                      {/* Removed inline background color here */}
                      <button
                        className={`btn w-100`}
                        style={buttonStyles} // Applying calculated styles here
                        disabled={isDisabled}
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

