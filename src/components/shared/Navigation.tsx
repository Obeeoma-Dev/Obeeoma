// Import necessary components and modules
import { Navbar, Nav, Container } from "react-bootstrap"; // React-Bootstrap components for layout and styling
import { Link } from "react-router-dom"; // Enables navigation without page reloads
import logo from "../../assets/Images/green..png"; // Path to the company logo image

/**
 * Navigation Component
 * ---------------------
 * This component renders the top navigation bar for the application.
 * It includes a logo on the left and navigation links (Features and Benefits) on the right.
 * The navbar is fixed to the top of the page and remains visible while scrolling.
 */
const Navigation = () => (
  <Navbar
    expand="lg" // Enables responsive collapse on large screens
    fixed="top" // Keeps the navbar fixed at the top
    className="py-3 shadow-sm" // Adds vertical padding and a soft shadow
    style={{ backgroundColor: "white" }} // White background color for a clean look
  >
    <Container>
      {/* Brand (Logo) - aligned to the left */}
      <Navbar.Brand as={Link} to="/employer-dashboard">
        <img
          src={logo} // Logo image source
          alt="Obeeoma" // Accessible alt text for the logo
          height="80" // Logo height
          width="80" // Logo width
        />
      </Navbar.Brand>

      {/* Toggle button for mobile view (hamburger icon) */}
      <Navbar.Toggle aria-controls="nav" />

      {/* Collapsible navigation area - aligns links to the right */}
      <Navbar.Collapse id="nav" className="justify-content-end">
        <Nav className="ms-auto">
          {/* Navigation links */}
          <Nav.Link href="#features" className="text-black fw-semibold mx-2">
            Features |
          </Nav.Link>
          <Nav.Link href="#benefits" className="text-black fw-semibold mx-2">
            Benefits
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

// Export the component for use in other parts of the application
export default Navigation;
