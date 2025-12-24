<<<<<<< HEAD
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useScrollAnimation } from '../../hooks/useScrollAnimtion';
import Ourstory from '../../assets/Images/ourstory.png';

/**
 * Our Story section with split layout.
 * Uses React-Bootstrap for layout and custom CSS for scroll-triggered animations.
 */
export function OurStorySection() {
    // Hook to animate the image when it enters the viewport
    const [imageRef, imageVisible] = useScrollAnimation({ threshold: 0.3 });

    // Hook to animate the content panel when it enters the viewport
    const [contentRef, contentVisible] = useScrollAnimation({ threshold: 0.3 });

    return (
        <section
            id="story"
            style={{
                paddingTop: '5rem',
                paddingBottom: '5rem',
                backgroundColor: '#f9fafb', // Tailwind's gray-50
            }}
        >
            <Container>
                <Row className="g-0 align-items-stretch">
                    {/* Image Side */}
                    <Col
                        md={6}
                        ref={imageRef}
                        style={{
                            position: 'relative',
                            minHeight: '600px',
                            transition: 'all 1s ease',
                            opacity: imageVisible ? 1 : 0,
                            transform: imageVisible ? 'translateX(0)' : 'translateX(-40px)',
                        }}
                    >
                        <img
                            src={Ourstory}
                            alt="Professional woman in green dress"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                        />
                    </Col>

                    {/* Content Side */}
                    <Col
                        md={6}
                        ref={contentRef}
                        style={{
                            backgroundColor: '#0B6E45',
                            color: '#ffffff',
                            padding: '2rem',
                            paddingTop: '3rem',
                            paddingBottom: '3rem',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            transition: 'all 1s ease',
                            transitionDelay: '0.2s',
                            opacity: contentVisible ? 1 : 0,
                            transform: contentVisible ? 'translateX(0)' : 'translateX(40px)',
                        }}
                    >
                        {/* Main Heading */}
                        <h2
                            style={{
                                fontFamily: "heading",
                                textTransform: "uppercase",
                                letterSpacing: "0.1em",
                                color: "#a7f3d0",
                                marginBottom: "1rem",
                                fontSize: "2.5rem", // larger size for emphasis
                                fontWeight: "700",
                            }}
                        >
                            Our Story
                        </h2>

                        {/* Supporting Paragraph */}
                        <p
                            style={{
                                fontFamily: "body",
                                marginBottom: "2rem",
                                fontSize: "1.125rem", // around text-lg
                                lineHeight: "1.6",
                                color: "#d1d5db", // subtle gray for contrast
                            }}
                        >
                            HELP FOR ANXIETY AND DEPRESSION
                        </p>


                        {/* Section Paragraphs */}
                        <div
                            style={{
                                fontSize: '1.125rem',
                                lineHeight: 1.75,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1.5rem',
                                fontFamily: "body"
                            }}
                        >
                            <p>
                                Across Africa, too many employees quietly carry the weight of{' '}
                                <span style={{ fontWeight: 600 }}>anxiety, depression, and stress</span> while
                                pretending everything is fine. Talking about mental health is still taboo in many
                                workplaces, leaving people to struggle in silence.
                            </p>

                            <p>
                                We knew it didn't have to be this way. By blending{' '}
                                <span style={{ fontWeight: 600 }}>AI innovation with culturally grounded care</span>,
                                we created Obeeoma, a platform that makes mental health support{' '}
                                <span style={{ fontWeight: 600 }}>accessible, stigma-free, and scalable</span>.
                            </p>

                            <p>
                                Today, Obeeoma is more than technology. It's a commitment to put{' '}
                                <span style={{ fontWeight: 600 }}>
                                    mental well-being at the center of Africa's workforce
                                </span>
                                , so every good heart can thrive.
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}
=======
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useScrollAnimation } from "../../hooks/useScrollAnimtion";
import Digitalmap from "../../assets/Images/Digital-map-of-africa-network-connection.jpg";

/**
 * Our Story section with split layout.
 * Uses React-Bootstrap for layout and custom CSS for scroll-triggered animations.
 */
export function OurStorySection() {
  // Hook to animate the image when it enters the viewport
  const [imageRef, imageVisible] = useScrollAnimation({ threshold: 0.3 });

  // Hook to animate the content panel when it enters the viewport
  const [contentRef, contentVisible] = useScrollAnimation({ threshold: 0.3 });

  return (
    <section
      id="story"
      style={{
        paddingTop: "5rem",
        paddingBottom: "5rem",
        backgroundColor: "#f9fafb", // Tailwind's gray-50
      }}
    >
      <Container>
        <Row className="g-0 align-items-stretch">
          {/* Image Side */}
          <Col
            md={6}
            ref={imageRef}
            style={{
              position: "relative",
              minHeight: "600px",
              transition: "all 1s ease",
              opacity: imageVisible ? 1 : 0,
              transform: imageVisible ? "translateX(0)" : "translateX(-40px)",
            }}
          >
            <img
              src={Digitalmap}
              alt="Professional woman in green dress"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Col>

          {/* Content Side */}
          <Col
            md={6}
            ref={contentRef}
            style={{
              backgroundColor: "#047857", // Tailwind's emerald-700
              color: "#ffffff",
              padding: "2rem",
              paddingTop: "3rem",
              paddingBottom: "3rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              transition: "all 1s ease",
              transitionDelay: "0.2s",
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? "translateX(0)" : "translateX(40px)",
            }}
          >
            {/* Main Heading */}
            <h2
              style={{
                fontFamily: "heading",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#a7f3d0",
                marginBottom: "1rem",
                fontSize: "2.5rem", // larger size for emphasis
                fontWeight: "700",
              }}
            >
              Our Story
            </h2>

            {/* Supporting Paragraph */}
            <p
              style={{
                fontFamily: "body",
                marginBottom: "2rem",
                fontSize: "1.125rem", // around text-lg
                lineHeight: "1.6",
                color: "#d1d5db", // subtle gray for contrast
              }}
            >
              HELP FOR ANXIETY AND DEPRESSION
            </p>

            {/* Section Paragraphs */}
            <div
              style={{
                fontSize: "1.125rem",
                lineHeight: 1.75,
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                fontFamily: "body",
              }}
            >
              <p>
                Across Africa, too many employees quietly carry the weight of{" "}
                <span style={{ fontWeight: 600 }}>
                  anxiety, depression, and stress
                </span>{" "}
                while pretending everything is fine. Talking about mental health
                is still taboo in many workplaces, leaving people to struggle in
                silence.
              </p>

              <p>
                We knew it didn't have to be this way. By blending{" "}
                <span style={{ fontWeight: 600 }}>
                  AI innovation with culturally grounded care
                </span>
                , we created Obeeoma, a platform that makes mental health
                support{" "}
                <span style={{ fontWeight: 600 }}>
                  accessible, stigma-free, and scalable
                </span>
                .
              </p>

              <p>
                Today, Obeeoma is more than technology. It's a commitment to put{" "}
                <span style={{ fontWeight: 600 }}>
                  mental well-being at the center of Africa's workforce
                </span>
                , so every good heart can thrive.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
>>>>>>> main
