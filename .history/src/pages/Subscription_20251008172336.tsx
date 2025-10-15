import React from "react";
import {
  Container,
  Card,
  Button,
  Nav,
  Navbar,
  ListGroup,
} from "react-bootstrap";
import { CheckCircleFill, Bell, ChatDots, Gear } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";

const SubscriptionPage: React.FC = () => {
  return (
    <div className="d-flex min-vh-100 bg-light">
      {/* Sidebar */}
      <div
        className="d-flex flex-column p-3 bg-white shadow-sm"
        style={{ width: "250px" }}
      >
        <div className="d-flex align-items-center mb-4">
          <img src="/logo192.png" alt="Logo" width="35" className="me-2" />
          <div>
            <h6 className="m-0 text-success fw-semibold">Obeeoma</h6>
            <small className="text-muted">A Happy Heart</small>
          </div>
        </div>

        <Nav className="flex-column">
          <Nav.Link className="text-dark mb-2"> Dashboard</Nav.Link>
          <Nav.Link className="text-dark mb-2"> AI Assistant</Nav.Link>
          <Nav.Link className="text-dark mb-2"> Resources</Nav.Link>
          <Nav.Link className="text-dark mb-2"> My Progress</Nav.Link>
          <Nav.Link className="text-dark mb-2"> My Programs</Nav.Link>
          <Nav.Link className="text-dark mb-2"> Rewards</Nav.Link>
          <Nav.Link className="text-success bg-success bg-opacity-10 fw-semibold rounded px-3 py-2 mb-2">
            Subscription
          </Nav.Link>
        </Nav>

        <div className="mt-auto pt-3 border-top">
          <Nav.Link className="text-muted">
            <Gear className="me-2" /> Settings
          </Nav.Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1">
        {/* Top Navbar */}
        <Navbar bg="white" className="shadow-sm px-4 py-2">
          <Container fluid>
            <div className="d-flex align-items-center w-50">
              <input
                type="text"
                placeholder="Search resources, programs..."
                className="form-control border-0 bg-light"
              />
            </div>

            <div className="d-flex align-items-center">
              <Bell className="me-3 text-secondary" />
              <ChatDots className="me-3 text-secondary" />
              <div className="d-flex align-items-center">
                <div className="me-2 text-end">
                  <div className="fw-semibold small">Emma Wilson</div>
                  <div className="text-muted small">Member since Oct 2022</div>
                </div>
                <div
                  className="rounded-circle bg-success text-white fw-bold d-flex align-items-center justify-content-center"
                  style={{ width: "35px", height: "35px" }}
                >
                  E
                </div>
              </div>
            </div>
          </Container>
        </Navbar>

        {/* Subscription Content */}
        <Container className="py-4">
          <h4 className="fw-bold mb-4">My Subscription</h4>

          {/* Tabs Header */}
          <div className="border-bottom mb-4">
            <Nav variant="tabs" defaultActiveKey="overview">
              <Nav.Item>
                <Nav.Link
                  eventKey="overview"
                  className="text-success fw-semibold"
                >
                  Overview
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="plans">Plans & Features</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="billing">Billing History</Nav.Link>
              </Nav.Item>
            </Nav>
          </div>

          {/* Overview Card */}
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body className="bg-success bg-opacity-10">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h5 className="fw-bold mb-1">
                    Premium Plan{" "}
                    <span className="badge bg-success bg-opacity-75">
                      Active
                    </span>
                  </h5>
                  <div className="text-muted small">
                    Next billing date: <strong>October 15, 2023</strong>
                  </div>
                  <div className="text-muted small">Amount: $9.99/month</div>
                </div>
                <div>
                  <Button variant="outline-success" size="sm" className="me-2">
                    Update Payment
                  </Button>
                  <Button variant="outline-danger" size="sm">
                    Cancel Subscription
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Plan Features */}
          <div className="mb-4">
            <h6 className="fw-bold mb-3">Current Plan Features</h6>
            <ListGroup variant="flush">
              <ListGroup.Item className="border-0 ps-0">
                <CheckCircleFill className="text-success me-2" />
                Unlimited access to all resources
              </ListGroup.Item>
              <ListGroup.Item className="border-0 ps-0">
                <CheckCircleFill className="text-success me-2" />
                Personalized AI recommendations
              </ListGroup.Item>
              <ListGroup.Item className="border-0 ps-0">
                <CheckCircleFill className="text-success me-2" />
                Weekly therapist sessions
              </ListGroup.Item>
              <ListGroup.Item className="border-0 ps-0">
                <CheckCircleFill className="text-success me-2" />
                Priority support
              </ListGroup.Item>
              <ListGroup.Item className="border-0 ps-0">
                <CheckCircleFill className="text-success me-2" />
                Progress tracking and reports
              </ListGroup.Item>
            </ListGroup>
          </div>

          {/* Payment Method */}
          <div className="mb-4">
            <h6 className="fw-bold mb-3">Payment Method</h6>
            <Card className="border-0 shadow-sm p-3">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <div className="rounded-circle bg-success bg-opacity-25 p-2 me-3">
                    💳
                  </div>
                  <div>
                    <div className="fw-semibold">Visa ending in 4242</div>
                    <div className="text-muted small">Expires 12/24</div>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-success fw-semibold text-decoration-none"
                >
                  Change
                </a>
              </div>
            </Card>
          </div>

          {/* Annual Plan Savings */}
          <Card className="border-0 shadow-sm p-3 bg-primary bg-opacity-10">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="fw-semibold">Annual Plan Savings</div>
                <div className="text-muted small">
                  Switch to annual billing and save 20%
                </div>
              </div>
              <Button variant="primary" className="fw-semibold">
                Switch to Annual Plan
              </Button>
            </div>
          </Card>
        </Container>
      </div>
    </div>
  );
};

export default SubscriptionPage;
