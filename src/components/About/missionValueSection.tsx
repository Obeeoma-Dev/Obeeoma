import React from 'react';
import { Container } from 'react-bootstrap';
import { useScrollAnimation } from '../../hooks/useScrollAnimtion';
import Bussinesshandshake from '../../assets/Images/bussinesshandshake.jpg';
/**
 * Mission and Values section with background image.
 * Uses React-Bootstrap for layout and inline styles for fade-in animations.
 */
export function MissionValuesSection() {
    // Hook to animate the mission block when it enters the viewport
    const [missionRef, missionVisible] = useScrollAnimation({ threshold: 0.3 });

    // Hook to animate the values block when it enters the viewport
    const [valuesRef, valuesVisible] = useScrollAnimation({ threshold: 0.3 });

    return (
        <section
            style={{
                position: 'relative',
                paddingTop: '5rem',
                paddingBottom: '5rem',
                backgroundColor: '#ffffff',
            }}
        >
            {/* Background Image Layer */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0.1,
                    zIndex: 0,
                }}
            >
                <img
                    src={Bussinesshandshake}
                    alt="Workplace background"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />
            </div>

            {/* Dark Overlay Layer */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(0,0,0,0.2)', // adjust opacity here
                    zIndex: 1,
                }}
            />



            {/* Foreground Content */}
            <div
                style={{
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                <Container>
                    <div
                        style={{
                            maxWidth: '960px',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                        }}
                    >
                        {/* Mission Block */}
                        <div
                            ref={missionRef}
                            style={{
                                marginBottom: '4rem',
                                transition: 'all 1s ease',
                                opacity: missionVisible ? 1 : 0,
                                transform: missionVisible ? 'translateY(0)' : 'translateY(40px)',
                            }}
                        >
                            <h2
                                style={{
                                    fontSize: '2.5rem',
                                    fontWeight: 700,
                                    color: '#047857', // emerald-700
                                    marginBottom: '1.5rem',
                                    fontFamily: 'heading'
                                }}
                            >
                                Our Mission
                            </h2>
                            <p
                                style={{
                                    fontSize: '1.25rem',
                                    lineHeight: 1.6,
                                    color: '#374151', // gray-700
                                    fontFamily: 'body'
                                }}
                            >
                                To make{' '}
                                <span style={{ fontWeight: 600, color: '#047857' }}>
                                    mental health support accessible, affordable, and stigma-free
                                </span>{' '}
                                for every workplace across Africa, using the power of AI and human expertise.
                            </p>
                        </div>

                        {/* Values Block */}
                        <div
                            ref={valuesRef}
                            style={{
                                transition: 'all 1s ease',
                                transitionDelay: '0.2s',
                                opacity: valuesVisible ? 1 : 0,
                                transform: valuesVisible ? 'translateY(0)' : 'translateY(40px)',
                            }}
                        >
                            <h2
                                style={{
                                    fontSize: '2.5rem',
                                    fontWeight: 700,
                                    color: '#047857',
                                    marginBottom: '1.5rem',
                                    fontFamily: 'heading'
                                }}
                            >
                                Our Values
                            </h2>
                            <p
                                style={{
                                    fontSize: '1.25rem',
                                    lineHeight: 1.6,
                                    color: '#374151',
                                    fontFamily: 'body'
                                }}
                            >
                                A future where{' '}
                                <span style={{ fontWeight: 600, color: '#047857' }}>
                                    every African worker thrives mentally, emotionally, and professionally
                                </span>{' '}
                                —in organizations that prioritize well-being as much as productivity.
                            </p>
                        </div>
                    </div>
                </Container>
            </div>
        </section>
    );
}
