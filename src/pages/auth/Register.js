import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form as FormikForm, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearAuthStatus } from "../../store/slices/authSlice";
<<<<<<< HEAD
import { registerValidationSchema } from "./../../validation/authValidation";
import { Container, Button, Form as BootstrapForm, Alert, Card, Spinner, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faEye as faEyeRegular } from '@fortawesome/free-regular-svg-icons';
import logo from "./../../assets/Images/green..png";
const customStyles = {
    // Use the clean hex code for styling
    primaryColor: "#3CB371",
    lightPink: "#f8d7da",
    logoText: "Obeeoma",
};
const Register = () => {
=======
// Assuming this validation schema is defined
import { registerValidationSchema } from "../../validation/authValidation";
import { Container, Button, Form as BootstrapForm, Alert, Card, Spinner, InputGroup, Row, // Added for two-column layout
Col, // Added for two-column layout
 } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faPhone, faEnvelope, faUser, faMapMarkerAlt, faSitemap, faBuilding, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { faEye as faEyeRegular } from '@fortawesome/free-regular-svg-icons';
// Update the import path if necessary based on your actual file structure
import logo from "./../../assets/Images/obeeomalogoword1.png"; // Assuming this is correct
// --- Custom Styles and Data ---
const customStyles = {
    primaryColor: "#3CB371",
    backgroundColor: "#f0f2f5",
    logoText: "Obeeoma",
};
const organisation_size_options = [
    { label: "Select Size", value: "" },
    { label: "1-10 Employees", value: "1-10" },
    { label: "11-50 Employees", value: "11-50" },
    { label: "51-200 Employees", value: "51-200" },
    { label: "201-500 Employees", value: "201-500" },
    { label: "500+ Employees", value: "500+" },
];
const contact_role_options = [
    { label: "Select Contact Role", value: "" },
    { label: "Owner/CEO", value: "CEO" },
    { label: "HR Manager", value: "HR_MANAGER" },
    { label: "Recruiter", value: "RECRUITER" },
    { label: "Office Manager", value: "OFFICE_MANAGER" },
    { label: "Other", value: "OTHER" },
];
// --- Component Start ---
const Register = () => {
    // Role is fixed to "employer" for this organization registration form
>>>>>>> syda
    const [role] = useState("employer");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, isLoading } = useSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);
<<<<<<< HEAD
    // function for the eye visibility toggle
