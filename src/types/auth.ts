export interface User {
  id: number;
  username: string;
  email: string;

  role: "systemadmin" | "employer" | "employee";
  is_verified: boolean;
  mfa_enabled?: boolean;
}

export interface LoginCredentials {
  username: string;
  password: string;
}
export interface ContactPerson {
  firstName: string;
  lastName: string;
  role: string;
  email: string;
}

export interface RegisterCredentials {
  phoneNumber: string;
  contactPerson: ContactPerson;
  organizationName: string;
  organisationSize: number | string;
  companyEmail: string;
  Location: string;
  password: string;
  confirmPassword: string;
  role: "sytemadmin" | "employer" | "employee";
}

export interface ForgotPasswordData {
  email: string;
}

export interface changePasswordData {
  email: string;
  new_password: string;
  confirm_password: string;
}

export interface ChangePassword {
  old_password: string;
  new_password: string;
  confirm_password: string;
}

export interface MfaSetupData {
  qr_code_base64: string;
  secret: string;
}

export interface MfaVerifyPayload {
  code: string;
}

export type MfaSetupRequestPayload = {};

export interface MfaSetupData {
  otpauth_uri: string;
  qr_code_base64: string; // Base64 encoded PNG data
  secret: string; // The raw secret key
  temp_token: string; // Temporary token for verification
}

export interface MfaVerifyPayload {
  code: string; // Used for mfa_confirm and mfa_verify
  temp_token?: string; // Only used for mfa_verify during login
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  is_verified: boolean;
  mfaSetupData: MfaSetupData | null;
  isMfaSetupConfirmed: boolean;
  accessToken: string | null;
}

export interface LoginSuccessPayload {
  user: User;
  access: string;
  token: string;
  refresh: string;
  mfa_required?: boolean;
  temp_token?: string;
}

export interface OtpVerificationPayload {
  code: string;
}

export interface OtpSuccessResponse {
  message: string;
  token?: string;
  user?: User;
}

export interface ResendOtpPayload {
  email: string;
}

export interface RegisterPayload {
  email: string;
  organizationName: string;
  phoneNumber: string;
  organisationSize: number | string;
  companyEmail: string;
  Location: string;
  password: string;
  role: "systemadmin" | "employee" | "employer";
  contactPerson: ContactPerson[];
}
