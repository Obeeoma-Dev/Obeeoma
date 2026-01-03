import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

// Mock API Config to avoid import.meta issues
jest.mock("../api/apiConfig", () => ({
  __esModule: true,
  authAPI: {
    resetPassword: jest.fn(),
  },
  default: {
    post: jest.fn(),
    interceptors: { request: { use: jest.fn() }, response: { use: jest.fn() } },
  },
}));

import authReducer from "../store/slices/authSlice";
import ResetPasswordSignIn from "../pages/auth/ResetPasswordSignin";
import { AuthState } from "../types/auth";

const renderWithProviders = (ui: React.ReactElement, initialAuthState?: Partial<AuthState>) => {
  const store = configureStore({
    reducer: { auth: authReducer },
    preloadedState: {
      auth: {
        isLoading: false,
        error: null,
        user: null,
        token: null,
        is_verified: false,
        mfaSetupData: null,
        isMfaSetupConfirmed: false,
        accessToken: null,
        ...initialAuthState,
      } as AuthState,
    },
  });

  return {
    store,
    user: userEvent.setup(),
    ...render(
      <Provider store={store}>
        <BrowserRouter>{ui}</BrowserRouter>
      </Provider>
    ),
  };
};

describe("ResetPasswordSignIn", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock fetch
    global.fetch = jest.fn();
    // Mock localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
      },
      writable: true,
    });
  });

  afterEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  test("should render logo and title", () => {
    renderWithProviders(<ResetPasswordSignIn />);
    expect(screen.getByAltText(/Obeeoma Logo/i)).toBeInTheDocument();
    expect(screen.getByText(/Reset Password to Sign in/i)).toBeInTheDocument();
  });

  test("should render form elements", () => {
    renderWithProviders(<ResetPasswordSignIn />);
    expect(screen.getByPlaceholderText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Send Code/i })).toBeInTheDocument();
  });

  test("should render resend link", () => {
    renderWithProviders(<ResetPasswordSignIn />);
    expect(screen.getByText(/Didn't receive any code/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Send Code again/i })).toBeInTheDocument();
  });

  test("should show loading state", () => {
    renderWithProviders(<ResetPasswordSignIn />);
    // Initially not loading
    expect(screen.getByRole("button", { name: /Send Code/i })).not.toBeDisabled();
  });

  test("should call API on form submit", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ message: "Code sent" }),
    });

    const { user } = renderWithProviders(<ResetPasswordSignIn />);

    await user.type(screen.getByPlaceholderText(/Email address/i), "test@example.com");
    await user.click(screen.getByRole("button", { name: /Send Code/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://64.225.122.101/api/v1/auth/reset-password/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: "test@example.com" }),
        }
      );
    });
  });

  test("should store email in localStorage on success", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ message: "Code sent" }),
    });

    const { user } = renderWithProviders(<ResetPasswordSignIn />);

    await user.type(screen.getByPlaceholderText(/Email address/i), "test@example.com");
    await user.click(screen.getByRole("button", { name: /Send Code/i }));

    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith("resetPasswordEmail", "test@example.com");
    });
  });

  test("should show error on API failure", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 400,
      json: () => Promise.resolve({ message: "User not found" }),
    });

    const { user } = renderWithProviders(<ResetPasswordSignIn />);

    await user.type(screen.getByPlaceholderText(/Email address/i), "test@example.com");
    await user.click(screen.getByRole("button", { name: /Send Code/i }));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/User not found/i);
    });
  });

  test("should disable button when loading", async () => {
    (global.fetch as jest.Mock).mockImplementation(() => new Promise(() => {})); // Never resolves

    const { user } = renderWithProviders(<ResetPasswordSignIn />);

    await user.type(screen.getByPlaceholderText(/Email address/i), "test@example.com");
    await user.click(screen.getByRole("button", { name: /Send Code/i }));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /Sending/i })).toBeDisabled();
    });
  });

  test("should validate email is required", async () => {
    const { user } = renderWithProviders(<ResetPasswordSignIn />);

    await user.click(screen.getByRole("button", { name: /Send Code/i }));

    expect(screen.getByRole('alert')).toHaveTextContent(/Email is required/i);
  });

  test("should render footer", () => {
    renderWithProviders(<ResetPasswordSignIn />);
    expect(screen.getByText(/© 2025 Obeeoma/i)).toBeInTheDocument();
  });

  test("should handle resend code link", () => {
    renderWithProviders(<ResetPasswordSignIn />);

    const resendLink = screen.getByRole("link", { name: /Send Code again/i });
    expect(resendLink).toHaveAttribute("href", "/otp-verify");
  });
});