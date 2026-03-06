import { useState, useEffect } from 'react';
import { adminAPI } from '../api/apiConfig';
import { ConditionalAPI } from '../contexts/OrganizationContext';

// Types for organization data
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

// Types for dashboard stats
import { StatCardData } from '../components/admincomponents/Overviewcomponents/admindashboard';
import { Building2, Users, CircleCheckBig } from 'lucide-react';

interface UseOrganizationDataReturn {
  // Stats data
  stats: StatCardData[];
  statsLoading: boolean;
  statsError: string | null;

  // Organizations data
  organizations: TableOrganization[];
  organizationsLoading: boolean;
  organizationsError: string | null;
  hasMore: boolean;
  totalCount: number;

  // Actions
  refreshStats: () => void;
  refreshOrganizations: () => void;
  fetchMoreOrganizations: (search?: string) => void;
  searchOrganizations: (search: string) => void;
  addOrganization: (org: TableOrganization) => void;
  updateOrganization: (org: TableOrganization) => void;
  deleteOrganization: (id: string) => void;
}

/**
 * Custom hook to manage organization data across admin pages
 * Uses localStorage caching to avoid repeated API calls
 * Provides both stats and organizations data management
 */
export const useOrganizationData = (conditionalAPI?: ConditionalAPI): UseOrganizationDataReturn => {
  // Stats state
  const [stats, setStats] = useState<StatCardData[]>([]);
  const [statsLoading, setStatsLoading] = useState(false);
  const [statsError, setStatsError] = useState<string | null>(null);

  // Organizations state
  const [organizations, setOrganizations] = useState<TableOrganization[]>([]);
  const [organizationsLoading, setOrganizationsLoading] = useState(false);
  const [organizationsError, setOrganizationsError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSearch, setCurrentSearch] = useState('');

  // Refresh triggers
  const [statsRefreshTrigger, setStatsRefreshTrigger] = useState(0);
  const [organizationsRefreshTrigger, setOrganizationsRefreshTrigger] = useState(0);

  // Initialize stats from cache
  const getInitialStats = (): StatCardData[] => {
    try {
      const cached = localStorage.getItem('organizationStats');
      if (cached) {
        const cacheTimestamp = localStorage.getItem('organizationStatsTimestamp');
        if (cacheTimestamp) {
          const now = Date.now();
          const cacheAge = now - parseInt(cacheTimestamp);
          // Cache for 5 minutes
          if (cacheAge < 5 * 60 * 1000) {
            const parsedStats = JSON.parse(cached);
            // Re-add icons since they can't be serialized
            return parsedStats.map((stat: any) => {
              let icon;
              switch (stat.title) {
                case "Total Organizations":
                  icon = Building2;
                  break;
                case "Total Client":
                  icon = Users;
                  break;
                case "Active Programs":
                  icon = CircleCheckBig;
                  break;
                default:
                  icon = Building2;
              }
              return { ...stat, icon };
            });
          }
        }
      }
    } catch (error) {
      console.error('Failed to parse cached stats:', error);
    }
    return [];
  };

  // Initialize organizations from cache
  const getInitialOrganizations = (): TableOrganization[] => {
    try {
      const cached = localStorage.getItem('organizationData');
      if (cached) {
        const cacheTimestamp = localStorage.getItem('organizationDataTimestamp');
        if (cacheTimestamp) {
          const now = Date.now();
          const cacheAge = now - parseInt(cacheTimestamp);
          // Cache for 5 minutes
          if (cacheAge < 5 * 60 * 1000) {
            return JSON.parse(cached);
          }
        }
      }
    } catch (error) {
      console.error('Failed to parse cached organizations:', error);
    }
    return [];
  };

  // Cache functions
  const cacheStats = (data: StatCardData[]) => {
    try {
      const dataToCache = data.map(({ icon, ...rest }) => rest);
      localStorage.setItem('organizationStats', JSON.stringify(dataToCache));
      localStorage.setItem('organizationStatsTimestamp', Date.now().toString());
    } catch (error) {
      console.error('Failed to cache stats:', error);
    }
  };

  const cacheOrganizations = (data: TableOrganization[]) => {
    try {
      localStorage.setItem('organizationData', JSON.stringify(data));
      localStorage.setItem('organizationDataTimestamp', Date.now().toString());
    } catch (error) {
      console.error('Failed to cache organizations:', error);
    }
  };

  // Convert database organization to table format
  const convertToTableFormat = (org: DatabaseOrganization): TableOrganization => ({
    id: org.id.toString(),
    name: org.name,
    clients: org.client_count || 0,
    plan: org.current_plan === "Premium" ? "Premium" : "Freemium",
    status: org.is_active ? "Active" : "Inactive",
    lastActive: new Date(org.joined_date).toLocaleDateString(),
    address: org.Location || "Not specified",
    programs: 0,
    icon: "",
  });

  // Fetch stats
  const fetchStats = async (forceRefresh = false) => {
    try {
      setStatsLoading(true);
      setStatsError(null);

      // Check cache first
      if (!forceRefresh) {
        const cached = getInitialStats();
        if (cached.length > 0) {
          setStats(cached);
          setStatsLoading(false);
          return;
        }
      }

      const apiInstance = conditionalAPI || adminAPI;
      let response;

      try {
        if (conditionalAPI && 'getDashboardOverview' in conditionalAPI) {
          // Type assertion to tell TypeScript this method exists
          const conditionalApiWithOverview = conditionalAPI as any;
          if (conditionalApiWithOverview.getDashboardOverview) {
            response = await conditionalApiWithOverview.getDashboardOverview();
          } else {
            response = await adminAPI.getDashboardOverview();
          }
        } else {
          response = await adminAPI.getDashboardOverview();
        }
      } catch (error) {
        console.error("Error fetching dashboard overview:", error);
        // Fallback to adminAPI if conditionalAPI fails
        response = await adminAPI.getDashboardOverview();
      }
      const data = response.data;

      const newStats: StatCardData[] = [
        {
          id: "1",
          title: "Total Organizations",
          value: data.total_organizations?.toString() || "0",
          trend: `+${data.organizations_this_month || 0} this month`,
          icon: Building2,
          color: "emerald",
        },
        {
          id: "2",
          title: "Total Client",
          value: data.total_clients?.toString() || "0",
          trend: `+${data.clients_this_month || 0} this month`,
          icon: Users,
          color: "emerald",
        },
        {
          id: "3",
          title: "Active Programs",
          value: "0",
          trend: "+5 this month",
          icon: CircleCheckBig,
          color: "emerald",
        },
      ];

      setStats(newStats);
      cacheStats(newStats);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
      setStatsError(error instanceof Error ? error.message : "Failed to load stats");
    } finally {
      setStatsLoading(false);
    }
  };

  // Fetch organizations
  const fetchOrganizations = async (page = 1, search = '', append = false) => {
    try {
      setOrganizationsLoading(true);
      setOrganizationsError(null);

      // Check cache for first page only
      if (!append && page === 1 && !search) {
        const cached = getInitialOrganizations();
        if (cached.length > 0) {
          setOrganizations(cached);
          setTotalCount(cached.length);
          setHasMore(false);
          setOrganizationsLoading(false);
          return;
        }
      }

      const apiInstance = conditionalAPI || adminAPI;
      let response;

      try {
        if (conditionalAPI && 'getOrganizationsList' in conditionalAPI && conditionalAPI.getOrganizationsList) {
          response = await conditionalAPI.getOrganizationsList(page, 5, search);
        } else {
          response = await adminAPI.getOrganizationsList?.(page, 5, search);
        }
      } catch (error) {
        console.error("Error fetching organizations:", error);
        // Fallback to adminAPI if conditionalAPI fails
        response = await adminAPI.getOrganizationsList?.(page, 5, search);
      }

      const results = response?.data?.results || response?.data || [];
      const totalCount = response?.data?.count || (Array.isArray(results) ? results.length : 0);
      const hasNext = response?.data?.next !== undefined ? response?.data?.next !== null : false;

      const formattedOrgs = results.map((org: DatabaseOrganization) => convertToTableFormat(org));

      if (append) {
        setOrganizations(prev => [...prev, ...formattedOrgs]);
      } else {
        setOrganizations(formattedOrgs);
        if (page === 1 && !search) {
          cacheOrganizations(formattedOrgs);
        }
      }

      setHasMore(hasNext);
      setTotalCount(totalCount);
      setCurrentPage(page);
    } catch (error) {
      console.error("Failed to fetch organizations:", error);
      setOrganizationsError(error instanceof Error ? error.message : "Failed to load organizations");
    } finally {
      setOrganizationsLoading(false);
    }
  };

  // Effects for initial data loading
  useEffect(() => {
    fetchStats();
  }, [statsRefreshTrigger]);

  useEffect(() => {
    fetchOrganizations(1, currentSearch);
  }, [organizationsRefreshTrigger, currentSearch]);

  // Action functions
  const refreshStats = () => {
    localStorage.removeItem('organizationStats');
    localStorage.removeItem('organizationStatsTimestamp');
    setStatsRefreshTrigger(prev => prev + 1);
  };

  const refreshOrganizations = () => {
    localStorage.removeItem('organizationData');
    localStorage.removeItem('organizationDataTimestamp');
    setOrganizationsRefreshTrigger(prev => prev + 1);
  };

  const fetchMoreOrganizations = (search = currentSearch) => {
    if (hasMore && !organizationsLoading) {
      fetchOrganizations(currentPage + 1, search, true);
    }
  };

  const searchOrganizations = (search: string) => {
    setCurrentSearch(search);
    setCurrentPage(1);
    setHasMore(true);
  };

  const addOrganization = (org: TableOrganization) => {
    const updatedOrgs = [org, ...organizations];
    setOrganizations(updatedOrgs);
    cacheOrganizations(updatedOrgs);
    // Update stats
    const updatedStats = stats.map(stat => {
      if (stat.title === "Total Organizations") {
        const currentValue = typeof stat.value === 'number' ? stat.value : parseInt(stat.value) || 0;
        return { ...stat, value: (currentValue + 1).toString() };
      }
      return stat;
    });
    setStats(updatedStats);
    cacheStats(updatedStats);
  };

  const updateOrganization = (updatedOrg: TableOrganization) => {
    const updatedOrgs = organizations.map(org =>
      org.id === updatedOrg.id ? updatedOrg : org
    );
    setOrganizations(updatedOrgs);
    cacheOrganizations(updatedOrgs);
  };

  const deleteOrganization = (id: string) => {
    const updatedOrgs = organizations.filter(org => org.id !== id);
    setOrganizations(updatedOrgs);
    cacheOrganizations(updatedOrgs);
    // Update stats
    const updatedStats = stats.map(stat => {
      if (stat.title === "Total Organizations") {
        const currentValue = typeof stat.value === 'number' ? stat.value : parseInt(stat.value) || 0;
        return { ...stat, value: Math.max(0, currentValue - 1).toString() };
      }
      return stat;
    });
    setStats(updatedStats);
    cacheStats(updatedStats);
  };

  return {
    stats,
    statsLoading,
    statsError,
    organizations,
    organizationsLoading,
    organizationsError,
    hasMore,
    totalCount,
    refreshStats,
    refreshOrganizations,
    fetchMoreOrganizations,
    searchOrganizations,
    addOrganization,
    updateOrganization,
    deleteOrganization,
  };
};
