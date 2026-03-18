import { LucideIcon } from "lucide-react";

/* Represents a statistical metric card with current value and change percentage */
export interface StatCardData {
  id: string;
  title: string;
  value: string | number;
  subtitle?: string; // Optional
  trend?: string;
  icon: LucideIcon; // Reverted back to LucideIcon
  color: "emerald" | "blue" | "amber" | "rose";
}

/* Represents a recent activity item in the dashboard */
export interface ActivityItem {
  id: string;
  type: string;
  details: string;
  time: string;
  icon: string;
  iconColor: string;
}

/* Represents a data point in the chart */
export interface EmployeeDataPoint {
  week: string;
  value: number;
}

/* Represents platform usage data from API */
export interface PlatformUsageData {
  id: number;
  week_number: number;
  usage_count: number;
  recorded_date: string;
}

/* Represents subscription revenue data from API */
export interface SubscriptionRevenueData {
  id: number;
  month: string;
  revenue: string;
  year: number;
  recorded_date: string;
}

/* Represents monthly data point for charts */
export interface MonthlyDataPoint {
  month: string;
  value: number;
}

/* Represents a bottom metric card with navigation capability */
export interface BottomMetricCard {
  id: string;
  title: string;
  value: string | number;
  subtitle: string;
  linkText: string;
  icon: string;
  color: string;
}
