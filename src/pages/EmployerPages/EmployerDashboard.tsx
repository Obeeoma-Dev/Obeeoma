import TopGrid from "../../components/employercomponents/employerdashboard/TopGrid";
import Layout from "../../components/employercomponents/shared/Layout";
import EmployeeStatusLegend from "../../components/employercomponents/employerdashboard/EmployeeStatusLegend";
import FeatureUsageBreakdown from "../../components/employercomponents/employerdashboard/FeatureUsageBreakdown";
import WellnessGraph from "../../components/employercomponents/employerdashboard/WellnessGraph";
import MoodgaugeChart from "../../components/employercomponents/employerdashboard/MoodgaugeChart";
import RecentActivity from "../../components/employercomponents/employerdashboard/RecentActivity";
import AddEmployeeForm from "../../components/employercomponents/companyemployees/AddEmployeeForm";
import { useDashboardData } from "../../hooks/useDashboardData";
import { useState } from "react";
import { DashboardProps } from "@/types/employer";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/store";
import {
  fetchEmployerDashboardSummary,
  fetchEmployeeStatus,
  fetchEmployeeInvites,
  fetchEmployees,
} from "../../store/slices/EmployerSlice";

const EmployerDashboard: React.FC<DashboardProps> = ({}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { stats, employeeData, activities, loading, error } = useDashboardData();
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);

  const PRIMARY_COLOR = "#22C55E"; // Green color
  const SECONDARY_COLOR = "#6c757d"; // Gray/dark color for support

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
        'Great': 850,
        'Good': 650,
        'Neutral': 450,
        'Bad': 250,
        'Terrible': 50,
    };

    const normalizedMood = mood.trim();
    return moodMap[normalizedMood] || 750;
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
    activeEmployees: employeeData.activeEmployees || 40,
    inactiveEmployees: employeeData.inactiveEmployees || 60,
    totalEmployees: employeeData.totalEmployees || 0,
  };

  // component props (The data structure that feeds the TopGrid)
    const statsData = stats ? [
      // 1. Add Employee Card
    {
      title: "Add Employee",
      value: "",
      icon: "UserRoundPlus",
      color: "primary-purple",
      description: "Send invites to workers in the company",
      onClick: () => setShowAddEmployeeModal(true),
    },
      // 2. Total Employees Card
    {
      title: "Total Employees",
      value: employeeData.totalEmployees.toString() || "0",
      icon: "Users",
      color: PRIMARY_COLOR,
      description: "Current workforce size"
    },
      // 3. General Company Mood Card (GAUGE CHART)
    // {
    //   title: "General Company Mood",
    //   // These values are still passed but will be ignored by the specialized Mood card rendering
    //   moodValue: stats.generalMood || "Neutral",
    //   value: getScoreFromMood(stats?.generalMood).toString(),
    //   icon: "CheckCircle",
    //   color: PRIMARY_COLOR,
    // },

 
    {
      title: "Help & Support",
      value: "",
      description: "Get assistance and resources",
      icon: "HelpCircle",
      color: SECONDARY_COLOR,
    },
  ] : [];

  return (
    <Layout title="Organization Overview">
      <div className="container-fluid py-4 px-3">
        <div className="row gy-4">
          <div className="col-12">
            <TopGrid stats={statsData} />
          </div>

          <div className="col-lg-12 col-md-12">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <h6 className="fw-bold mb-3 text-center" style={{ color: '#000000', fontSize: '0.9rem' }}>
                Egagement Level
               </h6>

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

          {/* <div className="col-lg-6 col-md-12">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title fw-semibold mb-4" style={{fontFamily:'body'}}>Mood Trend</h5>
                <WellnessGraph
                  data={stats?.wellnessTrend || []}
                />
              </div>
            </div>
          </div> */}
          <div className="col-lg-6 col-md-12">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body d-flex justify-content-center align-items-center h-100">
                {/* <h5 className="card-title fw-semibold mb-4">Mood Gauge</h5> */}
                <MoodgaugeChart moodLabel={stats?.generalMood || "Neutral"} />
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

// import TopGrid from "../../components/employercomponents/employerdashboard/TopGrid";
// import Layout from "../../components/employercomponents/shared/Layout";
// import EmployeeStatusLegend from "../../components/employercomponents/employerdashboard/EmployeeStatusLegend";
// import FeatureUsageBreakdown from "../../components/employercomponents/employerdashboard/FeatureUsageBreakdown";
// import WellnessGraph from "../../components/employercomponents/employerdashboard/WellnessGraph";
// import MoodGaugeChart from "../../components/employercomponents/employerdashboard/MoodgaugeChart"; 
// import RecentActivity from "../../components/employercomponents/employerdashboard/RecentActivity";
// import AddEmployeeForm from "../../components/employercomponents/companyemployees/AddEmployeeForm";
// import { useDashboardData } from "../../hooks/useDashboardData";
// import { useState } from "react";
// import { DashboardProps } from "@/types/employer";
// import { useDispatch } from "react-redux";
// import {
//   fetchEmployerDashboardSummary,
//   fetchEmployeeStatus,
//   fetchEmployeeInvites,
//   fetchEmployees,
// } from "../../store/slices/EmployerSlice";

// const EmployerDashboard: React.FC<DashboardProps> = ({
//   companyId,
// }) => {
//   const dispatch = useDispatch<any>();
//   const { stats, employeeData, activities, loading, error } = useDashboardData();
//   const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);

//   const PRIMARY_COLOR = "#22C55E"; // Green color
//   const SECONDARY_COLOR = "#6c757d"; // Gray/dark color for support

//   const refreshDashboardData = () => {
//     dispatch(fetchEmployerDashboardSummary());
//     dispatch(fetchEmployeeStatus());
//     dispatch(fetchEmployeeInvites());
//     dispatch(fetchEmployees());
//   };

//   /**
//    * Maps a string mood (from the API) to a numeric score (0-999) for the gauge.
//    */
//   const getScoreFromMood = (mood: string | undefined): number => {
//     if (!mood) return 0; // Default to lowest if undefined

//     const moodMap: { [key: string]: number } = {
//         'Great': 850,
//         'Good': 650,
//         'Neutral': 450,
//         'Bad': 250,
//         'Terrible': 50,
//     };

//     const normalizedMood = mood.trim();
//     return moodMap[normalizedMood] || 750;
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
//           <p className="mt-3">Please try reloading the page or check your connection.</p>
//         </div>
//       </Layout>
//     );
//   }

//   // Prepare employee status data for the chart
//   const employeeStatus = {
//     activeEmployees: employeeData.activeEmployees || 0,
//     inactiveEmployees: employeeData.inactiveEmployees || 0,
//     totalEmployees: employeeData.totalEmployees || 0,
//   };

//   // component props (The data structure that feeds the TopGrid)
//     const statsData = stats ? [
//       // 1. Add Employee Card
//     {
//       title: "Add Employee",
//       value: "",
//       icon: "UserRoundPlus",
//       color: "primary-purple",
//       description: "Send invites to workers in the company",
//       onClick: () => setShowAddEmployeeModal(true),
//     },
//       // 2. Total Employees Card
//     {
//       title: "Total Employees",
//       value: employeeData.totalEmployees.toString() || "0",
//       icon: "Users",
//       color: PRIMARY_COLOR,
//       description: "Current workforce size"
//     },
//       // 3. General Company Mood Card (GAUGE CHART)
//     {
//       title: "General Company Mood",
//       // These values are still passed but will be ignored by the specialized Mood card rendering
//       moodValue: stats.generalMood || "Neutral",
//       value: getScoreFromMood(stats?.generalMood).toString(),
//       icon: "CheckCircle",
//       color: PRIMARY_COLOR,
//     },
//       // 4. Help & Support Card
//     {
//       title: "Help & Support",
//       value: "",
//       description: "Get assistance and resources",
//       icon: "HelpCircle",
//       color: SECONDARY_COLOR,
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
//                 <h5 className="card-title fw-semibold mb-4">Engagement Level</h5>
//                 <EmployeeStatusLegend employeeStatus={employeeStatus}
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
//                 <h5 className="card-title fw-semibold mb-4" style={{fontFamily:'body'}}>Mood Trend</h5>
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

// import TopGrid from "../../components/employercomponents/employerdashboard/TopGrid";
// import Layout from "../../components/employercomponents/shared/Layout";
// import EmployeeStatusLegend from "../../components/employercomponents/employerdashboard/EmployeeStatusLegend";
// import FeatureUsageBreakdown from "../../components/employercomponents/employerdashboard/FeatureUsageBreakdown";
// import WellnessGraph from "../../components/employercomponents/employerdashboard/WellnessGraph";
// import MoodGaugeChart from "../../components/employercomponents/employerdashboard/MoodTrend"; // Corrected casing
// import RecentActivity from "../../components/employercomponents/employerdashboard/RecentActivity";
// import AddEmployeeForm from "../../components/employercomponents/companyemployees/AddEmployeeForm";
// import { useDashboardData } from "../../hooks/useDashboardData";
// import { useState } from "react";
// import { DashboardProps } from "@/types/employer";
// import { useDispatch } from "react-redux";
// import {
//   fetchEmployerDashboardSummary,
//   fetchEmployeeStatus,
//   fetchEmployeeInvites,
//   fetchEmployees,
// } from "../../store/slices/EmployerSlice";

// const EmployerDashboard: React.FC<DashboardProps> = ({
//   companyId,
// }) => {
//   const dispatch = useDispatch<any>();
//   const { stats, employeeData, activities, loading, error } = useDashboardData();
//   const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);

//   const PRIMARY_COLOR = "#22C55E"; // Green color
//   const SECONDARY_COLOR = "#6c757d"; // Gray/dark color for support

//   const refreshDashboardData = () => {
//     dispatch(fetchEmployerDashboardSummary());
//     dispatch(fetchEmployeeStatus());
//     dispatch(fetchEmployeeInvites());
//     dispatch(fetchEmployees());
//   };

//   /**
//    * Maps a string mood (from the API) to a numeric score (0-999) for the gauge.
//    */
//   const getScoreFromMood = (mood: string | undefined): number => {
//     if (!mood) return 0; // Default to lowest if undefined

//     const moodMap: { [key: string]: number } = {
//         'Great': 850,
//         'Good': 650,
//         'Neutral': 450,
//         'Bad': 250,
//         'Terrible': 50,
//     };

//     const normalizedMood = mood.trim();
//     return moodMap[normalizedMood] || 750;
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
//           <p className="mt-3">Please try reloading the page or check your connection.</p>
//         </div>
//       </Layout>
//     );
//   }

//   // Prepare employee status data for the chart
//   const employeeStatus = {
//     activeEmployees: employeeData.activeEmployees || 0,
//     inactiveEmployees: employeeData.inactiveEmployees || 0,
//     totalEmployees: employeeData.totalEmployees || 0,
//   };

//   // component props (The data structure that feeds the TopGrid)
//     // ONLY include the 3 desired cards: Add Employee, Total Employees, and Mood
//     const statsData = stats ? [
//       // 1. Add Employee Card
//     {
//       title: "Add Employee",
//       value: "",
//       icon: "UserRoundPlus",
//       color: "primary-purple",
//       description: "Send invites to workers in the company",
//       onClick: () => setShowAddEmployeeModal(true),
//     },
//       // 2. Total Employees Card
//     {
//       title: "Total Employees",
//       value: employeeData.totalEmployees.toString() || "0",
//       icon: "Users",
//       color: PRIMARY_COLOR,
//       description: "Current workforce size"
//     },
//       // 3. General Company Mood Card (GAUGE CHART)
//     {
//       title: "General Company Mood",
//       moodValue: stats.generalMood || "Neutral",
//       value: getScoreFromMood(stats?.generalMood).toString(),
//       icon: "CheckCircle",
//       color: PRIMARY_COLOR,
//     },
//       // REMOVED 4. Help & Support Card
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
//                 <h5 className="card-title fw-semibold mb-4">Engagement Level</h5>
//                 <EmployeeStatusLegend employeeStatus={employeeStatus}
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
//                 <h5 className="card-title fw-semibold mb-4" style={{fontFamily:'body'}}>Mood Trend</h5>
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



// import TopGrid from "../../components/employercomponents/employerdashboard/TopGrid";
// import Layout from "../../components/employercomponents/shared/Layout";
// import EmployeeStatusLegend from "../../components/employercomponents/employerdashboard/EmployeeStatusLegend";
// import FeatureUsageBreakdown from "../../components/employercomponents/employerdashboard/FeatureUsageBreakdown";
// import WellnessGraph from "../../components/employercomponents/employerdashboard/WellnessGraph";
// import MoodGaugeChart from "../../components/employercomponents/employerdashboard/MoodgaugeChart"; 
// import RecentActivity from "../../components/employercomponents/employerdashboard/RecentActivity";
// import AddEmployeeForm from "../../components/employercomponents/companyemployees/AddEmployeeForm";
// import { useDashboardData } from "../../hooks/useDashboardData";
// import { useState } from "react";
// import { DashboardProps } from "@/types/employer";
// import { useDispatch } from "react-redux";
// import {
//   fetchEmployerDashboardSummary,
//   fetchEmployeeStatus,
//   fetchEmployeeInvites,
//   fetchEmployees,
// } from "../../store/slices/EmployerSlice";

// const EmployerDashboard: React.FC<DashboardProps> = ({
//   companyId,
// }) => {
//   const dispatch = useDispatch<any>();
//   const { stats, employeeData, activities, loading, error } = useDashboardData();
//   const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);

//   const PRIMARY_COLOR = "#22C55E"; // Green color

//   const refreshDashboardData = () => {
//     dispatch(fetchEmployerDashboardSummary());
//     dispatch(fetchEmployeeStatus());
//     dispatch(fetchEmployeeInvites());
//     dispatch(fetchEmployees());
//   };

//   /**
//    * Maps a string mood (from the API) to a numeric score (0-999) for the gauge.
//    */
//   const getScoreFromMood = (mood: string | undefined): number => {
//     if (!mood) return 0; 

//     const moodMap: { [key: string]: number } = {
//         'Great': 850,
//         'Good': 650,
//         'Neutral': 450,
//         'Bad': 250,
//         'Terrible': 50,
//     };

//     const normalizedMood = mood.trim();
//     return moodMap[normalizedMood] || 750;
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
//           <p className="mt-3">Please try reloading the page or check your connection.</p>
//         </div>
//       </Layout>
//     );
//   }

//   // Prepare employee status data for the chart
//   const employeeStatus = {
//     activeEmployees: employeeData.activeEmployees || 0,
//     inactiveEmployees: employeeData.inactiveEmployees || 0,
//     totalEmployees: employeeData.totalEmployees || 0,
//   };

//   // component props (The data structure that feeds the TopGrid)
//     // Only 3 cards included
//     const statsData = stats ? [
//       // 1. Total Employees Card
//     {
//       title: "Total Employees",
//       value: employeeData.totalEmployees.toString() || "0",
//       icon: "Users",
//       color: PRIMARY_COLOR,
//       description: "Current workforce size"
//     },
//       // 2. General Company Mood Card (GAUGE CHART)
//     {
//       title: "General Company Mood",
//       moodValue: stats.generalMood || "Neutral",
//       value: getScoreFromMood(stats?.generalMood).toString(),
//       icon: "CheckCircle",
//       color: PRIMARY_COLOR,
//     },
//       // 3. Add Employee Card
//     {
//       title: "Add Employee",
//       value: "",
//       icon: "UserRoundPlus",
//       color: "primary-purple",
//       description: "Send invites to workers in the company",
//       onClick: () => setShowAddEmployeeModal(true),
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
//                 <h5 className="card-title fw-semibold mb-4">Engagement Level</h5>
//                 <EmployeeStatusLegend employeeStatus={employeeStatus}
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
//                 <h5 className="card-title fw-semibold mb-4" style={{fontFamily:'body'}}>Mood Trend</h5>
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