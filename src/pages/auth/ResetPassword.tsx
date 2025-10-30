// // import React, { useEffect } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { AppDispatch, RootState } from "../../store/store";
// // import { resetPassword, clearError } from "../../store/slices/authSlice";
// // import { useNavigate } from "react-router-dom";
// // // Assuming you have 'resetPasswordValidationSchema' correctly defined
// // import { resetPasswordValidationSchema } from "./../../validation/authValidation";
// // import { Formik } from "formik";
// // import { Row, Col, Form, Button, Card, Alert, Spinner } from "react-bootstrap";
// // import "bootstrap/dist/css/bootstrap.min.css";

// // const ResetPassword: React.FC = () => {
// //   const dispatch = useDispatch<AppDispatch>();
// //   const navigate = useNavigate();
// //   // Ensure the error state is cleared on mount
// //   const { isLoading, error } = useSelector((state: RootState) => state.auth);

// //   useEffect(() => {
// //     dispatch(clearError());
// //   }, [dispatch]);

// //   // The type definition for handleSubmit payload should match the Formik initialValues and the Redux action payload
// //   const handleSubmit = (values: {
// //     token: string;
// //     newPassword: string;
// //     confirmNewPassword: string;

// //   }) => {
// //     dispatch(
// //       resetPassword({
// //         ...values,

// //         onSuccess: () => navigate("/login"),
// //       })
// //     );
// //   };

// //   return (
// //     <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
// //       <Card
// //         className="shadow-lg border-0 overflow-hidden"
// //         style={{ maxWidth: "900px", width: "100%" }}
// //       >
// //         <Row className="g-0">
// //           {/* Left Side (Form) */}
// //           <Col md={6} className="p-5 bg-white">
// //             <h2 className="fw-semibold mb-2">Reset Your Password</h2>
// //             <p className="text-muted mb-4">
// //               Enter your new password
// //             </p>

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
// //               initialValues={{
// //                 token: "",
// //                 newPassword: "",
// //                 confirmNewPassword: "",
// //                 // You might need to add code/token fields here if they are part of the form
// //               }}
// //               validationSchema={resetPasswordValidationSchema}
// //               onSubmit={handleSubmit}
// //             >
// //               {({ handleChange, handleSubmit, values, errors, touched }) => (
// //                 <Form noValidate onSubmit={handleSubmit}>

// //                   {/* New Password Field */}
// //                   <Form.Group className="mb-3" controlId="formNewPassword">
// //                     <Form.Label visuallyHidden>New Password</Form.Label>
// //                     <Form.Control
// //                       type="password"
// //                       placeholder="New Password"
// //                       className="py-2"
// //                       name="newPassword" 
// //                       value={values.newPassword} 
// //                       onChange={handleChange} 
// //                       isInvalid={touched.newPassword && !!errors.newPassword}
// //                     />
// //                     <Form.Control.Feedback type="invalid">
// //                       {errors.newPassword}
// //                     </Form.Control.Feedback>
// //                   </Form.Group>

// //                   {/* Confirm New Password Field */}
// //                   <Form.Group className="mb-4" controlId="formConfirmPassword">
// //                     <Form.Label visuallyHidden>Confirm New Password</Form.Label>
// //                     <Form.Control
// //                       type="password"
// //                       placeholder="Confirm New Password"
// //                       className="py-2"
// //                       name="confirmNewPassword" 
// //                       value={values.confirmNewPassword} 
// //                       onChange={handleChange} 
// //                       isInvalid={touched.confirmNewPassword && !!errors.confirmNewPassword}
// //                     />
// //                     <Form.Control.Feedback type="invalid">
// //                       {errors.confirmNewPassword}
// //                     </Form.Control.Feedback>
// //                   </Form.Group>

// //                   {/* Submit Button */}
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
// //                         Resetting Password...
// //                       </>
// //                     ) : (
// //                       "Change Password"
// //                     )}
// //                   </Button>
// //                 </Form>
// //               )}
// //             </Formik>
// //           </Col>

// //           {/* Right Side (Info Panel) */}
// //           <Col
// //             md={6}
// //             className="p-5 text-dark d-flex flex-column justify-content-center bg-success bg-opacity-10"
// //           >
// //             <h3 className="fw-semibold mb-4">Secure Your Account</h3>
// //             <p className="text-muted mb-3">
// //               Resetting your password ensures your account remains safe. Use a
// //               strong password that you haven’t used before.
// //             </p>
// //             <ul className="list-unstyled text-secondary mb-0">
// //               <li className="mb-2">✔ Protect your sensitive information</li>
// //               <li className="mb-2">✔ Access your care plan securely</li>
// //               <li>✔ Continue your wellness journey with peace of mind</li>
// //             </ul>
// //           </Col>
// //         </Row>
// //       </Card>
// //     </div>
// //   );
// // };

// // export default ResetPassword;
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

// // Mock styles for consistency
// const customStyles = {
//   primaryColor: "#3CB371", // Used for links and accents
//   logoText: "Obeeoma",
// };

// // --- Component Definition ---

// const ResetPassword: React.FC = () => {
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
  
//   const navigate = useNavigate();

//   // Mock validation and submission
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);

//     if (password.length < 6) {
//       setError("Password must be at least 6 characters.");
//       return;
//     }

//     if (password !== confirmPassword) {
//       setError("Passwords do not match.");
//       return;
//     }

