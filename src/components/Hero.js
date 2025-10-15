import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Row, Col } from "react-bootstrap";
import heroImage from "@/assets/Images/headerimage.png";
import { useNavigate } from "react-router-dom";
import "@/index.css";
const Hero = () => {
    const navigate = useNavigate();
    return (_jsx("section", { className: "hero-section d-flex align-items-center justify-content-center text-center text-white", style: {
            backgroundImage: heroImage ? `url(${heroImage})` : undefined, // ✅ Prevents empty src warning
            backgroundSize: "contain",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            height: "100vh",
            minHeight: "85vh",
            color: "#fff",
        }, children: _jsx("div", { className: "hero-content container text-center text-lg-start", style: { position: "relative", zIndex: 2, paddingTop: "4rem" }, children: _jsxs(Row, { className: "align-items-center", children: [_jsxs(Col, { lg: 6, className: "mb-5 mb-lg-0", children: [_jsx("h1", { className: "fw-bold display-5 mb-3", children: "Start Your Journey to Better Mental Health" }), _jsx("p", { className: "lead mb-4", style: { color: "rgba(255, 255, 255, 0.9)", fontSize: "1.25rem" }, children: "Obeeoma professional mental health service." }), _jsxs("div", { className: "d-flex flex-column flex-sm-row justify-content-center gap-3", children: [_jsx(Button, { variant: "outline-light", className: "rounded-pill px-5 py-3 fw-semibold", style: {
                                            borderColor: "rgba(77, 255, 77, 0.9)",
                                            color: "rgba(77, 255, 77, 0.9)",
                                            transition: "background-color 0.3s ease, color 0.3s ease",
                                        }, onClick: () => navigate("/signup"), children: "Sign up for my organization" }), _jsx(Button, { variant: "outline-light", className: "rounded-pill px-5 py-3 fw-semibold", style: {
                                            borderColor: "rgba(77, 255, 77, 0.9)",
                                            color: "rgba(77, 255, 77, 0.9)",
                                            transition: "background-color 0.3s ease, color 0.3s ease",
                                        }, onClick: () => navigate("/login"), children: "Sign In" })] })] }), _jsx(Col, { lg: 6, className: "text-center", children: _jsx("img", { src: heroImage, alt: "Obeeoma workplace support", className: "img-fluid rounded-4 shadow-lg d-lg-none" }) })] }) }) }));
};
export default Hero;
