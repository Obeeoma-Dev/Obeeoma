import React, { useState } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Alert,
} from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "@/assets/Images/obeeomalogoicon4.png";

const LoginPage = () => {
  const [role, setRole] = useState("Employee");
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // ✅ Yup validation schema
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // ✅ Formik form handler
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setServerError("");
      setSuccessMessage("");

      try {
        // Example API call:
        const res = await fetch("https://obeeoma.onrender.com/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...values, role }),
        });

        if (!res.ok) throw new Error("Login failed. Check credentials.");
        const data = await res.json();

        setSuccessMessage("Login successful! Redirecting...");
        resetForm();
        // redirect or navigate after success
        // navigate("/dashboard");
      } catch (error: any) {
        setServerError(error.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-vh-100 d-flex flex-column justify-content-between bg-light">
      {/* Header */}
      <header className="d-flex justify-content-between align-items-center p-3 px-4 border-bottom bg-white">
        <div className="d-flex align-items-center">
          <img src={logo} alt="ologo" width="35" className="me-2" />
          <div>
            <h5 className="m-0 text-success fw-semibold">Obeeoma</h5>
            <small className="text-muted">A Happy Heart</small>
          </div>
        </div>
        <Button variant="success" className="rounded-pill px-4">
          <a href="signup" className="text-success text-decoration-none small">
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

            {serverError && <Alert variant="danger">{serverError}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}

            <Form noValidate onSubmit={formik.handleSubmit}>
              <Form.Group className="mb-3" controlId="username">
                <Form.Control
                  type="text"
                  placeholder="Username"
                  className={`py-2 border-success border-opacity-25 ${
                    formik.touched.username && formik.errors.username
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("username")}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.username}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  className={`py-2 border-success border-opacity-25 ${
                    formik.touched.password && formik.errors.password
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("password")}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.password}
                </Form.Control.Feedback>
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
                      role === "Employer" ? "success" : "outline-success" }
                    className="px-3 py-1" >
                    Employer
                  </ToggleButton>
                </ToggleButtonGroup>

                <a href="reset-password-signin"
                  className="text-success text-decoration-none small" >
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
                disabled={formik.isSubmitting}
                className="w-100 mb-3 py-2 fw-semibold"
              >
                {formik.isSubmitting ? "Signing in..." : "Sign in"}
              </Button>

              <div className="text-center">
                <span className="text-muted">Don’t have an account? </span>
                <a
                  href="/signup"
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
