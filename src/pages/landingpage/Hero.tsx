import React, { useEffect } from "react";
import { Button, Row, Col } from "react-bootstrap";
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
        WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 80%, rgba(0,0,0,0.5) 90%, rgba(0,0,0,0) 100%)"
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
              }} >
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
                className="rounded-pill px-5 py-3 fw-semibold" // Rounded edges, padding, bold text
                style={{
                  backgroundColor: "#3CB371", // Initial gree#3CB371n background
                  borderColor: "#3CB371", // Match border with background
                  color: "#fff", // White text color
                  transition: "all 0.3s ease", // Smooth color transition on hover
                  fontFamily: 'heading'
                }}
                // When hovered: make green slightly darker
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                    "#0B6E45";
                }}
                // When mouse leaves: restore the original green
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                    "#3CB371";
                }}

                onClick={() => navigate("/signup")}>For Organizations
              </Button>

              <Button
                className="rounded-pill px-5 py-3 fw-semibold"
                style={{
                  backgroundColor: "#3CB371", 
                  color: "rgba(250, 250, 250, 0.85)", // white background
                  border: "1px solid #3CB371", 
                  outline: "none", 
                  boxShadow: "none", // Remove default shadow when focused
                  transition: "all 0.3s ease", // Smooth hover transition
                  fontFamily: 'heading'
                }}
                // On hover: make background fully white
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                    "#0B6E45";
                }}
                // On mouse leave: revert to soft white
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                    "#3CB371";
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
