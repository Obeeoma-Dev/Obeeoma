// src/components/Footer.jsx
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
// import { Facebook, Twitter, Instagram } from "react-bootstrap-icons";
import { Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="blog-footer">
      <Container>
        <Row className="align-items-center">
          <Col
            xs={12}
            md={6}
            className="text-center text-md-start mb-3 mb-md-0"
          >
            <div className="blog-footer-social">
              <a
                href="#"
                className="blog-footer-social-link"
                aria-label="Facebook"
              >
                <Facebook color="white" />
              </a>
              <a
                href="#"
                className="blog-footer-social-link"
                aria-label="Twitter"
              >
                <Twitter color="white" />
              </a>
              <a
                href="#"
                className="blog-footer-social-link"
                aria-label="Instagram"
              >
                <Instagram color="white" />
              </a>
            </div>
          </Col>
          <Col xs={12} md={6} className="text-center text-md-end">
            <p className="blog-footer-text" style={{ fontFamily: "body" }}>
              Copyright © 2025 Obeeoma | Powered by{" "}
              <span className="blog-footer-highlight">RHIPFactory</span>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
