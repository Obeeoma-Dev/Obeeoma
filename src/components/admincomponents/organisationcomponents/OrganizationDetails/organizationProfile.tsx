// Import React (required for JSX and functional components)
import React from "react";

// Import React-Bootstrap components
import { Card, Badge, Button, ListGroup } from "react-bootstrap";

// Import icon from lucide-react (allowed, not Tailwind related)
import { Building2 } from "lucide-react";

// Import component-specific CSS (plain CSS, not Tailwind)
import "./organizationUse.css";

// Define the props interface for strong typing and lint safety
interface OrganizationProfileProps {
  name: string;
  id: string;
  subscriptionPlan: string;
  status: "Active" | "Inactive";
  region: string;
  lastActive: string;
}

// Export the component as a named export
export function OrganizationProfile({
  name,
  id,
  subscriptionPlan,
  status,
  region,
  lastActive,
}: OrganizationProfileProps) {
  return (
    // Wrapper div to stack cards vertically
    <div className="organization-profile">
      {/* Main organization information card */}
      <Card className="mb-3">
        <Card.Body>
          {/* Centered organization icon and title */}
          <div className="text-center mb-4">
            {/* Icon container */}
            <div className="org-icon mb-3">
              <Building2 size={40} />
            </div>

            {/* Organization name */}
            <Card.Title className="mb-1" style={{ fontFamily: "heading" }}>
              {name}
            </Card.Title>

            {/* Organization ID */}
            <Card.Text className="text-muted" style={{ fontFamily: "body" }}>
              ID: {id}
            </Card.Text>
          </div>

          {/* Divider line */}
          <hr />

          {/* Subscription plan section */}
          <div className="mb-3" style={{ fontFamily: "body" }}>
            <small className="text-muted d-block mb-1">Subscription Plan</small>

            {/* Info badge */}
            <Badge bg="info">{subscriptionPlan}</Badge>
          </div>

          {/* Status section */}
          <div className="mb-3" style={{ fontFamily: "body" }}>
            <small className="text-muted d-block mb-1">Status</small>

            {/* Conditional badge color */}
            <Badge bg={status === "Active" ? "success" : "secondary"}>
              {status}
            </Badge>
          </div>

          {/* Region section */}
          <div className="mb-3" style={{ fontFamily: "body" }}>
            <small className="text-muted d-block mb-1">Region</small>

            {/* Region value */}
            <strong>{region}</strong>
          </div>

          {/* Last active section */}
          <div>
            <small className="text-muted d-block mb-1">Last Active</small>

            {/* Last active value */}
            <strong>{lastActive}</strong>
          </div>
        </Card.Body>
      </Card>

      {/* Navigation / actions card */}
      <Card>
        <ListGroup variant="flush">
          {/* Organization settings */}
          <ListGroup.Item>
            <Button
              variant="link"
              className="action-link"
              style={{
                fontFamily: "body",
                color: "black",
                textDecoration: "none",
              }}
            >
              Organization Settings
            </Button>
          </ListGroup.Item>

          {/* User management */}
          <ListGroup.Item>
            <Button
              variant="link"
              className="action-link"
              style={{
                fontFamily: "body",
                color: "black",
                textDecoration: "none",
              }}
            >
              User Management
            </Button>
          </ListGroup.Item>

          {/* Program settings */}
          <ListGroup.Item>
            <Button
              variant="link"
              className="action-link"
              style={{
                fontFamily: "body",
                color: "black",
                textDecoration: "none",
              }}
            >
              Program Settings
            </Button>
          </ListGroup.Item>

          {/* Billing history */}
          <ListGroup.Item>
            <Button
              variant="link"
              className="action-link"
              style={{
                fontFamily: "body",
                color: "black",
                textDecoration: "none",
              }}
            >
              Billing History
            </Button>
          </ListGroup.Item>

          {/* Deactivate action */}
          <ListGroup.Item>
            <Button
              variant="link"
              className="action-link text-danger"
              style={{
                fontFamily: "body",
                color: "#dc3545",
                textDecoration: "none",
              }}
            >
              Deactivate Organization
            </Button>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
}
