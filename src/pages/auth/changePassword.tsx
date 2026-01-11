// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Formik, Form as FormikForm } from "formik";
// import { changePasswordValidationSchema } from "./../../validation/authValidation";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../../store/store";
// import { changePassword as changePasswordAction } from "../../store/slices/authSlice";

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
//   primaryColor: "#22C55E", // The green
//   logoText: "Obeeoma",
// };

// type changePasswordFormValues = {
//   old_password: string;
//   new_password: string;
//   confirm_password: string;
// };

// type ChangePasswordPayload = {
//   old_password: string;
//   new_password: string;
//   confirm_password: string;
//   onSuccess?: () => void;
// };

// const ChangePassword: React.FC = () => {
//   const navigate = useNavigate();

//   const dispatch = useDispatch<AppDispatch>();

//   // Local state for UI feedback
//   const [apiError, setApiError] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   // State for password visibility toggles
//   const [showOldPassword, setShowOldPassword] = useState(false);
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmNewPassword, setShowConfirmPassword] = useState(false);

//   const toggleOldPasswordVisibility = () => setShowOldPassword((prev) => !prev);
//   const toggleNewPasswordVisibility = () => setShowNewPassword((prev) => !prev);
//   const toggleConfirmPasswordVisibility = () =>
//     setShowConfirmPassword((prev) => !prev);

//   // Initial Formik Values
//   const initialValues: changePasswordFormValues = {
//     old_password: "",
//     new_password: "",
//     confirm_password: "",
//   };

//   const handleResetSubmit = async (values: changePasswordFormValues) => {
//     setApiError(null);

//     setIsLoading(true);

//     try {
//       const payload: ChangePasswordPayload = {
//         old_password: values.old_password,
//         confirm_password: values.confirm_password,
//         new_password: values.new_password,
//         onSuccess: () => navigate("/login", { replace: true }),
//       };

//       await dispatch(changePasswordAction(payload)).unwrap();
//     } catch (error) {
//       console.error("Password reset failed:", error);
//       setApiError(
//         (error as string) || "Failed to reset password. Please try again.",
//       );
//     } finally {
//       setIsLoading(false);
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
//               <div
//                 className="d-flex flex-column align-items-center justify-content-center mb-4"
//                 style={{ fontFamily: "heading" }}
//               >
//                 <img
//                   src={logo}
//                   alt="Obeeoma Logo"
//                   style={{
//                     height: "50px",
//                     width: "auto",
//                   }}
//                   className="mb-1"
//                 />
//               </div>
//               <h3
//                 className="mb-2 fw-semibold text-dark"
//                 style={{
//                   fontFamily: "body",
//                   textAlign: "center",
//                   fontSize: "24px",
//                 }}
//               >
//                 Reset Your Password
//               </h3>
//               <p
//                 className="text-muted mb-4 small "
//                 style={{
//                   fontFamily: "body",
//                   textAlign: "center",
//                   fontSize: "14px",
//                 }}
//               >
//                 Enter your new password.
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
//                 validationSchema={changePasswordValidationSchema}
//                 onSubmit={handleResetSubmit}
//               >
//                 {({ handleChange, values, errors, touched }) => (
//                   <FormikForm noValidate>
//                     {/* old_password Field */}
//                     <BootstrapForm.Group
//                       className="mb-3"
//                       controlId="old_password"
//                     >
//                       <InputGroup>
//                         <BootstrapForm.Control
//                           type={showOldPassword ? "text" : "password"}
//                           name="old_password"
//                           placeholder="Enter your Old Password"
//                           value={values.old_password}
//                           onChange={handleChange}
//                           className="py-2"
//                           isInvalid={
//                             touched.old_password && !!errors.old_password
//                           }
//                         />
//                         <InputGroup.Text
//                           onClick={toggleOldPasswordVisibility}
//                           style={{
//                             cursor: "pointer",
//                             backgroundColor: "white",
//                           }}
//                         >
//                           <FontAwesomeIcon
//                             icon={showOldPassword ? faEyeSlash : faEyeRegular}
//                             style={{ color: customStyles.primaryColor }}
//                           />
//                         </InputGroup.Text>
//                       </InputGroup>
//                       <BootstrapForm.Control.Feedback type="invalid">
//                         {errors.old_password}
//                       </BootstrapForm.Control.Feedback>
//                     </BootstrapForm.Group>

