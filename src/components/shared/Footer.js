import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// Use one of the imports, Obeeomalogo is used in the JSX below
import Obeeomalogo from "../../assets/Images/obeeomalogoword1.png";
const Footer = () => {
    // Define footer sections and their items
    const menuSections = {
        services: {
            title: "Services",
            items: [
                { text: "For Organizations", link: "/organizations" },
                { text: "For Employees", link: "/employees" },
                { text: "Mental Health Assessments", link: "/assessments" },
            ],
        },
        company: {
            title: "Company",
            items: [
                { text: "About Us", link: "/about" },
                { text: "Careers", link: "/careers" },
                { text: "Blog", link: "/blog" },
                { text: "Contact", link: "/contact" },
            ],
        },
        legal: {
            title: "Legal",
            items: [
                { text: "Privacy Policy", link: "/privacy" },
                { text: "Terms of Service", link: "/terms" },
                { text: "Cookie Policy", link: "/cookies" },
                { text: "HIPAA Compliance", link: "/hipaa" },
            ],
        },
    };
    return (_jsx("footer", { className: "py-5", "data-testid": "footer", children: _jsxs("div", { className: "container", children: [_jsx("div", { className: "row mb-4", children: _jsx("div", { className: "col-12", children: _jsx("img", { src: Obeeomalogo, alt: "Obeeoma", className: "mb-2", style: {
                                height: "40px",
                                width: "auto",
                            }, "data-testid": "footer-logo" }) }) }), _jsxs("div", { className: "row", children: [_jsxs("div", { className: "col-lg-3 mb-4", "data-testid": "footer-section-about", children: [_jsx("h6", { className: "text-white mb-3", style: { fontFamily: 'heading' }, children: "About Obeeoma" }), _jsx("p", { className: "text-white small mb-4", children: "AI-first workplace mental health platform built for Africa. Supporting healthier, more productive teams across the continent." }), _jsx("p", { className: "text-white small mb-0", children: "\u00A9 2025 Obeeoma. All rights reserved." })] }), Object.entries(menuSections).map(([key, section]) => (_jsxs("div", { className: "col-lg-3 mb-4", "data-testid": `footer-section-${key}`, children: [_jsx("h6", { className: "text-white mb-3", style: { fontFamily: 'heading' }, children: section.title }), _jsx("ul", { className: "list-unstyled", children: section.items.map((item, index) => (_jsx("li", { className: "mb-2", children: _jsx(Link, { to: item.link, className: "text-white text-decoration-none", children: item.text }) }, index))) })] }, key)))] })] }) }));
};
export default Footer;
