import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form as FormikForm } from "formik"; 
import { resetPasswordValidationSchema } from "./../../validation/authValidation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store"; 
import { resetPassword } from "../../store/slices/authSlice"; 

import {
  Container,
  Card,
  Button,
  Form as BootstrapForm, 
  Alert,
  Spinner,
  InputGroup,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faEye as faEyeRegular } from "@fortawesome/free-regular-svg-icons";
import logo from "./../../assets/Images/obeeomalogoword1.png"; 


const customStyles = {
  primaryColor: "#3CB371", // The green
  logoText: "Obeeoma",
};


type ResetPasswordFormValues = {
  email: string; 
  new_password: string; 
  confirm_password: string;
};

type ChangePasswordData = {
    email: string;
    new_password: string;
    confirm_password: string, 
    onSuccess?: () => void;
};

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  
  const dispatch = useDispatch<AppDispatch>(); 

  // Local state for UI feedback
  const [apiError, setApiError] = useState<string | null>(null); 
  const [isLoading, setIsLoading] = useState(false);
  
  // State for password visibility toggles
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmPassword] = useState(false);

  const toggleNewPasswordVisibility = () => setShowNewPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);

  // Initial Formik Values
  const initialValues: ResetPasswordFormValues = {
    email: "",
    new_password: "", 
    confirm_password: "",
  };

  const handleResetSubmit = async (values: ResetPasswordFormValues) => {
    setApiError(null);
    setIsLoading(true);

    try {
        const payload: ChangePasswordData = {
          email: values.email,
          confirm_password:values. confirm_password,
          new_password: values.new_password,
          onSuccess: () => navigate("/login", { replace: true }),
          
        };

        
        await dispatch(
            resetPassword(payload) 
        ).unwrap();

       

    } catch (error) {
        console.error("Password reset failed:", error);
        setApiError(error as string || "Failed to reset password. Please try again.");
    } finally {
        setIsLoading(false);
    }
  };

  return (
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
              maxWidth: "600px",
              width: "100%",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Card.Body>
              {/*  Header and Logo  */}
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
              <h3 className="mb-2 fw-semibold text-dark" style={{ fontFamily: "body", textAlign: "center" , fontSize: "24px" }}>
                Reset Your Password
              </h3>
              <p className="text-muted mb-4 small " style={{ fontFamily: "body", textAlign: "center" , fontSize: "14px" }}>
                Enter   your new password.
              </p>

              {/* Error Alert */}
              {apiError && (
                <Alert variant="danger" className="py-2">
                  {apiError}
                </Alert>
              )}

              {/* FORMIK */}
              <Formik
                initialValues={initialValues}
                validationSchema={resetPasswordValidationSchema} 
                onSubmit={handleResetSubmit}
              >
                {({
                  handleChange,
                  values,
                  errors,
                  touched,
                }) => (
                  <FormikForm noValidate>
                    {/* email Field */}
                    <BootstrapForm.Group className="mb-3" controlId="email">
                      <BootstrapForm.Control
                        type="text"
                        name="email" 
                        placeholder="Enter your email"
                        value={values.email}
                        onChange={handleChange}
                        className="py-2"
                        isInvalid={touched.email && !!errors.email}
                      />
                      <BootstrapForm.Control.Feedback type="invalid">
                        {errors.email}
                      </BootstrapForm.Control.Feedback>
                    </BootstrapForm.Group> 

                    {/* New Password Field  */}
                    <BootstrapForm.Group className="mb-3" controlId="new_password"> 
                      <InputGroup>
                        <BootstrapForm.Control
                          style={{ fontFamily: "body" }}
                          type={showNewPassword ? "text" : "password"}
                          name="new_password" 
                          value={values.new_password}
                          onChange={handleChange}
                          placeholder="New Password"
                          className="py-2 border-success border-opacity-25"
                          isInvalid={touched.new_password && !!errors.new_password}
                        />
                        <InputGroup.Text 
                          onClick={toggleNewPasswordVisibility}
                          style={{ cursor: "pointer", backgroundColor: "white" }}
                        >
                          <FontAwesomeIcon 
                            icon={showNewPassword ? faEyeSlash : faEyeRegular} 
                            style={{ color: customStyles.primaryColor }}
                          />
                        </InputGroup.Text>
                      </InputGroup> 
                      <BootstrapForm.Control.Feedback type="invalid" className="d-block">
                        {touched.new_password && errors.new_password}
                      </BootstrapForm.Control.Feedback>
                    </BootstrapForm.Group>

                    {/* Confirm New Password */}
                    <BootstrapForm.Group className="mb-4" controlId="confirm_password" >
                      <InputGroup>
                        <BootstrapForm.Control
                          style={{ fontFamily: "body" }}
                          type={showConfirmNewPassword ? "text" : "password"}
                          name="confirm_password" 
                          placeholder="Confirm New Password"
                          value={values.confirm_password}
                          onChange={handleChange}
                          className="py-2 "
                          isInvalid={touched.confirm_password && !!errors.confirm_password}
                        />
                        <InputGroup.Text 
                          onClick={toggleConfirmPasswordVisibility}
                          style={{ cursor: "pointer", backgroundColor: "white" }}
                        >
                          <FontAwesomeIcon 
                            icon={showConfirmNewPassword ? faEyeSlash : faEyeRegular} 
                            style={{ color: customStyles.primaryColor }}
                          />
                        </InputGroup.Text>
                      </InputGroup>
                      <BootstrapForm.Control.Feedback type="invalid" className="d-block">
                        {touched.confirm_password && errors.confirm_password}
                      </BootstrapForm.Control.Feedback>
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
                          <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                          Changing...
                        </>
                      ) : (
                        "Change Password"
                      )}
                    </Button>
                  </FormikForm>
                )}
              </Formik>
              {/* END FORMIK WRAPPER  */}

              <div className="text-center mt-3">
                <Link
                  to="/login"
                  className="small text-decoration-none"
                  style={{ color: customStyles.primaryColor, fontFamily: "body" }} 
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
          position: "fixed",
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
            &copy; 2025 {customStyles.logoText}. All rights reserved.
          </div>
          <div className="d-flex align-items-center">
            <Link className="text-muted text-decoration-none me-3" style={{ fontFamily: "body" }} role="button" to="/system-admin">Privacy Policy</Link>
            <a href="#" className="text-muted text-decoration-none me-3" style={{ fontFamily: "body"}}>Terms of Service</a>
            <a href="#" className="text-muted text-decoration-none" style={{ fontFamily: "body" }} >Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ResetPassword;

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Formik, Form as FormikForm } from "formik"; 
// import { resetPasswordValidationSchema } from "./../../validation/authValidation";
// import { useDispatch } from "react-redux"; // <-- RESTORED
// import { AppDispatch } from "../../store/store"; // <-- RESTORED
// import { resetPassword } from "../../store/slices/authSlice"; // <-- RESTORED
// import axios from "axios"; // <-- ADDED for robust error checking

// import {
//   Container,
//   Card,
//   Button,
//   Form as BootstrapForm, 
//   Alert,
//   Spinner,
//   InputGroup,
// } from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
// import { faEye as faEyeRegular } from "@fortawesome/free-regular-svg-icons";
// import logo from "./../../assets/Images/obeeomalogoword1.png"; 


// const customStyles = {
//   primaryColor: "#3CB371", // The green
//   logoText: "Obeeoma",
// };


// type ResetPasswordFormValues = {
//   email: string; 
//   new_password: string; 
//   confirm_password: string;
// };

// // Define the type used by the Redux Thunk
// type ChangePasswordData = {
//     email: string;
//     new_password: string;
//     confirm_password: string, 
//     onSuccess?: () => void;
// };

// const ResetPassword: React.FC = () => {
//   const navigate = useNavigate();
//   
//   const dispatch = useDispatch<AppDispatch>(); // <-- RESTORED

