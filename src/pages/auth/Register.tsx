import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form as FormikForm, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { registerUser, clearAuthStatus } from "../../store/slices/authSlice";
import { registerValidationSchema } from "./../../validation/authValidation";
import {
  Container,
  Button,
  Form as BootstrapForm,
  Alert,
  Card,
  Spinner, 
  InputGroup
} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome" ;
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faEye as faEyeRegular } from '@fortawesome/free-regular-svg-icons';
import logo from "./../../assets/Images/green..png"; 

const customStyles = {
  // Use the clean hex code for styling
  primaryColor: "#3CB371", 
  lightPink: "#f8d7da",
  logoText: "Obeeoma",
};

// Define allowed roles
type Role = "employee" | "employer";

// Initial form values
type RegisterFormValues = {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
};

const Register: React.FC = () => {
  const [role] = useState<Role>("employer");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { error, isLoading } = useSelector((state: RootState) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  
    // function for the eye visibility toggle
  const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(prev => !prev);
  };


  const initialValues: RegisterFormValues = {
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  };

   useEffect(() => {
    dispatch(clearAuthStatus()); 
  }, [dispatch]);


  const handleSubmit = async(values: RegisterFormValues) => {
    const credentials = {
      ...values,
      role,
    };
    
try {
await dispatch(registerUser(credentials)).unwrap(); 
 navigate("/login", { replace: true }); 
} catch (err) {
  console.error("Registration failed:", err);
}
  };

  return (
    
    <div
      style={{
        backgroundColor: "#f5f5f5",
        height: "100vh",
        position: "relative", 
      }}
      className="d-flex flex-column"
    >
      <Container className="flex-grow-1 d-flex justify-content-center align-items-center py-5">
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
              {/* Logo and Company Name (Centered, Stacked) */}
              <div className="d-flex flex-column align-items-center justify-content-center mb-4" style={{fontFamily: "heading"}}>
                <img
                  src={logo}
                  alt="Obeeoma Logo"
                  width="100"
                  className="mb-1"
                />
              </div>

              {/* Main Titles */}
              <h3 className="text-center mb-2 fw-semibold text-dark" style={{fontFamily:"heading",}}>
                Create your Organization's account
              </h3>
              <p className="text-center text-muted mb-4" style={{fontFamily:"heading"}}>
                Join our community of mental health professionals and patients
              </p>

              {/* Error Alert */}
              {error && (
                <Alert variant="danger" dismissible>
                  {error}
                </Alert>
              )}

              {/* Formik/Form structure */}
              <Formik
                validationSchema={registerValidationSchema}
                initialValues={initialValues}
                onSubmit={handleSubmit}
              >
                {({ handleSubmit, handleChange, values, touched, errors }) => (
                  <FormikForm noValidate onSubmit={handleSubmit}>
                    {/* Email Field (Placeholder style) */}
                    <BootstrapForm.Group className="mb-3">
                      <BootstrapForm.Control
                        type="email"
                        name="email"
                        placeholder="Email address"
                        value={values.email}
                        onChange={handleChange}
                        className="py-2" // Adding vertical padding
                        isInvalid={!!touched.email && !!errors.email}
                      />
                      <BootstrapForm.Control.Feedback type="invalid">
                        <ErrorMessage name="email" />
                      </BootstrapForm.Control.Feedback>
                    </BootstrapForm.Group>

                    {/* User Name */}
                    <BootstrapForm.Group className="mb-3">
                      <BootstrapForm.Control
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={values.username}
                        onChange={handleChange}
                        className="py-2"
                        isInvalid={!!touched.username && !!errors.username}
                      />
                      <BootstrapForm.Control.Feedback type="invalid">
                        <ErrorMessage name="username" />
                      </BootstrapForm.Control.Feedback>
                    </BootstrapForm.Group>

                    <BootstrapForm.Group className="mb-3" controlId="password">
                    <InputGroup>
                    <BootstrapForm.Control
                      style={{fontFamily: "body"}}
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      placeholder="Password"
                      className="py-2 border-success border-opacity-25"
                      isInvalid={touched.password && !!errors.password}
                    />
                    <InputGroup.Text 
                      onClick={togglePasswordVisibility}
                       style={{ 
                        cursor: "pointer", 
                        backgroundColor: "white" 
                      }}>
                      <FontAwesomeIcon 
                        icon={showPassword ? faEyeSlash : faEyeRegular} 
                        style={{ color: customStyles.primaryColor }}
                      />
                    </InputGroup.Text>
                   
                    </InputGroup> 
                    {/* {(touched.password && !!errors.password) && (
                    <div className="invalid-feedback d-block">
                        {errors.password}
                   </div>
                    )} */}
                    <ErrorMessage
                        name="password"
                        component="div"
                        className="invalid-feedback d-block"
                      />
                  </BootstrapForm.Group>

                    {/* Confirm Password Field  */}
                    <BootstrapForm.Group className="mb-4" controlId="confirm_password" >
                     <InputGroup>
                      <BootstrapForm.Control
                       style={{fontFamily:"body"}}
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirm_password"
                        placeholder="Confirm Password"
                        value={values.confirm_password}
                        onChange={handleChange}
                        className="py-2 "
                        isInvalid={
                          !!touched.confirm_password &&
                          !!errors.confirm_password
                        }
                      />
                      <InputGroup.Text 
                      onClick={toggleConfirmPasswordVisibility}
                       style={{ 
                        cursor: "pointer", 
                        backgroundColor: "white" 
                      }}>
                      <FontAwesomeIcon 
                        icon={showConfirmPassword ? faEyeSlash : faEyeRegular} 
                        style={{ color: customStyles.primaryColor }}
                      />
                     </InputGroup.Text>
                    </InputGroup>
                     {/* {!!touched.confirm_password && !!errors.confirm_password && (
                       <div className="invalid-feedback d-block">
                        <ErrorMessage name="confirm_password" /> 
                       </div>
                       )} */}
                       <ErrorMessage
                        name="confirm_password"
                        component="div"
                        className="invalid-feedback d-block"
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
                            style={{fontFamily:"heading"}}
                          />
                          Signing Up...
                        </>
                      ) : (
                        "Sign up"
                      )}
                    </Button>

                    <div className="text-center mt-3">
                      <span className="text-center" style={{fontFamily:"heading"}}>
                        Already have an account?{" "}
                      </span>

                      <Link
                        className="text-decoration-none"
                        style={{
                          // Uses the custom primary color for the link
                          color: customStyles.primaryColor,
                          fontWeight: "500",
                          fontFamily: "body"
                        }}
                        role="button"
                        to="/login"
                      >
                        sign in
                      </Link>
                    </div>
                  </FormikForm>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </div>
      </Container>

      {/* Footer*/}
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

export default Register;
