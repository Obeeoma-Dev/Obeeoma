import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, clearError } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { forgotPasswordValidationSchema } from "./../../validation/authValidation";
import { Formik } from "formik";
import { Row, Col, Form, Button, Card, Alert, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// The `: React.FC` defines this as a Functional Component in TypeScript.
const ResetPasswordSignin = () => {
    // `useDispatch` is typed with `AppDispatch` for type-safe actions.
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // The state from `useSelector` is correctly typed using `RootState`.
    const { isLoading, error } = useSelector((state) => state.auth);
    useEffect(() => {
        dispatch(clearError());
    }, [dispatch]);
    // The `values` parameter is explicitly typed.
    const handleSubmit = (values) => {
        dispatch(forgotPassword({
            ...values,
            onSuccess: () => navigate("/accept-invite"),
        }));
    };
    return (_jsx("div", { className: "d-flex align-items-center justify-content-center min-vh-100 bg-light", children: _jsx(Card, { className: "shadow-lg border-0 overflow-hidden", style: { maxWidth: "900px", width: "100%" }, children: _jsxs(Row, { className: "g-0", children: [_jsxs(Col, { md: 6, className: "p-5 bg-white", children: [_jsx("h2", { className: "fw-semibold mb-2", children: "Reset Password to Sign in" }), _jsx("p", { className: "text-muted mb-4", children: "Send code to email" }), error && (_jsx(Alert, { variant: "danger", onClose: () => dispatch(clearError()), dismissible: true, children: error })), _jsx(Formik, { initialValues: { email: "" }, validationSchema: forgotPasswordValidationSchema, onSubmit: handleSubmit, children: ({ handleChange, handleSubmit, values, errors, touched }) => (_jsxs(Form, { noValidate: true, onSubmit: handleSubmit, children: [_jsxs(Form.Group, { className: "mb-4", controlId: "formEmail", children: [_jsx(Form.Control, { type: "email", placeholder: "Email address", className: "py-2", name: "email", value: values.email, onChange: handleChange, isInvalid: touched.email && !!errors.email }), _jsx(Form.Control.Feedback, { type: "invalid", children: errors.email })] }), _jsx(Button, { variant: "success", type: "submit", className: "w-100 mb-3 py-2 fw-semibold", disabled: isLoading, children: isLoading ? (_jsxs(_Fragment, { children: [_jsx(Spinner, { as: "span", animation: "border", size: "sm", role: "status", "aria-hidden": "true", className: "me-2" }), "Sending..."] })) : ("Send Code") })] })) }), _jsxs("p", { className: "text-center text-muted mt-4", children: ["Didn\u2019t receive any code?", " "] })] }), _jsxs(Col, { md: 6, className: "p-5 text-dark d-flex flex-column justify-content-center bg-success bg-opacity-10", children: [_jsx("h3", { className: "fw-semibold mb-4", children: "Reset & Continue" }), _jsx("p", { className: "text-muted mb-3", children: "Sign in to access your personalized mental health dashboard, connect with your care team, and continue your wellness journey." }), _jsxs("ul", { className: "list-unstyled text-secondary mb-0", children: [_jsx("li", { className: "mb-2", children: "\u2714 Access your care plan" }), _jsx("li", { className: "mb-2", children: "\u2714 Trigger crisis hotlines" }), _jsx("li", { children: "\u2714 Get easy assessment through Sana" })] })] })] }) }) }));
};
export default ResetPasswordSignin;
