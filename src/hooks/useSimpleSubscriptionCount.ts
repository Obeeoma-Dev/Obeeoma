import { useState, useEffect } from "react";
import {
  subscriptionService,
  Subscription,
} from "../services/subscriptionService";

interface HookReturn {
  count: number;
  coveredEmployees: number;
  utilizationRate: number;
  subscriptions: Subscription[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useSimpleSubscriptionCount = (): HookReturn => {
  const [count, setCount] = useState<number>(0);
  const [coveredEmployees, setCoveredEmployees] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  const [utilizationRate, setUtilizationRate] = useState<number>(0);

  const fetchCount = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get all subscriptions
      const subscriptions = await subscriptionService.getAllSubscriptions();

      // Calculate both values
      setCount(subscriptions.length);

      // NEW: Sum up all seats from all subscriptions
      const totalSeats = subscriptions.reduce((sum, sub) => sum + sub.seats, 0);
      setCoveredEmployees(totalSeats);

      // NEW: Calculate utilization rate
      const totalUsedSeats = subscriptions.reduce(
        (sum, sub) => sum + sub.used_seats,
        0,
      );
      const rate =
        totalSeats > 0 ? Math.round((totalUsedSeats / totalSeats) * 100) : 0;
      setUtilizationRate(rate);

      setSubscriptions(subscriptions);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching subscription data:", error);
      setError(error instanceof Error ? error.message : "Failed to fetch data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCount();
  }, []);

  return {
    count,
    coveredEmployees,
    utilizationRate,
    subscriptions,
    loading,
    error,
    refetch: fetchCount,
  };
};
