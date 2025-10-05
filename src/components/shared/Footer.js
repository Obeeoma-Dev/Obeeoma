import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Footer = () => {
    const footerSections = [
        {
            title: "About Obeeoma",
            links: [
                "Why we started and our goals",
                "Insights on the future of mental healthcare",
                "Info on our privacy and how we secure user information",
            ],
        },
        {
            title: "For Employers",
            links: ["How it works", "Pricing", "Partners", "Get Started"],
        },
        {
            title: "For Employees",
            links: ["Sign in", "Privacy Policy", "Terms of Use", "Get Connected"],
        },
        {
            title: "Company",
            links: ["About us", "Blog", "Careers", "Contact"],
        },
    ];
    return (_jsx("footer", { className: "bg-muted py-16", children: _jsxs("div", { className: "container mx-auto px-6", children: [_jsxs("div", { className: "grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12", children: [_jsxs("div", { className: "lg:col-span-1", children: [_jsx("h2", { className: "text-3xl font-bold text-primary mb-4", children: "Obeeoma" }), _jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "We're dedicated to democratizing access to mental health resources." }), _jsx("p", { className: "text-xs text-muted-foreground", children: "\u00A9 2025 Obeeoma. All Rights Reserved." })] }), footerSections.map((section, index) => (_jsxs("div", { children: [_jsx("h3", { className: "font-semibold mb-4", children: section.title }), _jsx("ul", { className: "space-y-3", children: section.links.map((link, linkIndex) => (_jsx("li", { children: _jsx("a", { href: "#", className: "text-sm text-muted-foreground hover:text-primary transition-colors", children: link }) }, linkIndex))) })] }, index)))] }), _jsx("div", { className: "pt-8 border-t border-border", children: _jsxs("div", { className: "flex flex-wrap justify-between items-center gap-4 text-sm text-muted-foreground", children: [_jsx("p", { children: "\u00A9 2025 Obeeoma. All Rights Reserved." }), _jsxs("div", { className: "flex gap-6", children: [_jsx("a", { href: "#", className: "hover:text-primary transition-colors", children: "Privacy Policy" }), _jsx("a", { href: "#", className: "hover:text-primary transition-colors", children: "Terms of Service" }), _jsx("a", { href: "#", className: "hover:text-primary transition-colors", children: "Contact Us" })] })] }) })] }) }));
};
export default Footer;
