// Import React and required hooks
import React, { useEffect } from "react";

// Import layout and button components from React Bootstrap
import { Button, Row, Col } from "react-bootstrap";

// Import the hero image (mocked in tests)
import heroImage from "@/assets/Images/headerimage.png";

// Import navigation hook from React Router
import { useNavigate } from "react-router-dom";

import AOS from 'aos';
import 'aos/dist/aos.css';


/**
 * Hero component: renders the landing section with background image,
 * heading, description, and navigation buttons.
 */
const Hero = () => {
  const navigate = useNavigate(); // Enables navigation via buttons

  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration in ms
      once: true,     // only animate once
    });
  }, []);

  return (
    <section
      className="hero-section d-flex"
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundImage: heroImage ? `url(${heroImage})` : undefined, // Prevents empty src warning
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "#fff",
        paddingTop: "80px",
        WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 80%, rgba(0,0,0,0.5) 90%, rgba(0,0,0,0) 100%)",
      }}
    >
      <div
        className="hero-content container text-center text-lg-start"
        style={{ position: "relative", zIndex: 2, paddingTop: "4rem" }}
      >
        <Row className="align-items-center" style={{ paddingTop: "4rem" }}>
          <Col lg={6} className="mb-5 mb-lg-0" data-aos="fade-up">
            <h1 className="fw-bold display-5 mb-3"
              style={{ fontFamily: 'heading' }}>
              Start Your Journey to Better Mental Health
            </h1>
            <p
              data-aos="fade-left" data-aos-delay="100"
              className="lead mb-4"
              style={{
                color: "rgba(255, 255, 255, 0.9)",
                fontSize: "1.25rem",
                fontFamily: "heading",
              }}
            >
              Obeeoma professional mental health service.
            </p>
          </Col>

          {/* Right column containing the two buttons */}
          <Col
            lg={6}
            className="d-flex justify-content-end"
            data-aos="fade-up" data-aos-delay="200"
            style={{ position: "relative", top: "150px" }}
          >
            {/* Wrapper div to handle button layout and spacing */}
            <div className="d-flex flex-column flex-sm-row gap-3">
              {/* === Primary Button: Green background, white text === */}
              {/* NOTE: We remove the onMouseEnter/onMouseLeave handlers here
                  and assume a CSS class (like .hero-primary-btn:hover) handles
                  the hover state, which is the best practice. */}
              <Button
                className="rounded-pill px-5 py-3 fw-semibold hero-primary-btn" // Added a custom class for CSS hover
                style={{
                  backgroundColor: "green",
                  borderColor: "",
                  color: "#fff",
                  transition: "all 0.3s ease",
                  fontFamily: "heading",
                }}
                onClick={() => navigate("/signup")}
              >
                Sign Up For Organization
              </Button>

              {/* === Secondary Button: Soft white background, green text === */}
              {/* NOTE: Corrected styles for a white/transparent background with green text. */}
              <Button
                className="rounded-pill px-5 py-3 fw-semibold hero-secondary-btn" // Added a custom class for CSS hover
                style={{
                  backgroundColor: "#3CB371", // Soft white background
                  color: "#3CB371", // Green text color
                  border: `1px solid ${"#3CB371"}`, // Green border
                  outline: "none",
                  boxShadow: "none",
                  transition: "all 0.3s ease",
                  fontFamily: "heading",
                }}
                onClick={() => navigate("/login")}
              >
                Sign In
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default Hero;