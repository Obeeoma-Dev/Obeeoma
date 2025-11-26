import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Obeeoma from "../../assets/Images/obeeomalogoword2.png";
const Footer = () => {
    // Define footer sections and their items
    const menuSections = {
        services: {
            title: "Services",
            items: [
                { text: "For Organizations", link: "/organizations" },
                { text: "For Employees", link: "/employees" },
            ],
        },
        company: {
            title: "Company",
            items: [
                { text: "About Us", link: "/about-us" },
                { text: "Blog", link: "/blog" },
                { text: "Contact", link: "/contact-us" },
            ],
        },
        legal: {
            title: "Legal",
            items: [
                { text: "Privacy Policy", link: "/privacy" },
                { text: "Terms of Service", link: "/terms" },
            ],
        },
    };
    return (_jsx("footer", { className: "py-5 bg-success", "data-testid": "footer", children: _jsxs("div", { className: "container", children: [_jsx("div", { className: "row mb-4", children: _jsx("div", { className: "col-12", children: _jsx("img", { src: Obeeoma, alt: "Obeeoma", className: "mb-2", style: {
                                height: "50px",
                                width: "auto",
                            }, "data-testid": "footer-logo" }) }) }), _jsxs("div", { className: "row", children: [_jsxs("div", { className: "col-lg-3 mb-4", "data-testid": "footer-section-about", children: [_jsx("h6", { className: "text-white mb-3", style: { fontFamily: 'heading' }, children: "About Obeeoma" }), _jsx("p", { className: "text-white small mb-4", children: "AI-first workplace mental health platform built for Africa. Supporting healthier, more productive teams across the continent." }), _jsx("p", { className: "text-white small mb-0", children: "\u00A9 2025 Obeeoma. All rights reserved." })] }), Object.entries(menuSections).map(([key, section]) => (_jsxs("div", { className: "col-lg-3 mb-4", "data-testid": `footer-section-${key}`, children: [_jsx("h6", { className: "text-white mb-3", style: { fontFamily: 'heading' }, children: section.title }), _jsx("ul", { className: "list-unstyled", children: section.items.map((item, index) => (_jsx("li", { className: "mb-2", children: _jsx(Link, { to: item.link, className: "text-white text-decoration-none", children: item.text }) }, index))) })] }, key)))] })] }) }));
};
export default Footer;
