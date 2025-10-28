// // import React, { useState, useEffect } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { AppDispatch, RootState } from "../../store/store";
// // import { loginUser, clearError } from "../../store/slices/authSlice";

// // import { LoginSuccessPayload } from "../../types/auth"; //not used
// // import { useNavigate, Link } from "react-router-dom";
// // import { loginValidationSchema } from "./../../validation/authValidation";

// // import { Formik } from "formik";

// // import { Container, Card, Form, Button, Alert, Spinner } from "react-bootstrap";
// // import "bootstrap/dist/css/bootstrap.min.css";
// // import logo from "../../assets/Images/obeeomalogoicon4.png";

// // const customStyles = {
// //   primaryColor: "#3CB371  100%",
// //   // /lightPink: "#f8d7da",
// //   logoText: "Obeeoma",
// // };

// // type UserRole = "employer" | "systemadmin" | "employee";
// // type DashboardPath =
// //   | "/system-admin"
// //   | "/employer-dashboard"
// //   | "/employee-dashboard";

// // const LoginPage = () => {
// //   const dispatch = useDispatch<AppDispatch>();
// //   const navigate = useNavigate();
// //   const { isLoading, error, user } = useSelector(
// //     (state: RootState) => state.auth
// //   );
// //   const [role, setRole] = useState<string>("employer");

// //   useEffect(() => {
// //     dispatch(clearError());
// //   }, [dispatch]);

// //   const getDashboardRoute = (role: string): DashboardPath => {
// //     const normalizedRole = role.toLowerCase().trim();

// //     switch (normalizedRole) {
// //       case "systemadmin":
// //         return "/system-admin";
// //       case "employer":
// //         return "/employer-dashboard";

// //       case "employee":
// //         return "/employee-dashboard";

// //       default:
// //         console.warn(
// //           `Unrecognized role: ${role}. Falling back to /employer-dashboard.`
// //         );
// //         return "/employer-dashboard";
// //     }
// //   };

// //   const handleSubmit = async (values: {
// //     username: string;
// //     password: string;
// //   }) => {
// //     try {
// //       const resultAction = await dispatch(
// //         loginUser({ username: values.username, password: values.password })
// //       ).unwrap();

// //       const roleFromPayload = (resultAction as any)?.user?.role;

// //       //  const userRole = roleFromPayload || user?.role || "employer"; // Fallback to 'employer'
// //       const userRole = (resultAction as any)?.role || user?.role;
// //       console.log("Final Role Determined:", userRole);

// //       const destinationPath: DashboardPath = getDashboardRoute(userRole);

// //       navigate(destinationPath, { replace: true });
// //     } catch (err) {
// //       // This block catches any error thrown by the 'loginUser' thunk (e.g., 401 Unauthorized, network error).
// //       console.error("Login failed (handled by Redux error state):", err);
// //     }
// //   };

// //   return (
// //     <div
// //       style={{
// //         backgroundColor: "#f5f5f5",
// //         minHeight: "100vh",
// //         paddingTop: "50px",
// //       }}
// //       className="min-vh-100 d-flex flex-column justify-content-center  align-items-start"
// //     >
// //       <Container className="d-flex justify-content-center align-items- start">
// //         <Card
// //           className="shadow-sm border-0 p-4"
// //           style={{
// //             maxWidth: "450px",
// //             width: "100%",
// //             border: "none",
// //             borderRadius: "8px",
// //             boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1) ",
// //           }}
// //         >
// //           <div className="d-flex justify-content-center align-items-center p-3 px-4 border-bottom bg-white">
// //             <div className=" d-flex flex-column align-items-center">
// //               <img src={logo} alt="Obeeoma Logo" width="50" className="mb-1" />
// //               <p className="m-0 text-center text-muted">
// //                 <small
// //                   style={{
// //                     color: customStyles.primaryColor,
// //                     fontSize: "10px",
// //                     fontWeight: "bold",
// //                   }}
// //                 >
// //                   Obeeoma
// //                 </small>
// //                 {/* <small className="text-muted">A Happy Heart</small> */}
// //               </p>
// //             </div>
// //           </div>
// //           <Card.Body>
// //             <h3 className="text-center mb-2 fw-semibold text-dark">
// //               Sign in to your account
// //             </h3>
// //             <p className="text-center text-muted mb-4">
// //               Welcome back to Obeeoma
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

