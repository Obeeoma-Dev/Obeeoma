import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import {
  Container,
  Card,
  Button,
  Nav,
  Navbar,
  ListGroup,
} from "react-bootstrap";
import { BsCheckCircleFill, BsBell, BsChatDots, BsGear } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";
const SubscriptionPage = () => {
  return _jsxs("div", {
    className: "d-flex min-vh-100 bg-light",
    children: [
      _jsxs("div", {
        className: "d-flex flex-column p-3 bg-white shadow-sm",
        style: { width: "250px" },
        children: [
          _jsxs("div", {
            className: "d-flex align-items-center mb-4",
            children: [
              _jsx("img", {
                src: "/logo192.png",
                alt: "Logo",
                width: "35",
                className: "me-2",
              }),
              _jsxs("div", {
                children: [
                  _jsx("h6", {
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
          _jsxs(Nav, {
            className: "flex-column",
            children: [
              _jsx(Nav.Link, {
                className: "text-dark mb-2",
                children: " Dashboard",
              }),
              _jsx(Nav.Link, {
                className: "text-dark mb-2",
                children: " AI Assistant",
              }),
              _jsx(Nav.Link, {
                className: "text-dark mb-2",
                children: " Resources",
              }),
              _jsx(Nav.Link, {
                className: "text-dark mb-2",
                children: " My Progress",
              }),
              _jsx(Nav.Link, {
                className: "text-dark mb-2",
                children: " My Programs",
              }),
              _jsx(Nav.Link, {
                className: "text-dark mb-2",
                children: " Rewards",
              }),
              _jsx(Nav.Link, {
                className:
                  "text-success bg-success bg-opacity-10 fw-semibold rounded px-3 py-2 mb-2",
                children: "Subscription",
              }),
            ],
          }),
          _jsx("div", {
            className: "mt-auto pt-3 border-top",
            children: _jsxs(Nav.Link, {
              className: "text-muted",
              children: [_jsx(BsGear, { className: "me-2" }), " Settings"],
            }),
          }),
        ],
      }),
      _jsxs("div", {
        className: "flex-grow-1",
        children: [
          _jsx(Navbar, {
            bg: "white",
            className: "shadow-sm px-4 py-2",
            children: _jsxs(Container, {
              fluid: true,
              children: [
                _jsx("div", {
                  className: "d-flex align-items-center w-50",
                  children: _jsx("input", {
                    type: "text",
                    placeholder: "Search resources, programs...",
                    className: "form-control border-0 bg-light",
                  }),
                }),
                _jsxs("div", {
                  className: "d-flex align-items-center",
                  children: [
                    _jsx(BsBell, { className: "me-3 text-secondary" }),
                    _jsx(BsChatDots, { className: "me-3 text-secondary" }),
                    _jsxs("div", {
                      className: "d-flex align-items-center",
                      children: [
                        _jsxs("div", {
                          className: "me-2 text-end",
                          children: [
                            _jsx("div", {
                              className: "fw-semibold small",
                              children: "Emma Wilson",
                            }),
                            _jsx("div", {
                              className: "text-muted small",
                              children: "Member since Oct 2022",
                            }),
                          ],
                        }),
                        _jsx("div", {
                          className:
                            "rounded-circle bg-success text-white fw-bold d-flex align-items-center justify-content-center",
                          style: { width: "35px", height: "35px" },
                          children: "E",
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          }),
          _jsxs(Container, {
            className: "py-4",
            children: [
              _jsx("h4", {
                className: "fw-bold mb-4",
                children: "My Subscription",
              }),
              _jsx("div", {
                className: "border-bottom mb-4",
                children: _jsxs(Nav, {
                  variant: "tabs",
                  defaultActiveKey: "overview",
                  children: [
                    _jsx(Nav.Item, {
                      children: _jsx(Nav.Link, {
                        eventKey: "overview",
                        className: "text-success fw-semibold",
                        children: "Overview",
                      }),
                    }),
                    _jsx(Nav.Item, {
                      children: _jsx(Nav.Link, {
                        eventKey: "plans",
                        children: "Plans & Features",
                      }),
                    }),
                    _jsx(Nav.Item, {
                      children: _jsx(Nav.Link, {
                        eventKey: "billing",
                        children: "Billing History",
                      }),
                    }),
                  ],
                }),
              }),
              _jsx(Card, {
                className: "border-0 shadow-sm mb-4",
                children: _jsx(Card.Body, {
                  className: "bg-success bg-opacity-10",
                  children: _jsxs("div", {
                    className:
                      "d-flex justify-content-between align-items-start",
                    children: [
                      _jsxs("div", {
                        children: [
                          _jsxs("h5", {
                            className: "fw-bold mb-1",
                            children: [
                              "Premium Plan",
                              " ",
                              _jsx("span", {
                                className: "badge bg-success bg-opacity-75",
                                children: "Active",
                              }),
                            ],
                          }),
                          _jsxs("div", {
                            className: "text-muted small",
                            children: [
                              "Next billing date: ",
                              _jsx("strong", { children: "October 15, 2023" }),
                            ],
                          }),
                          _jsx("div", {
                            className: "text-muted small",
                            children: "Amount: $9.99/month",
                          }),
                        ],
                      }),
                      _jsxs("div", {
                        children: [
                          _jsx(Button, {
                            variant: "outline-success",
                            size: "sm",
                            className: "me-2",
                            children: "Update Payment",
                          }),
                          _jsx(Button, {
                            variant: "outline-danger",
                            size: "sm",
                            children: "Cancel Subscription",
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
              }),
              _jsxs("div", {
                className: "mb-4",
                children: [
                  _jsx("h6", {
                    className: "fw-bold mb-3",
                    children: "Current Plan Features",
                  }),
                  _jsxs(ListGroup, {
                    variant: "flush",
                    children: [
                      _jsxs(ListGroup.Item, {
                        className: "border-0 ps-0",
                        children: [
                          _jsx(BsCheckCircleFill, {
                            className: "text-success me-2",
                          }),
                          "Unlimited access to all resources",
                        ],
                      }),
                      _jsxs(ListGroup.Item, {
                        className: "border-0 ps-0",
                        children: [
                          _jsx(BsCheckCircleFill, {
                            className: "text-success me-2",
                          }),
                          "Personalized AI recommendations",
                        ],
                      }),
                      _jsxs(ListGroup.Item, {
                        className: "border-0 ps-0",
                        children: [
                          _jsx(BsCheckCircleFill, {
                            className: "text-success me-2",
                          }),
                          "Weekly therapist sessions",
                        ],
                      }),
                      _jsxs(ListGroup.Item, {
                        className: "border-0 ps-0",
                        children: [
                          _jsx(BsCheckCircleFill, {
                            className: "text-success me-2",
                          }),
                          "Priority support",
                        ],
                      }),
                      _jsxs(ListGroup.Item, {
                        className: "border-0 ps-0",
                        children: [
                          _jsx(BsCheckCircleFill, {
                            className: "text-success me-2",
                          }),
                          "Progress tracking and reports",
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              _jsxs("div", {
                className: "mb-4",
                children: [
                  _jsx("h6", {
                    className: "fw-bold mb-3",
                    children: "Payment Method",
                  }),
                  _jsx(Card, {
                    className: "border-0 shadow-sm p-3",
                    children: _jsxs("div", {
                      className:
                        "d-flex justify-content-between align-items-center",
                      children: [
                        _jsxs("div", {
                          className: "d-flex align-items-center",
                          children: [
                            _jsx("div", {
                              className:
                                "rounded-circle bg-success bg-opacity-25 p-2 me-3",
                              children: "\uD83D\uDCB3",
                            }),
                            _jsxs("div", {
                              children: [
                                _jsx("div", {
                                  className: "fw-semibold",
                                  children: "Visa ending in 4242",
                                }),
                                _jsx("div", {
                                  className: "text-muted small",
                                  children: "Expires 12/24",
                                }),
                              ],
                            }),
                          ],
                        }),
                        _jsx("a", {
                          href: "#",
                          className:
                            "text-success fw-semibold text-decoration-none",
                          children: "Change",
                        }),
                      ],
                    }),
                  }),
                ],
              }),
              _jsx(Card, {
                className: "border-0 shadow-sm p-3 bg-primary bg-opacity-10",
                children: _jsxs("div", {
                  className:
                    "d-flex justify-content-between align-items-center",
                  children: [
                    _jsxs("div", {
                      children: [
                        _jsx("div", {
                          className: "fw-semibold",
                          children: "Annual Plan Savings",
                        }),
                        _jsx("div", {
                          className: "text-muted small",
                          children: "Switch to annual billing and save 20%",
                        }),
                      ],
                    }),
                    _jsx(Button, {
                      variant: "primary",
                      className: "fw-semibold",
                      children: "Switch to Annual Plan",
                    }),
                  ],
                }),
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
export default SubscriptionPage;