//   // Local state for UI feedback
//   const [apiError, setApiError] = useState<string | null>(null); 
//   const [isLoading, setIsLoading] = useState(false);
//   
//   // State for password visibility toggles
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmNewPassword, setShowConfirmPassword] = useState(false);

//   const toggleNewPasswordVisibility = () => setShowNewPassword((prev) => !prev);
//   const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);

//   // Initial Formik Values
//   const initialValues: ResetPasswordFormValues = {
//     email: "",
//     new_password: "", 
//     confirm_password: "",
//   };

//   // 💡 RESTORED Original Redux Dispatch Logic
//   const handleResetSubmit = async (values: ResetPasswordFormValues) => {
//     setApiError(null);
//     setIsLoading(true);

//     try {
//         const payload: ChangePasswordData = {
//           email: values.email,
//           confirm_password: values.confirm_password, // Corrected access to values
//           new_password: values.new_password,
//           onSuccess: () => navigate("/login", { replace: true }),
//         };

//         
//         await dispatch(
//             resetPassword(payload) // This dispatches the POST request
//         ).unwrap();

//     } catch (error: unknown) {
//         console.error("Password reset failed:", error);
        
//         let errorMessage: string;

//         // Enhanced error handling to diagnose the 405 error
//         if (axios.isAxiosError(error) && error.response) {
//             if (error.response.status === 405) {
//                 errorMessage = "Method Not Allowed (405): The server is rejecting the request. This is usually due to the client incorrectly sending a GET request instead of POST, or a server configuration error.";
//             } else if (error.response.data && typeof error.response.data === 'object') {
//                 // Try to extract a useful message from the response body (detail or non_field_errors)
//                 errorMessage = (error.response.data as { detail?: string }).detail 
//                              || (error.response.data as { non_field_errors?: string[] }).non_field_errors?.[0] 
//                              || `API Error: ${error.response.statusText}`;
//             } else {
//                 errorMessage = error.response.statusText || String(error);
//             }
//         } else if (typeof error === 'string') {
//             errorMessage = error;
//         } else {
//             errorMessage = "Failed to reset password. Please try again.";
//         }

//         setApiError(errorMessage);
//     } finally {
//         setIsLoading(false);
//     }
//   };

//   return (
//     <div
//       style={{
//         backgroundColor: "#f5f5f5",
//         height: "100vh",
//         overflow: "auto",
//         paddingBottom: "80px",
//       }}
//       className="d-flex justify-content-center align-items-center"
//     >
//       <Container>
//         <div className="d-flex justify-content-center">
//           <Card
//             className="shadow-sm border-0 p-4"
//             style={{
//               maxWidth: "600px",
//               width: "100%",
//               borderRadius: "8px",
//               boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//             }}
//           >
//             <Card.Body>
//               {/*  Header and Logo  */}
//               <div className="d-flex flex-column align-items-center justify-content-center mb-4" style={{ fontFamily: "heading" }}>
//                 <img
//                   src={logo}
//                   alt="Obeeoma Logo"
//                   style={{
//                     height: "50px",
//                     width: "auto"
//                   }}
//                   className="mb-1"
//                 />
//               </div>
//               <h3 className="mb-2 fw-semibold text-dark" style={{ fontFamily: "body", textAlign: "center" , fontSize: "24px" }}>
//                 Reset Your Password
//               </h3>
//               <p className="text-muted mb-4 small " style={{ fontFamily: "body", textAlign: "center" , fontSize: "14px" }}>
//                 Enter   your new password.
//               </p>

//               {/* Error Alert */}
//               {apiError && (
//                 <Alert variant="danger" className="py-2">
//                   {apiError}
//                 </Alert>
//               )}

//               {/* FORMIK */}
//               <Formik
//                 initialValues={initialValues}
//                 validationSchema={resetPasswordValidationSchema} 
//                 onSubmit={handleResetSubmit}
//               >
//                 {({
//                   handleChange,
//                   handleSubmit: formikSubmit,
//                   values,
//                   errors,
//                   touched,
//                 }) => (
//                   <FormikForm noValidate onSubmit={formikSubmit}>
//                     {/* email Field */}
//                     <BootstrapForm.Group className="mb-3" controlId="email">
//                       <BootstrapForm.Control
//                         type="text"
//                         name="email" 
//                         placeholder="Enter your email"
//                         value={values.email}
//                         onChange={handleChange}
//                         className="py-2"
//                         isInvalid={touched.email && !!errors.email}
//                       />
//                       <BootstrapForm.Control.Feedback type="invalid">
//                         {errors.email}
//                       </BootstrapForm.Control.Feedback>
//                     </BootstrapForm.Group> 

//                     {/* New Password Field  */}
//                     <BootstrapForm.Group className="mb-3" controlId="new_password"> 
//                       <InputGroup>
//                         <BootstrapForm.Control
//                           style={{ fontFamily: "body" }}
//                           type={showNewPassword ? "text" : "password"}
//                           name="new_password" 
//                           value={values.new_password}
//                           onChange={handleChange}
//                           placeholder="New Password"
//                           className="py-2 border-success border-opacity-25"
//                           isInvalid={touched.new_password && !!errors.new_password}
//                         />
//                         <InputGroup.Text 
//                           onClick={toggleNewPasswordVisibility}
//                           style={{ cursor: "pointer", backgroundColor: "white" }}
//                         >
//                           <FontAwesomeIcon 
//                             icon={showNewPassword ? faEyeSlash : faEyeRegular} 
//                             style={{ color: customStyles.primaryColor }}
//                           />
//                         </InputGroup.Text>
//                       </InputGroup> 
//                       <BootstrapForm.Control.Feedback type="invalid" className="d-block">
//                         {touched.new_password && errors.new_password}
//                       </BootstrapForm.Control.Feedback>
//                     </BootstrapForm.Group>

//                     {/* Confirm New Password */}
//                     <BootstrapForm.Group className="mb-4" controlId="confirm_password" >
//                       <InputGroup>
//                         <BootstrapForm.Control
//                           style={{ fontFamily: "body" }}
//                           type={showConfirmNewPassword ? "text" : "password"}
//                           name="confirm_password" 
//                           placeholder="Confirm New Password"
//                           value={values.confirm_password}
//                           onChange={handleChange}
//                           className="py-2 "
//                           isInvalid={touched.confirm_password && !!errors.confirm_password}
//                         />
//                         <InputGroup.Text 
//                           onClick={toggleConfirmPasswordVisibility}
//                           style={{ cursor: "pointer", backgroundColor: "white" }}
//                         >
//                           <FontAwesomeIcon 
//                             icon={showConfirmNewPassword ? faEyeSlash : faEyeRegular} 
//                             style={{ color: customStyles.primaryColor }}
//                           />
//                         </InputGroup.Text>
//                       </InputGroup>
//                       <BootstrapForm.Control.Feedback type="invalid" className="d-block">
//                         {touched.confirm_password && errors.confirm_password}
//                       </BootstrapForm.Control.Feedback>
//                     </BootstrapForm.Group>

//                     <Button
//                       type="submit"
//                       className="w-100 mb-3 py-2 fw-semibold"
//                       disabled={isLoading}
//                       style={{
//                         backgroundColor: customStyles.primaryColor,
//                         borderColor: customStyles.primaryColor,
//                         color: "white",
//                         boxShadow: "none",
//                       }}
//                     >
//                       {isLoading ? (
//                         <>
//                           <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
//                           Changing...
//                         </>
//                       ) : (
//                         "Change Password"
//                       )}
//                     </Button>
//                   </FormikForm>
//                 )}
//               </Formik>
//               {/* END FORMIK WRAPPER  */}

//               <div className="text-center mt-3">
//                 <Link
//                   to="/login"
//                   className="small text-decoration-none"
//                   style={{ color: customStyles.primaryColor, fontFamily: "body" }} 
//                 >
//                   Back to Sign in
//                 </Link>
//               </div>
//             </Card.Body>
//           </Card>
//         </div>
//       </Container>