// //             {/* Successful Login Feedback (for demo) */}
// //             {user && (
// //               <Alert variant="success">
// //                 Welcome, {user.username}! Redirecting...
// //               </Alert>
// //             )}

// //             <Formik
// //               initialValues={{ username: "", password: "" }}
// //               validationSchema={loginValidationSchema}
// //               onSubmit={handleSubmit}
// //             >
// //               {({
// //                 handleChange,
// //                 handleSubmit: formikSubmit,
// //                 values,
// //                 errors,
// //                 touched,
// //               }) => (
// //                 <Form noValidate onSubmit={formikSubmit}>
// //                   {/* Form fields... */}
// //                   <Form.Group className="mb-3" controlId="username">
// //                     <Form.Control
// //                       type="text"
// //                       name="username"
// //                       value={values.username}
// //                       onChange={handleChange}
// //                       placeholder="Username"
// //                       className="py-2 border-success border-opacity-25"
// //                       isInvalid={touched.username && !!errors.username}
// //                     />
// //                     <Form.Control.Feedback type="invalid">
// //                       {errors.username}
// //                     </Form.Control.Feedback>
// //                   </Form.Group>

// //                   <Form.Group className="mb-3" controlId="password">
// //                     <Form.Control
// //                       type="password"
// //                       name="password"
// //                       value={values.password}
// //                       onChange={handleChange}
// //                       placeholder="Password"
// //                       className="py-2 border-success border-opacity-25"
// //                       isInvalid={touched.password && !!errors.password}
// //                     />
// //                     <Form.Control.Feedback type="invalid">
// //                       {errors.password}
// //                     </Form.Control.Feedback>
// //                   </Form.Group>

// //                   {/* Forgot Password */}
// //                   <div className="d-flex justify-content-between align-items-center mb-3">
// //                     <Link
// //                       to="/reset-password-signin"
// //                       className="text-success text-decoration-none small"
// //                     >
// //                       Forgot password?
// //                     </Link>
// //                   </div>

// //                   <Form.Check
// //                     type="checkbox"
// //                     label="Remember me"
// //                     className="mb-3 text-muted"
// //                   />

// //                   <Button
// //                     type="submit"
// //                     className="w-100 mb-3 py-2 fw-semibold"
// //                     disabled={isLoading}
// //                     style={{
// //                       backgroundColor: customStyles.primaryColor,
// //                       borderColor: customStyles.primaryColor,
// //                       color: "white", // Ensure text is white for contrast
// //                       boxShadow: "none", // Remove the blue focus ring
// //                     }}
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
// //                         Signing in...
// //                       </>
// //                     ) : (
// //                       "Sign in"
// //                     )}
// //                   </Button>

// //                   <div className="text-center mt-4">
// //                     <span className="text-center mt-">
// //                       Don’t have an account?{" "}
// //                     </span>

// //                     <Link
// //                       className="text-success text-decoration-none"
// //                       style={{
// //                         color: customStyles.primaryColor,
// //                         textDecoration: "none",
// //                         marginLeft: "5px",
// //                         fontWeight: "500",
// //                       }}
// //                       role="button"
// //                       to="/signup"
// //                     >
// //                       Create an account
// //                     </Link>
// //                   </div>
// //                 </Form>
// //               )}
// //             </Formik>
// //           </Card.Body>
// //         </Card>
// //       </Container>
// //       <div></div>
// //       <footer
// //         className="text-center text-muted py-3 small border-top"
// //         style={{
// //           position: "absolute",
// //           bottom: "20px",
// //           width: "100%",
// //           fontSize: "0.8rem",
// //         }}
// //       >
// //         &copy; 2025 {customStyles.logoText}. All rights reserved. &nbsp;
// //         <Link
// //           className="mx-3"
// //           style={{ textDecoration: "none" }}
// //           role="button"
// //           to="/system-admin"
// //         >
// //           Privacy Policy
// //         </Link>
// //         &nbsp;|&nbsp;
// //         <a href="#" className="text-muted" style={{ textDecoration: "none" }}>
// //           Terms of Service
// //         </a>
// //         <span className="mx-3">|</span>
// //         <a href="#" className="text-muted" style={{ textDecoration: "none" }}>
// //           Contact Us
// //         </a>
// //       </footer>
// //     </div>
// //   );
// // };

