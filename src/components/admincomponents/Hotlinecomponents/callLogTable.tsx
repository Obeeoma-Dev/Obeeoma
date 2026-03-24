import React from "react";
import { Table, Card, Badge, Button, Form, InputGroup } from "react-bootstrap";
import { Search, Filter, MoreVertical } from "lucide-react";

export interface CallLog {
  time: string;
  date: string;
  operator: string;
  status: string;
}

interface CallLogTableProps {
  logs?: CallLog[];
}

const CallLogTable: React.FC<CallLogTableProps> = ({ logs }) => {
  const callLogs = logs || [];

  if (!callLogs.length) {
    return (
      <Card className="p-4 mb-4">
        <div className="text-center text-muted py-4">
          No call logs available.
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 mb-4">
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3 mb-4">
        <InputGroup style={{ maxWidth: "320px" }}>
          <InputGroup.Text>
            <Search size={16} />
          </InputGroup.Text>
          <Form.Control type="text" placeholder="Search by operator..." />
        </InputGroup>
        <Button
          variant="outline-secondary"
          size="sm"
          className="d-flex align-items-center gap-2"
        >
          <Filter size={16} />
          Filter
        </Button>
      </div>

      <div className="table-responsive">
        <Table hover borderless className="align-middle">
          <thead className="text-uppercase text-muted small">
            <tr>
              <th>Time</th>
              <th>Date</th>
              <th>Operator</th>
              <th>Status</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>

          <tbody>
            {callLogs.map((log, index) => (
              <tr key={index}>
                {/* Time */}
                <td className="fw-semibold">{log.time}</td>

                {/* Date */}
                <td className="text-muted">{log.date}</td>

                {/* Operator */}
                <td className="text-muted">{log.operator}</td>

                {/* Status Badge */}
                <td>
                  <Badge
                    bg={
                      log.status === "Completed"
                        ? "success"
                        : log.status === "Ongoing"
                          ? "warning"
                          : "secondary"
                    }
                  >
                    {log.status}
                  </Badge>
                </td>

                {/* Actions */}
                <td className="text-end">
                  <Button
                    variant="link"
                    className="text-muted p-0"
                    aria-label="More actions"
                  >
                    <MoreVertical size={18} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Card>
  );
};

export default CallLogTable;
