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
    return (
        <Card className="h-100 shadow-sm border-0 overflow-hidden transition" style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
            {/* Popular badge positioned at top */}
            {plan.isPopular && (
                <div className="bg-success text-white py-2 px-3 text-center fw-semibold">
                    Most Popular
                </div>
            )}

            <Card.Body className="d-flex flex-column p-4">
                {/* Title */}
                <Card.Title className="h5 mb-3 fw-bold text-dark">
                    {plan.name}
                </Card.Title>

                {/* Price and billing note */}
                <div className="mb-4">
                    <div className="h4 fw-bold text-success mb-1">{plan.price}</div>
                    <Card.Text className="text-muted small">
                        {plan.billingNote}
                    </Card.Text>
                </div>

                {/* Divider */}
                <hr className="my-3" />

                {/* List of features */}
                <div className="mb-4 flex-grow-1">
                    <ul className="list-unstyled small">
                        {plan.features.map((feature, i) => (
                            <li key={i} className="py-2 d-flex align-items-start">
                                <span className="text-success me-2 mt-1">✓</span>
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Edit button wrapped in a link */}
                <Link to="/settings-overview/subscription-editor" className="text-decoration-none">
                    <Button variant="primary" className="w-100 mt-auto">
                        Edit Plan
                    </Button>
                </Link>
            </Card.Body>
        </Card>
    );
};

export default SubscriptionCard;