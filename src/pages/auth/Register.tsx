import React, { useState } from "react";
// React Router for navigation
import { Link } from "react-router-dom";
// Formik for form state management and validation
import { Formik, Form as FormikForm, ErrorMessage } from "formik";
// Yup for schema validation
import * as Yup from "yup";
// Bootstrap components for styling
import {
  Container,
  Row,
  Col,
  Button,
  Form as BootstrapForm,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";

// Define allowed roles
type Role = "Employee" | "Employer";

// Validation schema using Yup
const validationSchema = Yup.object({
  userName: Yup.string().required("User name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

const Register: React.FC = () => {
  // Role state for toggle buttons
  const [role, setRole] = useState<Role>("Employee");

  // Initial form values
  const initialValues = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  // Handle form submission
  const handleSubmit = (values: typeof initialValues) => {
    console.log("Register submitted:", { ...values, role });
  };

  return (
    <Container
      fluid
      className="min-vh-100 d-flex align-items-center justify-content-center bg-light"
    >
      <Row
        className="shadow bg-white rounded-lg overflow-hidden w-100"
        style={{ maxWidth: 900 }}
      >
        {/* Left Side: Form */}
        <Col md={6} className="p-4">
          <h2 className="mb-3">Create your account</h2>
          <p className="mb-4 text-muted">
            Join our community of mental health professionals and patients
          </p>

          <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <FormikForm noValidate onSubmit={handleSubmit}>
                {/* User Name Field */}
                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>User Name</BootstrapForm.Label>
                  <BootstrapForm.Control
                    type="text"
                    name="userName"
                    value={values.userName}
                    onChange={handleChange}
                    isInvalid={!!touched.userName && !!errors.userName}
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    <ErrorMessage name="userName" />
                  </BootstrapForm.Control.Feedback>
                </BootstrapForm.Group>

                {/* Email Field */}
                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>Email</BootstrapForm.Label>
                  <BootstrapForm.Control
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={!!touched.email && !!errors.email}
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    <ErrorMessage name="email" />
                  </BootstrapForm.Control.Feedback>
                </BootstrapForm.Group>

                {/* Password Field */}
                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>Password</BootstrapForm.Label>
                  <BootstrapForm.Control
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    isInvalid={!!touched.password && !!errors.password}
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    <ErrorMessage name="password" />
                  </BootstrapForm.Control.Feedback>
                </BootstrapForm.Group>

                {/* Confirm Password Field */}
                <BootstrapForm.Group className="mb-4">
                  <BootstrapForm.Label>Confirm Password</BootstrapForm.Label>
                  <BootstrapForm.Control
                    type="password"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    isInvalid={
                      !!touched.confirmPassword && !!errors.confirmPassword
                    }
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    <ErrorMessage name="confirmPassword" />
                  </BootstrapForm.Control.Feedback>
                </BootstrapForm.Group>

                {/* Role Selection */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <ToggleButtonGroup
                    type="radio"
                    name="role"
                    value={role}
                    onChange={(val: Role) => setRole(val)}
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
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="success"
                  size="lg"
                  className="w-100"
                >
                  Create Account
                </Button>
              </FormikForm>
            )}
          </Formik>

          {/* Link to Login */}
          <p className="mt-3 text-center text-muted">
            Already have an account?{" "}
            <Link to="/Login" className="text-success fw-semibold">
              Sign in
            </Link>
          </p>
        </Col>

        {/* Right Side: Info Panel */}
        <Col
          md={6}
          className="bg-success bg-opacity-25 p-4 d-flex flex-column justify-content-center"
        >
          <h3 className="mb-4 fw-semibold">Begin Your Wellness Journey</h3>
          <p className="text-muted mb-4">
            Creating an account gives you access to personalized mental health
            resources, secure communication with healthcare providers, and tools
            to track your progress.
          </p>
          <ul className="text-secondary" style={{ listStyle: "none" }}>
            <li>✔ Personalized care plans</li>
            <li>✔ Secure messaging with providers</li>
            <li>✔ Progress tracking tools</li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
