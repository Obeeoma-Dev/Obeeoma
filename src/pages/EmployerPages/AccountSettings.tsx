import { useState, useEffect } from "react";
import Layout from "../../components/employercomponents/shared/Layout";
import SettingsNavigation from "../../components/employercomponents/employersettings/SettingsNavigation";
import AccountSection from "../../components/employercomponents/employersettings/AccountSection";
import NotificationsSection from "../../components/employercomponents/employersettings/NotificationSettings";
import PrivacySection from "../../components/employercomponents/employersettings/PrivacySection";
import { Save, LogOut } from "lucide-react";
import { EmployerUser } from "@/types/employer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchCurrentEmployer } from "../../store/slices/EmployerSlice";
import LogoutButton from "../../components/authenticationComponents/Logout"; 

const EmployerAccountProfile = () => {
  const [activeSection, setActiveSection] = useState("account");
  const dispatch = useDispatch<AppDispatch>();
  
  // Get employer data from Redux store
  const employer = useSelector((state: RootState) => state.employer.currentEmployer);
  const isLoading = useSelector((state: RootState) => state.employer.isLoading);
  const [accountData, setAccountData] = useState<EmployerUser | null>(null);

  // Initialize account data with fallbacks
  useEffect(() => {
    const initializeAccountData = () => {
      // Priority 1: Use Redux store data if available
      if (employer) {
        console.log("Using employer data from Redux store");
        const updatedData: EmployerUser = {
          id: employer.id || "",
          role: employer.role || "employer",
          dateJoined: employer.dateJoined || new Date().toISOString(),
          organizationName: employer.organizationName || "Your Company",
          firstName: employer.firstName || "",
          lastName: employer.lastName || "",
          username: employer.username || "Admin User",
          email: employer.email || "admin@example.com",
          phone: employer.phone || "",
          company: employer.company || {
            id: "",
            createdAt: "",
            companySize: 0,
          },
        };
        
        setAccountData(updatedData);
        // Update localStorage with fresh data
        localStorage.setItem("employerAccountData", JSON.stringify(updatedData));
        return;
      }
      
      // Priority 2: Try localStorage
      const stored = localStorage.getItem("employerAccountData");
      if (stored) {
        try {
          console.log("Using employer data from localStorage");
          const parsedData = JSON.parse(stored);
          setAccountData(parsedData);
        } catch (error) {
          console.warn("Failed to parse localStorage data:", error);
          // Continue to default fallback
        }
      }
      
      // Priority 3: Default fallback values
      if (!accountData) {
        console.log("Using default employer data");
        const defaultData: EmployerUser = {
          id: "",
          role: "employer",
          dateJoined: new Date().toISOString(),
          organizationName: "Your Company",
          firstName: "",
          lastName: "",
          username: "Admin User",
          email: "admin@example.com",
          phone: "",
          company: {
            id: "",
            createdAt: "",
            companySize: 0,
          },
        };
        setAccountData(defaultData);
      }
    };
    
    initializeAccountData();
  }, [employer]);

  // Fetch employer data from backend on component mount
  useEffect(() => {
    if (!employer && !isLoading) {
      console.log("Fetching employer data from backend...");
      dispatch(fetchCurrentEmployer());
    }
  }, [dispatch, employer, isLoading]);

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

  const handleSaveChanges = () => {
    if (accountData) {
      console.log("Saving changes:", { accountData, notificationSettings, privacySettings });
      alert("Settings saved successfully!");
    }
  };

  const renderSection = () => {
    if (!accountData) {
      return <div>Loading account data...</div>;
    }
    
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

  if (!accountData) {
    return (
      <Layout title="Settings">
        <div className="container-fluid py-4 px-3">
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "400px" }}>
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
            
            {/* Save Changes Button and Logout Button */}
            <div className="mt-4 d-flex justify-content-end gap-3">
              <button
                onClick={handleSaveChanges}
                className="btn d-flex align-items-center gap-2"
                style={{fontFamily:'body', backgroundColor:'#22C55E', color:'white'}}>
                <Save size={18} />
                Save Changes
              </button>
              
              <LogoutButton
                className="d-flex align-items-center gap-2"
                style={{fontFamily:'body', backgroundColor:'#FFFFFFFF', color:'grey', border: 'none'}}>
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
// import { useState } from "react";
// import Layout from "../../components/employercomponents/shared/Layout";
// import SettingsNavigation from "../../components/employercomponents/employersettings/SettingsNavigation";
// import AccountSection from "../../components/employercomponents/employersettings/AccountSection";
// import NotificationsSection from "../../components/employercomponents/employersettings/NotificationSettings";
// import PrivacySection from "../../components/employercomponents/employersettings/PrivacySection";
// import { Save, LogOut } from "lucide-react";
// import { EmployerUser } from "@/types/employer";

// const EmployerAccountProfile = () => {
//   const [activeSection, setActiveSection] = useState("account");
//   const [accountData, setAccountData] = useState<EmployerUser>({
//     id: "",
//     role: "employer",
//     dateJoined: new Date().toISOString(),
//     organizationName: "Acme Corporation",
//     firstName: "",
//     lastName: "",
//     username: "Admin User",
//     email: "admin@example.com",
//     phone: "",
//   });

//   const [notificationSettings, setNotificationSettings] = useState({
//     emailNotifications: true,
//     weeklyReports: true,
//     browserNotifications: false,
//     reportGeneration: true,
//   });

//   const [privacySettings, setPrivacySettings] = useState({
//     anonymizeData: true,
//     enhancedPrivacy: false,
//     dataRetentionPeriod: 90,
//   });

//   const handleSaveChanges = () => {
//     console.log("Saving changes:", { accountData, notificationSettings, privacySettings });
//     alert("Settings saved successfully!");
//   };

//   const handleLogoutChanges = () => {
//     // 1. Log the action for debugging purposes
//     console.log("User attempting to log out.");
//     localStorage.removeItem('userToken');
//     sessionStorage.removeItem('userData');
    
    
//     alert("You have been successfully logged out.");
//     window.location.href = '/login'; 
// };

// // const handleLogoutChanges = async () => {
// //     try {
// //         // Log out the user by making a POST request to the server API
// //         console.log("Attempting to log out...");
        
// //         // 
// //         const response = await fetch('/api/logout', { 
// //             method: 'POST',
// //             // Include headers if your API requires them (e.g., for CSRF tokens or content type)
// //             // headers: {
// //             //     'Content-Type': 'application/json',
// //             //     'Authorization': `Bearer ${userToken}` 
// //             // }
// //         });

// //         if (response.ok) {
// //             // Handle successful logout on the client side
// //             console.log("Logout successful on server.");
            
// //             // Clear any local user session data (e.g., tokens, user info)
// //             // Example: localStorage.removeItem('userToken');
// //             // Example: dispatch(clearUserSession()); // If using a state management library
            
// //             // Redirect the user to the login page or home page
// //             alert("You have been successfully logged out.");
// //             // Example: window.location.href = '/login'; 

// //         } else {
// //             // Handle server-side errors (e.g., 401 Unauthorized, 500 Internal Server Error)
// //             console.error("Logout failed with status:", response.status);
// //             const errorData = await response.json(); // Attempt to read error message from body
// //             alert(`Logout failed: ${errorData.message || response.statusText}`);
// //         }
// //     } catch (error) {
// //         // Handle network errors (e.g., server is down, no internet connection)
// //         console.error("Network or fetch error during logout:", error);
// //         alert("An unexpected error occurred during logout. Please try again.");
// //     }
// // };
//   const renderSection = () => {
//     switch (activeSection) {
//       case "account":
//         return (
//           <AccountSection 
//             accountData={accountData} 
//             onAccountDataChange={setAccountData} 
//           />
//         );
//       case "notifications":
//         return (
//           <NotificationsSection 
//             notificationSettings={notificationSettings}
//             onNotificationSettingsChange={setNotificationSettings}
//           />
//         );
//       case "privacy":
//         return (
//           <PrivacySection 
//             privacySettings={privacySettings}
//             onPrivacySettingsChange={setPrivacySettings}
//           />
//         );
//       default:
//         return (
//           <AccountSection 
//             accountData={accountData} 
//             onAccountDataChange={setAccountData}  
//           />
//         );
//     }
//   };

//   return (
//     <Layout title="Settings">
//       <div className="container-fluid py-4 px-3">
//         {/* Navigation Bar */}
//         <div className="row mb-4">
//           <div className="col-12">
//             <SettingsNavigation 
//               activeSection={activeSection} 
//               onSectionChange={setActiveSection} 
//             />
//           </div>
//         </div>

//         {/* Settings Content */}
//         <div className="row">
//           <div className="col-12 col-md-8 col-lg-10 mx-auto">
//             {renderSection()}
            
//             {/* Save Changes Button */}
//             <div className="mt-4 d-flex justify-content-end gap-3">
//               <button
//                 onClick={handleSaveChanges}
//                 className="btn  d-flex align-items-center gap-2"
//                 style={{fontFamily:'body', backgroundColor:'#22C55E', color:'white'}}
//               >
//                 <Save size={18} />
//                 Save Changes
//               </button>
//               <button
//                 onClick={handleLogoutChanges}
//                 className="btn  d-flex align-items-center gap-2"
//                  style={{fontFamily:'body', backgroundColor:'$red-300'}}
//               >
//                 <LogOut size={18} />
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default EmployerAccountProfile;
