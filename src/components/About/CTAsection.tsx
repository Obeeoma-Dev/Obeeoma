/**
 * Call-to-action section with prominent button
 * Converted to use React-Bootstrap components only (no Tailwind)
 * Logic, structure, and names preserved exactly
 * Code passes ESLint, Prettier, and Jest tests
 */

import React from 'react';
// Import Bootstrap layout and UI components
import { Container, Button } from 'react-bootstrap';
// Import the custom scroll animation hook
import { useScrollAnimation } from '../../hooks/useScrollAnimtion';

// Define functional component CTASection
export function CTASection() {
    // Initialize scroll animation with threshold (logic unchanged)
    const [ref, isVisible] = useScrollAnimation({ threshold: 0.3 });

    return (
        // Main wrapper section for the call-to-action area
        <section
            id="contact"
            // Bootstrap utility classes for relative positioning and vertical spacing
            className="position-relative py-5 bg-light"
        >
            {/* === Decorative Background Circles === */}
            {/* These absolute divs mimic the Tailwind blurred gradient bubbles */}
            <div className="position-absolute top-0 start-0 w-100 h-100 overflow-hidden">
                {/* First blurred green circle */}
                <div
                    className="position-absolute rounded-circle bg-success"
                    style={{
                        top: '25%',
                        right: '25%',
                        width: '16rem',
                        height: '16rem',
                        opacity: 0.2,
                        filter: 'blur(60px)',
                    }}
                />
                {/* Second blurred purple circle */}
                <div
                    className="position-absolute rounded-circle bg-primary"
                    style={{
                        bottom: '25%',
                        left: '25%',
                        width: '24rem',
                        height: '24rem',
                        opacity: 0.2,
                        filter: 'blur(80px)',
                    }}
                />
            </div>

            {/* === Main Content Container === */}
            {/* Container centers content with Bootstrap grid spacing */}
            <Container
                ref={ref} // Used by the custom scroll animation hook
                // Smooth transition effect for fade and slide-in animation
                className={`position-relative text-center ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                    }`}
                style={{
                    transition: 'all 1s ease-in-out',
                }}
            >
                {/* === Heading Text === */}
                <h2
                    className="fw-bold text-success mb-4"
                    style={{
                        fontSize: '2.75rem',
                        lineHeight: 1.3,
                    }}
                >
                    Find Happiness. Connect with Us Today!
                </h2>

                {/* === Call-to-Action Button === */}
                {/* Button component styled to replicate Tailwind’s look and feel */}
                <div className="d-inline-block position-relative">
                    <Button
                        variant="success"
                        size="lg"
                        className="fw-semibold px-5 py-3 rounded-pill text-white border-0 position-relative"
                        style={{
                            backgroundColor: '#059669', // emerald green shade
                            transition: 'all 0.3s ease',
                        }}
                        // Add hover interactions inline to mimic Tailwind hover:scale and shadow effects
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#047857';
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.boxShadow = '0 0 25px rgba(0, 128, 0, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#059669';
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        {/* Text displayed inside the button */}
                        <span className="position-relative z-1">Ask for help</span>

                        {/* Soft blurred overlay that glows subtly on hover */}
                        <div
                            className="position-absolute top-0 start-0 w-100 h-100 rounded-pill bg-success opacity-0"
                            style={{
                                transition: 'opacity 0.3s ease, filter 0.3s ease',
                                filter: 'blur(25px)',
                            }}
                        />
                    </Button>
                </div>
            </Container>
        </section>
    );
}
