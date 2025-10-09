import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from "../../assets/Images/obeeomalogoicon2.png";
const Navigation = () => (_jsx(Navbar, { expand: "lg", fixed: "top", className: "py-3", style: { backgroundColor: "var(--color-green)" }, children: _jsxs(Container, { children: [_jsx(Navbar.Toggle, { "aria-controls": "nav" }), _jsx(Navbar.Collapse, { id: "nav", className: "justify-content-between", children: _jsxs(Nav, { className: "me-auto", children: [_jsx(Navbar.Brand, { href: "/employer-dashboard", children: _jsx("img", { src: logo, alt: "Obeeoma", height: "40" }) }), _jsx(Nav.Link, { href: "#pricing", className: "text-white", children: "  Features  |  " }), _jsx(Nav.Link, { href: "#benefits", className: "text-white", children: "  Benefits" })] }) })] }) }));
export default Navigation;
