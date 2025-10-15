// src/components/admincomponents/subscriptioncomponents/RecentActivityFeed.tsx

import React from 'react';
import { ListGroup } from 'react-bootstrap';

interface Props {
  activities: string[];
}

const RecentActivityFeed: React.FC<Props> = ({ activities }) => {
  return (
    <div className="mb-4">
      <h5>Recent Activity</h5>
      <ListGroup>
        {activities.map((activity, index) => (
          <ListGroup.Item key={index}>{activity}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default RecentActivityFeed;