//       {/* --- Footer Component --- */}
//       <footer
//         className="text-center text-muted py-3 small border-top"
//         style={{
//           position: "fixed",
//           bottom: "0", 
//           width: "100%",
//           backgroundColor: "#f5f5f5", 
//           fontSize: "0.8rem",
//           zIndex: 1000, 
//           fontFamily: "body"
//         }}
//       > 
//         <div className="d-flex justify-content-between align-items-center container">
//           <div className="footer-copyright" >
//             &copy; 2025 {customStyles.logoText}. All rights reserved.
//           </div>
//           <div className="d-flex align-items-center">
//             <Link className="text-muted text-decoration-none me-3" style={{ fontFamily: "body" }} role="button" to="/system-admin">Privacy Policy</Link>
//             <a href="#" className="text-muted text-decoration-none me-3" style={{ fontFamily: "body"}}>Terms of Service</a>
//             <a href="#" className="text-muted text-decoration-none" style={{ fontFamily: "body" }} >Contact Us</a>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default ResetPassword;
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Formik, Form as FormikForm } from "formik"; 
// import { resetPasswordValidationSchema } from "./../../validation/authValidation";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../../store/store"; 
// import { resetPassword } from "../../store/slices/authSlice"; 

// import {
//   Container,
//   Card,
//   Button,
//   Form as BootstrapForm, 
//   Alert,
//   Spinner,
//   InputGroup,
// } from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
// import { faEye as faEyeRegular } from "@fortawesome/free-regular-svg-icons";
// import logo from "./../../assets/Images/obeeomalogoword1.png"; 


// const customStyles = {
//   primaryColor: "#3CB371", // The green
//   logoText: "Obeeoma",
// };


// type ResetPasswordFormValues = {
//   email: string; 
//   new_password: string; 
//   confirm_password: string;
// };

// type ChangePasswordData = {
//     email: string;
//     new_password: string;
//     confirm_password: string, 
//     onSuccess?: () => void;
// };

// const ResetPassword: React.FC = () => {
//   const navigate = useNavigate();
  
//   const dispatch = useDispatch<AppDispatch>(); 

//   // Local state for UI feedback
//   const [apiError, setApiError] = useState<string | null>(null); 
//   const [isLoading, setIsLoading] = useState(false);
  
//   // State for password visibility toggles
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmNewPassword, setShowConfirmPassword] = useState(false);

//   const toggleNewPasswordVisibility = () => setShowNewPassword((prev) => !prev);
//   const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);

//   // Initial Formik Values
//   const initialValues: ResetPasswordFormValues = {
//     email: "",
//     new_password: "", 
//     confirm_password: "",
//   };

//   const handleResetSubmit = async (values: ResetPasswordFormValues) => {
//     setApiError(null);
//     setIsLoading(true);

//     try {
//         const payload: ChangePasswordData = {
//           email: values.email,
//           confirm_password:values. confirm_password,
//           new_password: values.new_password,
//           onSuccess: () => navigate("/login", { replace: true }),
          
//         };

        
//         await dispatch(
//             resetPassword(payload) 
//         ).unwrap();

       

//     } catch (error) {
//         console.error("Password reset failed:", error);
//         setApiError(error as string || "Failed to reset password. Please try again.");
//     } finally {
//         setIsLoading(false);
//     }
//   };

//   return (
//     <div
//       style={{
//         backgroundColor: "#f5f5f5",
//         height: "100vh",
//         overflow: "auto",
//         paddingBottom: "80px",
//       }}
//       className="d-flex justify-content-center align-items-center"
//     >
//       <Container>
//         <div className="d-flex justify-content-center">
//           <Card
//             className="shadow-sm border-0 p-4"
//             style={{
//               maxWidth: "600px",
//               width: "100%",
//               borderRadius: "8px",
//               boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//             }}
//           >
//             <Card.Body>
//               {/*  Header and Logo  */}
//               <div className="d-flex flex-column align-items-center justify-content-center mb-4" style={{ fontFamily: "heading" }}>
//                 <img
//                   src={logo}
//                   alt="Obeeoma Logo"
//                   style={{
//                     height: "50px",
//                     width: "auto"
//                   }}
//                   className="mb-1"
//                 />
//               </div>
//               <h3 className="mb-2 fw-semibold text-dark" style={{ fontFamily: "body", textAlign: "center" , fontSize: "24px" }}>
//                 Reset Your Password
//               </h3>
//               <p className="text-muted mb-4 small " style={{ fontFamily: "body", textAlign: "center" , fontSize: "14px" }}>
//                 Enter   your new password.
//               </p>

//               {/* Error Alert */}
//               {apiError && (
//                 <Alert variant="danger" className="py-2">
//                   {apiError}
//                 </Alert>
//               )}

//               {/* FORMIK */}
//               <Formik
//                 initialValues={initialValues}
//                 validationSchema={resetPasswordValidationSchema} 
//                 onSubmit={handleResetSubmit}
//               >
//                 {({
//                   handleChange,
//                   values,
//                   errors,
//                   touched,
//                 }) => (
//                   <FormikForm noValidate>
//                     {/* email Field */}
//                     <BootstrapForm.Group className="mb-3" controlId="email">
//                       <BootstrapForm.Control
//                         type="text"
//                         name="email" 
//                         placeholder="Enter your email"
//                         value={values.email}
//                         onChange={handleChange}
//                         className="py-2"
//                         isInvalid={touched.email && !!errors.email}
//                       />
//                       <BootstrapForm.Control.Feedback type="invalid">
//                         {errors.email}
//                       </BootstrapForm.Control.Feedback>
//                     </BootstrapForm.Group> 

//                     {/* New Password Field  */}
//                     <BootstrapForm.Group className="mb-3" controlId="new_password"> 
//                       <InputGroup>
//                         <BootstrapForm.Control
//                           style={{ fontFamily: "body" }}
//                           type={showNewPassword ? "text" : "password"}
//                           name="new_password" 
//                           value={values.new_password}
//                           onChange={handleChange}
//                           placeholder="New Password"
//                           className="py-2 border-success border-opacity-25"
//                           isInvalid={touched.new_password && !!errors.new_password}
//                         />
//                         <InputGroup.Text 
//                           onClick={toggleNewPasswordVisibility}
//                           style={{ cursor: "pointer", backgroundColor: "white" }}
//                         >
//                           <FontAwesomeIcon 
//                             icon={showNewPassword ? faEyeSlash : faEyeRegular} 
//                             style={{ color: customStyles.primaryColor }}
//                           />
//                         </InputGroup.Text>
//                       </InputGroup> 
//                       <BootstrapForm.Control.Feedback type="invalid" className="d-block">
//                         {touched.new_password && errors.new_password}
//                       </BootstrapForm.Control.Feedback>
//                     </BootstrapForm.Group>

//                     {/* Confirm New Password */}
//                     <BootstrapForm.Group className="mb-4" controlId="confirm_password" >
//                       <InputGroup>
//                         <BootstrapForm.Control
//                           style={{ fontFamily: "body" }}
//                           type={showConfirmNewPassword ? "text" : "password"}
//                           name="confirm_password" 
//                           placeholder="Confirm New Password"
//                           value={values.confirm_password}
//                           onChange={handleChange}
//                           className="py-2 "
//                           isInvalid={touched.confirm_password && !!errors.confirm_password}
//                         />
//                         <InputGroup.Text 
//                           onClick={toggleConfirmPasswordVisibility}
//                           style={{ cursor: "pointer", backgroundColor: "white" }}
//                         >
//                           <FontAwesomeIcon 
//                             icon={showConfirmNewPassword ? faEyeSlash : faEyeRegular} 
//                             style={{ color: customStyles.primaryColor }}
//                           />
//                         </InputGroup.Text>
//                       </InputGroup>
//                       <BootstrapForm.Control.Feedback type="invalid" className="d-block">
//                         {touched.confirm_password && errors.confirm_password}
//                       </BootstrapForm.Control.Feedback>
//                     </BootstrapForm.Group>

