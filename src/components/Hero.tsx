import { Button, Row, Col } from "react-bootstrap";
import heroImage from "@/assets/Images/headerimage.png";
import { useNavigate } from "react-router-dom";
import "@/index.css";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section
      className="hero-section d-flex align-items-center"
      style={{
        position: "relative",
        minHeight: "85vh",
        backgroundImage: `url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "#fff",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 1,
        }}></div>

      <div
        className="hero-content container text-center text-lg-start"
        style={{ position: "relative", zIndex: 2, paddingTop: "4rem" }}>
        <Row className="align-items-center">
          <Col lg={6} className="mb-5 mb-lg-0">
            <h1 className="fw-bold display-5 mb-3">
              Start Your Journey to Better Mental Health
            </h1>
            <p
              className="lead mb-4"
              style={{ color: "rgba(255, 255, 255, 0.9)", fontSize: "1.25rem" }}
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
            {/* Hide the image on large screens since background covers */}
            <img
              src={heroImage}
              alt="Obeeoma workplace support"
              className="img-fluid rounded-4 shadow-lg d-lg-none"
            />
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default Hero;