// // export default LoginPage;

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../../store/store";
// import { loginUser, clearError } from "../../store/slices/authSlice";

// import { LoginSuccessPayload } from "../../types/auth"; //not used
// import { useNavigate, Link } from "react-router-dom";
// import { loginValidationSchema } from "./../../validation/authValidation";

// import { Formik } from "formik";

// import { Container, Card, Form, Button, Alert, Spinner } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import logo from "../../assets/Images/obeeomalogoicon4.png";

// const customStyles = {
//   primaryColor: "#3CB371", // Corrected: Removed extra " 100%"
//   // /lightPink: "#f8d7da",
//   logoText: "Obeeoma",
// };

// type UserRole = "employer" | "systemadmin" | "employee";
// type DashboardPath =
//   | "/system-admin"
//   | "/employer-dashboard"
//   | "/employee-dashboard";

// const LoginPage = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();
//   const { isLoading, error, user } = useSelector(
//     (state: RootState) => state.auth
//   );
//   const [role, setRole] = useState<string>("employer");

//   useEffect(() => {
//     dispatch(clearError());
//   }, [dispatch]);

//   const getDashboardRoute = (role: string): DashboardPath => {
//     const normalizedRole = role.toLowerCase().trim();

//     switch (normalizedRole) {
//       case "systemadmin":
//         return "/system-admin";
//       case "employer":
//         return "/employer-dashboard";
//       case "employee":
//         return "/employee-dashboard";
//       default:
//         console.warn(
//           `Unrecognized role: ${role}. Falling back to /employer-dashboard.`
//         );
//         return "/employer-dashboard";
//     }
//   };

//   const handleSubmit = async (values: {
//     username: string;
//     password: string;
//   }) => {
//     try {
//       const resultAction = await dispatch(
//         loginUser({ username: values.username, password: values.password })
//       ).unwrap();

//       const roleFromPayload = (resultAction as any)?.user?.role;

//       //  const userRole = roleFromPayload || user?.role || "employer"; // Fallback to 'employer'
//       const userRole = (resultAction as any)?.role || user?.role;
//       console.log("Final Role Determined:", userRole);

//       const destinationPath: DashboardPath = getDashboardRoute(userRole);

//       navigate(destinationPath, { replace: true });
//     } catch (err) {
//       // This block catches any error thrown by the 'loginUser' thunk (e.g., 401 Unauthorized, network error).
//       console.error("Login failed (handled by Redux error state):", err);
//     }
//   };

//   return (
//     <div
//       style={{
//         backgroundColor: "#f5f5f5",
//         minHeight: "100vh",
//         paddingTop: "50px",
//       }}
//       className="min-vh-100 d-flex flex-column justify-content-center  align-items-start"
//     >
//       <Container className="d-flex justify-content-center align-items- start">
//         <Card
//           className="shadow-sm border-0 p-4"
//           style={{
//             maxWidth: "450px",
//             width: "100%",
//             border: "none",
//             borderRadius: "8px",
//             boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1) ",
//           }}
//         >
//           <div className="d-flex justify-content-center align-items-center p-3 px-4 border-bottom bg-white">
//             <div className=" d-flex flex-column align-items-center">
//               <img src={logo} alt="Obeeoma Logo" width="50" className="mb-1" />
//               <p className="m-0 text-center text-muted">
//                 <small
//                   style={{
//                     color: customStyles.primaryColor, // This now uses the corrected color
//                     fontSize: "10px",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   Obeeoma
//                 </small>
//                 {/* <small className="text-muted">A Happy Heart</small> */}
//               </p>
//             </div>
//           </div>
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

//             {/* Successful Login Feedback (for demo) */}
//             {user && (
//               <Alert variant="success">
//                 Welcome, {user.username}! Redirecting...
//               </Alert>
//             )}

