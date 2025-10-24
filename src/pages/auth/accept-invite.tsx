import React from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, Button, Alert } from "react-bootstrap";
import { CheckCircle, Mail, ArrowLeft } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

const AcceptInvite: React.FC = () => {
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    navigate("/login");
  };

  const handleResendEmail = () => {
    // Navigate back to reset password page to resend email
    navigate("/reset-password-signin");
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <Card
        className="shadow-lg border-0 overflow-hidden"
        style={{ maxWidth: "600px", width: "100%" }}
      >
        <Row className="g-0">
          {/* Left Side - Success Message */}
          <Col md={12} className="p-5 bg-white text-center">
            <div className="mb-4">
              <CheckCircle 
                size={64} 
                className="text-success mb-3"
                style={{ strokeWidth: 1.5 }}
              />
            </div>
            
            <h2 className="fw-semibold mb-3 text-success">Email Sent Successfully!</h2>
            
            <Alert variant="success" className="border-0 bg-light text-start">
              <div className="d-flex align-items-start">
                <Mail size={20} className="text-success me-3 mt-1" />
                <div>
                  <h6 className="fw-semibold mb-2">Check Your Email</h6>
                  <p className="mb-2">
                    We've sent a password reset link to your email address. 
                    If you have an account with us, you should receive the email shortly.
                  </p>
                  <p className="mb-0 text-muted small">
                    <strong>Note:</strong> If you don't see the email in your inbox, 
                    please check your spam or junk folder.
                  </p>
                </div>
              </div>
            </Alert>

            <div className="mt-4">
              <Button
                variant="success"
                className="me-3 px-4 py-2 fw-semibold"
                onClick={handleResendEmail}
              >
                Resend Email
              </Button>
              
              <Button
                variant="outline-secondary"
                className="px-4 py-2 fw-semibold"
                onClick={handleBackToLogin}
              >
                <ArrowLeft size={18} className="me-2" />
                Back to Login
              </Button>
            </div>

            <div className="mt-4 pt-3 border-top">
              <p className="text-muted small mb-0">
                Didn't receive the email? Make sure you entered the correct email address 
                or contact support if you continue to have issues.
              </p>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default AcceptInvite;
