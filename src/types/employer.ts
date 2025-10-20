export interface EmployerUser {
  id: string | number;
  username: string;
  email: string;
  role: 'admin' | 'employer' | 'employee' | string;
  dateJoined: string; // ISO date string
  // Add other user-specific fields
}


export interface DashboardSummary {
  recentActivity: string[]; // Define a more specific type if possible
  topMetrics: {
    metricName: string;
    value: number;
  }[];
  // Add other summary fields
}


export interface CrisisInsight {
  id: string | number;
  title: string;
  content: string;
  status: 'draft' | 'published' | 'archived';
  // Add other crisis insight fields
}


export interface EmployeeEngagementData {
  engagementScore: number;
  sentimentTrend: number[]; // Array of trend values over time
  // Add other engagement metrics
}

export interface Report {
  id: string | number;
  name: string;
  dateCreated: string;
  downloadUrl: string;
  // Add other report fields
}


export interface TrendData {
  period: string;
  value: number;
  // Add other trend data fields
}

export interface EmployeeInvite {
  id: string | number;
  email: string;
  status: 'pending' | 'accepted' | 'expired';
  sentDate: string; // ISO date string
}

export interface InviteData {
  email: string;
  role: 'employee'; // Assuming the role is fixed
}

export interface SubscriptionData {
  plan_id: string;
  billing_cycle: 'monthly' | 'annually';
 methodOfPayment: string;
}


export interface BillingDetails {
  planName: string;
  startDate: string;
  endDate: string;
  nextPaymentDate: string;
  amount: number;
  currency: string;
  
}

export interface EmployerEngagementData {
  teamScore: number;
  lastSurveyDate: string;
  keyAreas: {
    area: string;
    score: number;
  }[];
  
}

export interface EmployerState {
  invites: EmployeeInvite[];
  billing: BillingDetails | null;
  engagement: EmployerEngagementData | null;
  reports: Report[];
  summary: DashboardSummary | null;
  subcription: SubscriptionData | null;
  isLoading: boolean;
  isActionLoading: boolean; // For post/action endpoints
  error: string | null;
}