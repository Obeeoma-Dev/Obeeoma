// Lists top anxiety triggers

import React from 'react';
import { Badge } from 'react-bootstrap';

interface TopTriggersProps {
  triggers: string[];
}

const TopTriggers: React.FC<TopTriggersProps> = ({ triggers }) => (
  <div className="mb-4">
    <h5>Top Anxiety Triggers</h5>
    {triggers.map((trigger) => (
      <Badge key={trigger} bg="danger" className="me-2">
        {trigger}
      </Badge>
    ))}
  </div>
);

export default TopTriggers;