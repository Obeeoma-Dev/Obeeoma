<<<<<<< HEAD
// src/components/admincomponents/Hotline-activity/CriticalCases.tsx
import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

interface Case {
  id: string;
  reason: string;
  status: string;
  assignedTo: string;
}

const cases: Case[] = [
  { id: '04567', reason: 'Abuse', status: 'Pending', assignedTo: 'John Smith' },
];

const CriticalCases: React.FC = () => {
  return (
    <Card className="mb-4">
      <Card.Body>
        <h5>Critical Cases</h5>
        <ListGroup>
          {cases.map((c) => (
            <ListGroup.Item key={c.id}>
              <strong>Case ID:</strong> {c.id} | <strong>Reason:</strong> {c.reason} | <strong>Status:</strong> {c.status} | <strong>Assigned to:</strong> {c.assignedTo}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

=======
// src/components/admincomponents/Hotline-activity/CriticalCases.tsx
import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

interface Case {
  id: string;
  reason: string;
  status: string;
  assignedTo: string;
}

const cases: Case[] = [
  { id: '04567', reason: 'Abuse', status: 'Pending', assignedTo: 'John Smith' },
];

const CriticalCases: React.FC = () => {
  return (
    <Card className="mb-4">
      <Card.Body>
        <h5>Critical Cases</h5>
        <ListGroup>
          {cases.map((c) => (
            <ListGroup.Item key={c.id}>
              <strong>Case ID:</strong> {c.id} | <strong>Reason:</strong> {c.reason} | <strong>Status:</strong> {c.status} | <strong>Assigned to:</strong> {c.assignedTo}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

>>>>>>> syda
export default CriticalCases;