//                     <Button
//                       type="submit"
//                       className="w-100 mb-3 py-2 fw-semibold"
//                       disabled={isLoading}
//                       style={{
//                         backgroundColor: customStyles.primaryColor,
//                         borderColor: customStyles.primaryColor,
//                         color: "white",
//                         boxShadow: "none",
//                       }}
//                     >
//                       {isLoading ? (
//                         <>
//                           <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
//                           Changing...
//                         </>
//                       ) : (
//                         "Change Password"
//                       )}
//                     </Button>
//                   </FormikForm>
//                 )}
//               </Formik>
//               {/* END FORMIK WRAPPER  */}

//               <div className="text-center mt-3">
//                 <Link
//                   to="/login"
//                   className="small text-decoration-none"
//                   style={{ color: customStyles.primaryColor, fontFamily: "body" }} 
//                 >
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
//           fontFamily: "body"
//         }}
//       > 
//         <div className="d-flex justify-content-between align-items-center container">
//           <div className="footer-copyright" >
//             &copy; 2025 {customStyles.logoText}. All rights reserved.
//           </div>
//           <div className="d-flex align-items-center">
//             <Link className="text-muted text-decoration-none me-3" style={{ fontFamily: "body" }} role="button" to="/system-admin">Privacy Policy</Link>
//             <a href="#" className="text-muted text-decoration-none me-3" style={{ fontFamily: "body"}}>Terms of Service</a>
//             <a href="#" className="text-muted text-decoration-none" style={{ fontFamily: "body" }} >Contact Us</a>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default ResetPassword;

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Formik, Form as FormikForm } from "formik"; 
// import { resetPasswordValidationSchema } from "./../../validation/authValidation";
// import { useDispatch } from "react-redux"; // <-- RESTORED
// import { AppDispatch } from "../../store/store"; // <-- RESTORED
// import { resetPassword } from "../../store/slices/authSlice"; // <-- RESTORED
// import axios from "axios"; // <-- ADDED for robust error checking

// import {
//   Container,
//   Card,
//   Button,
//   Form as BootstrapForm, 
//   Alert,
//   Spinner,
//   InputGroup,
// } from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
// import { faEye as faEyeRegular } from "@fortawesome/free-regular-svg-icons";
// import logo from "./../../assets/Images/obeeomalogoword1.png"; 


// const customStyles = {
//   primaryColor: "#3CB371", // The green
//   logoText: "Obeeoma",
// };


// type ResetPasswordFormValues = {
//   email: string; 
//   new_password: string; 
//   confirm_password: string;
// };

// // Define the type used by the Redux Thunk
// type ChangePasswordData = {
//     email: string;
//     new_password: string;
//     confirm_password: string, 
//     onSuccess?: () => void;
// };

// const ResetPassword: React.FC = () => {
//   const navigate = useNavigate();
//   
//   const dispatch = useDispatch<AppDispatch>(); // <-- RESTORED

//   // Local state for UI feedback
//   const [apiError, setApiError] = useState<string | null>(null); 
//   const [isLoading, setIsLoading] = useState(false);
//   
//   // State for password visibility toggles
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmNewPassword, setShowConfirmPassword] = useState(false);

//   const toggleNewPasswordVisibility = () => setShowNewPassword((prev) => !prev);
//   const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);

//   // Initial Formik Values
//   const initialValues: ResetPasswordFormValues = {
//     email: "",
//     new_password: "", 
//     confirm_password: "",
//   };

//   // 💡 RESTORED Original Redux Dispatch Logic
//   const handleResetSubmit = async (values: ResetPasswordFormValues) => {
//     setApiError(null);
//     setIsLoading(true);

//     try {
//         const payload: ChangePasswordData = {
//           email: values.email,
//           confirm_password: values.confirm_password, // Corrected access to values
//           new_password: values.new_password,
//           onSuccess: () => navigate("/login", { replace: true }),
//         };

//         
//         await dispatch(
//             resetPassword(payload) // This dispatches the POST request
//         ).unwrap();

//     } catch (error: unknown) {
//         console.error("Password reset failed:", error);
        
//         let errorMessage: string;

//         // Enhanced error handling to diagnose the 405 error
//         if (axios.isAxiosError(error) && error.response) {
//             if (error.response.status === 405) {
//                 errorMessage = "Method Not Allowed (405): The server is rejecting the request. This is usually due to the client incorrectly sending a GET request instead of POST, or a server configuration error.";
//             } else if (error.response.data && typeof error.response.data === 'object') {
//                 // Try to extract a useful message from the response body (detail or non_field_errors)
//                 errorMessage = (error.response.data as { detail?: string }).detail 
//                              || (error.response.data as { non_field_errors?: string[] }).non_field_errors?.[0] 
//                              || `API Error: ${error.response.statusText}`;
//             } else {
//                 errorMessage = error.response.statusText || String(error);
//             }
//         } else if (typeof error === 'string') {
//             errorMessage = error;
//         } else {
//             errorMessage = "Failed to reset password. Please try again.";
//         }

//         setApiError(errorMessage);
//     } finally {
//         setIsLoading(false);
//     }
//   };

//   return (
//     <div
//       style={{
//         backgroundColor: "#f5f5f5",
//         height: "100vh",
//         overflow: "auto",
//         paddingBottom: "80px",
//       }}
//       className="d-flex justify-content-center align-items-center"
//     >
//       <Container>
//         <div className="d-flex justify-content-center">
//           <Card
//             className="shadow-sm border-0 p-4"
//             style={{
//               maxWidth: "600px",
//               width: "100%",
//               borderRadius: "8px",
//               boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//             }}
//           >
//             <Card.Body>
//               {/*  Header and Logo  */}
//               <div className="d-flex flex-column align-items-center justify-content-center mb-4" style={{ fontFamily: "heading" }}>
//                 <img
//                   src={logo}
//                   alt="Obeeoma Logo"
//                   style={{
//                     height: "50px",
//                     width: "auto"
//                   }}
//                   className="mb-1"
//                 />
//               </div>
//               <h3 className="mb-2 fw-semibold text-dark" style={{ fontFamily: "body", textAlign: "center" , fontSize: "24px" }}>
//                 Reset Your Password
//               </h3>
//               <p className="text-muted mb-4 small " style={{ fontFamily: "body", textAlign: "center" , fontSize: "14px" }}>
//                 Enter   your new password.
//               </p>

//               {/* Error Alert */}
//               {apiError && (
//                 <Alert variant="danger" className="py-2">
//                   {apiError}
//                 </Alert>
//               )}

//               {/* FORMIK */}
//               <Formik
//                 initialValues={initialValues}
//                 validationSchema={resetPasswordValidationSchema} 
//                 onSubmit={handleResetSubmit}
//               >
//                 {({
//                   handleChange,
//                   handleSubmit: formikSubmit,
//                   values,
//                   errors,
//                   touched,
//                 }) => (
//                   <FormikForm noValidate onSubmit={formikSubmit}>
//                     {/* email Field */}
//                     <BootstrapForm.Group className="mb-3" controlId="email">
//                       <BootstrapForm.Control
//                         type="text"
//                         name="email" 
//                         placeholder="Enter your email"
//                         value={values.email}
//                         onChange={handleChange}
//                         className="py-2"
//                         isInvalid={touched.email && !!errors.email}
//                       />
//                       <BootstrapForm.Control.Feedback type="invalid">
//                         {errors.email}
//                       </BootstrapForm.Control.Feedback>
//                     </BootstrapForm.Group> 

