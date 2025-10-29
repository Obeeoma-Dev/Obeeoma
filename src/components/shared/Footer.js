import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Obeeoma from "../../assets/Images/obeeomalogoword1.png";
const Footer = () => {
    // Define footer sections and their items
    const menuSections = {
        forEmployers: {
            title: "For Employers",
            items: [
                { text: "How it works", link: "/how-it-works" },
                { text: "Pricing", link: "/pricing" },
                { text: "Partners", link: "/partners" },
                { text: "Case Studies", link: "/case-studies" },
            ],
        },
        forEmployees: {
            title: "For Employees",
            items: [
                { text: "Sign in", link: "/signin" },
                { text: "Privacy Policy", link: "/privacy" },
                { text: "Support", link: "/support" },
                { text: "Crisis Resources", link: "/crisis-resources" },
            ],
        },
        company: {
            title: "Company",
            items: [
                { text: "About us", link: "/about" },
                { text: "Blog", link: "/blog" },
                { text: "Careers", link: "/careers" },
                { text: "Contact", link: "/contact" },
            ],
        },
    };
    return (_jsx("footer", { className: "bg-light py-5", "data-testid": "footer", children: _jsxs("div", { className: "container", children: [_jsx("div", { className: "row mb-4", children: _jsx("div", { className: "col-12", children: _jsx("img", { src: Obeeoma, alt: "Obeeoma", className: "mb-2", style: {
                                height: "40px",
                                width: "auto",
                            }, "data-testid": "footer-logo" }) }) }), _jsxs("div", { className: "row", children: [_jsxs("div", { className: "col-lg-3 mb-4", "data-testid": "footer-section-about", children: [_jsx("h6", { className: "text-dark mb-3", style: { fontFamily: 'heading' }, children: "About Obeeoma" }), _jsx("p", { className: "text-muted small mb-4", children: "AI-first workplace mental health platform built for Africa. Supporting healthier, more productive teams across the continent." }), _jsx("p", { className: "text-muted small mb-0", children: "\u00A9 2025 Obeeoma. All rights reserved." })] }), Object.entries(menuSections).map(([key, section]) => (_jsxs("div", { className: "col-lg-3 mb-4", "data-testid": `footer-section-${key}`, children: [_jsx("h6", { className: "text-dark mb-3", style: { fontFamily: 'heading' }, children: section.title }), _jsx("ul", { className: "list-unstyled", children: section.items.map((item, index) => (_jsx("li", { className: "mb-2", children: _jsx(Link, { to: item.link, className: "text-muted text-decoration-none", children: item.text }) }, index))) })] }, key)))] })] }) }));
};
export default Footer;