//     // Mock API call simulation
//     setIsLoading(true);
//     setTimeout(() => {
//       setIsLoading(false);
//       // Success case: navigate to the login page
//       navigate('/login');
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
//                 Reset Your Password
//               </h3>
//               <p className="text-muted mb-4 small">
//                 Enter your new password
//               </p>
              
//               {/* Error Alert */}
//               {error && (
//                 <Alert variant="danger" className="py-2">
//                   {error}
//                 </Alert>
//               )}

//               <BootstrapForm noValidate onSubmit={handleSubmit}>
//                 {/* New Password Field */}
//                 <BootstrapForm.Group className="mb-3">
//                   <BootstrapForm.Control
//                     type="password"
//                     name="password"
//                     placeholder="New Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="py-2"
//                     isInvalid={!!error} // Simple invalid styling based on generic error
//                   />
//                 </BootstrapForm.Group>

                
//                 <BootstrapForm.Group className="mb-4">
//                   <BootstrapForm.Control
//                     type="password"
//                     name="confirmPassword"
//                     placeholder="Confirm New Password"
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                     className="py-2"
//                     isInvalid={!!error} // Simple invalid styling based on generic error
//                   />
                 
//                 </BootstrapForm.Group>

//                 <Button
//                   variant="success"
//                   type="submit"
//                   className="w-100 mb-3 py-2 fw-semibold"
//                   disabled={isLoading}
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
//                       Changing...
//                     </>
//                   ) : (
//                     "Change Password"
//                   )}
//                 </Button>
//               </BootstrapForm>

//               {/* Optional: Add a link back to login for completeness */}
//               <div className="text-center mt-3">
//                 <Link to="/login" className="small text-muted text-decoration-none">
//                   Back to Sign in
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
//           position: "fixed", 
//           bottom: "0",
//           width: "100%",
//           backgroundColor: "#f5f5f5",
//           fontSize: "0.8rem",
//           zIndex: 1000,
//         }}
//       >
//         &copy; 2025 {customStyles.logoText}. All rights reserved. &nbsp;
//         <Link
//           className="mx-3"
//           style={{ textDecoration: "none" }}
//           role="button"
//           to="/privacy-policy"
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

// export default ResetPassword;

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
import logo from "./../../assets/Images/green..png"; 

// Mock styles for consistency
const customStyles = {
  primaryColor: "#3CB371", // The green color
  logoText: "Obeeoma",
};

// --- Component Definition ---

const ResetPassword: React.FC = () => {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Mock validation and submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic client-side validation mock
    if (!password || !confirmPassword) {
      setError("Please fill in both password fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }


    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Success case: navigate to the login page
      navigate("/login");
    }, 1500);
  };

  return (

    <div
      style={{
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        padding: "50px 0 100px 0", // Extra padding for fixed footer
        position: "relative",
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
              <div className="d-flex flex-column align-items-center justify-content-center mb-4" style={{fontFamily: "heading"}}>
      <img
      src={logo}
      alt="Obeeoma Logo"
      width="100"
      className="mb-1"
      />
      <p className="m-0 text-center">
      
      </p>
      </div>
              <h3 className="mb-2 fw-semibold text-dark" style={{fontFamily:"body"}}>
                Reset Your Password
              </h3>
              <p className="text-muted mb-4 small " style={{fontFamily:"body"}}>
                Enter your new password
              </p>

              {/* Error Alert */}
              {error && (
                <Alert variant="danger" className="py-2">
                  {error}
                </Alert>
              )}

              <BootstrapForm noValidate onSubmit={handleSubmit}>

                {/* code */}
                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Control
                    type="text"
                    name="code"
                    placeholder="Enter the code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="py-2"
                    isInvalid={!!error} // Simple invalid styling based on generic error
                  />
                </BootstrapForm.Group>
                {/* New Password Field */}
                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Control
                    type="password"
                    name="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="py-2"
                    isInvalid={!!error} // Simple invalid styling based on generic error
                  />
                </BootstrapForm.Group>

                {/* Confirm New Password Field */}
                <BootstrapForm.Group className="mb-4">
                  <BootstrapForm.Control
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="py-2"
                    isInvalid={!!error} // Simple invalid styling based on generic error
                  />
                </BootstrapForm.Group>

                <Button
                  type="submit"
                  className="w-100 mb-3 py-2 fw-semibold"
                  disabled={isLoading}
                  style={{
                    
                    backgroundColor: customStyles.primaryColor,
                    borderColor: customStyles.primaryColor,
                    color: "white",
                    boxShadow: "none",
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
                      />
                      Changing...
                    </>
                  ) : (
                    "Change Password"
                  )}
                </Button>
              </BootstrapForm>

            
              <div className="text-center mt-3">
                <Link
                  to="/login"
                  className="small text-decoration-none"
                  style={{ color: customStyles.primaryColor,
                    fontFamily:"body"

                  }} // 
                >
                  Back to Sign in
                </Link>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>

      {/* --- Footer Component --- */}
     <footer
            className="text-center text-muted py-3 small border-top"
            style={{
              position: "fixed", //  at the bottom of the viewport
              bottom: "0", 
              width: "100%",
              backgroundColor: "#f5f5f5", 
              fontSize: "0.8rem",
              zIndex: 1000, 
              fontFamily: "body"
            }}
          > 
          <div className="d-flex justify-content-between align-items-center">
      <div className="footer-copyright" >
        &copy; 2025 {customStyles.logoText}. All rights reserved.
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
          style={{ fontFamily: "body"}}
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

export default ResetPassword;