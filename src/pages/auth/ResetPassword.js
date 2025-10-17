import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, clearError } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
// Assuming you have 'resetPasswordValidationSchema' correctly defined
import { resetPasswordValidationSchema } from "./../../validation/authValidation";
import { Formik } from "formik";
import { Row, Col, Form, Button, Card, Alert, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
const ResetPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // Ensure the error state is cleared on mount
    const { isLoading, error } = useSelector((state) => state.auth);
    useEffect(() => {
        dispatch(clearError());
    }, [dispatch]);
    // The type definition for handleSubmit payload should match the Formik initialValues and the Redux action payload
    const handleSubmit = (values) => {
        dispatch(resetPassword({
            ...values,
            onSuccess: () => navigate("/login"),
        }));
    };
    return (_jsx("div", { className: "d-flex align-items-center justify-content-center min-vh-100 bg-light", children: _jsx(Card, { className: "shadow-lg border-0 overflow-hidden", style: { maxWidth: "900px", width: "100%" }, children: _jsxs(Row, { className: "g-0", children: [_jsxs(Col, { md: 6, className: "p-5 bg-white", children: [_jsx("h2", { className: "fw-semibold mb-2", children: "Reset Your Password" }), _jsx("p", { className: "text-muted mb-4", children: "Enter your new password" }), error && (_jsx(Alert, { variant: "danger", onClose: () => dispatch(clearError()), dismissible: true, children: error })), _jsx(Formik, { initialValues: {
                                    newPassword: "",
                                    confirmNewPassword: "",
                                    // You might need to add code/token fields here if they are part of the form
                                }, validationSchema: resetPasswordValidationSchema, onSubmit: handleSubmit, children: ({ handleChange, handleSubmit, values, errors, touched }) => (_jsxs(Form, { noValidate: true, onSubmit: handleSubmit, children: [_jsxs(Form.Group, { className: "mb-3", controlId: "formNewPassword", children: [_jsx(Form.Label, { visuallyHidden: true, children: "New Password" }), _jsx(Form.Control, { type: "password", placeholder: "New Password", className: "py-2", name: "newPassword", value: values.newPassword, onChange: handleChange, isInvalid: touched.newPassword && !!errors.newPassword }), _jsx(Form.Control.Feedback, { type: "invalid", children: errors.newPassword })] }), _jsxs(Form.Group, { className: "mb-4", controlId: "formConfirmPassword", children: [_jsx(Form.Label, { visuallyHidden: true, children: "Confirm New Password" }), _jsx(Form.Control, { type: "password", placeholder: "Confirm New Password", className: "py-2", name: "confirmNewPassword", value: values.confirmNewPassword, onChange: handleChange, isInvalid: touched.confirmNewPassword && !!errors.confirmNewPassword }), _jsx(Form.Control.Feedback, { type: "invalid", children: errors.confirmNewPassword })] }), _jsx(Button, { variant: "success", type: "submit", className: "w-100 mb-3 py-2 fw-semibold", disabled: isLoading, children: isLoading ? (_jsxs(_Fragment, { children: [_jsx(Spinner, { as: "span", animation: "border", size: "sm", role: "status", "aria-hidden": "true", className: "me-2" }), "Resetting Password..."] })) : ("Change Password") })] })) })] }), _jsxs(Col, { md: 6, className: "p-5 text-dark d-flex flex-column justify-content-center bg-success bg-opacity-10", children: [_jsx("h3", { className: "fw-semibold mb-4", children: "Secure Your Account" }), _jsx("p", { className: "text-muted mb-3", children: "Resetting your password ensures your account remains safe. Use a strong password that you haven\u2019t used before." }), _jsxs("ul", { className: "list-unstyled text-secondary mb-0", children: [_jsx("li", { className: "mb-2", children: "\u2714 Protect your sensitive information" }), _jsx("li", { className: "mb-2", children: "\u2714 Access your care plan securely" }), _jsx("li", { children: "\u2714 Continue your wellness journey with peace of mind" })] })] })] }) }) }));
};
export default ResetPassword;
