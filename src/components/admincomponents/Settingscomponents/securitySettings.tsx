import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Card, Alert, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faEye as faEyeRegular } from "@fortawesome/free-regular-svg-icons";
import { Shield, Monitor, Smartphone, KeyRound, Check, RotateCcw } from "lucide-react";

// Password validation rules matching authValidation.ts
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

export interface SecuritySettingsState {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  twoFactorEnabled: boolean;
  currentSession: string;
  previousSession: string;
}

const SecuritySettings: React.FC = () => {
  // Local state with placeholder data
  const [settings, setSettings] = useState<SecuritySettingsState>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: false,
    currentSession: "Active Now",
    previousSession: "11/21/2023, 09:45 AM",
  });

  // Password visibility states
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Feedback state
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  
  // Track if form has changes
  const [hasChanges, setHasChanges] = useState(false);
  
  // Track original 2FA state
  const [originalTwoFactorEnabled, setOriginalTwoFactorEnabled] = useState(false);

  // Track changes
  useEffect(() => {
    const hasUnsavedChanges = 
      settings.twoFactorEnabled !== originalTwoFactorEnabled ||
      settings.currentPassword !== "" ||
      settings.newPassword !== "" ||
      settings.confirmPassword !== "";
    setHasChanges(hasUnsavedChanges);
  }, [settings, originalTwoFactorEnabled]);

  // Update original 2FA state after first render
  useEffect(() => {
    setOriginalTwoFactorEnabled(settings.twoFactorEnabled);
  }, []);

  // Handle input changes for password fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Toggle two-factor authentication
  const handleToggle2FA = () => {
    setSettings((prev) => ({
      ...prev,
      twoFactorEnabled: !prev.twoFactorEnabled,
    }));
  };

  // Validate password strength
  const validatePassword = (password: string): string | null => {
    if (!password) return null;
    if (password.length < 8) {
      return "Password must be at least 8 characters";
    }
    if (!passwordRules.test(password)) {
      return "Password must contain 1 uppercase, 1 lowercase, and 1 number";
    }
    return null;
  };

  // Cancel handler - reset form
  const handleCancel = useCallback(() => {
    setSettings((prev) => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }));
    setSaveSuccess(false);
    setSaveError("");
  }, []);

  // Save handler
  const handleSave = async () => {
    setSaveSuccess(false);
    setSaveError("");

    // Validate current password if new password is being set
    if (settings.newPassword && !settings.currentPassword) {
      setSaveError("Please enter your current password.");
      return;
    }

    // Validate new password strength
    if (settings.newPassword) {
      const passwordError = validatePassword(settings.newPassword);
      if (passwordError) {
        setSaveError(passwordError);
        return;
      }
    }

    // Validate password match
    if (
      settings.newPassword &&
      settings.newPassword !== settings.confirmPassword
    ) {
      setSaveError("Passwords do not match.");
      return;
    }

    setIsSaving(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      console.log("Saving security settings:", {
        twoFactorEnabled: settings.twoFactorEnabled,
        passwordChanged: !!settings.newPassword,
      });
      
      // Clear password fields after successful save
      setSettings((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
      
      // Update original 2FA state
      setOriginalTwoFactorEnabled(settings.twoFactorEnabled);
      setHasChanges(false);
      setSaveSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch {
      setSaveError("Failed to save settings. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card className="settings-card-compact shadow-sm border-0">
      <Card.Header className="fw-semibold mb-3 ps-0">
        Security Settings
      </Card.Header>
      <Card.Body>
        {/* Quick Actions */}
        <div className="mb-4">
          <h6 className="fw-semibold mb-3 text-muted">QUICK ACTIONS</h6>
          <div className="d-flex gap-3 flex-wrap">
            <Link
              to="/change-password"
              className="btn btn-outline-secondary d-flex align-items-center"
            >
              <KeyRound size={16} className="me-2" />
              Change Password
            </Link>
          </div>
        </div>

        {/* Success message */}
        {saveSuccess && (
          <Alert
            variant="success"
            onClose={() => setSaveSuccess(false)}
            dismissible
          >
            Security settings saved successfully.
          </Alert>
        )}

        {/* Error message */}
        {saveError && (
          <Alert variant="danger" onClose={() => setSaveError("")} dismissible>
            {saveError}
          </Alert>
        )}

        {/* Change Password Section */}
        <div className="mb-4">
          <h6 className="fw-semibold mb-3">Change Password</h6>
          <Form.Group className="mb-3">
            <Form.Label className="small fw-500">Current Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={showCurrentPassword ? "text" : "password"}
                name="currentPassword"
                value={settings.currentPassword}
                onChange={handleChange}
                placeholder="Enter current password"
              />
              <InputGroup.Text
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                style={{ cursor: "pointer", backgroundColor: "white" }}
              >
                <FontAwesomeIcon
                  icon={showCurrentPassword ? faEyeSlash : faEyeRegular}
                  style={{ color: "#3CB371" }}
                />
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="small fw-500">New Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                value={settings.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
              />
              <InputGroup.Text
                onClick={() => setShowNewPassword(!showNewPassword)}
                style={{ cursor: "pointer", backgroundColor: "white" }}
              >
                <FontAwesomeIcon
                  icon={showNewPassword ? faEyeSlash : faEyeRegular}
                  style={{ color: "#3CB371" }}
                />
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-0">
            <Form.Label className="small fw-500">
              Confirm New Password
            </Form.Label>
            <InputGroup>
              <Form.Control
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={settings.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
              />
              <InputGroup.Text
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{ cursor: "pointer", backgroundColor: "white" }}
              >
                <FontAwesomeIcon
                  icon={showConfirmPassword ? faEyeSlash : faEyeRegular}
                  style={{ color: "#3CB371" }}
                />
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
        </div>

        {/* Two-Factor Authentication Section */}
        <div className="mb-4">
          <h6 className="fw-semibold mb-3">Two-Factor Authentication</h6>
          <div
            className="p-3 border rounded-2 d-flex align-items-center justify-content-between"
            style={{ backgroundColor: "#f8f9fa" }}
          >
            <div className="d-flex align-items-center">
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: "#eafaf1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 16,
                }}
              >
                <Shield size={24} color="#3CB371" />
              </div>
              <div>
                <div className="fw-semibold">Enhance your account security</div>
                <div className="small text-muted">
                  Add an extra layer of protection to your account
                </div>
              </div>
            </div>
            <Form.Check
              type="switch"
              id="two-factor-auth"
              checked={settings.twoFactorEnabled}
              onChange={handleToggle2FA}
              style={{ transform: "scale(1.2)" }}
            />
          </div>
        </div>

        {/* Login Sessions Section */}
        {/* <div className="mb-4">
          <h6 className="fw-semibold mb-3">Login Sessions</h6>

          {/* Current Session */}
          {/* <div className="mb-3">
            <div className="small text-muted mb-2 fw-semibold">
              CURRENT SESSION
            </div>
            <div className="p-3 border rounded-2 d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 40,
                    background: "#eafaf1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 12,
                  }}
                >
                  <Monitor size={20} color="#3CB371" />
                </div>
                <div>
                  <div className="fw-semibold">Chrome on Windows</div>
                  <div className="small text-muted">
                    Lagos, Nigeria · Active now
                  </div>
                </div>
              </div>
              <Button
                variant="success"
                size="sm"
                style={{
                  borderRadius: 20,
                  padding: "6px 12px",
                  backgroundColor: "#3CB371",
                  border: "none",
                }}
                disabled
              >
                Current
              </Button>
            </div> */}
          {/* </div> */} 

          {/* Previous Sessions */}
          {/* <div> */}
            {/* <div className="small text-muted mb-2 fw-semibold">
              PREVIOUS SESSIONS
            </div>
            <div className="p-3 border rounded-2 d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 40,
                    background: "#f1f5f9",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 12,
                  }}
                >
                  <Smartphone size={20} color="#6c757d" />
                </div>
                <div>
                  <div className="fw-semibold">Safari on iPhone</div>
                  <div className="small text-muted">
                    Lagos, Nigeria · 2 hours ago
                  </div>
                </div>
              </div> */}
              {/* <Button
                variant="danger"
                size="sm"
                style={{
                  borderRadius: 20,
                  padding: "6px 12px",
                }}
              >
                Revoke
              </Button> */}
            {/* </div> */}
          {/* </div> */}
        {/* </div> */}

        {/* Save and Cancel Buttons */}
        <div className="d-flex justify-content-end gap-2 pt-3 border-top">
          {hasChanges && (
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={handleCancel}
              disabled={isSaving}
              className="d-flex align-items-center"
            >
              <RotateCcw size={16} className="me-2" />
              Cancel
            </Button>
          )}
          <Button
            className="settings-save-btn"
            size="sm"
            onClick={handleSave}
            disabled={!hasChanges || isSaving}
            style={{
              backgroundColor: "#3CB371",
              borderColor: "#3CB371",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            {isSaving ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                Saving...
              </>
            ) : (
              <>
                <Check size={16} className="me-2" />
                Save Security Settings
              </>
            )}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SecuritySettings;
