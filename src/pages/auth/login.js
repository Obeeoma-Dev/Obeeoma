import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../../store/store";
// import { loginUser , clearError } from "../../store/slices/authSlice";
// import { LoginSuccessPayload } from "../../types/auth";
// import { useNavigate } from "react-router-dom";
// import { loginValidationSchema } from "./../../validation/authValidation";
// import  {authAPI }     from "./../../api/apiConfig" ;
// import { Formik } from "formik";
// // import * as Yup from "yup";
// import {
//   Container,
//   Card,
//   Form,
//   Button,
//   // ToggleButtonGroup,
//   // ToggleButton,
//   Alert,
//   Spinner,
// } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import logo from "../../assets/Images/obeeomalogoicon4.png";
// import { User } from "lucide-react";
// const LoginPage = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();
//   const { isLoading, error } = useSelector((state: RootState) => state.auth);
//   const [role, setRole] = useState<string>("Employee");
//   useEffect(() => {
//     dispatch(clearError());
//   }, [dispatch]);
//   // const handleSubmit = (values: { username: string; password: string }) =>
//   //   try {
//   //     const resultAction = await dispatch(
//   //       loginUser({
//   //         ...values,
//   //         role,
//   //         onSuccess: () => {
//   //           if (role === "System Admin") {
//   //             navigate("/system-admin");
//   //           } else if (role === "Employer") {
//   //             navigate("/employer-dashboard");
//   //           } else {
//   //             navigate("/employee-dashboard");
//   //           }
//   //         },
//   //       })
//   //     );
//   //     if (loginUser.rejected.match(resultAction))
//   //       // Handle login failure if needed{
//   //       console.error("Login failed:", resultAction.payload);
//   //   } catch (error)
//   //     console.error("An error occurred during login:", error);
//   //     {
//   //   //dispatch(
//   //     //loginUser({
//   //      /// ...values,
//   //      // onSuccess: () => navigate("/system-admin"),
//   //    // })
//   //  /// );
//   // //};
//   const getDashboardRoute = (role: string)=> {
//     const normalizedRole = role.toLowerCase().trim();
//     switch(normalizedRole){
//       case "system admin":
//         return "/system-admin";
//       case "employer":
//         return "/employer-dashboard";
//       case "employee":
//         return "/employee-dasboard";
//       default:
//         return "/employer-dashboard";
//     }
//   const handleSubmit = async (values: { username: string; password: string }) => {
//     try {
//         // Dispatch login action and wait for completion
//         await dispatch(
//             loginUser({ username: values.username, password: values.password })
//         ).unwrap();
//         const destinationPath = getDashboardRoute(role);
//         navigate(destinationPath, { replace: true });
//     } catch (err) {
//         // This block catches any error thrown by the 'loginUser' thunk (e.g., 401 Unauthorized, network error).
//         console.error("Login failed (handled by Redux error state):", err);
//     }
//   };
//   return (
//     <div className="min-vh-100 d-flex flex-column justify-content-between bg-light">
//       {/* Header */}
//       <header className="d-flex justify-content-between align-items-center p-3 px-4 border-bottom bg-white">
//         <div className="d-flex align-items-center">
//           <img src={logo} alt="Obeeoma Logo" width="35" className="me-2" />
//           <div>
//             <h5 className="m-0 text-success fw-semibold">Obeeoma</h5>
//             <small className="text-muted">A Happy Heart</small>
//           </div>
//         </div>
//       </header>
//       {/* Center Form */}
//       <Container className="d-flex justify-content-center align-items-center flex-grow-1">
//         <Card
//           className="shadow-sm border-0 p-4"
//           style={{ maxWidth: "480px", width: "100%" }}
//         >
//           <Card.Body>
//             <h3 className="text-center mb-2 fw-semibold text-dark">
//               Sign in to your account
//             </h3>
//             <p className="text-center text-muted mb-4">
//               Welcome back to Obeeoma
//             </p>
//             {error && (
//               <Alert
//                 variant="danger"
//                 onClose={() => dispatch(clearError())}
//                 dismissible
//               >
//                 {error}
//               </Alert>
//             )}
//             <Formik
//               initialValues={{ username: "", password: "" }}
//               validationSchema={loginValidationSchema}
//               onSubmit={handleSubmit}
//             >
//               {({ handleChange, handleSubmit, values, errors, touched }) => (
//                 <Form noValidate onSubmit={handleSubmit}>
//                   <Form.Group className="mb-3" controlId="username">
//                     <Form.Control
//                       type="text"
//                       name="username"
//                       value={values.username}
//                       onChange={handleChange}
//                       placeholder="Username"
//                       className="py-2 border-success border-opacity-25"
//                       isInvalid={touched.username && !!errors.username}
//                     />
//                     <Form.Control.Feedback type="invalid">
//                       {errors.username}
//                     </Form.Control.Feedback>
//                   </Form.Group>
//                   <Form.Group className="mb-3" controlId="password">
//                     <Form.Control
//                       type="password"
//                       name="password"
//                       value={values.password}
//                       onChange={handleChange}
//                       placeholder="Password"
//                       className="py-2 border-success border-opacity-25"
//                       isInvalid={touched.password && !!errors.password}
//                     />
//                     <Form.Control.Feedback type="invalid">
//                       {errors.password}
//                     </Form.Control.Feedback>
//                   </Form.Group>
//                   {/* Role + Forgot Password */}
//                   <div className="d-flex justify-content-between align-items-center mb-3">
//                     <a
//                       href="/reset-password-signin"
//                       className="text-success text-decoration-none small"
//                     >
//                       Forgot password?
//                     </a>
//                   </div>
//                   <Form.Check
//                     type="checkbox"
//                     label="Remember me"
//                     className="mb-3 text-muted"
//                   />
//                   <Button
//                     variant="success"
//                     type="submit"
//                     className="w-100 mb-3 py-2 fw-semibold"
//                     disabled={isLoading}
//                   >
//                     {isLoading ? (
//                       <>
//                         <Spinner
//                           as="span"
//                           animation="border"
//                           size="sm"
//                           role="status"
//                           aria-hidden="true"
//                           className="me-2"
//                         />
//                         Signing in...
//                       </>
//                     ) : (
//                       "Sign in"
//                     )}
//                   </Button>
//                   <div className="text-center">
//                     <span className="text-muted">Don’t have an account? </span>
//                     <a
//                       href="/signup"
//                       className="text-success text-decoration-none fw-semibold"
//                     >
//                       Create an account
//                     </a>
//                   </div>
//                 </Form>
//               )}
//             </Formik>
//           </Card.Body>
//         </Card>
//       </Container>
//       {/* Footer */}
//       <footer className="text-center text-muted py-3 small border-top">
//         © 2025 Obeeoma. All rights reserved. &nbsp;
//         <a href="#" className="text-decoration-none text-success">
//           Privacy Policy
//         </a>{" "}
//         &nbsp;|&nbsp;
//         <a href="#" className="text-decoration-none text-success">
//           Terms of Service
//         </a>{" "}
//         &nbsp;|&nbsp;
//         <a href="#" className="text-decoration-none text-success">
//           Contact Us
//         </a>
//       </footer>
//     </div>
//   );
// };
// }
// export default LoginPage;
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "../../store/slices/authSlice";
// import { LoginSuccessPayload } from "../../types/auth"; not strictly used
import { useNavigate } from "react-router-dom";
import { loginValidationSchema } from "./../../validation/authValidation";
import { Formik } from "formik";
import { Container, Card, Form, Button, Alert, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../assets/Images/obeeomalogoicon4.png";
const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, error, user } = useSelector((state) => state.auth);
    const [role, setRole] = useState("employee");
    useEffect(() => {
        dispatch(clearError());
    }, [dispatch]);
    const getDashboardRoute = (role) => {
        const normalizedRole = role.toLowerCase().trim();
        switch (normalizedRole) {
            case "system admin":
                return "/system-admin";
            case "employer":
                return "/employer-dashboard";
            case "employee":
                return "/employee-dashboard"; // Corrected typo from "-dasboard"
            default:
                console.warn(`Unrecognized role: ${role}. Falling back to /employer-dashboard.`);
                return "/employer-dashboard";
        }
    };
    const handleSubmit = async (values) => {
        try {
            const resultAction = await dispatch(loginUser({ username: values.username, password: values.password })).unwrap();
            const userRole = resultAction?.role || user?.role || "employee"; // Fallback to 'employee'
            const destinationPath = getDashboardRoute(userRole);
            navigate(destinationPath, { replace: true });
        }
        catch (err) {
            // This block catches any error thrown by the 'loginUser' thunk (e.g., 401 Unauthorized, network error).
            console.error("Login failed (handled by Redux error state):", err);
        }
    };
    return (_jsxs("div", { className: "min-vh-100 d-flex flex-column justify-content-between bg-light", children: [_jsx("header", { className: "d-flex justify-content-between align-items-center p-3 px-4 border-bottom bg-white", children: _jsxs("div", { className: "d-flex align-items-center", children: [_jsx("img", { src: logo, alt: "Obeeoma Logo", width: "35", className: "me-2" }), _jsxs("div", { children: [_jsx("h5", { className: "m-0 text-success fw-semibold", children: "Obeeoma" }), _jsx("small", { className: "text-muted", children: "A Happy Heart" })] })] }) }), _jsx(Container, { className: "d-flex justify-content-center align-items-center flex-grow-1", children: _jsx(Card, { className: "shadow-sm border-0 p-4", style: { maxWidth: "480px", width: "100%" }, children: _jsxs(Card.Body, { children: [_jsx("h3", { className: "text-center mb-2 fw-semibold text-dark", children: "Sign in to your account" }), _jsx("p", { className: "text-center text-muted mb-4", children: "Welcome back to Obeeoma" }), error && (_jsx(Alert, { variant: "danger", onClose: () => dispatch(clearError()), dismissible: true, children: error })), _jsx(Formik, { initialValues: { username: "", password: "" }, validationSchema: loginValidationSchema, onSubmit: handleSubmit, children: ({ handleChange, handleSubmit: formikSubmit, values, errors, touched, }) => (_jsxs(Form, { noValidate: true, onSubmit: formikSubmit, children: [_jsxs(Form.Group, { className: "mb-3", controlId: "username", children: [_jsx(Form.Control, { type: "text", name: "username", value: values.username, onChange: handleChange, placeholder: "Username", className: "py-2 border-success border-opacity-25", isInvalid: touched.username && !!errors.username }), _jsx(Form.Control.Feedback, { type: "invalid", children: errors.username })] }), _jsxs(Form.Group, { className: "mb-3", controlId: "password", children: [_jsx(Form.Control, { type: "password", name: "password", value: values.password, onChange: handleChange, placeholder: "Password", className: "py-2 border-success border-opacity-25", isInvalid: touched.password && !!errors.password }), _jsx(Form.Control.Feedback, { type: "invalid", children: errors.password })] }), _jsx("div", { className: "d-flex justify-content-between align-items-center mb-3", children: _jsx("a", { href: "/reset-password-signin", className: "text-success text-decoration-none small", children: "Forgot password?" }) }), _jsx(Form.Check, { type: "checkbox", label: "Remember me", className: "mb-3 text-muted" }), _jsx(Button, { variant: "success", type: "submit", className: "w-100 mb-3 py-2 fw-semibold", disabled: isLoading, children: isLoading ? (_jsxs(_Fragment, { children: [_jsx(Spinner, { as: "span", animation: "border", size: "sm", role: "status", "aria-hidden": "true", className: "me-2" }), "Signing in..."] })) : ("Sign in") }), _jsxs("div", { className: "text-center", children: [_jsx("span", { className: "text-muted", children: "Don\u2019t have an account? " }), _jsx("a", { href: "/signup", className: "text-success text-decoration-none fw-semibold", children: "Create an account" })] })] })) })] }) }) }), _jsxs("footer", { className: "text-center text-muted py-3 small border-top", children: ["\u00A9 2025 Obeeoma. All rights reserved. \u00A0", _jsx("a", { href: "#", className: "text-decoration-none text-success", children: "Privacy Policy" }), " ", "\u00A0|\u00A0", _jsx("a", { href: "#", className: "text-decoration-none text-success", children: "Terms of Service" }), " ", "\u00A0|\u00A0", _jsx("a", { href: "#", className: "text-decoration-none text-success", children: "Contact Us" })] })] }));
};
export default LoginPage;
