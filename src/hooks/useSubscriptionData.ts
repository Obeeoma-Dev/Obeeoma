import { useState, useEffect } from 'react';
import { subscriptionService, SubscriptionOverview, Subscription } from '../services/subscriptionService';

interface SubscriptionData {
  overview: SubscriptionOverview | null;
  subscriptions: Subscription[];
  loading: boolean;
  error: string | null;
}

interface UseSubscriptionDataReturn extends SubscriptionData {
  refetch: () => void;
}

export const useSubscriptionData = (): UseSubscriptionDataReturn => {
  const [data, setData] = useState<SubscriptionData>({
    overview: null,
    subscriptions: [],
    loading: true,
    error: null,
  });

  const fetchData = async () => {
    try {
      setData(prev => ({ ...prev, loading: true, error: null }));

      // Fetch both overview and subscriptions in parallel
      const [overviewResponse, subscriptionsResponse] = await Promise.all([
        subscriptionService.getSubscriptionOverview(),
        subscriptionService.getAllSubscriptions(),
      ]);

      setData({
        overview: overviewResponse,
        subscriptions: subscriptionsResponse,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error('Error fetching subscription data:', error);
      setData(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch data',
      }));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Refetch function for manual refresh
  const refetch = () => {
    fetchData();
  };

  return {
    ...data,
    refetch: fetchData,
  };
};

// Helper function to calculate metrics from raw data
export const calculateMetrics = (overview: SubscriptionOverview, subscriptions: Subscription[]) => {
  const totalSubscriptions = subscriptions.length;
  const coveredEmployees = subscriptions.reduce((sum, sub) => sum + sub.seats, 0);
  const usedEmployees = subscriptions.reduce((sum, sub) => sum + sub.used_seats, 0);
  const utilizationRate = coveredEmployees > 0 ? Math.round((usedEmployees / coveredEmployees) * 100) : 0;

  return {
    totalOrganizations: overview.total_organizations,
    totalSubscriptions,
    coveredEmployees: coveredEmployees.toLocaleString(),
    utilizationRate,
    revenueGrowth: overview.revenue_growth_percentage,
    organizationsGrowth: ((overview.organizations_this_month / Math.max(overview.total_organizations - overview.organizations_this_month, 1)) * 100),
  };
};

export default useSubscriptionData;
