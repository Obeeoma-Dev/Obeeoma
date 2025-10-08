import { Navbar, Nav, Container } from "react-bootstrap";
import logo from "../../assets/Images/obeeomalogoicon2.png";

const Navigation = () => (
  <Navbar expand="lg" fixed="top" className="py-3" style={{ backgroundColor: "var(--color-green)" }}>
    <Container>
      <Navbar.Toggle aria-controls="nav" />
      <Navbar.Collapse id="nav" className="justify-content-between">
        <Nav className="me-auto">
          <Navbar.Brand href="#">
            <img src={logo} alt="Obeeoma" height="40" />
          </Navbar.Brand>
          <Nav.Link href="/employer-dashboard" className="text-white">Pricing</Nav.Link>
          <Nav.Link href="#pricing" className="text-white">Features</Nav.Link>
          <Nav.Link href="#benefits" className="text-white">Benefits</Nav.Link>
        </Nav>        
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default Navigation;
