// Import React and required hooks
import React from "react";

// Import layout and button components from React Bootstrap
import { Button, Row, Col } from "react-bootstrap";

// Import the hero image (mocked in tests)
import heroImage from "@/assets/Images/headerimage.png";

// Import navigation hook from React Router
import { useNavigate } from "react-router-dom";

// Import global styles
import "@/index.css";

/**
 * Hero component: renders the landing section with background image,
 * heading, description, and navigation buttons.
 */
const Hero = () => {
  const navigate = useNavigate(); // Enables navigation via buttons

  return (
    <section
      className="hero-section d-flex align-items-center justify-content-center text-center text-white"
      style={{
        backgroundImage: heroImage ? `url(${heroImage})` : undefined, // ✅ Prevents empty src warning
        backgroundSize: "contain",
        backgroundPosition: "focus center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        minHeight: "85vh",
        color: "#fff",
      }}
    >
      <div
        className="hero-content container text-center text-lg-start"
        style={{ position: "relative", zIndex: 2, paddingTop: "4rem" }}
      >
        <Row className="align-items-center">
          <Col lg={6} className="mb-5 mb-lg-0">
            <h1 className="fw-bold display-5 mb-3">
              Start Your Journey to Better Mental Health
            </h1>
            <p
              className="lead mb-4"
              style={{
                color: "rgba(255, 255, 255, 0.9)",
                fontSize: "1.25rem",
              }}
            >
              Obeeoma professional mental health service.
            </p>
            <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
              <Button
                variant="outline-light"
                className="rounded-pill px-5 py-3 fw-semibold"
                style={{
                  borderColor: "rgba(77, 255, 77, 0.9)",
                  color: "rgba(77, 255, 77, 0.9)",
                  transition: "background-color 0.3s ease, color 0.3s ease",
                }}
                onClick={() => navigate("/signup")}>
                Sign up for my organization
              </Button>
              <Button
                variant="outline-light"
                className="rounded-pill px-5 py-3 fw-semibold"
                style={{
                  borderColor: "rgba(77, 255, 77, 0.9)",
                  color: "rgba(77, 255, 77, 0.9)",
                  transition: "background-color 0.3s ease, color 0.3s ease",
                }}
                onClick={() => navigate("/login")}
              >
                Sign In
              </Button>
            </div>
          </Col>

          <Col lg={6} className="text-center">
            {/* ✅ Only render image if heroImage is truthy to avoid empty src warning */}
            {heroImage && (
              <img
                src={heroImage}
                alt="Obeeoma workplace support"
                className="img-fluid rounded-4 shadow-lg d-lg-none"
              />
            )}
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default Hero;
