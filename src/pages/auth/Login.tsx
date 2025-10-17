import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  // ToggleButtonGroup,
  // ToggleButton,
  Alert,
  Spinner,
} from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { loginUser, clearError } from "../../store/slices/authSlice";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../assets/Images/obeeomalogoicon4.png";

// Validation schema for login form
const validationSchema = Yup.object({
  username: Yup.string().min(3).required("Username is required"),
  password: Yup.string().min(6).required("Password is required"),
});

const LoginPage = (): React.ReactElement => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  // Role state for toggles (Employee or Employer)
  const [role] = useState<string>("Employee");

  // Clear error on mount
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Handle login submission
  const handleSubmit = (values: { username: string; password: string }) => {
    dispatch(
      loginUser({
        ...values,
        onSuccess: () => {
          const redirectPath =
            role === "Employee"
              ? "/employee-dashboard"
              : "/employer-dashboard";
          navigate(redirectPath);
        },
      })
    );
  };

  return (
    <div className="min-vh-100 d-flex flex-column justify-content-between bg-light">
      {/* Header with logo and branding */}
      <header className="d-flex justify-content-between align-items-center p-3 px-4 border-bottom bg-white">
        <div className="d-flex align-items-center">
          <img src={logo} alt="Obeeoma Logo" width="35" className="me-2" />
          <div>
            <h5 className="m-0 text-success fw-semibold">Obeeoma</h5>
            <small className="text-muted">A Happy Heart</small>
          </div>
        </div>
      </header>

      {/* Centered login form */}
      <Container className="d-flex justify-content-center align-items-center flex-grow-1">
        <Card className="shadow-sm border-0 p-4" style={{ maxWidth: "480px", width: "100%" }}>
          <Card.Body>
            <h3 className="text-center mb-2 fw-semibold text-dark">Welcome back to Obeeoma</h3>
            <p className="text-center text-muted mb-4">Sign in to continue to your account</p>

            {/* Error alert if login fails */}
            {error && (
              <Alert variant="danger" onClose={() => dispatch(clearError())} dismissible>
                {error}
              </Alert>
            )}

            {/* Formik handles form logic */}
            <Formik
              initialValues={{ username: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ handleChange, handleSubmit, values, errors, touched }) => (
                <Form noValidate onSubmit={handleSubmit} data-testid="login-form">
                  {/* Username input */}
                  <Form.Group className="mb-3" controlId="username">
                    <Form.Control
                      type="text"
                      name="username"
                      value={values.username}
                      onChange={handleChange}
                      placeholder="Username"
                      isInvalid={touched.username && !!errors.username}
                      data-testid="username-input"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.username}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Password input */}
                  <Form.Group className="mb-3" controlId="password">
                    <Form.Control
                      type="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      placeholder="Password"
                      isInvalid={touched.password && !!errors.password}
                      data-testid="password-input"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Role selection + System Admin shortcut */}
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    {/* Employee and Employer toggles with smaller styling
                    <ToggleButtonGroup
                      type="radio"
                      name="role"
                      value={role}
                      onChange={setRole}
                      data-testid="role-toggle"
                    >
                      <ToggleButton
                        id="employee"
                        value="Employee"
                        variant={role === "Employee" ? "success" : "outline-success"}
                        className="px-2 py-1 small fw-semibold"
                      >
                        Employee
                      </ToggleButton>
                      <ToggleButton
                        id="employer"
                        value="Employer"
                        variant={role === "Employer" ? "success" : "outline-success"}
                        className="px-2 py-1 small fw-semibold"
                      >
                        Employer
                      </ToggleButton>
                    </ToggleButtonGroup> */}

                    {/* System Admin direct link (no form submission) */}
                    <Link
                      to="/system-admin"
                      className="text-success text-decoration-none small fw-semibold ms-3"
                      data-testid="system-admin-link"
                    >
                      System Admin →
                    </Link>
                  </div>

                  {/* Remember me checkbox */}
                  <Form.Check type="checkbox" label="Remember me" className="mb-3 text-muted" />

                  {/* Submit button with loading spinner */}
                  <Button
                    variant="success"
                    type="submit"
                    className="w-100 mb-3 py-2 fw-semibold"
                    disabled={isLoading}
                    data-testid="submit-button"
                  >
                    {isLoading ? (
                      <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Signing in...
                      </>
                    ) : (
                      "Sign in"
                    )}
                  </Button>

                  {/* Signup link */}
                  <div className="text-center">
                    <span className="text-muted">Don’t have an account? </span>
                    <Link to="/signup" className="text-success text-decoration-none fw-semibold">
                      Create an account
                    </Link>
                  </div>
                </Form>
              )}
            </Formik>
          </Card.Body>
        </Card>
      </Container>

      {/* Footer with links */}
      <footer className="text-center text-muted py-3 small border-top">
        © 2025 Obeeoma. All rights reserved. &nbsp;
        <Link to="#" className="text-success">Privacy Policy</Link> &nbsp;|&nbsp;
        <Link to="#" className="text-success">Terms of Service</Link> &nbsp;|&nbsp;
        <Link to="#" className="text-success">Contact Us</Link>
      </footer>
    </div>
  );
};

export default LoginPage;