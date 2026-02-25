import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, ReactNode } from "react";
import axios from 'axios';

// Types
export interface DatabaseOrganization {
  id: number;
  name: string;
  client_count: number;
  current_plan: string;
  is_active: boolean;
  joined_date: string;
  email?: string;
  phone?: string;
  Location?: string;
  contact_person?: {
    id: number;
    email: string;
    firstName?: string;
    lastName?: string;
  };
}

export interface TableOrganization {
  id: string;
  name: string;
  clients: number;
  plan: string;
  status: string;
  lastActive: string;
  address: string;
  programs: number;
  icon: string;
}

// Specific API response interfaces
export interface OrganizationsListResponse {
  results?: DatabaseOrganization[];
  count?: number;
  next?: string | null;
  data?: DatabaseOrganization[];
}

export interface GrowthChartResponse {
  labels: string[];
  data: number[];
}

export interface ClientDistributionResponse {
  labels?: string[];
  data?: number[];
  // Or it could be an array of organization objects
  [key: string]: unknown;
}

// Generic API response wrapper
export interface APIResponse<T> {
  data: T;
}

// Unified conditional API interface with specific types
export interface ConditionalAPI {
  get: (url: string) => Promise<APIResponse<unknown>>;
  getOrganizationsList?: (page?: number, pageSize?: number, search?: string) => Promise<APIResponse<OrganizationsListResponse>>;
  getOrganizationsGrowthChart?: () => Promise<APIResponse<GrowthChartResponse>>;
  getOrganizationsClientDistribution?: () => Promise<APIResponse<ClientDistributionResponse>>;
  [key: string]: unknown;
}

interface OrganizationContextType {
  organizations: TableOrganization[];
  loading: boolean;
  error: string | null;
  totalCount: number;
  hasMore: boolean;
  page: number;
  searchTerm: string;
  activeTab: string;
  fetchOrganizations: (page?: number, search?: string) => Promise<void>;
  setSearchTerm: (term: string) => void;
  setActiveTab: (tab: string) => void;
  refreshOrganizations: () => Promise<void>;
  conditionalAPI: ConditionalAPI;
}

// Create context
const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined);

// Provider component
export const OrganizationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Environment detection and API setup
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const conditionalAPIBaseURL = isLocalhost
    ? 'http://127.0.0.1:8000/api/v1'  // Neon backend for localhost development
    : 'https://obeeoma-api.com/api/v1'; // Digital Ocean backend for production

  // Create conditional API instance
  const conditionalAPI = axios.create({
    baseURL: conditionalAPIBaseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Add authorization interceptor to conditional API
  conditionalAPI.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Create conditional API methods without /v1/ prefix
  const conditionalAPIWithMethods = useMemo(() => ({
    ...conditionalAPI,
    get: conditionalAPI.get.bind(conditionalAPI),
    getOrganizationsList: async (page = 1, pageSize = 10, search = "") => {
      const params = new URLSearchParams({
        page: page.toString(),
        page_size: pageSize.toString(),
      });

      if (search) {
        params.append("search", search);
      }

      const response = await conditionalAPI.get(`/admin/organizations/?${params}`);
      return response;
    },
    getOrganizationsGrowthChart: async () => {
      const response = await conditionalAPI.get("/admin/organizations/growth-chart/");
      return response;
    },
    getOrganizationsClientDistribution: async () => {
      const response = await conditionalAPI.get("/admin/organizations/client-distribution/");
      return response;
    },
  }), [conditionalAPI]);

  // State
  const [organizations, setOrganizations] = useState<TableOrganization[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  // Convert database organization to table format
  const convertToTableFormat = useCallback((org: DatabaseOrganization): TableOrganization => ({
    id: org.id.toString(),
    name: org.name,
    clients: org.client_count || 0,
    plan: org.current_plan === "Premium" ? "Premium" : "Freemium",
    status: org.is_active ? "Active" : "Inactive",
    lastActive: new Date(org.joined_date).toLocaleDateString(),
    address: org.Location || "Not specified",
    programs: 0,
    icon: "",
  }), []);

  // Fetch organizations
  const fetchOrganizations = useCallback(async (pageNum = 1, search = "") => {
    try {
      setLoading(true);
      setError(null);
      console.log(`Context: Fetching organizations: page=${pageNum}, search="${search}"`);

      const response = await conditionalAPIWithMethods.getOrganizationsList(pageNum, 5, search);
      console.log("Context API Response:", response);

      const results = response.data.results || response.data || [];
      const totalCount = response.data.count || (Array.isArray(results) ? results.length : 0);
      const hasNext = response.data.next !== undefined ? response.data.next !== null : false;

      const formattedOrgs = results.map((org: DatabaseOrganization) => convertToTableFormat(org));

      if (pageNum === 1) {
        setOrganizations(formattedOrgs);
      } else {
        setOrganizations((prev) => [...prev, ...formattedOrgs]);
      }

      setHasMore(hasNext);
      setTotalCount(totalCount);
      setPage(pageNum);

      console.log(`Context: Processed ${formattedOrgs.length} organizations, total: ${totalCount}, hasMore: ${hasNext}`);
    } catch (error) {
      console.error("Context: Error fetching organizations:", error);
      setError("Failed to fetch organizations");
      setOrganizations([]);
      setHasMore(false);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  }, [conditionalAPIWithMethods, convertToTableFormat]);

  // Refresh organizations
  const refreshOrganizations = async () => {
    setPage(1);
    setHasMore(true);
    await fetchOrganizations(1, searchTerm);
  };

  // Initial fetch
  useEffect(() => {
    fetchOrganizations(1, searchTerm);
  }, [searchTerm, activeTab, fetchOrganizations]);

  console.log('OrganizationContext - Environment:', isLocalhost ? 'Development (Neon)' : 'Production (Digital Ocean)');
  console.log('OrganizationContext - API Base URL:', conditionalAPIBaseURL);

  const value: OrganizationContextType = {
    organizations,
    loading,
    error,
    totalCount,
    hasMore,
    page,
    searchTerm,
    activeTab,
    fetchOrganizations,
    setSearchTerm,
    setActiveTab,
    refreshOrganizations,
    conditionalAPI: conditionalAPIWithMethods,
  };

  return (
    <OrganizationContext.Provider value={value}>
      {children}
    </OrganizationContext.Provider>
  );
};

// Hook to use the context
export const useOrganizationContext = () => {
  const context = useContext(OrganizationContext);
  if (context === undefined) {
    throw new Error('useOrganizationContext must be used within an OrganizationProvider');
  }
  return context;
};
