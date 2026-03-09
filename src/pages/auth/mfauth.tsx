import React, { useEffect, useState } from "react";
import { Button, Card, Form, Alert, Spinner } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { setupMfa, confirmMfa } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { getDashboardRoute } from "../../utils/routing";
import logo from "./../../assets/Images/obeeomalogoword1.png";

const MfaSetupPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    mfaSetupData,
    isLoading,
    error,
    isMfaSetupConfirmed,
    tempToken, // Get tempToken from Redux state
    user, // Get user from authSlice
  } = useAppSelector((state) => state.auth);

  const [confirmationCode, setConfirmationCode] = useState("");

  // 1. Fetch QR Code data on component mount (only if not already fetched)
  useEffect(() => {
    // Only fetch if data is not already present and not confirmed
    // Don't call setupMfa here since it's already called from Login component
  }, [dispatch, mfaSetupData, isMfaSetupConfirmed]);

  // 2. Handle Confirmation Submission
  const handleConfirmMfa = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      confirmationCode.length !== 6 ||
      isLoading ||
      !mfaSetupData ||
      !tempToken
    )
      return;

    const payload = {
      temp_token: tempToken, // tempToken is now guaranteed to be string
      code: confirmationCode,
    };

    console.log("Sending MFA verification payload:", payload);

    // Dispatch the confirm thunk
    const result = await dispatch(confirmMfa(payload));

    if (confirmMfa.fulfilled.match(result)) {
      alert("MFA successfully! Redirecting...");
      // Navigation should happen here, e.g., navigate('/settings');
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmationCode(e.target.value.replace(/\D/g, "").substring(0, 6));
  };

  // RENDER STATES

  if (isMfaSetupConfirmed) {
    return (
      <Alert
        variant="success"
        className="text-center p-5"
        style={{ fontFamily: "body" }}
      >
        <h4>Multi-Factor Authentication is Active!</h4>
        <p>Your account is now protected. You can close this window.</p>
        <Button
          variant="success"
          onClick={() => {
            const dashboardRoute = getDashboardRoute(user);
            navigate(dashboardRoute, { replace: true });
          }}
        >
          CONTINUE TO DASHBOARD
        </Button>
      </Alert>
    );
  }

  if (isLoading && !mfaSetupData) {
    return (
      <div
        className="d-flex justify-content-center align-items-center vh-100"
        style={{ fontFamily: "body" }}
      >
        <Spinner animation="border" />{" "}
        <span>&nbsp; Loading MFA setup data...</span>
      </div>
    );
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 p-3"
      style={{ backgroundColor: "#f5f5f5", fontFamily: "body" }}
    >
      <Card
        className="shadow-sm p-4"
        style={{
          maxWidth: "600px",
          width: "100%",
          borderRadius: "8px",
          fontFamily: "body",
        }}
      >
        <div className="d-flex flex-column align-items-center justify-content-center mb-4">
          <img
            src={logo}
            alt="Logo"
            style={{ height: "50px", width: "auto" }}
            className="mb-1"
          />
        </div>
        <Card.Body>
          <h3
            className="text-center mb-4 fw-semibold"
            style={{ fontFamily: "heading" }}
          >
            Two-Factor Authentication
          </h3>

          {error && (
            <Alert variant="danger" style={{ fontFamily: "body" }}>
              {error}
            </Alert>
          )}

          <p
            className="text-center text-muted mb-4"
            style={{ fontFamily: "body" }}
          >
            Use the manual key below to set up Two-Factor Authentication.
          </p>

          {mfaSetupData ? (
            <div className="text-center">
              {/* Manual Secret Key - Prominently Displayed */}
              <Alert
                variant="info"
                className="p-3 mb-4"
                style={{ fontFamily: "body", fontSize: "1.1rem" }}
              >
                <strong>Manual Key:</strong>
                <br />
                <code style={{ fontSize: "1.2rem", wordBreak: "break-all" }}>
                  {mfaSetupData.secret}
                </code>
              </Alert>

              {/* Instructions */}
              <div
                className="mb-4 p-3 border rounded"
                style={{ backgroundColor: "#f8f9fa" }}
              >
                <h5>📱 How to Setup:</h5>
                <ol className="text-start">
                  <li>Install Google Authenticator on your phone</li>
                  <li>Open the app and tap "+" to add account</li>
                  <li>Choose "Enter a setup key"</li>
                  <li>
                    Account name: <code>mikeangelodonatelo@gmail.com</code>
                  </li>
                  <li>
                    Secret key: <strong>Copy the manual key above</strong>
                  </li>
                  <li>Time-based: ON</li>
                  <li>Enter the 6-digit code below</li>
                </ol>
              </div>

              <Form onSubmit={handleConfirmMfa}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="6-digit verification code"
                    value={confirmationCode}
                    onChange={handleCodeChange}
                    maxLength={6}
                    inputMode="numeric"
                    className="text-center py-2"
                    style={{
                      fontSize: "1.2rem",
                      letterSpacing: "6px",
                      fontFamily: "body",
                    }}
                    required
                    disabled={isLoading}
                  />
                  <Form.Text
                    className="text-muted"
                    style={{ fontFamily: "body" }}
                  >
                    Enter the code generated by your authenticator app to
                    confirm setup.
                  </Form.Text>
                </Form.Group>

                <Button
                  type="submit"
                  disabled={isLoading || confirmationCode.length < 6}
                  className="w-100 mt-3"
                  style={{ backgroundColor: "#22C55E", borderColor: "#22C55E" }}
                >
                  {isLoading ? (
                    <Spinner as="span" animation="border" size="sm" />
                  ) : (
                    "Confirm "
                  )}
                </Button>
              </Form>
            </div>
          ) : (
            <Alert
              variant="warning"
              className="text-center"
              style={{ fontFamily: "body" }}
            >
              Could not load MFA setup data. Please check your system
              administrator permissions.
            </Alert>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default MfaSetupPage;
