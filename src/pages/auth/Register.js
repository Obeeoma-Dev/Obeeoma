import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form as FormikForm, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearAuthStatus } from "../../store/slices/authSlice";
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
    const [role] = useState("employer");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, isLoading } = useSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);
    // function for the eye visibility toggle
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(prev => !prev);
    };
    const initialValues = {
        username: "",
        email: "",
        password: "",
        confirm_password: "",
    };
    useEffect(() => {
        dispatch(clearAuthStatus());
    }, [dispatch]);
    const handleSubmit = async (values) => {
        const credentials = {
            ...values,
            role,
        };
        try {
            await dispatch(registerUser(credentials)).unwrap();
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
};
export default Register;
