import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form as FormikForm } from "formik";
import { resetPasswordValidationSchema } from "./../../validation/authValidation";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../store/slices/authSlice";
import { Container, Card, Button, Form as BootstrapForm, Alert, Spinner, InputGroup, } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faEye as faEyeRegular } from "@fortawesome/free-regular-svg-icons";
import logo from "./../../assets/Images/obeeomalogoword1.png";
const customStyles = {
    primaryColor: "#3CB371", // The green
    logoText: "Obeeoma",
};
const ResetPassword = () => {
    const navigate = useNavigate();
    // Correct: Only declare dispatch once
    const dispatch = useDispatch();
    // Local state for UI feedback
    const [apiError, setApiError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    // State for password visibility toggles
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmPassword] = useState(false);
    const toggleNewPasswordVisibility = () => setShowNewPassword((prev) => !prev);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);
    // Initial Formik Values
    const initialValues = {
        //code: "",
        password: "",
        confirmPassword: "",
    };
    const handleResetSubmit = async (values) => {
        setApiError(null);
        setIsLoading(true);
        try {
            const payload = {
                //token: values.code,
                confirmPassword: values.confirmPassword,
                password: values.password,
                onSuccess: () => navigate("/login", { replace: true }),
            };
            await dispatch(resetPassword(payload)).unwrap();
        }
        catch (error) {
            console.error("Password reset failed:", error);
            // Ensure the error is handled safely (e.g., convert to string)
            const errorMessage = typeof error === 'string'
                ? error
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                : error?.message || "Failed to reset password. Please try again.";
            setApiError(errorMessage);
        }
        finally {
            setIsLoading(false);
        }
    }; // <--- The duplicated code blocks and the extra closing brace were removed here.
    return (_jsxs("div", { style: {
            backgroundColor: "#f5f5f5",
            height: "100vh",
            overflow: "auto",
            paddingBottom: "80px",
        }, className: "d-flex justify-content-center align-items-center", children: [_jsx(Container, { children: _jsx("div", { className: "d-flex justify-content-center", children: _jsx(Card, { className: "shadow-sm border-0 p-4", style: {
                            maxWidth: "600px",
                            width: "100%",
                            borderRadius: "8px",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        }, children: _jsxs(Card.Body, { children: [_jsx("div", { className: "d-flex flex-column align-items-center justify-content-center mb-4", style: { fontFamily: "heading" }, children: _jsx("img", { src: logo, alt: "Obeeoma Logo", style: {
                                            height: "50px",
                                            width: "auto"
                                        }, className: "mb-1" }) }), _jsx("h3", { className: "mb-2 fw-semibold text-dark", style: { fontFamily: "body", textAlign: "center", fontSize: "24px" }, children: "Reset Your Password" }), _jsx("p", { className: "text-muted mb-4 small ", style: { fontFamily: "body", textAlign: "center", fontSize: "14px" }, children: "Enter the code and your new password." }), apiError && (_jsx(Alert, { variant: "danger", className: "py-2", children: apiError })), _jsx(Formik, { initialValues: initialValues, validationSchema: resetPasswordValidationSchema, onSubmit: handleResetSubmit, children: ({ handleChange, handleSubmit: formikSubmit, values, errors, touched, }) => (_jsxs(FormikForm, { noValidate: true, onSubmit: formikSubmit, children: [_jsxs(BootstrapForm.Group, { className: "mb-3", controlId: "password", children: [_jsxs(InputGroup, { children: [_jsx(BootstrapForm.Control, { style: { fontFamily: "body" }, type: showNewPassword ? "text" : "password", name: "password", value: values.password, onChange: handleChange, placeholder: "New Password", className: "py-2 border-success border-opacity-25", isInvalid: touched.password && !!errors.password }), _jsx(InputGroup.Text, { onClick: toggleNewPasswordVisibility, style: { cursor: "pointer", backgroundColor: "white" }, children: _jsx(FontAwesomeIcon, { icon: showNewPassword ? faEyeSlash : faEyeRegular, style: { color: customStyles.primaryColor } }) })] }), _jsx(BootstrapForm.Control.Feedback, { type: "invalid", className: "d-block", children: touched.password && errors.password })] }), _jsxs(BootstrapForm.Group, { className: "mb-4", controlId: "confirmNewPassword", children: [_jsxs(InputGroup, { children: [_jsx(BootstrapForm.Control, { style: { fontFamily: "body" }, type: showConfirmNewPassword ? "text" : "password", name: "confirmPassword", placeholder: "Confirm New Password", value: values.confirmPassword, onChange: handleChange, className: "py-2 ", isInvalid: touched.confirmPassword && !!errors.confirmPassword }), _jsx(InputGroup.Text, { onClick: toggleConfirmPasswordVisibility, style: { cursor: "pointer", backgroundColor: "white" }, children: _jsx(FontAwesomeIcon, { icon: showConfirmNewPassword ? faEyeSlash : faEyeRegular, style: { color: customStyles.primaryColor } }) })] }), _jsx(BootstrapForm.Control.Feedback, { type: "invalid", className: "d-block", children: touched.confirmPassword && errors.confirmPassword })] }), _jsx(Button, { type: "submit", className: "w-100 mb-3 py-2 fw-semibold", disabled: isLoading, style: {
                                                    backgroundColor: customStyles.primaryColor,
                                                    borderColor: customStyles.primaryColor,
                                                    color: "white",
                                                    boxShadow: "none",
                                                }, children: isLoading ? (_jsxs(_Fragment, { children: [_jsx(Spinner, { as: "span", animation: "border", size: "sm", role: "status", "aria-hidden": "true", className: "me-2" }), "Changing..."] })) : ("Change Password") })] })) }), _jsx("div", { className: "text-center mt-3", children: _jsx(Link, { to: "/login", className: "small text-decoration-none", style: { color: customStyles.primaryColor, fontFamily: "body" }, children: "Back to Sign in" }) })] }) }) }) }), _jsx("footer", { className: "text-center text-muted py-3 small border-top", style: {
                    position: "fixed",
                    bottom: "0",
                    width: "100%",
                    backgroundColor: "#f5f5f5",
                    fontSize: "0.8rem",
                    zIndex: 1000,
                    fontFamily: "body"
                }, children: _jsxs("div", { className: "d-flex justify-content-between align-items-center container", children: [_jsxs("div", { className: "footer-copyright", children: ["\u00A9 2025 ", customStyles.logoText, ". All rights reserved."] }), _jsxs("div", { className: "d-flex align-items-center", children: [_jsx(Link, { className: "text-muted text-decoration-none me-3", style: { fontFamily: "body" }, role: "button", to: "/system-admin", children: "Privacy Policy" }), _jsx("a", { href: "#", className: "text-muted text-decoration-none me-3", style: { fontFamily: "body" }, children: "Terms of Service" }), _jsx("a", { href: "#", className: "text-muted text-decoration-none", style: { fontFamily: "body" }, children: "Contact Us" })] })] }) })] }));
};
export default ResetPassword;
