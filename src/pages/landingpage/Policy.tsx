import { cubicBezier } from "framer-motion";
import React from "react";
import { motion } from "framer-motion";
// React-Bootstrap components used to replace Tailwind utility classes
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
// Site-level components (kept as-is per your request)
import Navigation from "../../components/shared/Navigation";
import Footer from "../../components/shared/Footer";
// Icons from lucide-react used in the original file
import {
  Database,
  UserCheck,
  Shield,
  Settings,
  Lock,
  Users,
  Eye,
  Mail,
  ExternalLink,
} from "lucide-react";

// Animation variants for framer-motion (kept from your original file)
const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: cubicBezier(0.22, 1, 0.36, 1),
    },
  },
};

const heroVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: cubicBezier(0.22, 1, 0.36, 1),
    },
  },
};

// Exported function component (junior-friendly style)
export function PrivacyPolicy() {
  // The component returns the whole page structure
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      {/* Header stays the same as in your original structure */}
      <Navigation />

      {/* Main container centers content and gives horizontal padding */}
      <Container
        style={{ paddingTop: "3rem", paddingBottom: "3rem", maxWidth: "80rem" }}
      >
        {/* Hero Section */}
        <Row className="justify-content-center text-center mb-5">
          <Col lg={10}>
            {/* Framer motion wrapper for hero animation */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={heroVariants}
            >
              {/* Visual badge with small bounce animation */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 64,
                  height: 64,
                  backgroundColor: "#ecfdf5",
                  borderRadius: 12,
                  marginBottom: 12,
                }}
              >
                <Shield style={{ width: 32, height: 32, color: "#064e3b" }} />
              </motion.div>

              {/* Page title */}
              <h1
                style={{
                  fontSize: "2.5rem",
                  fontWeight: 700,
                  color: "#111827",
                  marginBottom: 8,
                }}
              >
                Privacy Policy
              </h1>

              {/* Effective date (kept as in your original text) */}
              <p
                style={{
                  color: "#065f46",
                  fontWeight: 500,
                  fontSize: "1.125rem",
                }}
              >
                Effective Date: November 2025
              </p>
            </motion.div>
          </Col>
        </Row>

        {/* Cards Grid: we keep the same visual order and grouping as your Tailwind layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <Row xs={1} md={2} className="g-4 mb-4">
            {/* Card 1: Information We Collect */}
            <Col>
              <motion.div variants={cardVariants}>
                <Card>
                  <Card.Body>
                    <div style={{ display: "flex", gap: 16 }}>
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          backgroundColor: "#ecfdf5",
                          borderRadius: 8,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Database
                          style={{ width: 24, height: 24, color: "#065f46" }}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <Card.Title
                          style={{ fontSize: "1.125rem", fontWeight: 700 }}
                        >
                          Information We Collect
                        </Card.Title>
                        <ListGroup variant="flush">
                          {/* Replace the inner list items with your own content as needed */}
                          <ListGroup.Item style={{ paddingLeft: 0 }}>
                            {/* Example bullet point - keep structure to be edited later */}
                            <span>
                              Personal information you provide directly (name,
                              email).
                            </span>
                          </ListGroup.Item>
                        </ListGroup>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>

            {/* Card 2: How We Use Your Data */}
            <Col>
              <motion.div variants={cardVariants}>
                <Card>
                  <Card.Body>
                    <div style={{ display: "flex", gap: 16 }}>
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          backgroundColor: "#eff6ff",
                          borderRadius: 8,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Settings
                          style={{ width: 24, height: 24, color: "#1d4ed8" }}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <Card.Title
                          style={{ fontSize: "1.125rem", fontWeight: 700 }}
                        >
                          How We Use Your Data
                        </Card.Title>
                        <ListGroup variant="flush">
                          <ListGroup.Item style={{ paddingLeft: 0 }}>
                            <span>Provide and improve services</span>
                          </ListGroup.Item>
                        </ListGroup>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>

            {/* Card 3: Data Security */}
            <Col>
              <motion.div variants={cardVariants}>
                <Card>
                  <Card.Body>
                    <div style={{ display: "flex", gap: 16 }}>
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          backgroundColor: "#f5f3ff",
                          borderRadius: 8,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Lock
                          style={{ width: 24, height: 24, color: "#6d28d9" }}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <Card.Title
                          style={{ fontSize: "1.125rem", fontWeight: 700 }}
                        >
                          Data Security
                        </Card.Title>
                        <ListGroup variant="flush">
                          <ListGroup.Item style={{ paddingLeft: 0 }}>
                            <span>
                              Secure payment gateways (Paystack, Flutterwave)
                            </span>
                          </ListGroup.Item>
                        </ListGroup>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>

            {/* Card 4: Information Sharing */}
            <Col>
              <motion.div variants={cardVariants}>
                <Card>
                  <Card.Body>
                    <div style={{ display: "flex", gap: 16 }}>
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          backgroundColor: "#fff7ed",
                          borderRadius: 8,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Users
                          style={{ width: 24, height: 24, color: "#c2410c" }}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <Card.Title
                          style={{ fontSize: "1.125rem", fontWeight: 700 }}
                        >
                          Information Sharing
                        </Card.Title>
                        <ListGroup variant="flush">
                          <ListGroup.Item style={{ paddingLeft: 0 }}>
                            <span>
                              Trusted partners (hosting, analytics, payments)
                            </span>
                          </ListGroup.Item>
                        </ListGroup>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>

            {/* Card 5: Your Rights (kept as another card for structure parity) */}
            <Col>
              <motion.div variants={cardVariants}>
                <Card>
                  <Card.Body>
                    <div style={{ display: "flex", gap: 16 }}>
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          backgroundColor: "#ecfdf5",
                          borderRadius: 8,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <UserCheck
                          style={{ width: 24, height: 24, color: "#16a34a" }}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <Card.Title
                          style={{ fontSize: "1.125rem", fontWeight: 700 }}
                        >
                          Your Rights
                        </Card.Title>
                        <ListGroup variant="flush">
                          <ListGroup.Item style={{ paddingLeft: 0 }}>
                            Access, correct, or delete your data
                          </ListGroup.Item>
                          <ListGroup.Item style={{ paddingLeft: 0 }}>
                            Withdraw consent anytime
                          </ListGroup.Item>
                        </ListGroup>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>

            {/* Card 6: Third-Party Links */}
            <Col>
              <motion.div variants={cardVariants}>
                <Card>
                  <Card.Body>
                    <Card.Title
                      style={{ fontSize: "1.125rem", fontWeight: 700 }}
                    >
                      Third-Party Links
                    </Card.Title>
                    <Card.Text style={{ fontSize: "0.9rem" }}>
                      Our platform may link to external sites. We're not
                      responsible for their privacy practices—please review
                      their policies separately.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          </Row>

          {/* Policy Updates (kept as standalone card) */}
          <Row className="mb-4">
            <Col>
              <motion.div variants={cardVariants}>
                <Card>
                  <Card.Body>
                    <Card.Text style={{ fontSize: "0.9rem" }}>
                      We may update this policy periodically. You'll be notified
                      of significant changes via app or email. Continued use
                      means you accept the updates.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          </Row>

          {/* Contact Us section spanning full width */}
          <Row className="mb-4">
            <Col>
              <motion.div variants={cardVariants}>
                <Card
                  style={{ backgroundColor: "#ecfdf5", borderColor: "#bbf7d0" }}
                >
                  <Card.Body>
                    <Card.Text style={{ fontSize: "0.95rem" }}>
                      For privacy-related inquiries, reach out to our team:
                    </Card.Text>

                    <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
                      {/* Mail link kept as mailto */}
                      <a
                        href="mailto:hello@obeeoma.com"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 8,
                          textDecoration: "none",
                          fontWeight: 600,
                          color: "#065f46",
                        }}
                      >
                        <Mail style={{ width: 16, height: 16 }} />
                        hello@obeeoma.com
                      </a>

                      {/* External link */}
                      <a
                        href="https://www.obeeoma.com"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 8,
                          textDecoration: "none",
                          color: "#065f46",
                          fontWeight: 600,
                        }}
                      >
                        <ExternalLink style={{ width: 16, height: 16 }} />
                        www.obeeoma.com
                      </a>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          </Row>

          {/* Trust Badge */}
          <Row className="mb-4">
            <Col>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <Card className="text-center">
                  <Card.Body>
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 48,
                        height: 48,
                        backgroundColor: "#ecfdf5",
                        borderRadius: "50%",
                        marginBottom: 12,
                      }}
                    >
                      <Eye
                        style={{ width: 24, height: 24, color: "#065f46" }}
                      />
                    </div>

                    <h3
                      style={{
                        fontSize: "1.125rem",
                        fontWeight: 600,
                        marginBottom: 8,
                      }}
                    >
                      Your Privacy is Our Priority
                    </h3>
                    <p
                      style={{
                        fontSize: "0.9rem",
                        color: "#4b5563",
                        maxWidth: 720,
                        margin: "0 auto",
                      }}
                    >
                      We're committed to transparency and protecting your
                      personal information. Your trust enables us to provide
                      better mental health care for everyone.
                    </p>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          </Row>
        </motion.div>
      </Container>

      {/* Footer stays the same */}
      <Footer />
    </div>
  );
}
