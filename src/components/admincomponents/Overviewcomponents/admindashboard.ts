// Types and interfaces for the System Admin Dashboard

/**
 * Represents a statistical metric card with current value and change percentage
 */
export interface StatCardData {
  // Unique identifier for the stat card
  id: string;
  // Display title for the metric
  title: string;
  // Current value of the metric (number or formatted string)
  value: string | number;
  // Percentage change from previous period (positive or negative)
  change: string;
  // Icon name from lucide-react to display
  icon: string;
  // Color scheme for the icon background
  iconColor: string;
}

/**
 * Represents a recent activity item in the dashboard
 */
export interface ActivityItem {
  // Unique identifier for the activity
  id: string;
  // Type of activity (e.g., "New Organization", "AI Recommendation")
  type: string;
  // Detailed description of the activity
  details: string;
  // Timestamp relative to current time (e.g., "2 hours ago")
  time: string;
  // Icon name from lucide-react
  icon: string;
  // Color for the icon background
  iconColor: string;
}

/**
 * Represents a data point in the chart
 */
export interface EmployeeDataPoint {
  // Week label (e.g., "Week 1")
  week: string;
  // Usage value for that week
  value: number;
}

/**
 * Represents a bottom metric card with navigation capability
 */
export interface BottomMetricCard {
  // Unique identifier
  id: string;
  // Title of the metric
  title: string;
  // Main value to display
  value: string | number;
  // Subtitle or description
  subtitle: string;
  // Link text for navigation
  linkText: string;
  // Icon name from lucide-react
  icon: string;
  // Color scheme for the card
  color: string;
}
