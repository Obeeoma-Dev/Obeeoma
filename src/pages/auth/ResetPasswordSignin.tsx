import React from "react";
import { Row, Col, Form, Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ResetPassword: React.FC = () => {
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <Card
        className="shadow-lg border-0 overflow-hidden"
        style={{ maxWidth: "900px", width: "100%" }}
      >
        <Row className="g-0">
          {/* Left Side */}
          <Col md={6} className="p-5 bg-white">
            <h2 className="fw-semibold mb-2">Reset Password to Sign in</h2>
            <p className="text-muted mb-4">Send code to email</p>

            <Form>
              <Form.Group className="mb-4" controlId="formEmail">
                <Form.Control
                  type="email"
                  placeholder="Email address"
                  className="py-2"
                />
              </Form.Group>

              <Button
                type="submit"
                variant="success"
                className="w-100 py-2 fw-semibold"
              >
                Send code
              </Button>
            </Form>

            <p className="text-center text-muted mt-4">
              Didn’t receive any code?{" "}
              <Button
                variant="link"
                className="p-0 text-success text-decoration-none"
              >
                Send code again
              </Button>
            </p>
          </Col>

          {/* Right Side */}
          <Col
            md={6}
            className="p-5 text-dark d-flex flex-column justify-content-center bg-success bg-opacity-10"
          >
            <h3 className="fw-semibold mb-4">Reset & Continue</h3>
            <p className="text-muted mb-3">
              Sign in to access your personalized mental health dashboard,
              connect with your care team, and continue your wellness journey.
            </p>

            <ul className="list-unstyled text-secondary mb-0">
              <li className="mb-2">✔ Access your care plan</li>
              <li className="mb-2">✔ Trigger crisis hotlines</li>
              <li>✔ Get easy assessment through Sana</li>
            </ul>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default ResetPassword;
