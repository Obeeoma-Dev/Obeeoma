import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Card, Alert, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faEye as faEyeRegular } from "@fortawesome/free-regular-svg-icons";
import { Shield, KeyRound, Check, RotateCcw, } from "lucide-react";
// Password validation rules matching authValidation.ts
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
const SecuritySettings = () => {
    // Local state with placeholder data
    const [settings, setSettings] = useState({
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
    const [originalTwoFactorEnabled, setOriginalTwoFactorEnabled] = useState(settings.twoFactorEnabled);
    // Track changes
    useEffect(() => {
        const hasUnsavedChanges = settings.twoFactorEnabled !== originalTwoFactorEnabled ||
            settings.currentPassword !== "" ||
            settings.newPassword !== "" ||
            settings.confirmPassword !== "";
        setHasChanges(hasUnsavedChanges);
    }, [settings, originalTwoFactorEnabled]);
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
    // Validate password strength
    const validatePassword = (password) => {
        if (!password)
            return null;
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
        if (settings.newPassword &&
            settings.newPassword !== settings.confirmPassword) {
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
        }
        catch {
            setSaveError("Failed to save settings. Please try again.");
        }
        finally {
            setIsSaving(false);
        }
    };
    return (_jsxs(Card, { className: "settings-card-compact shadow-sm border-0", children: [_jsx(Card.Header, { className: "fw-semibold mb-3 ps-0", children: "Security Settings" }), _jsxs(Card.Body, { children: [_jsxs("div", { className: "mb-4", children: [_jsx("h6", { className: "fw-semibold mb-3 text-muted", children: "QUICK ACTIONS" }), _jsx("div", { className: "d-flex gap-3 flex-wrap", children: _jsxs(Link, { to: "/change-password", className: "btn btn-outline-secondary d-flex align-items-center", children: [_jsx(KeyRound, { size: 16, className: "me-2" }), "Change Password"] }) })] }), saveSuccess && (_jsx(Alert, { variant: "success", onClose: () => setSaveSuccess(false), dismissible: true, children: "Security settings saved successfully." })), saveError && (_jsx(Alert, { variant: "danger", onClose: () => setSaveError(""), dismissible: true, children: saveError })), _jsxs("div", { className: "mb-4", children: [_jsx("h6", { className: "fw-semibold mb-3", children: "Change Password" }), _jsxs(Form.Group, { className: "mb-3", children: [_jsx(Form.Label, { className: "small fw-500", children: "Current Password" }), _jsxs(InputGroup, { children: [_jsx(Form.Control, { type: showCurrentPassword ? "text" : "password", name: "currentPassword", value: settings.currentPassword, onChange: handleChange, placeholder: "Enter current password" }), _jsx(InputGroup.Text, { onClick: () => setShowCurrentPassword(!showCurrentPassword), style: { cursor: "pointer", backgroundColor: "white" }, children: _jsx(FontAwesomeIcon, { icon: showCurrentPassword ? faEyeSlash : faEyeRegular, style: { color: "#3CB371" } }) })] })] }), _jsxs(Form.Group, { className: "mb-3", children: [_jsx(Form.Label, { className: "small fw-500", children: "New Password" }), _jsxs(InputGroup, { children: [_jsx(Form.Control, { type: showNewPassword ? "text" : "password", name: "newPassword", value: settings.newPassword, onChange: handleChange, placeholder: "Enter new password" }), _jsx(InputGroup.Text, { onClick: () => setShowNewPassword(!showNewPassword), style: { cursor: "pointer", backgroundColor: "white" }, children: _jsx(FontAwesomeIcon, { icon: showNewPassword ? faEyeSlash : faEyeRegular, style: { color: "#3CB371" } }) })] })] }), _jsxs(Form.Group, { className: "mb-0", children: [_jsx(Form.Label, { className: "small fw-500", children: "Confirm New Password" }), _jsxs(InputGroup, { children: [_jsx(Form.Control, { type: showConfirmPassword ? "text" : "password", name: "confirmPassword", value: settings.confirmPassword, onChange: handleChange, placeholder: "Confirm new password" }), _jsx(InputGroup.Text, { onClick: () => setShowConfirmPassword(!showConfirmPassword), style: { cursor: "pointer", backgroundColor: "white" }, children: _jsx(FontAwesomeIcon, { icon: showConfirmPassword ? faEyeSlash : faEyeRegular, style: { color: "#3CB371" } }) })] })] })] }), _jsxs("div", { className: "mb-4", children: [_jsx("h6", { className: "fw-semibold mb-3", children: "Two-Factor Authentication" }), _jsxs("div", { className: "p-3 border rounded-2 d-flex align-items-center justify-content-between", style: { backgroundColor: "#f8f9fa" }, children: [_jsxs("div", { className: "d-flex align-items-center", children: [_jsx("div", { style: {
                                                    width: 48,
                                                    height: 48,
                                                    borderRadius: 12,
                                                    background: "#eafaf1",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    marginRight: 16,
                                                }, children: _jsx(Shield, { size: 24, color: "#3CB371" }) }), _jsxs("div", { children: [_jsx("div", { className: "fw-semibold", children: "Enhance your account security" }), _jsx("div", { className: "small text-muted", children: "Add an extra layer of protection to your account" })] })] }), _jsx(Form.Check, { type: "switch", id: "two-factor-auth", checked: settings.twoFactorEnabled, onChange: handleToggle2FA, style: { transform: "scale(1.2)" } })] })] }), _jsxs("div", { className: "d-flex justify-content-end gap-2 pt-3 border-top", children: [hasChanges && (_jsxs(Button, { variant: "outline-secondary", size: "sm", onClick: handleCancel, disabled: isSaving, className: "d-flex align-items-center", children: [_jsx(RotateCcw, { size: 16, className: "me-2" }), "Cancel"] })), _jsx(Button, { className: "settings-save-btn", size: "sm", onClick: handleSave, disabled: !hasChanges || isSaving, style: {
                                    backgroundColor: "#3CB371",
                                    borderColor: "#3CB371",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                }, children: isSaving ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "spinner-border spinner-border-sm me-2", role: "status", "aria-hidden": "true" }), "Saving..."] })) : (_jsxs(_Fragment, { children: [_jsx(Check, { size: 16, className: "me-2" }), "Save Security Settings"] })) })] })] })] }));
};
export default SecuritySettings;