//                     {/* New Password Field  */}
//                     <BootstrapForm.Group
//                       className="mb-3"
//                       controlId="new_password"
//                     >
//                       <InputGroup>
//                         <BootstrapForm.Control
//                           style={{ fontFamily: "body" }}
//                           type={showNewPassword ? "text" : "password"}
//                           name="new_password"
//                           value={values.new_password}
//                           onChange={handleChange}
//                           placeholder="New Password"
//                           className="py-2 border-success border-opacity-25"
//                           isInvalid={
//                             touched.new_password && !!errors.new_password
//                           }
//                         />
//                         <InputGroup.Text
//                           onClick={toggleNewPasswordVisibility}
//                           style={{
//                             cursor: "pointer",
//                             backgroundColor: "white",
//                           }}
//                         >
//                           <FontAwesomeIcon
//                             icon={showNewPassword ? faEyeSlash : faEyeRegular}
//                             style={{ color: customStyles.primaryColor }}
//                           />
//                         </InputGroup.Text>
//                       </InputGroup>
//                       <BootstrapForm.Control.Feedback
//                         type="invalid"
//                         className="d-block"
//                       >
//                         {touched.new_password && errors.new_password}
//                       </BootstrapForm.Control.Feedback>
//                     </BootstrapForm.Group>

//                     {/* Confirm New Password */}
//                     <BootstrapForm.Group
//                       className="mb-4"
//                       controlId="confirm_password"
//                     >
//                       <InputGroup>
//                         <BootstrapForm.Control
//                           style={{ fontFamily: "body" }}
//                           type={showConfirmNewPassword ? "text" : "password"}
//                           name="confirm_password"
//                           placeholder="Confirm New Password"
//                           value={values.confirm_password}
//                           onChange={handleChange}
//                           className="py-2 "
//                           isInvalid={
//                             touched.confirm_password &&
//                             !!errors.confirm_password
//                           }
//                         />
//                         <InputGroup.Text
//                           onClick={toggleConfirmPasswordVisibility}
//                           style={{
//                             cursor: "pointer",
//                             backgroundColor: "white",
//                           }}
//                         >
//                           <FontAwesomeIcon
//                             icon={
//                               showConfirmNewPassword ? faEyeSlash : faEyeRegular
//                             }
//                             style={{ color: customStyles.primaryColor }}
//                           />
//                         </InputGroup.Text>
//                       </InputGroup>
//                       <BootstrapForm.Control.Feedback
//                         type="invalid"
//                         className="d-block"
//                       >
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
//                           <Spinner
//                             as="span"
//                             animation="border"
//                             size="sm"
//                             role="status"
//                             aria-hidden="true"
//                             className="me-2"
//                           />
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
//                   style={{
//                     color: customStyles.primaryColor,
//                     fontFamily: "body",
//                   }}
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
//           fontFamily: "body",
//         }}
//       >
//         <div className="d-flex justify-content-between align-items-center container">
//           <div className="footer-copyright">
//             &copy; 2025 {customStyles.logoText}. All rights reserved.
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

// export default ChangePassword;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form as FormikForm } from "formik";
import { changePasswordValidationSchema } from "./../../validation/authValidation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { changePassword as changePasswordAction } from "../../store/slices/authSlice";

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
  primaryColor: "#22C55E", // The green
  logoText: "Obeeoma",
};

type changePasswordFormValues = {
  old_password: string;
  new_password: string;
  confirm_password: string;
};

type ChangePasswordPayload = {
  old_password: string;
  new_password: string;
  confirm_password: string;
  onSuccess?: () => void;
};

