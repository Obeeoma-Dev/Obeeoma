// Import necessary components and modules
import { Navbar, Nav, Container } from "react-bootstrap"; // React-Bootstrap components for layout and styling
import { Link } from "react-router-dom"; // Enables navigation without page reloads
import logo from "../../assets/Images/obeeomalogoword1.png"; // Path to the company logo image
import { useEffect, useState } from "react";

// Define your nav component.
function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10); // Adjustment area of the threshold.
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Navbar
      expand="lg"
      fixed="top"
      className="shadow-sm"
      style={{
        backgroundColor: scrolled ? "rgba(255, 255, 255, 0.6)" : "rgba(255, 255, 255, 0.05)", // slight white when scrolled, nearly invisible before
        backdropFilter: "blur(10px)", // always blurred for glass effect
        WebkitBackdropFilter: "blur(10px)",
        transition: "background-color 0.3s ease",
        height: "80px",
        minHeight: "80px",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,0.1)" : "none",
      }}
    >
      {/* The container is mean to center the nav bar well */}
      <Container>
        {/* Brand Log */}
        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center" // Center logo vertically.
        >
          <img
            src={logo} // Logo image.
            alt="Obeeoma" // Accessible alt text for the logo
            style={{
              height: "50px", // logo's size.
              width: "auto", // Maintaining aspect ratio
              marginTop: "-10px", // Adjust vertical position if needed.
              marginBottom: "-10px",
            }}
          />
        </Navbar.Brand>

        {/* Toggle button for mobile view (hamburger component) */}
        <Navbar.Toggle aria-controls="nav" />

        {/* Collapsible navigation area and aligning links to the right */}
        <Navbar.Collapse id="nav" className="justify-content-end">
          <Nav className="ms-auto">
            {/* Navigation links */}

            <Nav.Link as={Link} to="/" className="mx-2">
              Home
            </Nav.Link>

            <Nav.Link as={Link} to="/about-us" className="mx-2">
              About
            </Nav.Link>

            <Nav.Link as={Link} to="/blog" className="mx-2">
              Blog
            </Nav.Link>

            <Nav.Link as={Link} to="/contact-us" className="mx-2">
              Contact
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
