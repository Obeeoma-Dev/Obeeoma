import React, { useState } from "react";
import {
  Container,
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
      <header className="d-flex justify-content-between align-items-center p-3 px-4 border-bottom bg-white">
        <div className="d-flex align-items-center">
          <img src="/" alt="Logo" width="35" className="me-2" />
          <div>
            <h5 className="m-0 text-success fw-semibold">Obeeoma</h5>
            <small className="text-muted">A Happy Heart</small>
          </div>
        </div>
        <Button variant="success" className="rounded-pill px-4">
          <a
            href="ResetPasswordSignin"
            className="text-success text-decoration-none small"
          >
            Create Account
          </a>
        </Button>
      </header>

      {/* Center Form */}
      <Container className="d-flex justify-content-center align-items-center flex-grow-1">
        <Card
          className="shadow-sm border-0 p-4"
          style={{ maxWidth: "480px", width: "100%" }}
        >
          <Card.Body>
            <h3 className="text-center mb-2 fw-semibold text-dark">
              Sign in to your account
            </h3>
            <p className="text-center text-muted mb-4">
              Welcome back to Obeeoma
            </p>

            <Form>
              <Form.Group className="mb-3" controlId="username">
                <Form.Control
                  type="text"
                  placeholder="Username"
                  className="py-2 border-success border-opacity-25"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Control
                  type="email"
                  placeholder="Email address"
                  className="py-2 border-success border-opacity-25"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  className="py-2 border-success border-opacity-25"
                />
              </Form.Group>

              {/* Role + Forgot Password */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <ToggleButtonGroup
                  type="radio"
                  name="role"
                  value={role}
                  onChange={setRole}
                >
                  <ToggleButton
                    id="employee"
                    value="Employee"
                    variant={
                      role === "Employee" ? "success" : "outline-success"
                    }
                    className="px-3 py-1"
                  >
                    Employee
                  </ToggleButton>
                  <ToggleButton
                    id="employer"
                    value="Employer"
                    variant={
                      role === "Employer" ? "success" : "outline-success"
                    }
                    className="px-3 py-1"
                  >
                    Employer
                  </ToggleButton>
                </ToggleButtonGroup>

                <a
                  href="ResetPasswordSignin"
                  className="text-success text-decoration-none small"
                >
                  Forgot password?
                </a>
              </div>

              <Form.Check
                type="checkbox"
                label="Remember me"
                className="mb-3 text-muted"
              />

              <Button
                variant="success"
                type="submit"
                className="w-100 mb-3 py-2 fw-semibold"
              >
                Sign in
              </Button>

              <div className="text-center">
                <span className="text-muted">Don’t have an account? </span>
                <a
                  href="Register"
                  className="text-success text-decoration-none fw-semibold"
                >
                  Create an account
                </a>
              </div>
            </Form>
          </Card.Body>
        </Card>
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
