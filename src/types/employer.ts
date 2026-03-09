// import {} from "react";
// export interface EmployerUser {
//   id: string | number;
//   username: string;
//   firstName: string;
//   lastName: string;
//   organizationName: string;
//   email: string;
//   role: "admin" | "employer" | "employee" | string;
//   dateJoined: string; // ISO date string

  

//   company?: {
//     id: string | number;
//     companySize: number;
//     createdAt: string;
//   };
//   address?: string;
//   phone?: string;
//   timeZone?: string;
//   language?: string;
//   dateFormat?: string;
//   contactPerson?: string;
// }

// export interface AccountData {
//   organizationName: string;
//   username: string;
//   email: string;
//   phone: string;
// }

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
//   totalEmployees?: number;
//   activeEmployees?: number;
//   inactiveEmployees?: number;
//   wellnessIndex?: number;
//   atRisk?: number;
//   // Add other summary fields
// }

// export interface CrisisInsight {
//   id: string | number;
//   title: string;
//   content: string;
//   status: "draft" | "published" | "archived";
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
//   status: "pending" | "accepted" | "expired" | "active";
//   sentDate: string; // ISO date string
// }

// export interface InviteData {
//   email: string;
//   role: "employee"; // Assuming the role is fixed
// }

// export interface Employee {
//   id: number;
//   emailAddress: string;
//   phoneNumber?: string;
//   employeedepartment: string;
//   status: "accepted" | "pending" | "rejected" | string;
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
//   billing_cycle: "monthly" | "annually";
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

// export interface EmployeeMoodDistribution {
//   mood: string;
//   count: number;
// }

// export interface EmployerState {
//   departmentDistribution: {
//     departmentName: string;
//     workerPercentage: number;
//     color: string;
//   }[];
//   wellnessTrend: {
//     date: string;
//     avg_score: number;
//     mood_counts: Record<string, number>;
//   }[];
//   EmployeeStatusData: EmployeeStatusData;
//   moodTrends: {
//     id: number;
//     employeeId: number;
//     employeeName: string;
//     employeeDepartment: string;
//     moodLevel: number;
//     mood: string;
//     count: number;
//     date: string;
//     timestamp: string;
//   }[];
//   employeeMoodDistribution: EmployeeMoodDistribution[];
//   currentEmployer: EmployerUser | null;
//   subscription: SubscriptionData | null;
//   employees: Employee[];
//   invites: EmployeeInvite[];
//   billing: BillingDetails | null;
//   engagement: EmployerEngagementData | null;
//   reports: Report[];
//   summary: DashboardSummary | null;
//   isLoading: boolean;
//   isActionLoading: boolean; // For post/action endpoints
//   error: string | null;
// }

// export interface EmployeeStatusData {
//   id: number;
//   worker_department: string;
//   hours_engaged: string;
//   recorded_at: string;
//   activeEmployees: number;
//   inactiveEmployees: number;
//   totalEmployees: number;
//   activePercentage: number;
//   inactivePercentage: number;
// }

// export interface MoodTrend {
//   id: number;
//   employeeId: number;
//   employeeName: string;
//   employeeDepartment: string;
//   moodLevel: number;
//   mood: string;
//   count: number;
//   date: string;
//   timestamp: string;
// }
// export interface WellnessTrend {
//   date: string;
//   avg_score: number;
//   mood_counts: Record<string, number>;
// }

// export interface NotificationSettings {
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

// //to add more fields
// export interface DashboardProps {
//   companyId: string;
// }

// export interface UsageData {
//   api_calls_used: number;
//   api_calls_limit: number;
//   api_calls_percent: number;
//   seats_used: number;
//   seats_limit: number;
//   seats_percent: number;
//   last_updated: string;
// }

// export interface PaymentUpdatePayload {
//   token_id?: string; // For Flutterwave (legacy)
//   authorization_code?: string; // For Paystack
//   email: string; // Required for both payment providers
// }

// export interface InvoiceItem {
//   invoice_number: string;
//   date: string; // YYYY-MM-DD format
//   amount: number;
//   currency: string;
//   description: string;
//   status: string;
//   invoice_url: string | null;
// }

import {} from "react";

export interface EmployerUser {
  id: string | number;
  username: string;
  firstName: string;
  lastName: string;
  organizationName: string;
  email: string;
  role: "admin" | "employer" | "employee" | string;
  dateJoined: string; // ISO date string

  company?: {
    id: string | number;
    companySize: number;
    createdAt: string;
  };
  address?: string;
  phone?: string;
  timeZone?: string;
  language?: string;
  dateFormat?: string;
  contactPerson?: string;
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
  recentActivity: string[];
  topMetrics: {
    metricName: string;
    value: number;
  }[];
  totalEmployees?: number;
  activeEmployees?: number;
  inactiveEmployees?: number;
  wellnessIndex?: number;
  atRisk?: number;
}

export interface CrisisInsight {
  id: string | number;
  title: string;
  content: string;
  status: "draft" | "published" | "archived";
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

export interface EmployeeInvite {
  id: string | number;
  email: string;
  status: "pending" | "accepted" | "expired" | "active";
  sentDate: string; 
}

export interface InviteData {
  email: string;
  role: "employee";
}

export interface Employee {
  id: number;
  emailAddress: string;
  phoneNumber?: string;
  employeedepartment: string;
  status: "accepted" | "pending" | "rejected" | string;
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
  billing_cycle: "monthly" | "annually";
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

/** * UPDATED: Mood Distribution Interface 
 */
export interface EmployeeMoodDistribution {
  mood: string;
  count: number;
  percentage?: number;
}

/** * UPDATED: EmployerState 
 * Added 'status' to track the specific loading state of the Bar Graph
 */
export interface EmployerState {
  departmentDistribution: {
    departmentName: string;
    workerPercentage: number;
    color: string;
  }[];
  wellnessTrend: {
    date: string;
    avg_score: number;
    mood_counts: Record<string, number>;
  }[];
  EmployeeStatusData: EmployeeStatusData;
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
  employeeMoodDistribution: EmployeeMoodDistribution[];
  generalMood: string;
  totalEntries: number;
  categoryData: { Positive: number; Neutral: number; Negative: number };
  gaugeDetails: GaugeData;
  
  // --- ADDED FIELD ---
  status: 'idle' | 'loading' | 'succeeded' | 'failed'; 
  
  currentEmployer: EmployerUser | null;
  subscription: SubscriptionData | null;
  employees: Employee[];
  invites: EmployeeInvite[];
  billing: BillingDetails | null;
  engagement: EmployerEngagementData | null;
  reports: Report[];
  summary: DashboardSummary | null;
  isLoading: boolean;
  isActionLoading: boolean; 
  error: string | null;
}

export interface GaugeData {
  moodLabel: string;
  needleAngle: number;
  totalEntries: number;
  score: number;
}

export interface EmployeeStatusData {
  id: number;
  worker_department: string;
  hours_engaged: string;
  recorded_at: string;
  activeEmployees: number;
  inactiveEmployees: number;
  totalEmployees: number;
  activePercentage: number;
  inactivePercentage: number;
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

export interface WellnessTrend {
  date: string;
  avg_score: number;
  mood_counts: Record<string, number>;
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
  token_id?: string; 
  authorization_code?: string; 
  email: string; 
}

export interface InvoiceItem {
  invoice_number: string;
  date: string; 
  amount: number;
  currency: string;
  description: string;
  status: string;
  invoice_url: string | null;
}
