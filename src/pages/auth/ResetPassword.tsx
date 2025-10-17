import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { resetPassword, clearError } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
// Assuming you have 'resetPasswordValidationSchema' correctly defined
import { resetPasswordValidationSchema } from "./../../validation/authValidation";
import { Formik } from "formik";
import { Row, Col, Form, Button, Card, Alert, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ResetPassword: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  // Ensure the error state is cleared on mount
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  // The type definition for handleSubmit payload should match the Formik initialValues and the Redux action payload
  const handleSubmit = (values: {
    newPassword: string;
    confirmNewPassword: string;

  }) => {
    dispatch(
      resetPassword({
        ...values,

        onSuccess: () => navigate("/login"),
      })
    );
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <Card
        className="shadow-lg border-0 overflow-hidden"
        style={{ maxWidth: "900px", width: "100%" }}
      >
        <Row className="g-0">
          {/* Left Side (Form) */}
          <Col md={6} className="p-5 bg-white">
            <h2 className="fw-semibold mb-2">Reset Your Password</h2>
            <p className="text-muted mb-4">
              Enter your new password
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
              initialValues={{
                newPassword: "",
                confirmNewPassword: "",
                // You might need to add code/token fields here if they are part of the form
              }}
              validationSchema={resetPasswordValidationSchema}
              onSubmit={handleSubmit}
            >
              {({ handleChange, handleSubmit, values, errors, touched }) => (
                <Form noValidate onSubmit={handleSubmit}>

                  {/* New Password Field */}
                  <Form.Group className="mb-3" controlId="formNewPassword">
                    <Form.Label visuallyHidden>New Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="New Password"
                      className="py-2"
                      name="newPassword" 
                      value={values.newPassword} 
                      onChange={handleChange} 
                      isInvalid={touched.newPassword && !!errors.newPassword}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.newPassword}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Confirm New Password Field */}
                  <Form.Group className="mb-4" controlId="formConfirmPassword">
                    <Form.Label visuallyHidden>Confirm New Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm New Password"
                      className="py-2"
                      name="confirmNewPassword" 
                      value={values.confirmNewPassword} 
                      onChange={handleChange} 
                      isInvalid={touched.confirmNewPassword && !!errors.confirmNewPassword}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.confirmNewPassword}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Submit Button */}
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
                        Resetting Password...
                      </>
                    ) : (
                      "Change Password"
                    )}
                  </Button>
                </Form>
              )}
            </Formik>
          </Col>

          {/* Right Side (Info Panel) */}
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