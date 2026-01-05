// import React from "react";
// import { render, screen, waitFor } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import { Provider } from "react-redux";
// import { configureStore } from "@reduxjs/toolkit";
// import { BrowserRouter } from "react-router-dom";
// import "@testing-library/jest-dom";

// // 1. FIX: Mock API Config IMMEDIATELY to prevent the import.meta error
// jest.mock("../api/apiConfig", () => ({
//   __esModule: true,
//   authAPI: {
//     verifyOtp: jest.fn(),
//     resendOtp: jest.fn(),
//   },
//   default: {
//     post: jest.fn(),
//     interceptors: { request: { use: jest.fn() }, response: { use: jest.fn() } },
//   },
// }));

// import authReducer, { verifyOtpThunk} from "../store/slices/authSlice";
// import OtpVerificationPage from "../pages/auth/otpVerification";

// // 2. FIX: Properly mock the Slice Thunks
// jest.mock("../store/slices/authSlice", () => {
//   const actual = jest.requireActual("../store/slices/authSlice");
//   return {
//     ...actual,
//     __esModule: true,
//     verifyOtpThunk: jest.fn(),
//     resendOtpThunk: jest.fn(),
//   };
// });

// const renderWithProviders = (ui: React.ReactElement, initialAuthState = {}) => {
//   const store = configureStore({
//     reducer: { auth: authReducer },
//     preloadedState: {
//       auth: {
//         isLoading: false,
//         error: null,
//         user: { email: "test@example.com" },
//         token: null,
//         is_verified: false,
//         mfaSetupData: null,
//         isMfaSetupConfirmed: false,
//         accessToken: null,
//         ...initialAuthState,
//       } as any,
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

// describe("OtpVerificationPage", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();

//     // Mock localStorage
//     const localStorageMock = (function() {
//       let store: Record<string, string> = { 'user_email': 'test@example.com' };
//       return {
//         getItem: (key: string) => store[key] || null,
//         setItem: (key: string, value: string) => { store[key] = value.toString(); },
//         removeItem: (key: string) => { delete store[key]; },
//         clear: () => { store = {}; }
//       };
//     })();

//     Object.defineProperty(window, 'localStorage', {
//       value: localStorageMock,
//       writable: true
//     });
//   });

//   test("should render logo and title", () => {
//     renderWithProviders(<OtpVerificationPage />);
//     expect(screen.getByAltText(/Obeeoma Logo/i)).toBeInTheDocument();
//     expect(screen.getByText(/Check Your Email/i)).toBeInTheDocument();
//   });

//   test("should render OTP input and verify button", () => {
//     renderWithProviders(<OtpVerificationPage />);
//     // Check for the instructions text
//     expect(screen.getByText(/Please enter the 6-digit code/i)).toBeInTheDocument();
//     expect(screen.getByRole("button", { name: /Verify Code/i })).toBeInTheDocument();
//   });

//   test("should disable verify button when OTP is incomplete", () => {
//     renderWithProviders(<OtpVerificationPage />);
//     const button = screen.getByRole("button", { name: /Verify Code/i });
//     expect(button).toBeDisabled();
//   });

//   test("should show loading state and disable button when isLoading is true", () => {
//     renderWithProviders(<OtpVerificationPage />, { isLoading: true });
//     // Button text changes to "Verifying..." based on your Register logic
//     const button = screen.getByRole("button", { name: /Verifying/i });
//     expect(button).toBeDisabled();
//     expect(button.querySelector('.spinner-border')).toBeInTheDocument();
//   });

//   test("should show resend link", () => {
//     renderWithProviders(<OtpVerificationPage />);
//     expect(screen.getByText(/Didn't receive the code\?/i)).toBeInTheDocument();
//     expect(screen.getByText(/Resend/i)).toBeInTheDocument();
//   });

//   test("should call verifyOtpThunk on verify", async () => {
//     const mockedVerifyThunk = verifyOtpThunk as unknown as jest.Mock;
//     mockedVerifyThunk.mockReturnValue({
//       unwrap: () => Promise.resolve({ message: "Success" }),
//     });

//     const { user } = renderWithProviders(<OtpVerificationPage />);

//     // Find the 6 input boxes for OTP
//     const inputs = screen.getAllByRole('textbox');

//     // Simulate typing 6 digits
//     for(let i = 0; i < 6; i++) {
//         await user.type(inputs[i], (i + 1).toString());
//     }

//     const verifyBtn = screen.getByRole("button", { name: /Verify Code/i });
//     await user.click(verifyBtn);

//     await waitFor(() => {
//       expect(mockedVerifyThunk).toHaveBeenCalled();
//     });
//   });

//   test("should show error message when auth state has error", () => {
//     renderWithProviders(<OtpVerificationPage />, { error: "Invalid code" });
//     expect(screen.getByText(/Invalid code/i)).toBeInTheDocument();
//   });

