// ContactPage.tsx
import React, { useEffect, useState } from "react";
// Importing icons from lucide-react
import { Phone, Mail } from "lucide-react";
// Importing custom components from other files
import { ContactCard } from "../../../components/Contactus/contactCard";
import { ContactForm } from "../../../components/Contactus/contactForm";
import { FloatingWhatsApp } from "../../../components/Contactus/floatingWhatsup";
// Importing React-Bootstrap components
import { Container, Row, Col, Button, Card } from "react-bootstrap";

import Navigation from "../../../components/shared/Navigation";

// Importing the header background image.
import ContactBG from "../../../assets/Images/contacts.jpg";

// Importing the social handle footer.
import Footer from "../../../components/shared/socialhandlesfooter";

// Define the functional component using TypeScript
export const ContactPage: React.FC = () => {
  // State to handle animation visibility
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // useEffect runs after the component mounts
  useEffect(() => {
    // Trigger animations after component loads
    setIsVisible(true);
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navigation Bar */}
      <Navigation />

      <main style={{ paddingTop: "80px" }}>
        {/* Hero Section */}
        <div
          className="position-relative"
          style={{
            height: "500px",
            overflow: "hidden",
            backgroundImage: `url(${ContactBG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Gradient overlay */}
          <div
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{
              background:
                "linear-gradient(to right, rgba(11,110,69,0.1), rgba(0,168,89,0.3))",
              zIndex: 1,
            }}
          ></div>

          {/* Text content */}
          <div
            className="position-relative d-flex justify-content-center align-items-center h-100"
            style={{ zIndex: 2 }}
          >
            <div
              className={`text-center transition-opacity ${isVisible ? "opacity-100" : "opacity-0"}`}
            >
              <h1
                className="display-1 text-white mb-3"
                style={{ fontFamily: "heading" }}
              >
                Contact Us
              </h1>
              <p className="blog-hero-subtitle" style={{ fontFamily: "body" }}>
                We're here to listen and support you on your journey to a
                happier mind
              </p>
            </div>
          </div>
        </div>

        {/* Contact Methods Section */}
        <Container className="mt-n12 position-relative" style={{ zIndex: 3 }}>
          <Row
            className={`g-4 ${isVisible ? "opacity-100" : "opacity-0"} transition-opacity`}
            style={{ transform: "translateY(-100px)" }}
          >
            <Col md={6}>
              <ContactCard
                icon={Phone}
                title="Call Us"
                content="08064780856"
                link="tel:08064780856"
              />
            </Col>
            <Col md={6}>
              <ContactCard
                icon={Mail}
                title="Email Us"
                content="hello@obeeoma.com"
                link="mailto:hello@obeeoma.com"
              />
            </Col>
            {/* <Col md={4}>
                        <ContactCard icon={MapPin} title="Visit Us" content="Lagos, Nigeria" />
                    </Col> */}
          </Row>
        </Container>

        {/* Main Content Section */}
        <Container className="py-5">
          <Row className="g-4">
            {/* Left Column */}
            <Col
              lg={6}
              className={`${isVisible ? "opacity-100 translateX-0" : "opacity-0 translateX-n3"} transition-opacity`}
            >
              <Card
                className="text-white"
                style={{
                  background:
                    "linear-gradient(to bottom right, #00A859, #0B6E45)",
                  borderRadius: "1.5rem",
                  padding: "3rem",
                }}
              >
                <p
                  className="fs-5 opacity-75 mb-3"
                  style={{ fontFamily: "body" }}
                >
                  Looking to get in touch with us?
                </p>
                <h2
                  className="display-5 mb-4"
                  style={{ fontFamily: "heading" }}
                >
                  Send us feedback, or share your experience.
                </h2>
                <p className="fs-5 opacity-75" style={{ fontFamily: "body" }}>
                  Get in touch with us now and share what you have in mind. We
                  respond as soon as possible and ensure your voice is heard.
                </p>

                <div className="mt-4">
                  <Row className="align-items-center mb-3">
                    <Col xs="auto">
                      <div
                        className="d-flex justify-content-center align-items-center rounded-circle"
                        style={{
                          width: "48px",
                          height: "48px",
                          fontFamily: "heading",
                          backgroundColor: "rgba(255,255,255,0.2)",
                        }}
                      >
                        <Phone size={24} />
                      </div>
                    </Col>
                    <Col>
                      <h5 style={{ fontFamily: "heading" }}>Quick Response</h5>
                      <p
                        className="mb-0 opacity-75"
                        style={{ fontFamily: "body" }}
                      >
                        We typically respond within 24 hours
                      </p>
                    </Col>
                  </Row>

                  <Row className="align-items-center">
                    <Col xs="auto">
                      <div
                        className="d-flex justify-content-center align-items-center rounded-circle"
                        style={{
                          width: "48px",
                          height: "48px",
                          fontFamily: "heading",
                          backgroundColor: "rgba(255,255,255,0.2)",
                        }}
                      >
                        <Mail size={24} />
                      </div>
                    </Col>
                    <Col>
                      <h5 style={{ fontFamily: "heading" }}>
                        Professional Support
                      </h5>
                      <p
                        className="mb-0 opacity-75"
                        style={{ fontFamily: "body" }}
                      >
                        Our team of experts is ready to help
                      </p>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>

            {/* Right Column - Form */}
            <Col
              lg={6}
              className={`${isVisible ? "opacity-100 translateX-0" : "opacity-0 translateX-3"} transition-opacity`}
            >
              <Card className="p-4 p-lg-5 shadow">
                <h2
                  className="h3 text-success mb-4"
                  style={{ fontFamily: "heading", height: "5rem" }}
                >
                  Send Us A Message
                </h2>
                <ContactForm />
              </Card>
            </Col>
          </Row>
        </Container>

        {/* Call to Action Section */}
        <Container className="py-5">
          <Row className="g-0">
            <Col
              lg={12}
              className="d-flex flex-column justify-content-center p-4 p-lg-5"
              style={{
                background:
                  "linear-gradient(to bottom right, #00A859, #0B6E45)",
                borderRadius: "1.5rem",
              }}
            >
              <h2
                className="display-5 text-white mb-3"
                style={{ fontFamily: "heading" }}
              >
                We're here to help! You can call us!
              </h2>
              <p
                className="fs-5 text-white-50 mb-3"
                style={{ fontFamily: "body" }}
              >
                Speak directly with our support team for immediate assistance
              </p>
              <Button
                href="tel:+08064780856"
                variant="light"
                className="text-success rounded-pill d-inline-flex align-items-center gap-2"
                style={{ fontFamily: "body" }}
              >
                <Phone size={24} />
                +08064780856
              </Button>
            </Col>
          </Row>
        </Container>

        {/* Footer */}
        {/* <footer className="bg-success text-white py-4">
                <Container>
                    <Row className="align-items-center justify-content-between">
                        <Col xs="auto" className="d-flex gap-3">
                            <a href="#" className="d-flex justify-content-center align-items-center rounded-circle bg-white bg-opacity-10 p-2" style={{ fontFamily: "body" }} aria-label="Facebook">
                                <Facebook size={24} color="white" />
                            </a>
                            <a href="#" className="d-flex justify-content-center align-items-center rounded-circle bg-white bg-opacity-10 p-2" style={{ fontFamily: "body" }} aria-label="Twitter">
                                <Twitter size={24} color="white" />
                            </a>
                            <a href="#" className="d-flex justify-content-center align-items-center rounded-circle bg-white bg-opacity-10 p-2" style={{ fontFamily: "body" }} aria-label="Instagram">
                                <Instagram size={24} color="white"
                                />
                            </a>
                        </Col>
                        <Col xs="auto">
                            <p className="mb-0 text-white-75" style={{ fontFamily: "body" }}>
                                Copyright © 2025 Obeeoma | Powered by <span className="text-light">RHIPFactory</span>
                            </p>
                        </Col>
                    </Row>
                </Container>
            </footer> */}

        <Footer />

        {/* Floating WhatsApp Button */}
        <FloatingWhatsApp />
      </main>
    </div>
  );
};
