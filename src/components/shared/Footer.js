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
                { text: "For Organizations", link: "/signup" },
                { text: "For Employees", link: "/login" },
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
                { text: "Privacy Policy", link: "/privacy-policy" },
                { text: "Terms of Service", link: "/terms & conditions" },
            ],
        },
    };
    return (_jsx("footer", { className: "py-4 pb-1 bg-success", "data-testid": "footer", children: _jsxs("div", { className: "container", children: [_jsx("div", { className: "row mb-4 footer-section", children: _jsx("div", { className: "col-12", children: _jsx("img", { src: Obeeoma, alt: "Obeeoma", className: "mb-2", style: {
                                height: "50px",
                                width: "auto",
                            }, "data-testid": "footer-logo" }) }) }), _jsxs("div", { className: "row g-4", children: [_jsxs("div", { className: "col-lg-3 mb-4", "data-testid": "footer-section-about", children: [_jsx("h6", { className: "text-white mb-3", style: {
                                        fontFamily: 'heading', fontSize: '1rem'
                                    }, children: "About Obeeoma" }), _jsx("p", { className: "footer-text", children: "AI-first workplace mental health platform built for Africa. Supporting healthier, more productive teams across the continent." }), _jsx("p", { className: "footer-text", children: "\u00A9 2025 Obeeoma. All rights reserved." })] }), Object.entries(menuSections).map(([key, section]) => (_jsxs("div", { className: "col-lg-3 mb-4", "data-testid": `footer-section-${key}`, children: [_jsx("h6", { className: "text-white mb-3", style: {
                                        fontFamily: 'heading', fontSize: '1rem'
                                    }, children: section.title }), _jsx("ul", { className: "list-unstyled", children: section.items.map((item, index) => (_jsx("li", { className: "mb-2", children: _jsx(Link, { to: item.link, className: "footer-text", children: item.text }) }, index))) })] }, key)))] })] }) }));
};
export default Footer;
