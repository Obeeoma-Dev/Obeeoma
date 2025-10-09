import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Alert,
} from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "@/assets/Images/obeeomalogoicon4.png";
const LoginPage = () => {
  const [role, setRole] = useState("Employee");
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  // ✅ Yup validation schema
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
  // ✅ Formik form handler
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setServerError("");
      setSuccessMessage("");
      try {
        // Example API call:
        const res = await fetch("https://obeeoma.onrender.com/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...values, role }),
        });
        if (!res.ok) throw new Error("Login failed. Check credentials.");
        const data = await res.json();
        setSuccessMessage("Login successful! Redirecting...");
        resetForm();
        // redirect or navigate after success
        // navigate("/dashboard");
      } catch (error) {
        setServerError(error.message);
      } finally {
        setSubmitting(false);
      }
    },
  });
  return _jsxs("div", {
    className: "min-vh-100 d-flex flex-column justify-content-between bg-light",
    children: [
      _jsxs("header", {
        className:
          "d-flex justify-content-between align-items-center p-3 px-4 border-bottom bg-white",
        children: [
          _jsxs("div", {
            className: "d-flex align-items-center",
            children: [
              _jsx("img", {
                src: logo,
                alt: "ologo",
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
          _jsx(Button, {
            variant: "success",
            className: "rounded-pill px-4",
            children: _jsx("a", {
              href: "signup",
              className: "text-success text-decoration-none small",
              children: "Create Account",
            }),
          }),
        ],
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
              serverError &&
                _jsx(Alert, { variant: "danger", children: serverError }),
              successMessage &&
                _jsx(Alert, { variant: "success", children: successMessage }),
              _jsxs(Form, {
                noValidate: true,
                onSubmit: formik.handleSubmit,
                children: [
                  _jsxs(Form.Group, {
                    className: "mb-3",
                    controlId: "username",
                    children: [
                      _jsx(Form.Control, {
                        type: "text",
                        placeholder: "Username",
                        className: `py-2 border-success border-opacity-25 ${
                          formik.touched.username && formik.errors.username
                            ? "is-invalid"
                            : ""
                        }`,
                        ...formik.getFieldProps("username"),
                      }),
                      _jsx(Form.Control.Feedback, {
                        type: "invalid",
                        children: formik.errors.username,
                      }),
                    ],
                  }),
                  _jsxs(Form.Group, {
                    className: "mb-3",
                    controlId: "password",
                    children: [
                      _jsx(Form.Control, {
                        type: "password",
                        placeholder: "Password",
                        className: `py-2 border-success border-opacity-25 ${
                          formik.touched.password && formik.errors.password
                            ? "is-invalid"
                            : ""
                        }`,
                        ...formik.getFieldProps("password"),
                      }),
                      _jsx(Form.Control.Feedback, {
                        type: "invalid",
                        children: formik.errors.password,
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
                        href: "reset-password-signin",
                        className: "text-success text-decoration-none small",
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
                    disabled: formik.isSubmitting,
                    className: "w-100 mb-3 py-2 fw-semibold",
                    children: formik.isSubmitting ? "Signing in..." : "Sign in",
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
