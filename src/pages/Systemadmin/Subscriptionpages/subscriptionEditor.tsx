// src/components/admincomponents/Subscriptionpages/SubscriptionEditor.tsx

import React, { useState } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";

// Import styled sidebar and header components
import AdminSidebar from "../../../components/admincomponents/adminsidebar";
import AdminHeader from "../../../components/admincomponents/adminheader";
import { useNavigate } from "react-router-dom";

// Define shape of a subscription plan using TypeScript interface
export interface SubscriptionPlan {
  name: string;
  organization: string;
  monthlyPrice?: number;
  annualPrice?: number;
  employeeLimit?: number;
  features: string[];
  isPopular?: boolean;
}

// Default features for checkboxes
const defaultFeatures = [
  "Access to basic resources",
  "Monthly check-ins",
  "Email support",
  "Access to live webinars",
  "Client engagement tools",
  "Dedicated support team",
];

// Default plan data (can be replaced with props or API response)
const defaultPlan: SubscriptionPlan = {
  name: "Basic",
  organization: "Acme Corp",
  monthlyPrice: 5.99,
  annualPrice: 59.99,
  employeeLimit: 10,
  features: ["Access to basic resources", "Monthly check-ins", "Email support"],
  isPopular: false,
};

// Main component
const SubscriptionEditor: React.FC = () => {
  // Local state to hold form data
  const [plan, setPlan] = useState<SubscriptionPlan>(defaultPlan);
  const navigate = useNavigate();

  // Handle input changes for text and number fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setPlan((prev) => ({
      ...prev,
      [name]:
        name.includes("Price") || name === "employeeLimit"
          ? parseFloat(value) || 0
          : value,
    }));
  };

  // Handle select dropdown change
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPlan((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Toggle feature in array
  const handleFeatureToggle = (feature: string) => {
    setPlan((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  };

  // Toggle popular checkbox
  const handlePopularToggle = () => {
    setPlan((prev) => ({
      ...prev,
      isPopular: !prev.isPopular,
    }));
  };

  // Placeholder for save logic (connect to backend later)
  const handleSave = () => {
    console.log("Saving plan:", plan);
    // TODO: Send plan to backend via API
  };

  // Placeholder for delete logic
  const handleDelete = () => {
    console.log("Deleting plan:", plan.name);
    // TODO: Call delete API
  };

  return (
    // Full-height layout with sidebar and header
    <div className="d-flex vh-100">
      {/* Sidebar stays fixed on the left */}
      <div className="flex-shrink-0">
        <AdminSidebar />
      </div>

      {/* Main content area grows to fill remaining space */}
      <div className="flex-grow-1 d-flex flex-column">
        {/* Fixed header at the top */}
        <div style={{ flexShrink: 0 }}>
          <AdminHeader />
        </div>

        {/* Scrollable content below header */}
        <div
          style={{
            flexGrow: 1,
            overflowY: "auto",
            padding: "2rem",
            backgroundColor: "#f8f9fa",
          }}
        >
          <Button
            variant="outline-success"
            onClick={() => navigate(-1)}
            className="d-flex align-items-center gap-2 mb-4"
          >
            <span style={{ fontSize: "1.2rem", lineHeight: 1 }}> ← </span>
            Go Back
          </Button>
          <Card className="p-4 shadow-sm">
            <h4 className="mb-4">
              {plan.name
                ? `Edit Plan: ${plan.name}`
                : "Add New Subscription Tier"}
            </h4>

            {/* Organization Dropdown */}
            <Form.Group className="mb-3">
              <Form.Label>Organization</Form.Label>
              <Form.Select
                name="organization"
                value={plan.organization}
                onChange={handleSelectChange}
                required
              >
                <option value="">Select Organization</option>
                <option value="Acme Corp">Acme Corp</option>
                <option value="TechStart Inc">TechStart Inc</option>
                <option value="Global Enterprise">Global Enterprise</option>
                <option value="Innovate Solutions">Innovate Solutions</option>
                <option value="HealthFirst">HealthFirst</option>
              </Form.Select>
            </Form.Group>

            {/* Plan Name */}
            <Form.Group className="mb-3">
              <Form.Label>Tier Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={plan.name}
                onChange={handleChange}
                placeholder="e.g., Basic, Professional, Enterprise"
                required
              />
            </Form.Group>

            {/* Pricing fields */}
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Monthly Price (USD)</Form.Label>
                  <Form.Control
                    type="number"
                    name="monthlyPrice"
                    value={plan.monthlyPrice || ""}
                    onChange={handleChange}
                    min={0}
                    step={0.01}
                    placeholder="0.00"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Annual Price (USD)</Form.Label>
                  <Form.Control
                    type="number"
                    name="annualPrice"
                    value={plan.annualPrice || ""}
                    onChange={handleChange}
                    min={0}
                    step={0.01}
                    placeholder="0.00"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Employee Limit</Form.Label>
                  <Form.Control
                    type="number"
                    name="employeeLimit"
                    value={plan.employeeLimit || ""}
                    onChange={handleChange}
                    min={0}
                    placeholder="0 for unlimited"
                  />
                  <Form.Text className="text-muted">
                    Enter 0 for unlimited employees
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>

            {/* Mark as Popular checkbox */}
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Mark as 'Most Popular'"
                checked={plan.isPopular || false}
                onChange={handlePopularToggle}
              />
            </Form.Group>

            {/* Feature checkboxes */}
            <div className="mb-3">
              <Form.Label>Plan Features</Form.Label>
              <div className="d-flex flex-column gap-2">
                {defaultFeatures.map((feature) => (
                  <Form.Check
                    key={feature}
                    type="checkbox"
                    label={feature}
                    checked={plan.features.includes(feature)}
                    onChange={() => handleFeatureToggle(feature)}
                  />
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="d-flex justify-content-end gap-2 mt-4">
              <Button variant="secondary">Cancel</Button>
              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
              <Button variant="success" onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionEditor;
