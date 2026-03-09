import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SubscriptionCard, { SubscriptionPlan } from "./subscriptionCards";

// This component renders a grid of subscription cards
const SubscriptionSettingsComp: React.FC<{ plans: SubscriptionPlan[] }> = ({
  plans,
}) => {
  const navigate = useNavigate();

  const handleAddNew = () => {
    // Navigate to subscription editor for adding new tier
    navigate("/settings-overview/subscription-editor");
  };

  return (
    <>
      {/* Add New Tier Button */}
      <div className="d-flex justify-content-end mb-3">
        <Button
          variant="success"
          onClick={handleAddNew}
          className="d-flex align-items-center gap-2 px-4 py-2"
        >
          <span style={{ fontSize: "1.25rem", lineHeight: 1 }}>+</span>
          Add New Tier
        </Button>
      </div>

      {/* Subscription Cards Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "1rem",
          padding: "0.75rem 0",
          fontFamily: "body",
        }}
      >
        {/* Render each plan using the reusable SubscriptionCard */}
        {plans.map((plan, index) => (
          <SubscriptionCard key={index} plan={plan} />
        ))}
      </div>
    </>
  );
};

export default SubscriptionSettingsComp;
