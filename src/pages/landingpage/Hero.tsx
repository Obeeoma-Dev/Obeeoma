// Import React and required hooks
import React from "react";

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
          <Col lg={6} className="mb-5 mb-lg-0">
            <h1 className="fw-bold display-5 mb-3"
              style={{ fontFamily: 'heading' }}>
              Start Your Journey to Better Mental Health
            </h1>
            <p
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

          {/* Right column containing the two buttons */}
          <Col
            lg={6}
            className="d-flex justify-content-end"
            
            style={{ position: "relative", top: "150px" }}
          >
            {/* Wrapper div to handle button layout and spacing */}
            <div className="d-flex flex-column flex-sm-row gap-3">

              {/* === Primary Button: Green background, white text === */}
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
                // Navigate to signup page when clicked
                onClick={() => navigate("/signup")}
              >
                Sign Up For Organization
              </Button>

              {/* === Secondary Button: Soft white background, green text === */}
              <Button
                className="rounded-pill px-5 py-3 fw-semibold" // Rounded shape, same padding, bold font
                style={{
                  backgroundColor: "#3CB371", // Green text
                  color: "rgba(250, 250, 250, 0.85)", // white background
                  border: "1px solid #3CB371", // Green border to match text
                  outline: "none", // Remove focus outline
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
