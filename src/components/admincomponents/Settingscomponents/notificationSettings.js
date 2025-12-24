import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// src/components/admincomponents/notificationSettings.tsx
import { useState } from "react";
import { Form, Button, Card, Alert, Spinner } from "react-bootstrap";
// Main component
const NotificationSettings = () => {
    // Local state for toggle values
    const [preferences, setPreferences] = useState({
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
    const handleToggle = (key) => {
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
        }
        catch {
            setSaveError("Failed to save preferences. Please try again.");
        }
        finally {
            setIsSaving(false);
        }
    };
<<<<<<< HEAD
    return (_jsxs(Card, { className: "settings-card-compact shadow-sm border-0", children: [_jsx(Card.Header, { className: "fw-semibold mb-2 ps-0", children: "Notification Settings" }), saveSuccess && (_jsx(Alert, { variant: "success", onClose: () => setSaveSuccess(false), dismissible: true, children: "Preferences saved successfully." })), saveError && (_jsx(Alert, { variant: "danger", onClose: () => setSaveError(''), dismissible: true, children: saveError })), _jsxs("div", { className: "mb-3 settings-section-compact", children: [_jsx(Form.Check, { type: "switch", id: "system-alerts", label: "Receive notifications about system updates and maintenance", checked: preferences.systemAlerts, onChange: () => handleToggle('systemAlerts'), className: "mb-3" }), _jsx(Form.Check, { type: "switch", id: "organization-activity", label: "Receive notifications about organization plans or updates that matter", checked: preferences.organizationActivity, onChange: () => handleToggle('organizationActivity'), className: "mb-3" }), _jsx(Form.Check, { type: "switch", id: "critical-hotline-alerts", label: "Receive alerts about critical situations in the hotline", checked: preferences.criticalHotlineAlerts, onChange: () => handleToggle('criticalHotlineAlerts'), className: "mb-3" }), _jsx(Form.Check, { type: "switch", id: "report-generation", label: "Receive notifications when reports are generated", checked: preferences.reportGeneration, onChange: () => handleToggle('reportGeneration'), className: "mb-3" })] }), _jsx("div", { className: "d-flex justify-content-end gap-2 pt-2 border-top", children: _jsx(Button, { className: "settings-save-btn", size: "sm", onClick: handleSave, disabled: isSaving, children: isSaving ? (_jsxs(_Fragment, { children: [_jsx(Spinner, { animation: "border", size: "sm", className: "me-2" }), "Saving..."] })) : ('Save Notification Settings') }) })] }));
=======
    return (_jsxs(Card, { className: "p-4 shadow-sm", children: [_jsx("h4", { className: "mb-4", children: "Notification Settings" }), saveSuccess && (_jsx(Alert, { variant: "success", onClose: () => setSaveSuccess(false), dismissible: true, children: "Preferences saved successfully." })), saveError && (_jsx(Alert, { variant: "danger", onClose: () => setSaveError(""), dismissible: true, children: saveError })), _jsx(Form.Check, { type: "switch", id: "system-alerts", label: "Receive notifications about system updates and maintenance", checked: preferences.systemAlerts, onChange: () => handleToggle("systemAlerts"), className: "mb-3" }), _jsx(Form.Check, { type: "switch", id: "organization-activity", label: "Receive notifications about organization plans or updates that matter", checked: preferences.organizationActivity, onChange: () => handleToggle("organizationActivity"), className: "mb-3" }), _jsx(Form.Check, { type: "switch", id: "critical-hotline-alerts", label: "Receive alerts about critical situations in the hotline", checked: preferences.criticalHotlineAlerts, onChange: () => handleToggle("criticalHotlineAlerts"), className: "mb-3" }), _jsx(Form.Check, { type: "switch", id: "report-generation", label: "Receive notifications when reports are generated", checked: preferences.reportGeneration, onChange: () => handleToggle("reportGeneration"), className: "mb-4" }), _jsx("div", { className: "d-flex justify-content-end", children: _jsx(Button, { variant: "success", onClick: handleSave, disabled: isSaving, children: isSaving ? (_jsxs(_Fragment, { children: [_jsx(Spinner, { animation: "border", size: "sm", className: "me-2" }), "Saving..."] })) : ("Save Notification Settings") }) })] }));
>>>>>>> main
};
export default NotificationSettings;
