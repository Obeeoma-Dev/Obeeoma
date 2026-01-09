// src/components/admincomponents/Hotline-activity/CallLogTable.tsx

/**
 * CallLogTable
 * -------------
 * Refined React-Bootstrap version of the call log table.
 * Styling and layout upgraded to match enterprise dashboard standards.
 *
 * NOTE:
 * - No TailwindCSS used
 * - No functional logic changed
 * - Safe drop-in replacement
 */

import React from "react";
import { Table, Card, Badge, Button, Form, InputGroup } from "react-bootstrap";
import { Search, Filter, MoreVertical } from "lucide-react";

/**
 * Type definition for each call log entry
 * (kept minimal to avoid breaking existing logic)
 */
interface CallLog {
  time: string;
  date: string;
  reason: string;
  operator: string;
  status: string;
}

/**
 * Placeholder call logs
 * (unchanged to avoid breaking current behavior)
 */
const callLogs: CallLog[] = [
  {
    time: "11:00 AM",
    date: "12/04/2023",
    reason: "Anxiety",
    operator: "John Smith",
    status: "Missed",
  },
  {
    time: "12:30 PM",
    date: "12/04/2023",
    reason: "Depression",
    operator: "Emily Brown",
    status: "Completed",
  },
  {
    time: "2:00 PM",
    date: "12/04/2023",
    reason: "Grief",
    operator: "Michael Jones",
    status: "Ongoing",
  },
];

/**
 * CallLogTable component
 */
const CallLogTable: React.FC = () => {
  return (
    /**
     * Card wrapper for clean dashboard presentation
     */
    <Card className="p-4 mb-4">
      {/* ======================
          Header Section
      ====================== */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3 mb-4">
        {/* Search input (visual only) */}
        <InputGroup style={{ maxWidth: "320px" }}>
          <InputGroup.Text>
            <Search size={16} />
          </InputGroup.Text>

          <Form.Control
            type="text"
            placeholder="Search by reason or operator..."
          />
        </InputGroup>

        {/* Filter button (visual only) */}
        <Button
          variant="outline-secondary"
          size="sm"
          className="d-flex align-items-center gap-2"
        >
          <Filter size={16} />
          Filter
        </Button>
      </div>

      {/* ======================
          Table Section
      ====================== */}
      <div className="table-responsive">
        <Table hover borderless className="align-middle">
          {/* Table Head */}
          <thead className="text-uppercase text-muted small">
            <tr>
              <th>Time</th>
              <th>Date</th>
              <th>Reason</th>
              <th>Operator</th>
              <th>Status</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {callLogs.map((log, index) => (
              <tr key={index}>
                {/* Time */}
                <td className="fw-semibold">{log.time}</td>

                {/* Date */}
                <td className="text-muted">{log.date}</td>

                {/* Reason */}
                <td>{log.reason}</td>

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
