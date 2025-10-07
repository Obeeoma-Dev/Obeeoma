import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from 'react';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Alert, Form as BootstrapForm, Spinner } from 'react-bootstrap';
import { loginUser, clearError } from './../../store/slices/authSlice';
import { loginValidationSchema } from './../../validation/authValidation';
const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, error } = useSelector((state) => state.auth);
    const handleSubmit = (values) => {
        dispatch(loginUser({
            ...values,
            onSuccess: () => navigate('/employee-dashboard')
        }));
    };
    React.useEffect(() => {
        dispatch(clearError());
    }, [dispatch]);
    return (_jsx(Container, { className: "mt-5", children: _jsx(Row, { className: "justify-content-center", children: _jsx(Col, { md: 6, lg: 4, children: _jsx(Card, { children: _jsxs(Card.Body, { children: [_jsx(Card.Title, { className: "text-center mb-4", children: "Login" }), error && (_jsx(Alert, { variant: "danger", dismissible: true, onClose: () => dispatch(clearError()), children: error })), _jsx(Formik, { initialValues: { username: '', password: '' }, validationSchema: loginValidationSchema, onSubmit: handleSubmit, children: ({ values, errors, touched, handleChange, handleBlur }) => (_jsxs(Form, { children: [_jsxs(BootstrapForm.Group, { className: "mb-3", children: [_jsx(BootstrapForm.Label, { children: "Username" }), _jsx(BootstrapForm.Control, { type: "text", name: "username", value: values.username, onChange: handleChange, onBlur: handleBlur, isInvalid: touched.username && !!errors.username, placeholder: "Enter your username" }), _jsx(BootstrapForm.Control.Feedback, { type: "invalid", children: errors.username })] }), _jsxs(BootstrapForm.Group, { className: "mb-3", children: [_jsx(BootstrapForm.Label, { children: "Password" }), _jsx(BootstrapForm.Control, { type: "password", name: "password", value: values.password, onChange: handleChange, onBlur: handleBlur, isInvalid: touched.password && !!errors.password, placeholder: "Enter your password" }), _jsx(BootstrapForm.Control.Feedback, { type: "invalid", children: errors.password })] }), _jsx(Button, { variant: "primary", type: "submit", className: "w-100", disabled: isLoading, children: isLoading ? (_jsxs(_Fragment, { children: [_jsx(Spinner, { as: "span", animation: "border", size: "sm", role: "status", "aria-hidden": "true", className: "me-2" }), "Logging in..."] })) : ('Login') })] })) })] }) }) }) }) }));
};
export default LoginForm;
