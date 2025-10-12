import * as React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Nav,
  Navbar,
  Alert,
  ListGroup,
  Badge,
  Dropdown,
  Image,
} from "react-bootstrap";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  LineChart,
  Line,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type WeeklyData = { day: string; minutes: number };
type MoodTrend = { week: string; mood: number };

const weeklyData: WeeklyData[] = [
  { day: "Mon", minutes: 20 },
  { day: "Tue", minutes: 35 },
  { day: "Wed", minutes: 30 },
  { day: "Thu", minutes: 45 },
  { day: "Fri", minutes: 18 },
  { day: "Sat", minutes: 33 },
  { day: "Sun", minutes: 28 },
];

const moodTrend: MoodTrend[] = [
  { week: "Week 1", mood: 2 },
  { week: "Week 2", mood: 1 },
  { week: "Week 3", mood: 3 },
  { week: "Week 4", mood: 4 },
  { week: "Week 5", mood: 5 },
  { week: "Week 6", mood: 4 },
];

export default function EmployeeDashboard(): React.ReactElement {
  return (
    <Container fluid className="bg-light min-vh-100 p-0">
      <Row className="g-0">
        {/* Sidebar */}
        <Col md={2} className="bg-white shadow-sm p-3">
          <h4 className="text-success fw-bold mb-4 text-center">Obeeoma</h4>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="#" className="text-success fw-semibold">
              Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/AiAssistant">
              AI Assistant
            </Nav.Link>
            <Nav.Link as={Link} to="/Resources">
              Resources
            </Nav.Link>
            <Nav.Link as={Link} to="/MyProgress">
              My Progress
            </Nav.Link>
            <Nav.Link as={Link} to="/MyPrograms">
              My Programs
            </Nav.Link>
            <Nav.Link as={Link} to="/Rewards">
              Rewards
            </Nav.Link>
            <Nav.Link as={Link} to="/Subscription">
              Subscription
            </Nav.Link>
          </Nav>
          <hr />
          <Nav.Link as={Link} to="/Settings" className="text-muted">
            ⚙️ Settings
          </Nav.Link>
        </Col>

        {/* Main Content */}
        <Col md={10} className="p-4">
          {/* Header */}
          <Navbar className="mb-4 d-flex justify-content-between align-items-center">
            <h4 className="mb-0">Welcome back, Emma!</h4>
            <div className="d-flex align-items-center gap-3">
              <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  🔔
                </Dropdown.Toggle>
                <Dropdown.Menu className="shadow-sm p-3" style={{ width: 280 }}>
                  <p className="fw-semibold mb-2">Notifications</p>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      New session available in Anxiety Management{" "}
                      <Badge bg="secondary" pill>
                        2h ago
                      </Badge>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      You earned a 7-day streak badge!{" "}
                      <Badge bg="secondary" pill>
                        1d ago
                      </Badge>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      New recommended resource{" "}
                      <Badge bg="secondary" pill>
                        2d ago
                      </Badge>
                    </ListGroup.Item>
                  </ListGroup>
                  <div className="text-end mt-2">
                    <Link to="#" className="text-success small">
                      View all notifications →
                    </Link>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
              <div className="d-flex align-items-center">
                <Image
                  roundedCircle
                  width={40}
                  height={40}
                  src="https://via.placeholder.com/40"
                  alt="profile"
                  className="me-2"
                />
                <div>
                  <strong>Billy</strong>
                  <div className="text-muted small">Patient Dashboard</div>
                </div>
              </div>
            </div>
          </Navbar>

          {/* Progress Alert */}
          <Alert variant="success">
            ✅ You’re making great progress! You completed 3 activities this
            week, 40% more than last week.
          </Alert>

          {/* Stats Cards */}
          <Row className="g-3 mb-4">
            <Col md={3}>
              <Card className="text-center shadow-sm">
                <Card.Body>
                  <h5>7 days</h5>
                  <Card.Text className="text-muted">Current Streak</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-center shadow-sm">
                <Card.Body>
                  <h5>5h 23m</h5>
                  <Card.Text className="text-muted">Time in Programs</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Charts */}
          <Row className="g-3 mb-4">
            <Col md={6}>
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>Weekly Engagement (minutes)</Card.Title>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="minutes" fill="#198754" />
                    </BarChart>
                  </ResponsiveContainer>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>Mood Trend (1–5 scale)</Card.Title>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={moodTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="mood"
                        stroke="#198754"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Today's Plan & Recommendations */}
          <Row className="g-3">
            <Col md={6}>
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>Today’s Plan</Card.Title>
                  <div className="mb-3 border-bottom pb-2">
                    <h6>Anxiety Management: Session 4</h6>
                    <p className="text-muted small">
                      Breathing techniques for acute anxiety
                    </p>
                    <Button variant="success" size="sm">
                      Start Session
                    </Button>
                  </div>
                  <div>
                    <h6>Daily Mood Check-in</h6>
                    <p className="text-muted small">
                      Track your mood and symptoms
                    </p>
                    <Button variant="primary" size="sm">
                      Check In
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>Recommended for You</Card.Title>
                  <div className="mb-3 border-bottom pb-2">
                    <h6>5-Minute Calming Exercise</h6>
                    <p className="text-muted small">
                      Quick technique for stress relief
                    </p>
                    <Link to="#" className="text-success small">
                      View →
                    </Link>
                  </div>
                  <div>
                    <h6>Understanding Anxiety Triggers</h6>
                    <p className="text-muted small">
                      Learn to identify your personal triggers
                    </p>
                    <Link to="#" className="text-success small">
                      View →
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
