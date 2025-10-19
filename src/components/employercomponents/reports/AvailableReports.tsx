import { Download } from "lucide-react";

const AvailableReports = () => {
  // TODO: Replace with API data
  const reportTypes = [
    { name: "Wellness Summary", description: "Overall employee wellness metrics", frequency: "Monthly" },
    { name: "Department Analysis", description: "Detailed department-wise breakdown", frequency: "Quarterly" },
    { name: "Risk Assessment", description: "Identified risk factors and trends", frequency: "Weekly" },
    { name: "Engagement Report", description: "Employee engagement and participation", frequency: "Monthly" },
  ];

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
                  <p className="text-muted small flex-grow-1">{report.description}</p>
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <span className="badge bg-light text-dark">{report.frequency}</span>
                    <button className="btn btn-primary btn-sm d-flex align-items-center gap-1">
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