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
  primaryColor: "#3CB371", // Used for links and accents
};

// --- Component Definition ---

const ResetPasswordSignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  // FIX: Separate state variables for distinct loading indicators
  const [isSendingCode, setIsSendingCode] = useState(false); // For initial Send Code button
  const [isResendingCode, setIsResendingCode] = useState(false); // For Resend Code link

  const navigate = useNavigate();

  // Unified function for sending/resending the password reset code
  const sendPasswordResetCode = async (
    e?: React.FormEvent,
    isResend: boolean = false
  ) => {
    e?.preventDefault();
    setError(null);

    if (!email) {
      setError("Email is required");
      return;
    }

    // Set the appropriate loading state based on whether it's an initial send or a resend
    if (isResend) {
      setIsResendingCode(true);
    } else {
      setIsSendingCode(true);
    }

    try {
      const API_URL = "https://api-0904.onrender.com/api/v1/auth/reset-password/";

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
            `Failed to send code with status: ${response.status}`
        );
      }

      // Navigate only if the API call is successful and an email is sent, 
      // but only when it's the *initial* send. Resend should not navigate.
      if (!isResend) {
          navigate("/otp-verify");
      }
      
    } catch (err: unknown) {
      console.error("Forgot Password Error:", err);

      let errorMessage =
        "An unexpected error occurred. Please try again.";

      if (err instanceof Error) {
        errorMessage = err.message;
      }

      setError(errorMessage);
    } finally {
      // Clear the appropriate loading state
      if (isResend) {
        setIsResendingCode(false);
      } else {
        setIsSendingCode(false);
      }
    }
  };

  /**
   * Handles the "Send Code again" link click.
   */
  const handleResendCode = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    // Pass 'true' to indicate this is a resend action
    sendPasswordResetCode(undefined, true);
  };

  // --- JSX RENDER ---
  return (
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
              maxWidth: "600px",
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

              {/* Error Alert */}
              {error && (
                <Alert variant="danger" className="py-2">
                  {error}
                </Alert>
              )}

              {/* Bootstrap Form */}
              {/* Pass isResend=false (default) for initial form submission */}
              <BootstrapForm noValidate onSubmit={(e) => sendPasswordResetCode(e, false)}> 
                {/* Email Field */}
                <BootstrapForm.Group className="mb-4">
                  <BootstrapForm.Control
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="py-2"
                    isInvalid={!!error && !email}
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
                  {/* Custom Error Message Display */}
                  {error && (
                    <div className="invalid-feedback d-block small mt-1 text-danger">
                      {error}
                    </div>
                  )}
                </BootstrapForm.Group>

                <Button
                  type="submit"
                  className="w-100 mb-3 py-2 fw-semibold"
                  // Use the specific state for this button
                  disabled={isSendingCode} 
                  style={{
                    backgroundColor: customStyles.primaryColor,
                    borderColor: customStyles.primaryColor,
                    color: "white",
                    boxShadow: "none",
                    fontFamily: "body",
                  }}
                >
                  {/* Use the specific state for this spinner/text */}
                  {isSendingCode ? ( 
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
                  // Use the specific state for this link
                  className={`small ${isResendingCode ? "disabled-link" : ""}`} 
                  style={{
                    color: customStyles.primaryColor,
                    textDecoration: "none",
                    fontWeight: "500",
                    // Use the specific state for disabling
                    cursor: isResendingCode ? "not-allowed" : "pointer", 
                    opacity: isResendingCode ? 0.6 : 1,
                    fontFamily: "body",
                  }}
                  to="#"
                >
                  {/* Use the specific state for this spinner/text */}
                  {isResendingCode ? ( 
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-1"
                        style={{ fontFamily: "body" }}
                      />
                      Resending...
                    </>
                  ) : (
                    "Send Code again"
                  )}
                </Link>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>

      {/* --- Footer Component --- */}
      <footer
        className="text-center text-muted py-3 small border-top"
        style={{
          position: "fixed",
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
              to="/system-admin"
            >
              Privacy Policy
            </Link>

            <a
              href="#"
              className="text-muted text-decoration-none me-3"
              style={{ fontFamily: "body" }}
            >
              Terms of Service
            </a>

            <a
              href="#"
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

