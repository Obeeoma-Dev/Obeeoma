export interface EmployerUser {
  id: string | number;
  username: string;
  firstName: string;
  lastName: string;
  organizationName: string;
  email: string;
  role: 'admin' | 'employer' | 'employee' | string;
  dateJoined: string; // ISO date string
  phone?: string;
  compnayLogo?: string;
  company?: {
    id: string | number;
    name: string;
    createdAt: string;
    industry?: string;
    size?: string;
  };
}

export interface AccountData {
  organizationName: string;
  username: string;
  email: string;
  phone: string;
}

export interface AccountSectionProps {
  accountData: EmployerUser;
  onAccountDataChange: (data: EmployerUser) => void;
}

export interface DashboardProps {
  companyId?: string;
  refreshInterval?: number;
}

export interface DashboardSummary {
  totalEmployees: number;
  wellnessIndex: number;
  atRisk: number;
  recentActivity: string[];
  topMetrics: {
    metricName: string;
    value: number;
  }[];
}

export interface CrisisInsight {
  id: string | number;
  title: string;
  content: string;
  status: 'draft' | 'published' | 'archived';
}

export interface EmployeeEngagementData {
  engagementScore: number;
  sentimentTrend: number[];
}

export interface Report {
  id: string | number;
  name: string;
  dateCreated: string;
  downloadUrl: string;
}

export interface TrendData {
  period: string;
  value: number;
}

export interface InviteData {
  email: string;
  role: 'employee';
}

// Unified Employee type for all employee-related operations
export interface Employee {
  id: number | string;
  name?: string;
  email?: string;
  emailAddress?: string;
  department: string;
  status: 'active' | 'inactive' | 'pending' | 'accepted' | 'rejected' | string;
  compnayLogo?: string;
  joinDate?: string;
  lastActive?: string;
  phoneNumber?: string;
}

export interface EmployeeInvite {
  id: string | number;
  email: string;
  name?: string;
  phone?: string;
  department: string;
  status: 'pending' | 'accepted' | 'expired' | 'active';
  sentDate: string;
}

export interface MoodTrend {
  id: number;
  employeeId: number;
  employeeName: string;
  employeeDepartment: string;
  moodLevel: number;
  date: string;
  timestamp: string;
}

export interface GetEmployeeInput {
  id: number;
}

export interface CreateEmployeeInput {
  emailAddress: string;
  phoneNumber?: string;
  department: string;
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
  currentEmployer: EmployerUser | null;
  invites: EmployeeInvite[];
  employees: Employee[];
  billing: BillingDetails | null;
  engagement: EmployerEngagementData | null;
  reports: Report[];
  summary: DashboardSummary | null;
  subscription: SubscriptionData | null;
  departmentDistribution: Array<{ name: string; percentage: number; color: string }>;
  wellnessTrend: Array<{ date: string; score: number }>;
  moodTrends: any[];
  // employees: list of employee records for the employer
  // employees: Employee[];
  isLoading: boolean;
  isActionLoading: boolean;
  error: string | null;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  weeklyReports: boolean;
  browserNotifications: boolean;
  reportGeneration: boolean;
}

export interface PrivacySettings {
  anonymizeData: boolean;
  enhancedPrivacy: boolean;
  dataRetentionPeriod: number;
}

export interface UsageData {
  api_calls_used: number;
  api_calls_limit: number;
  api_calls_percent: number;
  seats_used: number;
  seats_limit: number;
  seats_percent: number;
  last_updated: string;
}

export interface PaymentUpdatePayload {
    token_id: string; 
    email: string; // Required for Flutterwave customer 
}

export interface InvoiceItem {
    invoice_number: string;
    date: string; // YYYY-MM-DD format
    amount: number;
    currency: string;
    description: string;
    status: string;
    invoice_url: string | null;
}