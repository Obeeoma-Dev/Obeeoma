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

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { loginUser, clearError } from "../../store/slices/authSlice";

import { LoginSuccessPayload } from "../../types/auth"; //not used
import { useNavigate, Link } from "react-router-dom";
import { loginValidationSchema } from "./../../validation/authValidation";

import { Formik } from "formik";

import { Container, Card, Form, Button, Alert, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../assets/Images/obeeomalogoicon4.png";

type UserRole = "employer" | "systemadmin" | "employee";
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
  const [role, setRole] = useState<string>("employer");

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

      const roleFromPayload = (resultAction as any)?.user?.role;

    //  const userRole = roleFromPayload || user?.role || "employer"; // Fallback to 'employer'
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
    <div className="min-vh-100 d-flex flex-column justify-content-between bg-light">
      <header className="d-flex justify-content-between align-items-center p-3 px-4 border-bottom bg-white">
        <div className="d-flex align-items-center">
          <img src={logo} alt="Obeeoma Logo" width="35" className="me-2" />
          <div>
            <h5 className="m-0 text-success fw-semibold">Obeeoma</h5>
            <small className="text-muted">A Happy Heart</small>
          </div>
        </div>
      </header>
      <Container className="d-flex justify-content-center align-items-center flex-grow-1">
        <Card
          className="shadow-sm border-0 p-4"
          style={{ maxWidth: "480px", width: "100%" }} >
          <Card.Body>
            <h3 className="text-center mb-2 fw-semibold text-dark">
              Sign in to your account
            </h3>
            <p className="text-center text-muted mb-4">
              Welcome back to Obeeoma
            </p>

            {error && (
              <Alert
                variant="danger"
                onClose={() => dispatch(clearError())}
                dismissible >
                {error}
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
                      type="password" name="password"
                      value={values.password} onChange={handleChange}
                      placeholder="Password" className="py-2 border-success border-opacity-25"
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
                      className="text-success text-decoration-none small"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <Form.Check
                    type="checkbox"
                    label="Remember me"
                    className="mb-3 text-muted" />

                  <Button 
                    variant="success" type="submit" className="w-100 mb-3 py-2 fw-semibold" disabled={isLoading}>
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

                  <div className="text-center">
                    <span className="text-muted">Don’t have an account? </span>
                    <Link
                      className="btn btn-outline-light btn-lg"
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

      <footer className="text-center text-muted py-3 small border-top">
        © 2025 Obeeoma. All rights reserved. &nbsp;
        <Link
          className="btn btn-outline-light btn-lg text-success"
          role="button"
          to="/system-admin"
        >
          Privacy Policy
        </Link>
        &nbsp;|&nbsp;
        <a href="#" className="text-decoration-none text-success">
          Terms of Service
        </a>{" "}
        &nbsp;|&nbsp;
        <a href="#" className="text-decoration-none text-success">
          Contact Us
        </a>
      </footer>
    </div>
  );
};

export default LoginPage;
