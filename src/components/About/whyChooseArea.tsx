// Import React library
import React from 'react';

// Import Bootstrap components for layout and styling
import { Container, Row, Col, Image } from 'react-bootstrap';

// Import icon from Lucide React library
import { Sparkles, DollarSign, Lock, Globe, CheckCircleIcon } from 'lucide-react';

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
            description: "Built for Africa's young, digital-savvy workforce with cutting-edge technology",
            icon: <Sparkles size={40} color="#fff" />,
            bgColor: 'linear-gradient(135deg, #a855f7, #ec4899)', // for icon box
            accent: '#a855f7',
            accentRgb: '168, 85, 247', // R,G,B
        },
        {
            title: 'Affordable & scalable',
            description: 'Flexible subscription models for organizations of all sizes',
            icon: <DollarSign size={40} color="#fff" />,
            bgColor: '#10b981',
            accent: '#10b981',
            accentRgb: '16, 185, 129',
        },
        {
            title: 'Confidential & stigma-free',
            description: 'Safe space for mental health support without judgment',
            icon: <Lock size={40} color="#fff" />,
            bgColor: '#3b82f6',
            accent: '#3b82f6',
            accentRgb: '59, 130, 246',
        },
        {
            title: 'Culturally relevant',
            description: "Designed with Africa's unique workplace dynamics in mind",
            icon: <Globe size={40} color="#fff" />,
            bgColor: '#f97316',
            accent: '#f97316',
            accentRgb: '249, 115, 22',
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
                    <h2 className="display-5 fw-bold text-dark mb-3" style={{ fontFamily: "heading" }}>Why Choose Obeeoma?</h2>
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
                                    {/* Card wrapper with dynamic CSS variables for color and hover effects */}
                                    <div className="benefit-card p-5 h-100 d-flex flex-column justify-content-start"
                                        style={
                                            {
                                                '--accent': benefit.accent,
                                                '--accent-rgb': benefit.accentRgb,
                                                '--icon-bg': benefit.bgColor,
                                            } as React.CSSProperties
                                        }
                                    >
                                        {/* Icon box with dynamic background color */}
                                        <div className="icon-box mb-4">
                                            {benefit.icon}
                                        </div>

                                        {/* Text content: title and description */}
                                        <div>
                                            <h5 className="fw-bold text-dark mb-2" style={{ fontFamily: "heading", fontSize: '22px' }}>{benefit.title}</h5>
                                            {benefit.description && (
                                                <p className="text-muted mb-3" style={{ fontFamily: "body", fontSize: '16px' }}>{benefit.description}</p>
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