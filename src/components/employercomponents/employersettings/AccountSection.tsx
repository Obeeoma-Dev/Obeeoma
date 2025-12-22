import React, { useState, useEffect } from 'react';
import { LOGO_UPLOAD_URL, LOGO_FETCH_URL } from '../../../api/apiConfig';
import { Building, User, Mail, Users, Edit, Calendar, Globe, FileText, Lock } from "lucide-react";
import { Link } from 'react-router-dom';
import { EmployerUser } from '../../../types/employer';

interface AccountSectionProps {
  accountData: EmployerUser;
}
const COMPANY_SIZES = [
  '1-10 employees',
  '11-50 employees',
  '51-200 employees',
  '201-500 employees',
  '501-1000 employees',
  '1000+ employees'
];
const storedCompanySize = localStorage.getItem('companySize') || '';  
const companySizeIndex = COMPANY_SIZES.indexOf(storedCompanySize);

const AccountSection: React.FC<AccountSectionProps> = React.memo(({ accountData }) => {
    // Logo API endpoints are imported from apiConfig.ts

    // Upload logo to backend and save URL
    const uploadLogoToBackend = async (file: File) => {
      const formData = new FormData();
      formData.append('logo', file);
      try {
        const response = await fetch(LOGO_UPLOAD_URL, {
          method: 'POST',
          body: formData,
          // Add headers if needed (e.g., auth)
        });
        if (!response.ok) throw new Error('Failed to upload logo');
        const data = await response.json();
        // Expect backend to return { logoUrl: string }
        if (data.logoUrl) {
          setProfileImage(data.logoUrl);
          localStorage.setItem('companyProfileImage', data.logoUrl);
        }
      } catch (err) {
        console.error('Logo upload error:', err);
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
          method: 'GET',
          // Add headers if needed (e.g., auth)
        });
        if (!response.ok) throw new Error('Failed to fetch logo');
        const data = await response.json();
        if (data.logoUrl) {
          setProfileImage(data.logoUrl);
          localStorage.setItem('companyProfileImage', data.logoUrl);
        }
      } catch  {
        // fallback to localStorage
        const storedProfileImage = localStorage.getItem('companyProfileImage') || '';
        setProfileImage(storedProfileImage);
      }
    };

    const storedOrgName = localStorage.getItem('organizationName') || '';
    const storedUsername = localStorage.getItem('username') || '';
    const storedEmail = localStorage.getItem('email') || '';
    const storedTimeZone = localStorage.getItem('timeZone') || 'UTC-05:00 Eastern Time (US & Canada)';
    const storedLanguage = localStorage.getItem('language') || 'English';
    const storedDateFormat = localStorage.getItem('dateFormat') || 'MM/DD/YYYY';

    const updatedData: EmployerUser = {
      ...accountData,
      organizationName: storedOrgName,
      username: storedUsername || accountData.username,
      email: storedEmail || accountData.email,
      company: {
        ...accountData.company,
        id: accountData.company?.id ?? '',
        createdAt: accountData.company?.createdAt ?? '',
        companySize: companySizeIndex > -1 ? companySizeIndex : (accountData.company?.companySize ?? 0),
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
    return value || 'Not set';
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body p-2">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="h5 fw-semibold mb-0" id="account-info-heading">Company Account</h3>
          <Link to="/edit-profile" className="btn" style={{color:'#22C55E'}}>
            <Edit size={16} className="me-2" />
            Edit Profile
          </Link>
        </div>
        
        {/* Profile Header with Logo and Upload */}
        <div className="d-flex align-items-center mb-5 pb-3 border-bottom">
          <div className="position-relative me-4">
            <div className="rounded-circle overflow-hidden border" style={{ width: '100px', height: '100px' }}>
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
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              style={{ position: 'absolute', bottom: '-30px', left: 0, width: '100px', opacity: 0, cursor: 'pointer', height: '30px' }}
              title="Upload company logo"
            />
            <label htmlFor="logo-upload" style={{ position: 'absolute', bottom: '-30px', left: 0, width: '100px', textAlign: 'center', fontSize: '0.8rem', color: '#22C55E', cursor: 'pointer' }}>
              Upload Logo
            </label>
          </div>
          <div>
            <h4 className="h3 fw-bold text-dark mb-2">{localData.organizationName || 'Your Company'}</h4>
            <p className="text-muted mb-1">
              <User size={14} className="me-2" />
              {localData.username || 'Admin User'}
            </p>
            <p className="text-muted mb-0">
              <Mail size={14} className="me-2" />
              {localData.email || 'contact@company.com'}
            </p>
          </div>
        </div>
        
        <div className="row g-4">
          {/* Company Information Section */}
          <div className="col-12">
            <h5 className="h6 fw-semibold text-muted mb-3">COMPANY INFORMATION</h5>
            
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <div className="bg-light rounded p-3 h-100">
                  <div className="d-flex align-items-center mb-2">
                    <Building size={16} className="text-success me-2" />
                    <span className="small text-muted">Organization Name</span>
                  </div>
                  <p className="fw-medium mb-0">{formatDisplayValue(localData.organizationName)}</p>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="bg-light rounded p-3 h-100">
                  <div className="d-flex align-items-center mb-2">
                    <Users size={16} className=" me-2" style={{color:'#22C55E'}}/>
                    <span className="small text-muted">Company Size</span>
                  </div>
                  <p className="fw-medium mb-0">{formatDisplayValue(localData.company?.companySize.toString() )}</p>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="bg-light rounded p-3 h-100">
                  <div className="d-flex align-items-center mb-2">
                    <Mail size={16} className=" me-2" style={{color:'#22C55E'}} />
                    <span className="small text-muted">Email Address</span>
                  </div>
                  <p className="fw-medium mb-0">{formatDisplayValue(localData.email)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Admin Account Section */}
          <div className="col-12">
            <h5 className="h6 fw-semibold text-muted mb-3">ADMIN ACCOUNT</h5>
            
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <div className="bg-light rounded p-3 h-100">
                  <div className="d-flex align-items-center mb-2">
                    <User size={16} className="me-2" style={{color:'#22C55E'}} />
                    <span className="small text-muted">Admin User</span>
                  </div>
                  <p className="fw-medium mb-0">{formatDisplayValue(localData.username)}</p>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="bg-light rounded p-3 h-100">
                  <div className="d-flex align-items-center mb-2 justify-content-between">
                    <Lock size={16} className="text-success me-2" />
                    <Link to="/change-password" className="text-success text-decoration-none small">
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
                    <Globe size={16} className="text-success me-2" />
                    <span className="small text-muted">Time Zone</span>
                  </div>
                  <p className="fw-medium mb-0">{formatDisplayValue(localData.timeZone)}</p>
                </div>
              </div>

              <div className="col-12 col-md-6 col-lg-4">
                <div className="bg-light rounded p-3 h-100">
                  <div className="d-flex align-items-center mb-2">
                    <FileText size={16} className="text-success me-2" />
                    <span className="small text-muted">Language</span>
                  </div>
                  <p className="fw-medium mb-0">{formatDisplayValue(localData.language)}</p>
                </div>
              </div>

              <div className="col-12 col-md-6 col-lg-4">
                <div className="bg-light rounded p-3 h-100">
                  <div className="d-flex align-items-center mb-2">
                    <Calendar size={16} className="text-success me-2" />
                    <span className="small text-muted">Date Format</span>
                  </div>
                  <p className="fw-medium mb-0">{formatDisplayValue(localData.dateFormat)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="col-12 mt-4">
            <div className="border-top pt-4">
              <h5 className="h6 fw-semibold text-muted mb-3">QUICK ACTIONS</h5>
              <div className="d-flex gap-3">
                
                {/* <Link to="edit-profile" className="btn btn-outline-success">
                  <Edit size={16} className="me-2" />
                  Edit Profile Information
                </Link> */}
                <Link to="/change-password" className="btn btn-outline-secondary">
                  Change Password
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default AccountSection;

// import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import { Building, User, Mail} from "lucide-react";
// import { Link } from 'react-router-dom';
// import { EmployerUser } from '../../../types/employer';

// interface AccountSectionProps {
//   accountData: EmployerUser;
//   onAccountDataChange: (data: EmployerUser) => void;
// }

// type ValidationErrors = Partial<Record<keyof EmployerUser, string>>;

// const TIME_ZONES = [
//   'UTC-05:00 Eastern Time (US & Canada)',
//   'UTC-08:00 Pacific Time (US & Canada)',
//   'UTC+00:00 Greenwich Mean Time',
//   'UTC+01:00 Central European Time',
// ];

// const LANGUAGES = ['English', 'Spanish', 'French', 'German'];

// const DATE_FORMATS = ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD'];

// const AccountSection: React.FC<AccountSectionProps> = React.memo(({ accountData, onAccountDataChange }) => {
//   const [localData, setLocalData] = useState<EmployerUser>(accountData);
//   const [errors, setErrors] = useState<ValidationErrors>({});

//   // Load data from localStorage on component mount
//   useEffect(() => {
//     const storedOrgName = localStorage.getItem('organizationName') || '';
//     const storedUsername = localStorage.getItem('username') || '';
//     const storedEmail = localStorage.getItem('email') || '';
//     const updatedData: EmployerUser = {
//       ...accountData,
//       organizationName: storedOrgName,
//       username: storedUsername,
//       email: storedEmail,
//     };
//     setLocalData(updatedData);
//     onAccountDataChange(updatedData);
//   }, [accountData, onAccountDataChange]);

//   const handleInputChange = useCallback((field: keyof EmployerUser, value: string) => {
//     const updatedData = { ...localData, [field]: value };
//     setLocalData(updatedData);
//     onAccountDataChange(updatedData);
//     // Clear error for the field being edited
//     if (errors[field as keyof ValidationErrors]) {
//       setErrors(prev => ({ ...prev, [field]: undefined }));
//     }
//   }, [localData, onAccountDataChange, errors]);

//   const validateField = useCallback((field: keyof EmployerUser, value: string) => {
//     const newErrors: ValidationErrors = { ...errors };
//     if (field === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
//       newErrors.email = 'Please enter a valid email address.';
//     } else if (field === 'organizationName' && !value.trim()) {
//       newErrors.organizationName = 'Organization name is required.';
//     } else if (field === 'username' && !value.trim()) {
//       newErrors.username = 'Username is required.';
//     } else {
//       delete newErrors[field];
//     }
//     setErrors(newErrors);
//   }, [errors]);

//   const handleBlur = useCallback((field: keyof EmployerUser) => {
//     validateField(field, localData[field] as string);
//   }, [validateField, localData]);

//   const timeZoneOptions = useMemo(() => TIME_ZONES.map(tz => <option key={tz}>{tz}</option>), []);
//   const languageOptions = useMemo(() => LANGUAGES.map(lang => <option key={lang}>{lang}</option>), []);
//   const dateFormatOptions = useMemo(() => DATE_FORMATS.map(format => <option key={format}>{format}</option>), []);

//   return (
//     <div className="card border-0 shadow-sm">
//       <div className="card-body p-4">
//         <h3 className="h5 fw-semibold mb-4" id="account-info-heading">Account Information</h3>
        
//         <div className="row g-3">
//           <div className="col-12 col-md-6">
//             <label htmlFor="organization-name" className="form-label fw-medium">Organization Name</label>
//             <div className="position-relative">
//               <Building
//                 size={16}
//                 className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
//                 aria-hidden="true"
//               />
//               <input
//                 id="organization-name"
//                 type="text"
//                 className={`form-control ps-5 ${errors.organizationName ? 'is-invalid' : ''}`}
//                 value={localData.organizationName}
//                 onChange={(e) => handleInputChange('organizationName', e.target.value)}
//                 onBlur={() => handleBlur('organizationName')}
//                 style={{ borderRadius: "8px" }}
//                 aria-describedby={errors.organizationName ? "org-name-error" : undefined}
//                 required
//               />
//               {errors.organizationName && <div id="org-name-error" className="invalid-feedback">{errors.organizationName}</div>}
//             </div>
//           </div>

//           <div className="col-12 col-md-6">
//             <label htmlFor="username" className="form-label fw-medium">{localData.username || 'Admin User'}</label>
//             <div className="position-relative">
//               <User
//                 size={16}
//                 className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
//                 aria-hidden="true"
//               />
//               <input
//                 id="username"
//                 type="text"
//                 className={`form-control ps-5 ${errors.username ? 'is-invalid' : ''}`}
//                 value={localData.username}
//                 onChange={(e) => handleInputChange('username', e.target.value)}
//                 onBlur={() => handleBlur('username')}
//                 style={{ borderRadius: "8px" }}
//                 aria-describedby={errors.username ? "username-error" : undefined}
//                 required
//               />
//               {errors.username && <div id="username-error" className="invalid-feedback">{errors.username}</div>}
//             </div>
//           </div>

//           <div className="col-12 col-md-6">
//             <label htmlFor="email" className="form-label fw-medium">Email Address</label>
//             <div className="position-relative">
//               <Mail
//                 size={16}
//                 className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
//                 aria-hidden="true"
//               />
//               <input
//                 id="email"
//                 type="email"
//                 className={`form-control ps-5 ${errors.email ? 'is-invalid' : ''}`}
//                 value={localData.email}
//                 onChange={(e) => handleInputChange('email', e.target.value)}
//                 onBlur={() => handleBlur('email')}
//                 style={{ borderRadius: "8px" }}
//                 aria-describedby={errors.email ? "email-error" : undefined}
//                 required
//               />
//               {errors.email && <div id="email-error" className="invalid-feedback">{errors.email}</div>}
//             </div>
//           </div>

//           <div className="col-12 col-md-6">
//             <label className="form-label fw-medium">Password</label>
//             <div className="position-relative">
//               <div className="form-text text-muted mt-1">
//                 <Link to="reset-password" className="text-success text-decoration-none">Use OTP to change your password</Link>
//               </div>
//             </div>
//           </div>

//           <div className="col-12">
//             <div className="border-top pt-3 mt-2">
//               <h4 className="h6 fw-semibold mb-3" id="additional-settings-heading">Additional Settings</h4>
              
//               <div className="row g-3">
//                 <div className="col-12 col-md-6">
//                   <label htmlFor="time-zone" className="form-label fw-medium">Time Zone</label>
//                   <select id="time-zone" className="form-select" style={{ borderRadius: "8px" }}>
//                     {timeZoneOptions}
//                   </select>
//                 </div>

//                 <div className="col-12 col-md-6">
//                   <label htmlFor="language" className="form-label fw-medium">Language</label>
//                   <select id="language" className="form-select" style={{ borderRadius: "8px" }}>
//                     {languageOptions}
//                   </select>
//                 </div>

//                 <div className="col-12 col-md-6">
//                   <label htmlFor="date-format" className="form-label fw-medium">Date Format</label>
//                   <select id="date-format" className="form-select" style={{ borderRadius: "8px" }}>
//                     {dateFormatOptions}
//                   </select>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// });

// export default AccountSection;
