// import React from "react";
// import { render, screen} from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import { Provider } from "react-redux";
// import { configureStore } from "@reduxjs/toolkit";
// import { BrowserRouter } from "react-router-dom";
// import "@testing-library/jest-dom";

// // Mock API Config to avoid import.meta issues
// jest.mock("../api/apiConfig", () => ({
//   __esModule: true,
//   authAPI: {
//     logout: jest.fn(),
//   },
//   default: {
//     post: jest.fn(),
//     interceptors: { request: { use: jest.fn() }, response: { use: jest.fn() } },
//   },
// }));

// import authReducer from "../store/slices/authSlice";
// import LogoutButton from "../pages/auth/logout";
// import { AuthState } from "../types/auth";
// import { authAPI } from "../api/apiConfig";

// const renderWithProviders = (ui: React.ReactElement, initialAuthState?: Partial<AuthState>) => {
//   const store = configureStore({
//     reducer: { auth: authReducer },
//     preloadedState: {
//       auth: {
//         isLoading: false,
//         error: null,
//         user: null,
//         token: null,
//         is_verified: false,
//         mfaSetupData: null,
//         isMfaSetupConfirmed: false,
//         accessToken: null,
//         ...initialAuthState,
//       } as AuthState,
//     },
//   });

//   return {
//     store,
//     user: userEvent.setup(),
//     ...render(
//       <Provider store={store}>
//         <BrowserRouter>{ui}</BrowserRouter>
//       </Provider>
//     ),
//   };
// };

// describe("LogoutButton", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   test("should render logout button", () => {
//     renderWithProviders(<LogoutButton />);
//     expect(screen.getByRole("button", { name: /Logout/i })).toBeInTheDocument();
//   });

//   test("should call logout API on click and navigate on success", async () => {
//     const mockNavigate = jest.fn();
//     jest.mock("react-router-dom", () => ({
//       ...jest.requireActual("react-router-dom"),
//       useNavigate: () => mockNavigate,
//     }));

//     // Mock API to resolve
//     (authAPI.logout as jest.Mock).mockResolvedValue({});

//     const { user } = renderWithProviders(<LogoutButton />);

//     await user.click(screen.getByRole("button", { name: /Logout/i }));

//     expect(authAPI.logout).toHaveBeenCalled();
//     expect(mockNavigate).toHaveBeenCalledWith("/login", { replace: true });
//   });

//   test("should accept additional button props", () => {
//     renderWithProviders(<LogoutButton variant="outline-danger" className="custom-class" />);
//     const button = screen.getByRole("button", { name: /Logout/i });
//     expect(button).toHaveClass("custom-class");
//     // Note: variant might not be directly testable without inspecting styles
//   });

//   test("should handle logout success and navigate", async () => {
//     const { logoutUserThunk } = require("../store/slices/authSlice");
//     const mockThunk = logoutUserThunk as jest.Mock;
//     mockThunk.mockReturnValue({
//       type: "auth/logout",
//       meta: { requestStatus: "fulfilled" },
//     });

//     const mockNavigate = jest.fn();
//     jest.mock("react-router-dom", () => ({
//       ...jest.requireActual("react-router-dom"),
//       useNavigate: () => mockNavigate,
//     }));

//     const { user } = renderWithProviders(<LogoutButton />);

//     await user.click(screen.getByRole("button", { name: /Logout/i }));

//     // Since navigation happens in the thunk's match check, we test the dispatch
//     expect(logoutUserThunk).toHaveBeenCalled();
//   });

//   test("should handle logout API rejection and still navigate", async () => {
//     const mockNavigate = jest.fn();
//     jest.mock("react-router-dom", () => ({
//       ...jest.requireActual("react-router-dom"),
//       useNavigate: () => mockNavigate,
//     }));

//     // Mock API to reject
//     (authAPI.logout as jest.Mock).mockRejectedValue(new Error("Logout failed"));

//     const { user } = renderWithProviders(<LogoutButton />);

//     await user.click(screen.getByRole("button", { name: /Logout/i }));

//     expect(authAPI.logout).toHaveBeenCalled();
//     expect(mockNavigate).toHaveBeenCalledWith("/login", { replace: true });
//   });
// });

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

// 1. Mock useNavigate at the top level (Hoisted)
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// 2. Mock API Config
jest.mock("../api/apiConfig", () => ({
  __esModule: true,
  authAPI: {
    logout: jest.fn(),
  },
  default: {
    post: jest.fn(),
    interceptors: { request: { use: jest.fn() }, response: { use: jest.fn() } },
  },
}));

import authReducer from "../store/slices/authSlice";
import LogoutButton from "../pages/auth/logout";
import { AuthState } from "../types/auth";
import { authAPI } from "../api/apiConfig";

const renderWithProviders = (ui: React.ReactElement, initialAuthState?: Partial<AuthState>) => {
  const store = configureStore({
    reducer: { auth: authReducer },
    preloadedState: {
      auth: {
        isLoading: false,
        error: null,
        user: { id: "1", email: "test@test.com" }, // Provide a user so logout is relevant
        token: "fake-token",
        is_verified: true,
        mfaSetupData: null,
        isMfaSetupConfirmed: false,
        accessToken: "fake-access",
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

describe("LogoutButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should render logout button", () => {
    renderWithProviders(<LogoutButton />);
    expect(screen.getByRole("button", { name: /Logout/i })).toBeInTheDocument();
  });

  test("should call logout API on click and navigate on success", async () => {
    (authAPI.logout as jest.Mock).mockResolvedValue({});

    const { user } = renderWithProviders(<LogoutButton />);

    const button = screen.getByRole("button", { name: /Logout/i });
    await user.click(button);

    // Wait for the async thunk/navigation to complete
    await waitFor(() => {
      expect(authAPI.logout).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith("/login", { replace: true });
    });
  });

  test("should accept additional button props", () => {
    renderWithProviders(<LogoutButton className="custom-class" />);
    const button = screen.getByRole("button", { name: /Logout/i });
    expect(button).toHaveClass("custom-class");
  });

  test("should handle logout API rejection and still navigate", async () => {
    // Silence the console.error for this test to keep logs clean
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    (authAPI.logout as jest.Mock).mockRejectedValue(new Error("Network Error"));

    const { user } = renderWithProviders(<LogoutButton />);

    await user.click(screen.getByRole("button", { name: /Logout/i }));

    await waitFor(() => {
      expect(authAPI.logout).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith("/login", { replace: true });
    });

    consoleSpy.mockRestore();
  });
});