const ChangePassword: React.FC = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  // Local state for UI feedback
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // State for password visibility toggles
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmPassword] = useState(false);

  const toggleOldPasswordVisibility = () => setShowOldPassword((prev) => !prev);
  const toggleNewPasswordVisibility = () => setShowNewPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prev) => !prev);

  // Initial Formik Values
  const initialValues: changePasswordFormValues = {
    old_password: "",
    new_password: "",
    confirm_password: "",
  };

  const handleResetSubmit = async (values: changePasswordFormValues) => {
    setApiError(null);

    setIsLoading(true);

    try {
      const payload: ChangePasswordPayload = {
        old_password: values.old_password,
        confirm_password: values.confirm_password,
        new_password: values.new_password,
        onSuccess: () => navigate("/login", { replace: true }),
      };

      await dispatch(changePasswordAction(payload)).unwrap();
    } catch (error) {
      console.error("Password reset failed:", error);
      setApiError(
        (error as string) || "Failed to reset password. Please try again.",
      );
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
              <div
                className="d-flex flex-column align-items-center justify-content-center mb-4"
                style={{ fontFamily: "heading" }}
              >
                <img
                  src={logo}
                  alt="Obeeoma Logo"
                  style={{
                    height: "50px",
                    width: "auto",
                  }}
                  className="mb-1"
                />
              </div>
              <h3
                className="mb-2 fw-semibold text-dark"
                style={{
                  fontFamily: "body",
                  textAlign: "center",
                  fontSize: "24px",
                }}
              >
                Reset Your Password
              </h3>
              <p
                className="text-muted mb-4 small "
                style={{
                  fontFamily: "body",
                  textAlign: "center",
                  fontSize: "14px",
                }}
              >
                Enter your new password.
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
                validationSchema={changePasswordValidationSchema}
                onSubmit={handleResetSubmit}
              >
                {({ handleChange, values, errors, touched }) => (
                  <FormikForm noValidate>
                    {/* old_password Field */}
                    <BootstrapForm.Group
                      className="mb-3"
                      controlId="old_password"
                    >
                      <InputGroup>
                        <BootstrapForm.Control
                          type={showOldPassword ? "text" : "password"}
                          name="old_password"
                          placeholder="Enter your Old Password"
                          value={values.old_password}
                          onChange={handleChange}
                          className="py-2"
                          isInvalid={
                            touched.old_password && !!errors.old_password
                          }
                        />
                        <InputGroup.Text
                          onClick={toggleOldPasswordVisibility}
                          style={{
                            cursor: "pointer",
                            backgroundColor: "white",
                          }}
                        >
                          <FontAwesomeIcon
                            icon={showOldPassword ? faEyeSlash : faEyeRegular}
                            style={{ color: customStyles.primaryColor }}
                          />
                        </InputGroup.Text>
                      </InputGroup>
                      <BootstrapForm.Control.Feedback type="invalid">
                        {errors.old_password}
                      </BootstrapForm.Control.Feedback>
                    </BootstrapForm.Group>

                    {/* New Password Field  */}
                    <BootstrapForm.Group
                      className="mb-3"
                      controlId="new_password"
                    >
                      <InputGroup>
                        <BootstrapForm.Control
                          style={{ fontFamily: "body" }}
                          type={showNewPassword ? "text" : "password"}
                          name="new_password"
                          value={values.new_password}
                          onChange={handleChange}
                          placeholder="New Password"
                          className="py-2 border-success border-opacity-25"
                          isInvalid={
                            touched.new_password && !!errors.new_password
                          }
                        />
                        <InputGroup.Text
                          onClick={toggleNewPasswordVisibility}
                          style={{
                            cursor: "pointer",
                            backgroundColor: "white",
                          }}
                        >
                          <FontAwesomeIcon
                            icon={showNewPassword ? faEyeSlash : faEyeRegular}
                            style={{ color: customStyles.primaryColor }}
                          />
                        </InputGroup.Text>
                      </InputGroup>
                      <BootstrapForm.Control.Feedback
                        type="invalid"
                        className="d-block"
                      >
                        {touched.new_password && errors.new_password}
                      </BootstrapForm.Control.Feedback>
                    </BootstrapForm.Group>

                    {/* Confirm New Password */}
                    <BootstrapForm.Group
                      className="mb-4"
                      controlId="confirm_password"
                    >
                      <InputGroup>
                        <BootstrapForm.Control
                          style={{ fontFamily: "body" }}
                          type={showConfirmNewPassword ? "text" : "password"}
                          name="confirm_password"
                          placeholder="Confirm New Password"
                          value={values.confirm_password}
                          onChange={handleChange}
                          className="py-2 "
                          isInvalid={
                            touched.confirm_password &&
                            !!errors.confirm_password
                          }
                        />
                        <InputGroup.Text
                          onClick={toggleConfirmPasswordVisibility}
                          style={{
                            cursor: "pointer",
                            backgroundColor: "white",
                          }}
                        >
                          <FontAwesomeIcon
                            icon={
                              showConfirmNewPassword ? faEyeSlash : faEyeRegular
                            }
                            style={{ color: customStyles.primaryColor }}
                          />
                        </InputGroup.Text>
                      </InputGroup>
                      <BootstrapForm.Control.Feedback
                        type="invalid"
                        className="d-block"
                      >
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
                  </FormikForm>
                )}
              </Formik>
              {/* END FORMIK WRAPPER  */}

              <div className="text-center mt-3">
                <Link
                  to="/login"
                  className="small text-decoration-none"
                  style={{
                    color: customStyles.primaryColor,
                    fontFamily: "body",
                  }}
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
          fontFamily: "body",
        }}
      >
        <div className="d-flex justify-content-between align-items-center container">
          <div className="footer-copyright">
            &copy; 2025 {customStyles.logoText}. All rights reserved.
          </div>
          <div className="d-flex align-items-center">
            <Link
              className="text-muted text-decoration-none me-3"
              style={{ fontFamily: "body" }}
              role="button"
              to="/privacy-policy"
            >
              Privacy Policy
            </Link>
            <a
              href="terms"
              className="text-muted text-decoration-none me-3"
              style={{ fontFamily: "body" }}
            >
              Terms of Service
            </a>
            <a
              href="contact-us"
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

export default ChangePassword;
