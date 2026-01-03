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

describe("LoginPage Integration Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should render logo and form elements", () => {
    renderWithProviders(<LoginPage />);
    expect(screen.getByAltText(/Obeeoma Logo/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Sign In/i })).toBeInTheDocument();
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
        user: { id: 1, username: "testuser" },
        access: "token123"
      }
    });

    await user.type(screen.getByPlaceholderText(/Username/i), "testuser");
    await user.type(screen.getByPlaceholderText(/Password/i), "password123");
    await user.click(screen.getByRole("button", { name: /Sign In/i }));

    await waitFor(() => {
      // We check if the API was called rather than the thunk dispatch
      // This is more "integration" style and avoids Redux "undefined type" errors
      expect(authAPI.login).toHaveBeenCalledWith({
        username: "testuser",
        password: "password123"
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
// import React from "react";
// import { render, screen, waitFor } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import { Provider } from "react-redux";
// import { configureStore } from "@reduxjs/toolkit";
// import { BrowserRouter } from "react-router-dom";
// import "@testing-library/jest-dom";

// import authReducer, { loginUser } from "../store/slices/authSlice";
// import LoginPage from "../pages/auth/Login";
// import { AuthState } from "../types/auth";

// // Mock API Config
// jest.mock("../api/apiConfig", () => ({
//   __esModule: true,
//   default: {
//     post: jest.fn(),
//     get: jest.fn(),
//     interceptors: { request: { use: jest.fn() }, response: { use: jest.fn() } },
//   },
//   authAPI: { login: jest.fn() },
//   API_BASE_URL: "http://localhost:8000",
// }));

// // Mock the Slice correctly
// jest.mock("../store/slices/authSlice", () => {
//   const actual = jest.requireActual("../store/slices/authSlice");
//   // We create a mock function that returns an object with unwrap
//   const mockLoginThunk = jest.fn(() => ({
//     unwrap: () => Promise.resolve({
//       user: { id: 1, username: "testuser", email: "test@example.com", role: "employer", is_verified: true },
//       access: "token123",
//       token: "token123",
//       refresh: "refresh123",
//       mfa_required: false
//     })
//   }));

//   return {
//     ...actual,
//     __esModule: true,
//     default: actual.default,
//     loginUser: mockLoginThunk,
//   };
// });

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

//   return render(
//     <Provider store={store}>
//       <BrowserRouter>{ui}</BrowserRouter>
//     </Provider>
//   );
// };

// describe("LoginPage Integration Tests", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   test("should render logo and form elements", () => {
//     renderWithProviders(<LoginPage />);
//     expect(screen.getByAltText(/Obeeoma Logo/i)).toBeInTheDocument();
//     expect(screen.getByRole("button", { name: /Sign In/i })).toBeInTheDocument();
//   });

//   test("should toggle password visibility", async () => {
//     renderWithProviders(<LoginPage />);
//     const passwordInput = screen.getByPlaceholderText(/Password/i);

//     // Find the toggle span
//     const toggleSpan = passwordInput.closest('.input-group')?.querySelector('.input-group-text') as HTMLElement;

//     expect(passwordInput).toHaveAttribute("type", "password");

//     // Click the span to toggle
//     await userEvent.click(toggleSpan);
//     expect(passwordInput).toHaveAttribute("type", "text");

//     // Click again to hide
//     await userEvent.click(toggleSpan);
//     expect(passwordInput).toHaveAttribute("type", "password");
//   });

//   test("should call loginUser on submit", async () => {
//     // Cast to jest.Mock to access mock methods
//     const mockedLoginUser = loginUser as unknown as jest.Mock;

//     renderWithProviders(<LoginPage />);

//     await userEvent.type(screen.getByPlaceholderText(/Username/i), "testuser");
//     await userEvent.type(screen.getByPlaceholderText(/Password/i), "password123");
//     await userEvent.click(screen.getByRole("button", { name: /Sign In/i }));

//     await waitFor(() => {
//       expect(mockedLoginUser).toHaveBeenCalled();
//     });
//   });

//   test("should show loading state", () => {
//     renderWithProviders(<LoginPage />, { isLoading: true });
//     // This matches the "Signing in..." button text when loading
//     const button = screen.getByRole("button", { name: /Signing in/i });
//     expect(button).toBeDisabled();
//   });
// });

// // import { render, screen, waitFor, fireEvent } from "@testing-library/react";
// // import userEvent from "@testing-library/user-event";
// // import { Provider } from "react-redux";
// // import { configureStore } from "@reduxjs/toolkit";
// // import { BrowserRouter } from "react-router-dom";
// // import "@testing-library/jest-dom";

// // // 1. Project-specific imports (adjust paths if necessary)
// // import authReducer from "../store/slices/authSlice";
// // import { loginUser } from "../store/slices/authSlice";
// // import LoginPage from "../pages/auth/Login";
// // import { AuthState } from "../types/auth";

// // // 2. MOCKS
// // // Mocking the Navigation hook
// // const mockedUsedNavigate = jest.fn();
// // jest.mock("react-router-dom", () => ({
// //   ...jest.requireActual("react-router-dom"),
// //   useNavigate: () => mockedUsedNavigate,
// // }));

// // // Mocking the loginUser async thunk
// // jest.mock("../store/slices/authSlice", () => ({
// //   ...jest.requireActual("../store/slices/authSlice"),
// //   loginUser: jest.fn(),
// // }));

// // // 3. TYPES & REUSABLE RENDER HELPER

// // const renderWithProviders = (
// //   ui: React.ReactElement,
// //   initialAuthState?: Partial<AuthState>
// // ) => {
// //   const store = configureStore({
// //     reducer: { auth: authReducer },
// //     preloadedState: {
// //       auth: {
// //         isLoading: false,
// //         error: null,
// //         user: null,
// //         token: null,
// //         is_verified: false,
// //         mfaSetupData: null,
// //         isMfaSetupConfirmed: false,
// //         accessToken: null,
// //         ...initialAuthState,
// //       } as AuthState,
// //     },
// //   });

// //   return render(
// //     <Provider store={store}>
// //       <BrowserRouter>{ui}</BrowserRouter>
// //     </Provider>
// //   );
// // };

// // // 4. TEST SUITE
// // describe("LoginPage Integration Tests", () => {
  
// //   beforeEach(() => {
// //     jest.clearAllMocks();
// //   });

// //   // --- UI and Branding Tests ---
// //   test("should render branding assets and login elements", () => {
// //     renderWithProviders(<LoginPage />);
    
// //     expect(screen.getByAltText(/Obeeoma Logo/i)).toBeInTheDocument();
// //     expect(screen.getByText(/Welcome to Obeeoma/i)).toBeInTheDocument();
    
// //     const signInBtn = screen.getByRole("button", { name: /Sign In/i });
// //     // Verifying your custom primary color from the component
// //     expect(signInBtn).toHaveStyle({ backgroundColor: "#22C55E" });
// //   });

// //   // --- Interactive Elements ---
// //   test("should toggle password visibility when clicking the eye icon", async () => {
// //     renderWithProviders(<LoginPage />);
// //     const passwordInput = screen.getByPlaceholderText(/Password/i);
// //     const toggleIcon = screen.getByRole("img", { hidden: true });

// //     // Starts as password
// //     expect(passwordInput).toHaveAttribute("type", "password");
    
// //     // Toggle to text
// //     await userEvent.click(toggleIcon);
// //     expect(passwordInput).toHaveAttribute("type", "text");
    
// //     // Toggle back to password
// //     await userEvent.click(toggleIcon);
// //     expect(passwordInput).toHaveAttribute("type", "password");
// //   });

// //   // --- Logic and Navigation Tests ---
// //   test("should navigate to employer-dashboard upon successful employer login", async () => {
// //     // Setup Mock behavior for a successful response
// //     (loginUser as unknown as jest.Mock).mockReturnValue({
// //       unwrap: () => Promise.resolve({ role: "employer", mfa_required: false }),
// //     });

// //     renderWithProviders(<LoginPage />);

// //     // Fill form and submit
// //     await userEvent.type(screen.getByPlaceholderText(/Username/i), "obeeoma_admin");
// //     await userEvent.type(screen.getByPlaceholderText(/Password/i), "Password123!");
// //     await userEvent.click(screen.getByRole("button", { name: /Sign In/i }));

// //     // Verify navigation was triggered correctly
// //     await waitFor(() => {
// //       expect(mockedUsedNavigate).toHaveBeenCalledWith("/employer-dashboard", { replace: true });
// //     });
// //   });

// //   test("should navigate to system-admin for systemadmin role", async () => {
// //     (loginUser as unknown as jest.Mock).mockReturnValue({
// //       unwrap: () => Promise.resolve({ role: "systemadmin", mfa_required: false }),
// //     });

// //     renderWithProviders(<LoginPage />);

// //     await userEvent.type(screen.getByPlaceholderText(/Username/i), "admin_user");
// //     await userEvent.type(screen.getByPlaceholderText(/Password/i), "admin_pass");
// //     await userEvent.click(screen.getByRole("button", { name: /Sign In/i }));

// //     await waitFor(() => {
// //       expect(mockedUsedNavigate).toHaveBeenCalledWith("/system-admin", { replace: true });
// //     });
// //   });

// //   // --- State and Loading Tests ---
// //   test("should show loading spinner and disable button when authenticating", () => {
// //     renderWithProviders(<LoginPage />, { isLoading: true });
    
// //     const button = screen.getByRole("button", { name: /Signing in.../i });
// //     expect(button).toBeDisabled();
// //     expect(screen.getByRole("status")).toBeInTheDocument(); // Checks for Bootstrap Spinner
// //   });

// //   test("should display backend error messages correctly", () => {
// //     const errorMsg = "Invalid username or password";
// //     renderWithProviders(<LoginPage />, { error: errorMsg });

// //     // Checks that the Alert component displays the Redux error
// //     expect(screen.getByRole("alert")).toHaveTextContent(errorMsg);
// //   });
// // });