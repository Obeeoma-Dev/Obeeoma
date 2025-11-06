import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const AboutMission: React.FC = () => {
    return (
        <div
            className="about-mission-wrapper"
            data-testid="about-mission"
            style={{
                backgroundColor: "#3CB371", // Green header.
                color: "white",
                paddingTop: "4rem",
                paddingBottom: "4rem",
            }}
        >
            <Container>
                <Row className="justify-content-center text-center mb-5">
                    <Col md={10}>
                        {/* Mission Heading */}
                        <h2
                            className="mb-4"
                            style={{
                                fontFamily: "heading",
                                fontSize: "2rem",
                                fontWeight: "bold",
                            }}
                        >
                            Our Mission
                        </h2>

                        {/* Mission Statement */}
                        <p
                            className="lead"
                            style={{
                                fontSize: "1.2rem",
                                maxWidth: "800px",
                                margin: "0 auto",
                            }}
                        >
                            We believe everyone deserves access to quality mental health care
                            in a safe, supportive environment. With years of experience and a
                            deep understanding of anxiety disorders, we provide comprehensive
                            care that addresses both the symptoms and underlying causes of
                            mental health challenges.
                        </p>
                    </Col>
                </Row>

                {/* Stats Row */}
                <Row className="text-center">
                    <Col xs={12} md={4} className="mb-4">
                        <h3 style={{ fontSize: "2rem", fontWeight: "bold" }}>500+</h3>
                        <p className="mb-0">Clients Helped</p>
                    </Col>
                    <Col xs={12} md={4} className="mb-4">
                        <h3 style={{ fontSize: "2rem", fontWeight: "bold" }}>15+</h3>
                        <p className="mb-0">Years Experience</p>
                    </Col>
                    <Col xs={12} md={4} className="mb-4">
                        <h3 style={{ fontSize: "2rem", fontWeight: "bold" }}>98%</h3>
                        <p className="mb-0">Satisfaction Rate</p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AboutMission;