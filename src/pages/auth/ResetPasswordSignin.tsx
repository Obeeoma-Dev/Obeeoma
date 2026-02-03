import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  Button,
  Form as BootstrapForm,
  Alert,
  Spinner,
} from "react-bootstrap";
import logo from "./../../assets/Images/obeeomalogoword1.png";

const customStyles = {
  primaryColor: "#22C55E", // Used for links and accents
};

// --- Component Definition ---

const ResetPasswordSignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const navigate = useNavigate();

  // validation and submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError("Email is required");
      return;
    }

    setIsLoading(true);
    try {
      const API_URL = `${import.meta.env.VITE_API_BASE_URL}/v1/auth/reset-password/`;

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message ||
            `Failed to send email with status: ${response.status}`,
        );
      }

      setIsEmailSent(true);
      // Store email for OTP verification and navigate
      localStorage.setItem("resetPasswordEmail", email);
      navigate("/otp-verify");
    } catch (err: unknown) {
      console.error("Forgot Password Error:", err);

      let errorMessage = "An unexpected error occurred. Please try again.";

      // Narrow the type to access the 'message' property
      if (err instanceof Error) {
        errorMessage = err.message;
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = () => {
    setError(null); // Clear previous error
    setIsEmailSent(false);
    setIsLoading(true);

    // Simulate API call for resend
    setTimeout(() => {
      setIsLoading(false);
      setIsEmailSent(true);
      // NOTE: In a real app, you would typically call handleSubmit or a similar function here.
    }, 1500);
  };

  return (
    // 1. Full Page Container with positioning for the fixed footer
    <div
      style={{
        backgroundColor: "#f5f5f5",
        height: "100vh",
        overflow: "auto",
        paddingBottom: "80px",
      }}
      className="d-flex justify-content-center align-items-center"
    >
      <Container>
        <div className="d-flex justify-content-center">
          <Card
            className="shadow-sm border-0 p-4"
            style={{
              maxWidth: "600px", // Card width limit
              width: "100%",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Card.Body>
              {/* Header and Logo */}
              <div
                className="d-flex flex-column align-items-center justify-content-center mb-4"
                style={{ fontFamily: "heading" }}
              >
                <img
                  src={logo}
                  alt="Obeeoma Logo"
                  style={{
                    height: "50px",
                    width: "auto",
                  }}
                  className="mb-1"
                />
              </div>
              <h3
                className="display-6 fw-bold mb-1"
                style={{
                  fontFamily: "heading",
                  textAlign: "center",
                  fontSize: "24px",
                }}
              >
                Reset Password to Sign in
              </h3>
              <p
                className="text-muted mb-4 "
                style={{
                  fontFamily: "heading",
                  textAlign: "center",
                  fontSize: "14px",
                }}
              >
                Send code to email
              </p>

              {/* Error Alert (Only one is needed) */}
              {error && (
                <Alert variant="danger" className="py-2">
                  {error}
                </Alert>
              )}

              {/* Bootstrap Form (Only one is needed) */}
              <BootstrapForm noValidate onSubmit={handleSubmit}>
                {/* Email Field */}
                <BootstrapForm.Group className="mb-4">
                  <BootstrapForm.Control
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="py-2"
                    isInvalid={!!error}
                    style={
                      error
                        ? {
                            borderColor: "red",
                            borderWidth: "1.5px",
                            fontFamily: "body",
                          }
                        : {}
                    }
                  />
                  {/* Custom Error Message Display based on your image */}
                  {error && (
                    <div className="invalid-feedback d-block small mt-1 text-danger">
                      {error}
                    </div>
                  )}
                </BootstrapForm.Group>

                <Button
                  type="submit"
                  className="w-100 mb-3 py-2 fw-semibold"
                  disabled={isLoading || isEmailSent}
                  style={{
                    backgroundColor: customStyles.primaryColor,
                    borderColor: customStyles.primaryColor,
                    color: "white",
                    boxShadow: "none",
                    fontFamily: "body",
                  }}
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
                        style={{ fontFamily: "body" }}
                      />
                      Sending...
                    </>
                  ) : (
                    "Send Code"
                  )}
                </Button>
              </BootstrapForm>

              {/* Resend Code */}
              <div className="text-center mt-3">
                <span
                  className="text-center text-muted small"
                  style={{ fontFamily: "body" }}
                >
                  Didn't receive any code?{" "}
                </span>
                <Link
                  onClick={handleResendCode}
                  style={{
                    color: customStyles.primaryColor,
                    textDecoration: "none",
                    fontWeight: "500",
                    cursor: "pointer",
                    fontFamily: "body",
                  }}
                  to="#" // Prevent full page reload on click
                  className="small"
                >
                  Send Code again
                </Link>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>

      {/* --- Footer Component (Only one is needed) --- */}
      <footer
        className="text-center text-muted py-3 small border-top"
        style={{
          position: "fixed", // at the bottom of the viewport
          bottom: "0",
          width: "100%",
          backgroundColor: "#f5f5f5",
          fontSize: "0.8rem",
          zIndex: 1000,
          fontFamily: "body",
        }}
      >
        <div className="d-flex justify-content-between align-items-center container">
          <div className="footer-copyright">
            &copy; 2025 Obeeoma. All rights reserved.
          </div>

          <div className="d-flex align-items-center">
            <Link
              className="text-muted text-decoration-none me-3"
              style={{ fontFamily: "body" }}
              role="button"
              to="/privacy-policy"
            >
              Privacy Policy
            </Link>

            <a
              href="/terms"
              className="text-muted text-decoration-none me-3"
              style={{ fontFamily: "body" }}
            >
              Terms of Service
            </a>

            <a
              href="/contact-us"
              className="text-muted text-decoration-none"
              style={{ fontFamily: "body" }}
            >
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ResetPasswordSignIn;