//                     {/* New Password Field  */}
//                     <BootstrapForm.Group className="mb-3" controlId="new_password"> 
//                       <InputGroup>
//                         <BootstrapForm.Control
//                           style={{ fontFamily: "body" }}
//                           type={showNewPassword ? "text" : "password"}
//                           name="new_password" 
//                           value={values.new_password}
//                           onChange={handleChange}
//                           placeholder="New Password"
//                           className="py-2 border-success border-opacity-25"
//                           isInvalid={touched.new_password && !!errors.new_password}
//                         />
//                         <InputGroup.Text 
//                           onClick={toggleNewPasswordVisibility}
//                           style={{ cursor: "pointer", backgroundColor: "white" }}
//                         >
//                           <FontAwesomeIcon 
//                             icon={showNewPassword ? faEyeSlash : faEyeRegular} 
//                             style={{ color: customStyles.primaryColor }}
//                           />
//                         </InputGroup.Text>
//                       </InputGroup> 
//                       <BootstrapForm.Control.Feedback type="invalid" className="d-block">
//                         {touched.new_password && errors.new_password}
//                       </BootstrapForm.Control.Feedback>
//                     </BootstrapForm.Group>

//                     {/* Confirm New Password */}
//                     <BootstrapForm.Group className="mb-4" controlId="confirm_password" >
//                       <InputGroup>
//                         <BootstrapForm.Control
//                           style={{ fontFamily: "body" }}
//                           type={showConfirmNewPassword ? "text" : "password"}
//                           name="confirm_password" 
//                           placeholder="Confirm New Password"
//                           value={values.confirm_password}
//                           onChange={handleChange}
//                           className="py-2 "
//                           isInvalid={touched.confirm_password && !!errors.confirm_password}
//                         />
//                         <InputGroup.Text 
//                           onClick={toggleConfirmPasswordVisibility}
//                           style={{ cursor: "pointer", backgroundColor: "white" }}
//                         >
//                           <FontAwesomeIcon 
//                             icon={showConfirmNewPassword ? faEyeSlash : faEyeRegular} 
//                             style={{ color: customStyles.primaryColor }}
//                           />
//                         </InputGroup.Text>
//                       </InputGroup>
//                       <BootstrapForm.Control.Feedback type="invalid" className="d-block">
//                         {touched.confirm_password && errors.confirm_password}
//                       </BootstrapForm.Control.Feedback>
//                     </BootstrapForm.Group>

//                     <Button
//                       type="submit"
//                       className="w-100 mb-3 py-2 fw-semibold"
//                       disabled={isLoading}
//                       style={{
//                         backgroundColor: customStyles.primaryColor,
//                         borderColor: customStyles.primaryColor,
//                         color: "white",
//                         boxShadow: "none",
//                       }}
//                     >
//                       {isLoading ? (
//                         <>
//                           <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
//                           Changing...
//                         </>
//                       ) : (
//                         "Change Password"
//                       )}
//                     </Button>
//                   </FormikForm>
//                 )}
//               </Formik>
//               {/* END FORMIK WRAPPER  */}

//               <div className="text-center mt-3">
//                 <Link
//                   to="/login"
//                   className="small text-decoration-none"
//                   style={{ color: customStyles.primaryColor, fontFamily: "body" }} 
//                 >
//                   Back to Sign in
//                 </Link>
//               </div>
//             </Card.Body>
//           </Card>
//         </div>
//       </Container>

//       {/* --- Footer Component --- */}
//       <footer
//         className="text-center text-muted py-3 small border-top"
//         style={{
//           position: "fixed",
//           bottom: "0", 
//           width: "100%",
//           backgroundColor: "#f5f5f5", 
//           fontSize: "0.8rem",
//           zIndex: 1000, 
//           fontFamily: "body"
//         }}
//       > 
//         <div className="d-flex justify-content-between align-items-center container">
//           <div className="footer-copyright" >
//             &copy; 2025 {customStyles.logoText}. All rights reserved.
//           </div>
//           <div className="d-flex align-items-center">
//             <Link className="text-muted text-decoration-none me-3" style={{ fontFamily: "body" }} role="button" to="/system-admin">Privacy Policy</Link>
//             <a href="#" className="text-muted text-decoration-none me-3" style={{ fontFamily: "body"}}>Terms of Service</a>
//             <a href="#" className="text-muted text-decoration-none" style={{ fontFamily: "body" }} >Contact Us</a>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default ResetPassword;

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
// import logo from "./../../assets/Images/obeeomalogoword1.png";

// const customStyles = {
//   primaryColor: "#3CB371", // Used for links and accents
// };

// // --- Component Definition ---

// const ResetPasswordSignIn: React.FC = () => {
//   const [email, setEmail] = useState("");
//   const [error, setError] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   // FIX: Removed the unused state variable
//   // const [isCodeSentSuccess, setIsCodeSentSuccess] = useState(false); 

//   const navigate = useNavigate();

//   // Unified function for sending/resending the password reset code
//   const sendPasswordResetCode = async (e?: React.FormEvent) => {
//     e?.preventDefault(); // Only prevent default if an event object is provided (i.e., from form submission)
//     setError(null);

//     if (!email) {
//       setError("Email is required");
//       return;
//     }

//     setIsLoading(true);
//     // FIX: Removed the setter call for the removed state
//     // setIsCodeSentSuccess(false); // Reset success state on a new attempt
    
//     try {
//       const API_URL = "https://api-0904.onrender.com/api/v1/auth/reset-password/";

//       const response = await fetch(API_URL, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || `Failed to send code with status: ${response.status}`);
//       }
      
//       // FIX: Removed the setter call for the removed state
//       // setIsCodeSentSuccess(true);
//       // Navigate only if the API call is successful and an email is sent
//       navigate("/otp-verify");
//     } catch (err: unknown) {
//       console.error("Forgot Password Error:", err);

//       let errorMessage = "An unexpected error occurred. Please try again.";

//       // Narrow the type to access the 'message' property
//       if (err instanceof Error) {
//         // Capitalize first letter of error message if needed for display
//         errorMessage = err.message; 
//       }

//       setError(errorMessage);
//       // FIX: Removed the setter call for the removed state
//       // setIsCodeSentSuccess(false); // Ensure success state is false on error

//     } finally {
//       setIsLoading(false);
//     }
//   };

//   /**
//    * Handles the "Send Code again" link click.
//    * It calls the main API function (`sendPasswordResetCode`) to perform the resend.
//    */
//   const handleResendCode = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
//     e.preventDefault(); // Prevent default link behavior
//     // Resend the code using the unified function
//     sendPasswordResetCode(); 
//   };

//   // The rest of the return statement (JSX) remains the same.
//   return (
//     // 1. Full Page Container with positioning for the fixed footer
//     <div
//       style={{
//         backgroundColor: "#f5f5f5",
//         height: "100vh",
//         overflow: "auto",
//         paddingBottom: "80px",
//       }}
//       className="d-flex justify-content-center align-items-center"
//     >
//       <Container>
//         <div className="d-flex justify-content-center">
//           <Card
//             className="shadow-sm border-0 p-4"
//             style={{
//               maxWidth: "600px", // Card width limit
//               width: "100%",
//               borderRadius: "8px",
//               boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//             }}
//           >
//             <Card.Body>
//               {/* Header and Logo */}
//               <div className="d-flex flex-column align-items-center justify-content-center mb-4" style={{ fontFamily: "heading" }}>
//                 <img
//                   src={logo}
//                   alt="Obeeoma Logo"
//                   style={{
//                     height: "50px",
//                     width: "auto"
//                   }}
//                   className="mb-1"
//                 />
//               </div>
//               <h3 className="display-6 fw-bold mb-1" style={{ fontFamily: "heading", textAlign: "center", fontSize: "24px" }}>
//                 Reset Password to Sign in
//               </h3>
//               <p className="text-muted mb-4 " style={{ fontFamily: "heading", textAlign: "center", fontSize: "14px" }}>Send code to email</p>

