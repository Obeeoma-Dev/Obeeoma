import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import floralTop from "../../../assets/Images/generate a white log.png";

const AboutHeader: React.FC = () => {
    return (
        <div
            className="about-header-wrapper"
            data-testid="about-header"
            style={{
                backgroundColor: "#3CB371", // Green background
                color: "white",
                paddingTop: "6rem",
                paddingBottom: "6rem",
            }}
        >
            <Container>
                <Row className="justify-content-center text-center">
                    <Col md={8}>
                        {/* Logo and heading side-by-side */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "1rem", // This is the space between logo and heading.
                                marginBottom: "2rem", // This is the space below the row.
                            }}
                        >
                            {/* Logo/Icon beside heading */}
                            <img
                                src={floralTop}
                                alt="Obeeoma Icon"
                                style={{
                                    height: "50px", // Slightly larger for visibility
                                    width: "50px",
                                    objectFit: "contain",
                                }}
                                data-testid="about-header-icon"
                            />

                            {/* Title Section */}
                            <h2
                                style={{
                                    fontFamily: "heading",
                                    fontSize: "2.5rem",
                                    fontWeight: "bold",
                                    margin: 0,
                                }}
                            >
                                Who We Are
                            </h2>
                        </div>

                        {/* Description */}
                        <p
                            className="lead"
                            style={{
                                fontSize: "1.25rem",
                                maxWidth: "800px",
                                margin: "0 auto",
                            }}
                        >
                            We are a dedicated team of mental health professionals committed to providing compassionate, evidence-based care for individuals experiencing anxiety disorders and related mental health challenges.
                        </p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AboutHeader;