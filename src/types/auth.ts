export interface User {
  id: number;
  username: string;
  email: string;
  role: "system admin" | "employer" | "employee";
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
  role: "sytem admin" | "employer" | "employee" ;
}
export interface ForgotPasswordData {
  email: string;
}

export interface changePasswordData {
  token: string;
  newPassword: string;
  confirmNewPassword: string;
}
export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface LoginSuccessPayload {
  user: User;
  access: string;
  token: string;
}
