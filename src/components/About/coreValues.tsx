import React from "react";
// Import Bootstrap componets.
import { Container, Row, Col, Card } from "react-bootstrap";
// Import icons from react-icons.
import { FaHeart, FaShieldAlt, FaMedal } from "react-icons/fa";

// Define teh CoreValue component using React.FC (Functional Componet).
const CoreValue: React.FC = () => {
    return (
        // This container center content and adds horizontal padding.
        <Container className="my-5">
            {/* Section heading */}
            <h2 className="text-center mb-4"> Our Core Values </h2>

            {/* This row holds the three value cards */}
            <Row className="g-4">
                {/* First value: Compassion */}
                <Col md={4}>
                    <Card className="h-100 text-center border-0 shadow-sm">
                        <Card.Body>
                            {/* Icon with styling */}
                            <FaHeart size={40} className="text-danger mb-3" />
                            {/* Title */}
                            <Card.Title> Compassion </Card.Title>
                            {/* Description */}
                            <Card.Text>
                                We approach every client with empathy and genuine care.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Second value: Integrity */}
                <Col md={4}>
                    <Card className="h-100 text-center border-0 shadow-sm">
                        <Card.Body>
                            <FaShieldAlt size={40} className="text-primary mb-3" />
                            <Card.Title>Integrity</Card.Title>
                            <Card.Text>
                                We maintain the highest ethical standards and confidentiality.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Third value: Excellence */}
                <Col md={4}>
                    <Card className="h-100 text-center border-0 shadow-sm">
                        <Card.Body>
                            <FaMedal size={40} className="text-warning mb-3" />
                            <Card.Title>Excellence</Card.Title>
                            <Card.Text>
                                We stay current with the latest research and techniques.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default CoreValue;

