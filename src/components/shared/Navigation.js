import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Import necessary components and modules
import { Navbar, Nav, Container } from "react-bootstrap"; // React-Bootstrap components for layout and styling
import { Link } from "react-router-dom"; // Enables navigation without page reloads
import logo from "../../assets/Images/obeeomalogoword1.png"; // Path to the company logo image
import { useEffect, useState } from "react";
// Define your nav component. 
function Navigation() {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10); // Adjustment area of the threshold.
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (_jsx(Navbar, { expand: "lg" // This enables responsive collapse on large screens.
        , fixed: "top" // This keeps the navbar fixed at the top
        , className: 'shadow-sm" ${scrolled ? "scrolled" : "transparent"}', style: {
            transition: "background-color 0.3s ease",
            height: "80px", // Set fixed navbar height.
            minHeight: "80px", // Ensure minimum height.        
        }, children: _jsxs(Container, { children: [_jsx(Navbar.Brand, { as: Link, to: "/", className: "d-flex align-items-center" // Center logo vertically.
                    , children: _jsx("img", { src: logo, alt: "Obeeoma" // Accessible alt text for the logo
                        , style: {
                            height: "50px", // logo's size.
                            width: "auto", // Maintaining aspect ratio
                            marginTop: "-10px", // Adjust vertical position if needed. 
                            marginBottom: "-10px"
                        } }) }), _jsx(Navbar.Toggle, { "aria-controls": "nav" }), _jsx(Navbar.Collapse, { id: "nav", className: "justify-content-end", children: _jsxs(Nav, { className: "ms-auto", children: [_jsx(Nav.Link, { href: "/", className: "text-dark mx-2", style: {
                                    fontSize: "30px",
                                    fontWeight: 900,
                                    fontFamily: 'body'
                                }, children: "Home |" }), _jsx(Nav.Link, { href: "/features", className: "text-dark mx-2", style: {
                                    fontSize: "30px", // Larger font size.
                                    fontWeight: 900, // Semibold.
                                    fontFamily: 'body'
                                }, children: "Features |" }), _jsx(Nav.Link, { href: "#benefits", className: "text-black mx-2", style: {
                                    fontSize: "30px", // Larger font size.
                                    fontWeight: 900, // text font.
                                    fontFamily: 'body'
                                }, children: "Benefits" })] }) })] }) }));
}
export default Navigation;
