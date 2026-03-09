import React, { useState } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";

export interface AccountDetails {
  name: string;
  title: string;
  email: string;
  phone: string;
  bio: string;
}

const AccountForm: React.FC = () => {
  // Initialize local state with placeholder account data
  const [account, setAccount] = useState<AccountDetails>({
    name: "Dr. Sarah Johnson",
    title: "System Administrator",
    email: "sarah.johnson@mindcare.com",
    phone: "(555) 123-4567",
    bio: "Dr. Sarah Johnson is a system administrator with over 10 years of experience in mental health platforms. She oversees the technical operations and...",
  });

  // Handle input changes for all fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setAccount((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Placeholder for save logic (connect to backend later)
  const handleSave = () => {
    console.log("Saving account details:", account);
    // TODO: Send account data to backend via API
  };

  return (
    // Card layout for visual grouping
    <Card className="p-4 shadow-sm">
      <h4 className="mb-4">Account Information</h4>

      {/* Name and Title */}
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={account.name}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={account.title}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>

      {/* Email and Phone */}
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={account.email}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              value={account.phone}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>

      {/* Professional Bio */}
      <Form.Group className="mb-4">
        <Form.Label>Professional Bio</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          name="bio"
          value={account.bio}
          onChange={handleChange}
        />
      </Form.Group>

      {/* Save button */}
      <div className="d-flex justify-content-end">
        <Button variant="success" onClick={handleSave}>
          Save Changes
        </Button>
      </div>
    </Card>
  );
};

export default AccountForm;
