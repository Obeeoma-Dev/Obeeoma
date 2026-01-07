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