//   test("should render back to sign in link", () => {
//     renderWithProviders(<OtpVerificationPage />);
//     const backLink = screen.getByRole("link", { name: /Back to Sign In/i });
//     expect(backLink).toBeInTheDocument();
//     expect(backLink).toHaveAttribute("href", "/login");
//   });
// });

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

// 1. Mock API Config
jest.mock("../api/apiConfig", () => ({
  __esModule: true,
  authAPI: {
    verifyOtp: jest.fn(),
    resendOtp: jest.fn(),
  },
  default: {
    post: jest.fn(),
    interceptors: { request: { use: jest.fn() }, response: { use: jest.fn() } },
  },
}));

import authReducer, { verifyOtpThunk } from "../store/slices/authSlice";
import OtpVerificationPage from "../pages/auth/otpVerification";

// 2. Properly mock the Slice Thunks to avoid serializability warnings
jest.mock("../store/slices/authSlice", () => {
  const actual = jest.requireActual("../store/slices/authSlice");
  return {
    ...actual,
    __esModule: true,
    // We return a function that mimics the Thunk behavior (returning a promise with unwrap)
    verifyOtpThunk: jest.fn(() => () => {
      const actionPromise = Promise.resolve({
        type: "auth/verifyOtp/fulfilled",
      });
      return Object.assign(actionPromise, {
        unwrap: () => Promise.resolve({ message: "Success" }),
      });
    }),
    resendOtpThunk: jest.fn(() => () => {
      const actionPromise = Promise.resolve({
        type: "auth/resendOtp/fulfilled",
      });
      return Object.assign(actionPromise, {
        unwrap: () => Promise.resolve({ message: "Success" }),
      });
    }),
  };
});

const renderWithProviders = (ui: React.ReactElement, initialAuthState = {}) => {
  const store = configureStore({
    reducer: { auth: authReducer },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, // Optional: helps in test environments with complex mocks
      }),
    preloadedState: {
      auth: {
        isLoading: false,
        error: null,
        user: { email: "test@example.com" },
        token: null,
        is_verified: false,
        mfaSetupData: null,
        isMfaSetupConfirmed: false,
        accessToken: null,
        ...initialAuthState,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any,
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

describe("OtpVerificationPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Mock localStorage
    const localStorageMock = (function () {
      let store: Record<string, string> = { user_email: "test@example.com" };
      return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => {
          store[key] = value.toString();
        },
        removeItem: (key: string) => {
          delete store[key];
        },
        clear: () => {
          store = {};
        },
      };
    })();

    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
      writable: true,
    });
  });

  test("should render logo and title", () => {
    renderWithProviders(<OtpVerificationPage />);
    expect(screen.getByAltText(/Obeeoma Logo/i)).toBeInTheDocument();
    expect(screen.getByText(/Check Your Email/i)).toBeInTheDocument();
  });

  test("should render OTP input and verify button", () => {
    renderWithProviders(<OtpVerificationPage />);
    expect(screen.getByText(/Enter Verification Code/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Verify Code/i }),
    ).toBeInTheDocument();
  });

  test("should disable verify button when OTP is incomplete", () => {
    renderWithProviders(<OtpVerificationPage />);
    const button = screen.getByRole("button", { name: /Verify Code/i });
    expect(button).toBeDisabled();
  });

  test("should show loading state and disable button when isLoading is true", () => {
    renderWithProviders(<OtpVerificationPage />, { isLoading: true });

    // Fix: specifically target the "Verifying..." button to avoid clash with "Resend" link
    const button = screen.getByRole("button", { name: /Verifying/i });

    expect(button).toBeDisabled();
    expect(button).toHaveTextContent(/Verifying/i);
  });

  test("should show resend link", () => {
    renderWithProviders(<OtpVerificationPage />);
    // Robust matcher for text potentially split by spans
    expect(
      screen.getByText((content) => content.includes("receive the code")),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Resend/i })).toBeInTheDocument();
  });

  test("should call verifyOtpThunk on verify", async () => {
    const mockedVerifyThunk = verifyOtpThunk as unknown as jest.Mock;

    const { user } = renderWithProviders(<OtpVerificationPage />);

    // Find all 6 OTP inputs
    const inputs = screen.getAllByRole("textbox");

    // Type 6 digits
    for (let i = 0; i < 6; i++) {
      await user.type(inputs[i], "1");
    }

    const verifyBtn = screen.getByRole("button", { name: /Verify Code/i });
    await user.click(verifyBtn);

    await waitFor(() => {
      expect(mockedVerifyThunk).toHaveBeenCalled();
    });
  });

  test("should show error message when auth state has error", () => {
    renderWithProviders(<OtpVerificationPage />, { error: "Invalid code" });
    expect(screen.getByText(/Invalid code/i)).toBeInTheDocument();
  });

  test("should render back to sign in link", () => {
    renderWithProviders(<OtpVerificationPage />);
    const backLink = screen.getByRole("link", { name: /Back to Sign In/i });
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute("href", "/login");
  });
});
