import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import missionImage from "../../assets/Images/potraidtraditional.jpg";
import { FaUsers, FaClock, FaSmile } from "react-icons/fa";

const AboutMission: React.FC = () => {
  return (
    <div
      className="about-mission-wrapper"
      data-testid="about-mission"
      style={{
        backgroundColor: "#fff",
        // color: "white",
        paddingTop: "4rem",
        paddingBottom: "4rem",
      }}
    >
      <Container>
        {/* Mission Heading and Statement */}
        <Row className="align-items-center mb-5">
          <Col md={6}>
            <h2
              style={{
                fontFamily: "heading",
                fontSize: "3rem",
                fontWeight: "bold",
                marginBottom: "1.5rem",
                color: "#0B6E45",
              }}
            >
              Our Mission
            </h2>
            <p
              className="lead"
              style={{
                fontSize: "1.2rem",
                maxWidth: "100%",
                margin: 0,
              }}
            >
              We believe everyone deserves access to quality mental health care
              in a safe, supportive environment. With years of experience and a
              deep understanding of anxiety disorders, we provide comprehensive
              care that addresses both the symptoms and underlying causes of
              mental health challenges.
            </p>

            {/* Stats Row with Cards */}
            <Row className="text-center" style={{ marginTop: "2rem" }}>
              <Col xs={12} md={3} className="mb-4">
                <Card
                  style={{
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                >
                  <Card.Body>
                    <FaUsers
                      size={32}
                      style={{ color: "#0B6E45", marginBottom: "0.5rem" }}
                    />
                    <h5 style={{ fontWeight: "bold", color: "#0B6E45" }}>
                      500+
                    </h5>
                    <p className="mb-0">Clients Helped</p>
                  </Card.Body>
                </Card>
              </Col>

              <Col xs={12} md={3} className="mb-4">
                <Card
                  style={{
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                >
                  <Card.Body>
                    <FaClock
                      size={32}
                      style={{ color: "#0B6E45", marginBottom: "0.5rem" }}
                    />
                    <h5 style={{ fontWeight: "bold", color: "#0B6E45" }}>
                      15+
                    </h5>
                    <p className="mb-0">Years Experience</p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>

          {/* Mission Image */}
          <Col md={6} style={{ position: "relative" }}>
            <img
              src={missionImage}
              alt="Mental health professional"
              style={{
                width: "70%",
                height: "120%",
                borderRadius: "8px",
              }}
            />

            <Card
              style={{
                position: "absolute",
                bottom: "20px",
                left: "20px",
                width: "200px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                backgroundColor: "#fff",
                border: "none",
              }}
            >
              <Card.Body>
                <FaSmile
                  size={32}
                  style={{ color: "#0B6E45", marginBottom: "0.5rem" }}
                />
                <h3
                  style={{
                    fontSize: "2rem",
                    fontWeight: "bold",
                    color: "#0B6E45",
                  }}
                >
                  98%
                </h3>
                <p className="mb-0">Satisfaction Rate</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AboutMission;
