import React from "react";
import { Download } from "lucide-react";
import { useAppDispatch } from "../../../hooks/redux-hooks";
import { downloadReport } from "../../../store/slices/EmployerSlice";

const PRIMARY_COLOR = "#22C55E";

const AvailableReports = () => {
  const dispatch = useAppDispatch();

  const reportTypes = [
    {
      name: "Wellness Summary",
      description: "Overall employee wellness metrics",
      frequency: "Monthly",
      // Placeholder API endpoint that should return a PDF file
      url: "/v1/download/department-analysis/",
    },
    {
      name: "Department Analysis",
      description: "Detailed department-wise breakdown",
      frequency: "Quarterly",
      url: "/v1/download/department-analysis/",
    },
    {
      name: "Risk Assessment",
      description: "Identified risk factors and trends",
      frequency: "Weekly",
      url: "/v1/download/risk-assessment/",
    },
    {
      name: "Engagement Report",
      description: "Employee engagement and participation",
      frequency: "Monthly",
      url: "/v1/download/engagement/",
    },
  ];

  const handleDownload = (url: string, name: string) => {
    const fileName = `${name.replace(/\s/g, "_")}_Report.pdf`;
    dispatch(downloadReport({ url, fileName }));
  };

  return (
    <div className="row">
      <div className="col-12">
        <h3 className="h4 fw-semibold mb-4">Available Reports</h3>
        <div className="row g-4">
          {reportTypes.map((report, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4 d-flex flex-column">
                  <h5 className="card-title fw-bold">{report.name}</h5>
                  <p className="text-muted small flex-grow-1">
                    {report.description}
                  </p>
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <span className="text-dark">{report.frequency}</span>

                    {/* Changed from <a> to <button> to ensure authenticated request */}
                    <button
                      onClick={() => handleDownload(report.url, report.name)}
                      className="btn btn-sm d-flex align-items-center gap-1 text-white"
                      style={{
                        backgroundColor: PRIMARY_COLOR,
                        borderColor: PRIMARY_COLOR,
                      }}
                    >
                      <Download size={14} />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvailableReports;

// import React from "react";
// import { Download } from "lucide-react";

// // Assuming these styles are imported or defined elsewhere
// const PRIMARY_COLOR = "#22C55E";

// const AvailableReports = () => {
//   // TODO: Replace this with data fetched from your API (e.g., a reports endpoint)
//   // The 'url' property should contain the full API path for downloading the specific report PDF.
// const reportTypes = [
//   {
//     name: "Wellness Summary",
//     description: "Overall employee wellness metrics",
//     frequency: "Monthly",
//     // Placeholder API endpoint that should return a PDF file
//     url: "/v1/dashboard/wellness-reports/",
//   },
//   {
//     name: "Department Analysis",
//     description: "Detailed department-wise breakdown",
//     frequency: "Quarterly",
//     url: "/v1/download/department-analysis/",
//   },
//   {
//     name: "Risk Assessment",
//     description: "Identified risk factors and trends",
//     frequency: "Weekly",
//     url: "/v1/download/risk-assessment/",
//   },
//   {
//     name: "Engagement Report",
//     description: "Employee engagement and participation",
//     frequency: "Monthly",
//     url: "/v1/download/engagement/"
//   },
// ];

//   return (
//     <div className="row">
//       <div className="col-12">
//         <h3 className="h4 fw-semibold mb-4">Available Reports</h3>
//         <div className="row g-4">
//           {reportTypes.map((report, index) => (
//             <div key={index} className="col-12 col-md-6 col-lg-3">
//               <div className="card border-0 shadow-sm h-100">
//                 <div className="card-body p-4 d-flex flex-column">
//                   <h5 className="card-title fw-bold">{report.name}</h5>
//                   <p className="text-muted small flex-grow-1">{report.description}</p>
//                   <div className="d-flex justify-content-between align-items-center mt-3">
//                     {/* Frequency Badge */}
//                     <span
//                       className=".fs-5 text"
//                       style={{  color: "#000000" }}
//                     >
//                       {report.frequency}
//                     </span>

//                     {/* Download Link */}
//                     <a
//                       // The browser resolves this relative URL using the VITE_API_BASE_URL
//                       href={report.url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       // The 'download' attribute tells the browser to download the file instead of navigating
//                       download={`${report.name.replace(/\s/g, '_')}_Report.pdf`}

//                       // Styling the anchor tag as a button
//                       className="btn btn-sm d-flex align-items-center gap-1 text-white"
//                       style={{ backgroundColor: PRIMARY_COLOR, borderColor: PRIMARY_COLOR }}
//                     >
//                       <Download size={14} />
//                       Download
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AvailableReports;

// import { Download } from "lucide-react";

// const PRIMARY_COLOR = "#22C55E";

// const AvailableReports = () => {
//   // TODO: Replace with API data
//   const reportTypes = [
//     { name: "Wellness Summary", description: "Overall employee wellness metrics", frequency: "Monthly" },
//     { name: "Department Analysis", description: "Detailed department-wise breakdown", frequency: "Quarterly" },
//     { name: "Risk Assessment", description: "Identified risk factors and trends", frequency: "Weekly" },
//     { name: "Engagement Report", description: "Employee engagement and participation", frequency: "Monthly" },
//   ];

//   return (
//     <div className="row">
//       <div className="col-12">
//         <h3 className="h4 fw-semibold mb-4">Available Reports</h3>
//         <div className="row g-4">
//           {reportTypes.map((report, index) => (
//             <div key={index} className="col-12 col-md-6 col-lg-3">
//               <div className="card border-0 shadow-sm h-100">
//                 <div className="card-body p-4 d-flex flex-column">
//                   <h5 className="card-title fw-bold">{report.name}</h5>
//                   <p className="text-muted small flex-grow-1">{report.description}</p>
//                   <div className="d-flex justify-content-between align-items-center mt-3">
//
//                     <span
//                          className="badge text-white"
//                          style={{ backgroundColor: PRIMARY_COLOR, color: "white" }}
//                     >
//                         {report.frequency}
//                     </span>
//

//                     <button
//                          className="btn btn-sm d-flex align-items-center gap-1 text-white"
//                          style={{ backgroundColor: PRIMARY_COLOR, borderColor: PRIMARY_COLOR }}
//                     >

//                       <Download size={14} />
//                       Download
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AvailableReports;