//             <Formik
//               initialValues={{ username: "", password: "" }}
//               validationSchema={loginValidationSchema}
//               onSubmit={handleSubmit}
//             >
//               {({
//                 handleChange,
//                 handleSubmit: formikSubmit,
//                 values,
//                 errors,
//                 touched,
//               }) => (
//                 <Form noValidate onSubmit={formikSubmit}>
//                   {/* Form fields... */}
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

//                   {/* Forgot Password */}
//                   <div className="d-flex justify-content-between align-items-center mb-3">
//                     <Link
//                       to="/reset-password-signin"
//                       className="text-success text-decoration-none small"
//                     >
//                       Forgot password?
//                     </Link>
//                   </div>

//                   <Form.Check
//                     type="checkbox"
//                     label="Remember me"
//                     className="mb-3 text-muted"
//                   />

//                   <Button
//                     type="submit"
//                     className="w-100 mb-3 py-2 fw-semibold"
//                     disabled={isLoading}
//                     style={{
//                       backgroundColor: customStyles.primaryColor, // This uses the color
//                       borderColor: customStyles.primaryColor,
//                       color: "white", // Ensure text is white for contrast
//                       boxShadow: "none", // Remove the blue focus ring
//                     }}
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

//                   <div className="text-center mt-4">
//                     <span className="text-center mt-">
//                       Don’t have an account?{" "}
//                     </span>

//                     <Link
//                       className="text-success text-decoration-none"
//                       style={{
//                         color: customStyles.primaryColor,
//                         textDecoration: "none",
//                         marginLeft: "5px",
//                         fontWeight: "500",
//                       }}
//                       role="button"
//                       to="/signup"
//                     >
//                       Create an account
//                     </Link>
//                   </div>
//                 </Form>
//               )}
//             </Formik>
//           </Card.Body>
//         </Card>
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

// export default LoginPage;
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { loginUser, clearError } from "../../store/slices/authSlice";

// import { LoginSuccessPayload } from "../../types/auth"; //not used
import { useNavigate, Link } from "react-router-dom";
import { loginValidationSchema } from "./../../validation/authValidation";

import { Formik } from "formik";

