export interface EmployerUser {
  id: string | number;
  username: string;
  firstName: string;
  lastName: string;
  organizationName: string;
  email: string;
  role: 'admin' | 'employer' | 'employee' | string;
  dateJoined: string; // ISO date string

  company? : {
    id: string | number;
    name: string;
    createdAt: string;
  }
  address?: string;
  phone?: string;
}

export interface AccountData {
  organizationName: string;
  username: string;
  email: string;
  phone: string;}

export interface AccountSectionProps {
  accountData: EmployerUser;
  onAccountDataChange: (data: EmployerUser) => void;
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
  status: 'pending' | 'accepted' | 'expired' | 'active';
  sentDate: string; // ISO date string
}

export interface InviteData {
  email: string;
  role: 'employee'; // Assuming the role is fixed
}

export interface Employee {
  id: number;
  name: string;
  emailAddress: string;
  phoneNumber?: string;
  department: string;
  status: 'accepted' | 'pending' | 'rejected' | string;
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
  departmentDistribution: {
    departmentName: string;
    workerPercentage: number;
    color: string;
  }[];
  wellnessTrend: {
    date: string;
    score: number;
  }[];

  moodTrends: {
  id: number;
  employeeId: number;
  employeeName: string;
  employeeDepartment: string;
  moodLevel: number;
  mood: string;
  count: number;
  date: string;
  timestamp: string;

  }[];
  currentEmployer: EmployerUser | null;
  subscription: SubscriptionData | null;
  employees: Employee[];
  invites: EmployeeInvite[];
  billing: BillingDetails | null;
  engagement: EmployerEngagementData | null;
  reports: Report[];
  summary: DashboardSummary | null;
  isLoading: boolean;
  isActionLoading: boolean; // For post/action endpoints
  error: string | null;
}



export interface MoodTrend {
  id: number;
  employeeId: number;
  employeeName: string;
  employeeDepartment: string;
  moodLevel: number;
  mood: string;
  count: number;
  date: string;
  timestamp: string;
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

//to add more fields
export interface DashboardProps {

  companyId: string;

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