import React, { useState, useEffect } from "react";
import { Form, Button, Card, Alert, Spinner } from "react-bootstrap";
import { adminAPI } from "../../../api/apiConfig";

export interface NotificationPreferences {
  systemAlerts: boolean;
  organizationActivity: boolean;
  criticalHotlineAlerts: boolean;
  reportGeneration: boolean;
}

const NotificationSettings: React.FC = () => {
  // Local state for toggle values
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    systemAlerts: true,
    organizationActivity: true,
    criticalHotlineAlerts: false,
    reportGeneration: true,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  // Fetch notification settings on component mount
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setLoadError("");
        const res = await adminAPI.getSystemSettings();
        if (!cancelled) {
          const data = res?.data ?? res ?? {};
          // Handle system settings response structure
          if (Array.isArray(data)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const notificationData =
              data.find((setting: any) => setting.key === "notifications") ||
              {};
            setPreferences({
              systemAlerts: notificationData.systemAlerts ?? true,
              organizationActivity:
                notificationData.organizationActivity ?? true,
              criticalHotlineAlerts:
                notificationData.criticalHotlineAlerts ?? false,
              reportGeneration: notificationData.reportGeneration ?? true,
            });
          } else {
            // If it's an object, use notification properties directly
            setPreferences({
              systemAlerts: data.systemAlerts ?? true,
              organizationActivity: data.organizationActivity ?? true,
              criticalHotlineAlerts: data.criticalHotlineAlerts ?? false,
              reportGeneration: data.reportGeneration ?? true,
            });
          }
        }
      } catch (e: unknown) {
        if (!cancelled)
          setLoadError(
            e instanceof Error
              ? e.message
              : "Failed to load notification settings",
          );
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Toggle handler for switches
  const handleToggle = (key: keyof NotificationPreferences) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Save notification settings to backend
  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    setSaveError("");

    try {
      await adminAPI.updateSystemSettings({
        key: "notifications",
        ...preferences,
      });
      setSaveSuccess(true);
    } catch (e: unknown) {
      setSaveError(
        e instanceof Error
          ? e.message
          : "Failed to save preferences. Please try again.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <Card className="settings-card-compact shadow-sm border-0">
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: 200 }}
        >
          <Spinner animation="border" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="settings-card-compact shadow-sm border-0">
      <Card.Header className="fw-semibold mb-2 ps-0">
        Notification Settings
      </Card.Header>

      {/* Load error message */}
      {loadError && (
        <Alert variant="danger" onClose={() => setLoadError("")} dismissible>
          {loadError}
        </Alert>
      )}

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
          size="sm"
          onClick={handleSave}
          disabled={isSaving}
          style={{
            backgroundColor: "#22C55E",
            borderColor: "#22C55E",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
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
