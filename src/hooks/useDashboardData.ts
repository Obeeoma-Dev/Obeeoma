import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  fetchEmployerDashboardSummary,
  fetchDepartmentDistribution,
  fetchWellnessTrend,
  fetchMoodTrends,
  fetchEmployees,
  fetchEmployeeInvites,
} from "../store/slices/EmployerSlice";
import { Employee, EmployerState, MoodTrend } from "../types/employer";

interface DepartmentData {
  departmentName: string;
  workerPercentage: number;
  color: string;
  count?: number; // for showing actual count
}

interface WellnessTrendPoint {
  date: string;
  avg_score: number;
}

// interface EmployerSummary {
//   totalEmployees?: number;
//   wellnessIndex?: number;
//   inactiveEmployees?: number;
//   activeEmployees?:number;
//   atRisk?: number;
//   activePercentage: number;
//   inactivePercentage: number;
// }

// interface Invite {
//   id?: string;
//   email?: string;
//   invitedAt?: string;
//   // extend as needed
// }

interface DashboardStats {
  activeEmployees: number;
  inactiveEmployees: number;
  totalEmployees: number;
  wellnessIndex: number;
  atRisk: number;
  departmentData: DepartmentData[];
  wellnessTrend: WellnessTrendPoint[];
  generalMood: string;
}

const computeGeneralMood = (wellnessIndex: number): string => {
  if (wellnessIndex >= 80) return "Excellent";
  if (wellnessIndex >= 60) return "Good";
  if (wellnessIndex >= 40) return "Fair";
  return "Needs Attention";
};

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
    departmentData: DepartmentData[];
    activeEmployees: number;
    inactiveEmployees: number;
    totalEmployees: number;
    wellnessTrend: WellnessTrendPoint[];
  };
  activities: Activity[];
  loading: boolean;
  error?: string | null;
}

