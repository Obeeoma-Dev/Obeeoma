  // TODO: Replace with API call to fetch recent activities
  // Example: const { data: activities, loading } = useRecentActivities();
interface Activity {
  text: string;
  department: string;
  time: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

const RecentActivity = ({ activities }: RecentActivityProps) => {
  const defaultActivities: Activity[] = [
    {
      text: "A new wellness test was completed in",
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
  ];

  const recentActivity = activities?.length ? activities : defaultActivities;

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h3 className="h5 fw-semibold mb-0">Recent Activity</h3>
          <button className="btn btn-link text-primary text-decoration-none">
            View All
          </button>
        </div>
        <div className="list-group list-group-flush">
          {recentActivity.map((activity, index) => (
            <div key={index} className="list-group-item px-0 py-3 border-bottom-0">
              <div className="d-flex align-items-start gap-3">
                <div
                  className="rounded-circle bg-primary mt-1 flex-shrink-0"
                  style={{ width: "8px", height: "8px" }}
                ></div>
                <div className="flex-grow-1">
                  <p className="mb-0 small">
                    {activity.text}{" "}
                    {activity.department && (
                      <span className="fw-medium">{activity.department}</span>
                    )}
                  </p>
                </div>
                <span className="text-muted small flex-shrink-0">
                  {activity.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
