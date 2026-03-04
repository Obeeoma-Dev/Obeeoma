import React, { useState, useEffect } from "react";
import { LOGO_UPLOAD_URL, LOGO_FETCH_URL } from "../../../api/apiConfig";
import {
  Building,
  User,
  Mail,
  Users,
  Edit,
  Calendar,
  Globe,
  FileText,
  Lock,
} from "lucide-react";
import { Link } from "react-router-dom";
import { EmployerUser } from "../../../types/employer";

interface AccountSectionProps {
  accountData: EmployerUser;
}

const AccountSection: React.FC<AccountSectionProps> = React.memo(
  ({ accountData }) => {
    // Logo API endpoints are imported from apiConfig.ts

    // Upload logo to backend and save URL
    const uploadLogoToBackend = async (file: File) => {
      const formData = new FormData();
      formData.append("logo", file);
      try {
        const response = await fetch(LOGO_UPLOAD_URL, {
          method: "POST",
          body: formData,
          // Add headers if needed (e.g., auth)
        });
        if (!response.ok) throw new Error("Failed to upload logo");
        const data = await response.json();
        // Expect backend to return { logoUrl: string }
        if (data.logoUrl) {
          setProfileImage(data.logoUrl);
          localStorage.setItem("companyProfileImage", data.logoUrl);
        }
      } catch (err) {
        console.error("Logo upload error:", err);
      }
    };
    const [localData, setLocalData] = useState<EmployerUser>(accountData);
    const [profileImage, setProfileImage] = useState<string | null>(null);

    // Handle logo upload
    const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        // Upload to backend and save URL
        await uploadLogoToBackend(file);
      }
    };

    // Load data from localStorage on component mount
    useEffect(() => {
      const fetchLogoFromBackend = async () => {
        try {
          const response = await fetch(LOGO_FETCH_URL, {
            method: "GET",
            // Add headers if needed (e.g., auth)
          });
          if (!response.ok) throw new Error("Failed to fetch logo");
          const data = await response.json();
          if (data.logoUrl) {
            setProfileImage(data.logoUrl);
            localStorage.setItem("companyProfileImage", data.logoUrl);
          }
        } catch {
          // fallback to localStorage
          const storedProfileImage =
            localStorage.getItem("companyProfileImage") || "";
          setProfileImage(storedProfileImage);
        }
      };

      const storedOrgName = localStorage.getItem("organizationName");
      const storedUsername = localStorage.getItem("username");
      const storedEmail = localStorage.getItem("email");
      const storedTimeZone =
        localStorage.getItem("timeZone") ||
        "UTC-05:00 West African Time (Nigeria & Gh)";
      const storedLanguage = localStorage.getItem("language") || "English";
      const storedDateFormat =
        localStorage.getItem("dateFormat") || "MM/DD/YYYY";

      const updatedData: EmployerUser = {
        ...accountData,
        organizationName: storedOrgName || accountData.organizationName || "",
        username: storedUsername || accountData.username || "",
        email: storedEmail || accountData.email || "",
        company: {
          ...accountData.company,
          id: accountData.company?.id ?? "",
          createdAt: accountData.company?.createdAt ?? "",
        },
        timeZone: storedTimeZone,
        language: storedLanguage,
        dateFormat: storedDateFormat,
      };

      setLocalData(updatedData);
      fetchLogoFromBackend();
    }, [accountData]);

    // Format display value
    const formatDisplayValue = (value: string | undefined) => {
      return value || "Not set";
    };

    return (
      <div className="card border-0 shadow-sm">
        <div className="card-body p-2">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="h5 fw-semibold mb-0" id="account-info-heading">
              Company Account
            </h3>
            <Link
              to="/edit-profile"
              className="btn"
              style={{ color: "#22C55E" }}
            >
              <Edit size={16} className="me-2" />
              Edit Profile
            </Link>
          </div>

          {/* Profile Header with Logo and Upload */}
          <div className="d-flex align-items-center mb-5 pb-3 border-bottom">
            <div className="position-relative me-4">
              <div
                className="rounded-circle overflow-hidden border"
                style={{ width: "100px", height: "100px" }}
              >
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Company Logo"
                    className="w-100 h-100 object-fit-cover"
                  />
                ) : (
                  <div className="w-100 h-100 bg-light d-flex align-items-center justify-content-center">
                    <Building size={40} className="text-muted" />
                  </div>
                )}
              </div>
              {/* Logo Upload Button */}
              {/* <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                style={{
                  position: "absolute",
                  bottom: "-30px",
                  left: 0,
                  width: "100px",
                  opacity: 0,
                  cursor: "pointer",
                  height: "30px",
                }}
                title="Upload company logo"
              /> */}
              {/* <label
                htmlFor="logo-upload"
                style={{
                  position: "absolute",
                  bottom: "-30px",
                  left: 0,
                  width: "100px",
                  textAlign: "center",
                  fontSize: "0.8rem",
                  color: "#22C55E",
                  cursor: "pointer",
                }}
              >
                Upload Logo
              </label> */}
            </div>
            <div>
              <p className="text-muted mb-0">
                <Mail size={14} className="me-2" />
                {localData.email || "contact@company.com"}
              </p>
            </div>
          </div>

          <div className="row g-4">
            {/* Company Information Section */}
            <div className="col-12">
              <h5 className="h6 fw-semibold text-muted mb-3">ADMIN ACCOUNT
              </h5>

            {/* Admin Account Section */}
            <div className="col-12">
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <div className="bg-light rounded p-3 h-100">
                    <div className="d-flex align-items-center mb-2">
                      <User
                        size={16}
                        className="me-2"
                        style={{ color: "#22C55E" }}
                      />
                      <span className="small text-muted">Admin User</span>
                    </div>
                    <p className="fw-medium mb-0">
                      {formatDisplayValue(localData.username)}
                    </p>
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <div className="bg-light rounded p-3 h-100">
                    <div className="d-flex align-items-center mb-2 justify-content-between">
                      <Lock
                        size={16}
                        className="me-2"
                        style={{ color: "#22C55E" }}
                      />
                      <Link
                        to="/change-password"
                        className="text-decoration-none small"
                        style={{ color: "#22C55E" }}
                      >
                        Change Password
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Preferences Section */}
            <div className="col-12">
              <h5 className="h6 fw-semibold text-muted mb-3">PREFERENCES</h5>

              <div className="row g-3">
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="bg-light rounded p-3 h-100">
                    <div className="d-flex align-items-center mb-2">
                      <Globe
                        size={16}
                        className="me-2"
                        style={{ color: "#22C55E" }}
                      />
                      <span className="small text-muted">Time Zone</span>
                    </div>
                    <p className="fw-medium mb-0">
                      {formatDisplayValue(localData.timeZone)}
                    </p>
                  </div>
                </div>

                <div className="col-12 col-md-6 col-lg-4">
                  <div className="bg-light rounded p-3 h-100">
                    <div className="d-flex align-items-center mb-2">
                      <FileText
                        size={16}
                        className="me-2"
                        style={{ color: "#22C55E" }}
                      />
                      <span className="small text-muted">Language</span>
                    </div>
                    <p className="fw-medium mb-0">
                      {formatDisplayValue(localData.language)}
                    </p>
                  </div>
                </div>

                <div className="col-12 col-md-6 col-lg-4">
                  <div className="bg-light rounded p-3 h-100">
                    <div className="d-flex align-items-center mb-2">
                      <Calendar
                        size={16}
                        className="me-2"
                        style={{ color: "#22C55E" }}
                      />
                      <span className="small text-muted">Date Format</span>
                    </div>
                    <p className="fw-medium mb-0">
                      {formatDisplayValue(localData.dateFormat)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="col-12 mt-4">
              <div className="border-top pt-4">
                <h5 className="h6 fw-semibold text-muted mb-3">
                  QUICK ACTIONS
                </h5>
                <div className="d-flex gap-3">
                  {/* <Link to="edit-profile" className="btn btn-outline-success">
                  <Edit size={16} className="me-2" />
                  Edit Profile Information
                </Link> */}
                  <Link
                    to="/change-password"
                    className="btn btn-outline-secondary"
                  >
                    Change Password
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  },
);

export default AccountSection;
