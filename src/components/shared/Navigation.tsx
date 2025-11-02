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
      expand="lg" // This enables responsive collapse on large screens.
      fixed="top" // This keeps the navbar fixed at the top
      className={`shadow-sm ${scrolled ? "scrolled" : "transparent"}`}
      style={{
        transition: "background-color 0.3s ease",
        height: "80px", // Set fixed navbar height.
        minHeight: "80px", // Ensure minimum height.        
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
              marginBottom: "-10px"
            }}
          />
        </Navbar.Brand>

        {/* Toggle button for mobile view (hamburger component) */}
        <Navbar.Toggle aria-controls="nav" />

        {/* Collapsible navigation area and aligning links to the right */}
        <Navbar.Collapse id="nav" className="justify-content-end">
          <Nav className="ms-auto">
            {/* Navigation links */}

            <Nav.Link
              href="#Home"
              className="text-#3CB371 mx-2"
              style={{
                fontSize: "25px",
                fontWeight: 75,
                fontFamily: 'body'
              }}
            >
              Home |
            </Nav.Link>


            <Nav.Link
              href="#benefits"
              className="text-#3CB371 mx-2"
              style={{
                fontSize: "25px", // Larger font size.
                fontWeight: 75, // Semibold.
                fontFamily: 'body'
              }}
            >
              Features |
            </Nav.Link>


            <Nav.Link
              href="#features"
              className="text-#3CB371 mx-2"
              style={{
                fontSize: "25px", // Larger font size.
                fontWeight: 75, // text font.
                fontFamily: 'body'
              }}
            >
              Benefits
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}



export default Navigation;
