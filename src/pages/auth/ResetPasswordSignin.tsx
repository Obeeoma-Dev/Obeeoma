<<<<<<< HEAD
// import React,{ useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../../store/store";
// import { forgotPassword, clearError } from "../../store/slices/authSlice";
// import { useNavigate } from "react-router-dom";
// import { forgotPasswordValidationSchema } from "./../../validation/authValidation";
// import { Formik } from "formik";
// import { Row, Col, Form, Button, Card, Alert,Spinner } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";

// const ResetPassword: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();
//   const { isLoading, error } = useSelector((state: RootState) => state.auth);

//     useEffect(() => {
//       dispatch(clearError());
//     }, [dispatch]);

//     const handleSubmit = (values: { email: string; }) => {
//       dispatch(
//         forgotPassword({
//           ...values,

//           onSuccess: () => navigate("/login"),
//         }),
//       );
//     };

//   return (
//     <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
//       <Card
//         className="shadow-lg border-0 overflow-hidden"
//         style={{ maxWidth: "900px", width: "100%" }}
//       >
//         <Row className="g-0">
//           {/* Left Side */}
//           <Col md={6} className="p-5 bg-white">
//             <h2 className="fw-semibold mb-2">Reset Password to Sign in</h2>
//             <p className="text-muted mb-4">Send code to email</p>

//             {error && (
//               <Alert
//                 variant="danger"
//                 onClose={() => dispatch(clearError())}
//                 dismissible
//               >
//                 {error}
//               </Alert>
//             )}

//               <Formik
//                 initialValues={{ email: "" }}
//                 validationSchema={forgotPasswordValidationSchema}
//                 onSubmit={handleSubmit}
//                 >

//               {({ handleChange, handleSubmit, values, errors, touched }) => (

//               <Form noValidate onSubmit={handleSubmit}>
//               <Form.Group className="mb-4" controlId="formEmail">
//                 <Form.Control
//                   type="email"
//                   placeholder="Email address"
//                   className="py-2"
//                 />
//               </Form.Group>
// {/*
//               <Button
//                 type="submit"
//                 variant="success"
//                 className="w-100 py-2 fw-semibold"
//               >
//                 Send code
//               </Button> */}
//                             <Button
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
//                         Sending...
//                       </>
//                     ) : (
//                       "send code"
//                     )}
//                   </Button>

//             <p className="text-center text-muted mt-4">
//               Didn’t receive any code?{" "}
//               {/* <Button
//                 variant="link"
//                 className="p-0 text-success text-decoration-none"
//               >
//                 Send code again
//               </Button> */}

//             </p>
//               </Form>
//               )}
//             </Formik>
//           </Col>

//           {/* Right Side */}
//           <Col
//             md={6}
//             className="p-5 text-dark d-flex flex-column justify-content-center bg-success bg-opacity-10"
//           >
//             <h3 className="fw-semibold mb-4">Reset & Continue</h3>
//             <p className="text-muted mb-3">
//               Sign in to access your personalized mental health dashboard,
//               connect with your care team, and continue your wellness journey.
//             </p>

//             <ul className="list-unstyled text-secondary mb-0">
//               <li className="mb-2">✔ Access your care plan</li>
//               <li className="mb-2">✔ Trigger crisis hotlines</li>
//               <li>✔ Get easy assessment through Sana</li>
//             </ul>
//           </Col>
//         </Row>
//       </Card>
//     </div>
//   );
// };

// export default ResetPassword;
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { forgotPassword, clearError } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { forgotPasswordValidationSchema } from "./../../validation/authValidation";
import { Formik } from "formik";
import { Row, Col, Form, Button, Card, Alert, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// The `: React.FC` defines this as a Functional Component in TypeScript.
const ResetPasswordSignin: React.FC = () => {
  // `useDispatch` is typed with `AppDispatch` for type-safe actions.
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // The state from `useSelector` is correctly typed using `RootState`.
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  // The `values` parameter is explicitly typed.
  const handleSubmit = (values: { email: string }) => {
    dispatch(
      forgotPassword({
        ...values,
        onSuccess: () => navigate("/reset-password"),
      })
    );
  };

=======
import React from "react";
import { Row, Col, Form, Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ResetPassword: React.FC = () => {
>>>>>>> parent of b2caf4e (Connection of Forgot password to backend)
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <Card
        className="shadow-lg border-0 overflow-hidden"
        style={{ maxWidth: "900px", width: "100%" }}
      >
        <Row className="g-0">
          {/* Left Side */}
          <Col md={6} className="p-5 bg-white">
            <h2 className="fw-semibold mb-2">Reset Password to Sign in</h2>
            <p className="text-muted mb-4">Send code to email</p>

<<<<<<< HEAD
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
              initialValues={{ email: "" }}
              validationSchema={forgotPasswordValidationSchema}
              onSubmit={handleSubmit}
            >
              {/* Formik automatically infers the types for these props */}
              {({ handleChange, handleSubmit, values, errors, touched }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Form.Group className="mb-4" controlId="formEmail">
                    <Form.Control
                      type="email"
                      placeholder="Email address"
                      className="py-2"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      isInvalid={touched.email && !!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Button
                    variant="success"
                    type="submit"
                    className="w-100 mb-3 py-2 fw-semibold"
                    disabled={isLoading}
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
                        Sending...
                      </>
                    ) : (
                      "Send Code"
                    )}
                  </Button>
                </Form>
              )}
            </Formik>
=======
            <Form>
              <Form.Group className="mb-4" controlId="formEmail">
                <Form.Control
                  type="email"
                  placeholder="Email address"
                  className="py-2"
                />
              </Form.Group>

              <Button
                type="submit"
                variant="success"
                className="w-100 py-2 fw-semibold"
              >
                Send code
              </Button>
            </Form>
>>>>>>> parent of b2caf4e (Connection of Forgot password to backend)

            <p className="text-center text-muted mt-4">
              Didn’t receive any code?{" "}
            </p>
          </Col>

          {/* Right Side */}
          <Col
            md={6}
            className="p-5 text-dark d-flex flex-column justify-content-center bg-success bg-opacity-10"
          >
            <h3 className="fw-semibold mb-4">Reset & Continue</h3>
            <p className="text-muted mb-3">
              Sign in to access your personalized mental health dashboard,
              connect with your care team, and continue your wellness journey.
            </p>
            <ul className="list-unstyled text-secondary mb-0">
              <li className="mb-2">✔ Access your care plan</li>
              <li className="mb-2">✔ Trigger crisis hotlines</li>
              <li>✔ Get easy assessment through Sana</li>
            </ul>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default ResetPasswordSignin;
