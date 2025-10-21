import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginPage = () => {
  const [role, setRole] = useState("Client");

  return (
    <div className="min-vh-100 d-flex flex-column justify-content-between bg-light">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center p-3 px-4 border-bottom bg-white">
        <div className="d-flex align-items-center">
          <img src="/logo192.png" alt="Logo" width="40" className="me-2" />
          <h5 className="m-0 text-success">Obeeoma</h5>
        </div>
        <Button variant="success" className="rounded-pill px-4">
          Create Account
        </Button>
      </div>

      {/* Main Content */}
      <Container className="flex-grow-1 my-5">
        <Row className="justify-content-center align-items-center">
          {/* Left Side - Form */}
          <Col md={6} lg={5}>
            <Card className="shadow-sm border-0">
              <Card.Body>
                <h3 className="text-center mb-2">Sign in to your account</h3>
                <p className="text-center text-muted mb-4">
                  Welcome back to Obeeoma
                </p>

                <Form>
                  <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your username"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter your email" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                    />
                  </Form.Group>

                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <ToggleButtonGroup
                      type="radio"
                      name="role"
                      value={role}
                      onChange={setRole}
                    >
                      <ToggleButton
                        id="client"
                        value="Client"
                        variant={
                          role === "Client" ? "success" : "outline-success"
                        }
                      >
                        Client
                      </ToggleButton>
                      <ToggleButton
                        id="org"
                        value="Organization"
                        variant={
                          role === "Organization"
                            ? "success"
                            : "outline-success"
                        }
                      >
                        Organization
                      </ToggleButton>
                    </ToggleButtonGroup>
                    <a
                      href="#"
                      className="text-success text-decoration-none small"
                    >
                      Forgot your password?
                    </a>
                  </div>

                  <Form.Check
                    type="checkbox"
                    label="Remember me"
                    className="mb-3"
                  />

                  <Button
                    variant="success"
                    type="submit"
                    className="w-100 mb-3"
                  >
                    Sign in
                  </Button>

                  <div className="text-center">
                    <span className="text-muted">Don't have an account? </span>
                    <a href="#" className="text-success text-decoration-none">
                      Create an account
                    </a>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* Right Side - Info */}
          <Col md={6} lg={5} className="mt-4 mt-md-0">
            <Card className="border-0 bg-success bg-opacity-10 p-4">
              <Card.Title className="fw-bold">Welcome Back</Card.Title>
              <Card.Text className="text-muted">
                Sign in to access your personalized mental health dashboard,
                connect with your care team, and continue your wellness journey.
              </Card.Text>

              <ul className="list-unstyled text-muted mt-3">
                <li>✅ Access your care plan</li>
                <li>✅ Schedule appointments</li>
                <li>✅ Message your care team</li>
              </ul>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <footer className="text-center text-muted py-3 small border-top">
        © 2025 Obeeoma. All rights reserved. &nbsp;
        <a href="#" className="text-decoration-none text-success">
          Privacy Policy
        </a>{" "}
        &nbsp;|&nbsp;
        <a href="#" className="text-decoration-none text-success">
          Terms of Service
        </a>{" "}
        &nbsp;|&nbsp;
        <a href="#" className="text-decoration-none text-success">
          Contact Us
        </a>
      </footer>
    </div>
  );
};

export default LoginPage;
