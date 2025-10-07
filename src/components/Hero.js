import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Row, Col } from "react-bootstrap";
import heroImage from "@/assets/Images/headerimage.png";
import { useNavigate } from "react-router-dom";
import "@/index.css";
const Hero = () => {
    const navigate = useNavigate();
    return (_jsxs("section", { className: "hero-section d-flex align-items-center", style: {
            position: "relative",
            minHeight: "85vh",
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            color: "#fff",
        }, children: [_jsx("div", { style: {
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    background: "linear-gradient(135deg, rgba(60, 179, 113, 0.8), rgba(0, 168, 89, 0.8), rgba(255, 77, 77, 0.8))",
                    zIndex: 1,
                } }), _jsx("div", { className: "hero-content container text-center text-lg-start", style: { position: "relative", zIndex: 2, paddingTop: "4rem" }, children: _jsxs(Row, { className: "align-items-center", children: [_jsxs(Col, { lg: 6, className: "mb-5 mb-lg-0", children: [_jsx("h1", { className: "fw-bold display-5 mb-3", children: "Start Your Journey to Better Mental Health" }), _jsx("p", { className: "lead mb-4", style: { color: "rgba(255, 255, 255, 0.9)", fontSize: "1.25rem" }, children: "Obeeoma provides comprehensive mental health services with a personalized approach to help you achieve emotional well-being and resilience." }), _jsxs("div", { className: "d-flex flex-column flex-sm-row justify-content-center gap-3", children: [_jsx(Button, { size: "lg", className: "px-5 py-3 fw-semibold", style: {
                                                background: "linear-gradient(90deg, #3CB371 0%, #ff4d4d 100%)",
                                                border: "none",
                                                color: "#fff",
                                                transition: "opacity 0.3s ease",
                                            }, onClick: () => navigate("/signup"), onMouseEnter: e => (e.currentTarget.style.opacity = "0.85"), onMouseLeave: e => (e.currentTarget.style.opacity = "1"), children: "Sign up for my organization" }), _jsx(Button, { variant: "outline-light", className: "rounded-pill px-5 py-3 fw-semibold", style: {
                                                borderColor: "rgba(255, 77, 77, 0.9)",
                                                color: "rgba(255, 77, 77, 0.9)",
                                                transition: "background-color 0.3s ease, color 0.3s ease",
                                            }, onClick: () => navigate("/login"), onMouseEnter: e => {
                                                e.currentTarget.style.backgroundColor = "rgba(255, 77, 77, 0.9)";
                                                e.currentTarget.style.color = "#fff";
                                            }, onMouseLeave: e => {
                                                e.currentTarget.style.backgroundColor = "transparent";
                                                e.currentTarget.style.color = "rgba(255, 77, 77, 0.9)";
                                            }, children: "Sign In" })] })] }), _jsx(Col, { lg: 6, className: "text-center", children: _jsx("img", { src: heroImage, alt: "Obeeoma workplace support", className: "img-fluid rounded-4 shadow-lg d-lg-none" }) })] }) })] }));
};
export default Hero;
