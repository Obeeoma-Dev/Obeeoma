// // import React, { useEffect } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { AppDispatch, RootState } from "../../store/store";
// // import { forgotPassword, clearError } from "../../store/slices/authSlice";
// // import { useNavigate } from "react-router-dom";
// // import { forgotPasswordValidationSchema } from "./../../validation/authValidation";
// // import { Formik } from "formik";
// // import { Row, Col, Form, Button, Card, Alert, Spinner } from "react-bootstrap";
// // import "bootstrap/dist/css/bootstrap.min.css";
// // import React, { useEffect } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { AppDispatch, RootState } from "../../store/store";
// // import { forgotPassword, clearError } from "../../store/slices/authSlice";
// // import { useNavigate } from "react-router-dom";
// // import { forgotPasswordValidationSchema } from "./../../validation/authValidation";
// // import { Formik } from "formik";
// // import { Row, Col, Form, Button, Card, Alert, Spinner } from "react-bootstrap";
// // import "bootstrap/dist/css/bootstrap.min.css";

// // // The `: React.FC` defines this as a Functional Component in TypeScript.
// // const ResetPasswordSignin: React.FC = () => {
// //   // `useDispatch` is typed with `AppDispatch` for type-safe actions.
// //   const dispatch = useDispatch<AppDispatch>();
// //   const navigate = useNavigate();

// //   // The state from `useSelector` is correctly typed using `RootState`.
// //   const { isLoading, error } = useSelector((state: RootState) => state.auth);

// //   useEffect(() => {
// //     dispatch(clearError());
// //   }, [dispatch]);

// //   // The `values` parameter is explicitly typed.
// //   const handleSubmit = (values: { email: string }) => {
// //     dispatch(
// //       forgotPassword({
// //         ...values,
// //         onSuccess: () => navigate("/accept-invite"),
// //       })
// //     );
// //   };

// //   return (
// //     <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
// //       <Card
// //         className="shadow-lg border-0 overflow-hidden"
// //         style={{ maxWidth: "900px", width: "100%" }}
// //       >

// //             <h2 className="fw-semibold mb-2">Reset Password to Sign in</h2>
// //             <p className="text-muted mb-4">Send code to email</p>

// //             {error && (
// //               <Alert
// //                 variant="danger"
// //                 onClose={() => dispatch(clearError())}
// //                 dismissible
// //               >
// //                 {error}
// //               </Alert>
// //             )}

// //             <Formik
// //               initialValues={{ email: "" }}
// //               validationSchema={forgotPasswordValidationSchema}
// //               onSubmit={handleSubmit}
// //             >
// //               {/* Formik automatically infers the types for these props */}
// //               {({ handleChange, handleSubmit, values, errors, touched }) => (
// //                 <Form noValidate onSubmit={handleSubmit}>
// //                   <Form.Group className="mb-4" controlId="formEmail">
// //                     <Form.Control
// //                       type="email"
// //                       placeholder="Email address"
// //                       className="py-2"
// //                       name="email"
// //                       value={values.email}
// //                       onChange={handleChange}
// //                       isInvalid={touched.email && !!errors.email}
// //                     />
// //                     <Form.Control.Feedback type="invalid">
// //                       {errors.email}
// //                     </Form.Control.Feedback>
// //                   </Form.Group>

// //                   <Button
// //                     variant="success"
// //                     type="submit"
// //                     className="w-100 mb-3 py-2 fw-semibold"
// //                     disabled={isLoading}
// //                   >
// //                     {isLoading ? (
// //                       <>
// //                         <Spinner
// //                           as="span"
// //                           animation="border"
// //                           size="sm"
// //                           role="status"
// //                           aria-hidden="true"
// //                           className="me-2"
// //                         />
// //                         Sending...
// //                       </>
// //                     ) : (
// //                       "Send Code"
// //                     )}
// //                   </Button>

