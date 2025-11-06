<<<<<<< HEAD
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
        <Card style={{ boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
            <Card.Body>
                {/* Title with optional "Most Popular" badge */}
                <Card.Title style={{ display: "flex", justifyContent: "space-between" }}>
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
};

=======
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
        <Card style={{ boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
            <Card.Body>
                {/* Title with optional "Most Popular" badge */}
                <Card.Title style={{ display: "flex", justifyContent: "space-between" }}>
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
};

>>>>>>> syda
export default SubscriptionCard;