import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { 
  fetchEmployerDashboardSummary, 
  fetchDepartmentDistribution, 
  fetchWellnessTrend,
  fetchMoodTrends,
  fetchEmployees,
  fetchEmployeeInvites,
} from '../store/slices/EmployerSlice';

interface DashboardStats {
  totalEmployees: number;
  wellnessIndex: number;
  atRisk: number;
  departmentDistribution: Array<{ name: string; percentage: number; color: string }>;
  wellnessTrend: Array<{ date: string; score: number }>;
}

interface Activity {
  text: string;
  department: string;
  time: string;
}

export const useDashboardData = () => {
  const dispatch = useDispatch();
  const { 
    summary, 
    departmentDistribution, 
    wellnessTrend, 
    invites,
    employees,
    moodTrends,
    isLoading,
    error 
  } = useSelector((state: RootState) => state.employer);

  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    // Fetch all dashboard data on component mount
    dispatch(fetchEmployerDashboardSummary() as any);
    dispatch(fetchDepartmentDistribution() as any);
    dispatch(fetchWellnessTrend() as any);
    dispatch(fetchEmployeeInvites() as any);
    dispatch(fetchEmployees() as any);
    dispatch(fetchMoodTrends() as any);
  }, [dispatch]);

  // Calculate department distribution from actual employee data
  const calculateDepartmentDistribution = () => {
    if (employees.length === 0) {
      return departmentDistribution.length > 0 
        ? departmentDistribution 
        : [
            { name: "HR", percentage: 25, color: "#3B82F6" },
            { name: "Marketing", percentage: 25, color: "#10B981" },
            { name: "Finance", percentage: 25, color: "#F59E0B" },
            { name: "Engineering", percentage: 25, color: "#EF4444" }
          ];
    }

    const departmentCount: Record<string, number> = {};
    employees.forEach(employee => {
      departmentCount[employee.department] = (departmentCount[employee.department] || 0) + 1;
    });

    const totalEmployees = employees.length;
    const colors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"];
    
    return Object.entries(departmentCount).map(([dept, count], index) => ({
      name: dept,
      percentage: Math.round((count / totalEmployees) * 100),
      color: colors[index % colors.length]
    }));
  };

  // Calculate wellness trend from mood data
  const calculateWellnessTrend = () => {
    if (moodTrends.length === 0) {
      return wellnessTrend.length > 0 
        ? wellnessTrend 
        : [
            { date: 'Jan', score: 65 },
            { date: 'Feb', score: 72 },
            { date: 'Mar', score: 68 },
            { date: 'Apr', score: 75 },
            { date: 'May', score: 70 },
            { date: 'Jun', score: 78 }
          ];
    }

    // Group mood trends by date and calculate average
    const dailyAverages: Record<string, { total: number; count: number }> = {};
    
    moodTrends.forEach(trend => {
      const date = new Date(trend.date).toLocaleDateString('en-US', { month: 'short' });
      if (!dailyAverages[date]) {
        dailyAverages[date] = { total: 0, count: 0 };
      }
      dailyAverages[date].total += trend.moodLevel;
      dailyAverages[date].count += 1;
    });

    return Object.entries(dailyAverages)
      .map(([date, data]) => ({
        date,
        score: Math.round(data.total / data.count)
      }))
      .slice(-6); // Last 6 data points
  };

  // Transform Redux state to component props
  const stats: DashboardStats | null = summary ? {
    totalEmployees: employees.length || summary.totalEmployees || 0,
    wellnessIndex: summary.wellnessIndex || 0,
    atRisk: summary.atRisk || 0,
    departmentDistribution: calculateDepartmentDistribution(),
    wellnessTrend: calculateWellnessTrend(),
  } : {
    totalEmployees: employees.length || 0,
    wellnessIndex: 0,
    atRisk: 0,
    departmentDistribution: calculateDepartmentDistribution(),
    wellnessTrend: calculateWellnessTrend(),
  };

  const employeeData = {
    employees: employees,
    moodTrends: moodTrends,
    departmentDistribution: calculateDepartmentDistribution(),
    wellnessTrend: calculateWellnessTrend()
  };

  // Generate activities from real data
  useEffect(() => {
    const generatedActivities: Activity[] = [];
    
    // Add activity for new mood trends
    if (moodTrends.length > 0) {
      const recentMoods = moodTrends
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 3);
      
      recentMoods.forEach((trend, index) => {
        generatedActivities.push({
          text: `Mood assessment completed by ${trend.employeeName}`,
          department: trend.employeeDepartment,
          time: index === 0 ? '2 hours ago' : index === 1 ? '1 day ago' : '2 days ago'
        });
      });
    }

    // Add default activities if not enough real data
    if (generatedActivities.length < 3) {
      generatedActivities.push(
        {
          text: "New wellness resources added to the platform",
          department: "",
          time: "2 days ago",
        },
        {
          text: "Department completed monthly assessments",
          department: "Engineering",
          time: "1 day ago",
        }
      );
    }

    setActivities(generatedActivities.slice(0, 3)); // Show only 3 most recent
  }, [moodTrends, employees]);

  return { 
    stats, 
    employeeData, 
    activities, 
    loading: isLoading, 
    error 
  };
};

