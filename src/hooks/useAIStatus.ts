import { useState, useEffect } from 'react';
import { adminAPI } from '../api/apiConfig';

interface AIStatus {
  landing_ai: boolean;
  admin_ai: boolean;
  mobile_ai: boolean;
}

/**
 * Custom hook to manage AI status across admin pages
 * Fetches AI status from API and provides state setters
 */
export const useAIStatus = () => {
  const [aiStatus, setAiStatus] = useState<AIStatus>({
    landing_ai: true,
    admin_ai: true,
    mobile_ai: true,
  });

  // Load AI status on component mount
  useEffect(() => {
    const loadAIStatus = async () => {
      try {
        const response = await adminAPI.getAIStatus();
        const statusData = response.data;
        if (statusData) {
          setAiStatus({
            landing_ai: statusData.landing_ai?.is_enabled ?? true,
            admin_ai: statusData.admin_ai?.is_enabled ?? true,
            mobile_ai: statusData.mobile_ai?.is_enabled ?? true,
          });
        }
      } catch (error) {
        console.error('Failed to load AI status:', error);
        // Keep default values if API fails
      }
    };

    loadAIStatus();
  }, []);

  return aiStatus;
};