export const useDashboardData = (): UseDashboardDataReturn => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();
  const {
    summary,
    departmentDistribution,
    wellnessTrend,
    employees = [],
    moodTrends,
    isLoading,
    error,
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
  const calculateDepartmentDistribution = (
    emps: Employee[],
  ): DepartmentData[] => {
    if (!emps || emps.length === 0) {
      return departmentDistribution && departmentDistribution.length > 0
        ? departmentDistribution
        : [
            { departmentName: "HR", workerPercentage: 25, color: "#3CB371" },
            {
              departmentName: "Marketing",
              workerPercentage: 25,
              color: "#1b5e20",
            },
            {
              departmentName: "Finance",
              workerPercentage: 25,
              color: "#a5d6a7",
            },
            {
              departmentName: "Engineering",
              workerPercentage: 25,
              color: "#4caf50",
            },
          ];
    }

    const departmentCount: Record<string, number> = {};
    emps.forEach((employee) => {
      const dept = employee.employeedepartment || "Unknown";
      departmentCount[dept] = (departmentCount[dept] || 0) + 1;
    });

    const totalEmployees = emps.length;
    const colors = ["#4caf50", "#10B981", "#a5d6a7", "", "#6789", "#edf5f2ff"];

    return Object.entries(departmentCount).map(([dept, count], index) => ({
      departmentName: dept,
      workerPercentage: Math.round((count / totalEmployees) * 100),
      color: colors[index % colors.length],
    }));
  };

  // Calculate wellness trend from mood data
  const calculateWellnessTrend = (): WellnessTrendPoint[] => {
    if (!moodTrends || moodTrends.length === 0) {
      return wellnessTrend && wellnessTrend.length > 0
        ? wellnessTrend
        : [
            { date: "Jan", avg_score: 65 },
            { date: "Feb", avg_score: 72 },
            { date: "Mar", avg_score: 68 },
            { date: "Apr", avg_score: 75 },
            { date: "May", avg_score: 70 },
            { date: "Jun", avg_score: 78 },
          ];
    }

    // Group mood trends by month label and calculate average
    const dailyAverages: Record<string, { total: number; count: number }> = {};

    moodTrends.forEach((trend: MoodTrend) => {
      const date = new Date(trend.date).toLocaleDateString("en-US", {
        month: "short",
      });
      if (!dailyAverages[date]) {
        dailyAverages[date] = { total: 0, count: 0 };
      }
      dailyAverages[date].total += trend.moodLevel;
      dailyAverages[date].count += 1;
    });

    return Object.entries(dailyAverages)
      .map(([date, data]) => ({
        date,
        avg_score: Math.round(data.total / data.count),
      }))
      .slice(-6); // Last 6 data points
  };

  const countEmployeeStatuses = (employees: Employee[] | null) => {
    if (!employees) {
      return { activeEmployees: 0, inactiveEmployees: 0 };
    }

    const activeEmployees = employees.filter(
      (emp) => emp.status === "active",
    ).length;
    const inactiveEmployees = employees.filter(
      (emp) => emp.status === "inactive" || emp.status === "pending",
    ).length;

    return { activeEmployees, inactiveEmployees };
  };

  const employeeCounts = countEmployeeStatuses(employees);

  // Transform Redux state to component props
  const stats: DashboardStats | null = summary
    ? {
        totalEmployees:
          (employees && employees.length) || summary.totalEmployees || 0,
        activeEmployees:
          employeeCounts.activeEmployees || summary.activeEmployees || 0,
        inactiveEmployees:
          employeeCounts.inactiveEmployees || summary.inactiveEmployees || 0,
        wellnessIndex: summary.wellnessIndex || 0,
        atRisk: summary.atRisk || 0,
        departmentData: calculateDepartmentDistribution(employees || []),
        wellnessTrend: calculateWellnessTrend(),
        generalMood: computeGeneralMood(summary.wellnessIndex || 0),
      }
    : {
        activeEmployees: employeeCounts.activeEmployees || 0,
        inactiveEmployees: employeeCounts.inactiveEmployees || 0,
        totalEmployees: (employees && employees.length) || 0,
        wellnessIndex: 0,
        atRisk: 0,
        departmentData: calculateDepartmentDistribution(employees || []),
        wellnessTrend: calculateWellnessTrend(),
        generalMood: computeGeneralMood(0),
      };

  const employeeData = {
    activeEmployees: employeeCounts.activeEmployees || 0,
    inactiveEmployees: employeeCounts.inactiveEmployees || 0,
    totalEmployees: (employees && employees.length) || 0,
    employees: employees || [],
    moodTrends: moodTrends || [],
    departmentData: calculateDepartmentDistribution(employees || []),
    wellnessTrend: calculateWellnessTrend(),
  };

  // Generate activities from real data
  useEffect(() => {
    const generatedActivities: Activity[] = [];

    // Add activity for new mood trends
    if (moodTrends && moodTrends.length > 0) {
      const sortedMoods = [...moodTrends].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );

      sortedMoods.forEach((trend: MoodTrend, index: number) => {
        generatedActivities.push({
          text: `Mood assessment completed by ${trend.employeeName || "an employee"}`,
          department: trend.employeeDepartment || "",
          time:
            index === 0
              ? "2 hours ago"
              : index === 1
                ? "1 day ago"
                : `${index} days ago`,
        });
      });
    }

    // Fill with default activities until we have at least 6
    const defaultActivities = [
      {
        text: "New wellness resources added to the platform",
        department: "",
        time: "1 hour ago",
      },
      {
        text: "Department completed monthly assessments",
        department: "Engineering",
        time: "3 hours ago",
      },
      {
        text: "A new invitee has joined the platform",
        department: "Marketing",
        time: "1 day ago",
      },
      {
        text: "System maintenance completed successfully",
        department: "IT",
        time: "2 days ago",
      },
      {
        text: "New educational resources have been added",
        department: "",
        time: "3 days ago",
      },
      {
        text: "Monthly wellness report is now available",
        department: "HR",
        time: "4 days ago",
      },
      {
        text: "Employee engagement survey results are now available",
        department: "HR",
        time: "3 days ago",
      },
    ];

    let defaultIdx = 0;
    while (
      generatedActivities.length < 7 &&
      defaultIdx < defaultActivities.length
    ) {
      generatedActivities.push(defaultActivities[defaultIdx]);
      defaultIdx++;
    }

    setActivities(generatedActivities.slice(0, 7)); // Show only 7 most recent
  }, [moodTrends, employees]);

  return {
    stats,
    employeeData,
    activities,
    loading: isLoading,
    error,
  };
};