import { Container, Card, Form, Button, Alert, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../assets/Images/obeeomalogoicon4.png";

const customStyles = {
  primaryColor: "#3CB371", 
  // /lightPink: "#f8d7da",
  logoText: "Obeeoma",
};

// type UserRole = "employer" | "systemadmin" | "employee";
type DashboardPath =
  | "/system-admin"
  | "/employer-dashboard"
  | "/employee-dashboard";

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading, error, user } = useSelector(
    (state: RootState) => state.auth
  );
  // const [role, setRole] = useState<string>("employer");

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const getDashboardRoute = (role: string): DashboardPath => {
    const normalizedRole = role.toLowerCase().trim();

    switch (normalizedRole) {
      case "systemadmin":
        return "/system-admin";
      case "employer":
        return "/employer-dashboard";

      case "employee":
        return "/employee-dashboard";

      default:
        console.warn(
          `Unrecognized role: ${role}. Falling back to /employer-dashboard.`
        );
        return "/employer-dashboard";
    }
  };

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      const resultAction = await dispatch(
        loginUser({ username: values.username, password: values.password })
      ).unwrap();

      // const roleFromPayload = (resultAction as any)?.user?.role;

      //  const userRole = roleFromPayload || user?.role || "employer"; // Fallback to 'employer'
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const userRole = (resultAction as any)?.role || user?.role;
      console.log("Final Role Determined:", userRole);

      const destinationPath: DashboardPath = getDashboardRoute(userRole);

      navigate(destinationPath, { replace: true });
    } catch (err) {
      // This block catches any error thrown by the 'loginUser' thunk (e.g., 401 Unauthorized, network error).
      console.error("Login failed (handled by Redux error state):", err);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        paddingTop: "50px",
      }}
      className="min-vh-100 d-flex flex-column justify-content-center  align-items-start"
    >
      <Container className="d-flex justify-content-center align-items- start">
        <Card
          className="shadow-sm border-0 p-4"
          style={{
            maxWidth: "600px",
            width: "100%",
            border: "none",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1) ",
          }}
        >
          
          <Card.Body>
            <div className="d-flex flex-column align-items-center justify-content-center mb-4" style={{fontFamily: "heading"}}>
                <img
                  src={logo}
                  alt="Obeeoma Logo"
                  width="50"
                  className="mb-1"
                />
                <p className="m-0 text-center">
                  <small
                    style={{
                      // Uses the custom primary color for the logo text
                      color: customStyles.primaryColor, 
                      fontSize: "10px",
                      fontWeight: "500",
                      fontFamily: "heading"
                    }}
                  >
                    {customStyles.logoText}
                  </small>
                </p>
              </div>
            <h3 className="text-center mb-2 fw-semibold text-dark"
            style={{fontFamily:'heading'}}
            >
              Sign in to your account
            </h3>
            <p className="text-center text-muted mb-4"
            style={{fontFamily:'heading'}}
            >
              Welcome back to Obeeoma
            </p>

            {error && (
              <Alert
                variant="danger"
                onClose={() => dispatch(clearError())}
                dismissible
              >
                {error}
              </Alert>
            )}

            {/* Successful Login Feedback (for demo) */}
            {user && (
              <Alert variant="success" style={{fontFamily:"body"}}>
                Welcome, {user.username}! Redirecting...
              </Alert>
            )}

            <Formik
              initialValues={{ username: "", password: "" }}
              validationSchema={loginValidationSchema}
              onSubmit={handleSubmit}
            >
              {({
                handleChange,
                handleSubmit: formikSubmit,
                values,
                errors,
                touched,
              }) => (
                <Form noValidate onSubmit={formikSubmit}>
                  {/* Form fields... */}
                  <Form.Group className="mb-3" controlId="username">
                    <Form.Control
                      type="text"
                      style={{fontFamily: "body"}}
                      name="username"
                      value={values.username}
                      onChange={handleChange}
                      placeholder="Username"
                      className="py-2 border-success border-opacity-25"
                      isInvalid={touched.username && !!errors.username}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.username}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="password">
                    <Form.Control
                      style={{fontFamily: "body"}}
                      type="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      placeholder="Password"
                      className="py-2 border-success border-opacity-25"
                      isInvalid={touched.password && !!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Forgot Password */}
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <Link
                      to="/reset-password-signin"
                      className="small"
                      style={{ 
                        color: customStyles.primaryColor,
                        textDecoration: "none",
                        fontFamily: "body"
                      }}
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <Form.Check
                    type="checkbox"
                    label="Remember me"
                    className="mb-3 text-muted"
                  />

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
                        />
                        Signing in...
                      </>
                    ) : (
                      "Sign in"
                    )}
                  </Button>

                  <div className="text-center mt-4" style={{fontFamily:"body"}}>
                    <span className="text-center mt-">
                      Don’t have an account?{" "}
                    </span>

                    <Link
                      className="" // Removed text-success and text-decoration-none
                      style={{
                        color: customStyles.primaryColor,
                        textDecoration: "none",
                        marginLeft: "5px",
                        fontWeight: "500",
                        fontFamily: "body"
                      }}
                      role="button"
                      to="/signup"
                    >
                      Create an account
                    </Link>
                  </div>
                </Form>
              )}
            </Formik>
          </Card.Body>
        </Card>
      </Container>
      <div></div>
      <footer
        className="text-center text-muted py-3 small border-top"
        style={{
          bottom: "0px",
          width: "100%",
          fontSize: "0.8rem",
          fontFamily: "body",
          position: "fixed",
        }}
      >
        &copy; 2025 {customStyles.logoText}. All rights reserved. &nbsp;
        <Link
          className="mx-3"
          style={{ // <-- UPDATED
            textDecoration: "none",
            color: customStyles.primaryColor,
            fontFamily: "body"
          }}
          role="button"
          to="/system-admin"
        >
          Privacy Policy
        </Link>
        &nbsp;|&nbsp;
        <a
          href="#"
          style={{ // <-- UPDATED
            textDecoration: "none",
            color: customStyles.primaryColor,
            fontFamily: "body"
          }}
        >
          Terms of Service
        </a>
        <span className="mx-3">|</span>
        <a
          href="#"
          style={{ // <-- UPDATED
            textDecoration: "none",
            color: customStyles.primaryColor, 
            fontFamily: "body"
          }}
        >
          Contact Us
        </a>
      </footer>
    </div>
  );
};

export default LoginPage;