//               {/* Error Alert (Only one is needed) */}
//               {error && (
//                 <Alert variant="danger" className="py-2">
//                   {error}
//                 </Alert>
//               )}

//               {/* Bootstrap Form (Only one is needed) */}
//               {/* Use the unified function for form submission */}
//               <BootstrapForm noValidate onSubmit={sendPasswordResetCode}>
//                 {/* Email Field */}
//                 <BootstrapForm.Group className="mb-4">
//                   <BootstrapForm.Control
//                     type="email"
//                     name="email"
//                     placeholder="Email address"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="py-2"
//                     // Check for general error or if the email field itself is required
//                     isInvalid={!!error && !email} 
//                     style={
//                       error
//                         ? {
//                             borderColor: "red",
//                             borderWidth: "1.5px",
//                             fontFamily: "body",

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
//                   type="submit"
//                   className="w-100 mb-3 py-2 fw-semibold"
//                   // Disable only when loading
//                   disabled={isLoading} 
//                   style={{
//                     backgroundColor: customStyles.primaryColor,
//                     borderColor: customStyles.primaryColor,
//                     color: "white",
//                     boxShadow: "none",
//                     fontFamily: "body"
//                   }}
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
//                         style={{ fontFamily: "body" }}
//                       />
//                       Sending...
//                     </>
//                   ) : (
//                     "Send Code"
//                   )}
//                 </Button>
//               </BootstrapForm>

//               {/* Resend Code */}
//               <div className="text-center mt-3">
//                 <span className="text-center text-muted small" style={{ fontFamily: "body" }}>
//                   Didn't receive any code?{" "}
//                 </span>
//                 <Link
//                   onClick={handleResendCode}
//                   // Disable the resend link while an operation is in progress (loading)
//                   className={`small ${isLoading ? 'disabled-link' : ''}`}
//                   style={{
//                     color: customStyles.primaryColor,
//                     textDecoration: "none",
//                     fontWeight: "500",
//                     cursor: isLoading ? "not-allowed" : "pointer",
//                     opacity: isLoading ? 0.6 : 1,
//                     fontFamily: "body"
//                   }}
//                   to="#" 
//                 >
//                   {isLoading ? (
//                     <>
//                       <Spinner
//                         as="span"
//                         animation="border"
//                         size="sm"
//                         role="status"
//                         aria-hidden="true"
//                         className="me-1"
//                         style={{ fontFamily: "body" }}
//                       />
//                       Resending...
//                     </>
//                   ) : (
//                     "Send Code again"
//                   )}
//                 </Link>
//               </div>
//             </Card.Body>
//           </Card>
//         </div>
//       </Container>

//       {/* --- Footer Component (Only one is needed) --- */}
//       <footer
//         className="text-center text-muted py-3 small border-top"
//         style={{
//           position: "fixed", // at the bottom of the viewport
//           bottom: "0",
//           width: "100%",
//           backgroundColor: "#f5f5f5",
//           fontSize: "0.8rem",
//           zIndex: 1000,
//           fontFamily: "body"
//         }}
//       >
//         <div className="d-flex justify-content-between align-items-center container">
//           <div className="footer-copyright" >
//             &copy; 2025 Obeeoma. All rights reserved.
//           </div>

//           <div className="d-flex align-items-center">
//             <Link
//               className="text-muted text-decoration-none me-3"
//               style={{ fontFamily: "body" }}
//               role="button"
//               to="/system-admin"
//             >
//               Privacy Policy
//             </Link>

//             <a
//               href="#"
//               className="text-muted text-decoration-none me-3"
//               style={{ fontFamily: "body" }}
//             >
//               Terms of Service
//             </a>

//             <a
//               href="#"
//               className="text-muted text-decoration-none"
//               style={{ fontFamily: "body" }}
//             >
//               Contact Us
//             </a>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default ResetPasswordSignIn;
// // import React, { useState } from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import {
// //   Container,
// //   Card,
// //   Button,
// //   Form as BootstrapForm,
// //   Alert,
// //   Spinner,
// // } from "react-bootstrap";
// // import logo from "./../../assets/Images/obeeomalogoword1.png";

// // const customStyles = {
// //   primaryColor: "#3CB371", // Used for links and accents
// // };

// // // --- Component Definition ---

// // const ResetPasswordSignIn: React.FC = () => {
// //   const [email, setEmail] = useState("");
// //   const [error, setError] = useState<string | null>(null);
// //   const [isLoading, setIsLoading] = useState(false);
// //   // Renamed isEmailSent to isCodeSentSuccess for clarity on resend logic
// //   // const [isCodeSentSuccess, setIsCodeSentSuccess] = useState(false); 
// //   const [isCodeSentSuccess, setIsCodeSentSuccess] = useState(false); 

// //   const navigate = useNavigate();

// //   // Unified function for sending/resending the password reset code
// //   const sendPasswordResetCode = async (e?: React.FormEvent) => {
// //     e?.preventDefault(); // Only prevent default if an event object is provided (i.e., from form submission)
// //     setError(null);

// //     if (!email) {
// //       setError("Email is required");
// //       return;
// //     }

// //     setIsLoading(true);
// //     setIsCodeSentSuccess(false); // Reset success state on a new attempt
    
// //     try {
// //       const API_URL = "https://api-0904.onrender.com/api/v1/auth/reset-password/";

// //       const response = await fetch(API_URL, {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({ email }),
// //       });

// //       if (!response.ok) {
// //         const errorData = await response.json();
// //         throw new Error(errorData.message || `Failed to send code with status: ${response.status}`);
// //       }
      
// //       setIsCodeSentSuccess(true);
// //       // Navigate only if the API call is successful and an email is sent
// //       navigate("/otp-verify");
// //     } catch (err: unknown) {
// //       console.error("Forgot Password Error:", err);

// //       let errorMessage = "An unexpected error occurred. Please try again.";

// //       // Narrow the type to access the 'message' property
// //       if (err instanceof Error) {
// //         // Capitalize first letter of error message if needed for display
// //         errorMessage = err.message; 
// //       }

// //       setError(errorMessage);
// //       setIsCodeSentSuccess(false); // Ensure success state is false on error

// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   /**
// //    * Handles the "Send Code again" link click.
// //    * It calls the main API function (`sendPasswordResetCode`) to perform the resend.
// //    */
// //   const handleResendCode = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
// //     e.preventDefault(); // Prevent default link behavior
// //     // Resend the code using the unified function
// //     sendPasswordResetCode(); 
// //   };

// //   return (
// //     // 1. Full Page Container with positioning for the fixed footer
// //     <div
// //       style={{
// //         backgroundColor: "#f5f5f5",
// //         height: "100vh",
// //         overflow: "auto",
// //         paddingBottom: "80px",
// //       }}
// //       className="d-flex justify-content-center align-items-center"
// //     >
// //       <Container>
// //         <div className="d-flex justify-content-center">
// //           <Card
// //             className="shadow-sm border-0 p-4"
// //             style={{
// //               maxWidth: "600px", // Card width limit
// //               width: "100%",
// //               borderRadius: "8px",
// //               boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
// //             }}
// //           >
// //             <Card.Body>
// //               {/* Header and Logo */}
// //               <div className="d-flex flex-column align-items-center justify-content-center mb-4" style={{ fontFamily: "heading" }}>
// //                 <img
// //                   src={logo}
// //                   alt="Obeeoma Logo"
// //                   style={{
// //                     height: "50px",
// //                     width: "auto"
// //                   }}
// //                   className="mb-1"
// //                 />
// //               </div>
// //               <h3 className="display-6 fw-bold mb-1" style={{ fontFamily: "heading", textAlign: "center", fontSize: "24px" }}>
// //                 Reset Password to Sign in
// //               </h3>
// //               <p className="text-muted mb-4 " style={{ fontFamily: "heading", textAlign: "center", fontSize: "14px" }}>Send code to email</p>

