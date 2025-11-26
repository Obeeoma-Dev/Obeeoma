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
import { Employee } from '../types/employer';

interface DepartmentDistributionItem {
  name: string;
  percentage: number;
  color: string;
}

interface WellnessTrendPoint {
  date: string;
  score: number;
}

interface EmployerSummary {
  totalEmployees?: number;
  wellnessIndex?: number;
  atRisk?: number;
  // add other summary fields if present in backend
}

interface Invite {
  id?: string;
  email?: string;
  invitedAt?: string;
  // extend as needed
}

interface MoodTrend {
  date: string;
  moodLevel: number;
  employeeName?: string;
  employeeDepartment?: string;
  // extend as needed
}

interface EmployerState {
  summary?: EmployerSummary | null;
  departmentDistribution: DepartmentDistributionItem[];
  wellnessTrend: WellnessTrendPoint[];
  invites: Invite[];
  employees: Employee[];
  moodTrends: MoodTrend[];
  isLoading: boolean;
  error?: string | null;
}

interface DashboardStats {
  totalEmployees: number;
  wellnessIndex: number;
  atRisk: number;
  departmentDistribution: DepartmentDistributionItem[];
  wellnessTrend: WellnessTrendPoint[];
}

interface Activity {
  text: string;
  department: string;
  time: string;
}

interface UseDashboardDataReturn {
  stats: DashboardStats | null;
  employeeData: {
    employees: Employee[];
    moodTrends: MoodTrend[];
    departmentDistribution: DepartmentDistributionItem[];
    wellnessTrend: WellnessTrendPoint[];
  };
  activities: Activity[];
  loading: boolean;
  error?: string | null;
}

export const useDashboardData = (): UseDashboardDataReturn => {
  const dispatch = useDispatch<any>();
  const { 
    summary, 
    departmentDistribution, 
    wellnessTrend, 
    invites,
    employees = [],
    moodTrends = [],
    isLoading,
    error 
  } = useSelector((state: RootState) => state.employer as EmployerState);

  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    // Fetch all dashboard data on component mount
    dispatch(fetchEmployerDashboardSummary());
    dispatch(fetchDepartmentDistribution());
    dispatch(fetchWellnessTrend());
    dispatch(fetchEmployeeInvites());
    dispatch(fetchEmployees());
    dispatch(fetchMoodTrends());
  }, [dispatch]);

  // Calculate department distribution from actual employee data
  const calculateDepartmentDistribution = (emps: Employee[]): DepartmentDistributionItem[] => {
    if (!emps || emps.length === 0) {
      return departmentDistribution && departmentDistribution.length > 0 
        ? departmentDistribution 
        : [
            { name: "HR", percentage: 25, color: "#3B82F6" },
            { name: "Marketing", percentage: 25, color: "#10B981" },
            { name: "Finance", percentage: 25, color: "#F59E0B" },
            { name: "Engineering", percentage: 25, color: "#EF4444" }
          ];
    }

    const departmentCount: Record<string, number> = {};
    emps.forEach(employee => {
      const dept = employee.department || 'Unknown';
      departmentCount[dept] = (departmentCount[dept] || 0) + 1;
    });

    const totalEmployees = emps.length;
    const colors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"];
    
    return Object.entries(departmentCount).map(([dept, count], index) => ({
      name: dept,
      percentage: Math.round((count / totalEmployees) * 100),
      color: colors[index % colors.length]
    }));
  };

  // Calculate wellness trend from mood data
  const calculateWellnessTrend = (): WellnessTrendPoint[] => {
    if (!moodTrends || moodTrends.length === 0) {
      return wellnessTrend && wellnessTrend.length > 0 
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

    // Group mood trends by month label and calculate average
    const dailyAverages: Record<string, { total: number; count: number }> = {};
    
    moodTrends.forEach((trend: MoodTrend) => {
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
    totalEmployees: (employees && employees.length) || summary.totalEmployees || 0,
    wellnessIndex: summary.wellnessIndex || 0,
    atRisk: summary.atRisk || 0,
    departmentDistribution: calculateDepartmentDistribution(employees || []),
    wellnessTrend: calculateWellnessTrend(),
  } : {
    totalEmployees: (employees && employees.length) || 0,
    wellnessIndex: 0,
    atRisk: 0,
    departmentDistribution: calculateDepartmentDistribution(employees || []),
    wellnessTrend: calculateWellnessTrend(),
  };

  const employeeData = {
    employees: employees || [],
    moodTrends: moodTrends || [],
    departmentDistribution: calculateDepartmentDistribution(employees || []),
    wellnessTrend: calculateWellnessTrend()
  };

  // Generate activities from real data
  useEffect(() => {
    const generatedActivities: Activity[] = [];
    
    // Add activity for new mood trends
    if (moodTrends && moodTrends.length > 0) {
      const recentMoods = [...moodTrends]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 3);
      
      recentMoods.forEach((trend: MoodTrend, index: number) => {
        generatedActivities.push({
          text: `Mood assessment completed by ${trend.employeeName || 'an employee'}`,
          department: trend.employeeDepartment || '',
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