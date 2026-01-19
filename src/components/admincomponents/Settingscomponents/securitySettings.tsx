import React, { useState } from "react";
import { Form, Button, Card, Alert, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faEye as faEyeRegular } from "@fortawesome/free-regular-svg-icons";
import { Shield, Monitor, Smartphone, Save } from "lucide-react";


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

  // Save handler (backend-ready placeholder)
  const handleSave = async () => {
    setSaveSuccess(false);
    setSaveError("");

    // Basic validation
    if (
      settings.newPassword &&
      settings.newPassword !== settings.confirmPassword
    ) {
      setSaveError("Passwords do not match.");
      return;
    }

    if (settings.newPassword && !settings.currentPassword) {
      setSaveError("Please enter your current password.");
      return;
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Saving security settings:", settings);
      setSaveSuccess(true);
    } catch {
      setSaveError("Failed to save settings. Please try again.");
    }
  };

  return (
    <Card className="settings-card-compact shadow-sm border-0">
      <Card.Header className="fw-semibold mb-3 ps-0">
        Security Settings
      </Card.Header>
      <Card.Body>
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
        <div className="mb-4">
          <h6 className="fw-semibold mb-3">Login Sessions</h6>

          {/* Current Session */}
          <div className="mb-3">
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
            </div>
          </div>

          {/* Previous Sessions */}
          <div>
            <div className="small text-muted mb-2 fw-semibold">
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
              </div>
              <Button
                variant="danger"
                size="sm"
                style={{
                  borderRadius: 20,
                  padding: "6px 12px",
                }}
              >
                Revoke
              </Button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="d-flex justify-content-end gap-2 pt-3 border-top">
          <Button
            className="settings-save-btn"
            size="sm"
            onClick={handleSave}
            style={{
              backgroundColor: "#3CB371",
              borderColor: "#3CB371",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Save size={16} />
            Save Security Settings
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SecuritySettings;
