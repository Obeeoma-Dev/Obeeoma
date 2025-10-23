import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form as FormikForm, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { registerUser, clearError } from "../../store/slices/authSlice";
import { registerValidationSchema } from "./../../validation/authValidation";
import {
  Container, Row, Col, Button, Form as BootstrapForm, Alert
} from "react-bootstrap";
import AuthLayout from "../../components/shared/AuthLayout";

// Define allowed roles
type Role = "employee" | "employer";

// Initial form values
type RegisterFormValues = {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
};

const Register: React.FC = () => {
  const [role] = useState<Role>("employee");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { error } = useSelector((state: RootState) => state.auth);

  const initialValues: RegisterFormValues = {
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  };

  const handleSubmit = (values: RegisterFormValues) => {
    const credentials = {
      ...values,
      role,
    };
    dispatch(
      registerUser({
        ...credentials,
        onSuccess: () => navigate("/login"),
      })
    );
  };

  return (
    <AuthLayout>
      <Container fluid className="d-flex align-items-center justify-content-center">
        <Row className="shadow bg-white rounded-lg overflow-hidden w-100"
          style={{ maxWidth: 900 }}>
          {/* Left Side: Form */}
          <Col md={6} className="p-4">
            <h2 className="mb-3">Create your account</h2>
            <p className="mb-4 text-muted">
              Join our community of mental health professionals and patients
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
              validationSchema={registerValidationSchema}
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
                      name="username"
                      value={values.username}
                      onChange={handleChange}
                      isInvalid={!!touched.username && !!errors.username}
                    />
                    <BootstrapForm.Control.Feedback type="invalid">
                      <ErrorMessage name="username" />
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
                      name="confirm_password"
                      value={values.confirm_password}
                      onChange={handleChange}
                      isInvalid={
                        !!touched.confirm_password && !!errors.confirm_password
                      }
                    />
                    <BootstrapForm.Control.Feedback type="invalid">
                      <ErrorMessage name="confirm_password" />
                    </BootstrapForm.Control.Feedback>
                  </BootstrapForm.Group>
                  {/* Submit Button */}
                  <Button
                    type="submit" variant="success" size="lg" className="w-100">
                    Create Account
                  </Button>
                </FormikForm>
              )}
            </Formik>
            
            <div className="text-center mt-3">
              <span className="text-muted">Already have an account? </span>
              <Link to="/login" className="text-success text-decoration-none fw-semibold">
                Sign in
              </Link>
            </div>
          </Col>
          
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
    </AuthLayout>
  );
};

export default Register;
