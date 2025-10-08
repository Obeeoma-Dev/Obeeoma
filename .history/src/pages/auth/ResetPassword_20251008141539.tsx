import React from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ResetPassword: React.FC = () => {
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <Card className="shadow-lg border-0 overflow-hidden" style={{ maxWidth: "900px", width: "100%" }}>
        <Row className="g-0">
          {/* Left Side */}
          <Col md={6} className="p-5 bg-white">
            <h2 className="fw-semibold mb-2">Reset Your Password</h2>
            <p className="text-muted mb-4">
              Enter the code and your new password
            </p>

            <Form>
              <Form.Group className="mb-3" controlId="formCode">
                <Form.Control
                  type="text"
                  placeholder="Enter code"
                  className="py-2"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formNewPassword">
                <Form.Control
                  type="password"
                  placeholder="New password"
                  className="py-2"
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formConfirmPassword">
                <Form.Control
                  type="password"
                  placeholder="Confirm new password"
                  className="py-2"
                />
              </Form.Group>

              <Button
                type="submit"
                variant="success"
                className="w-100 py-2 fw-semibold"
              >
                Change Password
              </Button>
            </Form>
          </Col>

          {/* Right Side */}
          <Col
            md={6}
            className="p-5 text-dark d-flex flex-column justify-content-center bg-success bg-opacity-10"
          >
            <h3 className="fw-semibold mb-4">Secure Your Account</h3>
            <p className="text-muted mb-3">
              Resetting your password ensures your account remains safe. Use a
              strong password that you haven’t used before.
            </p>
            <ul className="list-unstyled text-secondary mb-0">
              <li className="mb-2">✔ Protect your sensitive information</li>
              <li className="mb-2">✔ Access your care plan securely</li>
              <li>✔ Continue your wellness journey with peace of mind</li>
            </ul>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default ResetPassword;
