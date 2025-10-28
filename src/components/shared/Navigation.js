import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Import necessary components and modules
import { Navbar, Nav, Container } from "react-bootstrap"; // React-Bootstrap components for layout and styling
import { Link } from "react-router-dom"; // Enables navigation without page reloads
import logo from "../../assets/Images/green..png"; // Path to the company logo image
/**
 * Navigation Component
 * ---------------------
 * This component renders the top navigation bar for the application.
 * It includes a logo on the left and navigation links (Features and Benefits) on the right.
 * The navbar is fixed to the top of the page and remains visible while scrolling.
 */
const Navigation = () => (_jsx(Navbar, { expand: "lg" // Enables responsive collapse on large screens
    , fixed: "top" // Keeps the navbar fixed at the top
    , className: "py-3 shadow-sm" // Adds vertical padding and a soft shadow
    , style: { backgroundColor: "white" }, children: _jsxs(Container, { children: [_jsx(Navbar.Brand, { as: Link, to: "/employer-dashboard", children: _jsx("img", { src: logo, alt: "Obeeoma" // Accessible alt text for the logo
                    , height: "80" // Logo height
                    , width: "80" // Logo width
                 }) }), _jsx(Navbar.Toggle, { "aria-controls": "nav" }), _jsx(Navbar.Collapse, { id: "nav", className: "justify-content-end", children: _jsxs(Nav, { className: "ms-auto", children: [_jsx(Nav.Link, { href: "#features", className: "text-black fw-semibold mx-2", children: "Features |" }), _jsx(Nav.Link, { href: "#benefits", className: "text-black fw-semibold mx-2", children: "Benefits" })] }) })] }) }));
// Export the component for use in other parts of the application
export default Navigation;
