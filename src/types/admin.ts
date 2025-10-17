export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: "admin" | "employer" | "user";
  is_active: boolean;
  date_joined: string;
}

// // Define the shape of the Admin Dashboard state
export interface AdminState {
  users: AdminUser[];
  stats: DashboardStats | null;
  isLoading: boolean;
  error: string | null;
  crisisInsights: CrisisInsight[];
  isActionLoading: boolean;
  employeeEngagement: EmployeeEngagementData | null;
  reports: Report[];
  trends: TrendData[] | null;
  summary: DashboardSummary | null; //needs fixing
}

export interface EmployeeInvite {
  id: string | number;
  email: string;
  status: "pending" | "accepted" | "expired";
  sentDate: string; // ISO date string
}

export interface BillingDetails {
  planName: string;
  startDate: string;
  endDate: string;
  nextPaymentDate: string;
  amount: number;
  currency: string;
  // Add other billing/subscription fields
}

export interface EmployerEngagementData {
  teamScore: number;
  lastSurveyDate: string;
  keyAreas: {
    area: string;
    score: number;
  }[];
}
export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  employees: number;
  crisisInsightsCount: number;
  // Assuming the API returns a structured object, not just a number
  [key: string]: any; // Allow for other dynamic stats
}

export interface DashboardSummary {
  newUsersToday: number;
  topGeographies: string[];
  recentLogins: { user: string; time: string }[];
  // Add other summary fields
}

export interface CrisisInsight {
  id: string | number;
  title: string;
  content: string;
  status: "draft" | "published" | "archived" | string;
  lastUpdated: string;
}

export interface EmployeeEngagementData {
  engagementScore: number;
  sentimentTrend: number[]; // Array of trend values over time
  keyDrivers: { driver: string; score: number }[];
}

export interface TrendData {
  name: string;
  unit: string;
  dataPoints: Array<{
    period: string;
    value: number;
  }>;
}
export interface Report {
  id: string; // Report ID
  title: string;
  dateGenerated: string;
  metrics: {
    totalUsers: number;
    averageEngagementScore: number;
  };
  downloadUrl: string;
}
