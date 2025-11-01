import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "../../store/slices/authSlice";
// import { LoginSuccessPayload } from "../../types/auth"; //not used
import { useNavigate, Link } from "react-router-dom";
import { loginValidationSchema } from "./../../validation/authValidation";
import { Formik } from "formik";
import { Container, Card, Form, Button, Alert, Spinner, InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faEye as faEyeRegular } from '@fortawesome/free-regular-svg-icons';
import logo from "./../../assets/Images/green..png";
const customStyles = {
    primaryColor: "#3CB371",
    // /lightPink: "#f8d7da",
    logoText: "Obeeoma",
};
const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, error, user } = useSelector((state) => state.auth);
    // const [role, setRole] = useState<string>("employer");
    const [showPassword, setShowPassword] = useState(false);
    // function for the eye visibility toggle
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };
    useEffect(() => {
        dispatch(clearError());
    }, [dispatch]);
    const getDashboardRoute = (role) => {
        const normalizedRole = role?.toLowerCase().trim();
        switch (normalizedRole) {
            case "systemadmin":
                return "/system-admin";
            case "employer":
                return "/employer-dashboard";
            case "employee":
                return "/employee-dashboard";
            default:
                console.warn(`Unrecognized role: ${role}. Falling back to /employer-dashboard.`);
                return "/employer-dashboard";
        }
    };
    const handleSubmit = async (values) => {
        try {
            const resultAction = await dispatch(loginUser({ username: values.username, password: values.password })).unwrap();
            // const roleFromPayload = (resultAction as any)?.user?.role;
            //  const userRole = roleFromPayload || user?.role || "employer"; // Fallback to 'employer'
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const userRole = resultAction?.role || user?.role;
            console.log("Final Role Determined:", userRole);
            const destinationPath = getDashboardRoute(userRole);
            navigate(destinationPath, { replace: true });
        }
        catch (err) {
            // This block catches any error thrown by the 'loginUser' thunk (e.g., 401 Unauthorized, network error).
            console.error("Login failed (handled by Redux error state):", err);
        }
    };
    return (_jsxs("div", { style: {
            backgroundColor: "#f5f5f5",
            minHeight: "100vh",
            paddingTop: "50px",
        }, className: "min-vh-100 d-flex flex-column justify-content-center  align-items-start", children: [_jsx(Container, { className: "d-flex justify-content-center align-items- start", children: _jsx(Card, { className: "shadow-sm border-0 p-4", style: {
                        maxWidth: "600px",
                        width: "100%",
                        border: "none",
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1) ",
                    }, children: _jsxs(Card.Body, { children: [_jsxs("div", { className: "d-flex flex-column align-items-center justify-content-center mb-4", style: { fontFamily: "heading" }, children: [_jsx("img", { src: logo, alt: "Obeeoma Logo", width: "100", className: "mb-1" }), _jsx("p", { className: "m-0 text-center" })] }), _jsx("h3", { className: "text-center mb-2 fw-semibold text-dark", style: { fontFamily: 'heading' }, children: "Sign in to your account" }), _jsx("p", { className: "text-center text-muted mb-4", style: { fontFamily: 'heading' } }), error && (_jsx(Alert, { variant: "danger", onClose: () => dispatch(clearError()), dismissible: true, children: error })), _jsx(Formik, { initialValues: { username: "", password: "" }, validationSchema: loginValidationSchema, onSubmit: handleSubmit, children: ({ handleChange, handleSubmit: formikSubmit, values, errors, touched, }) => (_jsxs(Form, { noValidate: true, onSubmit: formikSubmit, children: [_jsxs(Form.Group, { className: "mb-3", controlId: "username", children: [_jsx(Form.Control, { type: "text", style: { fontFamily: "body" }, name: "username", value: values.username, onChange: handleChange, placeholder: "Username", className: "py-2 border-success border-opacity-25", isInvalid: touched.username && !!errors.username }), _jsx(Form.Control.Feedback, { type: "invalid", children: errors.username })] }), _jsxs(Form.Group, { className: "mb-3", controlId: "password", children: [_jsxs(InputGroup, { children: [_jsx(Form.Control, { style: { fontFamily: "body" }, type: showPassword ? "text" : "password", name: "password", value: values.password, onChange: handleChange, placeholder: "Password", className: "py-2 border-success border-opacity-25", isInvalid: touched.password && !!errors.password }), _jsx(InputGroup.Text, { onClick: togglePasswordVisibility, style: {
                                                                cursor: "pointer",
                                                                backgroundColor: "white"
                                                            }, children: _jsx(FontAwesomeIcon, { icon: showPassword ? faEyeSlash : faEyeRegular, style: { color: customStyles.primaryColor } }) })] }), (touched.password && !!errors.password) && (_jsx("div", { className: "invalid-feedback d-block", children: errors.password }))] }), _jsx("div", { className: "d-flex justify-content-between align-items-center mb-3", children: _jsx(Link, { to: "/reset-password-signin", className: "small", style: {
                                                    color: customStyles.primaryColor,
                                                    textDecoration: "none",
                                                    fontFamily: "body"
                                                }, children: "Forgot password?" }) }), _jsx(Form.Check, { type: "checkbox", label: "Remember me", className: "mb-3 text-muted" }), _jsx(Button, { type: "submit", className: "w-100 mb-3 py-2 fw-semibold", disabled: isLoading, style: {
                                                backgroundColor: customStyles.primaryColor,
                                                borderColor: customStyles.primaryColor,
                                                color: "white",
                                                boxShadow: "none",
                                                fontFamily: "body"
                                            }, children: isLoading ? (_jsxs(_Fragment, { children: [_jsx(Spinner, { as: "span", animation: "border", size: "sm", role: "status", "aria-hidden": "true", className: "me-2" }), "Signing in..."] })) : ("Sign in") }), _jsxs("div", { className: "text-center mt-4", style: { fontFamily: "body" }, children: [_jsxs("span", { className: "text-center mt-", children: ["Don\u2019t have an account?", " "] }), _jsx(Link, { className: "", style: {
                                                        color: customStyles.primaryColor,
                                                        textDecoration: "none",
                                                        marginLeft: "5px",
                                                        fontWeight: "500",
                                                        fontFamily: "body"
                                                    }, role: "button", to: "/signup", children: "Create an account" })] })] })) })] }) }) }), _jsx("div", {}), _jsx("footer", { className: "text-center text-muted py-3 small border-top", style: {
                    position: "fixed", //  at the bottom of the viewport
                    bottom: "0",
                    width: "100%",
                    backgroundColor: "#f5f5f5",
                    fontSize: "0.8rem",
                    zIndex: 1000,
                    fontFamily: "body"
                }, children: _jsxs("div", { className: "d-flex justify-content-between align-items-center", children: [_jsxs("div", { className: "footer-copyright", children: ["\u00A9 2025 ", customStyles.logoText, ". All rights reserved."] }), _jsxs("div", { className: "d-flex align-items-center", children: [_jsx(Link, { className: "text-muted text-decoration-none me-3", style: { fontFamily: "body" }, role: "button", to: "/system-admin", children: "Privacy Policy" }), _jsx("a", { href: "#", className: "text-muted text-decoration-none me-3", style: { fontFamily: "body" }, children: "Terms of Service" }), _jsx("a", { href: "#", className: "text-muted text-decoration-none", style: { fontFamily: "body" }, children: "Contact Us" })] })] }) })] }));
};
export default LoginPage;
