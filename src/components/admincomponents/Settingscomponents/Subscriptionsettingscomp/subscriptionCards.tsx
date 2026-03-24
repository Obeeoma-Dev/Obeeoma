import React from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

export interface SubscriptionPlan {
  id: string;
  name: string;
  organization: string;
  monthlyPrice?: number;
  annualPrice?: number;
  employeeLimit?: number;
  features: string[];
  isPopular?: boolean;
}

const SubscriptionCard: React.FC<{ plan: SubscriptionPlan }> = ({ plan }) => {
  const monthlySavings =
    plan.monthlyPrice && plan.annualPrice
      ? plan.monthlyPrice * 12 - plan.annualPrice
      : 0;
  const isFree = !plan.monthlyPrice || plan.monthlyPrice === 0;

  // Format price in Naira
  const formatPrice = (price: number): string => {
    if (price === 0) return "Free";
    return `₦${price.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <Card
      className={`position-relative bg-white rounded-xl shadow-lg border-2 transition-all h-100 ${
        plan.isPopular ? "border-success" : "border-secondary"
      }`}
      style={{
        transition: "all 0.3s ease",
        boxShadow:
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      }}
    >
      {/* Most Popular Badge */}
      {plan.isPopular && (
        <div
          className="position-absolute start-50 translate-middle-x"
          style={{ top: "-16px", zIndex: 1 }}
        >
          <Badge
            bg="success"
            className="px-3 py-2 text-sm fw-semibold text-white rounded-pill shadow"
            style={{ fontSize: "0.875rem" }}
          >
            Most Popular
          </Badge>
        </div>
      )}

      <Card.Body className="p-3 d-flex flex-column">
        {/* Organization Badge */}
        <div className="mb-2">
          <Badge
            bg="success"
            className="px-2 py-1 text-xs fw-medium text-white rounded-pill"
            style={{ fontSize: "0.7rem" }}
          >
            {plan.organization}
          </Badge>
        </div>

        {/* Tier Name */}
        <Card.Title
          className="text-xl fw-bold text-dark mb-2"
          style={{ fontSize: "1.25rem" }}
        >
          {plan.name}
        </Card.Title>

        {/* Pricing */}
        <div className="mb-3">
          <div className="d-flex align-items-baseline mb-2">
            <span className="fw-bold text-dark" style={{ fontSize: "1.75rem" }}>
              {formatPrice(plan.monthlyPrice || 0)}
            </span>
            {!isFree && (
              <span
                className="ms-2 text-muted"
                style={{ fontSize: "0.875rem" }}
              >
                /month
              </span>
            )}
          </div>
          {!isFree && monthlySavings > 0 && (
            <p className="text-muted mb-0" style={{ fontSize: "0.75rem" }}>
              Billed annually{" "}
              <span className="fw-medium text-success">
                (save {formatPrice(monthlySavings)})
              </span>
            </p>
          )}
        </div>

        {/* Employee Limit */}
        <div className="mb-3 pb-2 border-bottom border-secondary">
          <p
            className="text-sm fw-medium text-dark mb-0"
            style={{ fontSize: "0.75rem" }}
          >
            {!plan.employeeLimit || plan.employeeLimit === 0
              ? "Unlimited employees"
              : `Up to ${plan.employeeLimit} employees`}
          </p>
        </div>

        {/* Features */}
        <ul className="list-unstyled mb-3 flex-grow-1" role="list">
          {plan.features.map((feature, index) => (
            <li key={index} className="d-flex align-items-start mb-2">
              <span
                className="text-success me-2 flex-shrink-0"
                style={{ fontSize: "1rem", marginTop: "2px" }}
              >
                ✓
              </span>
              <span className="text-dark" style={{ fontSize: "0.75rem" }}>
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {/* Edit Button */}
        <Link
          to="/settings-overview/subscription-editor"
          className="text-decoration-none mt-auto"
        >
          <Button
            variant="success"
            className="w-100 d-flex align-items-center justify-content-center gap-2"
            style={{
              padding: "8px 12px",
              fontSize: "0.875rem",
              fontWeight: "500",
            }}
          >
            <span
              style={{
                width: "16px",
                height: "16px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ✏️
            </span>
            Edit Plan
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default SubscriptionCard;
