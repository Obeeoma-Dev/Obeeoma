// import Layout from "../../components/employercomponents/shared/Layout";
// import TopGrid from "../../components/employercomponents/employerdashboard/TopGrid";
// import DepartmentLegend from "../../components/employercomponents/employerdashboard/DepartmentLegend";
// import FeatureUsageBreakdown from "../../components/employercomponents/employerdashboard/FeatureUsageBreakdown";
// import WellnessGraph from "../../components/employercomponents/employerdashboard/WellnessGraph";
// import RecentActivity from "../../components/employercomponents/employerdashboard/RecentActivity";
// import AddEmployeeForm from "../../components/employercomponents/companyemployees/AddEmployeeForm";
// import { useDashboardData } from "../../hooks/useDashboardData";
// import { useState } from "react";
// import { DashboardProps } from "@/types/employer";
// import { useDispatch } from "react-redux";
// import {
//   fetchEmployerDashboardSummary,
//   fetchDepartmentDistribution,
//   fetchWellnessTrend,
//   fetchEmployeeInvites,
//   fetchEmployees,
//   fetchMoodTrends,
// } from "../../store/slices/EmployerSlice";

// const EmployerDashboard: React.FC<DashboardProps> = ({
//   companyId,
// }) => {
//   const dispatch = useDispatch<any>();
//   const { stats, employeeData, activities, loading, error } = useDashboardData();
//   // const [searchQuery, setSearchQuery] = useState("");
//   const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);

//   const refreshDashboardData = () => {
//     dispatch(fetchEmployerDashboardSummary());
//     dispatch(fetchDepartmentDistribution());
//     dispatch(fetchWellnessTrend());
//     dispatch(fetchEmployeeInvites());
//     dispatch(fetchEmployees());
//     dispatch(fetchMoodTrends());
//   };

//   if (loading) {
//     return (
//       <Layout title="Organization Overview">
//         <div className="container-fluid text-center py-5">
//           <div className="spinner-border text-success" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//           <p className="mt-3">Loading dashboard data...</p>
//         </div>
//       </Layout>
//     );
//   }

//   if (error) {
//     return (
//       <Layout title="Organization Overview">
//         <div className="container-fluid">
//           <div className="alert alert-danger py-4" role="alert">
//             {error}
//           </div>
//         </div>
//       </Layout>
//     );
//   }

//   // component props
//   const statsData = stats ? [
//     {
//       title: "Add Employee",
//       value: "+",
//       icon: "UserRoundPlus",
//       color: "#22C55E",
//       onClick: () => setShowAddEmployeeModal(true),
//     },
//     {
//       title: "Total Employees",
//       value: stats.totalEmployees.toString(),
//       icon: "Users",
//       color: "#22C55E",
//     },
//     {
//       title: "General Company mood:",
//       value: "ok",
//       icon: "TrendingUp",
//       color: "#22C55E",
//     },
//     {
//       title: "Help",
//       value: "& support",
//       icon: "HelpCircle",
//       color: "secondary",
//     },
//   ] : [];

//   return (
//     <Layout title="Organization Overview">
//       <div className="container-fluid py-4 px-3">
//         <div className="row gy-4">
//           <div className="col-lg-12 col-md-10 mx-auto">
//             <TopGrid stats={statsData} />
//           </div>

//           <div className="col-lg-12 col-md-12">
//             <div className="card border-0 shadow-sm h-100">
//               <div className="card-body">
//                 <h5 className="card-title fw-semibold mb-4">Department Distribution</h5>
//                 <DepartmentLegend
//                   departments={stats?.departmentDistribution || []}
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="col-lg-6 col-md-12">
//             <div className="card border-0 shadow-sm h-100">
//               <div className="card-body">
//                 <FeatureUsageBreakdown />
//               </div>
//             </div>
//           </div>

//           <div className="col-lg-6 col-md-12">
//             <div className="card border-0 shadow-sm h-100">
//               <div className="card-body">
//                 <h5 className="card-title fw-semibold mb-4" style={{fontFamily:'body'}}>Engagement Level</h5>
//                 <WellnessGraph
//                   data={stats?.wellnessTrend || []}
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="col-lg-12 col-md-12">
//             <RecentActivity
//               activities={activities}
//             />
//           </div>
//         </div>

//         <AddEmployeeForm
//           onEmployeeAdded={refreshDashboardData}
//           showModal={showAddEmployeeModal}
//           onClose={() => setShowAddEmployeeModal(false)}
//         />
//       </div>
//     </Layout>
//   );
// };

// export default EmployerDashboard;


import Layout from "../../components/employercomponents/shared/Layout";
import TopGrid from "../../components/employercomponents/employerdashboard/TopGrid";
import DepartmentLegend from "../../components/employercomponents/employerdashboard/DepartmentLegend";
import FeatureUsageBreakdown from "../../components/employercomponents/employerdashboard/FeatureUsageBreakdown";
import WellnessGraph from "../../components/employercomponents/employerdashboard/WellnessGraph";
import RecentActivity from "../../components/employercomponents/employerdashboard/RecentActivity";
import AddEmployeeForm from "../../components/employercomponents/companyemployees/AddEmployeeForm";
import { useDashboardData } from "../../hooks/useDashboardData";
import { useState } from "react";
import { DashboardProps } from "@/types/employer";
import { useDispatch } from "react-redux";
import {
  fetchEmployerDashboardSummary,
  fetchEmployeeInvites,
  fetchEmployees,
} from "../../store/slices/EmployerSlice";

const EmployerDashboard: React.FC<DashboardProps> = ({
  companyId,
}) => {
  const dispatch = useDispatch<any>();
  const { stats, employeeData, activities, loading, error } = useDashboardData();
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);

  const refreshDashboardData = () => {
    dispatch(fetchEmployerDashboardSummary());
    dispatch(fetchEmployeeInvites());
    dispatch(fetchEmployees());
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
        </div>
      </Layout>
    );
  }

  // Prepare employee status data for the chart
  const employeeStatus = {
    activeEmployees: stats?.activeEmployees || 0,
    inactiveEmployees: stats?.inactiveEmployees || 0,
    totalEmployees: stats?.totalEmployees || 0,
  };

  // component props
    const statsData = stats ? [
    {
      title: "Add Employee",
      value: "+",
      icon: "UserRoundPlus",
      color: "#22C55E",
      onClick: () => setShowAddEmployeeModal(true),
    },
    {
      title: "Total Employees",
      value: stats.totalEmployees.toString(),
      icon: "Users",
      color: "#22C55E",
    },
    {
      title: "General Company mood:",
      value: "ok",
      icon: "TrendingUp",
      color: "#22C55E",
    },
    {
      title: "Help",
      value: "& support",
      icon: "HelpCircle",
      color: "secondary",
    },
  ] : [];

  return (
    <Layout title="Organization Overview">
      <div className="container-fluid py-4 px-3">
        <div className="row gy-4">
          <div className="col-lg-12 col-md-10 mx-auto">
            <TopGrid stats={statsData} />
          </div>

          <div className="col-lg-12 col-md-12">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title fw-semibold mb-4">Employee Status Distribution</h5>
                <DepartmentLegend
                  employeeStatus={employeeStatus}
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
                <h5 className="card-title fw-semibold mb-4" style={{fontFamily:'body'}}>Engagement Level</h5>
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