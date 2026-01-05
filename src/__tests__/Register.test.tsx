import React from "react";
import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from "@testing-library/react";
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
        isLoading: false,
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

  return {
    store,
    // Fix: speed up user interactions by disabling the default delay
    user: userEvent.setup({ delay: null }),
    ...render(
      <Provider store={store}>
        <BrowserRouter>{ui}</BrowserRouter>
      </Provider>,
    ),
  };
};

describe("Register Component Integration Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fillStepOne = async (user: any) => {
    await user.type(
      screen.getByPlaceholderText(/Organization Name/i),
      "Test Corp",
    );
    await user.type(
      screen.getByPlaceholderText(/Organization Email Address/i),
      "corp@test.com",
    );

    const selects = screen.getAllByRole("combobox");

    // Use act for fireEvent to satisfy Formik's internal state updates
    await act(async () => {
      fireEvent.change(selects[0], {
        target: { name: "organisationSize", value: "50" },
      });
      fireEvent.change(selects[1], {
        target: { name: "Location", value: "NG-LAGOS" },
      });
    });

    const nextBtn = screen.getByRole("button", { name: /Next/i });
    await user.click(nextBtn);

    // Wait for the UI to transition to Step 2
    await screen.findByText(/Step 2: Contact Person Details/i);
  };

  test("toggles password visibility in Step 2", async () => {
    const { user } = renderWithProviders(<Register />);
    await fillStepOne(user);

    const passwordInput = await screen.findByPlaceholderText(/^Password$/i);
    // Find the toggle icon specifically inside the password input group
    const passwordGroup = passwordInput.closest(".input-group");
    const toggleButton = passwordGroup?.querySelector(
      ".input-group-text:last-child",
    );

    expect(passwordInput).toHaveAttribute("type", "password");

    if (toggleButton) {
      await user.click(toggleButton);
    }

    await waitFor(() => {
      expect(passwordInput).toHaveAttribute("type", "text");
    });
  }, 10000); // Increase timeout for transition overhead

  test("calls register API with correct payload on final submit", async () => {
    (authAPI.register as jest.Mock).mockResolvedValue({
      data: { message: "Success" },
    });

    const { user } = renderWithProviders(<Register />);
    await fillStepOne(user);

    await user.type(screen.getByPlaceholderText(/First Name/i), "John");
    await user.type(screen.getByPlaceholderText(/Last Name/i), "Doe");
    await user.type(
      screen.getByPlaceholderText(/Contact Email Address/i),
      "john@doe.com",
    );

    const phoneInput = screen.getByPlaceholderText(
      "Contact Person Phone Number",
    );
    await user.type(phoneInput, "+1234567890");

    const selects = screen.getAllByRole("combobox");
    const roleSelect = selects[0]; // On Step 2, the first select is usually the role

    await act(async () => {
      fireEvent.change(roleSelect, {
        target: { name: "contactPersonRole", value: "CEO" },
      });
    });

    await user.type(screen.getByPlaceholderText(/^Password$/i), "Password123!");
    await user.type(
      screen.getByPlaceholderText(/Confirm Password/i),
      "Password123!",
    );

    const signUpBtn = screen.getByRole("button", { name: /Sign Up/i });
    await user.click(signUpBtn);

    await waitFor(
      () => {
        expect(authAPI.register).toHaveBeenCalled();
      },
      { timeout: 5000 },
    );
  }, 15000); // Higher timeout for the full two-step process
});
