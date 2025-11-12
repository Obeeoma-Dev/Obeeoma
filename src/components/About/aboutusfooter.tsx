import React from "react";
import { Container, Button } from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa";



// Functional component for the About Us footer section
const AboutUsFooter: React.FC = () => {
    return (
        // Main wrapper with background and overlay
        <div className="about-footer-section">
            {/* Bootstrap container centers content */}
            <Container className="text-center text-white py-5">
                {/* Heading */}
                <h2 className="mb-3">Ready to Take the First Step?</h2>
                {/* Subtext */}
                <p className="mb-4">
                    You don't have to face anxiety alone. Our team is here to support you every step of the way.
                </p>
                {/* Call-to-action button */}
                <Button variant="light">
                    Schedule a Consultation <FaArrowRight className="ms-2" />
                </Button>
            </Container>
        </div>
    );
};

export default AboutUsFooter;