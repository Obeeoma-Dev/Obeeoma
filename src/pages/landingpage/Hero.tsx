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
        WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 85%, rgba(0,0,0,0.5) 95%, rgba(0,0,0,0) 100%)"
      }}
    >
      <div
        className="hero-content container text-center text-lg-start"
        style={{ position: "relative", zIndex: 2, paddingTop: "4rem" }} >
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
                fontFamily: 'heading'
              }}
            >
              Obeeoma professional mental health service.
            </p>
          </Col>
          <Col
            lg={6}
            className="d-flex justify-content-end"
            data-aos="fade-up" data-aos-delay="200"
            style={{ position: "relative", top: "150px" }}
          >
            <div className="d-flex flex-column flex-sm-row gap-3">

              <Button
                className="rounded-pill px-5 py-3 fw-semibold" // Rounded, padded, bold
                style={{
                  backgroundColor: "#0B6E45", // Default dark green background
                  borderColor: "#0B6E45", // Match border color
                  color: "#fff", // Default white text
                  transition: "all 0.3s ease", // Smooth color transitions
                  fontFamily: "body", // Custom font
                }}
                // On hover: switch to light green background with dark green text
                onMouseEnter={(e) => {
                  const btn = e.currentTarget as HTMLButtonElement;
                  btn.style.backgroundColor = "#fff"; // Light green background
                  btn.style.color = "#0B6E45"; // Dark green text
                }}
                // On leave: revert to dark green background with white text
                onMouseLeave={(e) => {
                  const btn = e.currentTarget as HTMLButtonElement;
                  btn.style.backgroundColor = "#0B6E45"; // Dark green background
                  btn.style.color = "#fff"; // White text
                }}
                // On click: navigate to signup page
                onClick={() => navigate("/signup")}
              >
                For Organizations
              </Button>


              <Button
                className="rounded-pill px-5 py-3 fw-semibold"
                style={{
                  backgroundColor: "#fff", // Default: white background
                  color: "#00A859", // Default: green text
                  border: "2px solid #00A859", // Match border to green
                  outline: "none",
                  boxShadow: "none",
                  transition: "all 0.3s ease", // Smooth color transition
                  fontFamily: "body",
                }}

                onFocus={(e) => {
                  e.currentTarget.style.outline = "none";
                  e.currentTarget.style.boxShadow = "none";
                }}

                // On hover: swap to green background and white text
                onMouseEnter={(e) => {
                  const btn = e.currentTarget as HTMLButtonElement;
                  btn.style.backgroundColor = "#00A859";
                  btn.style.color = "#fff";
                }}
                // On mouse leave: revert to white background and green text
                onMouseLeave={(e) => {
                  const btn = e.currentTarget as HTMLButtonElement;
                  btn.style.backgroundColor = "#fff";
                  btn.style.color = "#00A859";
                }}
                // Navigate to login page when clicked
                onClick={() => navigate("/login")}
              >
                For Employees
              </Button>

            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default Hero;
