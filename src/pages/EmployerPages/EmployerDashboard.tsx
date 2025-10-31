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
        <div className="container-fluid py-4">
          <div className="text-center">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading dashboard data...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="">
        <div className="container-fluid py-4">
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        </div>
      </Layout>
    );
  }

  // Transform backend data to component props
  const statsData = stats ? [
    {
      title: "Total Employees",
      value: stats.totalEmployees.toString(),
      description: "Active employees in the system",
      icon: "Users",
      color: "success",
    },
    {
      title: "Total Tests",
      value: stats.totalTests.toString(),
      description: "Tests completed",
      icon: "FileCheck",
      color: "info",
    },
    {
      title: "Average Score",
      value: `${stats.averageScore}%`,
      description: "Average wellness score",
      icon: "TrendingUp",
      color: "warning",
    },
    {
      title: "At Risk",
      value: stats.atRiskDepartments.toString(),
      description: "Departments with risk factors",
      icon: "AlertTriangle",
      color: "danger",
    },
  ] : [];

  return (
    <Layout title="Organization Overview" >
      <div className="container-fluid py-4">
        <StatsGrid stats={statsData} />
        <ChartsSection chartData={chartData} />
        <RecentActivity activities={activities} />
      </div>
    </Layout>
  );
};

export default EmployerDashboard;