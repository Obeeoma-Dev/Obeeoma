import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Import layout and button components from React Bootstrap
import { Button, Row, Col } from "react-bootstrap";
// Import the hero image (mocked in tests)
import heroImage from "@/assets/Images/headerimage.png";
// Import navigation hook from React Router
import { useNavigate } from "react-router-dom";
/**
 * Hero component: renders the landing section with background image,
 * heading, description, and navigation buttons.
 */
const Hero = () => {
    const navigate = useNavigate(); // Enables navigation via buttons
    return (_jsx("section", { className: "hero-section d-flex", style: {
            position: "relative",
            minHeight: "100vh",
            backgroundImage: heroImage ? `url(${heroImage})` : undefined, // Prevents empty src warning
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            color: "#fff",
            paddingTop: "80px"
        }, children: _jsx("div", { className: "hero-content container text-center text-lg-start", style: { position: "relative", zIndex: 2, paddingTop: "4rem" }, children: _jsxs(Row, { className: "align-items-center", style: { paddingTop: "4rem" }, children: [_jsxs(Col, { lg: 6, className: "mb-5 mb-lg-0", children: [_jsx("h1", { className: "fw-bold display-5 mb-3", style: { fontFamily: 'heading' }, children: "Start Your Journey to Better Mental Health" }), _jsx("p", { className: "lead mb-4", style: {
                                    color: "rgba(255, 255, 255, 0.9)",
                                    fontSize: "1.25rem",
                                }, children: "Obeeoma professional mental health service." })] }), _jsx(Col, { lg: 6, className: "d-flex justify-content-end", 
                        // Move this entire column (buttons) slightly down by 30px
                        style: { position: "relative", top: "30px" }, children: _jsxs("div", { className: "d-flex flex-column flex-sm-row gap-3", children: [_jsx(Button, { className: "rounded-pill px-5 py-3 fw-semibold" // Rounded edges, padding, bold text
                                    , style: {
                                        backgroundColor: "rgba(50, 200, 50, 0.9)", // Initial green background
                                        borderColor: "rgba(50, 200, 50, 0.9)", // Match border with background
                                        color: "#fff", // White text color
                                        transition: "all 0.3s ease", // Smooth color transition on hover
                                    }, 
                                    // When hovered: make green slightly darker
                                    onMouseEnter: (e) => {
                                        e.currentTarget.style.backgroundColor =
                                            "rgba(40, 180, 40, 1)";
                                    }, 
                                    // When mouse leaves: restore the original green
                                    onMouseLeave: (e) => {
                                        e.currentTarget.style.backgroundColor =
                                            "rgba(50, 200, 50, 0.9)";
                                    }, 
                                    // Navigate to signup page when clicked
                                    onClick: () => navigate("/signup"), children: "Sign up for my organization" }), _jsx(Button, { className: "rounded-pill px-5 py-3 fw-semibold" // Rounded shape, same padding, bold font
                                    , style: {
                                        backgroundColor: "rgba(250, 250, 250, 0.85)", // Soft white background
                                        color: "rgba(40, 180, 40, 1)", // Green text
                                        border: "1px solid rgba(40, 180, 40, 1)", // Green border to match text
                                        outline: "none", // Remove focus outline
                                        boxShadow: "none", // Remove default shadow when focused
                                        transition: "all 0.3s ease", // Smooth hover transition
                                    }, 
                                    // On hover: make background fully white
                                    onMouseEnter: (e) => {
                                        e.currentTarget.style.backgroundColor =
                                            "rgba(255, 255, 255, 1)";
                                    }, 
                                    // On mouse leave: revert to soft white
                                    onMouseLeave: (e) => {
                                        e.currentTarget.style.backgroundColor =
                                            "rgba(250, 250, 250, 0.85)";
                                    }, 
                                    // Navigate to login page when clicked
                                    onClick: () => navigate("/login"), children: "Sign In" })] }) })] }) }) }));
};
export default Hero;
