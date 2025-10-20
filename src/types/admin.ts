export interface AdminUser {
  id: string;
  username: string;
  email: string;
  //let these roles be more specific ie system-admin, employer and employee
  role: "admin" | "employer" | "user";
  is_active: boolean;
  date_joined: string;
}

// // Define the shape of the Admin Dashboard state
export interface AdminState {
  users: AdminUser[];
  organisations: OrganisationData[];
  settings: SettingData[];
  stats: DashboardStats | null;
  featureFlags: FeatureFlag[];
  isLoading: boolean;
  error: string | null;
  crisisInsights: CrisisInsight[];
  isActionLoading: boolean;
  employeeEngagement: EmployeeEngagementData | null;
  reports: Report[];
  trends: TrendData[] | null;
  summary: DashboardSummary | null; //needs fixing
  EmployeeInvite : EmployeeInvite[];
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
// Define dashboard statistics structure returned by the API
export interface DashboardStats {
  totalUsers: number; // Total number of users
  activeUsers: number; // Number of currently active users
  employees: number; // Number of employees
  crisisInsightsCount: number; // Number of crisis insights

  // Allow dynamic keys with unknown values (safe alternative to 'any')
  [key: string]: unknown;
}

export interface DashboardSummary {
  newUsersToday: number;
  topGeographies: string[];
  recentLogins: { user: string; time: string }[];
  employee_activity: number;
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


export interface OrganisationData {
  name: string;
  industry: string;
  contact_email: string;
}

export type OrganisationUpdateData = Partial<OrganisationData>;

export interface SettingData {
  key: string;
  value: string | number | boolean;
  is_public: boolean;
}

export interface SettingUpdateData extends Partial<SettingData> {}

export interface CrisisInsight {
  id: string | number;
  date: string; // YYYY-MM-DD
  calls_received: number;
  critical_cases: number;
  // ... other fields
}

export type CrisisInsightData = Omit<CrisisInsight, 'id'>;
export type CrisisInsightUpdateData = Partial<CrisisInsightData>;

export interface FeatureFlag {
  id: string | number;
  name: string;
  enabled: boolean;
}

export type FeatureFlagData = Omit<FeatureFlag, 'id'>;
export type FeatureFlagUpdateData = Partial<FeatureFlagData>;