=======
>>>>>>> syda
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(prev => !prev);
    };
    const initialValues = {
        organizationName: "",
        contactPersonName: "",
        contactPersonRole: "",
        companyEmail: "",
        email: "",
        phoneNumber: "",
        organisationSize: "",
        Location: "",
        password: "",
        confirmPassword: "",
    };
    useEffect(() => {
<<<<<<< HEAD
=======
        // Clear any previous auth error/status on component mount
>>>>>>> syda
        dispatch(clearAuthStatus());
    }, [dispatch]);
    const handleSubmit = async (values) => {
        const credentials = {
            organizationName: values.organizationName,
            phoneNumber: values.phoneNumber,
            organisationSize: values.organisationSize,
            companyEmail: values.companyEmail,
            Location: values.Location,
            password: values.password,
            confirmPassword: values.confirmPassword,
            role: role,
            contactPerson: [
                {
                    fullname: values.contactPersonName,
                    role: values.contactPersonRole,
                    email: values.email,
                },
            ],
        };
        try {
            await dispatch(registerUser(credentials)).unwrap();
<<<<<<< HEAD
            navigate("/login", { replace: true });
        }
        catch (err) {
            console.error("Registration failed:", err);
        }
    };
    return (_jsxs("div", { style: {
            backgroundColor: "#f5f5f5",
            height: "100vh",
            position: "relative",
        }, className: "d-flex flex-column", children: [_jsx(Container, { className: "flex-grow-1 d-flex justify-content-center align-items-center py-5", children: _jsx("div", { className: "d-flex justify-content-center", children: _jsx(Card, { className: "shadow-sm border-0 p-4", style: {
                            maxWidth: "600px",
                            width: "100%",
                            borderRadius: "8px",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        }, children: _jsxs(Card.Body, { children: [_jsx("div", { className: "d-flex flex-column align-items-center justify-content-center mb-4", style: { fontFamily: "heading" }, children: _jsx("img", { src: logo, alt: "Obeeoma Logo", width: "100", className: "mb-1" }) }), _jsx("h3", { className: "text-center mb-2 fw-semibold text-dark", style: { fontFamily: "heading", }, children: "Create your Organization's account" }), _jsx("p", { className: "text-center text-muted mb-4", style: { fontFamily: "heading" }, children: "Join our community of mental health professionals and patients" }), error && (_jsx(Alert, { variant: "danger", dismissible: true, children: error })), _jsx(Formik, { validationSchema: registerValidationSchema, initialValues: initialValues, onSubmit: handleSubmit, children: ({ handleSubmit, handleChange, values, touched, errors }) => (_jsxs(FormikForm, { noValidate: true, onSubmit: handleSubmit, children: [_jsxs(BootstrapForm.Group, { className: "mb-3", children: [_jsx(BootstrapForm.Control, { type: "email", name: "email", placeholder: "Email address", value: values.email, onChange: handleChange, className: "py-2" // Adding vertical padding
                                                        , isInvalid: !!touched.email && !!errors.email }), _jsx(BootstrapForm.Control.Feedback, { type: "invalid", children: _jsx(ErrorMessage, { name: "email" }) })] }), _jsxs(BootstrapForm.Group, { className: "mb-3", children: [_jsx(BootstrapForm.Control, { type: "text", name: "username", placeholder: "Username", value: values.username, onChange: handleChange, className: "py-2", isInvalid: !!touched.username && !!errors.username }), _jsx(BootstrapForm.Control.Feedback, { type: "invalid", children: _jsx(ErrorMessage, { name: "username" }) })] }), _jsxs(BootstrapForm.Group, { className: "mb-3", controlId: "password", children: [_jsxs(InputGroup, { children: [_jsx(BootstrapForm.Control, { style: { fontFamily: "body" }, type: showPassword ? "text" : "password", name: "password", value: values.password, onChange: handleChange, placeholder: "Password", className: "py-2 border-success border-opacity-25", isInvalid: touched.password && !!errors.password }), _jsx(InputGroup.Text, { onClick: togglePasswordVisibility, style: {
                                                                    cursor: "pointer",
                                                                    backgroundColor: "white"
                                                                }, children: _jsx(FontAwesomeIcon, { icon: showPassword ? faEyeSlash : faEyeRegular, style: { color: customStyles.primaryColor } }) })] }), _jsx(ErrorMessage, { name: "password", component: "div", className: "invalid-feedback d-block" })] }), _jsxs(BootstrapForm.Group, { className: "mb-4", controlId: "confirm_password", children: [_jsxs(InputGroup, { children: [_jsx(BootstrapForm.Control, { style: { fontFamily: "body" }, type: showConfirmPassword ? "text" : "password", name: "confirm_password", placeholder: "Confirm Password", value: values.confirm_password, onChange: handleChange, className: "py-2 ", isInvalid: !!touched.confirm_password &&
                                                                    !!errors.confirm_password }), _jsx(InputGroup.Text, { onClick: toggleConfirmPasswordVisibility, style: {
                                                                    cursor: "pointer",
                                                                    backgroundColor: "white"
                                                                }, children: _jsx(FontAwesomeIcon, { icon: showConfirmPassword ? faEyeSlash : faEyeRegular, style: { color: customStyles.primaryColor } }) })] }), _jsx(ErrorMessage, { name: "confirm_password", component: "div", className: "invalid-feedback d-block" })] }), _jsx(Button, { type: "submit", className: "w-100 mb-3 py-2 fw-semibold", disabled: isLoading, style: {
                                                    backgroundColor: customStyles.primaryColor,
                                                    borderColor: customStyles.primaryColor,
                                                    color: "white",
                                                    boxShadow: "none",
                                                    fontFamily: "body"
                                                }, children: isLoading ? (_jsxs(_Fragment, { children: [_jsx(Spinner, { as: "span", animation: "border", size: "sm", role: "status", "aria-hidden": "true", className: "me-2", style: { fontFamily: "heading" } }), "Signing Up..."] })) : ("Sign up") }), _jsxs("div", { className: "text-center mt-3", children: [_jsxs("span", { className: "text-center", style: { fontFamily: "heading" }, children: ["Already have an account?", " "] }), _jsx(Link, { className: "text-decoration-none", style: {
                                                            // Uses the custom primary color for the link
                                                            color: customStyles.primaryColor,
                                                            fontWeight: "500",
                                                            fontFamily: "body"
                                                        }, role: "button", to: "/login", children: "sign in" })] })] })) })] }) }) }) }), _jsx("footer", { className: "text-center text-muted py-3 small border-top", style: {
                    position: "fixed", //  at the bottom of the viewport
                    bottom: "0",
                    width: "100%",
                    backgroundColor: "#f5f5f5",
                    fontSize: "0.8rem",
                    zIndex: 1000,
                    fontFamily: "body"
                }, children: _jsxs("div", { className: "d-flex justify-content-between align-items-center", children: [_jsxs("div", { className: "footer-copyright", children: ["\u00A9 2025 ", customStyles.logoText, ". All rights reserved."] }), _jsxs("div", { className: "d-flex align-items-center", children: [_jsx(Link, { className: "text-muted text-decoration-none me-3", style: { fontFamily: "body" }, role: "button", to: "/system-admin", children: "Privacy Policy" }), _jsx("a", { href: "#", className: "text-muted text-decoration-none me-3", style: { fontFamily: "body" }, children: "Terms of Service" }), _jsx("a", { href: "#", className: "text-muted text-decoration-none", style: { fontFamily: "body" }, children: "Contact Us" })] })] }) })] }));
