import {
  jsx as _jsx,
  jsxs as _jsxs,
  Fragment as _Fragment,
} from "react/jsx-runtime";
import { useState, useEffect } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Alert,
  Spinner,
} from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../assets/Images/obeeomalogoicon4.png";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
const validationSchema = Yup.object({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);
  const [role, setRole] = useState("Employee");
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);
  const handleSubmit = (values) => {
    dispatch(
      loginUser({
        ...values,
        onSuccess: () => navigate("/employee-dashboard"),
      }),
    );
  };
  return _jsxs("div", {
    className: "min-vh-100 d-flex flex-column justify-content-between bg-light",
    children: [
      _jsx("header", {
        className:
          "d-flex justify-content-between align-items-center p-3 px-4 border-bottom bg-white",
        children: _jsxs("div", {
          className: "d-flex align-items-center",
          children: [
            _jsx("img", {
              src: logo,
              alt: "Obeeoma Logo",
              width: "35",
              className: "me-2",
            }),
            _jsxs("div", {
              children: [
                _jsx("h5", {
                  className: "m-0 text-success fw-semibold",
                  children: "Obeeoma",
                }),
                _jsx("small", {
                  className: "text-muted",
                  children: "A Happy Heart",
                }),
              ],
            }),
          ],
        }),
      }),
      _jsx(Container, {
        className:
          "d-flex justify-content-center align-items-center flex-grow-1",
        children: _jsx(Card, {
          className: "shadow-sm border-0 p-4",
          style: { maxWidth: "480px", width: "100%" },
          children: _jsxs(Card.Body, {
            children: [
              _jsx("h3", {
                className: "text-center mb-2 fw-semibold text-dark",
                children: "Sign in to your account",
              }),
              _jsx("p", {
                className: "text-center text-muted mb-4",
                children: "Welcome back to Obeeoma",
              }),
              error &&
                _jsx(Alert, {
                  variant: "danger",
                  onClose: () => dispatch(clearError()),
                  dismissible: true,
                  children: error,
                }),
              _jsx(Formik, {
                initialValues: { username: "", password: "" },
                validationSchema: validationSchema,
                onSubmit: handleSubmit,
                children: ({
                  handleChange,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                }) =>
                  _jsxs(Form, {
                    noValidate: true,
                    onSubmit: handleSubmit,
                    children: [
                      _jsxs(Form.Group, {
                        className: "mb-3",
                        controlId: "username",
                        children: [
                          _jsx(Form.Control, {
                            type: "text",
                            name: "username",
                            value: values.username,
                            onChange: handleChange,
                            placeholder: "Username",
                            className: "py-2 border-success border-opacity-25",
                            isInvalid: touched.username && !!errors.username,
                          }),
                          _jsx(Form.Control.Feedback, {
                            type: "invalid",
                            children: errors.username,
                          }),
                        ],
                      }),
                      _jsxs(Form.Group, {
                        className: "mb-3",
                        controlId: "password",
                        children: [
                          _jsx(Form.Control, {
                            type: "password",
                            name: "password",
                            value: values.password,
                            onChange: handleChange,
                            placeholder: "Password",
                            className: "py-2 border-success border-opacity-25",
                            isInvalid: touched.password && !!errors.password,
                          }),
                          _jsx(Form.Control.Feedback, {
                            type: "invalid",
                            children: errors.password,
                          }),
                        ],
                      }),
                      _jsxs("div", {
                        className:
                          "d-flex justify-content-between align-items-center mb-3",
                        children: [
                          _jsxs(ToggleButtonGroup, {
                            type: "radio",
                            name: "role",
                            value: role,
                            onChange: setRole,
                            children: [
                              _jsx(ToggleButton, {
                                id: "employee",
                                value: "Employee",
                                variant:
                                  role === "Employee"
                                    ? "success"
                                    : "outline-success",
                                className: "px-3 py-1",
                                children: "Employee",
                              }),
                              _jsx(ToggleButton, {
                                id: "employer",
                                value: "Employer",
                                variant:
                                  role === "Employer"
                                    ? "success"
                                    : "outline-success",
                                className: "px-3 py-1",
                                children: "Employer",
                              }),
                            ],
                          }),
                          _jsx("a", {
                            href: "/reset-password-signin",
                            className:
                              "text-success text-decoration-none small",
                            children: "Forgot password?",
                          }),
                        ],
                      }),
                      _jsx(Form.Check, {
                        type: "checkbox",
                        label: "Remember me",
                        className: "mb-3 text-muted",
                      }),
                      _jsx(Button, {
                        variant: "success",
                        type: "submit",
                        className: "w-100 mb-3 py-2 fw-semibold",
                        disabled: isLoading,
                        children: isLoading
                          ? _jsxs(_Fragment, {
                              children: [
                                _jsx(Spinner, {
                                  as: "span",
                                  animation: "border",
                                  size: "sm",
                                  role: "status",
                                  "aria-hidden": "true",
                                  className: "me-2",
                                }),
                                "Signing in...",
                              ],
                            })
                          : "Sign in",
                      }),
                      _jsxs("div", {
                        className: "text-center",
                        children: [
                          _jsx("span", {
                            className: "text-muted",
                            children: "Don\u2019t have an account? ",
                          }),
                          _jsx("a", {
                            href: "/signup",
                            className:
                              "text-success text-decoration-none fw-semibold",
                            children: "Create an account",
                          }),
                        ],
                      }),
                    ],
                  }),
              }),
            ],
          }),
        }),
      }),
      _jsxs("footer", {
        className: "text-center text-muted py-3 small border-top",
        children: [
          "\u00A9 2025 Obeeoma. All rights reserved. \u00A0",
          _jsx("a", {
            href: "#",
            className: "text-decoration-none text-success",
            children: "Privacy Policy",
          }),
          " ",
          "\u00A0|\u00A0",
          _jsx("a", {
            href: "#",
            className: "text-decoration-none text-success",
            children: "Terms of Service",
          }),
          " ",
          "\u00A0|\u00A0",
          _jsx("a", {
            href: "#",
            className: "text-decoration-none text-success",
            children: "Contact Us",
          }),
        ],
      }),
    ],
  });
};
export default LoginPage;
