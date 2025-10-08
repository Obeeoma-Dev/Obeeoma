import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Alert,
  Form as BootstrapForm,
  InputGroup,
  Spinner,
} from "react-bootstrap";

type Role = "Employee" | "Employer";

const validationSchema = Yup.object({
  userName: Yup.string().required("User name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

const Register: React.FC = () => {
  const [role, setRole] = useState<Role>("Employee");

  const initialValues = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = (values: typeof initialValues) => {
    // Submit registration with values and role
    console.log("Register submitted:", { ...values, role });
  };

  return (
    <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <Row className="shadow bg-white rounded-lg overflow-hidden w-100" style={{ maxWidth: 900 }}>
        {/* Left Side */}
        <Col md={6} className="p-4">
          <h2 className="mb-3">Create your account</h2>
          <p className="mb-4 text-muted">
            Join our community of mental health professionals and patients
          </p>

          <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={handleSubmit}>
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <FormikForm noValidate onSubmit={handleSubmit}>
                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>User Name</BootstrapForm.Label>
                  <BootstrapForm.Control
                    type="text"
                    name="userName"
                    value={values.userName}
                    onChange={handleChange}
                    isInvalid={!!touched.userName && !!errors.userName}
                    aria-describedby="userName-label"
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    <ErrorMessage name="User Name" />
                  </BootstrapForm.Control.Feedback>
                </BootstrapForm.Group>
                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>Email</BootstrapForm.Label>
                  <BootstrapForm.Control
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={!!touched.email && !!errors.email}
                    aria-describedby="email-label"
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    <ErrorMessage name="email" />
                  </BootstrapForm.Control.Feedback>
                </BootstrapForm.Group>

                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>Password</BootstrapForm.Label>
                  <BootstrapForm.Control
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    isInvalid={!!touched.password && !!errors.password}
                    aria-describedby="password-label"
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    <ErrorMessage name="password" />
                  </BootstrapForm.Control.Feedback>
                </BootstrapForm.Group>

                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>Confirm Password</BootstrapForm.Label>
                  <BootstrapForm.Control
                    type="password"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    isInvalid={!!touched.confirmPassword && !!errors.confirmPassword}
                    aria-describedby="confirmPassword-label"
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    <ErrorMessage name="confirmPassword" />
                  </BootstrapForm.Control.Feedback>
                </BootstrapForm.Group>

                <BootstrapForm.Group className="mb-4">
                  <BootstrapForm.Label>I am an:</BootstrapForm.Label>
                  <div>
                    <BootstrapForm.Check
                      type="radio"
                      id="roleEmployee"
                      label="Employee"
                      name="role"
                      value="Employee"
                      checked={role === "Employee"}
                      onChange={() => setRole("Employee")}
                      inline
                    />
                    <BootstrapForm.Check
                      type="radio"
                      id="roleEmployer"
                      label="Employer"
                      name="role"
                      value="Employer"
                      checked={role === "Employer"}
                      onChange={() => setRole("Employer")}
                      inline
                    />
                  </div>
                </BootstrapForm.Group>

                <Button type="submit" variant="success" size="lg" className="w-100">
                  Create Account
                </Button>
              </FormikForm>
            )}
          </Formik>

          <p className="mt-3 text-center text-muted">
            Already have an account?{" "}
            <Link to="/Login" className="text-success fw-semibold">
              Sign in
            </Link>
          </p>
        </Col>

        {/* Right Side */}
        <Col md={6} className="bg-success bg-opacity-25 p-4 d-flex flex-column justify-content-center">
          <h3 className="mb-4 fw-semibold">Begin Your Wellness Journey</h3>
          <p className="text-muted mb-4">
            Creating an account gives you access to personalized mental health resources, secure communication with healthcare providers,
            and tools to track your progress.
          </p>
          <ul className="text-secondary">
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
