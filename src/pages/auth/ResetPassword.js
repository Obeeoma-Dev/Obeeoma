import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Row, Col, Form, Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
const ResetPassword = () => {
  return _jsx("div", {
    className:
      "d-flex align-items-center justify-content-center min-vh-100 bg-light",
    children: _jsx(Card, {
      className: "shadow-lg border-0 overflow-hidden",
      style: { maxWidth: "900px", width: "100%" },
      children: _jsxs(Row, {
        className: "g-0",
        children: [
          _jsxs(Col, {
            md: 6,
            className: "p-5 bg-white",
            children: [
              _jsx("h2", {
                className: "fw-semibold mb-2",
                children: "Reset Your Password",
              }),
              _jsx("p", {
                className: "text-muted mb-4",
                children: "Enter the code and your new password",
              }),
              _jsxs(Form, {
                children: [
                  _jsx(Form.Group, {
                    className: "mb-3",
                    controlId: "formCode",
                    children: _jsx(Form.Control, {
                      type: "text",
                      placeholder: "Enter code",
                      className: "py-2",
                    }),
                  }),
                  _jsx(Form.Group, {
                    className: "mb-3",
                    controlId: "formNewPassword",
                    children: _jsx(Form.Control, {
                      type: "password",
                      placeholder: "New password",
                      className: "py-2",
                    }),
                  }),
                  _jsx(Form.Group, {
                    className: "mb-4",
                    controlId: "formConfirmPassword",
                    children: _jsx(Form.Control, {
                      type: "password",
                      placeholder: "Confirm new password",
                      className: "py-2",
                    }),
                  }),
                  _jsx(Button, {
                    type: "submit",
                    variant: "success",
                    className: "w-100 py-2 fw-semibold",
                    children: "Change Password",
                  }),
                ],
              }),
            ],
          }),
          _jsxs(Col, {
            md: 6,
            className:
              "p-5 text-dark d-flex flex-column justify-content-center bg-success bg-opacity-10",
            children: [
              _jsx("h3", {
                className: "fw-semibold mb-4",
                children: "Secure Your Account",
              }),
              _jsx("p", {
                className: "text-muted mb-3",
                children:
                  "Resetting your password ensures your account remains safe. Use a strong password that you haven\u2019t used before.",
              }),
              _jsxs("ul", {
                className: "list-unstyled text-secondary mb-0",
                children: [
                  _jsx("li", {
                    className: "mb-2",
                    children: "\u2714 Protect your sensitive information",
                  }),
                  _jsx("li", {
                    className: "mb-2",
                    children: "\u2714 Access your care plan securely",
                  }),
                  _jsx("li", {
                    children:
                      "\u2714 Continue your wellness journey with peace of mind",
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    }),
  });
};
export default ResetPassword;
