import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import obeeomalogoicon2 from '../../assets/Images/obeeomalogoicon2.svg';

/**
 * Hero section with animated background and decorative graphics.
 * Converted from TailwindCSS to React-Bootstrap with equivalent styling and animation.
 */
export function HeroSection() {
    // Track when the component has mounted to trigger entrance animations
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <section
            id="about-us"
            style={{
                position: 'relative',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                backgroundImage:
                    'linear-gradient(to bottom right, #9DD3AF, #3CB371, #0B6E45)',
            }}
        >
            {/* Background Image with Gradient Overlay */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 0,
                }}
            >
                <img
                    src={obeeomalogoicon2}
                    alt="Obeeoma logo icon"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: 0.4,
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage:
                            'linear-gradient(to right, rgba(60,179,113,0.8), rgba(11,110,69,0.6))',
                    }}
                />
            </div>

            {/* Animated Circle Graphic */}
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    right: '10%',
                    transform: 'translateY(-50%)',
                    transition: 'all 1s ease',
                    opacity: isLoaded ? 1 : 0,
                    transformOrigin: 'center',
                    scale: isLoaded ? 1 : 0.5,
                }}
            >
                <img
                    src={obeeomalogoicon2}
                    alt="Obeeoma background graphic"
                    style={{
                        width: '200px',
                        height: '200px',
                        objectFit: 'contain',
                        opacity: 0.4,
                    }}
                />
            </div>

            {/* Content */}
            <Container
                style={{
                    position: 'relative',
                    zIndex: 10,
                    paddingLeft: '1rem',
                    paddingRight: '1rem',
                }}
            >
                <div style={{ maxWidth: '768px' }}>
                    <h1
                        style={{
                            fontSize: '4rem',
                            fontWeight: 'bold',
                            color: '#ffffff',
                            marginBottom: '1.5rem',
                            transition: 'all 1s ease',
                            transitionDelay: '0.2s',
                            opacity: isLoaded ? 1 : 0,
                            transform: isLoaded ? 'translateY(0)' : 'translateY(40px)',
                        }}
                    >
                        Who We Are
                    </h1>
                    <p
                        style={{
                            fontSize: '1.25rem',
                            lineHeight: 1.6,
                            color: '#f3f4f6', // gray-100
                            transition: 'all 1s ease',
                            transitionDelay: '0.4s',
                            opacity: isLoaded ? 1 : 0,
                            transform: isLoaded ? 'translateY(0)' : 'translateY(40px)',
                        }}
                    >
                        We believe that everyone deserves access to quality mental healthcare, regardless of who
                        or where they are.
                    </p>
                </div>
            </Container>
        </section>
    );
}