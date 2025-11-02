import Layout from "../../components/employercomponents/shared/Layout";
import StatsGrid from "../../components/employercomponents/employerdashboard/StatsGrid";
import ChartsSection from "../../components/employercomponents/employerdashboard/ChartsSection";
import RecentActivity from "../../components/employercomponents/employerdashboard/RecentActivity";
import { useDashboardData } from "../../hooks/useDashboardData";

const EmployerDashboard = () => {
  const { stats, chartData, activities, loading, error } = useDashboardData();

  if (loading) {
    return (
      <Layout title="Organization Overview">
        <div className="container-fluid text-center py-5">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading dashboard data...</p>
          </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="Organization Overview">
        <div className="container-fluid">
          <div className="alert alert-danger py-4" role="alert">
            {error}
          </div>
        </div>
      </Layout>
    );
  }

  // Transform backend data to component props
  const statsData = stats ? [
    {
      title: "Active Employees",
      value: stats.totalEmployees.toString(),
      icon: "Users",
      color: "success",
    },
    {
      title: "Wellness index",
      value: `${stats.averageScore}%`,
      icon: "TrendingUp",
      color: "warning",
    },
    {
      title: "At Risk",
      value: stats.atRiskDepartments.toString(),
      icon: "AlertTriangle",
      color: "danger",
    },
  ] : [];

  return (
    <Layout title="Organization Overview" >
      <div className="container-fluid py-4 px-3">
        <div className="row gy-4">
          </div><div className="col-12 col-md-10 mx-auto">
            <StatsGrid stats={statsData} />
          </div>

          <div className="col-12 col-md-10 d-flex flex-column gap-3">
            <ChartsSection chartData={chartData} />
            <RecentActivity activities={activities} />
          </div>
          </div>
    </Layout>
  );
};

export default EmployerDashboard;