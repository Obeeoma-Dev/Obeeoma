import React, { useState, useEffect, useCallback } from "react";
import {
  Building,
  User,
  Mail,
  Users,
  Contact,
  Globe,
  FileText,
  Calendar,
  ArrowLeft,
  Upload,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { EmployerUser } from "../../../types/employer";

interface EditProfileSectionProps {
  accountData: EmployerUser;
  onSave: (data: EmployerUser) => void;
}

type ValidationErrors = Partial<Record<keyof EmployerUser, string>>;

const TIME_ZONES = [
  "UTC-01:00 Cape Verde Time (CVT)",
  "UTC+00:00 Greenwich Mean Time (GMT)",
  "UTC+01:00 West Africa Time (WAT)",
  "UTC+02:00 Central Africa Time (CAT)",
  "UTC+03:00 East Africa Time (EAT)",
  "UTC+04:00 Seychelles/Mauritius Time (SCT/MUT)",
];

const LANGUAGES = ["English", "Spanish", "French", "German"];

const DATE_FORMATS = ["MM/DD/YYYY", "DD/MM/YYYY", "YYYY-MM-DD"];

const COMPANY_SIZES = [
  "1-10 employees",
  "11-50 employees",
  "51-200 employees",
  "201-500 employees",
  "501-1000 employees",
  "1000+ employees",
];

const EditProfileSection: React.FC<EditProfileSectionProps> = ({
  accountData,
  onSave,
}) => {
  const navigate = useNavigate();
  const [localData, setLocalData] = useState<EmployerUser>(accountData);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedOrgName = localStorage.getItem("organizationName");
    const storedUsername = localStorage.getItem("username");
    const storedEmail = localStorage.getItem("email");
    const storedCompanySize = localStorage.getItem("companySize") || "";
    const storedProfileImage =
      localStorage.getItem("companyProfileImage") || "";
    const storedTimeZone =
      localStorage.getItem("timeZone") ||
      "UTC-05:00 Eastern Time (US & Canada)";
    const storedLanguage = localStorage.getItem("language") || "English";
    const storedDateFormat = localStorage.getItem("dateFormat") || "MM/DD/YYYY";

    const companySizeIndex = COMPANY_SIZES.indexOf(storedCompanySize);

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
    setProfileImage(storedProfileImage);
  }, [accountData]);

  const handleInputChange = useCallback(
    (field: keyof EmployerUser | "companySize", value: string) => {
      if (field === "companySize") {
        const index = COMPANY_SIZES.indexOf(value);
        if (index > -1) {
          setLocalData((prev) => ({
            ...prev,
            company: {
              ...prev.company!,
              companySize: index,
            },
          }));
        }
      } else {
        setLocalData((prev) => ({
          ...prev,
          [field as keyof EmployerUser]: value,
        }));
      }

      // Clear error for the field being edited
      if (errors[field as keyof ValidationErrors]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    },
    [errors],
  );

  const handleImageUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        alert("File size should be less than 5MB");
        return;
      }

      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setProfileImage(imageUrl);
        setIsUploading(false);
      };
      reader.onerror = () => {
        alert("Error uploading image");
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    },
    [],
  );

  const removeProfileImage = useCallback(() => {
    setProfileImage(null);
    localStorage.removeItem("companyProfileImage");
  }, []);

  const validateForm = useCallback(() => {
    const newErrors: ValidationErrors = {};

    if (!localData.organizationName?.trim()) {
      newErrors.organizationName = "Organization name is required.";
    }

    if (!localData.username?.trim()) {
      newErrors.username = "Username is required.";
    }

    if (!localData.email?.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(localData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!localData.contactPerson?.trim()) {
      newErrors.contactPerson = "Contact person is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [localData]);

  const handleSave = useCallback(() => {
    if (!validateForm()) return;

    // Save to localStorage
    localStorage.setItem("organizationName", localData.organizationName || "");
    localStorage.setItem("username", localData.username || "");
    localStorage.setItem("email", localData.email || "");
    localStorage.setItem("contactPerson", localData.contactPerson || "");
    localStorage.setItem("timeZone", localData.timeZone || "");
    localStorage.setItem("language", localData.language || "");
    localStorage.setItem("dateFormat", localData.dateFormat || "");

    if (profileImage) {
      localStorage.setItem("companyProfileImage", profileImage);
    }

    onSave(localData);
    navigate(-1); // Go back to account page
  }, [localData, profileImage, validateForm, onSave, navigate]);

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body p-4">
        <div className="d-flex align-items-center mb-4">
          <Link
            to="/employer-settings"
            className="btn btn-outline-secondary me-3"
          >
            <ArrowLeft size={16} />
          </Link>
          <h3 className="h5 fw-semibold mb-0">Edit Company Profile</h3>
        </div>

        {/* Profile Image Upload */}
        <div className="mb-5">
          <label className="form-label fw-medium">Company Logo</label>
          <div className="d-flex align-items-center">
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
                {profileImage && (
                  <button
                    onClick={removeProfileImage}
                    className="position-absolute top-0 end-0 bg-danger text-white border-0 rounded-circle p-1"
                    style={{
                      width: "24px",
                      height: "24px",
                      transform: "translate(30%, -30%)",
                    }}
                  >
                    <X size={12} />
                  </button>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="profileImageUpload"
                className={`btn ${isUploading ? "btn-secondary" : ""}`}
                style={
                  isUploading
                    ? {}
                    : { backgroundColor: "#22C55E", color: "white" }
                }
              >
                <Upload size={16} className="me-2" />
                {isUploading ? "Uploading..." : "Upload Logo"}
              </label>
              <input
                id="profileImageUpload"
                type="file"
                accept="image/*"
                className="d-none"
                onChange={handleImageUpload}
                disabled={isUploading}
              />
              <p className="small text-muted mt-2 mb-0">
                Recommended: Square image, 400x400px or larger. Max 5MB.
              </p>
            </div>
          </div>
        </div>

        <div className="row g-3">
          {/* Company Information */}
          <div className="col-12">
            <h5 className="h6 fw-semibold mb-3">Company Information</h5>

            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label
                  htmlFor="organization-name"
                  className="form-label fw-medium"
                >
                  Organization Name *
                </label>
                <div className="position-relative">
                  <Building
                    size={16}
                    className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
                  />
                  <input
                    id="organization-name"
                    type="text"
                    className={`form-control ps-5 ${errors.organizationName ? "is-invalid" : ""}`}
                    value={localData.organizationName || ""}
                    onChange={(e) =>
                      handleInputChange("organizationName", e.target.value)
                    }
                    placeholder="Enter organization name"
                  />
                  {errors.organizationName && (
                    <div className="invalid-feedback">
                      {errors.organizationName}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-12 col-md-6">
                <label htmlFor="username" className="form-label fw-medium">
                  Admin Username *
                </label>
                <div className="position-relative">
                  <User
                    size={16}
                    className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
                  />
                  <input
                    id="username"
                    type="text"
                    className={`form-control ps-5 ${errors.username ? "is-invalid" : ""}`}
                    value={localData.username || ""}
                    onChange={(e) =>
                      handleInputChange("username", e.target.value)
                    }
                    placeholder="Enter admin username"
                  />
                  {errors.username && (
                    <div className="invalid-feedback">{errors.username}</div>
                  )}
                </div>
              </div>
              <div className="row g-3">
                <div className="col-12 col-md-6">
                <label htmlFor="email" className="form-label fw-medium">
                 Email Address *
                </label>
                <div className="position-relative">
                  <Mail
                    size={16}
                    className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
                  />
                  <input
                    id="email"
                    type="email"
                    className={`form-control ps-5 ${errors.email ? "is-invalid" : ""}`}
                    value={localData.email || ""}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter email address"
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <label
                  htmlFor="contact-person"
                  className="form-label fw-medium"
                >
                  Contact Person{" "}
                </label>
                <div className="position-relative">
                  <Contact
                    size={16}
                    className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
                  />
                  <input
                    id="contact-person"
                    type="text"
                    className={`form-control ps-5 ${errors.contactPerson ? "is-invalid" : ""}`}
                    value={localData.contactPerson || ""}
                    onChange={(e) =>
                      handleInputChange("contactPerson", e.target.value)
                    }
                    placeholder="Enter contact person name"
                  />
                  {errors.contactPerson && (
                    <div className="invalid-feedback">
                      {errors.contactPerson}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="col-12 mt-4">
            <h5 className="h6 fw-semibold mb-3">Preferences</h5>

            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label htmlFor="time-zone" className="form-label fw-medium">
                  Time Zone
                </label>
                <div className="position-relative">
                  <Globe
                    size={16}
                    className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
                  />
                  <select
                    id="time-zone"
                    className="form-select ps-5"
                    value={localData.timeZone || ""}
                    onChange={(e) =>
                      handleInputChange("timeZone", e.target.value)
                    }
                  >
                    {TIME_ZONES.map((tz) => (
                      <option key={tz} value={tz}>
                        {tz}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <label htmlFor="language" className="form-label fw-medium">
                  Language
                </label>
                <div className="position-relative">
                  <FileText
                    size={16}
                    className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
                  />
                  <select
                    id="language"
                    className="form-select ps-5"
                    value={localData.language || ""}
                    onChange={(e) =>
                      handleInputChange("language", e.target.value)
                    }
                  >
                    {LANGUAGES.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <label htmlFor="date-format" className="form-label fw-medium">
                  Date Format
                </label>
                <div className="position-relative">
                  <Calendar
                    size={16}
                    className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
                  />
                  <select
                    id="date-format"
                    className="form-select ps-5"
                    value={localData.dateFormat || ""}
                    onChange={(e) =>
                      handleInputChange("dateFormat", e.target.value)
                    }
                  >
                    {DATE_FORMATS.map((format) => (
                      <option key={format} value={format}>
                        {format}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="col-12 mt-5">
            <div className="d-flex justify-content-end gap-3 pt-4 border-top">
              <Link
                to="/employer-settings"
                className="btn btn-outline-secondary"
              >
                Cancel
              </Link>
              <button
                type="button"
                className="btn "
                style={{ backgroundColor: "#22C55E", color: "#FFFFFFFF" }}
                onClick={handleSave}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileSection;
