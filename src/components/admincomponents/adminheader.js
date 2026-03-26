import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Container, Form, FormControl, Button, Row, Col, } from "react-bootstrap";
import { Search } from "lucide-react";
/**
 * Header component displays the top navigation bar
 * Includes search input, notification bell, and user profile section
 */
const Header = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // Navigate to search results page with query parameter
            navigate(`/system-admin/search?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };
    return (
    // Navbar container with light background and bottom border
    _jsx(Navbar, { bg: "white", className: "border-bottom", style: {
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)",
            padding: "1rem 1.5rem",
        }, children: _jsxs(Container, { fluid: true, children: [_jsx(Form, { className: "d-flex flex-grow-1 me-auto", style: { maxWidth: "500px" }, onSubmit: handleSearch, children: _jsxs("div", { className: "position-relative w-100", children: [_jsx(Search, { size: 18, className: "position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" }), _jsx(FormControl, { type: "search", placeholder: "Search...", className: "ps-5 border rounded-2", style: { backgroundColor: "#f5f7fa", borderColor: "#e9ecef" }, "aria-label": "Search", value: searchQuery, onChange: handleSearchChange })] }) }), _jsxs(Row, { className: "align-items-center gx-4", children: [_jsx(Col, { xs: "auto", children: _jsx(Button, { variant: "link", className: "position-relative p-0 text-dark", "aria-label": "Notifications", style: { textDecoration: "none" } }) }), _jsx(Col, { xs: "auto", children: _jsx("div", { className: "d-flex align-items-center gap-3", children: _jsxs("div", { className: "text-end", children: [_jsx("div", { className: "text-muted small fw-500", style: { fontSize: "0.8rem" } }), _jsxs("div", { className: "fw-600 text-dark", style: { fontSize: "0.9rem" }, children: [" ", "Obeeoma Systems Adminstrator Settings", " "] })] }) }) })] })] }) }));
};
export default Header;