// //              <p className="text-center text-muted mt-4">
// //               Didn’t receive any code?{" "}
// //               <Button
// //                 variant="link"
// //                 className="p-0 text-success text-decoration-none ms-1"
// //                 // onClick= {}
// //                 disabled={isLoading || !values.email || !!errors.email}

// //               >
// //                  {isLoading ? (
// //                       <>
// //                         <Spinner
// //                           as="span"
// //                           animation="border"
// //                           size="sm"
// //                           role="status"
// //                           aria-hidden="true"
// //                           className="me-2"
// //                         />
// //                         Sending...
// //                       </>
// //                     ) : (
// //                       "Send Code again"
// //                     )}
// //                 Send code again
// //               </Button>
// //             </p>

// //                 </Form>
// //               )}
// //             </Formik>
// //       </Card>
// //     </div>

// //   );
// // };

// // export default ResetPasswordSignin;

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   Container,
//   Card,
//   Button,
//   Form as BootstrapForm,
//   Alert,
//   Spinner,
// } from "react-bootstrap";
// // NOTE: I'm importing ErrorMessage and Formik/Form from formik,
// // but for simplicity, I'll use standard state/validation mock here.
// // You would replace this with your actual Formik implementation.

// // Mock styles for consistency with your previous code
// const customStyles = {
//   primaryColor: "#3CB371", // Used for links and accents
//   logoText: "Obeeoma",
// };

// // --- Component Definition ---

// const ResetPasswordSignIn: React.FC = () => {
//   const [email, setEmail] = useState("");
//   const [error, setError] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isEmailSent, setIsEmailSent] = useState(false);

// // // The `: React.FC` defines this as a Functional Component in TypeScript.
// // const ResetPasswordSignin: React.FC = () => {
// //   // `useDispatch` is typed with `AppDispatch` for type-safe actions.
// //   const dispatch = useDispatch<AppDispatch>();
// //   const navigate = useNavigate();

// //   // The state from `useSelector` is correctly typed using `RootState`.
// //   const { isLoading, error } = useSelector((state: RootState) => state.auth);

// //   useEffect(() => {
// //     dispatch(clearError());
// //   }, [dispatch]);

// //   // The `values` parameter is explicitly typed.
// //   const handleSubmit = (values: { email: string }) => {
// //     dispatch(
// //       forgotPassword({
// //         ...values,
// //         onSuccess: () => navigate("/accept-invite"),
// //       })
// //     );
// //   };

// //   return (
// //     <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
// //       <Card
// //         className="shadow-lg border-0 overflow-hidden"
// //         style={{ maxWidth: "900px", width: "100%" }}
// //       >

// //             <h2 className="fw-semibold mb-2">Reset Password to Sign in</h2>
// //             <p className="text-muted mb-4">Send code to email</p>

// //             {error && (
// //               <Alert
// //                 variant="danger"
// //                 onClose={() => dispatch(clearError())}
// //                 dismissible
// //               >
// //                 {error}
// //               </Alert>
// //             )}

// //             <Formik
// //               initialValues={{ email: "" }}
// //               validationSchema={forgotPasswordValidationSchema}
// //               onSubmit={handleSubmit}
// //             >
// //               {/* Formik automatically infers the types for these props */}
// //               {({ handleChange, handleSubmit, values, errors, touched }) => (
// //                 <Form noValidate onSubmit={handleSubmit}>
// //                   <Form.Group className="mb-4" controlId="formEmail">
// //                     <Form.Control
// //                       type="email"
// //                       placeholder="Email address"
// //                       className="py-2"
// //                       name="email"
// //                       value={values.email}
// //                       onChange={handleChange}
// //                       isInvalid={touched.email && !!errors.email}
// //                     />
// //                     <Form.Control.Feedback type="invalid">
// //                       {errors.email}
// //                     </Form.Control.Feedback>
// //                   </Form.Group>

