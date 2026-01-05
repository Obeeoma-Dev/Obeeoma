// Import React core
import React, { useState } from 'react'

// Import React-Bootstrap components
import { Card, Button, Stack } from 'react-bootstrap'

// Import icons
import { FileText, Download } from 'lucide-react'

// Import popup component
import { DownloadPopup } from './dowloadpopup'

// Define the Report interface (unchanged, just fixed syntax)
interface Report {
  id: string
  title: string
  type: string
  date: string
  size: string
}

// Example reports data (you already had this somewhere)
const reports: Report[] = [
  {
    id: '1',
    title: 'Monthly Usage Report',
    type: 'PDF',
    date: 'Jan 2026',
    size: '2.3 MB',
  },
]

// Main component export
export function AvailableReports() {
  // Controls popup visibility
  const [downloadPopupOpen, setDownloadPopupOpen] = useState(false)

  // Stores the selected report
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)

  // Handles clicking the download button
  const handleDownloadClick = (report: Report) => {
    // Set selected report
    setSelectedReport(report)

    // Open popup
    setDownloadPopupOpen(true)
  }

  // JSX return
  return (
    // Bootstrap Card wrapper
    <Card className="p-3">
      {/* Card body */}
      <Card.Body>
        {/* Section title */}
        <Card.Title className="mb-4">Available Reports</Card.Title>

        {/* Reports list */}
        <Stack gap={3}>
          {reports.map((report) => (
            <div
              key={report.id}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "1rem 0",
                borderBottom:
                  report.id !== reports.length ? "1px solid #e9ecef" : "none",
                gap: "1rem",
              }}
            >
              {/* Icon - Document with three horizontal lines */}
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: getIconColor(report.format),
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Document outline */}
                  <path
                    d="M6 2h8l4 4v14H6V2z"
                    stroke="white"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Folded corner */}
                  <path
                    d="M14 2v4h4"
                    stroke="white"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Three horizontal lines (document content) */}
                  <line
                    x1="8"
                    y1="10"
                    x2="16"
                    y2="10"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <line
                    x1="8"
                    y1="13"
                    x2="16"
                    y2="13"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <line
                    x1="8"
                    y1="16"
                    x2="14"
                    y2="16"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

                    {/* Text content */}
                    <div>
                      <div className="fw-medium">{report.title}</div>
                      <small className="text-muted">
                        {report.type} • {report.date} • {report.size}
                      </small>
                    </div>
                  </div>

                  {/* Download button */}
                  <Button
                    variant="outline-success"
                    onClick={() => handleDownloadClick(report)}
                  >
                    <Download size={18} />
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </Stack>

        {/* Download popup */}
        {selectedReport && (
          <DownloadPopup
            isOpen={downloadPopupOpen}
            onClose={() => setDownloadPopupOpen(false)}
            reportTitle={selectedReport.title}
            reportType={selectedReport.type}
            reportDate={selectedReport.date}
            reportSize={selectedReport.size}
          />
        )}
      </Card.Body>
    </Card>
  );
};

export default AvailableReports;
