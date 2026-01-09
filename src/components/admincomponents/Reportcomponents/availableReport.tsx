import React, { useState } from "react";
// Import React-Bootstrap components
import { Card, Button, Stack } from "react-bootstrap";
// Import icons
import { Download } from "lucide-react";
// Import popup component
import { DownloadPopup } from "./dowloadpopup";

// Define the Report interface
interface Report {
  id: string;
  title: string;
  type: string;
  date: string;
  size: string;
  format?: string; // Added to support your icon color logic
}

// Example reports data
const reports: Report[] = [
  {
    id: "1",
    title: "Monthly Usage Report",
    type: "PDF",
    date: "Jan 2026",
    size: "2.3 MB",
    format: "pdf",
  },
];

/**
 * Helper function to determine icon background color based on format
 */
const getIconColor = (format?: string) => {
  switch (format?.toLowerCase()) {
    case "pdf":
      return "#e44d26"; // Reddish for PDF
    case "csv":
      return "#217346"; // Green for CSV/Excel
    default:
      return "#6c757d"; // Gray default
  }
};

export function AvailableReports() {
  // Controls popup visibility
  const [downloadPopupOpen, setDownloadPopupOpen] = useState(false);
  // Stores the selected report
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  // Handles clicking the download button
  const handleDownloadClick = (report: Report) => {
    setSelectedReport(report);
    setDownloadPopupOpen(true);
  };

  return (
    <Card className="p-3">
      <Card.Body>
        <Card.Title className="mb-4">Available Reports</Card.Title>

        <Stack gap={3}>
<<<<<<< HEAD
          {reports.map((report) => (
            // Individual report card
            <Card key={report.id}>
              <Card.Body>
                {/* Layout row */}
                <div className="d-flex justify-content-between align-items-center">
                  {/* Left side: icon + text */}
                  <div className="d-flex align-items-center gap-3">
                    {/* Icon wrapper */}
                    <div>
                      <FileText size={20} />
                    </div>
=======
          {reports.map((report, index) => (
            <div
              key={report.id}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "1rem 0",
                // Corrected: Compare against index to handle the last item properly
                borderBottom:
                  index !== reports.length - 1 ? "1px solid #e9ecef" : "none",
                gap: "1rem",
                justifyContent: "space-between", // Ensures button stays to the right
              }}
            >
              {/* Left Side: Icon and Info */}
              <div
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
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
                    <path
                      d="M6 2h8l4 4v14H6V2z"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14 2v4h4"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
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

                <div>
                  <div className="fw-medium">{report.title}</div>
                  <small className="text-muted">
                    {report.type} • {report.date} • {report.size}
                  </small>
                </div>
              </div>
>>>>>>> 0305418c6bc29903147e41a9f90c7a47ae00e0f2

              {/* Right Side: Download button */}
              <Button
                variant="outline-success"
                onClick={() => handleDownloadClick(report)}
                className="d-flex align-items-center justify-content-center"
                style={{ width: "40px", height: "40px", padding: 0 }}
              >
                <Download size={18} />
              </Button>
            </div>
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
<<<<<<< HEAD
  )
}
=======
  );
}

export default AvailableReports;

// // Import React core
// import React, { useState } from 'react'

// // Import React-Bootstrap components
// import { Card, Button, Stack } from 'react-bootstrap'

// // Import icons
// import { FileText, Download } from 'lucide-react'

// // Import popup component
// import { DownloadPopup } from './dowloadpopup'

// // Define the Report interface (unchanged, just fixed syntax)
// interface Report {
//   id: string
//   title: string
//   type: string
//   date: string
//   size: string
// }

// // Example reports data (you already had this somewhere)
// const reports: Report[] = [
//   {
//     id: '1',
//     title: 'Monthly Usage Report',
//     type: 'PDF',
//     date: 'Jan 2026',
//     size: '2.3 MB',
//   },
// ]

// // Main component export
// export function AvailableReports() {
//   // Controls popup visibility
//   const [downloadPopupOpen, setDownloadPopupOpen] = useState(false)

//   // Stores the selected report
//   const [selectedReport, setSelectedReport] = useState<Report | null>(null)

//   // Handles clicking the download button
//   const handleDownloadClick = (report: Report) => {
//     // Set selected report
//     setSelectedReport(report)

//     // Open popup
//     setDownloadPopupOpen(true)
//   }

//   // JSX return
//   return (
//     // Bootstrap Card wrapper
//     <Card className="p-3">
//       {/* Card body */}
//       <Card.Body>
//         {/* Section title */}
//         <Card.Title className="mb-4">Available Reports</Card.Title>

//         {/* Reports list */}
//         <Stack gap={3}>
//           {reports.map((report) => (
//             <div
//               key={report.id}
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 padding: "1rem 0",
//                 borderBottom:
//                   report.id !== reports.length ? "1px solid #e9ecef" : "none",
//                 gap: "1rem",
//               }}
//             >
//               {/* Icon - Document with three horizontal lines */}
//               <div
//                 style={{
//                   width: "40px",
//                   height: "40px",
//                   backgroundColor: getIconColor(report.format),
//                   borderRadius: "6px",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   flexShrink: 0,
//                 }}
//               >
//                 <svg
//                   width="24"
//                   height="24"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   {/* Document outline */}
//                   <path
//                     d="M6 2h8l4 4v14H6V2z"
//                     stroke="white"
//                     strokeWidth="1.5"
//                     fill="none"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                   {/* Folded corner */}
//                   <path
//                     d="M14 2v4h4"
//                     stroke="white"
//                     strokeWidth="1.5"
//                     fill="none"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                   {/* Three horizontal lines (document content) */}
//                   <line
//                     x1="8"
//                     y1="10"
//                     x2="16"
//                     y2="10"
//                     stroke="white"
//                     strokeWidth="1.5"
//                     strokeLinecap="round"
//                   />
//                   <line
//                     x1="8"
//                     y1="13"
//                     x2="16"
//                     y2="13"
//                     stroke="white"
//                     strokeWidth="1.5"
//                     strokeLinecap="round"
//                   />
//                   <line
//                     x1="8"
//                     y1="16"
//                     x2="14"
//                     y2="16"
//                     stroke="white"
//                     strokeWidth="1.5"
//                     strokeLinecap="round"
//                   />
//                 </svg>
//               </div>

//                     {/* Text content */}
//                     <div>
//                       <div className="fw-medium">{report.title}</div>
//                       <small className="text-muted">
//                         {report.type} • {report.date} • {report.size}
//                       </small>
//                     </div>
//                   </div>

//                   {/* Download button */}
//                   <Button
//                     variant="outline-success"
//                     onClick={() => handleDownloadClick(report)}
//                   >
//                     <Download size={18} />
//                   </Button>
//                 </div>
//               </Card.Body>
//             </Card>
//           ))}
//         </Stack>

//         {/* Download popup */}
//         {selectedReport && (
//           <DownloadPopup
//             isOpen={downloadPopupOpen}
//             onClose={() => setDownloadPopupOpen(false)}
//             reportTitle={selectedReport.title}
//             reportType={selectedReport.type}
//             reportDate={selectedReport.date}
//             reportSize={selectedReport.size}
//           />
//         )}
//       </Card.Body>
//     </Card>
//   );
// };

// export default AvailableReports;
>>>>>>> 0305418c6bc29903147e41a9f90c7a47ae00e0f2
