import React, { useState } from "react";
import Layout from "../../components/employercomponents/shared/Layout";
import EditProfileSection from "../../components/employercomponents/employersettings/EditProfileSection";
import { EmployerUser } from "../../types/employer";

const EditEmployerProfilePage: React.FC = () => {
  const [accountData, setAccountData] = useState<EmployerUser>({
    id: "",
    role: "employer",
    dateJoined: new Date().toISOString(),
    organizationName: "",
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    company: {
      id: "",
      companySize: 0,
      createdAt: new Date().toISOString(),
    },
    timeZone: "UTC-05:00 Eastern Time (US & Canada)",
    language: "English",
    dateFormat: "MM/DD/YYYY",
  });

  const handleSave = (data: EmployerUser) => {
    setAccountData(data);
    // Here you can add logic to save to backend or Redux store
    console.log("Saving profile data:", data);
  };

  return (
    <Layout title="Edit Profile">
      <div className="container-fluid py-4 px-3">
        <EditProfileSection accountData={accountData} onSave={handleSave} />
      </div>
    </Layout>
  );
};

export default EditEmployerProfilePage;
