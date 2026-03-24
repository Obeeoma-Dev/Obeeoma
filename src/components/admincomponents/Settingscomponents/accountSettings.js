import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Form, Button, Card, Row, Col, Spinner, Alert } from "react-bootstrap";
import { adminAPI } from "../../../api/apiConfig";
const AccountForm = () => {
    // Initialize local state with placeholder account data
    const [account, setAccount] = useState({
        name: "",
        title: "",
        email: "",
        phone: "",
        bio: "",
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    // Fetch account settings on component mount
    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await adminAPI.getSystemSettings();
                if (!cancelled) {
                    const data = res?.data ?? res ?? {};
                    // Handle system settings response structure
                    if (Array.isArray(data)) {
                        const accountData = data.find((setting) => setting.key === 'account') || {};
                        setAccount({
                            name: accountData.name || "",
                            title: accountData.title || "",
                            email: accountData.email || "",
                            phone: accountData.phone || "",
                            bio: accountData.bio || "",
                        });
                    }
                    else {
                        // If it's an object, use account properties directly
                        setAccount({
                            name: data.name || "",
                            title: data.title || "",
                            email: data.email || "",
                            phone: data.phone || "",
                            bio: data.bio || "",
                        });
                    }
                }
            }
            catch (e) {
                if (!cancelled)
                    setError(e instanceof Error ? e.message : "Failed to load account settings");
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
    // Handle input changes for all fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAccount((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    // Save account settings to backend
    const handleSave = async () => {
        try {
            setSaving(true);
            setError(null);
            setSuccess(null);
            await adminAPI.updateSystemSettings({
                key: 'account',
                ...account
            });
            setSuccess("Account settings saved successfully!");
        }
        catch (e) {
            setError(e instanceof Error ? e.message : "Failed to save account settings");
        }
        finally {
            setSaving(false);
        }
    };
    if (loading) {
        return (_jsx(Card, { className: "p-4 shadow-sm", children: _jsx("div", { className: "d-flex justify-content-center align-items-center", style: { minHeight: 200 }, children: _jsx(Spinner, { animation: "border" }) }) }));
    }
    return (
    // Card layout for visual grouping
    _jsxs(Card, { className: "p-4 shadow-sm", children: [_jsx("h4", { className: "mb-4", children: "Account Information" }), error && (_jsx(Alert, { variant: "danger", className: "mb-3", children: error })), success && (_jsx(Alert, { variant: "success", className: "mb-3", children: success })), _jsxs(Row, { children: [_jsx(Col, { md: 6, children: _jsxs(Form.Group, { className: "mb-3", children: [_jsx(Form.Label, { children: "Name" }), _jsx(Form.Control, { type: "text", name: "name", value: account.name, onChange: handleChange })] }) }), _jsx(Col, { md: 6, children: _jsxs(Form.Group, { className: "mb-3", children: [_jsx(Form.Label, { children: "Title" }), _jsx(Form.Control, { type: "text", name: "title", value: account.title, onChange: handleChange })] }) })] }), _jsxs(Row, { children: [_jsx(Col, { md: 6, children: _jsxs(Form.Group, { className: "mb-3", children: [_jsx(Form.Label, { children: "Email Address" }), _jsx(Form.Control, { type: "email", name: "email", value: account.email, onChange: handleChange })] }) }), _jsx(Col, { md: 6, children: _jsxs(Form.Group, { className: "mb-3", children: [_jsx(Form.Label, { children: "Phone Number" }), _jsx(Form.Control, { type: "tel", name: "phone", value: account.phone, onChange: handleChange })] }) })] }), _jsxs(Form.Group, { className: "mb-4", children: [_jsx(Form.Label, { children: "Professional Bio" }), _jsx(Form.Control, { as: "textarea", rows: 4, name: "bio", value: account.bio, onChange: handleChange })] }), _jsx("div", { className: "d-flex justify-content-end", children: _jsx(Button, { variant: "success", onClick: handleSave, disabled: saving, children: saving ? (_jsxs(_Fragment, { children: [_jsx(Spinner, { as: "span", animation: "border", size: "sm", role: "status", "aria-hidden": "true", className: "me-2" }), "Saving..."] })) : ("Save Changes") }) })] }));
};
export default AccountForm;
