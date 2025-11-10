import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Building, User, Mail, Lock } from "lucide-react";
import { Link } from 'react-router-dom';
import { EmployerUser } from '../../../types/employer';

interface AccountSectionProps {
  accountData: EmployerUser;
  onAccountDataChange: (data: EmployerUser) => void;
}

interface ValidationErrors extends Partial<Record<keyof EmployerUser, string>> {}

const TIME_ZONES = [
  'UTC-05:00 Eastern Time (US & Canada)',
  'UTC-08:00 Pacific Time (US & Canada)',
  'UTC+00:00 Greenwich Mean Time',
  'UTC+01:00 Central European Time',
];

const LANGUAGES = ['English', 'Spanish', 'French', 'German'];

const DATE_FORMATS = ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD'];

const AccountSection: React.FC<AccountSectionProps> = React.memo(({ accountData, onAccountDataChange }) => {
  const [localData, setLocalData] = useState<EmployerUser>(accountData);
  const [errors, setErrors] = useState<ValidationErrors>({});

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedOrgName = localStorage.getItem('organizationName') || '';
    const storedUsername = localStorage.getItem('username') || '';
    const storedEmail = localStorage.getItem('email') || '';
    const updatedData: EmployerUser = {
      ...accountData,
      organizationName: storedOrgName,
      username: storedUsername,
      email: storedEmail,
    };
    setLocalData(updatedData);
    onAccountDataChange(updatedData);
  }, [accountData, onAccountDataChange]);

  const handleInputChange = useCallback((field: keyof EmployerUser, value: string) => {
    const updatedData = { ...localData, [field]: value };
    setLocalData(updatedData);
    onAccountDataChange(updatedData);
    // Clear error for the field being edited
    if (errors[field as keyof ValidationErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [localData, onAccountDataChange, errors]);

  const validateField = useCallback((field: keyof EmployerUser, value: string) => {
    const newErrors: ValidationErrors = { ...errors };
    if (field === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      newErrors.email = 'Please enter a valid email address.';
    } else if (field === 'organizationName' && !value.trim()) {
      newErrors.organizationName = 'Organization name is required.';
    } else if (field === 'username' && !value.trim()) {
      newErrors.username = 'Username is required.';
    } else {
      delete newErrors[field];
    }
    setErrors(newErrors);
  }, [errors]);

  const handleBlur = useCallback((field: keyof EmployerUser) => {
    validateField(field, localData[field] as string);
  }, [validateField, localData]);

  const timeZoneOptions = useMemo(() => TIME_ZONES.map(tz => <option key={tz}>{tz}</option>), []);
  const languageOptions = useMemo(() => LANGUAGES.map(lang => <option key={lang}>{lang}</option>), []);
  const dateFormatOptions = useMemo(() => DATE_FORMATS.map(format => <option key={format}>{format}</option>), []);

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body p-4">
        <h3 className="h5 fw-semibold mb-4" id="account-info-heading">Account Information</h3>
        
        <div className="row g-3">
          <div className="col-12 col-md-6">
            <label htmlFor="organization-name" className="form-label fw-medium">Organization Name</label>
            <div className="position-relative">
              <Building
                size={16}
                className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
                aria-hidden="true"
              />
              <input
                id="organization-name"
                type="text"
                className={`form-control ps-5 ${errors.organizationName ? 'is-invalid' : ''}`}
                value={localData.organizationName}
                onChange={(e) => handleInputChange('organizationName', e.target.value)}
                onBlur={() => handleBlur('organizationName')}
                style={{ borderRadius: "8px" }}
                aria-describedby={errors.organizationName ? "org-name-error" : undefined}
                required
              />
              {errors.organizationName && <div id="org-name-error" className="invalid-feedback">{errors.organizationName}</div>}
            </div>
          </div>

          <div className="col-12 col-md-6">
            <label htmlFor="username" className="form-label fw-medium">{localData.username || 'Admin User'}</label>
            <div className="position-relative">
              <User
                size={16}
                className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
                aria-hidden="true"
              />
              <input
                id="username"
                type="text"
                className={`form-control ps-5 ${errors.username ? 'is-invalid' : ''}`}
                value={localData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                onBlur={() => handleBlur('username')}
                style={{ borderRadius: "8px" }}
                aria-describedby={errors.username ? "username-error" : undefined}
                required
              />
              {errors.username && <div id="username-error" className="invalid-feedback">{errors.username}</div>}
            </div>
          </div>

          <div className="col-12 col-md-6">
            <label htmlFor="email" className="form-label fw-medium">Email Address</label>
            <div className="position-relative">
              <Mail
                size={16}
                className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
                aria-hidden="true"
              />
              <input
                id="email"
                type="email"
                className={`form-control ps-5 ${errors.email ? 'is-invalid' : ''}`}
                value={localData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                onBlur={() => handleBlur('email')}
                style={{ borderRadius: "8px" }}
                aria-describedby={errors.email ? "email-error" : undefined}
                required
              />
              {errors.email && <div id="email-error" className="invalid-feedback">{errors.email}</div>}
            </div>
          </div>

          <div className="col-12 col-md-6">
            <label className="form-label fw-medium">Password</label>
            <div className="position-relative">
              <div className="form-text text-muted mt-1">
                <Link to="reset-password" className="text-success text-decoration-none">Use OTP to change your password</Link>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="border-top pt-3 mt-2">
              <h4 className="h6 fw-semibold mb-3" id="additional-settings-heading">Additional Settings</h4>
              
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <label htmlFor="time-zone" className="form-label fw-medium">Time Zone</label>
                  <select id="time-zone" className="form-select" style={{ borderRadius: "8px" }}>
                    {timeZoneOptions}
                  </select>
                </div>

                <div className="col-12 col-md-6">
                  <label htmlFor="language" className="form-label fw-medium">Language</label>
                  <select id="language" className="form-select" style={{ borderRadius: "8px" }}>
                    {languageOptions}
                  </select>
                </div>

                <div className="col-12 col-md-6">
                  <label htmlFor="date-format" className="form-label fw-medium">Date Format</label>
                  <select id="date-format" className="form-select" style={{ borderRadius: "8px" }}>
                    {dateFormatOptions}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default AccountSection;