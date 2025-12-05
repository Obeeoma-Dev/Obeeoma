// src/pages/EmployerAccountProfile.tsx or similar path

import { useState } from "react";
import Layout from "../../components/employercomponents/shared/Layout";
import SettingsNavigation from "../../components/employercomponents/employersettings/SettingsNavigation";
import AccountSection from "../../components/employercomponents/employersettings/AccountSection";
import NotificationsSection from "../../components/employercomponents/employersettings/NotificationSettings";
import PrivacySection from "../../components/employercomponents/employersettings/PrivacySection";
import { Save, LogOut } from "lucide-react";
import { EmployerUser } from "@/types/employer";


import LogoutButton from "../../components/authenticationComponents/Logout"; 

const EmployerAccountProfile = () => {
  const [activeSection, setActiveSection] = useState("account");
  const [accountData, setAccountData] = useState<EmployerUser>({
    id: "",
    role: "employer",
    dateJoined: new Date().toISOString(),
    organizationName: " ",
    firstName: "",
    lastName: "",
    username: "Admin User",
    email: "admin@example.com",
    phone: "",
  });

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
    console.log("Saving changes:", { accountData, notificationSettings, privacySettings });
    alert("Settings saved successfully!");
  };

  const renderSection = () => {
    switch (activeSection) {
      case "account":
        return (
          <AccountSection 
            accountData={accountData} 
          />
        );
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
        return (
          <AccountSection 
            accountData={accountData} 
          />
        );
    }
  };

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
          {/* removed  col-md-8 col-lg-10 to keep card for settings at full widths */}
          <div className="col-12 mx-auto">
            {renderSection()}
            
            {/* Save Changes Button and Logout Button */}
            <div className="mt-4 d-flex justify-content-end gap-3">
              {/* Save Changes Button (Unchanged) */}
              <button
                onClick={handleSaveChanges}
                className="btn d-flex align-items-center gap-2"
                style={{fontFamily:'body', backgroundColor:'#22C55E', color:'white'}}>
                <Save size={18} />
                Save Changes
              </button>
              
              {/*: Using the Redux-connected LogoutButton */}
              <LogoutButton
                // Pass Bootstrap classes as a prop
                className="d-flex align-items-center gap-2" 
                // Pass custom styles as a prop
                style={{fontFamily:'body', backgroundColor:'#22C55E', color:'grey'}}>
                {/* Pass the icon and text as children */}
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
