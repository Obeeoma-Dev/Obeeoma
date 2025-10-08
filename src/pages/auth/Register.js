import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form as FormikForm, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Container, Row, Col, Button, Form as BootstrapForm, } from "react-bootstrap";
const validationSchema = Yup.object({
    aliasName: Yup.string().required("Alias Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),
});
const Register = () => {
    const [role, setRole] = useState("Employee");
    const initialValues = {
        aliasName: "",
        email: "",
        password: "",
        confirmPassword: "",
    };
    const handleSubmit = (values) => {
        // Submit registration with values and role
        console.log("Register submitted:", { ...values, role });
    };
    return (_jsx(Container, { fluid: true, className: "min-vh-100 d-flex align-items-center justify-content-center bg-light", children: _jsxs(Row, { className: "shadow bg-white rounded-lg overflow-hidden w-100", style: { maxWidth: 900 }, children: [_jsxs(Col, { md: 6, className: "p-4", children: [_jsx("h2", { className: "mb-3", children: "Create your account" }), _jsx("p", { className: "mb-4 text-muted", children: "Join our community of mental health professionals and patients" }), _jsx(Formik, { validationSchema: validationSchema, initialValues: initialValues, onSubmit: handleSubmit, children: ({ handleSubmit, handleChange, values, touched, errors }) => (_jsxs(FormikForm, { noValidate: true, onSubmit: handleSubmit, children: [_jsxs(BootstrapForm.Group, { className: "mb-3", children: [_jsx(BootstrapForm.Label, { children: "Alias Name" }), _jsx(BootstrapForm.Control, { type: "text", name: "aliasName", value: values.aliasName, onChange: handleChange, isInvalid: !!touched.aliasName && !!errors.aliasName, "aria-describedby": "aliasName-label" }), _jsx(BootstrapForm.Control.Feedback, { type: "invalid", children: _jsx(ErrorMessage, { name: "aliasName" }) })] }), _jsxs(BootstrapForm.Group, { className: "mb-3", children: [_jsx(BootstrapForm.Label, { children: "Email" }), _jsx(BootstrapForm.Control, { type: "email", name: "email", value: values.email, onChange: handleChange, isInvalid: !!touched.email && !!errors.email, "aria-describedby": "email-label" }), _jsx(BootstrapForm.Control.Feedback, { type: "invalid", children: _jsx(ErrorMessage, { name: "email" }) })] }), _jsxs(BootstrapForm.Group, { className: "mb-3", children: [_jsx(BootstrapForm.Label, { children: "Password" }), _jsx(BootstrapForm.Control, { type: "password", name: "password", value: values.password, onChange: handleChange, isInvalid: !!touched.password && !!errors.password, "aria-describedby": "password-label" }), _jsx(BootstrapForm.Control.Feedback, { type: "invalid", children: _jsx(ErrorMessage, { name: "password" }) })] }), _jsxs(BootstrapForm.Group, { className: "mb-3", children: [_jsx(BootstrapForm.Label, { children: "Confirm Password" }), _jsx(BootstrapForm.Control, { type: "password", name: "confirmPassword", value: values.confirmPassword, onChange: handleChange, isInvalid: !!touched.confirmPassword && !!errors.confirmPassword, "aria-describedby": "confirmPassword-label" }), _jsx(BootstrapForm.Control.Feedback, { type: "invalid", children: _jsx(ErrorMessage, { name: "confirmPassword" }) })] }), _jsxs(BootstrapForm.Group, { className: "mb-4", children: [_jsx(BootstrapForm.Label, { children: "I am an:" }), _jsxs("div", { children: [_jsx(BootstrapForm.Check, { type: "radio", id: "roleEmployee", label: "Employee", name: "role", value: "Employee", checked: role === "Employee", onChange: () => setRole("Employee"), inline: true }), _jsx(BootstrapForm.Check, { type: "radio", id: "roleEmployer", label: "Employer", name: "role", value: "Employer", checked: role === "Employer", onChange: () => setRole("Employer"), inline: true })] })] }), _jsx(Button, { type: "submit", variant: "success", size: "lg", className: "w-100", children: "Create Account" })] })) }), _jsxs("p", { className: "mt-3 text-center text-muted", children: ["Already have an account?", " ", _jsx(Link, { to: "/Login", className: "text-success fw-semibold", children: "Sign in" })] })] }), _jsxs(Col, { md: 6, className: "bg-success bg-opacity-25 p-4 d-flex flex-column justify-content-center", children: [_jsx("h3", { className: "mb-4 fw-semibold", children: "Begin Your Wellness Journey" }), _jsx("p", { className: "text-muted mb-4", children: "Creating an account gives you access to personalized mental health resources, secure communication with healthcare providers, and tools to track your progress." }), _jsxs("ul", { className: "text-secondary", children: [_jsx("li", { children: "\u2714 Personalized care plans" }), _jsx("li", { children: "\u2714 Secure messaging with providers" }), _jsx("li", { children: "\u2714 Progress tracking tools" })] })] })] }) }));
};
export default Register;
