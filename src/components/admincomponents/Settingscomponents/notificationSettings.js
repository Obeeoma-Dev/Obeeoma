import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Form, Button, Card, Alert, Spinner } from "react-bootstrap";
import { adminAPI } from "../../../api/apiConfig";
const NotificationSettings = () => {
    // Local state for toggle values
    const [preferences, setPreferences] = useState({
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
                        const notificationData = data.find((setting) => setting.key === 'notifications') || {};
                        setPreferences({
                            systemAlerts: notificationData.systemAlerts ?? true,
                            organizationActivity: notificationData.organizationActivity ?? true,
                            criticalHotlineAlerts: notificationData.criticalHotlineAlerts ?? false,
                            reportGeneration: notificationData.reportGeneration ?? true,
                        });
                    }
                    else {
                        // If it's an object, use notification properties directly
                        setPreferences({
                            systemAlerts: data.systemAlerts ?? true,
                            organizationActivity: data.organizationActivity ?? true,
                            criticalHotlineAlerts: data.criticalHotlineAlerts ?? false,
                            reportGeneration: data.reportGeneration ?? true,
                        });
                    }
                }
            }
            catch (e) {
                if (!cancelled)
                    setLoadError(e instanceof Error ? e.message : "Failed to load notification settings");
            }
            finally {
                if (!cancelled)
                    setLoading(false);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, []);
    // Toggle handler for switches
    const handleToggle = (key) => {
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
                key: 'notifications',
                ...preferences
            });
            setSaveSuccess(true);
        }
        catch (e) {
            setSaveError(e instanceof Error ? e.message : "Failed to save preferences. Please try again.");
        }
        finally {
            setIsSaving(false);
        }
    };
    if (loading) {
        return (_jsx(Card, { className: "settings-card-compact shadow-sm border-0", children: _jsx("div", { className: "d-flex justify-content-center align-items-center", style: { minHeight: 200 }, children: _jsx(Spinner, { animation: "border" }) }) }));
    }
    return (_jsxs(Card, { className: "settings-card-compact shadow-sm border-0", children: [_jsx(Card.Header, { className: "fw-semibold mb-2 ps-0", children: "Notification Settings" }), loadError && (_jsx(Alert, { variant: "danger", onClose: () => setLoadError(""), dismissible: true, children: loadError })), saveSuccess && (_jsx(Alert, { variant: "success", onClose: () => setSaveSuccess(false), dismissible: true, children: "Preferences saved successfully." })), saveError && (_jsx(Alert, { variant: "danger", onClose: () => setSaveError(""), dismissible: true, children: saveError })), _jsxs("div", { className: "mb-3 settings-section-compact", children: [_jsx(Form.Check, { type: "switch", id: "system-alerts", label: "Receive notifications about system updates and maintenance", checked: preferences.systemAlerts, onChange: () => handleToggle("systemAlerts"), className: "mb-3" }), _jsx(Form.Check, { type: "switch", id: "organization-activity", label: "Receive notifications about organization plans or updates that matter", checked: preferences.organizationActivity, onChange: () => handleToggle("organizationActivity"), className: "mb-3" }), _jsx(Form.Check, { type: "switch", id: "critical-hotline-alerts", label: "Receive alerts about critical situations in the hotline", checked: preferences.criticalHotlineAlerts, onChange: () => handleToggle("criticalHotlineAlerts"), className: "mb-3" }), _jsx(Form.Check, { type: "switch", id: "report-generation", label: "Receive notifications when reports are generated", checked: preferences.reportGeneration, onChange: () => handleToggle("reportGeneration"), className: "mb-3" })] }), _jsx("div", { className: "d-flex justify-content-end gap-2 pt-2 border-top", children: _jsx(Button, { className: "settings-save-btn", size: "sm", onClick: handleSave, disabled: isSaving, children: isSaving ? (_jsxs(_Fragment, { children: [_jsx(Spinner, { animation: "border", size: "sm", className: "me-2" }), "Saving..."] })) : ("Save Notification Settings") }) })] }));
};
export default NotificationSettings;
