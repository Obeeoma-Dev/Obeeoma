import React from "react";
import { motion } from "framer-motion";
import { Container, Row, Col, Card, Stack } from "react-bootstrap";
import Navigation from "../../components/shared/Navigation";
import Footer from "../../components/shared/Footer";
import {
  FileText,
  UserCheck,
  UserPlus,
  CreditCard,
  Stethoscope,
  MessageCircle,
  Lock,
  Copyright,
  ShieldAlert,
  XCircle,
  RefreshCw,
  Scale,
  Mail,
  AlertTriangle,
} from "lucide-react";
// import './TermsAndConditions.css'; // Custom CSS for colors & spacing

// Motion variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as any },
  },
};

const heroVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any },
  },
};

export function TermsAndConditions() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navigation />

      <main className="flex-grow-1 bg-gradient-custom py-5">
        <Container className="py-5">
          {/* Hero Section */}
          <motion.div
            className="text-center mb-5"
            initial="hidden"
            animate="visible"
            variants={heroVariants}
          >
            <motion.div
              className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3 hero-icon"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <FileText className="hero-icon-svg" />
            </motion.div>

            <h1 className="display-4 fw-bold mb-2">Terms and Conditions</h1>
            <p className="text-emerald fw-medium mb-2">
              Effective Date: November 2025
            </p>
            <p className="text-gray mb-0 mx-auto hero-text">
              Welcome to <span className="text-emerald fw-medium">Obeeoma</span>{" "}
              ("we," "our," or "us"). These Terms and Conditions ("Terms")
              govern your access to and use of the Obeeoma mobile app, website,
              and all related services (collectively, the "Platform"). By
              accessing or using Obeeoma, you agree to comply with and be bound
              by these Terms. If you do not agree, please stop using the
              Platform immediately.
            </p>
          </motion.div>
          {/* Terms Cards Grid */}
          <motion.div
            className="row g-4 mb-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* 1. Overview */}
            <Col md={6}>
              <motion.div variants={cardVariants}>
                <Card className="h-100 shadow-sm border-custom p-3">
                  <Stack direction="horizontal" gap={3}>
                    <div className="icon-bg-emerald d-flex align-items-center justify-content-center rounded-lg">
                      <FileText className="icon-emerald" />
                    </div>
                    <div>
                      <h2 className="h5 fw-bold mb-3">1. Overview</h2>
                      <p className="text-gray mb-2">
                        Obeeoma is a virtual mental health platform that
                        connects users with qualified therapists and provides
                        AI-powered and community-based mental health support.
                        The platform offers:
                      </p>
                      <ul className="text-gray small mb-2">
                        <li>
                          <span className="text-emerald me-2">•</span>Access to
                          professional therapy sessions
                        </li>
                        <li>
                          <span className="text-emerald me-2">•</span>AI-powered
                          mental health chat support
                        </li>
                        <li>
                          <span className="text-emerald me-2">•</span>
                          Educational and mindfulness content
                        </li>
                        <li>
                          <span className="text-emerald me-2">•</span>Peer
                          support communities
                        </li>
                      </ul>
                      <p className="text-gray small fw-medium">
                        Obeeoma is not an emergency or crisis service. If you
                        are in crisis or may be at risk of harming yourself,
                        please contact local emergency services immediately.
                      </p>
                    </div>
                  </Stack>
                </Card>
              </motion.div>
            </Col>

            {/* 2. Eligibility */}
            <Col md={6}>
              <motion.div variants={cardVariants}>
                <Card className="h-100 shadow-sm border-custom p-3">
                  <Stack direction="horizontal" gap={3}>
                    <div className="icon-bg-blue d-flex align-items-center justify-content-center rounded-lg">
                      <UserCheck className="icon-blue" />
                    </div>
                    <div>
                      <h2 className="h5 fw-bold mb-3">2. Eligibility</h2>
                      <p className="text-gray mb-2">
                        To use Obeeoma, you must:
                      </p>
                      <ul className="text-gray small mb-2">
                        <li>
                          <span className="text-blue me-2">•</span>Be at least
                          18 years old
                        </li>
                        <li>
                          <span className="text-blue me-2">•</span>Provide
                          accurate and truthful information
                        </li>
                        <li>
                          <span className="text-blue me-2">•</span>Use the
                          Platform for lawful purposes only
                        </li>
                      </ul>
                      <p className="text-gray small">
                        Therapists on the platform must be licensed or certified
                        to practice in their respective jurisdictions.
                      </p>
                    </div>
                  </Stack>
                </Card>
              </motion.div>
            </Col>

            {/* 3. Account Registration */}
            <Col md={6}>
              <motion.div variants={cardVariants}>
                <Card className="h-100 shadow-sm border-custom p-3">
                  <Stack direction="horizontal" gap={3}>
                    <div className="icon-bg-purple d-flex align-items-center justify-content-center rounded-lg">
                      <UserPlus className="icon-purple" />
                    </div>
                    <div>
                      <h2 className="h5 fw-bold mb-3">
                        3. Account Registration
                      </h2>
                      <p className="text-gray mb-2">
                        You must create an account to access most Obeeoma
                        services. You agree to:
                      </p>
                      <ul className="text-gray small mb-2">
                        <li>
                          <span className="text-purple me-2">•</span>Keep your
                          login details secure
                        </li>
                        <li>
                          <span className="text-purple me-2">•</span>Provide
                          accurate and current information
                        </li>
                        <li>
                          <span className="text-purple me-2">•</span>Notify
                          Obeeoma immediately of unauthorized use of your
                          account
                        </li>
                      </ul>
                      <p className="text-gray small">
                        You are responsible for all activities that occur under
                        your account.
                      </p>
                    </div>
                  </Stack>
                </Card>
              </motion.div>
            </Col>

            {/* 4. Payments */}
            <Col md={6}>
              <motion.div variants={cardVariants}>
                <Card className="h-100 shadow-sm border-custom p-3">
                  <Stack direction="horizontal" gap={3}>
                    <div className="icon-bg-green d-flex align-items-center justify-content-center rounded-lg">
                      <CreditCard className="icon-green" />
                    </div>
                    <div>
                      <h2 className="h5 fw-bold mb-3">4. Payments</h2>
                      <p className="text-gray mb-2">
                        Some Obeeoma features require payment.
                      </p>
                      <ul className="text-gray small mb-0">
                        <li>
                          <span className="text-green me-2">•</span>Payments are
                          processed through secure third-party gateways (e.g.,
                          Paystack, Flutterwave)
                        </li>
                        <li>
                          <span className="text-green me-2">•</span>Obeeoma does
                          not store your payment card details
                        </li>
                        <li>
                          <span className="text-green me-2">•</span>All charges
                          are non-refundable unless stated otherwise
                        </li>
                        <li>
                          <span className="text-green me-2">•</span>You agree to
                          pay all applicable fees when due
                        </li>
                      </ul>
                    </div>
                  </Stack>
                </Card>
              </motion.div>
            </Col>

            {/* 5. Therapist Services
                        <Col md={6}>
                            <motion.div variants={cardVariants}>
                                <Card className="h-100 shadow-sm border-custom p-3">
                                    <Stack direction="horizontal" gap={3}>
                                        <div className="icon-bg-pink d-flex align-items-center justify-content-center rounded-lg">
                                            <Stethoscope className="icon-pink" />
                                        </div>
                                        <div>
                                            <h2 className="h5 fw-bold mb-3">5. Therapist Services</h2>
                                            <p className="text-gray small">
                                                Therapists on Obeeoma are independent professionals. While we verify their credentials,
                                                Obeeoma does not supervise or control their work and is not responsible for the advice
                                                or guidance they provide. All communications between you and a therapist are
                                                confidential, except as required by law or safety obligations.
                                            </p>
                                        </div>
                                    </Stack>
                                </Card>
                            </motion.div>
                        </Col> */}

            {/* 5. Community and AI Chat */}
            <Col md={6}>
              <motion.div variants={cardVariants}>
                <Card className="h-100 shadow-sm border-custom p-3">
                  <Stack direction="horizontal" gap={3}>
                    <div className="icon-bg-indigo d-flex align-items-center justify-content-center rounded-lg">
                      <MessageCircle className="icon-indigo" />
                    </div>
                    <div>
                      <h2 className="h5 fw-bold mb-3">
                        5. Community and AI Chat
                      </h2>
                      <p className="text-gray mb-2">
                        The Obeeoma community and AI chat are designed for
                        emotional support, not for medical emergencies. You
                        agree not to:
                      </p>
                      <ul className="text-gray small mb-2">
                        <li>
                          <span className="text-indigo me-2">•</span>Post or
                          share offensive, abusive, or unlawful content
                        </li>
                        <li>
                          <span className="text-indigo me-2">•</span>Share
                          personal information belonging to others without
                          consent
                        </li>
                        <li>
                          <span className="text-indigo me-2">•</span>Use the AI
                          chat for diagnosis or crisis intervention
                        </li>
                      </ul>
                      <p className="text-gray small mt-2">
                        We may moderate or remove harmful content to ensure user
                        safety.
                      </p>
                    </div>
                  </Stack>
                </Card>
              </motion.div>
            </Col>

            {/* 6. Privacy */}
            <Col md={6}>
              <motion.div variants={cardVariants}>
                <Card className="h-100 shadow-sm border-custom p-3">
                  <Stack direction="horizontal" gap={3}>
                    <div className="icon-bg-emerald d-flex align-items-center justify-content-center rounded-lg">
                      <Lock className="icon-emerald" />
                    </div>
                    <div>
                      <h2 className="h5 fw-bold mb-3">6. Privacy</h2>
                      <p className="text-gray small">
                        Your use of Obeeoma is also governed by our Privacy
                        Policy, which explains how we collect, use, and protect
                        your data. By using the Platform, you consent to our
                        data practices as described in that policy.
                      </p>
                    </div>
                  </Stack>
                </Card>
              </motion.div>
            </Col>

            {/* 7. Intellectual Property */}
            <Col md={6}>
              <motion.div variants={cardVariants}>
                <Card className="h-100 shadow-sm border-custom p-3">
                  <Stack direction="horizontal" gap={3}>
                    <div className="icon-bg-orange d-flex align-items-center justify-content-center rounded-lg">
                      <Copyright className="icon-orange" />
                    </div>
                    <div>
                      <h2 className="h5 fw-bold mb-3">
                        7. Intellectual Property
                      </h2>
                      <p className="text-gray small">
                        All content and technology on Obeeoma (including
                        trademarks, text, software, and graphics) are owned by
                        Obeeoma or its licensors. You may not copy, modify, or
                        reproduce any part of the Platform without prior written
                        permission.
                      </p>
                    </div>
                  </Stack>
                </Card>
              </motion.div>
            </Col>

            {/* 8. Limitation of Liability */}
            <Col md={6}>
              <motion.div variants={cardVariants}>
                <Card className="h-100 shadow-sm border-custom p-3">
                  <Stack direction="horizontal" gap={3}>
                    <div className="icon-bg-red d-flex align-items-center justify-content-center rounded-lg">
                      <ShieldAlert className="icon-red" />
                    </div>
                    <div>
                      <h2 className="h5 fw-bold mb-3">
                        8. Limitation of Liability
                      </h2>
                      <p className="text-gray mb-2">
                        To the fullest extent permitted by law:
                      </p>
                      <ul className="text-gray small mb-0">
                        <li>
                          <span className="text-red me-2">•</span>Obeeoma is not
                          liable for any loss, injury, or damages arising from
                          the use or inability to use the Platform
                        </li>
                        <li>
                          <span className="text-red me-2">•</span>We are not
                          responsible for actions or omissions of therapists or
                          third parties
                        </li>
                        <li>
                          <span className="text-red me-2">•</span>Use of Obeeoma
                          is at your sole risk
                        </li>
                      </ul>
                    </div>
                  </Stack>
                </Card>
              </motion.div>
            </Col>

            {/* 9. Termination */}
            <Col md={6}>
              <motion.div variants={cardVariants}>
                <Card className="h-100 shadow-sm border-custom p-3">
                  <Stack direction="horizontal" gap={3}>
                    <div className="icon-bg-gray d-flex align-items-center justify-content-center rounded-lg">
                      <XCircle className="icon-gray" />
                    </div>
                    <div>
                      <h2 className="h5 fw-bold mb-3">9. Termination</h2>
                      <p className="text-gray small">
                        You may delete your account anytime. Obeeoma may suspend
                        or terminate your account if you violate these Terms or
                        misuse the Platform. Termination does not affect your
                        obligation to pay outstanding fees or respect
                        confidentiality commitments.
                      </p>
                    </div>
                  </Stack>
                </Card>
              </motion.div>
            </Col>

            {/* 10. Updates to Terms */}
            <Col md={6}>
              <motion.div variants={cardVariants}>
                <Card className="h-100 shadow-sm border-custom p-3">
                  <Stack direction="horizontal" gap={3}>
                    <div className="icon-bg-yellow d-flex align-items-center justify-content-center rounded-lg">
                      <RefreshCw className="icon-yellow" />
                    </div>
                    <div>
                      <h2 className="h5 fw-bold mb-3">10. Updates to Terms</h2>
                      <p className="text-gray small">
                        We may update these Terms occasionally. Updated versions
                        will be posted on our website or in the app. Continued
                        use after updates means you accept the new Terms.
                      </p>
                    </div>
                  </Stack>
                </Card>
              </motion.div>
            </Col>

            {/* 11. Governing Law */}
            <Col md={6}>
              <motion.div variants={cardVariants}>
                <Card className="h-100 shadow-sm border-custom p-3">
                  <Stack direction="horizontal" gap={3}>
                    <div className="icon-bg-blue d-flex align-items-center justify-content-center rounded-lg">
                      <Scale className="icon-blue" />
                    </div>
                    <div>
                      <h2 className="h5 fw-bold mb-3">11. Governing Law</h2>
                      <p className="text-gray small">
                        These Terms and Conditions are governed by the laws of
                        the Federal Republic of Nigeria. Any disputes shall be
                        handled by Nigerian courts.
                      </p>
                    </div>
                  </Stack>
                </Card>
              </motion.div>
            </Col>

            {/* 12. Contact Information */}
            <Col md={12}>
              <motion.div variants={cardVariants}>
                <Card className="h-100 shadow-sm border-custom p-3 bg-emerald-light">
                  <Stack direction="horizontal" gap={3}>
                    <div className="icon-bg-emerald d-flex align-items-center justify-content-center rounded-lg">
                      <Mail className="icon-white" />
                    </div>
                    <div>
                      <h2 className="h5 fw-bold mb-3">
                        12. Contact Information
                      </h2>
                      <p className="text-gray small mb-2">
                        For questions or support, contact:
                      </p>
                      <Stack
                        direction="horizontal"
                        gap={3}
                        className="flex-wrap"
                      >
                        <motion.a
                          href="mailto:support@obeeoma.com"
                          className="text-emerald fw-medium"
                          whileHover={{ x: 4 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Mail className="me-1" />
                          support@obeeoma.com
                        </motion.a>
                        <motion.a
                          href="mailto:support@obeeoma.com"
                          className="text-emerald fw-medium"
                          whileHover={{ x: 4 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Mail className="me-1" />
                          support@obeeoma.com
                        </motion.a>
                        <motion.a
                          href="https://www.obeeoma.com"
                          className="text-emerald fw-medium"
                          whileHover={{ x: 4 }}
                          transition={{ duration: 0.2 }}
                        >
                          www.obeeoma.com
                        </motion.a>
                      </Stack>
                    </div>
                  </Stack>
                </Card>
              </motion.div>
            </Col>
          </motion.div>{" "}
          {/* End of Terms Cards Grid */}
        </Container>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