=======
            // Navigate to login page upon successful registration
            navigate("/login", { replace: true });
        }
        catch (err) {
            // Error handling is managed by Redux slice state (cleared on mount/success)
            console.error("Registration failed:", err);
        }
    };
    // --- Styling Adjustments for Obeeoma Layout ---
    const inputStyle = {
        height: '48px',
        borderRadius: '4px',
    };
    const inputGroupTextStyle = {
        height: '48px',
        backgroundColor: 'white',
        borderColor: '#ced4da',
        color: customStyles.primaryColor,
        width: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };
    const passwordToggleStyle = {
        cursor: 'pointer',
        backgroundColor: 'white',
        borderColor: '#ced4da',
    };
    const formGroupStyle = {
        marginBottom: '1rem', // Standard margin for a compact, two-column form
    };
    // --- End Styling Adjustments ---
    return (_jsxs("div", { style: {
            backgroundColor: customStyles.backgroundColor,
            minHeight: "100vh",
        }, className: "d-flex flex-column col-12", children: [_jsx(Container, { className: "flex-grow-1 d-flex justify-content-center align-items-center py-5", children: _jsx("div", { className: "d-flex justify-content-center w-100", children: _jsx(Card, { className: "shadow-lg border-0", style: {
                            maxWidth: "800px", // Increased max-width for the two-column layout
                            width: "100%",
                            borderRadius: "10px",
                            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
                        }, children: _jsxs(Card.Body, { style: { padding: '2.5rem' }, className: "d-flex flex-column col-12", children: [_jsxs("div", { className: "d-flex flex-column align-items-center justify-content-center mb-4", style: { fontFamily: "heading" }, children: [_jsx("img", { src: logo, alt: `${customStyles.logoText} Logo`, width: "100", className: "mb-1" }), _jsx("span", { className: "text-success small fw-bold mt-1", style: { color: customStyles.primaryColor }, children: "A HAPPY MIND" })] }), _jsx("h3", { className: "text-center mb-2 fw-semibold text-dark", style: { fontFamily: "heading" }, children: "Create your Organisation account" }), _jsx("p", { className: "text-center mb-4 text-muted", style: { fontSize: '1rem' }, children: "Get early access to Obeeoma and empower your team with smarter mental health support. Please fill in the required details below." }), error && (_jsx(Alert, { variant: "danger", dismissible: true, children: error })), _jsx(Formik, { validationSchema: registerValidationSchema, initialValues: initialValues, onSubmit: handleSubmit, children: ({ handleSubmit, handleChange, values, touched, errors }) => (_jsxs(FormikForm, { noValidate: true, onSubmit: handleSubmit, children: [_jsxs(Row, { children: [_jsxs(Col, { md: 6, children: [_jsxs(BootstrapForm.Group, { style: formGroupStyle, children: [_jsxs(InputGroup, { children: [_jsx(InputGroup.Text, { style: inputGroupTextStyle, children: _jsx(FontAwesomeIcon, { icon: faBuilding }) }), _jsx(BootstrapForm.Control, { type: "text", name: "organizationName", placeholder: "Organization Name", value: values.organizationName, onChange: handleChange, style: inputStyle, isInvalid: !!touched.organizationName && !!errors.organizationName })] }), _jsx(BootstrapForm.Control.Feedback, { type: "invalid", children: _jsx(ErrorMessage, { name: "organizationName" }) })] }), _jsxs(BootstrapForm.Group, { style: formGroupStyle, children: [_jsxs(InputGroup, { children: [_jsx(InputGroup.Text, { style: inputGroupTextStyle, children: _jsx(FontAwesomeIcon, { icon: faEnvelope }) }), _jsx(BootstrapForm.Control, { type: "email", name: "companyEmail", placeholder: "Organization Email Address", value: values.companyEmail, onChange: handleChange, style: inputStyle, isInvalid: !!touched.companyEmail && !!errors.companyEmail })] }), _jsx(BootstrapForm.Control.Feedback, { type: "invalid", children: _jsx(ErrorMessage, { name: "companyEmail" }) })] }), _jsxs(BootstrapForm.Group, { style: formGroupStyle, children: [_jsxs(InputGroup, { children: [_jsx(InputGroup.Text, { style: inputGroupTextStyle, children: _jsx(FontAwesomeIcon, { icon: faSitemap }) }), _jsx(BootstrapForm.Select, { name: "organisationSize", value: values.organisationSize, onChange: handleChange, style: inputStyle, isInvalid: !!touched.organisationSize && !!errors.organisationSize, children: organisation_size_options.map((option) => (_jsx("option", { value: option.value, children: option.label }, option.value))) })] }), _jsx(BootstrapForm.Control.Feedback, { type: "invalid", children: _jsx(ErrorMessage, { name: "organisationSize" }) })] }), _jsxs(BootstrapForm.Group, { style: formGroupStyle, children: [_jsxs(InputGroup, { children: [_jsx(InputGroup.Text, { style: inputGroupTextStyle, children: _jsx(FontAwesomeIcon, { icon: faMapMarkerAlt }) }), _jsx(BootstrapForm.Control, { type: "text", name: "Location", placeholder: "Organization Location (e.g., State)", value: values.Location, onChange: handleChange, style: inputStyle, isInvalid: !!touched.Location && !!errors.Location })] }), _jsx(BootstrapForm.Control.Feedback, { type: "invalid", children: _jsx(ErrorMessage, { name: "Location" }) })] })] }), _jsxs(Col, { md: 6, children: [_jsxs(BootstrapForm.Group, { style: formGroupStyle, children: [_jsxs(InputGroup, { children: [_jsx(InputGroup.Text, { style: inputGroupTextStyle, children: _jsx(FontAwesomeIcon, { icon: faUser }) }), _jsx(BootstrapForm.Control, { type: "text", name: "contactPersonName", placeholder: "Contact Person Full Name", value: values.contactPersonName, onChange: handleChange, style: inputStyle, isInvalid: !!touched.contactPersonName && !!errors.contactPersonName })] }), _jsx(BootstrapForm.Control.Feedback, { type: "invalid", children: _jsx(ErrorMessage, { name: "contactPersonName" }) })] }), _jsxs(BootstrapForm.Group, { style: formGroupStyle, children: [_jsxs(InputGroup, { children: [_jsx(InputGroup.Text, { style: inputGroupTextStyle, children: _jsx(FontAwesomeIcon, { icon: faEnvelope }) }), _jsx(BootstrapForm.Control, { type: "email", name: "email", placeholder: "Contact Email Address", value: values.email, onChange: handleChange, style: inputStyle, isInvalid: !!touched.email && !!errors.email })] }), _jsx(BootstrapForm.Control.Feedback, { type: "invalid", children: _jsx(ErrorMessage, { name: "email" }) })] }), _jsxs(BootstrapForm.Group, { style: formGroupStyle, children: [_jsxs(InputGroup, { children: [_jsx(InputGroup.Text, { style: inputGroupTextStyle, children: _jsx(FontAwesomeIcon, { icon: faUserTie }) }), _jsx(BootstrapForm.Select, { name: "contactPersonRole", value: values.contactPersonRole, onChange: handleChange, style: inputStyle, isInvalid: !!touched.contactPersonRole && !!errors.contactPersonRole, children: contact_role_options.map((option) => (_jsx("option", { value: option.value, children: option.label }, option.value))) })] }), _jsx(BootstrapForm.Control.Feedback, { type: "invalid", children: _jsx(ErrorMessage, { name: "contactPersonRole" }) })] }), _jsxs(BootstrapForm.Group, { style: formGroupStyle, children: [_jsxs(InputGroup, { children: [_jsx(InputGroup.Text, { style: inputGroupTextStyle, children: _jsx(FontAwesomeIcon, { icon: faPhone }) }), _jsx(BootstrapForm.Control, { type: "tel", name: "phoneNumber", placeholder: "Contact Person's Phone Number", value: values.phoneNumber, onChange: handleChange, style: inputStyle, isInvalid: !!touched.phoneNumber && !!errors.phoneNumber })] }), _jsx(BootstrapForm.Control.Feedback, { type: "invalid", children: _jsx(ErrorMessage, { name: "phoneNumber" }) })] })] }), _jsx(Col, { md: 6, children: _jsxs(BootstrapForm.Group, { style: formGroupStyle, controlId: "password", children: [_jsxs(InputGroup, { children: [_jsx(BootstrapForm.Control, { type: showPassword ? "text" : "password", name: "password", value: values.password, onChange: handleChange, placeholder: "Password", style: inputStyle, isInvalid: touched.password && !!errors.password }), _jsx(InputGroup.Text, { onClick: togglePasswordVisibility, style: passwordToggleStyle, children: _jsx(FontAwesomeIcon, { icon: showPassword ? faEyeSlash : faEyeRegular, style: { color: customStyles.primaryColor } }) })] }), _jsx(ErrorMessage, { name: "password", component: "div", className: "invalid-feedback d-block" })] }) }), _jsx(Col, { md: 6, children: _jsxs(BootstrapForm.Group, { style: formGroupStyle, controlId: "confirmPassword", children: [_jsxs(InputGroup, { children: [_jsx(BootstrapForm.Control, { type: showConfirmPassword ? "text" : "password", name: "confirmPassword", value: values.confirmPassword, onChange: handleChange, placeholder: "Confirm Password", style: inputStyle, isInvalid: !!touched.confirmPassword && !!errors.confirmPassword }), _jsx(InputGroup.Text, { onClick: toggleConfirmPasswordVisibility, style: passwordToggleStyle, children: _jsx(FontAwesomeIcon, { icon: showConfirmPassword ? faEyeSlash : faEyeRegular, style: { color: customStyles.primaryColor } }) })] }), _jsx(ErrorMessage, { name: "confirmPassword", component: "div", className: "invalid-feedback d-block" })] }) })] }), _jsx("div", { style: { padding: '0 15px', marginTop: '1rem' }, children: _jsx(Button, { type: "submit", className: "w-100 py-3 fw-semibold", disabled: isLoading, style: {
                                                        backgroundColor: customStyles.primaryColor,
                                                        borderColor: customStyles.primaryColor,
                                                        color: "white",
                                                        boxShadow: "none",
                                                        fontFamily: "body",
                                                        marginBottom: '1rem'
                                                    }, children: isLoading ? (_jsxs(_Fragment, { children: [_jsx(Spinner, { as: "span", animation: "border", size: "sm", role: "status", "aria-hidden": "true", className: "me-2", style: { fontFamily: "heading" } }), "Signing Up..."] })) : ("Sign up") }) }), _jsxs("p", { className: "text-center mt-3 text-muted", children: ["Already have an account? ", _jsx(Link, { to: "/login", style: { color: customStyles.primaryColor, textDecoration: "none", fontWeight: "600" }, children: "Log in" })] })] })) })] }) }) }) }), _jsx("footer", { className: "text-center text-muted py-3 small border-top", style: {
                    backgroundColor: "#f5f5f5",
                    fontSize: "0.8rem",
                    fontFamily: "body"
                }, children: _jsxs("div", { className: "d-flex justify-content-between align-items-center container", children: [_jsxs("div", { className: "footer-copyright", children: ["\u00A9 2025 ", customStyles.logoText, ". All rights reserved."] }), _jsxs("div", { className: "d-flex align-items-center", children: [_jsx(Link, { className: "text-muted text-decoration-none me-3", style: { fontFamily: "body" }, role: "button", to: "/privacy-policy", children: "Privacy Policy" }), _jsx("a", { href: "#", className: "text-muted text-decoration-none me-3", style: { fontFamily: "body" }, children: "Terms of Service" }), _jsx("a", { href: "#", className: "text-muted text-decoration-none", style: { fontFamily: "body" }, children: "Contact Us" })] })] }) })] }));
>>>>>>> syda
};
export default Register;