// //               {/* Error Alert (Only one is needed) */}
// //               {error && (
// //                 <Alert variant="danger" className="py-2">
// //                   {error}
// //                 </Alert>
// //               )}

// //               {/* Bootstrap Form (Only one is needed) */}
// //               {/* Use the unified function for form submission */}
// //               <BootstrapForm noValidate onSubmit={sendPasswordResetCode}>
// //                 {/* Email Field */}
// //                 <BootstrapForm.Group className="mb-4">
// //                   <BootstrapForm.Control
// //                     type="email"
// //                     name="email"
// //                     placeholder="Email address"
// //                     value={email}
// //                     onChange={(e) => setEmail(e.target.value)}
// //                     className="py-2"
// //                     // Check for general error or if the email field itself is required
// //                     isInvalid={!!error && !email} 
// //                     style={
// //                       error
// //                         ? {
// //                           borderColor: "red",
// //                           borderWidth: "1.5px",
// //                           fontFamily: "body",

// //                         }
// //                         : {}
// //                     }
// //                   />
// //                   {/* Custom Error Message Display based on your image */}
// //                   {error && (
// //                     <div className="invalid-feedback d-block small mt-1 text-danger">
// //                       {error}
// //                     </div>
// //                   )}
// //                 </BootstrapForm.Group>

// //                 <Button
// //                   type="submit"
// //                   className="w-100 mb-3 py-2 fw-semibold"
// //                   // Disable only when loading
// //                   disabled={isLoading} 
// //                   style={{
// //                     backgroundColor: customStyles.primaryColor,
// //                     borderColor: customStyles.primaryColor,
// //                     color: "white",
// //                     boxShadow: "none",
// //                     fontFamily: "body"
// //                   }}
// //                 >
// //                   {isLoading ? (
// //                     <>
// //                       <Spinner
// //                         as="span"
// //                         animation="border"
// //                         size="sm"
// //                         role="status"
// //                         aria-hidden="true"
// //                         className="me-2"
// //                         style={{ fontFamily: "body" }}
// //                       />
// //                       Sending...
// //                     </>
// //                   ) : (
// //                     "Send Code"
// //                   )}
// //                 </Button>
// //               </BootstrapForm>

// //               {/* Resend Code */}
// //               <div className="text-center mt-3">
// //                 <span className="text-center text-muted small" style={{ fontFamily: "body" }}>
// //                   Didn't receive any code?{" "}
// //                 </span>
// //                 <Link
// //                   onClick={handleResendCode}
// //                   // Disable the resend link while an operation is in progress (loading)
// //                   className={`small ${isLoading ? 'disabled-link' : ''}`}
// //                   style={{
// //                     color: customStyles.primaryColor,
// //                     textDecoration: "none",
// //                     fontWeight: "500",
// //                     cursor: isLoading ? "not-allowed" : "pointer",
// //                     opacity: isLoading ? 0.6 : 1,
// //                     fontFamily: "body"
// //                   }}
// //                   to="#" 
// //                 >
// //                   {isLoading ? (
// //                     <>
// //                       <Spinner
// //                         as="span"
// //                         animation="border"
// //                         size="sm"
// //                         role="status"
// //                         aria-hidden="true"
// //                         className="me-1"
// //                         style={{ fontFamily: "body" }}
// //                       />
// //                       Resending...
// //                     </>
// //                   ) : (
// //                     "Send Code again"
// //                   )}
// //                 </Link>
// //               </div>
// //             </Card.Body>
// //           </Card>
// //         </div>
// //       </Container>

// //       {/* --- Footer Component (Only one is needed) --- */}
// //       <footer
// //         className="text-center text-muted py-3 small border-top"
// //         style={{
// //           position: "fixed", // at the bottom of the viewport
// //           bottom: "0",
// //           width: "100%",
// //           backgroundColor: "#f5f5f5",
// //           fontSize: "0.8rem",
// //           zIndex: 1000,
// //           fontFamily: "body"
// //         }}
// //       >
// //         <div className="d-flex justify-content-between align-items-center container">
// //           <div className="footer-copyright" >
// //             &copy; 2025 Obeeoma. All rights reserved.
// //           </div>

// //           <div className="d-flex align-items-center">
// //             <Link
// //               className="text-muted text-decoration-none me-3"
// //               style={{ fontFamily: "body" }}
// //               role="button"
// //               to="/system-admin"
// //             >
// //               Privacy Policy
// //             </Link>

// //             <a
// //               href="#"
// //               className="text-muted text-decoration-none me-3"
// //               style={{ fontFamily: "body" }}
// //             >
// //               Terms of Service
// //             </a>

// //             <a
// //               href="#"
// //               className="text-muted text-decoration-none"
// //               style={{ fontFamily: "body" }}
// //             >
// //               Contact Us
// //             </a>
// //           </div>
// //         </div>
// //       </footer>
// //     </div>
// //   );
// // };

// // export default ResetPasswordSignIn;
// // // import React, { useState } from "react";
// // // import { Link, useNavigate } from "react-router-dom";
// // // import { Formik, Form as FormikForm } from "formik";
// // // import { resetPasswordValidationSchema } from "./../../validation/authValidation";
// // // import { useDispatch } from "react-redux";
// // // import { AppDispatch } from "../../store/store";
// // // import { resetPassword } from "../../store/slices/authSlice";

// // // import {
// // //   Container,
// // //   Card,
// // //   Button,
// // //   Form as BootstrapForm,
// // //   Alert,
// // //   Spinner,
// // //   InputGroup,
// // // } from "react-bootstrap";
// // // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // // import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
// // // import { faEye as faEyeRegular } from "@fortawesome/free-regular-svg-icons";
// // // import logo from "./../../assets/Images/obeeomalogoword1.png";

// // // const customStyles = {
// // //   primaryColor: "#3CB371", // The green
// // //   logoText: "Obeeoma",
// // // };

// // // type ResetPasswordFormValues = {
// // //   //code: string; 
// // //   password: string; 
// // //   confirmPassword: string;
// // // };

// // // type ChangePasswordData = {
// // //     //: string;
// // //     password: string;
// // //     confirmPassword: string, 
// // //     onSuccess?: () => void;
// // // };

// // // const ResetPassword: React.FC = () => {
// // //   const navigate = useNavigate();

// // //   // Correct: Only declare dispatch once
// // //   const dispatch = useDispatch<AppDispatch>();

// // //   // Local state for UI feedback
// // //   const [apiError, setApiError] = useState<string | null>(null);
// // //   const [isLoading, setIsLoading] = useState(false);

// // //   // State for password visibility toggles
// // //   const [showNewPassword, setShowNewPassword] = useState(false);
// // //   const [showConfirmNewPassword, setShowConfirmPassword] = useState(false);

// // //   const toggleNewPasswordVisibility = () => setShowNewPassword((prev) => !prev);
// // //   const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);

// // //   // Initial Formik Values
// // //   const initialValues: ResetPasswordFormValues = {
// // //     //code: "",
// // //     password: "", 
// // //     confirmPassword: "",
// // //   };

// // //   const handleResetSubmit = async (values: ResetPasswordFormValues) => {
// // //     setApiError(null);
// // //     setIsLoading(true);

// // //     try {
// // //         const payload: ChangePasswordData = {
// // //           //token: values.code,
// // //           confirmPassword:values. confirmPassword,
// // //           password: values.password,
// // //           onSuccess: () => navigate("/login", { replace: true }),
          
// // //         };

        
// // //         await dispatch(
// // //             resetPassword(payload) 
// // //         ).unwrap();

// // //     } catch (error) {
// // //       console.error("Password reset failed:", error);
// // //       // Ensure the error is handled safely (e.g., convert to string)
// // //       const errorMessage = typeof error === 'string'
// // //         ? error
// // //         // eslint-disable-next-line @typescript-eslint/no-explicit-any
// // //         : (error as any)?.message || "Failed to reset password. Please try again.";
// // //       setApiError(errorMessage);
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   }; 

