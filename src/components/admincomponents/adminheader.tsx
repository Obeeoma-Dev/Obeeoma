import React from "react";
import {
  Navbar,
  Container,
  Form,
  FormControl,
  Button,
  Badge,
  Row,
  Col,
} from "react-bootstrap";

import { Search, Bell, User } from "lucide-react";

/**
 * Header component displays the top navigation bar
 * Includes search input, notification bell, and user profile section
 */
const Header: React.FC = () => {
  return (
    // Navbar container with light background and bottom border
    <Navbar
      bg="white"
      className="border-bottom"
      style={{
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)",
        padding: "1rem 1.5rem",
      }}
    >
      {/* Fluid container to span full width */}
      <Container fluid>
        {/* Left section: Search bar */}
        <Form
          className="d-flex flex-grow-1 me-auto"
          style={{ maxWidth: "500px" }}
        >
          {/* Search icon positioned inside input */}
          <div className="position-relative w-100">
            <Search
              size={18}
              className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
            />
            {/* Search input field with left padding for icon */}
            <FormControl
              type="search"
              placeholder="Search..."
              className="ps-5 border rounded-2"
              style={{ backgroundColor: "#f5f7fa", borderColor: "#e9ecef" }}
              aria-label="Search"
            />
          </div>
        </Form>

        {/* Right section: Notifications and user profile */}
        <Row className="align-items-center gx-4">
          {/* Notification bell with badge */}
          <Col xs="auto">
            <Button
              variant="link"
              className="position-relative p-0 text-dark"
              aria-label="Notifications"
              style={{ textDecoration: "none" }}
            >
              <Bell size={22} />
              {/* Red badge showing notification count */}
              <Badge
                bg="danger"
                pill
                className="position-absolute top-0 start-100 translate-middle text-white"
                style={{
                  fontSize: "0.65rem",
                  width: "1.2rem",
                  height: "1.2rem",
                }}
              >
                2
              </Badge>
            </Button>
          </Col>

          {/* User profile section */}
          <Col xs="auto">
            <div className="d-flex align-items-center gap-3">
              {/* User info text */}
              <div className="text-end">
                <div
                  className="text-muted small fw-500"
                  style={{ fontSize: "0.8rem" }}
                >
                  {" "}
                  Dr.{" "}
                </div>
                <div
                  className="fw-600 text-dark"
                  style={{ fontSize: "0.9rem" }}
                >
                  {" "}
                  Obeeoma Systems Adminstrator{" "}
                </div>
              </div>

              {/* User avatar with icon */}
              <div
                className="bg-success rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: "40px", height: "40px" }}
              >
                <User size={22} color="#fff" />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default Header;
