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
