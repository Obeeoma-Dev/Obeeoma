import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form as FormikForm, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { registerUser, clearError } from "../../store/slices/authSlice";
import { registerValidationSchema } from "./../../validation/authValidation";
import {
  Container,
  Row,
  Col,
  Button,
  Form as BootstrapForm,
  Alert,
} from "react-bootstrap";

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
                    name="confirm_password"
                    value={values.confirm_password}
                    onChange={handleChange}
                    isInvalid={
                      !!touched.confirm_password && !!errors.confirm_password
                    }
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    <ErrorMessage name="confirmPassword" />
                  </BootstrapForm.Control.Feedback>
                </BootstrapForm.Group>
                {/* Role Selection
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <ToggleButtonGroup
                    type="radio"
                    name="role"
                    value={role}
                    onChange={(val: Role) => setRole(val)}
                  >
                    <ToggleButton
                      id="employee"
                      value="employee"
                      variant={
                        role === "employee" ? "success" : "outline-success"
                      }
                      className="px-3 py-1"
                    >
                      Employee
                    </ToggleButton>
                    <ToggleButton
                      id="employer"
                      value="employer"
                      variant={
                        role === "employer" ? "success" : "outline-success"
                      }
                      className="px-3 py-1"
                    >
                      Employer
                    </ToggleButton> */}
                  {/* </ToggleButtonGroup> */}
                {/* </div> */}
                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="success"
                  size="lg"
                  className="w-100" >
                  Create Account
                </Button>
              </FormikForm>
            )}
          </Formik>
          {/* Link to Login */}
          <p className="mt-3 text-center text-muted">
            Already have an account?
            <Link to="/Login" className="text-success fw-semibold">
              {" "}
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