// //                   <Button
// //                     variant="success"
// //                     type="submit"
// //                     className="w-100 mb-3 py-2 fw-semibold"
// //                     disabled={isLoading}
// //                   >
// //                     {isLoading ? (
// //                       <>
// //                         <Spinner
// //                           as="span"
// //                           animation="border"
// //                           size="sm"
// //                           role="status"
// //                           aria-hidden="true"
// //                           className="me-2"
// //                         />
// //                         Sending...
// //                       </>
// //                     ) : (
// //                       "Send Code"
// //                     )}
// //                   </Button>

// //              <p className="text-center text-muted mt-4">
// //               Didn’t receive any code?{" "}
// //               <Button
// //                 variant="link"
// //                 className="p-0 text-success text-decoration-none ms-1"
// //                 // onClick= {}
// //                 disabled={isLoading || !values.email || !!errors.email}

// //               >
// //                  {isLoading ? (
// //                       <>
// //                         <Spinner
// //                           as="span"
// //                           animation="border"
// //                           size="sm"
// //                           role="status"
// //                           aria-hidden="true"
// //                           className="me-2"
// //                         />
// //                         Sending...
// //                       </>
// //                     ) : (
// //                       "Send Code again"
// //                     )}
// //                 Send code again
// //               </Button>
// //             </p>

// //                 </Form>
// //               )}
// //             </Formik>
// //       </Card>
// //     </div>

// //   );
// // };

// // export default ResetPasswordSignin;

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   Container,
//   Card,
//   Button,
//   Form as BootstrapForm,
//   Alert,
//   Spinner,
// } from "react-bootstrap";
// // NOTE: I'm importing ErrorMessage and Formik/Form from formik,
// // but for simplicity, I'll use standard state/validation mock here.
// // You would replace this with your actual Formik implementation.

// // Mock styles for consistency with your previous code
// const customStyles = {
//   primaryColor: "#3CB371", // Used for links and accents
//   logoText: "Obeeoma",
// };

// // --- Component Definition ---

// const ResetPasswordSignIn: React.FC = () => {
//   const [email, setEmail] = useState("");
//   const [error, setError] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isEmailSent, setIsEmailSent] = useState(false);

//   const navigate = useNavigate();

//   // Mock validation and submission
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);

//     if (!email) {
//       setError("Email is required");
//       return;
//     }

//     // Mock API call simulation
//     setIsLoading(true);
//     setTimeout(() => {
//       setIsLoading(false);
//       if (email === "test@error.com") {
//         setError("User not found.");
//       } else {
//         setIsEmailSent(true);
//         navigate("/reset-password");
//       }
//     }, 1500);
//   };

//   const handleResendCode = () => {
//     // Mock resend logic
//     setIsEmailSent(false);
//     setIsLoading(true);
//     setTimeout(() => {
//       setIsLoading(false);
//       setIsEmailSent(true);
//     }, 1500);
//   };

//   // Mock validation and submission
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);

//     if (!email) {
//       setError("Email is required");
//       return;
//     }

//     // Mock API call simulation
//     setIsLoading(true);
//     setTimeout(() => {
//       setIsLoading(false);
//       if (email === "test@error.com") {
//         setError("User not found.");
//       } else {
//         setIsEmailSent(true);
//         navigate("/reset-password");
//       }
//     }, 1500);
//   };

//   const handleResendCode = () => {
//     // Mock resend logic
//     setIsEmailSent(false);
//     setIsLoading(true);
//     setTimeout(() => {
//       setIsLoading(false);
//       setIsEmailSent(true);
//     }, 1500);
//   };

