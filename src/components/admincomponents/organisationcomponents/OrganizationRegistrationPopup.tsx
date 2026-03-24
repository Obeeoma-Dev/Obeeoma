import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { clearAuthStatus } from "../../../store/slices/authSlice";
import { getStepValidationSchema } from "../../../validation/authValidation";
import FormikPhoneInput from "../../../components/PhoneInput";
import {
  Formik,
  Form as FormikForm,
  ErrorMessage,
  Field as FormikField,
} from "formik";
import {
  Container,
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
import CustomStepper from "../../../components/stepper";
import SuccessModal from "../../../components/SuccessModal";
import { registerUser } from "../../../store/slices/authSlice";

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
  { label: "Select Location (State/City/Country)", value: "" },
  { label: "Other / Type to Search", value: "OTHER" },
  { label: "New York, USA (NY)", value: "NY" },
  { label: "California, USA (CA)", value: "CA" },
  { label: "Texas, USA (TX)", value: "TX" },
  { label: "Florida, USA (FL)", value: "FL" },
  { label: "Washington, USA (WA)", value: "WA" },
  { label: "Lagos, Nigeria", value: "NG-LAGOS" },
  { label: "Abuja, Nigeria", value: "NG-ABUJA" },
  { label: "Accra, Ghana", value: "GH-ACCRA" },
  { label: "Ghana (Country)", value: "GH" },
  { label: "Abidjan, Côte d'Ivoire", value: "CI-ABIDJAN" },
  { label: "Côte d'Ivoire (Country)", value: "CI" },
  { label: "Dakar, Senegal", value: "SN-DAKAR" },
  { label: "Senegal (Country)", value: "SN" },
  { label: "Liberia (Country)", value: "LR" },
  { label: "Sierra Leone (Country)", value: "SL" },
  { label: "Johannesburg, South Africa", value: "ZA-JHB" },
  { label: "South Africa (Country)", value: "ZA" },
  { label: "Nairobi, Kenya", value: "KE-NAIROBI" },
  { label: "Kenya (Country)", value: "KE" },
  { label: "Cairo, Egypt", value: "EG-CAIRO" },
  { label: "Egypt (Country)", value: "EG" },
  { label: "Morocco (Country)", value: "MA" },
  { label: "Tanzania (Country)", value: "TZ" },
  { label: "Dar es Salaam, Tanzania", value: "TZ-DAR" },
  { label: "Uganda (Country)", value: "UG" },
  { label: "Kampala, Uganda", value: "UG-KLA" },
  { label: "Rwanda (Country)", value: "RW" },
  { label: "Kigali, Rwanda", value: "RW-KGL" },
  { label: "Zimbabwe (Country)", value: "ZW" },
  { label: "Zambia (Country)", value: "ZM" },
  { label: "Addis Ababa, Ethiopia", value: "ET-ADDIS" },
  { label: "Ethiopia (Country)", value: "ET" },
  { label: "Asmara, Eritrea", value: "ER-ASMARA" },
  { label: "Eritrea (Country)", value: "ER" },
  { label: "Djibouti City, Djibouti", value: "DJ-CITY" },
  { label: "Djibouti (Country)", value: "DJ" },
  { label: "Mogadishu, Somalia", value: "SO-MOGADISHU" },
  { label: "Somalia (Country)", value: "SO" },
  { label: "London, UK", value: "GB-LON" },
  { label: "United Kingdom (Country)", value: "GB" },
  { label: "Paris, France", value: "FR-PARIS" },
  { label: "France (Country)", value: "FR" },
  { label: "Berlin, Germany", value: "DE-BERLIN" },
  { label: "Germany (Country)", value: "DE" },
  { label: "Spain (Country)", value: "ES" },
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

interface OrganizationRegistrationPopupProps {
  show: boolean;
  onHide: () => void;
  onRegistrationSuccess?: () => void;
}

const OrganizationRegistrationPopup: React.FC<
  OrganizationRegistrationPopupProps
> = ({ show, onHide, onRegistrationSuccess }) => {
  const [role] = useState<Role>("employer");
  const dispatch = useDispatch<AppDispatch>();
  const { error, isLoading } = useSelector(
    (state: { auth: { error: string | null; isLoading: boolean } }) =>
      state.auth,
  );

  const [activeStep, setActiveStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    onHide();
    if (onRegistrationSuccess) {
      onRegistrationSuccess();
    }
  };

  const handleContinueToDashboard = () => {
    setShowSuccessModal(false);
    onHide();
    if (onRegistrationSuccess) {
      onRegistrationSuccess();
    }
  };

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
    otherLocation: "",
  };

  useEffect(() => {
    if (show) {
      dispatch(clearAuthStatus());
      setLocalError(null);
      setActiveStep(0);
    }
  }, [show, dispatch]);

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

  const getFinalValues = (values: RegisterFormValues) => {
    const finalContactRole =
      values.contactPersonRole === "OTHER"
        ? values.otherContactPersonRole
        : values.contactPersonRole;

    const finalLocation =
      values.Location === "OTHER" ? values.otherLocation : values.Location;

    return { finalContactRole, finalLocation };
  };

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
    ],
    [
      "contactPersonFirstName",
      "contactPersonLastName",
      "otherContactPersonRole",
      "email",
      "contactPersonRole",
      "phoneNumber",
      "password",
      "confirmPassword",
    ],
    [],
  ];

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

    const newTouched: { [key: string]: boolean } = {};
    currentStepFields.forEach((field) => {
      if (field === "otherLocation" && values.Location !== "OTHER") return;
      if (
        field === "otherContactPersonRole" &&
        values.contactPersonRole !== "OTHER"
      )
        return;

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
      return;
    }

    if (activeStep === 1) {
      const { finalContactRole, finalLocation } = getFinalValues(values);

      const credentials = {
        organizationName: values.organizationName,
        phoneNumber: values.phoneNumber,
        organisationSize: values.organisationSize,
        companyEmail: values.companyEmail,
        Location: finalLocation,
        password: values.password,
        confirmPassword: values.confirmPassword,
        role: role,
        contactPerson: {
          firstName: values.contactPersonFirstName,
          lastName: values.contactPersonLastName,
          role: finalContactRole,
          email: values.email,
        },
      };

      try {
        await dispatch(registerUser(credentials)).unwrap();
        setShowSuccessModal(true);
        setActiveStep((prev) => prev + 1);
      } catch (err: unknown) {
        console.error("Registration failed:", err);
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Registration failed. Please try again.";
        setLocalError(errorMessage);
      }
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = async (
    values: RegisterFormValues,
    {
      setSubmitting,
      setTouched,
      setErrors,
      validateForm,
    }: {
      setSubmitting: (isSubmitting: boolean) => void;
      setTouched: (touched: { [key: string]: boolean }) => void;
      setErrors: (errors: { [key: string]: string }) => void;
      validateForm: () => Promise<{ [key: string]: string }>;
    },
  ) => {
    setSubmitting(true);
    await handleNext(values, setTouched, setErrors, validateForm);
    setSubmitting(false);
  };

  const renderStepContent = (
    values: RegisterFormValues,
    handleChange: (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => void,
    touched: { [key: string]: boolean },
    errors: { [key: string]: string },
  ) => {
    switch (activeStep) {
      case 0:
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

            <Col md={12}>
              <BootstrapForm.Group style={formGroupStyle}>
                <InputGroup>
                  <InputGroup.Text style={inputGroupTextStyle}>
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                  </InputGroup.Text>
                  <BootstrapForm.Select
                    name="Location"
                    value={values.Location}
                    onChange={handleChange}
                    style={inputStyle}
                    isInvalid={
                      !!touched.Location &&
                      !!errors.Location &&
                      values.Location !== "OTHER"
                    }
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
                    style={{ ...inputStyle, marginTop: "1rem" }}
                    isInvalid={
                      !!touched.otherLocation && !!errors.otherLocation
                    }
                  />
                )}

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

      case 1:
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
                    inputStyle={inputStyle}
                    placeholder="Contact Person Phone Number"
                  />
                </div>
                {!!touched.phoneNumber && !!errors.phoneNumber && (
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="invalid-feedback d-block"
                  />
                )}
              </BootstrapForm.Group>
            </Col>

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
                    isInvalid={
                      !!touched.contactPersonRole &&
                      !!errors.contactPersonRole &&
                      values.contactPersonRole !== "OTHER"
                    }
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
                    style={{ ...inputStyle, marginTop: "1rem" }}
                    isInvalid={
                      !!touched.otherContactPersonRole &&
                      !!errors.otherContactPersonRole
                    }
                  />
                )}

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

      case 2:
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
              your email.
            </p>
            <Button
              onClick={handleContinueToDashboard}
              className="w-100 py-3 fw-semibold"
              style={{
                backgroundColor: customStyles.primaryColor,
                borderColor: customStyles.primaryColor,
                color: "white",
                boxShadow: "none",
                marginTop: "1rem",
                fontFamily: "body",
              }}
            >
              Continue to Dashboard
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        size="xl"
        centered
        backdrop="static"
        className="organization-registration-modal"
      >
        <Modal.Body
          style={{
            maxHeight: "80vh",
            overflowY: "auto",
            padding: "2rem",
          }}
        >
          <Container>
            <div className="d-flex justify-content-center w-100">
              <div
                style={{
                  maxWidth: activeStep === 2 ? "700px" : "800px",
                  width: "100%",
                  fontFamily: "body",
                }}
              >
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4
                    className="mb-0 fw-semibold text-dark"
                    style={{ fontFamily: "heading" }}
                  >
                    Register New Organization
                  </h4>
                  <Button variant="light" size="sm" onClick={onHide}>
                    ×
                  </Button>
                </div>

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
                  onSubmit={handleSubmit}
                  validateOnMount={false}
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
                                Back
                              </Button>
                            )}
                          </Col>
                          <Col md={activeStep > 0 ? 6 : 12}>
                            <Button
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
                                "Next"
                              ) : (
                                "Sign Up"
                              )}
                            </Button>
                          </Col>
                        </Row>
                      )}
                    </FormikForm>
                  )}
                </Formik>
              </div>
            </div>
          </Container>
        </Modal.Body>
      </Modal>

      <SuccessModal
        show={showSuccessModal}
        onHide={handleCloseSuccessModal}
        primaryColor={customStyles.primaryColor}
        handleClose={handleCloseSuccessModal}
      />
    </>
  );
};

export default OrganizationRegistrationPopup;
