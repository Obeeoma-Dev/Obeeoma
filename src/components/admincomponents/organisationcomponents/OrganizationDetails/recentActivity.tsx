import React from "react";
import { Card, Button, ListGroup, Row, Col } from "react-bootstrap";
import Stack from "react-bootstrap/Stack";
import { CreditCard, FileText } from "lucide-react";
import "./programEngagementChart";

interface ActivityItem {
  icon: React.ReactNode;
  title: string;
  timestamp: string;
  iconBgClass: string;
}

/* Static list of recent activities */
const activities: ActivityItem[] = [
  {
    icon: <CreditCard size={20} />,
    title: "Subscription Renewed",
    timestamp: "2 days ago • Premium Plan",
    iconBgClass: "icon-bg-success",
  },
  {
    icon: <FileText size={20} />,
    title: "Monthly Report Generated",
    timestamp: "1 week ago • August 2023",
    iconBgClass: "icon-bg-success",
  },
];

export function RecentActivity() {
  return (
    <Row className="align-items-stretch">
      <Col md={6}>
        {/* Navigation / actions card */}
        <Card className="h-100">
          <ListGroup variant="flush">
            {/* Organization settings */}
            <ListGroup.Item>
              <Button
                variant="link"
                className="action-link"
                style={{
                  fontFamily: "body",
                  color: "#dc3545",
                  textDecoration: "none",
                }}
              >
                Activate Organization
              </Button>
            </ListGroup.Item>

            {/* User management */}
            {/* <ListGroup.Item>
              <Button
                variant="link"
                className="action-link"
                style={{
                  fontFamily: "body",
                  color: "black",
                  textDecoration: "none",
                }}
              >
                User Management
              </Button>
            </ListGroup.Item> */}

            {/* Program settings */}
            {/* <ListGroup.Item>
              <Button
                variant="link"
                className="action-link"
                style={{
                  fontFamily: "body",
                  color: "black",
                  textDecoration: "none",
                }}
              >
                Program Settings
              </Button>
            </ListGroup.Item> */}
            

            {/* Deactivate action */}
            <ListGroup.Item>
              <Button
                variant="link"
                className="action-link text-danger"
                style={{
                  fontFamily: "body",
                  color: "#dc3545",
                  textDecoration: "none",
                }}
              >
                Deactivate Organization
              </Button>
            </ListGroup.Item>


            {/* Billing history */}
            <ListGroup.Item>
              <Button
                variant="link"
                className="action-link"
                style={{
                  fontFamily: "body",
                  color: "#dc3545",
                  textDecoration: "none",
                }}
              >
                Delete Organization
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
      
    </Row>
  );
}
