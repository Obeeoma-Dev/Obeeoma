import { Button, Row, Col } from "react-bootstrap";
import heroImage from "@/assets/Images/headerimage.png";
import { useNavigate } from "react-router-dom";
import "@/index.css";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section
      className="hero-section text-white d-flex align-items-center"
      style={{
        background: "linear-gradient(135deg, #3CB371, #00A859, #ff4d4d)",
        minHeight: "85vh",
      }}
    >
    <div className="hero-content container text-center text-lg-start">
        <Row className="align-items-center">
          <Col lg={6} className="mb-5 mb-lg-0">
            <h1 className="fw-bold display-5">Start Your Journey to Better Mental Health</h1>
            <p className="lead mt-3 mb-4">
              Obeeoma provides mental health services tailored to your personal growth and wellbeing.
            </p>
            <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
              <Button variant="primary" size="lg" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6
                bg-gradient-to-r from-[#3CB371] to-[#ff4d4d] text-white border-0
                hover:opacity-90 transition-all" onClick={() => navigate("/signup")}>
                Sign up for my organization
              </Button>
              <Button variant="outline-light" className="btn-red-gradient rounded-pill px-5 py-3 fw-semibold" onClick={() => navigate("/login")}>
                Sign In
              </Button>
            </div>
          </Col>
          <Col lg={6} className="text-center">
            <img src={heroImage} alt="Obeeoma workplace support"
              className="img-fluid rounded-4 shadow-lg"/>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default Hero;
