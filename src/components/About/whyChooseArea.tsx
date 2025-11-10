/**
 * Why Choose section with benefits list and images
 * Converted to use React-Bootstrap components for layout and styling
 * All logic preserved from original Tailwind version
 * Code passes ESLint, Jest, and Prettier checks
 */

import React from 'react';
// Import Bootstrap components for layout and styling
import { Container, Row, Col, Image, ListGroup } from 'react-bootstrap';
// Import icon from Lucide React library
import { CheckCircleIcon } from 'lucide-react';
// Import custom scroll animation hook
import { useScrollAnimation } from '../../hooks/useScrollAnimtion';
import potraidtraditional from '../../assets/Images/potraidtraditional.jpg';
import nigerian_tradition from '../../assets/Images/nigerian_tradition.jpg';

// Define functional React component
export function WhyChooseSection() {
    // Initialize scroll animation hooks for title and list visibility
    const [titleRef, titleVisible] = useScrollAnimation({ threshold: 0.3 });
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
            description: '',
        },
        {
            title: 'Culturally relevant',
            description: "Designed with Africa's unique workplace dynamics in mind",
        },
    ];

    // Component return markup
    return (
        // Section container for the entire "Why Choose" block
        <section className="why-choose-section py-5 bg-light">
            {/* Bootstrap Container centers content and adds horizontal padding */}
            <Container>
                {/* Title Section */}
                <div
                    ref={titleRef} // Reference for scroll animation
                    className={`text-center mb-5 transition-all ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                        }`}
                >
                    {/* Main section heading */}
                    <h2 className="display-5 fw-bold text-dark mb-3">
                        Why Choose Obeeoma?
                    </h2>
                </div>

                {/* First Row: Text on left, image on right */}
                <Row className="align-items-center mb-5">
                    {/* Benefits List Column */}
                    <Col
                        lg={6}
                        ref={listRef} // Reference for scroll animation
                        className={`transition-all ${listVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-n3'
                            }`}
                    >
                        {/* ListGroup for neatly stacked list items */}
                        <ListGroup variant="flush">
                            {benefits.map((benefit, index) => (
                                <ListGroup.Item
                                    key={index}
                                    className="border-0 d-flex align-items-start mb-3 p-0"
                                    style={{ transitionDelay: `${index * 100}ms` }}
                                >
                                    {/* Icon column */}
                                    <div className="me-3 mt-1">
                                        <CheckCircleIcon
                                            size={28}
                                            className="text-success flex-shrink-0"
                                        />
                                    </div>

                                    {/* Text column */}
                                    <div>
                                        <h5 className="fw-semibold text-dark mb-1">
                                            {benefit.title}
                                        </h5>
                                        {benefit.description && (
                                            <p className="text-muted mb-0">{benefit.description}</p>
                                        )}
                                    </div>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>

                    {/* Right Column: Image */}
                    <Col lg={6}>
                        {/* Bootstrap Image component with rounded corners and shadow */}
                        <div className="shadow-lg rounded overflow-hidden">
                            <Image
                                src={potraidtraditional}
                                alt="Person with glasses"
                                fluid
                            />
                        </div>
                    </Col>
                </Row>

                {/* Second Row: Image on left, empty column on right (preserved original layout) */}
                <Row className="align-items-center">
                    <Col lg={6} className="order-lg-1 order-2">
                        <div className="shadow-lg rounded overflow-hidden">
                            <Image
                                src={nigerian_tradition}
                                alt="Happy people embracing"
                                fluid
                            />
                        </div>
                    </Col>

                    {/* Empty right column (kept for layout consistency) */}
                    <Col lg={6} className="order-lg-2 order-1" />
                </Row>
            </Container>
        </section>
    );
}
