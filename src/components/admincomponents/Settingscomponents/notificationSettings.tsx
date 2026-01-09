// src/components/admincomponents/notificationSettings.tsx

import React, { useState } from "react";
import { Form, Button, Card, Alert, Spinner } from "react-bootstrap";

// Define the shape of notification settings using TypeScript
export interface NotificationPreferences {
  systemAlerts: boolean;
  organizationActivity: boolean;
  criticalHotlineAlerts: boolean;
  reportGeneration: boolean;
}

// Main component
const NotificationSettings: React.FC = () => {
  // Local state for toggle values
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    systemAlerts: true,
    organizationActivity: true,
    criticalHotlineAlerts: false,
    reportGeneration: true,
  });

  // State for loading and feedback
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");

  // Toggle handler for switches
  const handleToggle = (key: keyof NotificationPreferences) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Simulated save function (replace with real API call later)
  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    setSaveError("");

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Log the payload (replace with fetch/axios later)
      console.log("Saving notification preferences:", preferences);

      // Simulate success
      setSaveSuccess(true);
    } catch {
      setSaveError("Failed to save preferences. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card className="settings-card-compact shadow-sm border-0">
      <Card.Header className="fw-semibold mb-2 ps-0">
        Notification Settings
      </Card.Header>

      {/* Success message */}
      {saveSuccess && (
        <Alert
          variant="success"
          onClose={() => setSaveSuccess(false)}
          dismissible
        >
          Preferences saved successfully.
        </Alert>
      )}

      {/* Error message */}
      {saveError && (
        <Alert variant="danger" onClose={() => setSaveError("")} dismissible>
          {saveError}
        </Alert>
      )}

      {/* Toggle switches */}
      <div className="mb-3 settings-section-compact">
        <Form.Check
          type="switch"
          id="system-alerts"
          label="Receive notifications about system updates and maintenance"
          checked={preferences.systemAlerts}
          onChange={() => handleToggle("systemAlerts")}
          className="mb-3"
        />

        <Form.Check
          type="switch"
          id="organization-activity"
          label="Receive notifications about organization plans or updates that matter"
          checked={preferences.organizationActivity}
          onChange={() => handleToggle("organizationActivity")}
          className="mb-3"
        />

        <Form.Check
          type="switch"
          id="critical-hotline-alerts"
          label="Receive alerts about critical situations in the hotline"
          checked={preferences.criticalHotlineAlerts}
          onChange={() => handleToggle("criticalHotlineAlerts")}
          className="mb-3"
        />

        <Form.Check
          type="switch"
          id="report-generation"
          label="Receive notifications when reports are generated"
          checked={preferences.reportGeneration}
          onChange={() => handleToggle("reportGeneration")}
          className="mb-3"
        />
      </div>

      {/* Save button with loading spinner */}
      <div className="d-flex justify-content-end gap-2 pt-2 border-top">
        <Button
          className="settings-save-btn"
          size="sm"
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              Saving...
            </>
          ) : (
            "Save Notification Settings"
          )}
        </Button>
      </div>
    </Card>
  );
};

export default NotificationSettings;
