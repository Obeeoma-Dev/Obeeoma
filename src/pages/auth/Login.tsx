import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { loginUser, clearError } from "../../store/slices/authSlice";

import { useNavigate, Link } from "react-router-dom";
import { loginValidationSchema } from "./../../validation/authValidation";

import { Formik } from "formik";

import {
  Card,
  Form,
  Button,
  Alert,
  Spinner,
  InputGroup,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faEye as faEyeRegular } from "@fortawesome/free-regular-svg-icons";
import logo from "./../../assets/Images/obeeomalogoword1.png";

const customStyles = {
  primaryColor: "#22C55E",
  logoText: "Obeeoma",
};

type DashboardPath =
  | "/system-admin"
  | "/employer-dashboard"
  | "/employee-dashboard";

const FOOTER_HEIGHT_PADDING = "80px";

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading, error, user } = useSelector(
    (state: RootState) => state.auth,
  );
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const getDashboardRoute = (role: string): DashboardPath => {
    const normalizedRole = role?.toLowerCase().trim();

    switch (normalizedRole) {
      case "systemadmin":
        return "/system-admin";
      case "employer":
        return "/employer-dashboard";
      case "employee":
        return "/employee-dashboard";
      default:
        console.warn(
          `Unrecognized role: ${role}. Falling back to /employer-dashboard.`,
        );
        return "/employer-dashboard";
    }
  };

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      const resultAction = await dispatch(
        loginUser({ email: values.email, password: values.password }),
      ).unwrap();

      if (resultAction.mfa_required && resultAction.temp_token) {
        navigate("/mfa-setup", { replace: false });
        return;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const userRole = (resultAction as any)?.role || user?.role;
      console.log("Final Role Determined:", userRole);

      const destinationPath: DashboardPath = getDashboardRoute(userRole);
      navigate(destinationPath, { replace: true });
    } catch (err) {
      console.error("Login failed (handled by Redux error state):", err);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#f5f5f5",
        height: "100vh",
        maxWidth: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        paddingBottom: FOOTER_HEIGHT_PADDING,
      }}
    >
      <Card
        className="shadow-sm-border-0 p-4"
        style={{
          maxWidth: "600px",
          width: "100%",
          maxHeight: `calc(100vh - 40px - ${FOOTER_HEIGHT_PADDING})`,
          overflow: "auto",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Card.Body>
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
            className="text-center mb-2 fw-semibold text-dark"
            style={{ fontFamily: "heading" }}
          >
            Welcome to Obeeoma
          </h3>
          <p></p>
          {error && (
            <Alert
              variant="danger"
              onClose={() => dispatch(clearError())}
              dismissible
            >
              {error}
            </Alert>
          )}

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="validationFormikEmail">
                  <Form.Control
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={touched.email && !!errors.email}
                    className="py-2"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  className="mb-4"
                  controlId="validationFormikPassword"
                >
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      isInvalid={touched.password && !!errors.password}
                      className="py-2"
                    />
                    {/* CHANGED: Added data-testid="password-toggle" below */}
                    <InputGroup.Text
                      onClick={togglePasswordVisibility}
                      data-testid="password-toggle"
                      style={{ cursor: "pointer", backgroundColor: "white" }}
                    >
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEyeRegular}
                        style={{ color: customStyles.primaryColor }}
                      />
                    </InputGroup.Text>
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

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
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </Form>
            )}
          </Formik>

          <div className="text-center mt-3">
            <Link
              to="/reset-password-signin"
              className="small text-decoration-none"
              style={{ color: customStyles.primaryColor, fontFamily: "body" }}
            >
              Forgot Password?
            </Link>
          </div>

          <div className="text-center mt-3">
            <span className="small text-muted" style={{ fontFamily: "body" }}>
              Don't have an account?{" "}
            </span>
            <Link
              to="/signup"
              className="small text-decoration-none"
              style={{
                color: customStyles.primaryColor,
                fontFamily: "body",
                fontWeight: "600",
              }}
            >
              Create Account
            </Link>
          </div>
        </Card.Body>
      </Card>

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

export default LoginPage;
