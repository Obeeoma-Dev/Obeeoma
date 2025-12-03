import TopGrid from "../../components/employercomponents/employerdashboard/TopGrid";
import Layout from "../../components/employercomponents/shared/Layout";
import EmployeeStatusLegend from "../../components/employercomponents/employerdashboard/EmployeeStatusLegend";
import FeatureUsageBreakdown from "../../components/employercomponents/employerdashboard/FeatureUsageBreakdown";
import WellnessGraph from "../../components/employercomponents/employerdashboard/WellnessGraph";
import RecentActivity from "../../components/employercomponents/employerdashboard/RecentActivity";
import AddEmployeeForm from "../../components/employercomponents/companyemployees/AddEmployeeForm";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useDashboardData } from "../../hooks/useDashboardData";
import { DashboardProps } from "@/types/employer";
import {
  fetchEmployerDashboardSummary,
  fetchEmployeeStatus,
  fetchEmployeeInvites,
  fetchEmployees,
} from "../../store/slices/EmployerSlice";

const EmployerDashboard: React.FC<DashboardProps> = ({
  companyId,
}) => {
  const dispatch = useDispatch<any>();
  // Assume useDashboardData provides `generalMood` within the `stats` object
  const { stats, employeeData, activities, loading, error } = useDashboardData(); 
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  
  const PRIMARY_COLOR = "#22C55E";

  const refreshDashboardData = () => {
    dispatch(fetchEmployerDashboardSummary());
    dispatch(fetchEmployeeStatus());
    dispatch(fetchEmployeeInvites());
    dispatch(fetchEmployees());
  };

  /**
   * Maps a string mood (from the API) to a numeric score (0-999) for the gauge.
   */
  const getScoreFromMood = (mood: string | undefined): number => {
    if (!mood) return 0; // Default to lowest if undefined

    const moodMap: { [key: string]: number } = {
        'Great': 850, // High score
        'Good': 650,
        'Neutral': 450,
        'Bad': 250,
        'Terrible': 50, // Low score
        // Add any other mood strings your API returns here
    };

    // Normalize the mood string before looking it up
    const normalizedMood = mood.trim().replace('.', '').toLowerCase();

    // Return the mapped score, or 0 if the mood string is not recognized
    // We use 750 as a default if stats are missing, to match the previous mock
    return moodMap[mood.trim()] || 750;
  };

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
          <p className="mt-3">Please try reloading the page or check your connection.</p>
        </div>
      </Layout>
    );
  }

  // Prepare employee status data for the chart
  const employeeStatus = {
    activeEmployees: employeeData.activeEmployees || 0,
    inactiveEmployees: employeeData.inactiveEmployees || 0,
    totalEmployees: employeeData.totalEmployees || 0,
  };

  // component props (The data structure that feeds the TopGrid)
    const statsData = stats ? [
    {
      title: "Add Employee",
      value: "", 
      icon: "UserRoundPlus",
      color: PRIMARY_COLOR, 
      description: "Send invites to workers in the company", 
      onClick: () => setShowAddEmployeeModal(true),
    },
    {
      title: "Total Employees",
      value: employeeData.totalEmployees.toString() || "0",
      icon: "UsersRound",
      color: PRIMARY_COLOR, 
    },
    // Reintroducing the General Company Mood card
    {
      title: "General Company Mood",
      value: getScoreFromMood(stats?.generalMood).toString(),
      description: stats.generalMood || "Great", // Use the mood status as the secondary text
      icon: "TrendingUp",
      color: PRIMARY_COLOR,
    },
    {
      title: "Help & Support",
      value: "", 
      description: "Get assistance and resources.", // A simple description for the uniform layout
      icon: "HelpCircle",
      color: "secondary", // Uses the secondary grey color scheme
    },
  ] : [];

  return (
    <Layout title="Organization Overview">
      <div className="container-fluid py-4 px-3">
        <div className="row gy-4">
          <div className="col-lg-12 col-md-10 mx-auto">
            <TopGrid stats={statsData} />
          </div>

          <div className="col-lg-12 col-md-12">ssh root@64.225.122.101ssh root@64.225.122.101
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title fw-semibold mb-4">Engagement Level</h5>
                <EmployeeStatusLegend employeeStatus={employeeStatus}
                />
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-12">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <FeatureUsageBreakdown />
              </div>
            </div>
            
          </div>

          <div className="col-lg-6 col-md-12">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title fw-semibold mb-4" style={{fontFamily:'body'}}>Mood Trend</h5>
                <WellnessGraph
                  data={stats?.wellnessTrend || []}
                />
              </div>
            </div>
          </div>

          <div className="col-lg-12 col-md-12">
            <RecentActivity
              activities={activities}
            />
          </div>
        </div>

        <AddEmployeeForm
          onEmployeeAdded={refreshDashboardData}
          showModal={showAddEmployeeModal}
          onClose={() => setShowAddEmployeeModal(false)}
        />
      </div>
    </Layout>
  );
};

export default EmployerDashboard;
