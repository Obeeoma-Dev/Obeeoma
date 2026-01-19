import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import * as Icons from "lucide-react";


export interface StatCardData { 
  id: string;  
  title: string;  
  value: string | number;  
  change: string;  
  icon: string;  
  iconColor: string;
}


interface OrganizationStatsProps {
  stats: StatCardData[];
}


const OrganizationStats: React.FC<OrganizationStatsProps> = ({ stats }) => {
  return (
    <section className="mb-4">
      {/* Header row with title and action button */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-semibold text-dark">Organizations</h4>
        <Button variant="success" size="sm">
          + Add Organization
        </Button>
      </div>

      
      <Row className="gy-4">
        {stats.map((stat) => {
          // Dynamically select icon from lucide-react
          const IconComponent = (Icons[stat.icon as keyof typeof Icons] ??
            Icons.Activity) as React.FC<{
            size?: number;
            color?: string;
          }>;

          return (
            <Col key={stat.id} xs={12} md={6} lg={3}>
              <Card className="border-0 shadow-sm mb-3">
                <Card.Body className="d-flex align-items-start justify-content-between px-2 py-3">
                  {/* Left section: icon and text */}
                  <div className="d-flex align-items-start gap-3 flex-grow-1">
                    <div
                      className="rounded d-flex align-items-center justify-content-center"
                      style={{ width: "40px", height: "40px" }}
                    >
                      <IconComponent size={20} color="#3CB371" />
                    </div>

                    <div>
                      <div className="fw-semibold mb-1">{stat.title}</div>
                      <div className="text-muted small">{stat.value}</div>
                    </div>
                  </div>

                  {/* Right section: change percentage */}
                  <div className="text-muted small text-end">{stat.change}</div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </section>
  );
};

export default OrganizationStats;
