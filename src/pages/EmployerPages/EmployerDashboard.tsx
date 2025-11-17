// EmployerPages/EmployerDashboard.tsx
import Layout from "../../components/employercomponents/shared/Layout";
import StatsGrid from "../../components/employercomponents/employerdashboard/StatsGrid";
import EmployeeTable from "../../components/employercomponents/companyemployees/EmployeeTable";
import DepartmentLegend from "../../components/employercomponents/employerdashboard/DepartmentLegend";
import WellnessGraph from "../../components/employercomponents/employerdashboard/WellnessGraph";
import RecentActivity from "../../components/employercomponents/employerdashboard/RecentActivity";
import { useDashboardData } from "../../hooks/useDashboardData";
import { useState } from "react";

// Props interface for better type safety
interface DashboardProps {
  companyId?: string;
  refreshInterval?: number;
}

const EmployerDashboard: React.FC<DashboardProps> = ({ 
  companyId, 
  refreshInterval = 300000 // 5 minutes default
}) => {
  const { stats, employeeData, activities, loading, error } = useDashboardData();
  const [searchQuery, setSearchQuery] = useState("");

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
      title: "Wellness Index",
      value: `${stats.wellnessIndex}%`,
      icon: "TrendingUp",
      color: "warning",
    },
    {
      title: "At Risk",
      value: stats.atRisk.toString(),
      icon: "AlertTriangle",
      color: "danger",
    },
  ] : [];

  return (
    <Layout title="Organization Overview">
      <div className="container-fluid py-4 px-3">
        <div className="row gy-4">
          <div className="col-lg-12 col-md-10 mx-auto">
            <StatsGrid stats={statsData} />
          </div>

          <div className="col-lg-8 col-md-12">
            <EmployeeTable 
              searchQuery={searchQuery} 
              onSearchChange={setSearchQuery}
              employees={employeeData.employees as any} // Temporary cast
              companyId={companyId}
            />
          </div>

          <div className="col-lg-4 col-md-12">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title fw-semibold mb-4">Department Distribution</h5>
                <DepartmentLegend 
                  departments={stats?.departmentDistribution || []} 
                  totalEmployees={stats?.totalEmployees || 0}
                />
                
                <div className="mt-4">
                  <h5 className="card-titl e fw-semibold mb-4">Wellness Trend</h5>
                  <WellnessGraph 
                    data={stats?.wellnessTrend || []} 
                    moodData={employeeData.moodTrends}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-12 col-md-12">
            <RecentActivity 
              activities={activities} 
              onViewAll={() => console.log('View all activities')}
              maxItems={5}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmployerDashboard;