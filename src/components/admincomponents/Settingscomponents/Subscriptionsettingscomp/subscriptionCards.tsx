import React from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

// Define the shape of a subscription plan using TypeScript interface
export interface SubscriptionPlan {
  name: string;
  price: string;
  billingNote: string;
  features: string[];
  isPopular?: boolean;
}

// This component renders a single subscription card
const SubscriptionCard: React.FC<{ plan: SubscriptionPlan }> = ({ plan }) => {
<<<<<<< HEAD
    return (
        <Card
            className="h-100 shadow-sm border-0 overflow-hidden transition"
            style={{ boxShadow: "0 1px 6px rgba(0,0,0,0.05)", minHeight: 220 }}
        >
            {/* Popular badge positioned at top */}
            {plan.isPopular && (
                <div className="bg-success text-white py-1 px-2 text-center fw-semibold small">
                    Most Popular
                </div>
            )}

            <Card.Body className="d-flex flex-column p-2">
                {/* Title */}
                <Card.Title className="mb-1 fw-bold text-dark" style={{fontSize: '0.95rem'}}>
                    {plan.name}
                </Card.Title>

                {/* Price and billing note */}
                <div className="mb-2">
                    <div className="fw-bold text-success mb-1" style={{fontSize: '1rem'}}>{plan.price}</div>
                    <Card.Text className="text-muted small mb-0" style={{fontSize: '0.78rem'}}>
                        {plan.billingNote}
                    </Card.Text>
                </div>

                {/* Divider */}
                <hr className="my-1" />

                {/* List of features (allow full content to be visible) */}
                <div className="mb-2 flex-grow-1">
                    <ul className="list-unstyled mb-0" style={{fontSize: '0.9rem', margin: 0}}>
                        {plan.features.map((feature, i) => (
                            <li key={i} className="d-flex align-items-start" style={{padding: '4px 0'}}>
                                <span className="text-success me-2" style={{fontSize: '0.95rem', lineHeight: 1}}>✓</span>
                                <span style={{fontSize: '0.9rem', lineHeight: 1.1}}>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Edit button wrapped in a link (keeps button at bottom) */}
                <Link to="/settings-overview/subscription-editor" className="text-decoration-none mt-auto">
                    <Button variant="primary" size="sm" className="w-100" style={{padding: '6px 10px', fontSize: '0.9rem'}}>
                        Edit Plan
                    </Button>
                </Link>
            </Card.Body>
        </Card>
    );
=======
  return (
    <Card style={{ boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
      <Card.Body>
        {/* Title with optional "Most Popular" badge */}
        <Card.Title
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <span>{plan.name}</span>
          {plan.isPopular && <Badge bg="success">Most Popular</Badge>}
        </Card.Title>
        {/* Price and billing note */}
        <Card.Subtitle className="mb-2 text-muted">{plan.price}</Card.Subtitle>
        <Card.Text style={{ fontStyle: "italic", marginBottom: "1rem" }}>
          {plan.billingNote}
        </Card.Text>
        {/* List of features */}
        <ul style={{ paddingLeft: "1rem" }}>
          {plan.features.map((feature, i) => (
            <li key={i}>{feature}</li>
          ))}
        </ul>
        {/* Edit button wrapped in a link */}\
        <Link to="/settings-overview/subscription-editor">
          <Button variant="primary" style={{ marginTop: "1rem" }}>
            Edit Plan
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
>>>>>>> main
};

export default SubscriptionCard;
