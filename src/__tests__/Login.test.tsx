import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

// Import real reducer and thunk
import authReducer from "../store/slices/authSlice";
import LoginPage from "../pages/auth/Login";
import { AuthState } from "../types/auth";
import { authAPI } from "../api/apiConfig";

// 1. Mock ONLY the API layer
jest.mock("../api/apiConfig", () => ({
  __esModule: true,
  // This ensures authAPI methods exist as mock functions
  authAPI: {
    login: jest.fn(),
  },
  // Mock default export if your code uses it
  default: {
    post: jest.fn(),
    interceptors: { request: { use: jest.fn() }, response: { use: jest.fn() } },
  },
}));

const renderWithProviders = (
  ui: React.ReactElement,
  initialAuthState?: Partial<AuthState>,
) => {
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
      </Provider>,
    ),
  };
};

describe("LoginPage Integration Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should render logo and form elements", () => {
    renderWithProviders(<LoginPage />);
    expect(screen.getByAltText(/Obeeoma Logo/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Sign In/i }),
    ).toBeInTheDocument();
  });

  test("should toggle password visibility", async () => {
    const { user } = renderWithProviders(<LoginPage />);
    const passwordInput = screen.getByPlaceholderText(/Password/i);

    // This will now find the element because we added data-testid to Login.tsx
    const toggleButton = screen.getByTestId("password-toggle");

    expect(passwordInput).toHaveAttribute("type", "password");

    await user.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "text");

    await user.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  test("should call login API on submit", async () => {
    const { user } = renderWithProviders(<LoginPage />);

    // Setup the API mock return value
    (authAPI.login as jest.Mock).mockResolvedValue({
      data: {
        user: { id: 1, email: "testuser@example.com" },
        access: "token123",
      },
    });

    await user.type(
      screen.getByPlaceholderText(/email/i),
      "testuser@example.com",
    );
    await user.type(screen.getByPlaceholderText(/Password/i), "password123");
    await user.click(screen.getByRole("button", { name: /Sign In/i }));

    await waitFor(() => {
      // We check if the API was called rather than the thunk dispatch
      // This is more "integration" style and avoids Redux "undefined type" errors
      expect(authAPI.login).toHaveBeenCalledWith({
        email: "testuser@example.com",
        password: "password123",
      });
    });
  });

  test("should show loading state", () => {
    renderWithProviders(<LoginPage />, { isLoading: true });
    // regex handles case-insensitivity and potential '...'
    const button = screen.getByRole("button", { name: /signing in/i });
    expect(button).toBeDisabled();
  });
});
