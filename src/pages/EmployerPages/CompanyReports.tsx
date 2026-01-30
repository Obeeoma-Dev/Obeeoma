import Layout from "../../components/employercomponents/shared/Layout";
import WellnessTrends from "../../components/employercomponents/reports/WellnessTrends";
import AvailableReports, { ReportType } from "../../components/employercomponents/reports/AvailableReports";
import { Download, Filter, Calendar } from "lucide-react";

const CompanyReports = () => {
  // Assuming we might get companyId from params or context in the future
  const companyId = undefined;
  const { data: reportsData } = useReportsData(companyId);

  const additionalHeader = (
    <div className="d-flex gap-2">
      <button className="btn btn-outline-secondary d-flex align-items-center gap-2">
        <Filter size={16} />
        Filter
      </button>
      <button className="btn btn-outline-secondary d-flex align-items-center gap-2">
        <Calendar size={16} />
        Date Range
      </button>
      <button className="btn btn-success d-flex align-items-center gap-2">
        <Download size={16} />
        Export All
      </button>
    </div>
  );

  return (
    <Layout
      title="Company Reports"
      showSearch={true}
      additionalHeaderContent={additionalHeader}
    >
      <div className="container-fluid py-4">
        <div>
          <h3 className="mb-4">Wellness Trends</h3>
          <WellnessTrends companyId={companyId} />
        </div>
        {/* <DepartmentMetrics /> */}
        <AvailableReports reports={reportsData} />
      </div>
    </Layout>
  );
};

export default CompanyReports;

function useReportsData(companyId?: string) {
  const reports: ReportType[] = [
    {
      name: "Wellness Summary",
      description: "Overall employee wellness metrics",
      defaultFrequency: "Monthly",
      url: companyId ? `/v1/company-mood/${companyId}/` : "/v1/company-mood/",
    },
    {
      name: "Department Analysis",
      description: "Detailed department-wise breakdown",
      defaultFrequency: "Quarterly",
      url: "/v1/download/department-analysis/",
    },
    {
      name: "Risk Assessment",
      description: "Identified risk factors and trends",
      defaultFrequency: "Weekly",
      url: "/v1/download/risk-assessment/",
    },
    {
      name: "Engagement Report",
      description: "Employee engagement and participation",
      defaultFrequency: "Monthly",
      url: "/v1/download/engagement/",
    },
  ];

  return { data: reports, loading: false };
}