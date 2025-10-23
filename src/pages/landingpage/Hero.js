import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Import layout and button components from React Bootstrap
import { Button, Row, Col } from "react-bootstrap";
// Import the hero image (mocked in tests)
import heroImage from "@/assets/Images/headerimage.png";
// Import navigation hook from React Router
import { useNavigate } from "react-router-dom";
// Import global styles
// import "@/index.css";
/**
 * Hero component: renders the landing section with background image,
 * heading, description, and navigation buttons.
 */
const Hero = () => {
    const navigate = useNavigate(); // Enables navigation via buttons
    return (_jsx("section", { className: "hero-section d-flex align-items-center", style: {
            position: "relative",
            minHeight: "85vh",
            backgroundImage: heroImage ? `url(${heroImage})` : undefined, // Prevents empty src warning
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            color: "#fff",
        }, children: _jsx("div", { className: "hero-content container text-center text-lg-start", style: { position: "relative", zIndex: 2, paddingTop: "4rem" }, children: _jsx(Row, { className: "align-items-center", children: _jsxs(Col, { lg: 6, className: "mb-5 mb-lg-0", children: [_jsx("h1", { className: "fw-bold display-5 mb-3", children: "Start Your Journey to Better Mental Health" }), _jsx("p", { className: "lead mb-4", style: {
                                color: "rgba(255, 255, 255, 0.9)",
                                fontSize: "1.25rem",
                            }, children: "Obeeoma professional mental health service." }), _jsxs("div", { className: "d-flex flex-column flex-sm-row justify-content-center gap-3", children: [_jsx(Button, { variant: "outline-light", className: "rounded-pill px-5 py-3 fw-semibold", style: {
                                        borderColor: "rgba(77, 255, 77, 0.9)",
                                        color: "rgba(77, 255, 77, 0.9)",
                                        transition: "background-color 0.3s ease, color 0.3s ease",
                                    }, onClick: () => navigate("/signup"), children: "Sign up for my organization" }), _jsx(Button, { variant: "outline-light", className: "rounded-pill px-5 py-3 fw-semibold", style: {
                                        borderColor: "rgba(77, 255, 77, 0.9)",
                                        color: "rgba(77, 255, 77, 0.9)",
                                        transition: "background-color 0.3s ease, color 0.3s ease",
                                    }, onClick: () => navigate("/login"), children: "Sign In" })] })] }) }) }) }));
};
export default Hero;
