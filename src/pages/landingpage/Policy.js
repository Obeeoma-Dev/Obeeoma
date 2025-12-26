import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
// React-Bootstrap components used to replace Tailwind utility classes
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
// Site-level components (kept as-is per your request)
import Navigation from "../../components/shared/Navigation";
import Footer from "../../components/shared/Footer";
// Icons from lucide-react used in the original file
import { Database, UserCheck, Shield, Settings, Lock, Users, Eye, Mail, ExternalLink, } from "lucide-react";
// Animation variants for framer-motion (kept from your original file)
const containerVariants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};
const cardVariants = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1]
        },
    },
};
const heroVariants = {
    hidden: {
        opacity: 0,
        scale: 0.9,
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1]
        },
    },
};
// Exported function component (junior-friendly style)
export function PrivacyPolicy() {
    // The component returns the whole page structure
    return (_jsxs("div", { style: { minHeight: "100vh", display: "flex", flexDirection: "column" }, children: [_jsx(Navigation, {}), _jsxs(Container, { style: { paddingTop: "3rem", paddingBottom: "3rem", maxWidth: "80rem" }, children: [_jsx(Row, { className: "justify-content-center text-center mb-5", children: _jsx(Col, { lg: 10, children: _jsxs(motion.div, { initial: "hidden", animate: "visible", variants: heroVariants, children: [_jsx(motion.div, { animate: { y: [0, -8, 0] }, transition: {
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        }, style: {
                                            display: "inline-flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            width: 64,
                                            height: 64,
                                            backgroundColor: "#ecfdf5",
                                            borderRadius: 12,
                                            marginBottom: 12,
                                        }, children: _jsx(Shield, { style: { width: 32, height: 32, color: "#064e3b" } }) }), _jsx("h1", { style: {
                                            fontSize: "2.5rem",
                                            fontWeight: 700,
                                            color: "#111827",
                                            marginBottom: 8,
                                        }, children: "Privacy Policy" }), _jsx("p", { style: {
                                            color: "#065f46",
                                            fontWeight: 500,
                                            fontSize: "1.125rem",
                                        }, children: "Effective Date: November 2025" })] }) }) }), _jsxs(motion.div, { variants: containerVariants, initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-100px" }, children: [_jsxs(Row, { xs: 1, md: 2, className: "g-4 mb-4", children: [_jsx(Col, { children: _jsx(motion.div, { variants: cardVariants, children: _jsx(Card, { children: _jsx(Card.Body, { children: _jsxs("div", { style: { display: "flex", gap: 16 }, children: [_jsx("div", { style: {
                                                                    width: 48,
                                                                    height: 48,
                                                                    backgroundColor: "#ecfdf5",
                                                                    borderRadius: 8,
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    justifyContent: "center",
                                                                }, children: _jsx(Database, { style: { width: 24, height: 24, color: "#065f46" } }) }), _jsxs("div", { style: { flex: 1 }, children: [_jsx(Card.Title, { style: { fontSize: "1.125rem", fontWeight: 700 }, children: "Information We Collect" }), _jsx(ListGroup, { variant: "flush", children: _jsx(ListGroup.Item, { style: { paddingLeft: 0 }, children: _jsx("span", { children: "Personal information you provide directly (name, email)." }) }) })] })] }) }) }) }) }), _jsx(Col, { children: _jsx(motion.div, { variants: cardVariants, children: _jsx(Card, { children: _jsx(Card.Body, { children: _jsxs("div", { style: { display: "flex", gap: 16 }, children: [_jsx("div", { style: {
                                                                    width: 48,
                                                                    height: 48,
                                                                    backgroundColor: "#eff6ff",
                                                                    borderRadius: 8,
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    justifyContent: "center",
                                                                }, children: _jsx(Settings, { style: { width: 24, height: 24, color: "#1d4ed8" } }) }), _jsxs("div", { style: { flex: 1 }, children: [_jsx(Card.Title, { style: { fontSize: "1.125rem", fontWeight: 700 }, children: "How We Use Your Data" }), _jsx(ListGroup, { variant: "flush", children: _jsx(ListGroup.Item, { style: { paddingLeft: 0 }, children: _jsx("span", { children: "Provide and improve services" }) }) })] })] }) }) }) }) }), _jsx(Col, { children: _jsx(motion.div, { variants: cardVariants, children: _jsx(Card, { children: _jsx(Card.Body, { children: _jsxs("div", { style: { display: "flex", gap: 16 }, children: [_jsx("div", { style: {
                                                                    width: 48,
                                                                    height: 48,
                                                                    backgroundColor: "#f5f3ff",
                                                                    borderRadius: 8,
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    justifyContent: "center",
                                                                }, children: _jsx(Lock, { style: { width: 24, height: 24, color: "#6d28d9" } }) }), _jsxs("div", { style: { flex: 1 }, children: [_jsx(Card.Title, { style: { fontSize: "1.125rem", fontWeight: 700 }, children: "Data Security" }), _jsx(ListGroup, { variant: "flush", children: _jsx(ListGroup.Item, { style: { paddingLeft: 0 }, children: _jsx("span", { children: "Secure payment gateways (Paystack, Flutterwave)" }) }) })] })] }) }) }) }) }), _jsx(Col, { children: _jsx(motion.div, { variants: cardVariants, children: _jsx(Card, { children: _jsx(Card.Body, { children: _jsxs("div", { style: { display: "flex", gap: 16 }, children: [_jsx("div", { style: {
                                                                    width: 48,
                                                                    height: 48,
                                                                    backgroundColor: "#fff7ed",
                                                                    borderRadius: 8,
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    justifyContent: "center",
                                                                }, children: _jsx(Users, { style: { width: 24, height: 24, color: "#c2410c" } }) }), _jsxs("div", { style: { flex: 1 }, children: [_jsx(Card.Title, { style: { fontSize: "1.125rem", fontWeight: 700 }, children: "Information Sharing" }), _jsx(ListGroup, { variant: "flush", children: _jsx(ListGroup.Item, { style: { paddingLeft: 0 }, children: _jsx("span", { children: "Trusted partners (hosting, analytics, payments)" }) }) })] })] }) }) }) }) }), _jsx(Col, { children: _jsx(motion.div, { variants: cardVariants, children: _jsx(Card, { children: _jsx(Card.Body, { children: _jsxs("div", { style: { display: "flex", gap: 16 }, children: [_jsx("div", { style: {
                                                                    width: 48,
                                                                    height: 48,
                                                                    backgroundColor: "#ecfdf5",
                                                                    borderRadius: 8,
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    justifyContent: "center",
                                                                }, children: _jsx(UserCheck, { style: { width: 24, height: 24, color: "#16a34a" } }) }), _jsxs("div", { style: { flex: 1 }, children: [_jsx(Card.Title, { style: { fontSize: "1.125rem", fontWeight: 700 }, children: "Your Rights" }), _jsxs(ListGroup, { variant: "flush", children: [_jsx(ListGroup.Item, { style: { paddingLeft: 0 }, children: "Access, correct, or delete your data" }), _jsx(ListGroup.Item, { style: { paddingLeft: 0 }, children: "Withdraw consent anytime" })] })] })] }) }) }) }) }), _jsx(Col, { children: _jsx(motion.div, { variants: cardVariants, children: _jsx(Card, { children: _jsxs(Card.Body, { children: [_jsx(Card.Title, { style: { fontSize: "1.125rem", fontWeight: 700 }, children: "Third-Party Links" }), _jsx(Card.Text, { style: { fontSize: "0.9rem" }, children: "Our platform may link to external sites. We're not responsible for their privacy practices\u2014please review their policies separately." })] }) }) }) })] }), _jsx(Row, { className: "mb-4", children: _jsx(Col, { children: _jsx(motion.div, { variants: cardVariants, children: _jsx(Card, { children: _jsx(Card.Body, { children: _jsx(Card.Text, { style: { fontSize: "0.9rem" }, children: "We may update this policy periodically. You'll be notified of significant changes via app or email. Continued use means you accept the updates." }) }) }) }) }) }), _jsx(Row, { className: "mb-4", children: _jsx(Col, { children: _jsx(motion.div, { variants: cardVariants, children: _jsx(Card, { style: { backgroundColor: "#ecfdf5", borderColor: "#bbf7d0" }, children: _jsxs(Card.Body, { children: [_jsx(Card.Text, { style: { fontSize: "0.95rem" }, children: "For privacy-related inquiries, reach out to our team:" }), _jsxs("div", { style: { display: "flex", gap: 12, marginTop: 12 }, children: [_jsxs("a", { href: "mailto:hello@obeeoma.com", style: {
                                                                    display: "inline-flex",
                                                                    alignItems: "center",
                                                                    gap: 8,
                                                                    textDecoration: "none",
                                                                    fontWeight: 600,
                                                                    color: "#065f46",
                                                                }, children: [_jsx(Mail, { style: { width: 16, height: 16 } }), "hello@obeeoma.com"] }), _jsxs("a", { href: "https://www.obeeoma.com", style: {
                                                                    display: "inline-flex",
                                                                    alignItems: "center",
                                                                    gap: 8,
                                                                    textDecoration: "none",
                                                                    color: "#065f46",
                                                                    fontWeight: 600,
                                                                }, children: [_jsx(ExternalLink, { style: { width: 16, height: 16 } }), "www.obeeoma.com"] })] })] }) }) }) }) }), _jsx(Row, { className: "mb-4", children: _jsx(Col, { children: _jsx(motion.div, { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-50px' }, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }, children: _jsx(Card, { className: "text-center", children: _jsxs(Card.Body, { children: [_jsx("div", { style: {
                                                            display: "inline-flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            width: 48,
                                                            height: 48,
                                                            backgroundColor: "#ecfdf5",
                                                            borderRadius: "50%",
                                                            marginBottom: 12,
                                                        }, children: _jsx(Eye, { style: { width: 24, height: 24, color: "#065f46" } }) }), _jsx("h3", { style: {
                                                            fontSize: "1.125rem",
                                                            fontWeight: 600,
                                                            marginBottom: 8,
                                                        }, children: "Your Privacy is Our Priority" }), _jsx("p", { style: {
                                                            fontSize: "0.9rem",
                                                            color: "#4b5563",
                                                            maxWidth: 720,
                                                            margin: "0 auto",
                                                        }, children: "We're committed to transparency and protecting your personal information. Your trust enables us to provide better mental health care for everyone." })] }) }) }) }) })] })] }), _jsx(Footer, {})] }));
}
