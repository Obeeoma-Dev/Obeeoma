import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { DatabaseOrganization } from "../organisationTable";

interface OrganizationStatsProps {
  organization: DatabaseOrganization;
}

/* Reusable StatCard component */
function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <Card className="p-3" style={{ fontFamily: "body" }}>
      <Card.Body>
        <Card.Text className="text-muted mb-2">{label}</Card.Text>

        {/* Large bold text for the statistic value */}
        <Card.Title as="h2">{value}</Card.Title>
      </Card.Body>
    </Card>
  );
}

/* OrganizationStats component */
export function OrganizationStats({ organization }: OrganizationStatsProps) {
  // Get client count from the available field
  const clientCount = organization.client_count || 0;

  return (
    <Row style={{ fontFamily: "body" }} className="mb-4">
      <Col xs={12} className="mb-3">
        <StatCard label="Total Clients" value={clientCount.toLocaleString()} />
      </Col>
      <Col xs={12}>
        <StatCard label="Active Programs" value="8" />
      </Col>
    </Row>
  );
}
