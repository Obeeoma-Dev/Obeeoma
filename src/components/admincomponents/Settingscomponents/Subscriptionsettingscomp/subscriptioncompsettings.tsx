import React from "react";
import SubscriptionCard, { SubscriptionPlan } from "./subscriptionCards";

// This component renders a grid of subscription cards
const SubscriptionSettingsComp: React.FC<{ plans: SubscriptionPlan[] }> = ({
  plans,
}) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "1.5rem",
        padding: "1rem",
      }}
    >
      {/* Render each plan using the reusable SubscriptionCard */}
      {plans.map((plan, index) => (
        <SubscriptionCard key={index} plan={plan} />
      ))}
    </div>
  );
};

export default SubscriptionSettingsComp;
