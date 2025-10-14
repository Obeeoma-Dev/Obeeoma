import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Alert,
  Spinner,
} from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../assets/Images/obeeomalogoicon4.png";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { loginUser, clearError } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);
  const [role, setRole] = useState<string>("Employee");

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleSubmit = (values: { username: string; password: string }) => {
    dispatch(
      loginUser({
        ...values,
        role,
        onSuccess: () => navigate("/employee-dashboard"),
      }),
    );
  };

  return (
    <div className="min-vh-100 d-flex flex-column justify-content-between bg-light">
      {/* Header */}
      <header className="d-flex justify-content-between align-items-center p-3 px-4 border-bottom bg-white">
        <div className="d-flex align-items-center">
          <img src={logo} alt="Obeeoma Logo" width="35" className="me-2" />
          <div>
            <h5 className="m-0 text-success fw-semibold">Obeeoma</h5>
            <small className="text-muted">A Happy Heart</small>
          </div>
        </div>
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

            {error && (
              <Alert
                variant="danger"
                onClose={() => dispatch(clearError())}
                dismissible
              >
                {error}
              </Alert>
            )}

            <Formik
              initialValues={{ username: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ handleChange, handleSubmit, values, errors, touched }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="username">
                    <Form.Control
                      type="text"
                      name="username"
                      value={values.username}
                      onChange={handleChange}
                      placeholder="Username"
                      className="py-2 border-success border-opacity-25"
                      isInvalid={touched.username && !!errors.username}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.username}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="password">
                    <Form.Control
                      type="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      placeholder="Password"
                      className="py-2 border-success border-opacity-25"
                      isInvalid={touched.password && !!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
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
                          role === "Employer" ? "success" : "outline-success"
                        }
                        className="px-3 py-1"
                      >
                        Employer
                      </ToggleButton>
                    </ToggleButtonGroup>

                    <a
                      href="/reset-password-signin"
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
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                        Signing in...
                      </>
                    ) : (
                      "Sign in"
                    )}
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
              )}
            </Formik>
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
