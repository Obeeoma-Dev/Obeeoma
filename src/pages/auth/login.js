import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../../store/store";
// import { loginUser, clearError } from "../../store/slices/authSlice";
// import { useNavigate, Link } from "react-router-dom";
// import { loginValidationSchema } from "./../../validation/authValidation";
// import { Formik } from "formik";
// import { Container, Card, Form, Button, Alert, Spinner, InputGroup } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
// import { faEye as faEyeRegular } from '@fortawesome/free-regular-svg-icons';
// import logo from "./../../assets/Images/obeeomalogoword1.png";
// const customStyles = {
//     primaryColor: "#3CB371",
//     logoText: "Obeeoma",
// };
// // Define the padding constant for clarity
// const FOOTER_CLEARANCE_HEIGHT = "80px"; 
// type DashboardPath =
//   | "/system-admin"
//   | "/employer-dashboard"
//   | "/employee-dashboard";
// const LoginPage = () => {
//     const dispatch = useDispatch<AppDispatch>();
//     const navigate = useNavigate();
//     const { isLoading, error, user } = useSelector(
//         (state: RootState) => state.auth
//     );
//     const [showPassword, setShowPassword] = useState(false);
//     const togglePasswordVisibility = () => {
//         setShowPassword((prev) => !prev);
//     };
//     useEffect(() => {
//         dispatch(clearError());
//     }, [dispatch]);
//     const getDashboardRoute = (role: string): DashboardPath => {
//         const normalizedRole = role?.toLowerCase().trim();
//         switch (normalizedRole) {
//             case "systemadmin":
//                 return "/system-admin";
//             case "employer":
//                 return "/employer-dashboard";
//             case "employee":
//                 return "/employee-dashboard";
//             default:
//                 console.warn(
//                     `Unrecognized role: ${role}. Falling back to /employer-dashboard.`
//                 );
//                 return "/employer-dashboard";
//         }
//     };
//     const handleSubmit = async (values: {
//         username: string;
//         password: string;
//     }) => {
//         try {
//             const resultAction = await dispatch(
//                 loginUser({ username: values.username, password: values.password })
//             ).unwrap();
//             // eslint-disable-next-line @typescript-eslint/no-explicit-any
//             const userRole = (resultAction as any)?.role || user?.role;
//             console.log("Final Role Determined:", userRole);
//             const destinationPath: DashboardPath = getDashboardRoute(userRole);
//             navigate(destinationPath, { replace: true });
//         } catch (err) {
//             console.error("Login failed (handled by Redux error state):", err);
//         }
//     };
//     return (
//         <div
//             style={{
//                 backgroundColor: "#f5f5f5",
//                 height: "100vh",
//                 // 1. CHANGE: Allow scrolling if content is too tall
//                 overflow: "auto", 
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 padding: "20px",
//                 // 2. KEEP: This creates the space above the fixed footer
//                 paddingBottom: FOOTER_CLEARANCE_HEIGHT, 
//             }}
//         >
//             <Card
//                 className="shadow-sm-border-0 p-4"
//                 style={{
//                     maxWidth: "600px",
//                     width: "100%",
//                     // 3. ADJUST: Max height should account for the top/bottom padding (40px)
//                     // and the footer clearance (80px) to prevent vertical overlap when centered.
//                     maxHeight: `calc(100vh - 40px - ${FOOTER_CLEARANCE_HEIGHT})`,
//                     overflow: "auto",
//                     borderRadius: "8px",
//                     boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//                 }}
//             >
//                 <Card.Body>
//                     <div className="d-flex flex-column align-items-center justify-content-center mb-4" style={{ fontFamily: "heading" }}>
//                         <img
//                             src={logo}
//                             alt="Obeeoma Logo"
//                             style={{
//                                 height: "50px",
//                                 width: "auto"
//                             }}
//                             className="mb-1"
//                         />
//                     </div>
//                     <h3 className="text-center mb-2 fw-semibold text-dark"
//                         style={{ fontFamily: 'heading' }}
//                     >
//                         Sign in to your account
//                     </h3>
//                     <p className="text-center text-muted mb-4"
//                         style={{ fontFamily: 'heading' }}
//                     >
//                     </p>
//                     {error && (
//                         <Alert
//                             variant="danger"
//                             onClose={() => dispatch(clearError())}
//                             dismissible
//                         >
//                             {error}
//                         </Alert>
//                     )}
//                     <Formik
//                         initialValues={{ username: "", password: "" }}
//                         validationSchema={loginValidationSchema}
//                         onSubmit={handleSubmit}
//                     >
//                         {({
//                             handleChange,
//                             handleSubmit: formikSubmit,
//                             values,
//                             errors,
//                             touched,
//                         }) => (
//                             <Form noValidate onSubmit={formikSubmit}>
//                                 {/* Form fields... */}
//                                 <Form.Group className="mb-3" controlId="username">
//                                     <Form.Control
//                                         type="text"
//                                         style={{ fontFamily: "body" }}
//                                         name="username"
//                                         value={values.username}
//                                         onChange={handleChange}
//                                         placeholder="Username"
//                                         className="py-2 border-success border-opacity-25"
//                                         isInvalid={touched.username && !!errors.username}
//                                     />
//                                     <Form.Control.Feedback type="invalid">
//                                         {errors.username}
//                                     </Form.Control.Feedback>
//                                 </Form.Group>
//                                 <Form.Group className="mb-3" controlId="password">
//                                     <InputGroup>
//                                         <Form.Control
//                                             style={{ fontFamily: "body" }}
//                                             type={showPassword ? "text" : "password"}
//                                             name="password"
//                                             value={values.password}
//                                             onChange={handleChange}
//                                             placeholder="Password"
//                                             className="py-2 border-success border-opacity-25"
//                                             isInvalid={touched.password && !!errors.password}
//                                         />
//                                         <InputGroup.Text
//                                             onClick={togglePasswordVisibility}
//                                             style={{
//                                                 cursor: "pointer",
//                                                 backgroundColor: "white"
//                                             }}>
//                                             <FontAwesomeIcon
//                                                 icon={showPassword ? faEyeSlash : faEyeRegular}
//                                                 style={{ color: customStyles.primaryColor }}
//                                             />
//                                         </InputGroup.Text>
//                                     </InputGroup>
//                                     {(touched.password && !!errors.password) && (
//                                         <div className="invalid-feedback d-block">
//                                             {errors.password}
//                                         </div>
//                                     )}
//                                 </Form.Group>
//                                 {/* Forgot Password */}
//                                 <div className="d-flex justify-content-between align-items-center mb-3">
//                                     <Link
//                                         // Note: Changed to /forgot-password as it's more standard
//                                         to="/forgot-password" 
//                                         className="small"
//                                         style={{
//                                             color: customStyles.primaryColor,
//                                             textDecoration: "none",
//                                             fontFamily: "body"
//                                         }}
//                                     >
//                                         Forgot password?
//                                     </Link>
//                                 </div>
//                                 <Form.Check
//                                     type="checkbox"
//                                     label="Remember me"
//                                     className="mb-3 text-muted"
//                                 />
//                                 <Button
//                                     type="submit"
//                                     className="w-100 mb-3 py-2 fw-semibold"
//                                     disabled={isLoading}
//                                     style={{
//                                         backgroundColor: customStyles.primaryColor,
//                                         borderColor: customStyles.primaryColor,
//                                         color: "white",
//                                         boxShadow: "none",
//                                         fontFamily: "body"
//                                     }}
//                                 >
//                                     {isLoading ? (
//                                         <>
//                                             <Spinner
//                                                 as="span"
//                                                 animation="border"
//                                                 size="sm"
//                                                 role="status"
//                                                 aria-hidden="true"
//                                                 className="me-2"
//                                             />
//                                             Signing in...
//                                         </>
//                                     ) : (
//                                         "Sign in"
//                                     )}
//                                 </Button>
//                                 <div className="text-center mt-4" style={{ fontFamily: "body" }}>
//                                     <span className="text-center mt-">
//                                         Don’t have an account?{" "}
//                                     </span>
//                                     <Link
//                                         className=""
//                                         style={{
//                                             color: customStyles.primaryColor,
//                                             textDecoration: "none",
//                                             marginLeft: "5px",
//                                             fontWeight: "500",
//                                             fontFamily: "body"
//                                         }}
//                                         role="button"
//                                         to="/signup"
//                                     >
//                                         Create an account
//                                     </Link>
//                                 </div>
//                             </Form>
//                         )}
//                     </Formik>
//                 </Card.Body>
//             </Card>
//             {/* The empty div is removed as it's unnecessary */}
//             {/* Footer remains fixed at the bottom */}
//             <footer
//                 className="text-center text-muted py-3 small border-top"
//                 style={{
//                     position: "fixed", 
//                     bottom: "0",
//                     width: "100%",
//                     backgroundColor: "#f5f5f5",
//                     fontSize: "0.8rem",
//                     zIndex: 1000,
//                     fontFamily: "body"
//                 }}
//             >
//                 <div className="d-flex justify-content-between align-items-center container"> {/* Added container class here for better alignment */}
//                     <div className="footer-copyright" >
//                         &copy; 2025 {customStyles.logoText}. All rights reserved.
//                     </div>
//                     <div className="d-flex align-items-center">
//                         <Link
//                             className="text-muted text-decoration-none me-3"
//                             style={{ fontFamily: "body" }}
//                             role="button"
//                             to="/system-admin"
//                         >
//                             Privacy Policy
//                         </Link>
//                         <a
//                             href="#"
//                             className="text-muted text-decoration-none me-3"
//                             style={{ fontFamily: "body" }}
//                         >
//                             Terms of Service
//                         </a>
//                         <a
//                             href="#"
//                             className="text-muted text-decoration-none"
//                             style={{ fontFamily: "body" }}
//                         >
//                             Contact Us
//                         </a>
//                     </div>
//                 </div>
//             </footer>
//         </div>
//     );
// };
// export default LoginPage;
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "../../store/slices/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { loginValidationSchema } from "./../../validation/authValidation";
import { Formik } from "formik";
import { Card, Form, Button, Alert, Spinner, InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faEye as faEyeRegular } from '@fortawesome/free-regular-svg-icons';
import logo from "./../../assets/Images/obeeomalogoword1.png";
const customStyles = {
    primaryColor: "#3CB371",
    logoText: "Obeeoma",
};
const FOOTER_HEIGHT_PADDING = "80px"; // Adjust this value to match your desired footer clearance
const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, error, user } = useSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);
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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const userRole = resultAction?.role || user?.role;
            console.log("Final Role Determined:", userRole);
            const destinationPath = getDashboardRoute(userRole);
            navigate(destinationPath, { replace: true });
        }
        catch (err) {
            // This block catches any error thrown by the 'loginUser' thunk
            console.error("Login failed (handled by Redux error state):", err);
        }
    };
    return (_jsxs("div", { style: {
            backgroundColor: "#f5f5f5",
            // Apply the same styles as your ResetPassword component
            height: "100vh",
            overflow: "auto", // Crucial: allows scrolling if the card is too tall
            display: "flex",
            justifyContent: "center",
            alignItems: "center", // This centers the card vertically when content fits
            padding: "20px",
            // The key property to create space above the fixed footer:
            paddingBottom: FOOTER_HEIGHT_PADDING,
        }, children: [_jsx(Card, { className: "shadow-sm-border-0 p-4", style: {
                    maxWidth: "600px",
                    width: "100%",
                    maxHeight: "calc(100vh - 40px - 80px)", // Adjusted to account for vertical padding and footer padding
                    overflow: "auto",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                }, children: _jsxs(Card.Body, { children: [_jsx("div", { className: "d-flex flex-column align-items-center justify-content-center mb-4", style: { fontFamily: "heading" }, children: _jsx("img", { src: logo, alt: "Obeeoma Logo", style: {
                                    height: "50px",
                                    width: "auto"
                                }, className: "mb-1" }) }), _jsx("h3", { className: "text-center mb-2 fw-semibold text-dark", style: { fontFamily: 'heading' }, children: "Welcome to Obeeoma" }), error && (_jsx(Alert, { variant: "danger", onClose: () => dispatch(clearError()), dismissible: true, children: error })), _jsx(Formik, { initialValues: { username: "", password: "" }, validationSchema: loginValidationSchema, onSubmit: handleSubmit, children: ({ handleChange, handleSubmit, values, errors, touched }) => (_jsxs(Form, { noValidate: true, onSubmit: handleSubmit, children: [_jsxs(Form.Group, { className: "mb-3", controlId: "validationFormikUsername", children: [_jsx(Form.Control, { type: "text", placeholder: "Email or Username", name: "username", value: values.username, onChange: handleChange, isInvalid: touched.username && !!errors.username, className: "py-2" }), _jsx(Form.Control.Feedback, { type: "invalid", children: errors.username })] }), _jsx(Form.Group, { className: "mb-4", controlId: "validationFormikPassword", children: _jsxs(InputGroup, { children: [_jsx(Form.Control, { type: showPassword ? "text" : "password", placeholder: "Password", name: "password", value: values.password, onChange: handleChange, isInvalid: touched.password && !!errors.password, className: "py-2" }), _jsx(InputGroup.Text, { onClick: togglePasswordVisibility, style: { cursor: "pointer", backgroundColor: "white" }, children: _jsx(FontAwesomeIcon, { icon: showPassword ? faEyeSlash : faEyeRegular, style: { color: customStyles.primaryColor } }) }), _jsx(Form.Control.Feedback, { type: "invalid", children: errors.password })] }) }), _jsx(Button, { type: "submit", className: "w-100 mb-3 py-2 fw-semibold", disabled: isLoading, style: {
                                            backgroundColor: customStyles.primaryColor,
                                            borderColor: customStyles.primaryColor,
                                            color: "white",
                                            boxShadow: "none",
                                        }, children: isLoading ? (_jsxs(_Fragment, { children: [_jsx(Spinner, { as: "span", animation: "border", size: "sm", role: "status", "aria-hidden": "true", className: "me-2" }), "Signing in..."] })) : ("Sign In") })] })) }), _jsx("div", { className: "text-center mt-3", children: _jsx(Link, { to: "/forgot-password", className: "small text-decoration-none", style: { color: customStyles.primaryColor, fontFamily: "body" }, children: "Forgot Password?" }) }), _jsxs("div", { className: "text-center mt-3", children: [_jsxs("span", { className: "small text-muted", style: { fontFamily: "body" }, children: ["Don't have an account?", " "] }), _jsx(Link, { to: "/register", className: "small text-decoration-none", style: { color: customStyles.primaryColor, fontFamily: "body", fontWeight: "600" }, children: "Create Account" })] })] }) }), _jsx("footer", { className: "text-center text-muted py-3 small border-top", style: {
                    position: "fixed",
                    bottom: "0",
                    width: "100%",
                    backgroundColor: "#f5f5f5",
                    fontSize: "0.8rem",
                    zIndex: 1000,
                    fontFamily: "body"
                }, children: _jsxs("div", { className: "d-flex justify-content-between align-items-center container", children: [_jsxs("div", { className: "footer-copyright", children: ["\u00A9 2025 ", customStyles.logoText, ". All rights reserved."] }), _jsxs("div", { className: "d-flex align-items-center", children: [_jsx(Link, { className: "text-muted text-decoration-none me-3", style: { fontFamily: "body" }, role: "button", to: "/system-admin", children: "Privacy Policy" }), _jsx("a", { href: "#", className: "text-muted text-decoration-none me-3", style: { fontFamily: "body" }, children: "Terms of Service" }), _jsx("a", { href: "#", className: "text-muted text-decoration-none", style: { fontFamily: "body" }, children: "Contact Us" })] })] }) })] }));
};
export default LoginPage;

