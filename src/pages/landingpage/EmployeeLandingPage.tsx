import React from "react";
import AppDownloadSection from "../../components/employercomponents/employerdashboard/AppDownloadSection";
// Import the images as modules. Webpack/Vite/etc. will replace these
// imports with the correct public URL paths during the build process.
// Adjust the relative paths (../../) based on where this file is located relative to src/assets/images/.
import mainAppScreenshot from "../../assets/Images/app-screenshot-employee.png";
import googlePlayBtn from "../../assets/Images/downloadgoogleplay.png";
import appStoreBtn from "../../assets/Images/downloadappstore.png";

// 1. Define the component that holds the route/page structure
const EmployeeLandingPage: React.FC = () => {
  const employeeAppDownloadProps = {
    // --- App Store Links ---
    googlePlayLink: "https://play.google.com/store/apps",
    appStoreLink: "https://apps.apple.com/app",

    // --- Image Paths (using imported variables) ---
    mainImageUrl: mainAppScreenshot,
    googlePlayButtonUrl: googlePlayBtn,
    appStoreButtonUrl: appStoreBtn,
  };

  return (
    <div className="employee-download-page">
      {/* 3. RENDER the AppDownloadSection component and PASS the data */}
      <AppDownloadSection {...employeeAppDownloadProps} />

      {/* Optional additional content for the employee page */}
      <footer className="text-center py-4 text-secondary">
        Need help? Contact HR or IT support.
      </footer>
    </div>
  );
};

export default EmployeeLandingPage;
