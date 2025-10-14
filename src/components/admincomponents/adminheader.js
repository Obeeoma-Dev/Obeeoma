import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Navbar, Container, Form, FormControl, Button, Badge, Row, Col, } from "react-bootstrap";
// Import icons from lucide-react
import { Search, Bell, User } from "lucide-react";
/**
 * Header component displays the top navigation bar
 * Includes search input, notification bell, and user profile section
 */
const Header = () => {
    return (
    // Navbar container with light background and bottom border
    _jsx(Navbar, { bg: "white", className: "border-bottom py-3", children: _jsxs(Container, { fluid: true, children: [_jsx(Form, { className: "d-flex flex-grow-1 me-auto", style: { maxWidth: "500px" }, children: _jsxs("div", { className: "position-relative w-100", children: [_jsx(Search, { size: 18, className: "position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" }), _jsx(FormControl, { type: "search", placeholder: "Search...", className: "ps-5", "aria-label": "Search" })] }) }), _jsxs(Row, { className: "align-items-center gx-4", children: [_jsx(Col, { xs: "auto", children: _jsxs(Button, { variant: "link", className: "position-relative p-0 text-dark", "aria-label": "Notifications", children: [_jsx(Bell, { size: 22 }), _jsx(Badge, { bg: "danger", pill: true, className: "position-absolute top-0 start-100 translate-middle text-white", style: {
                                            fontSize: "0.65rem",
                                            width: "1.2rem",
                                            height: "1.2rem",
                                        }, children: "2" })] }) }), _jsx(Col, { xs: "auto", children: _jsxs("div", { className: "d-flex align-items-center gap-3", children: [_jsxs("div", { className: "text-end", children: [_jsx("div", { className: "text-muted small", children: " Dr. Racheal Lucia " }), _jsx("div", { className: "fw-medium", children: " Obeeoma System Admin " })] }), _jsx("div", { className: "bg-success rounded-circle d-flex align-items-center justify-content-center", style: { width: "40px", height: "40px" }, children: _jsx(User, { size: 22, color: "#fff" }) })] }) })] })] }) }));
};
export default Header;
