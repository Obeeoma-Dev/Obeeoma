// TODO: Replace with API call to fetch recent activities
// Example: const { data: activities, loading } = useRecentActivities();
interface Activity {
  text: string;
  department: string;
  time: string;
}

interface RecentActivityProps {
  activities: Activity[];
  onViewAll?: () => void;
  maxItems?: number;
}
const PRIMARY_COLOR = "#22C55E"; // Defined the custom color

const RecentActivity = ({ activities, onViewAll, maxItems = 7 }: RecentActivityProps) => {
  const defaultActivities: Activity[] = [
    {
      text: "A new invitee has joined the platform",
      department: "Engineering",
      time: "2 hours ago",
    },
    {
      text: "Marketing Department has completed monthly catch up",
      department: "",
      time: "1 day ago",
    },
    {
      text: "New wellness resources added to the platform",
      department: "",
      time: "2 days ago",
    },

    {
      text: "New educational resources have been added to the platform",
      department: "",
      time: "1 hour ago",
    },

    {
      text: "New features are added to the platform",
      department: "",
      time: "1 days ago",
    },

    {
      text: "New wellness resources added to the  Marketing department",
      department: "",
      time: "2 days ago",
    },
    {
      text: "Employee engagement survey results are now available",
      department: "HR",
      time: "3 days ago",
    },
  ];

  const recentActivity = activities?.length >= 7 ? activities : defaultActivities;

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body">
    <div className="d-flex align-items-center justify-content-between mb-4">
      {/* <h3 className="h5 fw-semibold mb-0" style={{ fontFamily: "heading" }}> {/* FONT CHANGE 1: Heading */}
        {/* Recent Activity 
      </h3> */} 
      <h6 className="fw-bold mb-3 text-center" style={{ color: '#000000', fontSize: '0.9rem' }}>
      Recent Activity
      </h6>

      <button
        className="btn btn-link text-decoration-none"
        style={{
          fontFamily: "body", // FONT CHANGE 2: Body font
          color: PRIMARY_COLOR, // COLOR CHANGE 1: View All text
        }}
        onClick={onViewAll}
      >
        View All
      </button>
    </div>
    <div className="list-group list-group-flush" style={{ fontFamily: "body" }}> {/* FONT CHANGE 3: Apply body font to list */}
      {recentActivity.slice(0, maxItems).map((activity, index) => (
        <div key={index} className="list-group-item px-0 py-3 border-bottom-0">
          <div className="d-flex align-items-start gap-3">
            <div
              className="rounded-circle mt-1 flex-shrink-0"
              // Removed bg-primary class, ensured PRIMARY_COLOR style is used
              style={{ width: "8px", height: "8px", backgroundColor: PRIMARY_COLOR }} // COLOR CHANGE 2: Activity dot color
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
