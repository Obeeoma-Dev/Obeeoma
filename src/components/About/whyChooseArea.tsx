// Import React library
import React from 'react';

// Import Bootstrap components for layout and styling
import { Container, Row, Col, Image } from 'react-bootstrap';

// Import icon from Lucide React library
import { CheckCircleIcon } from 'lucide-react';

// Import custom scroll animation hook
import { useScrollAnimation } from '../../hooks/useScrollAnimtion';

// Import image asset
import Businesswomen from '../../assets/Images/Businesswomen.jpg';

// Define functional React component
export function WhyChooseSection() {
    // Hook for animating the title when it enters the viewport
    const [titleRef, titleVisible] = useScrollAnimation({ threshold: 0.3 });

    // Hook for animating the benefits list when it enters the viewport
    const [listRef, listVisible] = useScrollAnimation({ threshold: 0.3 });

    // Define an array of benefits to display
    const benefits = [
        {
            title: 'AI-first & innovative',
            description: "Built for Africa's young, digital-savvy workforce",
        },
        {
            title: 'Affordable & scalable',
            description: 'Flexible subscription model for organizations of all sizes',
        },
        {
            title: 'Confidential, stigma-free, and always accessible',
            description: 'Safe space for mental health support without judgment',
        },
        {
            title: 'Culturally relevant',
            description: "Designed with Africa's unique workplace dynamics in mind",
        },
    ];

    // Return JSX markup for the component
    return (
        // Section wrapper with padding and background color
        <section className="why-choose-section py-5 bg-light">
            {/* Bootstrap container centers content and adds horizontal padding */}
            <Container>
                {/* Title section with scroll animation */}
                <div
                    ref={titleRef}
                    className={`text-center mb-5 transition-all ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                        }`}
                >
                    {/* Main heading */}
                    <h2 className="display-5 fw-bold text-dark mb-3">Why Choose Obeeoma?</h2>
                </div>

                {/* First Row: Benefits list */}
                <Row className="align-items-center mb-5">
                    {/* Column for benefits list with scroll animation */}
                    <Col
                        lg={12}
                        ref={listRef}
                        className={`transition-all ${listVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-n3'
                            }`}
                    >
                        {/* Row to layout cards side by side */}
                        <Row className="gy-4 gx-4">
                            {/* Loop through each benefit and render a card */}
                            {benefits.map((benefit, index) => (
                                <Col key={index} lg={6} md={6} sm={12}>
                                    {/* Card container with hover effect */}
                                    <div
                                        className="d-flex align-items-start p-5 rounded shadow-sm h-100"
                                        style={{
                                            backgroundColor: '#f9fdf9', // light background
                                            border: '1px solid #e0e0e0', // subtle border
                                            transition: 'transform 0.3s ease, box-shadow 0.3s ease', // smooth hover
                                            cursor: 'pointer', // pointer cursor
                                            minHeight: '240px', // taller card
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'scale(1.03)'; // zoom on hover
                                            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.2)'; // deeper shadow
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'scale(1)'; // reset zoom
                                            e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)'; // soft shadow
                                        }}
                                    >
                                        {/* Icon box on the left side */}
                                        <div
                                            style={{
                                                width: '48px', // square size
                                                height: '48px',
                                                backgroundColor: '#047857', // emerald green
                                                borderRadius: '0.5rem', // rounded corners
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexShrink: 0, // prevent shrinking
                                                marginRight: '1rem', // spacing from text
                                                marginTop: '0.25rem', // vertical alignment
                                            }}
                                        >
                                            {/* White check icon inside box */}
                                            <CheckCircleIcon size={24} color="#fff" />
                                        </div>

                                        {/* Text content on the right side */}
                                        <div>
                                            <h5 className="fw-semibold text-dark mb-2">{benefit.title}</h5>
                                            {/* Show description only if it exists */}
                                            {benefit.description && (
                                                <p className="text-muted mb-0">{benefit.description}</p>
                                            )}
                                        </div>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>

                {/* Second Row: Image section */}
                <Row className="justify-content-center align-items-center">
                    <Col lg={10}>
                        {/* Image container with fixed height */}
                        <div className="card-scale" style={{ height: '500px' }}>
                            <Image
                                src={Businesswomen}
                                alt="Happy people embracing"
                                fluid
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        </div>
                    </Col>

                    {/* Empty column for layout balance */}
                    <Col lg={6} className="order-lg-2 order-1" />
                </Row>
            </Container>
        </section>
    );
}