import { useState, useEffect } from 'react';
export const useDashboardData = () => {
    const [stats, setStats] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                // TODO: Replace with actual API calls
                // Example API calls:
                // const statsResponse = await fetch('/api/dashboard/stats');
                // const chartResponse = await fetch('/api/dashboard/charts');
                // const activitiesResponse = await fetch('/api/dashboard/activities');
                // const statsData = await statsResponse.json();
                // const chartData = await chartResponse.json();
                // const activitiesData = await activitiesResponse.json();
                // setStats(statsData);
                // setChartData(chartData);
                // setActivities(activitiesData);
                // Mock data for demonstration
                setStats({
                    totalEmployees: 4,
                    totalTests: 6,
                    averageScore: 61,
                    atRiskDepartments: 0
                });
                setChartData({
                    testsByType: [
                        { name: "Well-being Check", value: 2 },
                        { name: "Burnout Risk", value: 1 },
                    ],
                    testsByDepartment: [
                        { name: "Marketing", value: 25, color: "#10b981" },
                        { name: "HR", value: 25, color: "#60a5fa" },
                        { name: "Finance", value: 25, color: "#f59e0b" },
                        { name: "Engineering", value: 25, color: "#ef4444" },
                    ]
                });
                setActivities([
                    {
                        text: "A new employee invitaion request was accepted",
                        department: "Engineering",
                        time: "2 hours ago",
                    },
                    {
                        text: "Department Marketing completed monthly assessments",
                        department: "",
                        time: "1 day ago",
                    },
                    {
                        text: "New wellness resources added to the platform",
                        department: "",
                        time: "2 days ago",
                    },
                ]);
            }
            catch (err) {
                setError('Failed to fetch dashboard data');
                console.error('Dashboard data fetch error:', err);
            }
            finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);
    return { stats, chartData, activities, loading, error };
};
