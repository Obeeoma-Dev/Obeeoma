import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Import React and necessary hooks
import { useState, useEffect } from "react";
// Import Bootstrap components
import { Form, Button, Spinner, Alert } from "react-bootstrap";
// Define the AccountForm component
const AccountForm = () => {
    // State to hold form input values
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        role: "",
        phone: "",
        bio: "",
    });
    // State to track loading status
    const [loading, setLoading] = useState(true);
    // State to track error messages
    const [error, setError] = useState(null);
    // Simulate fetching default values (e.g. from API or mock service)
    useEffect(() => {
        try {
            // Simulated delay using setTimeout
            setTimeout(() => {
                const defaultValues = {
                    fullName: "Dr. Reacheal Lucia",
                    email: "reacheal.lucia@obeema.com",
                    role: "System Administrator",
                    phone: "(555) 123-4567",
                    bio: "Dr. Reacheal is a system administrator with over 10 years of experience in mental health care.",
                };
                setFormData(defaultValues);
                setLoading(false); // Stop loading once data is set
            }, 1000); // 1 second delay
        }
        catch (err) {
            setError("Failed to load account data.");
            setLoading(false);
        }
    }, []);
    // Handle input changes for all fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Placeholder for future API call
        console.log("Form submitted:", formData);
    };
    // Show loading spinner while data is being fetched
    if (loading) {
        return (_jsxs("div", { className: "text-center py-5", children: [_jsx(Spinner, { animation: "border", variant: "success" }), _jsx("p", { className: "mt-3", children: "Loading account data..." })] }));
    }
    // Show error message if data fails to load
    if (error) {
        return (_jsx(Alert, { variant: "danger", className: "mt-3", children: error }));
    }
    // Render the form once data is loaded and no error
    return (_jsxs(Form, { onSubmit: handleSubmit, children: [_jsxs(Form.Group, { controlId: "formFullName", className: "mb-3", children: [_jsx(Form.Label, { children: "Full Name" }), _jsx(Form.Control, { type: "text", name: "fullName", value: formData.fullName, onChange: handleChange, placeholder: "Enter full name" })] }), _jsxs(Form.Group, { controlId: "formEmail", className: "mb-3", children: [_jsx(Form.Label, { children: "Email Address" }), _jsx(Form.Control, { type: "email", name: "email", value: formData.email, onChange: handleChange, placeholder: "Enter email" })] }), _jsxs(Form.Group, { controlId: "formRole", className: "mb-3", children: [_jsx(Form.Label, { children: "Role" }), _jsx(Form.Control, { type: "text", name: "role", value: formData.role, onChange: handleChange, placeholder: "Enter role" })] }), _jsxs(Form.Group, { controlId: "formPhone", className: "mb-3", children: [_jsx(Form.Label, { children: "Phone Number" }), _jsx(Form.Control, { type: "tel", name: "phone", value: formData.phone, onChange: handleChange, placeholder: "Enter phone number" })] }), _jsxs(Form.Group, { controlId: "formBio", className: "mb-3", children: [_jsx(Form.Label, { children: "Professional Bio" }), _jsx(Form.Control, { as: "textarea", rows: 3, name: "bio", value: formData.bio, onChange: handleChange, placeholder: "Enter bio" })] }), _jsx(Button, { variant: "success", type: "submit", children: "Save Changes" })] }));
};
export default AccountForm;
