// src/components/admincomponents/subscriptioncomponents/RecentSubscriptionsTable.tsx

import React from 'react';
import { Card, Table, Badge, Button } from 'react-bootstrap';
import { CheckCircle2 } from 'lucide-react';

/**
 * Subscription row interface
 * Matches the data structure used in the parent page
 */
export interface Subscription {
  organization: string;
  plan: string;
  mrr: string;
  subscribers: number;
  status: string;
  renewalDate: string;
  badge?: string;
  badgeVariant?: string;
}

/**
 * Component props
 */
interface Props {
  subscriptions: Subscription[];
}

/**
 * RecentSubscriptionsTable
 *
 * Renders a subscriptions table visually identical to the reference design.
 * Designed to be placed inside <Card.Body className="p-0" />.
 */
const RecentSubscriptionsTable: React.FC<Props> = ({ subscriptions }) => {
  return (
    <Card className="border-0 rounded-0">
      {/* Header */}
      <Card.Header className="bg-white">
        <h5 className="mb-1" style={{ fontFamily: 'heading' }}>Recent Subscriptions</h5>
        <p className="text-muted mb-0" style={{ fontFamily: 'body' }}>
          View and manage organization subscriptions in a table below
        </p>
      </Card.Header>

      {/* Table */}
      <Table responsive hover className="mb-0 align-middle">
        <thead className="table-light" style={{ fontFamily: 'heading' }}>
          <tr>
            <th>AUTO ORGANIZATION</th>
            <th>ENTERPRISE</th>
            <th>MRR</th>
            <th>SUBSCRIBERS</th>
            <th>STATUS</th>
            <th>RENEWAL DATE</th>
            <th>STATUS</th>
          </tr>
        </thead>

        <tbody>
          {subscriptions.map((sub) => (
            <tr key={`${sub.organization}-${sub.renewalDate}`}>
              <td className="fw-medium">{sub.organization}</td>
              <td>{sub.plan}</td>
              <td className="fw-semibold">{sub.mrr}</td>
              <td>{sub.subscribers}</td>

              {/* Active status badge */}
              <td>
                <Badge
                  bg="success"
                  className="d-inline-flex align-items-center gap-1 px-3 py-1 rounded-pill"
                >
                  <CheckCircle2 size={12} />
                  Active
                </Badge>
              </td>

              <td>{sub.renewalDate}</td>

              {/* New / Old / Expiration badge */}
              <td>
                <Badge
                  bg={sub.badgeVariant}
                  className="px-3 py-1 rounded-pill fw-medium"
                >
                  {sub.badge}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Footer */}
      <Card.Footer className="bg-white text-center">
        <Button variant="link" className="fw-medium text-success">
          View all →
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default RecentSubscriptionsTable;
