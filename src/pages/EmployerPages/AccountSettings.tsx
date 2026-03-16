import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Save, LogOut } from "lucide-react";

// Internal Project Imports
import Layout from "../../components/employercomponents/shared/Layout";
import SettingsNavigation from "../../components/employercomponents/employersettings/SettingsNavigation";
import AccountSection from "../../components/employercomponents/employersettings/AccountSection";
import NotificationsSection from "../../components/employercomponents/employersettings/NotificationSettings";
import PrivacySection from "../../components/employercomponents/employersettings/PrivacySection";
import LogoutButton from "../../components/authenticationComponents/Logout";

// Types and Store
import { EmployerUser } from "@/types/employer";
import { AppDispatch, RootState } from "../../store/store";
import { fetchCurrentEmployer } from "../../store/slices/EmployerSlice";

const EmployerAccountProfile = () => {
  const [activeSection, setActiveSection] = useState("account");
  const dispatch = useDispatch<AppDispatch>();

  // Get employer data from Redux store
  const employer = useSelector(
    (state: RootState) => state.employer.currentEmployer,
  );
  const isLoading = useSelector((state: RootState) => state.employer.isLoading);
  const [accountData, setAccountData] = useState<EmployerUser | null>(null);

  // Settings states
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    weeklyReports: true,
    browserNotifications: false,
    reportGeneration: true,
  });

  const [privacySettings, setPrivacySettings] = useState({
    anonymizeData: true,
    enhancedPrivacy: false,
    dataRetentionPeriod: 90,
  });

  /**
   * FIX: Initialize account data with fallbacks
   * This structure avoids the 'exhaustive-deps' warning by using a functional update
   * for the final fallback, ensuring 'accountData' isn't needed in the dependency array.
   */
  // Get auth user from Redux store as fallback
  const authUser = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    // 1. Priority: Redux Employer Store
    if (employer) {
      const updatedData: EmployerUser = {
        id: employer.id || "",
        role: (employer.role as "employer" | "admin") || "employer",
        dateJoined: employer.dateJoined || new Date().toISOString(),
        organizationName:
          employer.organizationName || employer.username || "Your Company",
        firstName: employer.firstName || "",
        lastName: employer.lastName || "",
        username: employer.username || "Admin User",
        email: employer.email || "admin@example.com",
        phone: employer.phone || "",
        company: employer.company || {
          id: "",
          createdAt: "",
        },
      };

      setAccountData(updatedData);
      localStorage.setItem("employerAccountData", JSON.stringify(updatedData));
      return;
    }

    // 2. Priority: Redux Auth Store (User might be logged in but employer profile fetch failed)
    if (authUser) {
      // Map AuthUser to EmployerUser as best as possible
      const fallbackData: EmployerUser = {
        id: authUser.id,
        role: authUser.role || "employer",
        dateJoined: new Date().toISOString(),
        organizationName:
          authUser.organizationName || authUser.username || "Your Company",
        firstName: "", // AuthUser might not have this
        lastName: "",
        username: authUser.username || "Admin User",
        email: authUser.email || "admin@example.com",
        phone: "",
        company: { id: "", createdAt: "" },
      };
      setAccountData(fallbackData);
      return;
    }

    // 3. Priority: localStorage 'employerAccountData' (Cached full profile)
    const storedEmployer = localStorage.getItem("employerAccountData");
    if (storedEmployer) {
      try {
        const parsedData = JSON.parse(storedEmployer);
        setAccountData(parsedData);
        return;
      } catch (error) {
        console.warn(
          "Failed to parse localStorage employerAccountData:",
          error,
        );
      }
    }

    // 4. Priority: localStorage 'user' (Cached basic auth info)
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        const fallbackData: EmployerUser = {
          id: parsedUser.id || "",
          role: parsedUser.role || "employer",
          dateJoined: new Date().toISOString(),
          organizationName:
            parsedUser.organizationName ||
            parsedUser.username ||
            "Your Company",
          firstName: "",
          lastName: "",
          username: parsedUser.username || "Admin User",
          email: parsedUser.email || "admin@example.com",
          phone: "",
          company: { id: "", createdAt: "" },
        };
        setAccountData(fallbackData);
        return;
      } catch (error) {
        console.warn("Failed to parse localStorage user:", error);
      }
    }

    // 5. Final Fallback: Default Data
    setAccountData((current) => {
      if (current) return current; // Prevent overwrite if data was already set

      return {
        id: "",
        role: "employer",
        dateJoined: new Date().toISOString(),
        organizationName: "Your Company",
        firstName: "first name",
        lastName: "last name",
        username: "Admin User",
        email: "admin@example.com",
        phone: "",
        company: { id: "", createdAt: "", companySize: 0 },
      };
    });
  }, [employer, authUser]);

  // Fetch employer data from backend on component mount
  useEffect(() => {
    if (!employer && !isLoading) {
      dispatch(fetchCurrentEmployer());
    }
  }, [dispatch, employer, isLoading]);

  const handleSaveChanges = () => {
    if (accountData) {
      console.log("Saving changes:", {
        accountData,
        notificationSettings,
        privacySettings,
      });
      alert("Settings saved successfully!");
    }
  };

  const renderSection = () => {
    if (!accountData) return null;

    switch (activeSection) {
      case "account":
        return <AccountSection accountData={accountData} />;
      case "notifications":
        return (
          <NotificationsSection
            notificationSettings={notificationSettings}
            onNotificationSettingsChange={setNotificationSettings}
          />
        );
      case "privacy":
        return (
          <PrivacySection
            privacySettings={privacySettings}
            onPrivacySettingsChange={setPrivacySettings}
          />
        );
      default:
        return <AccountSection accountData={accountData} />;
    }
  };

  // Loading State UI
  if (!accountData) {
    return (
      <Layout title="Settings">
        <div className="container-fluid py-4 px-3">
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "400px" }}
          >
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <span className="ms-3">Loading account data...</span>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Settings">
      <div className="container-fluid py-4 px-3">
        {/* Navigation Bar */}
        <div className="row mb-4">
          <div className="col-12">
            <SettingsNavigation
              activeSection={activeSection}
              onSectionChange={setActiveSection}
            />
          </div>
        </div>

        {/* Settings Content */}
        <div className="row">
          <div className="col-12 mx-auto">
            {renderSection()}

            {/* Actions */}
            <div className="mt-4 d-flex justify-content-end gap-3">
              <button
                onClick={handleSaveChanges}
                className="btn d-flex align-items-center gap-2"
                style={{ backgroundColor: "#22C55E", color: "white" }}
              >
                <Save size={18} />
                Save Changes
              </button>

              <LogoutButton
                className="d-flex align-items-center gap-2 btn"
                style={{
                  backgroundColor: "#FFFFFF",
                  color: "#3d3c3c",
                  border: "1px solid #dee2e6",
                }}
              >
                <LogOut size={18} />
                Logout
              </LogoutButton>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmployerAccountProfile;
