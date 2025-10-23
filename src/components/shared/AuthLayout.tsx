import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      {/* Header */}
      <Navbar bg="dark" variant="dark" expand="lg" className="border-bottom">
        <Container>
          <Navbar.Brand as={NavLink} to="/" className="d-flex align-items-center">
            <div className="d-flex align-items-center">
              <img src={logo} alt="Obeeoma Logo" width="35" className="me-2" />
              <div>
                <small className="text-muted">A Happy Heart</small>
              </div>
            </div>
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/about">
                About
              </Nav.Link>
              <Nav.Link as={NavLink} to="/faqs">
                FAQs
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Content */}
      <main className="flex-grow-1 d-flex align-items-center justify-content-center py-4">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-dark text-light py-4 mt-auto">
        <Container>
          <div className="text-center">
            <p className="mb-2">
              © 2025 Obeeoma. All rights reserved.
            </p>
            <div className="d-flex justify-content-center align-items-center flex-wrap gap-3">
              <Nav.Link as={Link} to="/privacy-policy" className="text-light p-0 small">
                Privacy Policy
              </Nav.Link>
              <span className="text-muted">|</span>
              <Nav.Link as={Link} to="/terms" className="text-light p-0 small">
                Terms of Service
              </Nav.Link>
              <span className="text-muted">|</span>
              <Nav.Link as={Link} to="/contact" className="text-light p-0 small">
                Contact Us
              </Nav.Link>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default AuthLayout;