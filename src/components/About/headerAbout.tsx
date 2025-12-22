import React, { useEffect, useState } from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";

/**
 * Header component with sticky behavior and smooth scroll navigation.
 * Converted from TailwindCSS to React-Bootstrap with equivalent styling and animation.
 */
export function Header() {
  // Track whether the page has been scrolled past a threshold
  const [isScrolled, setIsScrolled] = useState(false);

  // Add scroll listener on mount to toggle header style
  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to a section by ID
  const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Navbar
      fixed="top" // Stick to top of viewport
      expand="md" // Collapse below medium screens
      className={`transition-header ${isScrolled ? "scrolled" : ""}`} // Apply scroll class
    >
      <Container>
        {/* Logo and subtitle */}
        <Navbar.Brand
          href="#"
          style={{
            display: "flex",
            flexDirection: "column",
            fontFamily: "inherit",
            fontWeight: 700,
            fontSize: "1.5rem",
            lineHeight: 1.2,
          }}
        >
          <span>
            <span style={{ color: "#059669" /* emerald-600 */ }}>Obeeoma</span>
            <span
              style={{
                color: isScrolled
                  ? "#1f2937"
                  : "#ffffff" /* gray-800 or white */,
              }}
            >
              Oma
            </span>
          </span>
          <small
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: isScrolled
                ? "#4b5563"
                : "#e5e7eb" /* gray-600 or gray-200 */,
            }}
          >
            A Happy Mind
          </small>
        </Navbar.Brand>

        {/* Navigation links */}
        <Nav className="ms-auto d-none d-md-flex align-items-center gap-4">
          <Nav.Link
            onClick={() => scrollToSection("hero")}
            style={{
              color: isScrolled ? "#374151" : "#ffffff", // gray-700 or white
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#059669"; // emerald-600
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = isScrolled ? "#374151" : "#ffffff";
            }}
          >
            Home
          </Nav.Link>
          <Nav.Link
            onClick={() => scrollToSection("story")}
            style={{
              color: isScrolled ? "#374151" : "#ffffff",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#059669";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = isScrolled ? "#374151" : "#ffffff";
            }}
          >
            About
          </Nav.Link>
          <Nav.Link
            onClick={() => scrollToSection("contact")}
            style={{
              color: isScrolled ? "#374151" : "#ffffff",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#059669";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = isScrolled ? "#374151" : "#ffffff";
            }}
          >
            Contact
          </Nav.Link>
          <Nav.Link
            onClick={() => scrollToSection("story")}
            style={{
              color: isScrolled ? "#374151" : "#ffffff",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#059669";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = isScrolled ? "#374151" : "#ffffff";
            }}
          >
            Blogs
          </Nav.Link>
        </Nav>

        {/* CTA Button */}
        <div className="d-none d-lg-block">
          <Button
            onClick={() => scrollToSection("contact")}
            style={{
              padding: "0.5rem 1.5rem",
              borderRadius: "9999px",
              fontWeight: 600,
              fontSize: "0.95rem",
              backgroundColor: "#ffffff",
              color: "#059669",
              border: isScrolled ? "2px solid #059669" : "none",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            What is Anxiety Disorder?
          </Button>
        </div>
      </Container>
    </Navbar>
  );
}
