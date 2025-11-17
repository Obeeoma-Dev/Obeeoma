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
  avatar?: string;
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

// types/employer.ts
export interface Employee {
  id: number | string;
  name: string;
  email: string;
  department: string;
  status: 'active' | 'inactive' | 'pending';
  avatar?: string;
  joinDate?: string;
  lastActive?: string;
  phoneNumber?: string;
}

// Update other interfaces to use this unified Employee type
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

// export interface EmployerUser {
//   id: string | number;
//   username: string;
//   organizationName: string;
//   email: string;
//   role: 'admin' | 'employer' | 'employee' | string;
//   dateJoined: string; // ISO date string
//   // Add other user-specific fields
//   address?: string;
//   phone?: string;
// }

// export interface AccountData {
//   organizationName: string;
//   username: string;
//   email: string;
//   phone: string;}

// export interface AccountSectionProps {
//   accountData: EmployerUser;
//   onAccountDataChange: (data: EmployerUser) => void;
// }

// export interface DashboardSummary {
//   recentActivity: string[]; // Define a more specific type if possible
//   topMetrics: {
//     metricName: string;
//     value: number;
//   }[];
//   // Add other summary fields
// }

// export interface CrisisInsight {
//   id: string | number;
//   title: string;
//   content: string;
//   status: 'draft' | 'published' | 'archived';
//   // Add other crisis insight fields
// }

// export interface EmployeeEngagementData {
//   engagementScore: number;
//   sentimentTrend: number[]; // Array of trend values over time
//   // Add other engagement metrics
// }

// export interface Report {
//   id: string | number;
//   name: string;
//   dateCreated: string;
//   downloadUrl: string;
//   // Add other report fields
// }

// export interface TrendData {
//   period: string;
//   value: number;
//   // Add other trend data fields
// }

// export interface EmployeeInvite {
//   id: string | number;
//   email: string;
//   status: 'pending' | 'accepted' | 'expired' | 'active';
//   sentDate: string; // ISO date string
// }

// export interface InviteData {
//   email: string;
//   role: 'employee'; // Assuming the role is fixed
// }

// export interface Employee {
//   id: number;
//   emailAddress: string;
//   phoneNumber?: string;
//   department: string;
//   status: 'accepted' | 'pending' | 'rejected' | string;
// }

// export interface GetEmployeeInput {
//   id: number;
// }

// export interface CreateEmployeeInput {
//   emailAddress: string;
//   phoneNumber?: string;
//   department: string;
// }

// export interface SubscriptionData {
//   plan_id: string;
//   billing_cycle: 'monthly' | 'annually';
//   methodOfPayment: string;
// }

// export interface BillingDetails {
//   planName: string;
//   startDate: string;
//   endDate: string;
//   nextPaymentDate: string;
//   amount: number;
//   currency: string;
  
// }

// export interface EmployerEngagementData {
//   teamScore: number;
//   lastSurveyDate: string;
//   keyAreas: {
//     area: string;
//     score: number;
//   }[];
  
// }

// export interface EmployerState {
//   invites: EmployeeInvite[];
//   billing: BillingDetails | null;
//   engagement: EmployerEngagementData | null;
//   reports: Report[];
//   summary: DashboardSummary | null;
//   subcription: SubscriptionData | null;
//   isLoading: boolean;
//   isActionLoading: boolean; // For post/action endpoints
//   error: string | null;
// }

//   export interface NotificationSettings {
//   emailNotifications: boolean;
//   weeklyReports: boolean;
//   browserNotifications: boolean;
//   reportGeneration: boolean;
// }

// export interface PrivacySettings {
//   anonymizeData: boolean;
//   enhancedPrivacy: boolean;
//   dataRetentionPeriod: number;
// }