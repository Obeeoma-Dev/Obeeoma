import React, { useState, useEffect } from "react";
import { Form, Button, Card, Row, Col, Spinner, Alert } from "react-bootstrap";
import { adminAPI } from "../../../api/apiConfig";

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
    name: "",
    title: "",
    email: "",
    phone: "",
    bio: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Fetch account settings on component mount
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await adminAPI.getSystemSettings();
        if (!cancelled) {
          const data = res?.data ?? res ?? {};
          // Handle system settings response structure
          if (Array.isArray(data)) {
            const accountData =
              // eslint-disable-next-line @typescript-eslint/no-explicit-any --- IGNORE ---
              data.find((setting: any) => setting.key === "account") || {};
            setAccount({
              name: accountData.name || "",
              title: accountData.title || "",
              email: accountData.email || "",
              phone: accountData.phone || "",
              bio: accountData.bio || "",
            });
          } else {
            // If it's an object, use account properties directly
            setAccount({
              name: data.name || "",
              title: data.title || "",
              email: data.email || "",
              phone: data.phone || "",
              bio: data.bio || "",
            });
          }
        }
      } catch (e: unknown) {
        if (!cancelled)
          setError(
            e instanceof Error ? e.message : "Failed to load account settings",
          );
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

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

  // Save account settings to backend
  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      setSuccess(null);
      await adminAPI.updateSystemSettings({
        key: "account",
        ...account,
      });
      setSuccess("Account settings saved successfully!");
    } catch (e: unknown) {
      setError(
        e instanceof Error ? e.message : "Failed to save account settings",
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card className="p-4 shadow-sm">
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: 200 }}
        >
          <Spinner animation="border" />
        </div>
      </Card>
    );
  }

  return (
    // Card layout for visual grouping
    <Card className="p-4 shadow-sm">
      <h4 className="mb-4">Account Information</h4>

      {/* Error and Success Alerts */}
      {error && (
        <Alert variant="danger" className="mb-3">
          {error}
        </Alert>
      )}
      {success && (
        <Alert variant="success" className="mb-3">
          {success}
        </Alert>
      )}

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
        <Button variant="success" onClick={handleSave} disabled={saving}>
          {saving ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-2"
              />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>
    </Card>
  );
};

export default AccountForm;
