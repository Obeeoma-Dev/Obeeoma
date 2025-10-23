import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "../../store/slices/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { loginValidationSchema } from "./../../validation/authValidation";
import { Formik } from "formik";
import { Container, Card, Form, Button, Alert, Spinner, } from "react-bootstrap";
import AuthLayout from "../../components/shared/AuthLayout";
const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, error } = useSelector((state) => state.auth);
    useEffect(() => {
        dispatch(clearError());
    }, [dispatch]);
    const handleSubmit = (values) => {
        dispatch(loginUser({
            ...values,
            onSuccess: () => navigate("/system-admin"),
        }));
    };
    return (_jsx(AuthLayout, { children: _jsx(Container, { className: "d-flex justify-content-center align-items-center", children: _jsx(Card, { className: "shadow-sm border-0 p-4", style: { maxWidth: "480px", width: "100%" }, children: _jsxs(Card.Body, { children: [_jsx("h3", { className: "text-center mb-2 fw-semibold text-dark", children: "Sign in to your account" }), _jsx("p", { className: "text-center text-muted mb-4", children: "Welcome back to Obeeoma" }), error && (_jsx(Alert, { variant: "danger", onClose: () => dispatch(clearError()), dismissible: true, children: error })), _jsx(Formik, { initialValues: { username: "", password: "" }, validationSchema: loginValidationSchema, onSubmit: handleSubmit, children: ({ handleChange, handleSubmit, values, errors, touched }) => (_jsxs(Form, { noValidate: true, onSubmit: handleSubmit, children: [_jsxs(Form.Group, { className: "mb-3", controlId: "username", children: [_jsx(Form.Control, { type: "text", name: "username", value: values.username, onChange: handleChange, placeholder: "Username", className: "py-2 border-success border-opacity-25", isInvalid: touched.username && !!errors.username }), _jsx(Form.Control.Feedback, { type: "invalid", children: errors.username })] }), _jsxs(Form.Group, { className: "mb-3", controlId: "password", children: [_jsx(Form.Control, { type: "password", name: "password", value: values.password, onChange: handleChange, placeholder: "Password", className: "py-2 border-success border-opacity-25", isInvalid: touched.password && !!errors.password }), _jsx(Form.Control.Feedback, { type: "invalid", children: errors.password })] }), _jsx("div", { className: "d-flex justify-content-between align-items-center mb-3", children: _jsx(Link, { to: "/reset-password-signin", className: "text-success text-decoration-none small", children: "Forgot password?" }) }), _jsx(Form.Check, { type: "checkbox", label: "Remember me", className: "mb-3 text-muted" }), _jsx(Button, { variant: "success", type: "submit", className: "w-100 mb-3 py-2 fw-semibold", disabled: isLoading, children: isLoading ? (_jsxs(_Fragment, { children: [_jsx(Spinner, { as: "span", animation: "border", size: "sm", role: "status", "aria-hidden": "true", className: "me-2" }), "Signing in..."] })) : ("Sign in") }), _jsxs("div", { className: "text-center", children: [_jsx("span", { className: "text-muted", children: "Don't have an account? " }), _jsx(Link, { to: "/signup", className: "text-success text-decoration-none fw-semibold", children: "Create an account" })] })] })) })] }) }) }) }));
};
export default LoginPage;
