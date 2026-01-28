import React from "react";
import { Card, Row, Col } from "react-bootstrap";

interface StatCardProps {
  label: string;
  value: string | number;
}

/* Reusable StatCard component */
function StatCard({ label, value }: StatCardProps) {
    return (

        <Card className="p-3" style={{ fontFamily: 'body' }}>

            <Card.Body>

                <Card.Text className="text-muted mb-2">
                    {label}
                </Card.Text>

        {/* Large bold text for the statistic value */}
        <Card.Title as="h2">{value}</Card.Title>
      </Card.Body>
    </Card>
  );
}

/* OrganizationStats component */
export function OrganizationStats() {
  return (
    <Row style={{ fontFamily: "body" }} className="mb-4">
      <Col xs={12} className="mb-3">
        <StatCard label="Total Clients" value="245" />
      </Col>
      <Col xs={12}>
        <StatCard label="Active Programs" value="8" />
      </Col>
    </Row>
  );
}