// // //   return (
// // //     <div
// // //       style={{
// // //         backgroundColor: "#f5f5f5",
// // //         height: "100vh",
// // //         overflow: "auto",
// // //         paddingBottom: "80px",
// // //       }}
// // //       className="d-flex justify-content-center align-items-center"
// // //     >
// // //       <Container>
// // //         <div className="d-flex justify-content-center">
// // //           <Card
// // //             className="shadow-sm border-0 p-4"
// // //             style={{
// // //               maxWidth: "600px",
// // //               width: "100%",
// // //               borderRadius: "8px",
// // //               boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
// // //             }}
// // //           >
// // //             <Card.Body>
// // //               {/* Header and Logo 	*/}
// // //               <div className="d-flex flex-column align-items-center justify-content-center mb-4" style={{ fontFamily: "heading" }}>
// // //                 <img
// // //                   src={logo}
// // //                   alt="Obeeoma Logo"
// // //                   style={{
// // //                     height: "50px",
// // //                     width: "auto"
// // //                   }}
// // //                   className="mb-1"
// // //                 />
// // //               </div>
// // //               <h3 className="mb-2 fw-semibold text-dark" style={{ fontFamily: "body", textAlign: "center", fontSize: "24px" }}>
// // //                 Reset Your Password
// // //               </h3>
// // //               <p className="text-muted mb-4 small " style={{ fontFamily: "body", textAlign: "center", fontSize: "14px" }}>
// // //                 Enter the code and your new password.
// // //               </p>

// // //               {/* Error Alert */}
// // //               {apiError && (
// // //                 <Alert variant="danger" className="py-2">
// // //                   {apiError}
// // //                 </Alert>
// // //               )}

// // //               {/* FORMIK */}
// // //               <Formik
// // //                 initialValues={initialValues}
// // //                 validationSchema={resetPasswordValidationSchema}
// // //                 onSubmit={handleResetSubmit}
// // //               >
// // //                 {({
// // //                   handleChange,
// // //                   handleSubmit: formikSubmit,
// // //                   values,
// // //                   errors,
// // //                   touched,
// // //                 }) => (
// // //                   <FormikForm noValidate onSubmit={formikSubmit}>
// // //                     {/* Code Field */}
// // //                     {/* <BootstrapForm.Group className="mb-3" controlId="code">
// // //                       <BootstrapForm.Control
// // //                         type="text"
// // //                         name="code"
// // //                         placeholder="Enter the reset code"
// // //                         value={values.code}
// // //                         onChange={handleChange}
// // //                         className="py-2"
// // //                         isInvalid={touched.code && !!errors.code}
// // //                       />
// // //                       <BootstrapForm.Control.Feedback type="invalid">
// // //                         {errors.code}
// // //                       </BootstrapForm.Control.Feedback>
// // //                     </BootstrapForm.Group>

// // //                     {/* New Password Field 	*/}
// // //                     <BootstrapForm.Group className="mb-3" controlId="password">
// // //                       <InputGroup>
// // //                         <BootstrapForm.Control
// // //                           style={{ fontFamily: "body" }}
// // //                           type={showNewPassword ? "text" : "password"}
// // //                           name="password"
// // //                           value={values.password}
// // //                           onChange={handleChange}
// // //                           placeholder="New Password"
// // //                           className="py-2 border-success border-opacity-25"
// // //                           isInvalid={touched.password && !!errors.password}
// // //                         />
// // //                         <InputGroup.Text
// // //                           onClick={toggleNewPasswordVisibility}
// // //                           style={{ cursor: "pointer", backgroundColor: "white" }}
// // //                         >
// // //                           <FontAwesomeIcon
// // //                             icon={showNewPassword ? faEyeSlash : faEyeRegular}
// // //                             style={{ color: customStyles.primaryColor }}
// // //                           />
// // //                         </InputGroup.Text>
// // //                       </InputGroup>
// // //                       <BootstrapForm.Control.Feedback type="invalid" className="d-block">
// // //                         {touched.password && errors.password}
// // //                       </BootstrapForm.Control.Feedback>
// // //                     </BootstrapForm.Group>

// // //                     {/* Confirm New Password */}
// // //                     <BootstrapForm.Group className="mb-4" controlId="confirmNewPassword" >
// // //                       <InputGroup>
// // //                         <BootstrapForm.Control
// // //                           style={{ fontFamily: "body" }}
// // //                           type={showConfirmNewPassword ? "text" : "password"}
// // //                           name="confirmPassword" 
// // //                           placeholder="Confirm New Password"
// // //                           value={values.confirmPassword}
// // //                           onChange={handleChange}
// // //                           className="py-2 "
// // //                           isInvalid={touched.confirmPassword && !!errors.confirmPassword}
// // //                         />
// // //                         <InputGroup.Text
// // //                           onClick={toggleConfirmPasswordVisibility}
// // //                           style={{ cursor: "pointer", backgroundColor: "white" }}
// // //                         >
// // //                           <FontAwesomeIcon
// // //                             icon={showConfirmNewPassword ? faEyeSlash : faEyeRegular}
// // //                             style={{ color: customStyles.primaryColor }}
// // //                           />
// // //                         </InputGroup.Text>
// // //                       </InputGroup>
// // //                       <BootstrapForm.Control.Feedback type="invalid" className="d-block">
// // //                         {touched.confirmPassword && errors.confirmPassword}
// // //                       </BootstrapForm.Control.Feedback>
// // //                     </BootstrapForm.Group>

// // //                     <Button
// // //                       type="submit"
// // //                       className="w-100 mb-3 py-2 fw-semibold"
// // //                       disabled={isLoading}
// // //                       style={{
// // //                         backgroundColor: customStyles.primaryColor,
// // //                         borderColor: customStyles.primaryColor,
// // //                         color: "white",
// // //                         boxShadow: "none",
// // //                       }}
// // //                     >
// // //                       {isLoading ? (
// // //                         <>
// // //                           <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
// // //                           Changing...
// // //                         </>
// // //                       ) : (
// // //                         "Change Password"
// // //                       )}
// // //                     </Button>
// // //                   </FormikForm>
// // //                 )}
// // //               </Formik>
// // //               {/* END FORMIK WRAPPER 	*/}

// // //               <div className="text-center mt-3">
// // //                 <Link
// // //                   to="/login"
// // //                   className="small text-decoration-none"
// // //                   style={{ color: customStyles.primaryColor, fontFamily: "body" }}
// // //                 >
// // //                   Back to Sign in
// // //                 </Link>
// // //               </div>
// // //             </Card.Body>
// // //           </Card>
// // //         </div>
// // //       </Container>

// // //       {/* --- Footer Component --- */}
// // //       <footer
// // //         className="text-center text-muted py-3 small border-top"
// // //         style={{
// // //           position: "fixed",
// // //           bottom: "0",
// // //           width: "100%",
// // //           backgroundColor: "#f5f5f5",
// // //           fontSize: "0.8rem",
// // //           zIndex: 1000,
// // //           fontFamily: "body"
// // //         }}
// // //       >
// // //         <div className="d-flex justify-content-between align-items-center container">
// // //           <div className="footer-copyright" >
// // //             &copy; 2025 {customStyles.logoText}. All rights reserved.
// // //           </div>
// // //           <div className="d-flex align-items-center">
// // //             <Link className="text-muted text-decoration-none me-3" style={{ fontFamily: "body" }} role="button" to="/system-admin">Privacy Policy</Link>
// // //             <a href="#" className="text-muted text-decoration-none me-3" style={{ fontFamily: "body" }}>Terms of Service</a>
// // //             <a href="#" className="text-muted text-decoration-none" style={{ fontFamily: "body" }} >Contact Us</a>
// // //           </div>
// // //         </div>
// // //       </footer>
// // //     </div>
// // //   );
// // // };

// // // export default ResetPassword;