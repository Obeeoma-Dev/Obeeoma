import Layout from "../../components/employercomponents/shared/Layout";
import ReportsHeader from "../../components/employercomponents/reports/ReportsHeader";
import WellnessTrends from "../../components/employercomponents/reports/WellnessTrends";
import DepartmentMetrics from "../../components/employercomponents/reports/DepartmentMetrics";
import AvailableReports from "../../components/employercomponents/reports/AvailableReports";
import KeyMetrics from "../../components/employercomponents/reports/KeyMetrics";
import { Download, Filter, Calendar } from "lucide-react";

const CompanyReports = () => {
  // TODO: Replace with API call to fetch reports data
  // Example: const { data: reportsData, loading } = useReportsData();

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
      additionalHeaderContent={additionalHeader}>
      <div className="container-fluid py-4">
        <ReportsHeader />
        <WellnessTrends />
        <DepartmentMetrics />
        <AvailableReports />
        <KeyMetrics />
      </div>
    </Layout>
  );
};

export default CompanyReports;