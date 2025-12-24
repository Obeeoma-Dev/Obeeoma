import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
<<<<<<< HEAD
import { useState } from 'react';
import { Form, Button, Card, Alert, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faEye as faEyeRegular } from '@fortawesome/free-regular-svg-icons';
import { Shield, Monitor, Smartphone, Save } from 'lucide-react';
=======
import { useState } from "react";
import { Form, Button, Card, Row, Col, Alert } from "react-bootstrap";
>>>>>>> main
// Main component
const SecuritySettings = () => {
    // Local state with placeholder data
    const [settings, setSettings] = useState({
<<<<<<< HEAD
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
=======
        newPassword: "",
        confirmPassword: "",
>>>>>>> main
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
        if (settings.newPassword && !settings.currentPassword) {
            setSaveError('Please enter your current password.');
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
<<<<<<< HEAD
    return (_jsxs(Card, { className: "settings-card-compact shadow-sm border-0", children: [_jsx(Card.Header, { className: "fw-semibold mb-3 ps-0", children: "Security Settings" }), _jsxs(Card.Body, { children: [saveSuccess && (_jsx(Alert, { variant: "success", onClose: () => setSaveSuccess(false), dismissible: true, children: "Security settings saved successfully." })), saveError && (_jsx(Alert, { variant: "danger", onClose: () => setSaveError(''), dismissible: true, children: saveError })), _jsxs("div", { className: "mb-4", children: [_jsx("h6", { className: "fw-semibold mb-3", children: "Change Password" }), _jsxs(Form.Group, { className: "mb-3", children: [_jsx(Form.Label, { className: "small fw-500", children: "Current Password" }), _jsxs(InputGroup, { children: [_jsx(Form.Control, { type: showCurrentPassword ? "text" : "password", name: "currentPassword", value: settings.currentPassword, onChange: handleChange, placeholder: "Enter current password" }), _jsx(InputGroup.Text, { onClick: () => setShowCurrentPassword(!showCurrentPassword), style: { cursor: "pointer", backgroundColor: "white" }, children: _jsx(FontAwesomeIcon, { icon: showCurrentPassword ? faEyeSlash : faEyeRegular, style: { color: "#3CB371" } }) })] })] }), _jsxs(Form.Group, { className: "mb-3", children: [_jsx(Form.Label, { className: "small fw-500", children: "New Password" }), _jsxs(InputGroup, { children: [_jsx(Form.Control, { type: showNewPassword ? "text" : "password", name: "newPassword", value: settings.newPassword, onChange: handleChange, placeholder: "Enter new password" }), _jsx(InputGroup.Text, { onClick: () => setShowNewPassword(!showNewPassword), style: { cursor: "pointer", backgroundColor: "white" }, children: _jsx(FontAwesomeIcon, { icon: showNewPassword ? faEyeSlash : faEyeRegular, style: { color: "#3CB371" } }) })] })] }), _jsxs(Form.Group, { className: "mb-0", children: [_jsx(Form.Label, { className: "small fw-500", children: "Confirm New Password" }), _jsxs(InputGroup, { children: [_jsx(Form.Control, { type: showConfirmPassword ? "text" : "password", name: "confirmPassword", value: settings.confirmPassword, onChange: handleChange, placeholder: "Confirm new password" }), _jsx(InputGroup.Text, { onClick: () => setShowConfirmPassword(!showConfirmPassword), style: { cursor: "pointer", backgroundColor: "white" }, children: _jsx(FontAwesomeIcon, { icon: showConfirmPassword ? faEyeSlash : faEyeRegular, style: { color: "#3CB371" } }) })] })] })] }), _jsxs("div", { className: "mb-4", children: [_jsx("h6", { className: "fw-semibold mb-3", children: "Two-Factor Authentication" }), _jsxs("div", { className: "p-3 border rounded-2 d-flex align-items-center justify-content-between", style: { backgroundColor: '#f8f9fa' }, children: [_jsxs("div", { className: "d-flex align-items-center", children: [_jsx("div", { style: {
                                                    width: 48,
                                                    height: 48,
                                                    borderRadius: 12,
                                                    background: '#eafaf1',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    marginRight: 16
                                                }, children: _jsx(Shield, { size: 24, color: "#3CB371" }) }), _jsxs("div", { children: [_jsx("div", { className: "fw-semibold", children: "Enhance your account security" }), _jsx("div", { className: "small text-muted", children: "Add an extra layer of protection to your account" })] })] }), _jsx(Form.Check, { type: "switch", id: "two-factor-auth", checked: settings.twoFactorEnabled, onChange: handleToggle2FA, style: { transform: 'scale(1.2)' } })] })] }), _jsxs("div", { className: "mb-4", children: [_jsx("h6", { className: "fw-semibold mb-3", children: "Login Sessions" }), _jsxs("div", { className: "mb-3", children: [_jsx("div", { className: "small text-muted mb-2 fw-semibold", children: "CURRENT SESSION" }), _jsxs("div", { className: "p-3 border rounded-2 d-flex align-items-center justify-content-between", children: [_jsxs("div", { className: "d-flex align-items-center", children: [_jsx("div", { style: {
                                                            width: 40,
                                                            height: 40,
                                                            borderRadius: 40,
                                                            background: '#eafaf1',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            marginRight: 12
                                                        }, children: _jsx(Monitor, { size: 20, color: "#3CB371" }) }), _jsxs("div", { children: [_jsx("div", { className: "fw-semibold", children: "Chrome on Windows" }), _jsx("div", { className: "small text-muted", children: "Lagos, Nigeria \u00B7 Active now" })] })] }), _jsx(Button, { variant: "success", size: "sm", style: {
                                                    borderRadius: 20,
                                                    padding: '6px 12px',
                                                    backgroundColor: '#3CB371',
                                                    border: 'none'
                                                }, disabled: true, children: "Current" })] })] }), _jsxs("div", { children: [_jsx("div", { className: "small text-muted mb-2 fw-semibold", children: "PREVIOUS SESSIONS" }), _jsxs("div", { className: "p-3 border rounded-2 d-flex align-items-center justify-content-between", children: [_jsxs("div", { className: "d-flex align-items-center", children: [_jsx("div", { style: {
                                                            width: 40,
                                                            height: 40,
                                                            borderRadius: 40,
                                                            background: '#f1f5f9',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            marginRight: 12
                                                        }, children: _jsx(Smartphone, { size: 20, color: "#6c757d" }) }), _jsxs("div", { children: [_jsx("div", { className: "fw-semibold", children: "Safari on iPhone" }), _jsx("div", { className: "small text-muted", children: "Lagos, Nigeria \u00B7 2 hours ago" })] })] }), _jsx(Button, { variant: "danger", size: "sm", style: {
                                                    borderRadius: 20,
                                                    padding: '6px 12px'
                                                }, children: "Revoke" })] })] })] }), _jsx("div", { className: "d-flex justify-content-end gap-2 pt-3 border-top", children: _jsxs(Button, { className: "settings-save-btn", size: "sm", onClick: handleSave, style: {
                                backgroundColor: '#3CB371',
                                borderColor: '#3CB371',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }, children: [_jsx(Save, { size: 16 }), "Save Security Settings"] }) })] })] }));
=======
    return (_jsxs(Card, { className: "p-4 shadow-sm", children: [_jsx("h4", { className: "mb-4", children: "Security Settings" }), saveSuccess && (_jsx(Alert, { variant: "success", onClose: () => setSaveSuccess(false), dismissible: true, children: "Security settings saved successfully." })), saveError && (_jsx(Alert, { variant: "danger", onClose: () => setSaveError(""), dismissible: true, children: saveError })), _jsx("h5", { className: "mb-3", children: "Change Password" }), _jsxs(Row, { children: [_jsx(Col, { md: 6, children: _jsxs(Form.Group, { className: "mb-3", children: [_jsx(Form.Label, { children: "New Password" }), _jsx(Form.Control, { type: "password", name: "newPassword", value: settings.newPassword, onChange: handleChange })] }) }), _jsx(Col, { md: 6, children: _jsxs(Form.Group, { className: "mb-3", children: [_jsx(Form.Label, { children: "Confirm New Password" }), _jsx(Form.Control, { type: "password", name: "confirmPassword", value: settings.confirmPassword, onChange: handleChange })] }) })] }), _jsx("h5", { className: "mb-3", children: "Two-Factor Authentication" }), _jsx(Form.Check, { type: "switch", id: "two-factor-auth", label: "Enhance your account security", checked: settings.twoFactorEnabled, onChange: handleToggle2FA, className: "mb-4" }), _jsx("h5", { className: "mb-3", children: "Login Sessions" }), _jsxs("div", { className: "mb-2", children: [_jsx("strong", { children: "Current Session:" }), " ", settings.currentSession] }), _jsxs("div", { className: "mb-4", children: [_jsx("strong", { children: "Previous Session:" }), " ", settings.previousSession] }), _jsx("div", { className: "d-flex justify-content-end", children: _jsx(Button, { variant: "success", onClick: handleSave, children: "Save Security Settings" }) })] }));
>>>>>>> main
};
export default SecuritySettings;
