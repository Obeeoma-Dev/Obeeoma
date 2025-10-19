import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form as FormikForm, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearError } from "../../store/slices/authSlice";
import { registerValidationSchema } from "./../../validation/authValidation";
import { Container, Row, Col, Button, Form as BootstrapForm, Alert, } from "react-bootstrap";
const Register = () => {
    const [role, setRole] = useState("employee");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, error } = useSelector((state) => state.auth);
    const initialValues = {
        username: "",
        email: "",
        password: "",
        confirm_password: "",
    };
    const handleSubmit = (values) => {
        const credentials = {
            ...values,
            role,
        };
        dispatch(registerUser({
            ...credentials,
            onSuccess: () => navigate("/login"),
        }));
    };
    return (_jsx(Container, { fluid: true, className: "min-vh-100 d-flex align-items-center justify-content-center bg-light", children: _jsxs(Row, { className: "shadow bg-white rounded-lg overflow-hidden w-100", style: { maxWidth: 900 }, children: [_jsxs(Col, { md: 6, className: "p-4", children: [_jsx("h2", { className: "mb-3", children: "Create your account" }), _jsx("p", { className: "mb-4 text-muted", children: "Join our community of mental health professionals and patients" }), error && (_jsx(Alert, { variant: "danger", onClose: () => dispatch(clearError()), dismissible: true, children: error })), _jsx(Formik, { validationSchema: registerValidationSchema, initialValues: initialValues, onSubmit: handleSubmit, children: ({ handleSubmit, handleChange, values, touched, errors }) => (_jsxs(FormikForm, { noValidate: true, onSubmit: handleSubmit, children: [_jsxs(BootstrapForm.Group, { className: "mb-3", children: [_jsx(BootstrapForm.Label, { children: "User Name" }), _jsx(BootstrapForm.Control, { type: "text", name: "username", value: values.username, onChange: handleChange, isInvalid: !!touched.username && !!errors.username }), _jsx(BootstrapForm.Control.Feedback, { type: "invalid", children: _jsx(ErrorMessage, { name: "userName" }) })] }), _jsxs(BootstrapForm.Group, { className: "mb-3", children: [_jsx(BootstrapForm.Label, { children: "Email" }), _jsx(BootstrapForm.Control, { type: "email", name: "email", value: values.email, onChange: handleChange, isInvalid: !!touched.email && !!errors.email }), _jsx(BootstrapForm.Control.Feedback, { type: "invalid", children: _jsx(ErrorMessage, { name: "email" }) })] }), _jsxs(BootstrapForm.Group, { className: "mb-3", children: [_jsx(BootstrapForm.Label, { children: "Password" }), _jsx(BootstrapForm.Control, { type: "password", name: "password", value: values.password, onChange: handleChange, isInvalid: !!touched.password && !!errors.password }), _jsx(BootstrapForm.Control.Feedback, { type: "invalid", children: _jsx(ErrorMessage, { name: "password" }) })] }), _jsxs(BootstrapForm.Group, { className: "mb-4", children: [_jsx(BootstrapForm.Label, { children: "Confirm Password" }), _jsx(BootstrapForm.Control, { type: "password", name: "confirm_password", value: values.confirm_password, onChange: handleChange, isInvalid: !!touched.confirm_password && !!errors.confirm_password }), _jsx(BootstrapForm.Control.Feedback, { type: "invalid", children: _jsx(ErrorMessage, { name: "confirmPassword" }) })] }), _jsx(Button, { type: "submit", variant: "success", size: "lg", className: "w-100", children: "Create Account" })] })) }), _jsxs("p", { className: "mt-3 text-center text-muted", children: ["Already have an account?", _jsxs(Link, { to: "/Login", className: "text-success fw-semibold", children: [" ", "Sign in"] })] })] }), _jsxs(Col, { md: 6, className: "bg-success bg-opacity-25 p-4 d-flex flex-column justify-content-center", children: [_jsx("h3", { className: "mb-4 fw-semibold", children: "Begin Your Wellness Journey" }), _jsx("p", { className: "text-muted mb-4", children: "Creating an account gives you access to personalized mental health resources, secure communication with healthcare providers, and tools to track your progress." }), _jsxs("ul", { className: "text-secondary", style: { listStyle: "none" }, children: [_jsx("li", { children: "\u2714 Personalized care plans" }), _jsx("li", { children: "\u2714 Secure messaging with providers" }), _jsx("li", { children: "\u2714 Progress tracking tools" })] })] })] }) }));
};
export default Register;
