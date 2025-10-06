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
    return (_jsx("footer", { className: "bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-gray-300 py-16 mt-16", children: _jsxs("div", { className: "container mx-auto px-6", children: [_jsxs("div", { className: "grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12", children: [_jsxs("div", { className: "lg:col-span-1", children: [_jsx("h2", { className: "text-3xl font-bold text-white mb-4", children: "Obeeoma" }), _jsx("p", { className: "text-sm mb-4", children: "We're dedicated to democratizing access to mental health resources." }), _jsx("p", { className: "text-xs opacity-70", children: "\u00A9 2025 Obeeoma. All Rights Reserved." })] }), footerSections.map((section, index) => (_jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-white mb-4", children: section.title }), _jsx("ul", { className: "space-y-3", children: section.links.map((link, linkIndex) => (_jsx("li", { children: _jsx("a", { href: "/employer-dashboard", className: "text-sm text-gray-400 hover:text-green-400 transition-colors", children: link }) }, linkIndex))) })] }, index)))] }), _jsx("div", { className: "pt-8 border-t border-gray-700", children: _jsxs("div", { className: "flex flex-wrap justify-between items-center gap-4 text-sm text-gray-400", children: [_jsx("p", { children: "\u00A9 2025 Obeeoma. All Rights Reserved." }), _jsxs("div", { className: "flex gap-6", children: [_jsx("a", { href: "#", className: "hover:text-green-400 transition-colors", children: "Privacy Policy" }), _jsx("a", { href: "#", className: "hover:text-green-400 transition-colors", children: "Terms of Service" }), _jsx("a", { href: "#", className: "hover:text-green-400 transition-colors", children: "Contact Us" })] })] }) })] }) }));
};
export default Footer;
