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
        <Card className="h-100 shadow-sm border-0 overflow-hidden transition" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            {/* Popular badge positioned at top */}
            {plan.isPopular && (
                <div className="bg-success text-white py-2 px-3 text-center fw-semibold">
                    Most Popular
                </div>
            )}

            <Card.Body className="d-flex flex-column p-3">
                {/* Title */}
                <Card.Title className="h6 mb-2 fw-bold text-dark">
                    {plan.name}
                </Card.Title>

                {/* Price and billing note */}
                <div className="mb-3">
                    <div className="h5 fw-bold text-success mb-1">{plan.price}</div>
                    <Card.Text className="text-muted small mb-0">
                        {plan.billingNote}
                    </Card.Text>
                </div>

                {/* Divider */}
                <hr className="my-2" />

                {/* List of features */}
                <div className="mb-3 flex-grow-1">
                    <ul className="list-unstyled small mb-0">
                        {plan.features.map((feature, i) => (
                            <li key={i} className="py-1 d-flex align-items-start small">
                                <span className="text-success me-2 mt-1" style={{fontSize: '0.9rem'}}>✓</span>
                                <span style={{fontSize: '0.9rem'}}>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Edit button wrapped in a link */}
                <Link to="/settings-overview/subscription-editor" className="text-decoration-none">
                    <Button variant="primary" size="sm" className="w-100 mt-auto">
                        Edit Plan
                    </Button>
                </Link>
            </Card.Body>
        </Card>
    );
};

export default SubscriptionCard;