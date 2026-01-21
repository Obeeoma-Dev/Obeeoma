import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

// Components
import TopGrid from "../../components/employercomponents/employerdashboard/TopGrid";
import Layout from "../../components/employercomponents/shared/Layout";
import EmployeeStatusLegend from "../../components/employercomponents/employerdashboard/EmployeeStatusLegend";
import FeatureUsageBreakdown from "../../components/employercomponents/employerdashboard/FeatureUsageBreakdown";
import WellnessGraph from "../../components/employercomponents/employerdashboard/WellnessGraph";
import MoodgaugeChart from "../../components/employercomponents/employerdashboard/MoodgaugeChart";
import WellnessTrends from "../../components/employercomponents/reports/WellnessTrends";
import RecentActivity from "../../components/employercomponents/employerdashboard/RecentActivity";
import AddEmployeeForm from "../../components/employercomponents/companyemployees/AddEmployeeForm";

// Hooks & Types
import { useDashboardData } from "../../hooks/useDashboardData";
import { DashboardProps } from "@/types/employer";
import type { AppDispatch, RootState } from "../../store/store";
import {
  fetchEmployerDashboardSummary,
  fetchEmployeeStatus,
  fetchEmployeeInvites,
  fetchEmployees,
  fetchMoodTrends,
} from "../../store/slices/EmployerSlice";

const EmployerDashboard: React.FC<DashboardProps> = ({}) => {
  const dispatch = useDispatch<AppDispatch>();

  // 1. HOOKS MUST BE AT THE TOP LEVEL (Before any early returns)
  const { stats, employeeData, activities, loading, error } =
    useDashboardData();
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  // const [searchQuery, setSearchQuery] = useState("");

  // Redux Mood Data
  const { moodTrends, isLoading: isMoodLoading } = useSelector(
    (state: RootState) => state.employer,
  );

  // Fetch mood trends on mount
  useEffect(() => {
    dispatch(fetchMoodTrends());
  }, [dispatch]);

  // Transform raw backend data into the format WellnessGraph expects
  const wellnessData = useMemo(() => {
    if (!moodTrends || moodTrends.length === 0) return [];

    // If your backend returns the summary format [ {date, avg_score, mood_counts} ]
    // we map it directly. If it returns individual logs, we group them.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return moodTrends.map((item: any) => ({
      date: item.date || item.timestamp || "",
      avg_score: item.avg_score ?? 3,
      mood_counts: item.mood_counts || {},
    }));
  }, [moodTrends]);

  //  EARLY RETURNS (Only after hooks are initialized)
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
        <div className="container-fluid py-5">
          <div className="alert alert-danger" role="alert">
            <h4 className="alert-heading">Error Loading Dashboard</h4>
            <p>{error}</p>
            <hr />
            <button
              className="btn btn-outline-danger"
              onClick={() => window.location.reload()}
            >
              Retry Loading
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  // 3. LOGIC & HELPERS
  const PRIMARY_COLOR = "#22C55E";
  const SECONDARY_COLOR = "#6c757d";

  const refreshDashboardData = () => {
    dispatch(fetchEmployerDashboardSummary());
    dispatch(fetchEmployeeStatus());
    dispatch(fetchEmployeeInvites());
    dispatch(fetchEmployees());
    dispatch(fetchMoodTrends());
  };

  const employeeStatus = {
    activeEmployees: employeeData?.activeEmployees || 60,
    inactiveEmployees: employeeData?.inactiveEmployees || 40,
    totalEmployees: employeeData?.totalEmployees || 0,
  };

  const statsData = [
    {
      title: "Add Employee",
      value: "",
      icon: "UserRoundPlus",
      color: "primary-purple",
      description: "Send invites to workers",
      onClick: () => setShowAddEmployeeModal(true),
    },
    {
      title: "Total Employees",
      value: employeeStatus.totalEmployees.toString(),
      icon: "Users",
      color: PRIMARY_COLOR,
      description: "Current workforce size",
    },
    {
      title: "Help & Support",
      value: "",
      description: "Get assistance",
      icon: "HelpCircle",
      color: SECONDARY_COLOR,
    },
  ];

  return (
    <Layout title="Organization Overview">
      <div className="container-fluid py-4 px-3">
        <div className="row gy-4">
          {/* Top Statistics Grid */}
          <div className="col-12">
            <TopGrid stats={statsData} />
          </div>

          {/* Engagement Level Chart */}
          <div className="col-lg-6">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <h6 className="fw-bold mb-3 text-center text-dark small">
                  Engagement Level
                </h6>
                <EmployeeStatusLegend />
              </div>
            </div>
          </div>

          {/* General Mood Gauge */}
          <div className="col-lg-6">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body d-flex justify-content-center align-items-center">
                <MoodgaugeChart moodLabel={stats?.generalMood || "Neutral"} />
              </div>
            </div>
          </div>

          {/* Feature Usage Breakdown */}
          <div className="col-lg-6">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <FeatureUsageBreakdown />
              </div>
            </div>
          </div>

          {/* Mood Trend Graph (The Emoji Chart) */}
          <div className="col-lg-6">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <h5
                  className="card-title fw-bold mb-4"
                  style={{ fontSize: "1.1rem" }}
                >
                  Mood Trend
                </h5>
                <div className="dashboard-container">
                  {isMoodLoading ? (
                    <div className="text-center py-5">
                      <div
                        className="spinner-border spinner-border-sm text-primary"
                        role="status"
                      ></div>
                      <p className="small text-muted mt-2">Loading trends...</p>
                    </div>
                  ) : (
                    <WellnessGraph data={wellnessData} height={250} />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="col-lg-6">
            <RecentActivity activities={activities} />
          </div>

          {/* Wellness Trends History */}
          <div className="col-lg-6">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <h5
                  className="card-title fw-bold mb-4"
                  style={{ fontSize: "1.1rem" }}
                >
                  Wellness History
                </h5>
                <WellnessTrends />
              </div>
            </div>
          </div>
        </div>
        {/* Modal for adding employees */}
        <AddEmployeeForm
          onEmployeeAdded={refreshDashboardData}
          showModal={showAddEmployeeModal}
          onClose={() => setShowAddEmployeeModal(false)}
        />
        s
      </div>
    </Layout>
  );
};

export default EmployerDashboard;
