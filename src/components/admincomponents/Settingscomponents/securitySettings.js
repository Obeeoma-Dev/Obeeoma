import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Form, Button, Card, Row, Col, Alert } from "react-bootstrap";
// Main component
const SecuritySettings = () => {
    // Local state with placeholder data
    const [settings, setSettings] = useState({
        newPassword: "",
        confirmPassword: "",
        twoFactorEnabled: false,
        currentSession: "Active Now",
        previousSession: "11/21/2023, 09:45 AM",
    });
    // Feedback state
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [saveError, setSaveError] = useState("");
    // Handle input changes for password fields
    const handleChange = (e) => {
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
        if (settings.newPassword &&
            settings.newPassword !== settings.confirmPassword) {
            setSaveError("Passwords do not match.");
            return;
        }
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("Saving security settings:", settings);
            setSaveSuccess(true);
        }
        catch {
            setSaveError("Failed to save settings. Please try again.");
        }
    };
    return (_jsxs(Card, { className: "p-4 shadow-sm", children: [_jsx("h4", { className: "mb-4", children: "Security Settings" }), saveSuccess && (_jsx(Alert, { variant: "success", onClose: () => setSaveSuccess(false), dismissible: true, children: "Security settings saved successfully." })), saveError && (_jsx(Alert, { variant: "danger", onClose: () => setSaveError(""), dismissible: true, children: saveError })), _jsx("h5", { className: "mb-3", children: "Change Password" }), _jsxs(Row, { children: [_jsx(Col, { md: 6, children: _jsxs(Form.Group, { className: "mb-3", children: [_jsx(Form.Label, { children: "New Password" }), _jsx(Form.Control, { type: "password", name: "newPassword", value: settings.newPassword, onChange: handleChange })] }) }), _jsx(Col, { md: 6, children: _jsxs(Form.Group, { className: "mb-3", children: [_jsx(Form.Label, { children: "Confirm New Password" }), _jsx(Form.Control, { type: "password", name: "confirmPassword", value: settings.confirmPassword, onChange: handleChange })] }) })] }), _jsx("h5", { className: "mb-3", children: "Two-Factor Authentication" }), _jsx(Form.Check, { type: "switch", id: "two-factor-auth", label: "Enhance your account security", checked: settings.twoFactorEnabled, onChange: handleToggle2FA, className: "mb-4" }), _jsx("h5", { className: "mb-3", children: "Login Sessions" }), _jsxs("div", { className: "mb-2", children: [_jsx("strong", { children: "Current Session:" }), " ", settings.currentSession] }), _jsxs("div", { className: "mb-4", children: [_jsx("strong", { children: "Previous Session:" }), " ", settings.previousSession] }), _jsx("div", { className: "d-flex justify-content-end", children: _jsx(Button, { variant: "success", onClick: handleSave, children: "Save Security Settings" }) })] }));
};
export default SecuritySettings;
