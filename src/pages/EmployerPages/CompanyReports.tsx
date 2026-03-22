import Layout from "../../components/employercomponents/shared/Layout";
import WellnessTrends from "../../components/employercomponents/reports/WellnessTrends";
import AvailableReports, {
  ReportType,
} from "../../components/employercomponents/reports/AvailableReports";
import { Download, Filter, Calendar } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const CompanyReports = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const employer = useSelector(
    (state: RootState) => state.employer.currentEmployer,
  );
  const companyIdValue =
    employer?.company?.id ||
    user?.company_id ||
    employer?.organizationName ||
    user?.organizationName;
  const companyIdStr = companyIdValue ? String(companyIdValue) : undefined;
  const { data: reportsData } = useReportsData(companyIdStr);

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
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="h4 mb-0 fw-bold">Wellness Trends</h2>
          </div>
          <WellnessTrends companyId={companyIdStr} />
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
      url: companyId ? `/company-mood/${companyId}/` : "/company-mood/",
    },
    {
      name: "Department Analysis",
      description: "Detailed department-wise breakdown",
      defaultFrequency: "Quarterly",
      url: "/download/department-analysis/",
    },
    {
      name: "Risk Assessment",
      description: "Identified risk factors and trends",
      defaultFrequency: "Weekly",
      url: "/download/risk-assessment/",
    },
    {
      name: "Engagement Report",
      description: "Employee engagement and participation",
      defaultFrequency: "Monthly",
      url: "/download/engagement/",
    },
  ];

  return { data: reports, loading: false };
}
