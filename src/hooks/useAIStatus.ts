import { useState, useEffect, useCallback } from "react";
import { adminAPI } from "../api/apiConfig";

interface AIStatus {
  landing_ai: boolean;
  admin_ai: boolean;
  mobile_ai: boolean;
}

interface UseAIStatusReturn {
  aiStatus: AIStatus;
  updateAIStatus: (newStatus: Partial<AIStatus>) => void;
}

/**
 * Custom hook to manage AI status across admin pages
 * Uses localStorage caching to avoid repeated API calls
 */
export const useAIStatus = (): UseAIStatusReturn => {
  // Initialize state from localStorage or defaults
  const getInitialAIStatus = (): AIStatus => {
    try {
      const cached = localStorage.getItem("aiStatus");
      if (cached) {
        return JSON.parse(cached);
      }
    } catch (error) {
      console.error("Failed to parse cached AI status:", error);
    }

    // Default values if no cache or parse error
    return {
      landing_ai: true,
      admin_ai: true,
      mobile_ai: true,
    };
  };

  const [aiStatus, setAiStatus] = useState<AIStatus>(getInitialAIStatus());

  // Function to update AI status and cache it
  const updateAIStatus = useCallback((newStatus: Partial<AIStatus>) => {
    setAiStatus((prev) => {
      const updatedStatus = { ...prev, ...newStatus };

      // Cache to localStorage
      try {
        localStorage.setItem("aiStatus", JSON.stringify(updatedStatus));
      } catch (error) {
        console.error("Failed to cache AI status:", error);
      }

      return updatedStatus;
    });
  }, []);

  // Load AI status on component mount (only if no cache)
  useEffect(() => {
    const cached = localStorage.getItem("aiStatus");

    // Only fetch from API if we don't have cached data
    if (!cached) {
      const loadAIStatus = async () => {
        try {
          const response = await adminAPI.getAIStatus();
          const statusData = response.data;
          if (statusData) {
            const apiStatus = {
              landing_ai: statusData.landing_ai?.is_enabled ?? true,
              admin_ai: statusData.admin_ai?.is_enabled ?? true,
              mobile_ai: statusData.mobile_ai?.is_enabled ?? true,
            };
            updateAIStatus(apiStatus);
          }
        } catch (error) {
          console.error("Failed to load AI status:", error);
          // Keep default values if API fails
        }
      };

      loadAIStatus();
    }
  }, [updateAIStatus]);

  return { aiStatus, updateAIStatus };
};
