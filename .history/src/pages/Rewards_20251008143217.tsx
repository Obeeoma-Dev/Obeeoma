import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ProgressBar,
  Tab,
  Nav,
  Badge,
  Table,
} from "react-bootstrap";

const weeklyPoints = [120, 170, 140, 190, 220, 180];

const badges = [
  {
    name: "Early Bird",
    description: "Complete 5 morning sessions",
    earned: true,
  },
  {
    name: "7-Day Streak",
    description: "Use the app for 7 consecutive days",
    earned: true,
  },
];

const badgesInProgress = [
  {
    name: "Mindfulness Master",
    description: "Complete the Mindfulness program",
    progress: 60,
  },
  {
    name: "Resource Explorer",
    description: "Review 10 different resources",
    progress: 70,
  },
  {
    name: "30-Day Commitment",
    description: "Use the app for 30 consecutive days",
    progress: 23,
  },
  {
    name: "Anxiety Expert",
    description: "Complete the Anxiety Management program",
    progress: 60,
  },
];

const RewardsPage: React.FC = () => (
  <Container className="mt-4">
    <Row>
      <Col md={12}>
        <h3>Rewards & Achievements</h3>
      </Col>
    </Row>
    <Row className="mb-4">
      <Col md={4}>
        <Card>
          <Card.Body>
            <Card.Title>Total Points Earned</Card.Title>
            <h2>
              680{" "}
              <span className="text-success" style={{ fontSize: "1rem" }}>
                (+120 this week)
              </span>
            </h2>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card>
          <Card.Body>
            <Card.Title>Current Streak</Card.Title>
            <h2>
              7 days{" "}
              <span className="text-success" style={{ fontSize: "1rem" }}>
                (+3 days)
              </span>
            </h2>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card>
          <Card.Body>
            <Card.Title>Badges Earned</Card.Title>
            <h2>2/6</h2>
          </Card.Body>
        </Card>
      </Col>
    </Row>

    <Row>
      <Col md={12}>
        <Card className="mb-4">
          <Card.Body>
            <Card.Title>Weekly Points Earned</Card.Title>
            <Table bordered>
              <thead>
                <tr>
                  {weeklyPoints.map((_, idx) => (
                    <th
                      className="text-center"
                      key={idx}
                    >{`Week ${idx + 1}`}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {weeklyPoints.map((points, idx) => (
                    <td className="align-bottom text-center" key={idx}>
                      <div
                        style={{
                          height: `${points}px`,
                          background: "#14C37A",
                          width: "28px",
                          margin: "auto",
                          borderRadius: "4px",
                        }}
                      ></div>
                      <div>{points}</div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Col>
    </Row>

    <Tab.Container defaultActiveKey="badges">
      <Row>
        <Col md={12}>
          <Nav variant="tabs">
            <Nav.Item>
              <Nav.Link eventKey="badges">Badges</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="rewards">Redeem Rewards</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Tab.Content>
            <Tab.Pane eventKey="badges">
              <Row className="mt-3 mb-3">
                <Col md={6}>
                  <h5>Earned Badges</h5>
                  <Row>
                    {badges.map((badge, idx) => (
                      <Col key={idx} md={6} className="mb-3">
                        <Card>
                          <Card.Body className="text-center">
                            <Badge
                              pill
                              variant="warning"
                              className="mb-2"
                              style={{ fontSize: "2rem" }}
                            >
                              ★
                            </Badge>
                            <h6>{badge.name}</h6>
                            <small>{badge.description}</small>
                            {badge.earned && (
                              <div className="text-success">✓ Earned</div>
                            )}
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Col>
                <Col md={6}>
                  <h5>Badges in Progress</h5>
                  {badgesInProgress.map((badge, idx) => (
                    <Card key={idx} className="mb-3">
                      <Card.Body>
                        <h6>{badge.name}</h6>
                        <small>{badge.description}</small>
                        <ProgressBar
                          now={badge.progress}
                          label={`${badge.progress}%`}
                        />
                      </Card.Body>
                    </Card>
                  ))}
                </Col>
              </Row>
            </Tab.Pane>
            <Tab.Pane eventKey="rewards">
              <div className="mt-4">
                {/* Redeem Rewards content goes here */}
                <h5>No rewards available for redemption.</h5>
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  </Container>
);

export default RewardsPage;
