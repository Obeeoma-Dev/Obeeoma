import axios from 'axios';
import { API_BASE_URL } from '../api/apiConfig';

// Use the same API base URL as your existing config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth interceptor to include JWT token (same as your apiConfig.js)
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Use 'token' like your existing code
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Types for API responses
export interface SubscriptionOverview {
  total_organizations: number;
  total_clients: number;
  monthly_revenue: number;
  organizations_this_month: number;
  clients_this_month: number;
  revenue_growth_percentage: number;
}

export interface Subscription {
  id: number;
  employer: {
    id: number;
    name: string;
  };
  plan: 'starter' | 'enterprise' | 'enterprise_plus';
  plan_details?: {
    id: number;
    name: string;
    features: string[];
  };
  amount: string;
  seats: number;
  used_seats: number;
  available_seats: number;
  start_date: string;
  end_date: string;
  renewal_date?: string;
  is_active: boolean;
  payment_method?: {
    id: number;
    type: string;
    last_four?: string;
  };
  created_at: string;
}

// API Functions
export const subscriptionService = {
  // Get subscription overview statistics
  async getSubscriptionOverview(): Promise<SubscriptionOverview> {
    const response = await apiClient.get('admin/overview/');
    return response.data;
  },

  // Get all subscriptions
  async getAllSubscriptions(): Promise<Subscription[]> {
    const response = await apiClient.get('admin/subscriptions/');
    return response.data;
  },

  // Create new subscription
  async createSubscription(subscriptionData: Partial<Subscription>): Promise<Subscription> {
    const response = await apiClient.post('admin/subscriptions/', subscriptionData);
    return response.data;
  },

  // Update subscription
  async updateSubscription(id: number, subscriptionData: Partial<Subscription>): Promise<Subscription> {
    const response = await apiClient.put(`admin/subscriptions/${id}/`, subscriptionData);
    return response.data;
  },

  // Delete/Deactivate subscription
  async deleteSubscription(id: number): Promise<void> {
    await apiClient.delete(`admin/subscriptions/${id}/`);
  },

  // Get billing history
  async getBillingHistory(): Promise<any[]> {
    const response = await apiClient.get('admin/billing/');
    return response.data;
  },
};

export default subscriptionService;
