// Import necessary components and modules
import { Navbar, Nav, Container } from "react-bootstrap"; // React-Bootstrap components for layout and styling
import { Link } from "react-router-dom"; // Enables navigation without page reloads
import logo from "../../assets/Images/obeeomalogoword1.png"; // Path to the company logo image


const Navigation = () => (
  <Navbar
    expand="lg" // Enables responsive collapse on large screens
    fixed="top" // Keeps the navbar fixed at the top
    className="shadow-sm"
    style={{
      backgroundColor: "white",
      height: "80px", // Set fixed navbar height
      minHeight: "80px" // Ensure minimum height
    }}
  >
    <Container>
      {/* Brand (Logo) - aligned to the left */}
      <Navbar.Brand as={Link}
        to="/employer-dashboard"
        className="d-flex align-items-center" // Center logo vertically
      >
        <img
          src={logo} // Logo image source
          alt="Obeeoma" // Accessible alt text for the logo
          style={{
            height: "50px", // logo's size.
            width: "auto", // Maintain aspect ratio
            marginTop: "-10px", // Adjust vertical position if needed. 
            marginBottom: "-10px"
          }}
        />
      </Navbar.Brand>

      {/* Toggle button for mobile view (hamburger icon) */}
      <Navbar.Toggle aria-controls="nav" />

      {/* Collapsible navigation area - aligns links to the right */}
      <Navbar.Collapse id="nav" className="justify-content-end">
        <Nav className="ms-auto">
          {/* Navigation links */}
          <Nav.Link
            href="#features"
            className="text-black mx-2"
            style={{
              fontSize: "30px", // Larger font size.
              fontWeight: 900, // Semibold.
              fontFamily: 'body'
            }}
          >
            Features |
          </Nav.Link>
          <Nav.Link
            href="#benefits"
            className="text-black mx-2"
            style={{
              fontSize: "30px", // Larger font size.
              fontWeight: 900, // text font.
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


export default Navigation;
