// src/components/admincomponents/aimanagementcomponents/TopTriggers.tsx

import React from "react";
import { Card, Badge } from "react-bootstrap";
import { ExclamationCircleFill } from "react-bootstrap-icons";

// Props interface for trigger list
interface TopTriggersProps {
  triggers: string[];
}

// Functional component rendering anxiety triggers as badges
const TopTriggers: React.FC<TopTriggersProps> = ({ triggers }) => {
  return (
    <Card className="shadow-sm mb-4">
      {/* Section header with icon */}
      <Card.Header className="fw-semibold d-flex align-items-center">
        <ExclamationCircleFill className="me-2 text-danger" size={20} />
        Top Anxiety Triggers
      </Card.Header>

      {/* Badge list inside card body */}
      <Card.Body>
        {triggers.map((trigger) => (
          <Badge
            key={trigger}
            bg="danger"
            className="me-2 mb-2"
            style={{ fontSize: "0.9rem" }}
          >
            {trigger}
          </Badge>
        ))}
      </Card.Body>
    </Card>
  );
};

export default TopTriggers;
