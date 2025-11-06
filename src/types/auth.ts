export interface User {
  id: number;
  username: string;
  email: string;

  role: "systemadmin" | "employer" | "employee";
  is_verified: boolean;
}

export interface LoginCredentials {
  username: string;
  password: string;
}
export interface ContactPerson {
  fullname: string;
  role: string;
  email: string;
}

export interface RegisterCredentials {
  phoneNumber: string;
  contactPerson: ContactPerson[];
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
  token: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  is_verified: boolean;
}

export interface LoginSuccessPayload {
  user: User;
  access: string;
  token: string;
}

export interface OtpVerificationPayload {
  email: string;
  otp_code: string;
}

export interface OtpSuccessResponse {
  message: string;
  token?: string;
  user?: User
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
  role: 'systemadmin' | 'employee' | 'employer';
  contactPerson: ContactPerson[];
}