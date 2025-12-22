// Import React and required hooks
import React, { useEffect, useState } from "react";

// Import layout container from React Bootstrap
import { Container } from "react-bootstrap";

// Import logo and background image assets
import obeeomalogoicon2 from "../../assets/Images/obeeomalogoicon2.svg";
import africanImage from "../../assets/Images/africa.jpg";

// Import AOS animation library
import AOS from "aos";
import "aos/dist/aos.css";

/**
 * TEMPORARY About Us Hero Section for Presentation
 * Matches homepage visual style — refactor into reusable component after demo
 */
export function AboutUsHero() {
  // Track when the component has mounted to trigger entrance animations
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize AOS animations on mount
  useEffect(() => {
    setIsLoaded(true); // Trigger fade-in animations
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: true, // Animate only once per element
    });
  }, []);

  return (
    <section
      id="about-us"
      style={{
        position: "relative", // Allows layering of background and content
        minHeight: "100vh", // Full viewport height
        display: "flex", // Flexbox layout for centering
        alignItems: "center", // Vertically center content
        justifyContent: "center", // Horizontally center content
        overflow: "hidden", // Hide overflow from background layers
        backgroundImage: `url(${africanImage})`, // Use African.jpg as background
        backgroundSize: "cover", // Ensure image covers entire section
        backgroundPosition: "center", // Center the image
        backgroundRepeat: "no-repeat", // Prevent image tiling
      }}
    >
      {/* Gradient Overlay on top of background image */}
      <div
        style={{
          position: "absolute", // Layer over background
          inset: 0, // Stretch to fill section
          zIndex: 0, // Behind content
          backgroundImage:
            "linear-gradient(to right, rgba(20,70,50,0.85), rgba(5,40,25,0.7))", // Green overlay
        }}
      />

      {/* Animated Logo Graphic */}
      <div
        data-aos="fade-up" // AOS animation: fade up
        style={{
          position: "absolute", // Float over background
          top: "50%", // Vertically center
          right: "10%", // Position near right edge
          transform: "translateY(-50%)", // Perfect vertical centering
          transition: "all 1s ease", // Smooth entrance
          opacity: isLoaded ? 1 : 0, // Fade in
          transformOrigin: "center", // Scale from center
          scale: isLoaded ? 1 : 0.5, // Scale up on load
        }}
      >
        <img
          src={obeeomalogoicon2} // Logo image
          alt="Obeeoma logo icon"
          style={{
            width: "auto", // Fixed width
            height: "500px", // Fixed height
            objectFit: "contain", // Preserve aspect ratio
            opacity: 0.4, // Slight transparency
          }}
        />
      </div>

      {/* Main Text Content */}
      <Container
        style={{
          position: "relative", // Layer above background
          zIndex: 10, // Ensure visibility
          paddingLeft: "1rem", // Responsive padding
          paddingRight: "1rem",
        }}
      >
        <div style={{ maxWidth: "768px" }}>
          {/* Heading with animation */}
          <h1
            data-aos="fade-up" // AOS animation: fade up
            className="fw-bold display-5 mb-3" // Bootstrap font and spacing
            style={{
              fontSize: "4rem", // Large heading
              fontWeight: "bold", // Emphasized text
              color: "#ffffff", // White text
              marginBottom: "1.5rem", // Space below
              transition: "all 1s ease", // Smooth fade
              transitionDelay: "0.2s", // Delay for staggered effect
              opacity: isLoaded ? 1 : 0, // Fade in
              transform: isLoaded ? "translateY(0)" : "translateY(40px)", // Slide up
              fontFamily: "heading", // Match landing page font
            }}
          >
            Who We Are
          </h1>

          {/* Paragraph with animation */}
          <p
            data-aos="fade-left" // AOS animation: fade left
            data-aos-delay="100" // Delay for staggered entrance
            className="lead mb-4" // Bootstrap lead text
            style={{
              fontSize: "1.25rem", // Match landing page font size
              lineHeight: 1.6, // Comfortable reading
              color: "#f3f4f6", // Light gray text
              transition: "all 1s ease", // Smooth fade
              transitionDelay: "0.4s", // Slight delay
              opacity: isLoaded ? 1 : 0, // Fade in
              transform: isLoaded ? "translateY(0)" : "translateY(40px)", // Slide up
              fontFamily: "heading", // Match landing page font
            }}
          >
            We believe that everyone deserves access to quality mental
            healthcare, regardless of who or where they are.
          </p>
        </div>
      </Container>
    </section>
  );
}
