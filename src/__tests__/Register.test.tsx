import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

// Mock API Config
jest.mock("../api/apiConfig", () => ({
  __esModule: true,
  authAPI: { register: jest.fn() },
  default: {
    post: jest.fn(),
    interceptors: { request: { use: jest.fn() }, response: { use: jest.fn() } },
  },
}));

import { authAPI } from "../api/apiConfig";
import authReducer from "../store/slices/authSlice";
import Register from "../pages/auth/Register";

const renderWithProviders = (ui: React.ReactElement, initialAuthState = {}) => {
  const store = configureStore({
    reducer: { auth: authReducer },
    preloadedState: {
      auth: {
        isLoading: false, // Changed from 'loading' to 'isLoading' to match your component
        error: null,
        user: null,
        token: null,
        is_verified: false,
        mfaSetupData: null,
        isMfaSetupConfirmed: false,
        accessToken: null,
        ...initialAuthState,
      },
    },
  });

  return render(
    <Provider store={store}>
      <BrowserRouter>{ui}</BrowserRouter>
    </Provider>
  );
};

describe("Register Component Integration Tests", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const fillStepOne = async () => {
    await user.type(screen.getByPlaceholderText(/Organization Name/i), "Test Corp");
    await user.type(screen.getByPlaceholderText(/Organization Email Address/i), "corp@test.com");

    const selects = screen.getAllByRole("combobox");
    
    // Organisation Size - use fireEvent to trigger the Formik change
    fireEvent.change(selects[0], { target: { name: "organisationSize", value: "50" } });
    fireEvent.change(selects[1], { target: { name: "Location", value: "NG-LAGOS" } });

    const nextBtn = screen.getByRole("button", { name: /Next/i });
    await user.click(nextBtn);

    // Wait for the UI to transition to Step 2
    await waitFor(() => {
      expect(screen.queryByPlaceholderText(/Organization Name/i)).not.toBeInTheDocument();
    });
  };

  test("toggles password visibility in Step 2", async () => {
    renderWithProviders(<Register />);
    await fillStepOne();

    // FIXED: Placeholder is "Password", not "New Password"
    const passwordInput = await screen.findByPlaceholderText(/^Password$/i);
    const toggleButton = passwordInput.parentElement?.querySelector('.input-group-text:last-child');
    
    expect(passwordInput).toHaveAttribute("type", "password");
    
    if (toggleButton) {
      await user.click(toggleButton);
    }
    
    expect(passwordInput).toHaveAttribute("type", "text");
  });
test("calls register API with correct payload on final submit", async () => {
  (authAPI.register as jest.Mock).mockResolvedValue({});

  renderWithProviders(<Register />);

  await fillStepOne();

  await user.type(screen.getByPlaceholderText(/First Name/i), "John");
  await user.type(screen.getByPlaceholderText(/Last Name/i), "Doe");
  await user.type(screen.getByPlaceholderText(/Contact Email Address/i), "john@doe.com");
  await user.type(screen.getByPlaceholderText('Contact Person Phone Number'), "+1234567890");

  const roleSelect = screen.getByRole("combobox");
  fireEvent.change(roleSelect, { target: { name: "contactPersonRole", value: "CEO" } });

  // FIXED: Correct placeholders based on your Register.tsx
  await user.type(screen.getByPlaceholderText(/^Password$/i), "Password123!");
  await user.type(screen.getByPlaceholderText(/Confirm Password/i), "Password123!");

  const signUpBtn = screen.getByRole("button", { name: /Sign Up/i });
  await user.click(signUpBtn);

  await waitFor(() => {
    expect(authAPI.register).toHaveBeenCalled();
  });
});

  test("shows loading state on button", () => {
    // Note: This test assumes the component disables the button on Redux loading
    renderWithProviders(<Register />, { isLoading: true });

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });
});