// import { useState, useEffect } from 'react';

// // TODO: Define proper API types based on your backend
// interface DashboardStats {
//   totalEmployees: number;
//   totalTests: number;
//   averageScore: number;
//   atRiskDepartments: number;
// }

// interface EmployeeData {
//   testsByType: Array<{ name: string; value: number }>;
//   testsByDepartment: Array<{ name: string; value: number; color: string }>;
// }

// interface Activity {
//   text: string;
//   department: string;
//   time: string;
// }

// export const useDashboardData = () => {
//   const [stats, setStats] = useState<DashboardStats | null>(null);
//   const [employeeData, setEmployeeData] = useState<EmployeeData | null>(null);
//   const [activities, setActivities] = useState<Activity[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         setLoading(true);
        
//         // TODO: Replace with actual API calls
//         // Example API calls:
//         // const statsResponse = await fetch('/api/dashboard/stats');
//         // const chartResponse = await fetch('/api/dashboard/charts');
//         // const activitiesResponse = await fetch('/api/dashboard/activities');
        
//         // const statsData = await statsResponse.json();
//         // const employeeData = await chartResponse.json();
//         // const activitiesData = await activitiesResponse.json();
        
//         // setStats(statsData);
//         // setEmployeeData(employeeData);
//         // setActivities(activitiesData);
        
//         // Mock data for demonstration
//         setStats({
//           totalEmployees: 4,
//           totalTests: 6,
//           averageScore: 61,
//           atRiskDepartments: 0
//         });
        
//         setEmployeeData({
//           testsByType: [
//             { name: "Wick Orena", value: 2 },
//             { name: "Bernard Mark", value: 1 },
//           ],
//           //change this to be consumed as real data frpom backend api
//           testsByDepartment: [
//             { name: "Marketing", value: 25, color: "#10b981" },
//             { name: "HR", value: 25, color: "#60a5fa" },
//             { name: "Finance", value: 25, color: "#f59e0b" },
//             { name: "Engineering", value: 25, color: "#ef4444" },
//           ]
//         });
        
//         setActivities([
//           {
//             text: "A new employee invitaion request was accepted",
//             department: "Engineering",
//             time: "2 hours ago",
//           },
//           {
//             text: "Department Marketing completed monthly assessments",
//             department: "",
//             time: "1 day ago",
//           },
//           {
//             text: "New wellness resources added to the platform",
//             department: "",
//             time: "2 days ago",
//           },
//         ]);
        
//       } catch (err) {
//         setError('Failed to fetch dashboard data');
//         console.error('Dashboard data fetch error:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   return { stats, employeeData, activities, loading, error };
// };