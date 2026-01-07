// Import React and necessary hooks
import React, { useState, useEffect } from "react";

// Import Bootstrap components
import { Form, Button, Spinner, Alert, Card } from "react-bootstrap";

// Define the shape of the form data using a TypeScript interface
interface AccountData {
  fullName: string;
  email: string;
  role: string;
  phone: string;
  bio: string;
}

// Define the AccountForm component
const AccountForm: React.FC = () => {
  // State to hold form input values
  const [formData, setFormData] = useState<AccountData>({
    fullName: "",
    email: "",
    role: "",
    phone: "",
    bio: "",
  });

  // State to track loading status
  const [loading, setLoading] = useState<boolean>(true);

  // State to track error messages
  const [error, setError] = useState<string | null>(null);

  // Simulate fetching default values (e.g. from API or mock service)
  useEffect(() => {
    try {
      // Simulated delay using setTimeout
      setTimeout(() => {
        const defaultValues: AccountData = {
          fullName: "Dr. Racheal Lucia",
          email: "racheal.lucia@obeema.com",
          role: "System Administrator",
          phone: "(555) 123-4567",
          bio: "Dr. Racheal is a system administrator with over 10 years of experience in mental health care.",
        };
        setFormData(defaultValues);
        setLoading(false); // Stop loading once data is set
      }, 1000); // 1 second delay
    } catch {
      setError("Failed to load account data.");
      setLoading(false);
    }
  }, []);

  // Handle input changes for all fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    // Placeholder for future API call
    console.log("Form submitted:", formData);
  };

  // Show loading spinner while data is being fetched
  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="success" />
        <p className="mt-3">Loading account data...</p>
      </div>
    );
  }

  // Show error message if data fails to load
  if (error) {
    return (
      <Alert variant="danger" className="mt-3">
        {error}
      </Alert>
    );
  }

  // Render the form once data is loaded and no error
  return (
    <>
      {/* Separate profile summary card */}
      <Card className="settings-card-compact shadow-sm border-0 mb-3">
        <Card.Body className="p-2 d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 56,
                background: "#f1f7f3",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--obeeoma-green)",
                fontWeight: 700,
              }}
            >
              DR
            </div>
            <div className="ms-3">
              <div className="fw-bold" style={{ fontSize: "0.98rem" }}>
                {formData.fullName}
              </div>
              <div className="text-muted small">{formData.role}</div>
            </div>
          </div>

          <div>
            <Button variant="outline-success" size="sm">
              Change Photo
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Card className="settings-card-compact shadow-sm border-0">
        <Card.Header className="fw-semibold mb-2 ps-0">
          Account Information
        </Card.Header>
        <Form onSubmit={handleSubmit}>
          {/* Full Name input */}
          <Form.Group controlId="formFullName" className="mb-2">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter full name"
            />
          </Form.Group>

          {/* Email input */}
          <Form.Group controlId="formEmail" className="mb-2">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </Form.Group>

          {/* Role input */}
          <Form.Group controlId="formRole" className="mb-2">
            <Form.Label>Role</Form.Label>
            <Form.Control
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="Enter role"
            />
          </Form.Group>

          {/* Phone input */}
          <Form.Group controlId="formPhone" className="mb-2">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
            />
          </Form.Group>

          {/* Bio input */}
          <Form.Group controlId="formBio" className="mb-3">
            <Form.Label>Professional Bio</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Enter bio"
            />
          </Form.Group>

          {/* Submit button */}
          <div className="d-flex justify-content-end gap-2 mt-2">
            <Button className="settings-save-btn" type="submit">
              Save Changes
            </Button>
          </div>
        </Form>
      </Card>
    </>
  );
};

export default AccountForm;