//   return (
//     // 1. Full Page Container with positioning for the fixed footer
//     <div
//       style={{
//         backgroundColor: "#f5f5f5",
//         minHeight: "100vh",
//         padding: "50px 0 100px 0", // Extra padding for fixed footer
//         position: "relative",
//       }}
//       className="d-flex justify-content-center align-items-center"
//     >
//       <Container>
//         <div className="d-flex justify-content-center">
//           <Card
//             className="shadow-sm border-0 p-4"
//             style={{
//               maxWidth: "450px", // Card width limit
//               width: "100%",
//               borderRadius: "8px",
//               boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//             }}
//           >
//             <Card.Body>
//               <h3 className="mb-2 fw-semibold text-dark">
//                 Reset Password to Sign in
//               </h3>
//               <p className="text-muted mb-4 small">Send code to email</p>
//     // 1. Full Page Container with positioning for the fixed footer
//     <div
//       style={{
//         backgroundColor: "#f5f5f5",
//         minHeight: "100vh",
//         padding: "50px 0 100px 0", // Extra padding for fixed footer
//         position: "relative",
//       }}
//       className="d-flex justify-content-center align-items-center"
//     >
//       <Container>
//         <div className="d-flex justify-content-center">
//           <Card
//             className="shadow-sm border-0 p-4"
//             style={{
//               maxWidth: "450px", // Card width limit
//               width: "100%",
//               borderRadius: "8px",
//               boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//             }}
//           >
//             <Card.Body>
//               <h3 className="mb-2 fw-semibold text-dark">
//                 Reset Password to Sign in
//               </h3>
//               <p className="text-muted mb-4 small">Send code to email</p>

//               {/* Error Alert */}
//               {error && (
//                 <Alert variant="danger" className="py-2">
//                   {error}
//                 </Alert>
//               )}

//               <BootstrapForm noValidate onSubmit={handleSubmit}>
//                 {/* Email Field */}
//                 <BootstrapForm.Group className="mb-4">
//                   <BootstrapForm.Control
//                     type="email"
//                     name="email"
//                     placeholder="Email address"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="py-2"
//                     isInvalid={!!error}
//                     style={
//                       error
//                         ? {
//                             borderColor: "red",
//                             borderWidth: "1.5px",
//                           }
//                         : {}
//                     }
//                   />
//                   {/* Custom Error Message Display based on your image */}
//                   {error && (
//                     <div className="invalid-feedback d-block small mt-1 text-danger">
//                       {error}
//                     </div>
//                   )}
//                 </BootstrapForm.Group>

//                 <Button
//                   variant="success"
//                   type="submit"
//                   className="w-100 mb-3 py-2 fw-semibold"
//                   disabled={isLoading || isEmailSent}
//                 >
//                   {isLoading ? (
//                     <>
//                       <Spinner
//                         as="span"
//                         animation="border"
//                         size="sm"
//                         role="status"
//                         aria-hidden="true"
//                         className="me-2"
//                       />
//                       Sending...
//                     </>
//                   ) : (
//                     "Send Code"
//                   )}
//                 </Button>
//               </BootstrapForm>
//               {/* Error Alert */}
//               {error && (
//                 <Alert variant="danger" className="py-2">
//                   {error}
//                 </Alert>
//               )}

//               <BootstrapForm noValidate onSubmit={handleSubmit}>
//                 {/* Email Field */}
//                 <BootstrapForm.Group className="mb-4">
//                   <BootstrapForm.Control
//                     type="email"
//                     name="email"
//                     placeholder="Email address"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="py-2"
//                     isInvalid={!!error}
//                     style={
//                       error
//                         ? {
//                             borderColor: "red",
//                             borderWidth: "1.5px",
//                           }
//                         : {}
//                     }
//                   />
//                   {/* Custom Error Message Display based on your image */}
//                   {error && (
//                     <div className="invalid-feedback d-block small mt-1 text-danger">
//                       {error}
//                     </div>
//                   )}
//                 </BootstrapForm.Group>

//                 <Button
//                   variant="success"
//                   type="submit"
//                   className="w-100 mb-3 py-2 fw-semibold"
//                   disabled={isLoading || isEmailSent}
//                 >
//                   {isLoading ? (
//                     <>
//                       <Spinner
//                         as="span"
//                         animation="border"
//                         size="sm"
//                         role="status"
//                         aria-hidden="true"
//                         className="me-2"
//                       />
//                       Sending...
//                     </>
//                   ) : (
//                     "Send Code"
//                   )}
//                 </Button>
//               </BootstrapForm>

