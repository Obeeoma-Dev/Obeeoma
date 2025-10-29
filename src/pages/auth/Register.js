import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Formik, Form as FormikForm, ErrorMessage } from "formik";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../../store/store";
// import { registerUser, clearError } from "../../store/slices/authSlice";
// import { registerValidationSchema } from "./../../validation/authValidation";
// import {
//   Container,
//   Row,
//   Col,
//   Button,
//   Form as BootstrapForm,
//   Alert,
//   Card,
//   Spinner,
// } from "react-bootstrap";
// import AuthLayout from "../../components/shared/AuthLayout";
// import logo from "../../assets/Images/obeeomalogoicon4.png";
// const customStyles = {
//   primaryColor: "#3CB371  100%",
//   lightPink: "#f8d7da",
//   logoText: "Obeeoma",
// };
// // Define allowed roles
// type Role = "employee" | "employer";
// // Initial form values
// type RegisterFormValues = {
//   username: string;
//   email: string;
//   password: string;
//   confirm_password: string;
// };
// const Register: React.FC = () => {
//   const [role] = useState<Role>("employee");
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();
//   const { error, isLoading } = useSelector((state: RootState) => state.auth);
//   const initialValues: RegisterFormValues = {
//     username: "",
//     email: "",
//     password: "",
//     confirm_password: "",
//   };
//   const handleSubmit = (values: RegisterFormValues) => {
//     const credentials = {
//       ...values,
//       role,
//     };
//     dispatch(
//       registerUser({
//         ...credentials,
//         onSuccess: () => navigate("/login"),
//       })
//     );
//   };
//   return (
//     //   <AuthLayout>
//     //     <Container fluid className="d-flex align-items-center justify-content-center">
//     //       <Row className="shadow bg-white rounded-lg overflow-hidden w-100"
//     //         style={{ maxWidth: 900 }}>
//     //         {/* Left Side: Form */}
//     //         <Col md={6} className="p-4">
//     //           <h2 className="mb-3">Create your account</h2>
//     //           <p className="mb-4 text-muted">
//     //             Join our community of mental health professionals and patients
//     //           </p>
//     //           {error && (
//     //             <Alert
//     //               variant="danger"
//     //               onClose={() => dispatch(clearError())}
//     //               dismissible
//     //             >
//     //               {error}
//     //             </Alert>
//     //           )}
//     //           <Formik
//     //             validationSchema={registerValidationSchema}
//     //             initialValues={initialValues}
//     //             onSubmit={handleSubmit}
//     //           >
//     //             {({ handleSubmit, handleChange, values, touched, errors }) => (
//     //               <FormikForm noValidate onSubmit={handleSubmit}>
//     //                 {/* User Name Field */}
//     //                 <BootstrapForm.Group className="mb-3">
//     //                   <BootstrapForm.Label>User Name</BootstrapForm.Label>
//     //                   <BootstrapForm.Control
//     //                     type="text"
//     //                     name="username"
//     //                     value={values.username}
//     //                     onChange={handleChange}
//     //                     isInvalid={!!touched.username && !!errors.username}
//     //                   />
//     //                   <BootstrapForm.Control.Feedback type="invalid">
//     //                     <ErrorMessage name="username" />
//     //                   </BootstrapForm.Control.Feedback>
//     //                 </BootstrapForm.Group>
//     //                 {/* Email Field */}
//     //                 <BootstrapForm.Group className="mb-3">
//     //                   <BootstrapForm.Label>Email</BootstrapForm.Label>
//     //                   <BootstrapForm.Control
//     //                     type="email"
//     //                     name="email"
//     //                     value={values.email}
//     //                     onChange={handleChange}
//     //                     isInvalid={!!touched.email && !!errors.email}
//     //                   />
//     //                   <BootstrapForm.Control.Feedback type="invalid">
//     //                     <ErrorMessage name="email" />
//     //                   </BootstrapForm.Control.Feedback>
//     //                 </BootstrapForm.Group>
//     //                 {/* Password Field */}
//     //                 <BootstrapForm.Group className="mb-3">
//     //                   <BootstrapForm.Label>Password</BootstrapForm.Label>
//     //                   <BootstrapForm.Control
//     //                     type="password"
//     //                     name="password"
//     //                     value={values.password}
//     //                     onChange={handleChange}
//     //                     isInvalid={!!touched.password && !!errors.password}
//     //                   />
//     //                   <BootstrapForm.Control.Feedback type="invalid">
//     //                     <ErrorMessage name="password" />
//     //                   </BootstrapForm.Control.Feedback>
//     //                 </BootstrapForm.Group>
//     //                 {/* Confirm Password Field */}
//     //                 <BootstrapForm.Group className="mb-4">
//     //                   <BootstrapForm.Label>Confirm Password</BootstrapForm.Label>
//     //                   <BootstrapForm.Control
//     //                     type="password"
//     //                     name="confirm_password"
//     //                     value={values.confirm_password}
//     //                     onChange={handleChange}
//     //                     isInvalid={
//     //                       !!touched.confirm_password && !!errors.confirm_password
//     //                     }
//     //                   />
//     //                   <BootstrapForm.Control.Feedback type="invalid">
//     //                     <ErrorMessage name="confirm_password" />
//     //                   </BootstrapForm.Control.Feedback>
//     //                 </BootstrapForm.Group>
//     //                 {/* Submit Button */}
//     //                 <Button
//     //                   type="submit" variant="success" size="lg" className="w-100">
//     //                   Create Account
//     //                 </Button>
//     //               </FormikForm>
//     //             )}
//     //           </Formik>
//     //           <div className="text-center mt-3">
//     //             <span className="text-muted">Already have an account? </span>
//     //             <Link to="/login" className="text-success text-decoration-none fw-semibold">
//     //               Sign in
//     //             </Link>
//     //           </div>
//     //         </Col>
//     //         <Col
//     //           md={6}
//     //           className="bg-success bg-opacity-25 p-4 d-flex flex-column justify-content-center"
//     //         >
//     //           <h3 className="mb-4 fw-semibold">Begin Your Wellness Journey</h3>
//     //           <p className="text-muted mb-4">
//     //             Creating an account gives you access to personalized mental health
//     //             resources, secure communication with healthcare providers, and tools
//     //             to track your progress.
//     //           </p>
//     //           <ul className="text-secondary" style={{ listStyle: "none" }}>
//     //             <li>✔ Personalized care plans</li>
//     //             <li>✔ Secure messaging with providers</li>
//     //             <li>✔ Progress tracking tools</li>
//     //           </ul>
//     //         </Col>
//     //       </Row>
//     //     </Container>
//     //   </AuthLayout>
//     // );
//     // return (
//     // 1. Full Page Container: Centers the Card vertically and horizontally
//     <div
//       style={{
//         backgroundColor: "#f5f5f5", // Light grey background
//         minHeight: "100vh",
//         padding: "50px 0", // Add some padding top/bottom just in case
//       }}
//       className="d-flex justify-content-center align-items-center"
//     >
//       <Container>
//         <div className="d-flex justify-content-center">
//           <Card
//             className="shadow-sm border-0 p-4"
//             style={{
//               maxWidth: "450px", // Limits the card width
//               width: "100%",
//               borderRadius: "8px",
//               boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//             }}
//           >
//             <Card.Body>
//               {/* 2. Logo and Company Name (Centered, Stacked) */}
//               <div className="d-flex flex-column align-items-center justify-content-center mb-4">
//                 <img
//                   src={logo}
//                   alt="Obeeoma Logo"
//                   width="50"
//                   className="mb-1"
//                 />
//                 <p className="m-0 text-center">
//                   <small
//                     style={{
//                       color: customStyles.primaryColor,
//                       fontSize: "10px",
//                       fontWeight: "500",
//                     }}
//                   >
//                     Obeeoma
//                   </small>
//                 </p>
//               </div>
//               {/* Main Titles */}
//               <h3 className="text-center mb-2 fw-semibold text-dark">
//                 Create your Organization's account
//               </h3>
//               <p className="text-center text-muted mb-4">
//                 Join our community of mental health professionals and patients
//               </p>
//               {/* Error Alert */}
//               {error && (
//                 <Alert variant="danger" dismissible>
//                   {error}
//                 </Alert>
//               )}
//               {/* Formik/Form structure */}
//               <Formik
//                 validationSchema={registerValidationSchema}
//                 initialValues={initialValues}
//                 onSubmit={handleSubmit}
//               >
//                 {({ handleSubmit, handleChange, values, touched, errors }) => (
//                   <FormikForm noValidate onSubmit={handleSubmit}>
//                     {/* Email Field (Placeholder style) */}
//                     <BootstrapForm.Group className="mb-3">
//                       <BootstrapForm.Control
//                         type="email"
//                         name="email"
//                         placeholder="Email address"
//                         value={values.email}
//                         onChange={handleChange}
//                         className="py-2" // Adds vertical padding
//                         isInvalid={!!touched.email && !!errors.email}
//                       />
//                       <BootstrapForm.Control.Feedback type="invalid">
//                         <ErrorMessage name="email" />
//                       </BootstrapForm.Control.Feedback>
//                     </BootstrapForm.Group>
//                     {/* User Name Field (Placeholder style) */}
//                     <BootstrapForm.Group className="mb-3">
//                       <BootstrapForm.Control
//                         type="text"
//                         name="username"
//                         placeholder="Username"
//                         value={values.username}
//                         onChange={handleChange}
//                         className="py-2"
//                         isInvalid={!!touched.username && !!errors.username}
//                       />
//                       <BootstrapForm.Control.Feedback type="invalid">
//                         <ErrorMessage name="username" />
//                       </BootstrapForm.Control.Feedback>
//                     </BootstrapForm.Group>
//                     {/* Password Field (Placeholder style) */}
//                     <BootstrapForm.Group className="mb-3">
//                       <BootstrapForm.Control
//                         type="password"
//                         name="password"
//                         placeholder="Password"
//                         value={values.password}
//                         onChange={handleChange}
//                         className="py-2"
//                         isInvalid={!!touched.password && !!errors.password}
//                       />
//                       <BootstrapForm.Control.Feedback type="invalid">
//                         <ErrorMessage name="password" />
//                       </BootstrapForm.Control.Feedback>
//                     </BootstrapForm.Group>
//                     {/* Confirm Password Field (Placeholder style) */}
//                     <BootstrapForm.Group className="mb-4">
//                       <BootstrapForm.Control
//                         type="password"
//                         name="confirm_password"
//                         placeholder="Confirm Password"
//                         value={values.confirm_password}
//                         onChange={handleChange}
//                         className="py-2"
//                         isInvalid={
//                           !!touched.confirm_password &&
//                           !!errors.confirm_password
//                         }
//                       />
//                       <BootstrapForm.Control.Feedback type="invalid">
//                         <ErrorMessage name="confirm_password" />
//                       </BootstrapForm.Control.Feedback>
//                     </BootstrapForm.Group>
//                     {/* Checkbox and Forgot Password Link */}
//                     <div className="d-flex justify-content-between align-items-center mb-3">
//                       <Link
//                         to="/reset-password-signin"
//                         className="text-success text-decoration-none small"
//                       >
//                         Forgot password?
//                       </Link>
//                     </div>
//                     <Button
//                       variant="success"
//                       type="submit"
//                       className="w-100 mb-3 py-2 fw-semibold"
//                       disabled={isLoading}
//                     >
//                       {isLoading ? (
//                         <>
//                           <Spinner
//                             as="span"
//                             animation="border"
//                             size="sm"
//                             role="status"
//                             aria-hidden="true"
//                             className="me-2"
//                           />
//                           Signing Up...
//                         </>
//                       ) : (
//                         "Sign up"
//                       )}
//                     </Button>
//                   </FormikForm>
//                 )}
//               </Formik>
//               <div className="text-center mt-4">
//                 <span className="text-center mt-">
//                   Already have an account?{" "}
//                 </span>
//                 <Link
//                   className="text-success text-decoration-none"
//                   style={{
//                     color: customStyles.primaryColor,
//                     textDecoration: "none",
//                     marginLeft: "5px",
//                     fontWeight: "500",
//                   }}
//                   role="button"
//                   to="/login"
//                 >
//                   sign in
//                 </Link>
//               </div>
//             </Card.Body>
//           </Card>
//         </div>
//       </Container>
//       <div></div>
//       <footer
//         className="text-center text-muted py-3 small border-top"
//         style={{
//           position: "absolute",
//           bottom: "20px",
//           width: "100%",
//           fontSize: "0.8rem",
//         }}
//       >
//         &copy; 2025 {customStyles.logoText}. All rights reserved. &nbsp;
//         <Link
//           className="mx-3"
//           style={{ textDecoration: "none" }}
//           role="button"
//           to="/system-admin"
//         >
//           Privacy Policy
//         </Link>
//         &nbsp;|&nbsp;
//         <a href="#" className="text-muted" style={{ textDecoration: "none" }}>
//           Terms of Service
//         </a>
//         <span className="mx-3">|</span>
//         <a href="#" className="text-muted" style={{ textDecoration: "none" }}>
//           Contact Us
//         </a>
//       </footer>
//     </div>
//   );
// };
// export default Register;
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form as FormikForm, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../store/slices/authSlice";
import { registerValidationSchema } from "./../../validation/authValidation";
import { Container, Button, Form as BootstrapForm, Alert, Card, Spinner, } from "react-bootstrap";
// Assuming you have an image file at this path:
import logo from "./../../assets/Images/green..png";
const customStyles = {
    // Use the clean hex code for styling
    primaryColor: "#3CB371",
    lightPink: "#f8d7da",
    logoText: "Obeeoma",
};
const Register = () => {
    const [role] = useState("employee");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, isLoading } = useSelector((state) => state.auth);
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
    return (_jsxs("div", { style: {
            backgroundColor: "#f5f5f5",
            minHeight: "100vh",
            padding: "50px 0 100px 0",
            position: "relative",
        }, className: "d-flex justify-content-center align-items-center", children: [_jsx(Container, { children: _jsx("div", { className: "d-flex justify-content-center", children: _jsx(Card, { className: "shadow-sm border-0 p-4", style: {
                            maxWidth: "600px",
                            width: "100%",
                            borderRadius: "8px",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        }, children: _jsxs(Card.Body, { children: [_jsxs("div", { className: "d-flex flex-column align-items-center justify-content-center mb-4", style: { fontFamily: "heading" }, children: [_jsx("img", { src: logo, alt: "Obeeoma Logo", width: "100", className: "mb-1" }), _jsx("p", { className: "m-0 text-center" })] }), _jsx("h3", { className: "text-center mb-2 fw-semibold text-dark", style: { fontFamily: "heading" }, children: "Create your Organization's account" }), _jsx("p", { className: "text-center text-muted mb-4", style: { fontFamily: "heading" }, children: "Join our community of mental health professionals and patients" }), error && (_jsx(Alert, { variant: "danger", dismissible: true, children: error })), _jsx(Formik, { validationSchema: registerValidationSchema, initialValues: initialValues, onSubmit: handleSubmit, children: ({ handleSubmit, handleChange, values, touched, errors }) => (_jsxs(FormikForm, { noValidate: true, onSubmit: handleSubmit, children: [_jsxs(BootstrapForm.Group, { className: "mb-3", children: [_jsx(BootstrapForm.Control, { type: "email", name: "email", placeholder: "Email address", value: values.email, onChange: handleChange, className: "py-2" // Adds vertical padding
                                                        , isInvalid: !!touched.email && !!errors.email }), _jsx(BootstrapForm.Control.Feedback, { type: "invalid", children: _jsx(ErrorMessage, { name: "email" }) })] }), _jsxs(BootstrapForm.Group, { className: "mb-3", children: [_jsx(BootstrapForm.Control, { type: "text", name: "username", placeholder: "Username", value: values.username, onChange: handleChange, className: "py-2", isInvalid: !!touched.username && !!errors.username }), _jsx(BootstrapForm.Control.Feedback, { type: "invalid", children: _jsx(ErrorMessage, { name: "username" }) })] }), _jsxs(BootstrapForm.Group, { className: "mb-3", children: [_jsx(BootstrapForm.Control, { style: { fontFamily: "heading" }, type: "password", name: "password", placeholder: "Password", value: values.password, onChange: handleChange, className: "py-2", isInvalid: !!touched.password && !!errors.password }), _jsx(BootstrapForm.Control.Feedback, { type: "invalid", children: _jsx(ErrorMessage, { name: "password" }) })] }), _jsxs(BootstrapForm.Group, { className: "mb-4", children: [_jsx(BootstrapForm.Control, { style: { fontFamily: "heading" }, type: "password", name: "confirm_password", placeholder: "Confirm Password", value: values.confirm_password, onChange: handleChange, className: "py-2", isInvalid: !!touched.confirm_password &&
                                                            !!errors.confirm_password }), _jsx(BootstrapForm.Control.Feedback, { type: "invalid", children: _jsx(ErrorMessage, { name: "confirm_password" }) })] }), _jsx(Button, { type: "submit", className: "w-100 mb-3 py-2 fw-semibold", disabled: isLoading, style: {
                                                    backgroundColor: customStyles.primaryColor,
                                                    borderColor: customStyles.primaryColor,
                                                    color: "white",
                                                    boxShadow: "none",
                                                    fontFamily: "body"
                                                }, children: isLoading ? (_jsxs(_Fragment, { children: [_jsx(Spinner, { as: "span", animation: "border", size: "sm", role: "status", "aria-hidden": "true", className: "me-2", style: { fontFamily: "heading" } }), "Signing Up..."] })) : ("Sign up") }), _jsxs("div", { className: "text-center mt-3", children: [_jsxs("span", { className: "text-center", style: { fontFamily: "heading" }, children: ["Already have an account?", " "] }), _jsx(Link, { className: "text-decoration-none", style: {
                                                            // Uses the custom primary color for the link
                                                            color: customStyles.primaryColor,
                                                            fontWeight: "500",
                                                            fontFamily: "body"
                                                        }, role: "button", to: "/login", children: "sign in" })] })] })) })] }) }) }) }), _jsx("footer", { className: "text-center text-muted py-3 small border-top", style: {
                    position: "fixed", //  at the bottom of the viewport
                    bottom: "0",
                    width: "100%",
                    backgroundColor: "#f5f5f5",
                    fontSize: "0.8rem",
                    zIndex: 1000,
                    fontFamily: "body"
                }, children: _jsxs("div", { className: "d-flex justify-content-between align-items-center", children: [_jsxs("div", { className: "footer-copyright", children: ["\u00A9 2025 ", customStyles.logoText, ". All rights reserved."] }), _jsxs("div", { className: "d-flex align-items-center", children: [_jsx(Link, { className: "text-muted text-decoration-none me-3", style: { fontFamily: "body" }, role: "button", to: "/system-admin", children: "Privacy Policy" }), _jsx("a", { href: "#", className: "text-muted text-decoration-none me-3", style: { fontFamily: "body" }, children: "Terms of Service" }), _jsx("a", { href: "#", className: "text-muted text-decoration-none", style: { fontFamily: "body" }, children: "Contact Us" })] })] }) })] }));
};
export default Register;
