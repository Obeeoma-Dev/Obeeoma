import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Formik,
  Form as FormikForm,
  ErrorMessage,
  Field as FormikField,
} from "formik";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { registerUser, clearAuthStatus } from "../../store/slices/authSlice";

import { getStepValidationSchema } from "../../validation/authValidation";
import FormikPhoneInput from "../../components/PhoneInput";
import {
  Container,
  Button,
  Form as BootstrapForm,
  Alert,
  Card,
  Spinner,
  InputGroup,
  Row,
  Col,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEyeSlash,
  faEnvelope,
  faUserTie,
  faMapMarkerAlt,
  faSitemap,
  faBuilding,
  faCheckCircle,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { faEye as faEyeRegular } from "@fortawesome/free-regular-svg-icons";
import logo from "./../../assets/Images/obeeomalogoword1.png";

import CustomStepper from "./../../components/stepper";
import SuccessModal from "./../../components/SuccessModal";

const customStyles = {
  primaryColor: "#22C55E",
  backgroundColor: "#f0f2f5",
  logoText: "Obeeoma",
};
interface LocationOption {
  label: string;
  value: string;
}

const location_options: LocationOption[] = [
  // --- Initial Selection and Other/Search Option ---
  { label: "Select Location (State/City/Country)", value: "" },
  { label: "Other / Type to Search", value: "OTHER" },

  // --- Original US States/Locations ---
  { label: "New York, USA (NY)", value: "NY" },
  { label: "California, USA (CA)", value: "CA" },
  { label: "Texas, USA (TX)", value: "TX" },
  { label: "Florida, USA (FL)", value: "FL" },
  { label: "Washington, USA (WA)", value: "WA" },

  // --- 🇳🇬 West Africa (Countries & Key States/Cities) ---
  // Nigeria
  { label: "Lagos, Nigeria", value: "NG-LAGOS" },
  { label: "Abuja, Nigeria", value: "NG-ABUJA" },
  // Ghana
  { label: "Accra, Ghana", value: "GH-ACCRA" },
  { label: "Ghana (Country)", value: "GH" },
  // Côte d'Ivoire
  { label: "Abidjan, Côte d'Ivoire", value: "CI-ABIDJAN" },
  { label: "Côte d'Ivoire (Country)", value: "CI" },
  // Senegal
  { label: "Dakar, Senegal", value: "SN-DAKAR" },
  { label: "Senegal (Country)", value: "SN" },
  // Other W. Africa
  { label: "Liberia (Country)", value: "LR" },
  { label: "Sierra Leone (Country)", value: "SL" },

  // --- 🇰🇪 Other African Countries (E. & S. Africa Focus) ---
  // South Africa
  { label: "Johannesburg, South Africa", value: "ZA-JHB" },
  { label: "South Africa (Country)", value: "ZA" },
  // Kenya (East Africa)
  { label: "Nairobi, Kenya", value: "KE-NAIROBI" },
  { label: "Kenya (Country)", value: "KE" },
  // Egypt (North Africa)
  { label: "Cairo, Egypt", value: "EG-CAIRO" },
  { label: "Egypt (Country)", value: "EG" },
  // Morocco (North Africa)
  { label: "Morocco (Country)", value: "MA" },
  // East African Additions
  { label: "Tanzania (Country)", value: "TZ" },
  { label: "Dar es Salaam, Tanzania", value: "TZ-DAR" },
  { label: "Uganda (Country)", value: "UG" },
  { label: "Kampala, Uganda", value: "UG-KLA" },
  { label: "Rwanda (Country)", value: "RW" },
  { label: "Kigali, Rwanda", value: "RW-KGL" },
  // Southern African Additions
  { label: "Zimbabwe (Country)", value: "ZW" },
  { label: "Zambia (Country)", value: "ZM" },

  // Horn of Africa
  { label: "Addis Ababa, Ethiopia", value: "ET-ADDIS" },
  { label: "Ethiopia (Country)", value: "ET" },
  { label: "Asmara, Eritrea", value: "ER-ASMARA" },
  { label: "Eritrea (Country)", value: "ER" },
  { label: "Djibouti City, Djibouti", value: "DJ-CITY" },
  { label: "Djibouti (Country)", value: "DJ" },
  { label: "Mogadishu, Somalia", value: "SO-MOGADISHU" },
  { label: "Somalia (Country)", value: "SO" },
  // --- 🇪🇺 European Countries ---
  // United Kingdom
  { label: "London, UK", value: "GB-LON" },
  { label: "United Kingdom (Country)", value: "GB" },
  // France
  { label: "Paris, France", value: "FR-PARIS" },
  { label: "France (Country)", value: "FR" },
  // Germany
  { label: "Berlin, Germany", value: "DE-BERLIN" },
  { label: "Germany (Country)", value: "DE" },
  // Spain
  { label: "Spain (Country)", value: "ES" },
  // Italy
  { label: "Italy (Country)", value: "IT" },
];

const organisation_size_options = [
  { label: "Select Size", value: "" },
  { label: "1-10 Employees", value: 10 },
  { label: "11-50 Employees", value: 50 },
  { label: "51-200 Employees", value: 200 },
  { label: "201-500 Employees", value: 500 },
  { label: "500+ Employees", value: 600 },
];

const contact_role_options = [
  { label: "Select Contact Role", value: "" },
  { label: "Owner/CEO", value: "CEO" },
  { label: "HR Manager", value: "HR_MANAGER" },
  { label: "Recruiter", value: "RECRUITER" },
  { label: "Office Manager", value: "OFFICE_MANAGER" },
  { label: "Other", value: "OTHER" },
];

export interface SearchableLocationProps {
  // Function to call when a new value is selected
  onSelectLocation: (location: LocationOption | null) => void;
  // The currently selected value
  value: LocationOption | null;
}

type Role = "employee" | "employer";

type RegisterFormValues = {
  organizationName: string;
  contactPersonFirstName: string;
  contactPersonLastName: string;
  contactPersonRole: string;
  email: string;
  phoneNumber: string;
  organisationSize: number | string;
  companyEmail: string;
  Location: string;
  password: string;
  confirmPassword: string;
  otherContactPersonRole: string;
  otherLocation: string;
};

const stepperSteps = ["Organization", "Contact", "Verify"];

const Register: React.FC = () => {
  const [role] = useState<Role>("employer");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  // Assuming useSelector is already correctly typed from previous context
  const { error, isLoading } = useSelector((state: RootState) => state.auth);

  const [activeStep, setActiveStep] = useState(0);

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  // for a pop up modal on successful registration
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    navigate("/login", { replace: true });
  };

  // New function to handle redirect after success
  const handleContinueToDashboard = () => {
    navigate("/employer-dashboard", { replace: true });
  };
  // <HIGHLIGHT END>

  const initialValues: RegisterFormValues = {
    organizationName: "",
    contactPersonFirstName: "",
    contactPersonLastName: "",
    contactPersonRole: "",
    companyEmail: "",
    email: "",
    phoneNumber: "",
    organisationSize: "",
    Location: "",
    password: "",
    confirmPassword: "",
    otherContactPersonRole: "",
    otherLocation: "", // Initialize new field
  };

  useEffect(() => {
    dispatch(clearAuthStatus());
  }, [dispatch]);

  const formGroupStyle: React.CSSProperties = {
    marginBottom: "1rem",
  };

  const inputStyle: React.CSSProperties = {
    height: "48px",
    borderRadius: "4px",
    fontFamily: "body",
  };

  const inputGroupTextStyle: React.CSSProperties = {
    height: "48px",
    backgroundColor: "white",
    borderColor: "#ced4da",
    color: customStyles.primaryColor,
    width: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "body",
  };

  const passwordToggleStyle: React.CSSProperties = {
    cursor: "pointer",
    backgroundColor: "white",
    borderColor: "#ced4da",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "body",
  };

  // Function to determine the final role and location values for the API call
  const getFinalValues = (values: RegisterFormValues) => {
    const finalContactRole =
      values.contactPersonRole === "OTHER"
        ? values.otherContactPersonRole // Use the text input value
        : values.contactPersonRole; // Use the selected option value

    const finalLocation =
      values.Location === "OTHER" ? values.otherLocation : values.Location;

    return { finalContactRole, finalLocation };
  };

  // to handle step navigation when user clicks on step labels and icons
  const handleStepNavigation = (stepIndex: number) => {
    console.log(
      `Step navigation clicked: ${stepIndex}. Navigation is currently disabled.`,
    );
  };

  const stepFields = [
    [
      "organizationName",
      "companyEmail",
      "organisationSize",
      "Location",
      "otherLocation",
    ], // Step 0: Organization Details
    [
      "contactPersonFirstName",
      "contactPersonLastName",
      "otherContactPersonRole",
      "email",
      "contactPersonRole",
      "phoneNumber",
      "password",
      "confirmPassword",
    ], // Step 1: Contact/Access Details
    [], // Step 2 (Success - no fields to validate)
  ];

  //  handleNext FUNCTION (Handles Step with accept privacy policy)
  const handleNext = async (
    values: RegisterFormValues,
    setTouched: (touched: { [key: string]: boolean }) => void,
    setErrors: (errors: { [key: string]: string }) => void,
    validateForm: (
      values?: RegisterFormValues,
    ) => Promise<{ [key: string]: string }>,
  ) => {
    setLocalError(null);
    const currentStepFields = stepFields[activeStep];

    // 1. Validation Check for Current Step
    const newTouched: { [key: string]: boolean } = {};
    currentStepFields.forEach((field) => {
      // Only set touched for conditional fields if the condition is met
      if (field === "otherLocation" && values.Location !== "OTHER") return;
      if (
        field === "otherContactPersonRole" &&
        values.contactPersonRole !== "OTHER"
      )
        return;

      // Set all fields of the current step as touched to show errors
      newTouched[field] = true;
    });
    setTouched(newTouched);

    const allErrors = await validateForm(values);
    const currentStepErrors: { [key: string]: string } = {};
    let hasErrorsInCurrentStep = false;

    currentStepFields.forEach((field) => {
      if (allErrors[field]) {
        currentStepErrors[field] = allErrors[field];
        hasErrorsInCurrentStep = true;
      }
    });

    setErrors(currentStepErrors);

    if (hasErrorsInCurrentStep) {
      const errorFieldNames = Object.keys(currentStepErrors).map(
        (f) => f.charAt(0).toUpperCase() + f.slice(1),
      );
      setLocalError(
        `Please correct the following fields before proceeding: ${errorFieldNames.join(", ")}.`,
      );
      return; // Stop if validation failed
    }

    // 2. Conditional API Submission (Triggered only on Step 1 to Step 2 transition)
    if (activeStep === 1) {
      const { finalContactRole, finalLocation } = getFinalValues(values);

      // Preparing for the API Payload
      const credentials = {
        organizationName: values.organizationName,
        phoneNumber: values.phoneNumber,
        organisationSize: values.organisationSize,
        companyEmail: values.companyEmail,
        Location: finalLocation, // Use the final calculated location
        password: values.password,
        confirmPassword: values.confirmPassword,
        role: role,
        contactPerson: {
          firstName: values.contactPersonFirstName,
          lastName: values.contactPersonLastName,
          role: finalContactRole, // Use the final calculated role
          email: values.email,
        },
      };

      try {
        // API Call
        await dispatch(registerUser(credentials)).unwrap();

        // On API Success:
        setShowSuccessModal(true); // Show the success modal pop-up
        setActiveStep((prev) => prev + 1); // Advance stepper visually to Step 2/Verify

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error("Registration failed:", err);
        setLocalError(err.message || "Registration failed. Please try again.");
        // Keep activeStep at 1 if API fails
      }
    } else {
      // 3. Default Next Step (Step 0 to Step 1 transition)
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = async (
    values: RegisterFormValues,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { setSubmitting, setTouched, setErrors, validateForm }: any,
  ) => {
    setSubmitting(true);
    //  Run validation and set touched using handleNext's logic
    await handleNext(values, setTouched, setErrors, validateForm);
    // handleNext handles the API call if activeStep === 1
    setSubmitting(false);
  };

  const renderStepContent = (
    values: RegisterFormValues,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleChange: (event: React.ChangeEvent<any>) => void,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    touched: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errors: any,
  ) => {
    switch (activeStep) {
      case 0: // Step 1: Organization Details
        return (
          <Row>
            <Col md={12}>
              <BootstrapForm.Group style={formGroupStyle}>
                <InputGroup>
                  <InputGroup.Text style={inputGroupTextStyle}>
                    <FontAwesomeIcon icon={faBuilding} />
                  </InputGroup.Text>
                  <BootstrapForm.Control
                    type="text"
                    name="organizationName"
                    placeholder="Organization Name"
                    value={values.organizationName}
                    onChange={handleChange}
                    style={inputStyle}
                    // <HIGHLIGHT START> Only show invalid if touched AND errors exist </HIGHLIGHT END>
                    isInvalid={
                      !!touched.organizationName && !!errors.organizationName
                    }
                  />
                </InputGroup>
                <BootstrapForm.Control.Feedback type="invalid">
                  <ErrorMessage name="organizationName" />
                </BootstrapForm.Control.Feedback>
              </BootstrapForm.Group>
            </Col>

            <Col md={12}>
              <BootstrapForm.Group style={formGroupStyle}>
                <InputGroup>
                  <InputGroup.Text style={inputGroupTextStyle}>
                    <FontAwesomeIcon icon={faEnvelope} />
                  </InputGroup.Text>
                  <BootstrapForm.Control
                    type="email"
                    name="companyEmail"
                    placeholder="Organization Email Address"
                    value={values.companyEmail}
                    onChange={handleChange}
                    style={inputStyle}
                    //  Only show invalid if touched AND errors exist
                    isInvalid={!!touched.companyEmail && !!errors.companyEmail}
                  />
                </InputGroup>
                <BootstrapForm.Control.Feedback type="invalid">
                  <ErrorMessage name="companyEmail" />
                </BootstrapForm.Control.Feedback>
              </BootstrapForm.Group>
            </Col>

            <Col md={12}>
              <BootstrapForm.Group style={formGroupStyle}>
                <InputGroup>
                  <InputGroup.Text style={inputGroupTextStyle}>
                    <FontAwesomeIcon icon={faSitemap} />
                  </InputGroup.Text>
                  <BootstrapForm.Select
                    name="organisationSize"
                    value={values.organisationSize}
                    onChange={handleChange}
                    style={inputStyle}
                    //  Only show invalid if touched AND errors exist
                    isInvalid={
                      !!touched.organisationSize && !!errors.organisationSize
                    }
                  >
                    {organisation_size_options.map((option) => (
                      <option key={option.label} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </BootstrapForm.Select>
                </InputGroup>
                <BootstrapForm.Control.Feedback type="invalid">
                  <ErrorMessage name="organisationSize" />
                </BootstrapForm.Control.Feedback>
              </BootstrapForm.Group>
            </Col>

            {/* Location Select and Conditional Text Input */}
            <Col md={12}>
              <BootstrapForm.Group style={formGroupStyle}>
                <InputGroup>
                  <InputGroup.Text style={inputGroupTextStyle}>
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                  </InputGroup.Text>
                  <BootstrapForm.Select
                    name="Location" // Match field name
                    value={values.Location}
                    onChange={handleChange}
                    style={inputStyle}
                    //  Only show invalid if touched AND errors exist
                    isInvalid={
                      !!touched.Location &&
                      !!errors.Location &&
                      values.Location !== "OTHER"
                    } // Validation for select
                  >
                    {location_options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </BootstrapForm.Select>
                </InputGroup>

                {values.Location === "OTHER" && (
                  <BootstrapForm.Control
                    type="text"
                    name="otherLocation"
                    placeholder="Type State/City/Country"
                    value={values.otherLocation}
                    onChange={handleChange}
                    style={{ ...inputStyle, marginTop: "1rem" }} // Added margin for separation
                    // <Only show invalid if touched AND errors exist
                    isInvalid={
                      !!touched.otherLocation && !!errors.otherLocation
                    }
                  />
                )}

                {/* Display error message for either field */}
                <BootstrapForm.Control.Feedback
                  type="invalid"
                  className={values.Location !== "OTHER" ? "d-block" : ""}
                >
                  {!!touched.Location && !!errors.Location && (
                    <ErrorMessage name="Location" />
                  )}
                </BootstrapForm.Control.Feedback>
                {values.Location === "OTHER" && (
                  <BootstrapForm.Control.Feedback
                    type="invalid"
                    className="d-block"
                  >
                    {!!touched.otherLocation && !!errors.otherLocation && (
                      <ErrorMessage name="otherLocation" />
                    )}
                  </BootstrapForm.Control.Feedback>
                )}
              </BootstrapForm.Group>
            </Col>
          </Row>
        );

      case 1: // Step 2: Contact Person Details & Password
        return (
          <Row>
            <Col md={6}>
              <BootstrapForm.Group style={formGroupStyle}>
                <BootstrapForm.Control
                  type="text"
                  name="contactPersonFirstName"
                  placeholder="First Name"
                  value={values.contactPersonFirstName}
                  onChange={handleChange}
                  style={inputStyle}
                  // < Only show invalid if touched AND errors exist
                  isInvalid={
                    !!touched.contactPersonFirstName &&
                    !!errors.contactPersonFirstName
                  }
                />
                <BootstrapForm.Control.Feedback type="invalid">
                  <ErrorMessage name="contactPersonFirstName" />
                </BootstrapForm.Control.Feedback>
              </BootstrapForm.Group>
            </Col>

            <Col md={6}>
              <BootstrapForm.Group style={formGroupStyle}>
                <BootstrapForm.Control
                  type="text"
                  name="contactPersonLastName"
                  placeholder="Last Name"
                  value={values.contactPersonLastName}
                  onChange={handleChange}
                  style={inputStyle}
                  // Only show invalid if touched AND errors exist
                  isInvalid={
                    !!touched.contactPersonLastName &&
                    !!errors.contactPersonLastName
                  }
                />
                <BootstrapForm.Control.Feedback type="invalid">
                  <ErrorMessage name="contactPersonLastName" />
                </BootstrapForm.Control.Feedback>
              </BootstrapForm.Group>
            </Col>

            <Col md={6}>
              <BootstrapForm.Group style={formGroupStyle}>
                <InputGroup>
                  <InputGroup.Text style={inputGroupTextStyle}>
                    <FontAwesomeIcon icon={faEnvelope} />
                  </InputGroup.Text>
                  <BootstrapForm.Control
                    type="email"
                    name="email"
                    placeholder="Contact Email Address"
                    value={values.email}
                    onChange={handleChange}
                    style={inputStyle}
                    //  Only show invalid if touched AND errors exist
                    isInvalid={!!touched.email && !!errors.email}
                  />
                </InputGroup>
                <BootstrapForm.Control.Feedback type="invalid">
                  <ErrorMessage name="email" />
                </BootstrapForm.Control.Feedback>
              </BootstrapForm.Group>
            </Col>

            <Col md={6}>
              <BootstrapForm.Group style={formGroupStyle}>
                <div style={{ position: "relative", zIndex: 99999 }}>
                  <FormikField
                    name="phoneNumber"
                    component={FormikPhoneInput}
                    inputStyle={inputStyle} // Pass the style prop down
                    placeholder="Contact Person Phone Number"
                    // The FormikPhoneInput component handles Formik integration internally
                  />
                </div>
                {/*  Use touched and errors for phone number as well  */}
                {!!touched.phoneNumber && !!errors.phoneNumber && (
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="invalid-feedback d-block"
                  />
                )}
              </BootstrapForm.Group>
            </Col>

            {/* Contact Role Select and Conditional Text Input */}
            <Col md={12}>
              <BootstrapForm.Group style={formGroupStyle}>
                <InputGroup>
                  <InputGroup.Text style={inputGroupTextStyle}>
                    <FontAwesomeIcon icon={faUserTie} />
                  </InputGroup.Text>
                  <BootstrapForm.Select
                    name="contactPersonRole"
                    value={values.contactPersonRole}
                    onChange={handleChange}
                    style={inputStyle}
                    //  Only show invalid if touched AND errors exist
                    isInvalid={
                      !!touched.contactPersonRole &&
                      !!errors.contactPersonRole &&
                      values.contactPersonRole !== "OTHER"
                    } // Validation for select
                  >
                    {contact_role_options.map((option) => (
                      <option key={option.label} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </BootstrapForm.Select>
                </InputGroup>

                {values.contactPersonRole === "OTHER" && (
                  <BootstrapForm.Control
                    type="text"
                    name="otherContactPersonRole"
                    placeholder="Type your role"
                    value={values.otherContactPersonRole}
                    onChange={handleChange}
                    style={{ ...inputStyle, marginTop: "1rem" }} // Added margin for separation
                    //  Only show invalid if touched AND errors exist
                    isInvalid={
                      !!touched.otherContactPersonRole &&
                      !!errors.otherContactPersonRole
                    }
                  />
                )}

                {/* Display error message for either field */}
                <BootstrapForm.Control.Feedback
                  type="invalid"
                  className={
                    values.contactPersonRole !== "OTHER" ? "d-block" : ""
                  }
                >
                  {!!touched.contactPersonRole &&
                    !!errors.contactPersonRole && (
                      <ErrorMessage name="contactPersonRole" />
                    )}
                </BootstrapForm.Control.Feedback>
                {values.contactPersonRole === "OTHER" && (
                  <BootstrapForm.Control.Feedback
                    type="invalid"
                    className="d-block"
                  >
                    {!!touched.otherContactPersonRole &&
                      !!errors.otherContactPersonRole && (
                        <ErrorMessage name="otherContactPersonRole" />
                      )}
                  </BootstrapForm.Control.Feedback>
                )}
              </BootstrapForm.Group>
            </Col>

            <Col md={6}>
              <BootstrapForm.Group style={formGroupStyle} controlId="password">
                <InputGroup>
                  <InputGroup.Text style={inputGroupTextStyle}>
                    <FontAwesomeIcon icon={faLock} />
                  </InputGroup.Text>
                  <BootstrapForm.Control
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    placeholder="Password"
                    style={inputStyle}
                    //  Only show invalid if touched AND errors exist
                    isInvalid={!!touched.password && !!errors.password}
                  />
                  <InputGroup.Text
                    onClick={togglePasswordVisibility}
                    style={passwordToggleStyle}
                  >
                    <FontAwesomeIcon
                      icon={showPassword ? faEyeSlash : faEyeRegular}
                      style={{ color: customStyles.primaryColor }}
                    />
                  </InputGroup.Text>
                </InputGroup>
                {!!touched.password && !!errors.password && (
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="invalid-feedback d-block"
                  />
                )}
              </BootstrapForm.Group>
            </Col>

            <Col md={6}>
              <BootstrapForm.Group
                style={formGroupStyle}
                controlId="confirmPassword"
              >
                <InputGroup>
                  <InputGroup.Text style={inputGroupTextStyle}>
                    <FontAwesomeIcon icon={faLock} />
                  </InputGroup.Text>
                  <BootstrapForm.Control
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    style={inputStyle}
                    // Only show invalid if touched AND errors exist
                    isInvalid={
                      !!touched.confirmPassword && !!errors.confirmPassword
                    }
                  />
                  <InputGroup.Text
                    onClick={toggleConfirmPasswordVisibility}
                    style={passwordToggleStyle}
                  >
                    <FontAwesomeIcon
                      icon={showConfirmPassword ? faEyeSlash : faEyeRegular}
                      style={{ color: customStyles.primaryColor }}
                    />
                  </InputGroup.Text>
                </InputGroup>
                {!!touched.confirmPassword && !!errors.confirmPassword && (
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="invalid-feedback d-block"
                  />
                )}
              </BootstrapForm.Group>
            </Col>
          </Row>
        );

      case 2: // Step 3: Verification/Review (Informational after successful API call)
        return (
          <div className="text-center my-3">
            <FontAwesomeIcon
              icon={faCheckCircle}
              size="3x"
              style={{ color: customStyles.primaryColor, marginBottom: "1rem" }}
            />
            <h4
              className="fw-semibold text-dark"
              style={{ fontFamily: "body" }}
            >
              Registration Successful!
            </h4>
            <p className="text-muted mb-4" style={{ fontFamily: "body" }}>
              Your account has been registered and an email has been sent to
              your email.{" "}
            </p>
            {/*
                        {/* Privacy Policy Display/Link */}
            {/* <Card className="text-start mb-4 p-3 border-light shadow-sm">
                            <Card.Title style={{ color: customStyles.primaryColor, fontSize: '1.1rem' }} className="mb-2">Privacy & Terms</Card.Title>
                            <Card.Text className="small text-muted mb-1">
                                We've successfully processed your registration. We encourage you to review our full policies:
                            </Card.Text>
                            <ul className="text-start small mb-0" style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                                <li><a href="/terms" target="_blank" style={{ color: customStyles.primaryColor }}>Terms of Service</a></li>
                                <li><a href="/privacy" target="_blank" style={{ color: customStyles.primaryColor }}>Privacy Policy</a></li>
                            </ul>
                        </Card> */}

            {/* Added Continue Button */}
            <Button
              onClick={handleContinueToDashboard}
              className="w-100 py-3 fw-semibold"
              style={{
                backgroundColor: customStyles.primaryColor,
                borderColor: customStyles.primaryColor,
                color: "white",
                boxShadow: "none",
                marginTop: "1rem", // Added margin for separation
                fontFamily: "body",
              }}
            >
              Continue to Dashboard
              {/* <FontAwesomeIcon icon={faArrowRight} className="ms-2" /> */}
            </Button>
            {/* <HIGHLIGHT END> */}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      style={{
        backgroundColor: customStyles.backgroundColor,
        maxHeight: "100vh",
        overflow: "auto",
        paddingBottom: "80px",
        fontFamily: "body",
      }}
      className="d-flex flex-column col-12"
    >
      <Container className="flex-grow-1 d-flex justify-content-center align-items-center py-5">
        <div className="d-flex justify-content-center w-100">
          <Card
            className="shadow-lg border-0"
            style={{
              // Increased maxWidth for success step to 700px
              maxWidth: activeStep === 2 ? "700px" : "800px",
              width: "100%",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              fontFamily: "body",
            }}
          >
            <Card.Body
              style={{ padding: "2.5rem" }}
              className="d-flex flex-column col-12"
            >
              <Link to="/">
                <div
                  className="d-flex flex-column align-items-center justify-content-center mb-3"
                  style={{ fontFamily: "heading" }}
                >
                  <img
                    src={logo}
                    alt="Obeeoma Logo"
                    style={{
                      height: "50px",
                      width: "auto",
                    }}
                    className="mb-1"
                  />
                </div>
              </Link>

              <h3
                className="text-center mb-2 fw-semibold text-dark"
                style={{ fontFamily: "heading" }}
              >
                {activeStep === 0 && "Step 1: Organization Details"}
                {activeStep === 1 && "Step 2: Contact Person Details"}
                {activeStep === 2 && "Registration Complete"}
              </h3>
              <p
                className="text-center mb-3 text-muted"
                style={{ fontSize: "1rem", fontFamily: "body" }}
              >
                Get early access to Obeeoma and empower your team with smarter
                mental health support.
              </p>

              <CustomStepper
                activeStep={activeStep}
                primaryColor={customStyles.primaryColor}
                steps={stepperSteps}
                onStepClick={handleStepNavigation}
              />

              {localError && (
                <Alert
                  variant="danger"
                  dismissible
                  onClose={() => setLocalError(null)}
                >
                  {localError}
                </Alert>
              )}
              {error && (
                <Alert
                  variant="danger"
                  dismissible
                  onClose={() => dispatch(clearAuthStatus())}
                >
                  {error}
                </Alert>
              )}

              <Formik
                validationSchema={getStepValidationSchema(activeStep)}
                initialValues={initialValues}
                //  Change onSubmit to call handleNext/handleSubmit
                onSubmit={handleSubmit}
                validateOnMount={false}
                //  Disable validation on blur to prevent errors when switching fields
                validateOnBlur={false}
              >
                {({
                  handleSubmit,
                  handleChange,
                  values,
                  touched,
                  errors,
                  setTouched,
                  setErrors,
                  validateForm,
                  isSubmitting,
                }) => (
                  <FormikForm noValidate onSubmit={handleSubmit}>
                    {renderStepContent(values, handleChange, touched, errors)}

                    {/* Conditional rendering updated: only show Back/Next/Sign Up for steps 0 and 1 */}
                    {activeStep < 2 && (
                      <Row className="mt-3">
                        <Col md={activeStep > 0 ? 6 : 12}>
                          {activeStep > 0 && (
                            <Button
                              variant="secondary"
                              onClick={handleBack}
                              className="w-100 py-3 fw-semibold mb-2 mb-md-0"
                              disabled={isLoading || isSubmitting}
                              style={{ fontFamily: "body" }}
                            >
                              {/* <FontAwesomeIcon icon={faArrowLeft} className="me-2" /> */}
                              Back
                            </Button>
                          )}
                        </Col>
                        <Col md={activeStep > 0 ? 6 : 12}>
                          <Button
                            //If activeStep === 1, the button is rendered via FormikForm's onSubmit on click, but we will use the onClick handler.
                            type="button"
                            onClick={() =>
                              handleNext(
                                values,
                                setTouched,
                                setErrors,
                                validateForm,
                              )
                            }
                            className="w-100 py-3 fw-semibold"
                            disabled={isLoading || isSubmitting}
                            style={{
                              backgroundColor: customStyles.primaryColor,
                              borderColor: customStyles.primaryColor,
                              color: "white",
                              boxShadow: "none",
                              fontFamily: "body",
                            }}
                          >
                            {isLoading || isSubmitting ? (
                              <>
                                <Spinner
                                  as="span"
                                  animation="border"
                                  size="sm"
                                  role="status"
                                  aria-hidden="true"
                                  className="me-2"
                                />
                                Signing Up...
                              </>
                            ) : activeStep === 0 ? (
                              <>
                                Next
                                {/* <FontAwesomeIcon icon={faArrowRight} className="ms-2" /> */}
                              </>
                            ) : (
                              "Sign Up"
                            )}
                          </Button>
                        </Col>
                      </Row>
                    )}

                    {activeStep < 2 && (
                      <p
                        className="text-center mt-3 text-muted"
                        style={{ fontFamily: "body" }}
                      >
                        Already have an account?{" "}
                        <Link
                          to="/login"
                          style={{
                            color: customStyles.primaryColor,
                            textDecoration: "none",
                            fontWeight: "600",
                            fontFamily: "body",
                          }}
                        >
                          Log in
                        </Link>
                      </p>
                    )}
                  </FormikForm>
                )}
              </Formik>

              <SuccessModal
                show={showSuccessModal}
                onHide={handleCloseSuccessModal} // Pass the handler for closing/redirection
                primaryColor={customStyles.primaryColor}
                handleClose={handleCloseSuccessModal}
              />
            </Card.Body>
          </Card>
        </div>
      </Container>

      <footer
        className="text-center text-muted py-3 small border-top"
        style={{
          backgroundColor: "#f5f5f5",
          fontSize: "0.8rem",
          fontFamily: "body",
        }}
      >
        <Container className="d-flex justify-content-between align-items-center">
          <div className="footer-copyright">
            &copy; 2026 {customStyles.logoText}. All rights reserved.
          </div>
        </Container>
      </footer>
    </div>
  );
};
export default Register;
