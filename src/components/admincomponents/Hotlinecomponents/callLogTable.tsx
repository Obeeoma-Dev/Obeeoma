// src/components/admincomponents/Hotline-activity/CallLogTable.tsx
import React from "react";
import { Table } from "react-bootstrap";

// Define the structure of each call log entry
interface CallLog {
  time: string;
  date: string;
  reason: string;
  operator: string;
  status: string;
}

// Placeholder call logs
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

const CallLogTable: React.FC = () => {
  return (
    <Table striped bordered hover responsive className="mb-4">
      <thead>
        <tr>
          <th>Time</th>
          <th>Date</th>
          <th>Reason</th>
          <th>Operator</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {callLogs.map((log, index) => (
          <tr key={index}>
            <td>{log.time}</td>
            <td>{log.date}</td>
            <td>{log.reason}</td>
            <td>{log.operator}</td>
            <td>{log.status}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CallLogTable;
