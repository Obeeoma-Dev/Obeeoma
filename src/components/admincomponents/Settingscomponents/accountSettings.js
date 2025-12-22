import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Import React and useState for managing form state
import { useState } from "react";
// Import Bootstrap components for layout and styling
import { Form, Button, Card, Row, Col } from "react-bootstrap";
// Main component
const AccountForm = () => {
    // Initialize local state with placeholder account data
    const [account, setAccount] = useState({
        name: "Dr. Sarah Johnson",
        title: "System Administrator",
        email: "sarah.johnson@mindcare.com",
        phone: "(555) 123-4567",
        bio: "Dr. Sarah Johnson is a system administrator with over 10 years of experience in mental health platforms. She oversees the technical operations and...",
    });
    // Handle input changes for all fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAccount((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    // Placeholder for save logic (connect to backend later)
    const handleSave = () => {
        console.log("Saving account details:", account);
        // TODO: Send account data to backend via API
    };
    return (
    // Card layout for visual grouping
    _jsxs(Card, { className: "p-4 shadow-sm", children: [_jsx("h4", { className: "mb-4", children: "Account Information" }), _jsxs(Row, { children: [_jsx(Col, { md: 6, children: _jsxs(Form.Group, { className: "mb-3", children: [_jsx(Form.Label, { children: "Name" }), _jsx(Form.Control, { type: "text", name: "name", value: account.name, onChange: handleChange })] }) }), _jsx(Col, { md: 6, children: _jsxs(Form.Group, { className: "mb-3", children: [_jsx(Form.Label, { children: "Title" }), _jsx(Form.Control, { type: "text", name: "title", value: account.title, onChange: handleChange })] }) })] }), _jsxs(Row, { children: [_jsx(Col, { md: 6, children: _jsxs(Form.Group, { className: "mb-3", children: [_jsx(Form.Label, { children: "Email Address" }), _jsx(Form.Control, { type: "email", name: "email", value: account.email, onChange: handleChange })] }) }), _jsx(Col, { md: 6, children: _jsxs(Form.Group, { className: "mb-3", children: [_jsx(Form.Label, { children: "Phone Number" }), _jsx(Form.Control, { type: "tel", name: "phone", value: account.phone, onChange: handleChange })] }) })] }), _jsxs(Form.Group, { className: "mb-4", children: [_jsx(Form.Label, { children: "Professional Bio" }), _jsx(Form.Control, { as: "textarea", rows: 4, name: "bio", value: account.bio, onChange: handleChange })] }), _jsx("div", { className: "d-flex justify-content-end", children: _jsx(Button, { variant: "success", onClick: handleSave, children: "Save Changes" }) })] }));
};
export default AccountForm;
