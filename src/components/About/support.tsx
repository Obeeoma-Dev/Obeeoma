// Import React and required Bootstrap components
import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { FaCheck } from 'react-icons/fa'; // Import checkmark icon

// Define the component using React Functional Component syntax
const AnxietySupport: React.FC = () => {
    return (
        // Wrapper div for styling and spacing
        <div
            className="anxiety-support-wrapper"
            data-testid="anxiety-support"
            style={{
                backgroundColor: '#F5F5F5', // Light gray background
                paddingTop: '4rem', // Top spacing
                paddingBottom: '4rem', // Bottom spacing
            }}
        >
            {/* Bootstrap container for layout */}
            <Container>
                {/* Row to organize content horizontally */}
                <Row className="align-items-center">
                    {/* Left column for text content */}
                    <Col md={6}>
                        {/* Section heading */}
                        <h2
                            style={{
                                fontFamily: 'heading',
                                fontSize: '2.5rem',
                                fontWeight: 'bold',
                                marginBottom: '1rem',
                                color: '#0B6E45', // Dark green text
                            }}
                        >
                            Comprehensive Support for Anxiety Disorders
                        </h2>

                        {/* Description paragraph */}
                        <p
                            style={{
                                fontSize: '1.1rem',
                                marginBottom: '2rem',
                            }}
                        >
                            Our specialized approach combines proven therapeutic techniques
                            with compassionate care to help you manage and overcome anxiety.
                        </p>

                        {/* List of features as cards */}
                        <Row>
                            <Col xs={12} className="mb-3">
                                <Card
                                    style={{
                                        border: 'none',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                                        borderLeft: '4px solid #0B6E45', // Green accent at the bottom
                                    }}
                                >
                                    <Card.Body style={{ display: 'flex', alignItems: 'center' }}>
                                        <FaCheck style={{ color: '#0B6E45', marginRight: '0.75rem' }} />
                                        <span>Evidence-Based Therapy (CBT, DBT, etc.)</span>
                                    </Card.Body>
                                </Card>
                            </Col>

                            <Col xs={12} className="mb-3">
                                <Card
                                    style={{
                                        border: 'none',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                                        borderLeft: '4px solid #0B6E45',
                                    }}
                                >
                                    <Card.Body style={{ display: 'flex', alignItems: 'center' }}>
                                        <FaCheck style={{ color: '#0B6E45', marginRight: '0.75rem' }} />
                                        <span>Personalized Treatment Plans</span>
                                    </Card.Body>
                                </Card>
                            </Col>

                            <Col xs={12} className="mb-3">
                                <Card
                                    style={{
                                        border: 'none',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                                        borderLeft: '4px solid #0B6E45',
                                    }}
                                >
                                    <Card.Body style={{ display: 'flex', alignItems: 'center' }}>
                                        <FaCheck style={{ color: '#0B6E45', marginRight: '0.75rem' }} />
                                        <span>Ongoing Support & Follow-up</span>
                                    </Card.Body>
                                </Card>
                            </Col>

                            <Col xs={12} className="mb-3">
                                <Card
                                    style={{
                                        border: 'none',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                                        borderLeft: '4px solid #0B6E45',
                                    }}
                                >
                                    <Card.Body style={{ display: 'flex', alignItems: 'center' }}>
                                        <FaCheck style={{ color: '#0B6E45', marginRight: '0.75rem' }} />
                                        <span>Safe & Confidential Environment</span>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>

                        {/* Call-to-action button */}
                        <Button
                            variant="success"
                            style={{ marginTop: '1rem', padding: '0.75rem 1.5rem' }}
                        >
                            Start Your Journey Today
                        </Button>
                    </Col>

                    {/* Right column for image (optional) */}
                    <Col md={6} style={{ textAlign: 'center' }}>
                        <img
                            // src={require('../../../assets/Images/anxiety-support.jpg')} 
                            alt="Therapy session"
                            style={{
                                width: '100%',
                                maxWidth: '500px',
                                borderRadius: '8px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            }}
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

// Export the component so it can be used in other files
export default AnxietySupport;