//               {/* Resend Code Logic */}
//               <div className="text-center mt-3">
//                 <span className="text-center text-muted small">
//                   Didn't receive any code?{" "}
//                 </span>
//                 <Link
//                   onClick={handleResendCode}
//                   style={{
//                     color: customStyles.primaryColor,
//                     textDecoration: "none",
//                     fontWeight: "500",
//                     cursor: "pointer",
//                   }}
//                   to="#" // Prevent full page reload on click
//                   className="small"
//                 >
//                   Send Code again
//                 </Link>
//               </div>
//             </Card.Body>
//           </Card>
//         </div>
//       </Container>

//       {/* --- Footer Component --- */}
//       <footer
//         className="text-center text-muted py-3 small border-top"
//         style={{
//           position: "fixed", // Fixed to the viewport
//           bottom: "0",
//           width: "100%",
//           backgroundColor: "#f5f5f5", // Match background
//           fontSize: "0.8rem",
//           zIndex: 1000,
//         }}
//       >
//         &copy; 2025 {customStyles.logoText}. All rights reserved. &nbsp;
//         <Link
//           className="mx-3"
//           style={{ textDecoration: "none" }}
//           role="button"
//           to="/privacy-policy" // Placeholder link
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
//               {/* Resend Code Logic */}
//               <div className="text-center mt-3">
//                 <span className="text-center text-muted small">
//                   Didn't receive any code?{" "}
//                 </span>
//                 <Link
//                   onClick={handleResendCode}
//                   style={{
//                     color: customStyles.primaryColor,
//                     textDecoration: "none",
//                     fontWeight: "500",
//                     cursor: "pointer",
//                   }}
//                   to="#" // Prevent full page reload on click
//                   className="small"
//                 >
//                   Send Code again
//                 </Link>
//               </div>
//             </Card.Body>
//           </Card>
//         </div>
//       </Container>

//       {/* --- Footer Component --- */}
//       <footer
//         className="text-center text-muted py-3 small border-top"
//         style={{
//           position: "fixed", // Fixed to the viewport
//           bottom: "0",
//           width: "100%",
//           backgroundColor: "#f5f5f5", // Match background
//           fontSize: "0.8rem",
//           zIndex: 1000,
//         }}
//       >
//         &copy; 2025 {customStyles.logoText}. All rights reserved. &nbsp;
//         <Link
//           className="mx-3"
//           style={{ textDecoration: "none" }}
//           role="button"
//           to="/privacy-policy" // Placeholder link
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

// export default ResetPasswordSignIn;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  Button,
  Form as BootstrapForm,
  Alert,
  Spinner,
} from "react-bootstrap";
import logo from "./../../assets/Images/obeeomalogoword1.png";

const customStyles = {
  primaryColor: "#3CB371", // Used for links and accents
};

// --- Component Definition ---

const ResetPasswordSignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const navigate = useNavigate();

  // validation and submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError("Email is required");
      return;
    }

    setIsLoading(true);
    try {
      const API_URL = "https://api-0904.onrender.com/api/v1/auth/reset-password/";

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `Failed to send email with status: ${response.status}`);
      }
      
      setIsEmailSent(true);
      // Navigate only if the API call is successful and an email is sent
      navigate("/otp-verify");
    } catch (err: unknown) {
      console.error("Forgot Password Error:", err);

      let errorMessage = "An unexpected error occurred. Please try again.";

      // Narrow the type to access the 'message' property
      if (err instanceof Error) {
        errorMessage = err.message;
      }

      setError(errorMessage)

    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = () => {
    setError(null); // Clear previous error
    setIsEmailSent(false);
    setIsLoading(true);
    
    // Simulate API call for resend
    setTimeout(() => {
      setIsLoading(false);
      setIsEmailSent(true);
      // NOTE: In a real app, you would typically call handleSubmit or a similar function here.
    }, 1500);
  };

  return (
    // 1. Full Page Container with positioning for the fixed footer
    <div
      style={{
        backgroundColor: "#f5f5f5",
        height: "100vh",
        overflow: "auto",
        paddingBottom: "80px",
      }}
      className="d-flex justify-content-center align-items-center"
    >
      <Container>
        <div className="d-flex justify-content-center">
          <Card
            className="shadow-sm border-0 p-4"
            style={{
              maxWidth: "600px", // Card width limit
              width: "100%",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Card.Body>
              {/* Header and Logo */}
              <div className="d-flex flex-column align-items-center justify-content-center mb-4" style={{ fontFamily: "heading" }}>
                <img
                  src={logo}
                  alt="Obeeoma Logo"
                  style={{
                    height: "50px",
                    width: "auto"
                  }}
                  className="mb-1"
                />
              </div>
              <h3 className="display-6 fw-bold mb-1" style={{ fontFamily: "heading", textAlign: "center", fontSize: "24px" }}>
                Reset Password to Sign in
              </h3>
              <p className="text-muted mb-4 " style={{ fontFamily: "heading", textAlign: "center", fontSize: "14px" }}>Send code to email</p>

              {/* Error Alert (Only one is needed) */}
              {error && (
                <Alert variant="danger" className="py-2">
                  {error}
                </Alert>
              )}

              {/* Bootstrap Form (Only one is needed) */}
              <BootstrapForm noValidate onSubmit={handleSubmit}>
                {/* Email Field */}
                <BootstrapForm.Group className="mb-4">
                  <BootstrapForm.Control

                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="py-2"
                    isInvalid={!!error}
                    style={
                      error
                        ? {
                          borderColor: "red",
                          borderWidth: "1.5px",
                          fontFamily: "body",

                        }
                        : {}
                    }
                  />
                  {/* Custom Error Message Display based on your image */}
                  {error && (
                    <div className="invalid-feedback d-block small mt-1 text-danger">
                      {error}
                    </div>
                  )}
                </BootstrapForm.Group>

                <Button
                  type="submit"
                  className="w-100 mb-3 py-2 fw-semibold"
                  disabled={isLoading || isEmailSent}
                  style={{
                    backgroundColor: customStyles.primaryColor,
                    borderColor: customStyles.primaryColor,
                    color: "white",
                    boxShadow: "none",
                    fontFamily: "body"
                  }}
                >
                  {isLoading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-2"
                        style={{ fontFamily: "body" }}
                      />
                      Sending...
                    </>
                  ) : (
                    "Send Code"
                  )}
                </Button>
              </BootstrapForm>

              {/* Resend Code */}
              <div className="text-center mt-3">
                <span className="text-center text-muted small" style={{ fontFamily: "body" }}>
                  Didn't receive any code?{" "}
                </span>
                <Link
                  onClick={handleResendCode}
                  style={{
                    color: customStyles.primaryColor,
                    textDecoration: "none",
                    fontWeight: "500",
                    cursor: "pointer",
                    fontFamily: "body"
                  }}
                  to="#" // Prevent full page reload on click
                  className="small"
                >
                  Send Code again
                </Link>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>

      {/* --- Footer Component (Only one is needed) --- */}
      <footer
        className="text-center text-muted py-3 small border-top"
        style={{
          position: "fixed", // at the bottom of the viewport
          bottom: "0",
          width: "100%",
          backgroundColor: "#f5f5f5",
          fontSize: "0.8rem",
          zIndex: 1000,
          fontFamily: "body"
        }}
      >
        <div className="d-flex justify-content-between align-items-center container">
          <div className="footer-copyright" >
            &copy; 2025 Obeeoma. All rights reserved.
          </div>

          <div className="d-flex align-items-center">
            <Link
              className="text-muted text-decoration-none me-3"
              style={{ fontFamily: "body" }}
              role="button"
              to="/system-admin"
            >
              Privacy Policy
            </Link>

            <a
              href="#"
              className="text-muted text-decoration-none me-3"
              style={{ fontFamily: "body" }}
            >
              Terms of Service
            </a>

            <a
              href="#"
              className="text-muted text-decoration-none"
              style={{ fontFamily: "body" }}
            >
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ResetPasswordSignIn;